"use client";

import React, { useRef, useState, useCallback } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@dsui/ui/lib/utils";
import {
  Upload as UploadIcon,
  X,
  File,
  FileText,
  Image as ImageIcon,
  Film,
  Music,
  Archive,
  FileCode,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Eye,
  Download,
  Trash2,
  CloudUploadIcon,
} from "lucide-react";
import { toast } from "../Toast/Toast";
import { Dialog } from "../Dialog";

// Variants for upload container
const uploadVariants = cva(
  "relative flex justify-center items-center rounded-lg transition-all duration-200 cursor-pointer select-none",
  {
    variants: {
      variant: {
        outline: "border border-foreground/10 bg-background text-foreground",
        primaryOutline: "border border-primary bg-background text-primary",
        icon: "border border-primary text-primary bg-background rounded-xl p-2",
        avatar:
          "border-2 border-dashed border-foreground/20 bg-background !w-full !h-full flex-col text-center hover:border-foreground/40 !p-1",
        avatarCircle:
          "border-2 border-dashed border-foreground/20 bg-background !w-full !h-full rounded-full flex-col text-center hover:border-foreground/40 !p-1",
        dropzone:
          "border border-foreground/10 bg-background flex-col text-center py-10",
        primaryDropzone:
          "border border-primary bg-primary/10 flex-col text-center py-10",
        secondaryDropzone:
          "border border-foreground/10 bg-foreground/10 flex-col text-center py-10",
      },

      size: {
        small: "h-8 p-[6px] text-sm",
        medium: "h-10 p-2 text-base",
        large: "h-12 p-3 text-base",
      },

      status: {
        idle: "",
        dragover: "border-primary bg-primary/5 scale-[1.02]",
        disabled: "opacity-50 cursor-not-allowed",
      },
    },

    defaultVariants: {
      variant: "outline",
      size: "medium",
      status: "idle",
    },
  }
);

// File status type
export type FileStatus = "uploading" | "done" | "error" | "removed";

// Upload file item interface
export interface UploadFile {
  uid: string;
  name: string;
  status?: FileStatus;
  url?: string;
  thumbUrl?: string;
  size?: number;
  type?: string;
  percent?: number;
  error?: Error;
  response?: any;
  originFileObj?: File;
}

// Upload props interface
export interface UploadProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "size">,
    VariantProps<typeof uploadVariants> {
  // Core props
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  fileList?: UploadFile[];
  defaultFileList?: UploadFile[];

  // Upload behavior
  action?: string | ((file: File) => string);
  customRequest?: (options: {
    file: File;
    onProgress: (percent: number) => void;
    onSuccess: (response: any) => void;
    onError: (error: Error) => void;
  }) => void;
  beforeUpload?: (file: File, fileList: File[]) => boolean | Promise<boolean>;
  onChange?: (info: { file: UploadFile; fileList: UploadFile[] }) => void;
  onRemove?: (file: UploadFile) => boolean | Promise<boolean> | void;
  onPreview?: (file: UploadFile) => void;
  onDownload?: (file: UploadFile) => void;

  // Validation
  maxCount?: number;
  maxSize?: number; // in bytes

  // Display
  listType?: "text" | "picture" | "picture-card" | "picture-circle";
  showUploadList?:
    | boolean
    | {
        showPreviewIcon?: boolean;
        showRemoveIcon?: boolean;
        showDownloadIcon?: boolean;
      };
  pictureCardSize?: number; // Size in pixels for picture-card (default: auto based on cols)
  pictureCardCols?: number; // Number of columns for picture-card grid (default: 3)
  compact?: boolean; // Compact mode - shows as small button
  iconOnly?: boolean; // Show only icon without text in compact mode
  showBorder?: boolean; // Show border around upload area (default: true)
  uploadText?: string; // Custom text for upload area (default: "Click to upload or drag and drop")
  uploadDescription?: string; // Custom description text for upload area
  uploadIcon?: React.ReactNode; // Custom icon for upload area
  // Content
  children?: React.ReactNode;

  // Headers for upload request
  headers?: Record<string, string>;
  withCredentials?: boolean;

  // Drag and drop
  directory?: boolean;
}

// Helper function to get file icon based on type
const getFileIcon = (file: UploadFile) => {
  const type = file.type || "";
  const name = file.name.toLowerCase();

  if (type.startsWith("image/")) return <ImageIcon className="h-4 w-4" />;
  if (type.startsWith("video/")) return <Film className="h-4 w-4" />;
  if (type.startsWith("audio/")) return <Music className="h-4 w-4" />;
  if (name.endsWith(".zip") || name.endsWith(".rar") || name.endsWith(".7z"))
    return <Archive className="h-4 w-4" />;
  if (
    name.endsWith(".js") ||
    name.endsWith(".ts") ||
    name.endsWith(".jsx") ||
    name.endsWith(".tsx") ||
    name.endsWith(".css") ||
    name.endsWith(".html")
  )
    return <FileCode className="h-4 w-4" />;
  if (name.endsWith(".txt") || name.endsWith(".md"))
    return <FileText className="h-4 w-4" />;
  return <File className="h-4 w-4" />;
};

// Helper function to format file size
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
};

// Generate unique ID
const generateUID = () => {
  return `upload-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

const UploadBase = React.forwardRef<HTMLDivElement, UploadProps>(
  (
    {
      className,
      variant,
      accept,
      multiple = false,
      disabled = false,
      fileList: controlledFileList,
      defaultFileList = [],
      action,
      customRequest,
      beforeUpload,
      onChange,
      onRemove,
      onPreview,
      onDownload,
      maxCount,
      maxSize,
      listType = "text",
      showUploadList = true,
      pictureCardSize,
      pictureCardCols = 3,
      iconOnly = false,
      showBorder = true,
      uploadText = "Click to upload",
      uploadDescription,
      uploadIcon,
      size = "medium",
      children,
      headers,
      withCredentials,
      directory = false,
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [internalFileList, setInternalFileList] =
      useState<UploadFile[]>(defaultFileList);
    const [isDragOver, setIsDragOver] = useState(false);

    // Built-in preview dialog state
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");

    // Use controlled or uncontrolled fileList
    const fileList = controlledFileList ?? internalFileList;
    const setFileList = controlledFileList ? undefined : setInternalFileList;

    // Check if dropzone variant
    const isDropzoneVariant = [
      "dropzone",
      "primaryDropzone",
      "secondaryDropzone",
    ].includes(variant || "");

    // Auto set listType to 'text' when directory mode is enabled or when uploading with dropzone variants
    const effectiveListType = directory
      ? "text"
      : isDropzoneVariant && fileList.length > 0
        ? "text"
        : listType;

    // Track the latest fileList for controlled mode
    const fileListRef = useRef<UploadFile[]>(fileList);
    fileListRef.current = fileList;

    // Check if can upload more files
    const canUploadMore = maxCount
      ? fileList.length < maxCount
      : directory || multiple
        ? true
        : fileList.length === 0;

    // Update file list
    const updateFileList = useCallback(
      (updater: (prev: UploadFile[]) => UploadFile[], file?: UploadFile) => {
        const newList = updater(fileListRef.current);

        if (setFileList) {
          setFileList(updater);
        }

        // Trigger onChange for controlled mode
        if (onChange) {
          // Always trigger onChange with the new list
          const dummyFile = file || ({} as UploadFile);
          onChange({ file: dummyFile, fileList: newList });
        }
      },
      [setFileList, onChange]
    );

    // Upload file
    const uploadFile = useCallback(
      (file: File) => {
        // Generate preview URL immediately for images
        const previewUrl = file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : undefined;

        const uploadFileObj: UploadFile = {
          uid: generateUID(),
          name: file.name,
          size: file.size,
          type: file.type,
          status: "uploading",
          percent: 0,
          originFileObj: file,
          url: previewUrl,
          thumbUrl: previewUrl,
        };

        // Add to file list immediately
        updateFileList((prev) => [...prev, uploadFileObj], uploadFileObj);

        // Custom request
        if (customRequest) {
          customRequest({
            file,
            onProgress: (percent) => {
              const updatedFile = { ...uploadFileObj, percent };
              updateFileList(
                (prev) =>
                  prev.map((f) =>
                    f.uid === uploadFileObj.uid ? updatedFile : f
                  ),
                updatedFile
              );
            },
            onSuccess: (response) => {
              const successFile = {
                ...uploadFileObj,
                status: "done" as FileStatus,
                percent: 100,
                response,
              };
              updateFileList(
                (prev) =>
                  prev.map((f) =>
                    f.uid === uploadFileObj.uid ? successFile : f
                  ),
                successFile
              );
            },
            onError: (error) => {
              const errorFile = {
                ...uploadFileObj,
                status: "error" as FileStatus,
                error,
              };
              updateFileList(
                (prev) =>
                  prev.map((f) =>
                    f.uid === uploadFileObj.uid ? errorFile : f
                  ),
                errorFile
              );
            },
          });
        } else if (action) {
          // Default upload using fetch
          const url = typeof action === "function" ? action(file) : action;
          const formData = new FormData();
          formData.append("file", file);

          const xhr = new XMLHttpRequest();

          xhr.upload.addEventListener("progress", (e) => {
            if (e.lengthComputable) {
              const percent = Math.round((e.loaded / e.total) * 100);
              const updatedFile = { ...uploadFileObj, percent };
              updateFileList(
                (prev) =>
                  prev.map((f) =>
                    f.uid === uploadFileObj.uid ? updatedFile : f
                  ),
                updatedFile
              );
            }
          });

          xhr.addEventListener("load", () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              const response = JSON.parse(xhr.responseText);
              const successFile = {
                ...uploadFileObj,
                status: "done" as FileStatus,
                percent: 100,
                response,
                url: response.url || response.data?.url,
              };
              updateFileList(
                (prev) =>
                  prev.map((f) =>
                    f.uid === uploadFileObj.uid ? successFile : f
                  ),
                successFile
              );
            } else {
              const errorFile = {
                ...uploadFileObj,
                status: "error" as FileStatus,
                error: new Error(`Upload failed with status ${xhr.status}`),
              };
              updateFileList(
                (prev) =>
                  prev.map((f) =>
                    f.uid === uploadFileObj.uid ? errorFile : f
                  ),
                errorFile
              );
            }
          });

          xhr.addEventListener("error", () => {
            const errorFile = {
              ...uploadFileObj,
              status: "error" as FileStatus,
              error: new Error("Network error"),
            };
            updateFileList(
              (prev) =>
                prev.map((f) => (f.uid === uploadFileObj.uid ? errorFile : f)),
              errorFile
            );
          });

          xhr.open("POST", url);

          // Set headers
          if (headers) {
            Object.entries(headers).forEach(([key, value]) => {
              xhr.setRequestHeader(key, value);
            });
          }

          if (withCredentials) {
            xhr.withCredentials = true;
          }

          xhr.send(formData);
        } else {
          // No action or customRequest, just mark as done (for preview only)
          setTimeout(() => {
            const successFile = {
              ...uploadFileObj,
              status: "done" as FileStatus,
              percent: 100,
            };
            updateFileList(
              (prev) =>
                prev.map((f) =>
                  f.uid === uploadFileObj.uid ? successFile : f
                ),
              successFile
            );
          }, 100);
        }
      },
      [action, customRequest, updateFileList, headers, withCredentials]
    );

    // Handle file selection
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);

      console.log("=== handleFileChange DEBUG ===");
      console.log("Files from browser:", files.length);
      console.log("Directory mode:", directory);
      console.log("Multiple mode:", multiple);
      console.log("Current fileList length:", fileList.length);
      console.log(
        "File names:",
        files.map((f) => f.name)
      );

      if (files.length === 0) return;

      // Check multiple - if multiple is false and there's already a file, reject (except for directory upload)
      if (!directory && !multiple && fileList.length > 0) {
        toast.error(
          "You can only upload one file. Please remove the existing file first."
        );
        return;
      }

      // Check max count
      if (maxCount && fileList.length + files.length > maxCount) {
        toast.error(`You can only upload up to ${maxCount} file(s)`);
        return;
      }

      // Process each file - collect valid files first
      let uploadedCount = 0;
      const validFiles: File[] = [];

      for (const file of files) {
        console.log(`\n📁 Processing: ${file.name}`);

        // Check max size
        if (maxSize && file.size > maxSize) {
          console.log(
            `❌ REJECTED: File size ${file.size} exceeds maxSize ${maxSize}`
          );
          toast.error(
            `${file.name} exceeds maximum size of ${formatFileSize(maxSize)}`
          );
          continue;
        }

        // Before upload hook
        if (beforeUpload) {
          console.log(`🔍 Calling beforeUpload for ${file.name}...`);
          const result = await beforeUpload(file, files);
          if (result === false) {
            console.log(`❌ REJECTED by beforeUpload: ${file.name}`);
            continue;
          }
          console.log(`✅ beforeUpload passed for ${file.name}`);
        }

        console.log(`✅ Valid file: ${file.name}`);
        validFiles.push(file);
        uploadedCount++;
      }

      console.log(
        `\n📊 Summary: ${uploadedCount} / ${files.length} files will be uploaded`
      );

      // Create upload file objects for all valid files at once
      const uploadFileObjects: UploadFile[] = validFiles.map((file) => {
        const previewUrl = file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : undefined;

        return {
          uid: generateUID(),
          name: file.name,
          size: file.size,
          type: file.type,
          status: "uploading" as FileStatus,
          percent: 0,
          originFileObj: file,
          url: previewUrl,
          thumbUrl: previewUrl,
        };
      });

      // Add all files to list at once
      updateFileList((prev) => [...prev, ...uploadFileObjects]);

      // Then trigger upload for each file
      uploadFileObjects.forEach((uploadFileObj, index) => {
        const file = validFiles[index];

        // Start upload process
        if (customRequest) {
          customRequest({
            file,
            onProgress: (percent) => {
              const updatedFile = { ...uploadFileObj, percent };
              updateFileList(
                (prev) =>
                  prev.map((f) =>
                    f.uid === uploadFileObj.uid ? updatedFile : f
                  ),
                updatedFile
              );
            },
            onSuccess: (response) => {
              const successFile = {
                ...uploadFileObj,
                status: "done" as FileStatus,
                percent: 100,
                response,
              };
              updateFileList(
                (prev) =>
                  prev.map((f) =>
                    f.uid === uploadFileObj.uid ? successFile : f
                  ),
                successFile
              );
            },
            onError: (error) => {
              const errorFile = {
                ...uploadFileObj,
                status: "error" as FileStatus,
                error,
              };
              updateFileList(
                (prev) =>
                  prev.map((f) =>
                    f.uid === uploadFileObj.uid ? errorFile : f
                  ),
                errorFile
              );
            },
          });
        } else if (action) {
          // Default upload using XHR - similar implementation
          const url = typeof action === "function" ? action(file) : action;
          const formData = new FormData();
          formData.append("file", file);

          const xhr = new XMLHttpRequest();

          xhr.upload.addEventListener("progress", (e) => {
            if (e.lengthComputable) {
              const percent = Math.round((e.loaded / e.total) * 100);
              const updatedFile = { ...uploadFileObj, percent };
              updateFileList(
                (prev) =>
                  prev.map((f) =>
                    f.uid === uploadFileObj.uid ? updatedFile : f
                  ),
                updatedFile
              );
            }
          });

          xhr.addEventListener("load", () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              const response = JSON.parse(xhr.responseText);
              const successFile = {
                ...uploadFileObj,
                status: "done" as FileStatus,
                percent: 100,
                response,
                url: response.url || response.data?.url,
              };
              updateFileList(
                (prev) =>
                  prev.map((f) =>
                    f.uid === uploadFileObj.uid ? successFile : f
                  ),
                successFile
              );
            } else {
              const errorFile = {
                ...uploadFileObj,
                status: "error" as FileStatus,
                error: new Error(`Upload failed with status ${xhr.status}`),
              };
              updateFileList(
                (prev) =>
                  prev.map((f) =>
                    f.uid === uploadFileObj.uid ? errorFile : f
                  ),
                errorFile
              );
            }
          });

          xhr.addEventListener("error", () => {
            const errorFile = {
              ...uploadFileObj,
              status: "error" as FileStatus,
              error: new Error("Network error"),
            };
            updateFileList(
              (prev) =>
                prev.map((f) => (f.uid === uploadFileObj.uid ? errorFile : f)),
              errorFile
            );
          });

          xhr.open("POST", url);

          if (headers) {
            Object.entries(headers).forEach(([key, value]) => {
              xhr.setRequestHeader(key, value);
            });
          }

          if (withCredentials) {
            xhr.withCredentials = true;
          }

          xhr.send(formData);
        } else {
          // No action or customRequest, just mark as done (mock upload)
          console.log(
            `⏱️ Mock upload starting for ${file.name} (delay: ${100 + index * 50}ms)`
          );
          setTimeout(
            () => {
              console.log(`✅ Mock upload complete for ${file.name}`);
              const successFile = {
                ...uploadFileObj,
                status: "done" as FileStatus,
                percent: 100,
              };
              updateFileList((prev) => {
                console.log(
                  `📝 Updating status for ${file.name}, current list:`,
                  prev.length
                );
                return prev.map((f) =>
                  f.uid === uploadFileObj.uid ? successFile : f
                );
              }, successFile);
            },
            100 + index * 50
          ); // Stagger completion times
        }
      });

      // Reset input
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    };

    // Handle remove
    const handleRemove = async (file: UploadFile) => {
      if (onRemove) {
        const result = await onRemove(file);
        if (result === false) return;
      }

      updateFileList((prev) => prev.filter((f) => f.uid !== file.uid), {
        ...file,
        status: "removed" as FileStatus,
      });

      // Revoke object URL if exists
      if (file.url && file.url.startsWith("blob:")) {
        URL.revokeObjectURL(file.url);
      }
    };

    // Handle drag and drop
    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled && canUploadMore) {
        setIsDragOver(true);
      }
    };

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);
    };

    const handleDrop = async (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);

      if (disabled || !canUploadMore) return;

      let files = Array.from(e.dataTransfer.files);

      if (files.length === 0) return;

      // Check multiple - if multiple is false and there's already a file, reject
      if (!multiple && fileList.length > 0) {
        toast.error(
          "You can only upload one file. Please remove the existing file first."
        );
        return;
      }

      // Check multiple - only allow 1 file if multiple is false
      if (!multiple && files.length > 1) {
        toast.error("You can only upload one file at a time");
        files = [files[0]]; // Take only the first file
      }

      // Check max count
      if (maxCount && fileList.length + files.length > maxCount) {
        toast.error(`You can only upload up to ${maxCount} file(s)`);
        return;
      }

      // Process each file
      for (const file of files) {
        // Check accept
        if (accept && !file.type.match(new RegExp(accept.replace(/,/g, "|")))) {
          continue;
        }

        // Check max size
        if (maxSize && file.size > maxSize) {
          toast.error(
            `${file.name} exceeds maximum size of ${formatFileSize(maxSize)}`
          );
          continue;
        }

        // Before upload hook
        if (beforeUpload) {
          const result = await beforeUpload(file, files);
          if (result === false) continue;
        }

        uploadFile(file);
      }
    };

    // Click to upload
    const handleClick = () => {
      if (!disabled && canUploadMore) {
        inputRef.current?.click();
      }
    };

    // Handle preview - use built-in dialog if no onPreview provided
    const handlePreview = (file: UploadFile) => {
      if (onPreview) {
        onPreview(file);
      } else {
        // Built-in preview for images
        if (file.url || file.thumbUrl) {
          setPreviewImage(file.url || file.thumbUrl || "");
          setPreviewTitle(file.name);
          setPreviewOpen(true);
        }
      }
    };

    // Handle download - use built-in download if no onDownload provided
    const handleDownload = async (file: UploadFile) => {
      if (onDownload) {
        onDownload(file);
      } else {
        // Built-in download - handle cross-origin URLs
        if (file.url) {
          // Don't allow download for uploading or error status
          if (file.status === "uploading") {
            toast.error("Please wait until the file finishes uploading");
            return;
          }
          if (file.status === "error") {
            toast.error("Cannot download file with error status");
            return;
          }

          try {
            // For cross-origin URLs (like Unsplash), we need to fetch and create a blob
            const response = await fetch(file.url);
            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = file.name;
            link.style.display = "none";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Clean up blob URL after download
            setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
          } catch {
            // Fallback to direct link if fetch fails (e.g., CORS issues)
            const link = document.createElement("a");
            link.href = file.url;
            link.download = file.name;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.style.display = "none";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        }
      }
    };

    // Show upload list config
    const uploadListConfig =
      typeof showUploadList === "boolean"
        ? {
            showPreviewIcon: true,
            showRemoveIcon: true,
            showDownloadIcon: true,
          }
        : {
            showPreviewIcon: showUploadList.showPreviewIcon ?? true,
            showRemoveIcon: showUploadList.showRemoveIcon ?? true,
            showDownloadIcon: showUploadList.showDownloadIcon ?? true,
          };

    return (
      <>
        <div ref={ref} className={cn(className)} {...props}>
          {/* Upload Area - Always show, just disable when needed */}
          <div
            className={cn(
              uploadVariants({
                variant,
                status:
                  disabled || !canUploadMore
                    ? "disabled"
                    : isDragOver
                      ? "dragover"
                      : "idle",
                size: [
                  "dropzone",
                  "primaryDropzone",
                  "secondaryDropzone",
                ].includes(variant as any)
                  ? undefined
                  : size,
              }),
              ["dropzone", "primaryDropzone", "secondaryDropzone"].includes(
                variant as any
              ) && "min-h-[180px] min-w-[300px]",
              !showBorder && "border-0",
              !iconOnly &&
                variant !== "avatar" &&
                variant !== "avatarCircle" &&
                "px-4",
              // Remove disabled opacity for avatar variants when image is shown
              (variant === "avatar" || variant === "avatarCircle") &&
                fileList.length > 0 &&
                fileList[0].url &&
                "opacity-100!"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
          >
            <input
              ref={inputRef}
              type="file"
              accept={accept}
              multiple={multiple}
              disabled={disabled}
              onChange={handleFileChange}
              className="hidden"
              {...(directory
                ? ({ webkitdirectory: "", directory: "" } as any)
                : {})}
            />

            {/* Avatar variant - show image if exists and not disabled, otherwise show children */}
            {variant === "avatar" || variant === "avatarCircle" ? (
              <>
                {fileList.length > 0 && fileList[0].url && !disabled ? (
                  <div className="relative w-full h-full group">
                    <img
                      draggable={false}
                      src={fileList[0].url || fileList[0].thumbUrl}
                      alt={fileList[0].name}
                      className={cn(
                        "w-full h-full object-cover",
                        variant === "avatarCircle" && "rounded-full",
                        variant === "avatar" && "rounded-lg"
                      )}
                    />
                    {/* Delete button overlay */}
                    <div
                      className={cn(
                        "absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center",
                        variant === "avatarCircle" && "rounded-full",
                        variant === "avatar" && "rounded-lg"
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(fileList[0]);
                      }}
                    >
                      <Trash2 className="h-6 w-6 text-white cursor-pointer hover:scale-110 transition-transform" />
                    </div>
                  </div>
                ) : (
                  children
                )}
              </>
            ) : (
              <div
                className={cn(
                  "flex items-center justify-center gap-2",
                  ["secondaryDropzone", "dropzone", "primaryDropzone"].includes(
                    variant as any
                  ) && "flex-col"
                )}
              >
                {uploadIcon ? (
                  <div
                    className={cn(
                      [
                        "dropzone",
                        "primaryDropzone",
                        "secondaryDropzone",
                      ].includes(variant as any)
                        ? "h-10 w-10"
                        : size === "small"
                          ? "h-5 w-5"
                          : "h-6 w-6",
                      variant === "outline" && "text-gray-500",
                      [
                        "primaryDropzone",
                        "secondaryDropzone",
                        "primaryOutline",
                      ].includes(variant as any) && "text-primary"
                    )}
                  >
                    {uploadIcon}
                  </div>
                ) : (
                  <>
                    {iconOnly ? (
                      <UploadIcon
                        className={cn(
                          [
                            "dropzone",
                            "primaryDropzone",
                            "secondaryDropzone",
                          ].includes(variant as any)
                            ? "h-10 w-10"
                            : size === "small"
                              ? "h-5 w-5"
                              : "h-6 w-6",
                          variant === "outline" && "text-gray-500",
                          [
                            "secondaryDropzone",
                            "primaryDropzone",
                            "primaryOutline",
                          ].includes(variant as any) && "text-primary"
                        )}
                      />
                    ) : (
                      <CloudUploadIcon
                        className={cn(
                          [
                            "dropzone",
                            "primaryDropzone",
                            "secondaryDropzone",
                          ].includes(variant as any)
                            ? "h-10 w-10"
                            : size === "small"
                              ? "h-5 w-5"
                              : "h-6 w-6",
                          variant === "outline" && "text-gray-500",
                          [
                            "primaryDropzone",
                            "secondaryDropzone",
                            "primaryOutline",
                          ].includes(variant as any) && "text-primary"
                        )}
                      />
                    )}
                  </>
                )}
                {!iconOnly && (
                  <>
                    <span className="font-medium whitespace-nowrap text-sm">
                      {uploadText}
                    </span>
                    {uploadDescription &&
                      [
                        "dropzone",
                        "primaryDropzone",
                        "secondaryDropzone",
                      ].includes(variant as any) && (
                        <span className="text-xs text-gray-500">
                          {uploadDescription}
                        </span>
                      )}
                  </>
                )}
              </div>
            )}
          </div>

          {/* File List */}
          {showUploadList && fileList.length > 0 && (
            <div
              className={cn(
                "mt-4",
                (effectiveListType === "picture-card" ||
                  effectiveListType === "picture-circle") &&
                  "grid gap-2",
                effectiveListType === "picture" && "space-y-2"
              )}
              style={{
                gridTemplateColumns:
                  effectiveListType === "picture-card" ||
                  effectiveListType === "picture-circle"
                    ? `repeat(${pictureCardCols}, 1fr)`
                    : undefined,
                minWidth:
                  effectiveListType === "picture-card" ||
                  effectiveListType === "picture-circle"
                    ? "100px"
                    : undefined,
              }}
            >
              {fileList
                .filter((file) => file.response !== Upload.LIST_IGNORE)
                .map((file) => (
                  <FileItem
                    key={file.uid}
                    file={file}
                    listType={effectiveListType}
                    onRemove={() => handleRemove(file)}
                    onPreview={handlePreview}
                    onDownload={handleDownload}
                    showPreviewIcon={uploadListConfig.showPreviewIcon}
                    showRemoveIcon={uploadListConfig.showRemoveIcon}
                    showDownloadIcon={uploadListConfig.showDownloadIcon}
                    pictureCardSize={pictureCardSize}
                  />
                ))}
            </div>
          )}
        </div>

        {/* Built-in preview dialog */}
        <Dialog
          open={previewOpen}
          onOpenChange={setPreviewOpen}
          title={previewTitle}
          size="lg"
        >
          <img
            src={previewImage}
            alt={previewTitle}
            className="w-full h-auto max-h-[70vh] object-contain"
          />
        </Dialog>
      </>
    );
  }
);

UploadBase.displayName = "Upload";

// Add static property for LIST_IGNORE
interface UploadComponent
  extends React.ForwardRefExoticComponent<
    UploadProps & React.RefAttributes<HTMLDivElement>
  > {
  LIST_IGNORE: string;
}

export const Upload = UploadBase as UploadComponent;
Upload.LIST_IGNORE = "LIST_IGNORE";

// File Item Component
interface FileItemProps {
  file: UploadFile;
  listType: "text" | "picture" | "picture-card" | "picture-circle";
  onRemove: () => void;
  onPreview?: (file: UploadFile) => void;
  onDownload?: (file: UploadFile) => void;
  showPreviewIcon?: boolean;
  showRemoveIcon?: boolean;
  showDownloadIcon?: boolean;
  pictureCardSize?: number;
}

const FileItem: React.FC<FileItemProps> = ({
  file,
  listType,
  onRemove,
  onPreview,
  onDownload,
  showPreviewIcon,
  showRemoveIcon,
  showDownloadIcon,
  // pictureCardSize, // Unused currently
}) => {
  const isImage = file.type?.startsWith("image/");
  const canPreview = isImage || file.url;

  if (listType === "picture-card") {
    return (
      <div
        className="relative aspect-square rounded-lg border bg-muted/50 overflow-hidden group"
        style={{
          width: "100px",
          height: "100px",
          minWidth: "100px",
          minHeight: "100px",
          padding: "4px",
        }}
      >
        {/* Image or Icon */}
        {file.url && isImage ? (
          <img
            src={file.thumbUrl || file.url}
            alt={file.name}
            className="h-full w-full object-cover rounded-lg"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            {getFileIcon(file)}
          </div>
        )}

        {/* Upload Progress */}
        {file.status === "uploading" && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <div className="w-full px-4">
              <div className="flex items-center gap-2 mb-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-xs">{file.percent}%</span>
              </div>
              <div className="h-1 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${file.percent}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Status Icon */}
        {file.status === "done" && (
          <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
            <CheckCircle2 className="h-4 w-4 text-white" />
          </div>
        )}
        {file.status === "error" && (
          <div className="absolute top-2 right-2 bg-red-500 rounded-full p-1">
            <AlertCircle className="h-4 w-4 text-white" />
          </div>
        )}

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          {showPreviewIcon && canPreview && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPreview?.(file);
              }}
              className="p-1 rounded-full bg-background/20 hover:bg-background/30 transition-colors"
              title="Preview"
            >
              <Eye className="h-4 w-4 text-white" />
            </button>
          )}
          {showDownloadIcon && file.url && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDownload?.(file);
              }}
              className="p-1 rounded-full bg-background/20 hover:bg-background/30 transition-colors"
              title="Download"
            >
              <Download className="h-4 w-4 text-white" />
            </button>
          )}
          {showRemoveIcon && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              className="p-1 rounded-full bg-background/20 hover:bg-background/30 transition-colors"
              title="Remove"
            >
              <Trash2 className="h-4 w-4 text-white" />
            </button>
          )}
        </div>

        {/* File name tooltip */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-white text-xs truncate opacity-0 group-hover:opacity-100 transition-opacity">
          {file.name}
        </div>
      </div>
    );
  }

  if (listType === "picture-circle") {
    return (
      <div
        className={cn(
          "relative aspect-square rounded-full border bg-muted/50 overflow-hidden group",
          file.status === "done" && "border-2 border-green-500",
          file.status === "error" && "border-2 border-red-500"
        )}
        style={{
          width: "100px",
          height: "100px",
          minWidth: "100px",
          minHeight: "100px",
          padding: "4px",
        }}
      >
        {/* Image or Icon */}
        {file.url && isImage ? (
          <img
            src={file.thumbUrl || file.url}
            alt={file.name}
            className="h-full w-full object-cover rounded-full"
          />
        ) : (
          <div className="flex items-center justify-center h-full rounded-full bg-muted">
            {getFileIcon(file)}
          </div>
        )}

        {/* Upload Progress */}
        {file.status === "uploading" && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center rounded-full">
            <div className="w-full px-4">
              <div className="flex items-center gap-2 mb-2 justify-center">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-xs">{file.percent}%</span>
              </div>
              <div className="h-1 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${file.percent}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 rounded-full">
          {showPreviewIcon && canPreview && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPreview?.(file);
              }}
              className="p-1 rounded-full bg-background/20 hover:bg-background/30 transition-colors"
              title="Preview"
            >
              <Eye className="h-4 w-4 text-white" />
            </button>
          )}
          {showDownloadIcon && file.url && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDownload?.(file);
              }}
              className="p-1 rounded-full bg-background/20 hover:bg-background/30 transition-colors"
              title="Download"
            >
              <Download className="h-4 w-4 text-white" />
            </button>
          )}
          {showRemoveIcon && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              className="p-1 rounded-full bg-background/20 hover:bg-background/30 transition-colors"
              title="Remove"
            >
              <Trash2 className="h-4 w-4 text-white" />
            </button>
          )}
          {/* File name tooltip */}
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-white text-xs truncate opacity-0 group-hover:opacity-100 transition-opacity">
            {file.name}
          </div>
        </div>
      </div>
    );
  }

  if (listType === "picture") {
    return (
      <div className="flex items-center gap-3 p-2 rounded-lg border bg-background hover:bg-muted/50 transition-colors group">
        {/* Thumbnail */}
        <div className="shrink-0 h-10 w-10 rounded overflow-hidden bg-muted flex items-center justify-center">
          {file.url && isImage ? (
            <img
              src={file.thumbUrl || file.url}
              alt={file.name}
              className="h-full w-full object-cover"
            />
          ) : (
            getFileIcon(file)
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{file.name}</p>
          <div className="flex items-center gap-2 mt-1">
            {file.size && (
              <span className="text-xs text-muted-foreground">
                {formatFileSize(file.size)}
              </span>
            )}
            {file.status === "uploading" && (
              <span className="text-xs text-primary">{file.percent}%</span>
            )}
            {file.status === "done" && (
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            )}
            {file.status === "error" && (
              <AlertCircle className="h-4 w-4 text-red-500" />
            )}
          </div>
          {file.status === "uploading" && (
            <div className="h-1 bg-muted rounded-full overflow-hidden mt-2">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${file.percent}%` }}
              />
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {showPreviewIcon && canPreview && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPreview?.(file);
              }}
              className="p-1.5 rounded hover:bg-muted transition-colors"
              title="Preview"
            >
              <Eye className="h-4 w-4" />
            </button>
          )}
          {showDownloadIcon && file.url && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDownload?.(file);
              }}
              className="p-1.5 rounded hover:bg-muted transition-colors"
              title="Download"
            >
              <Download className="h-4 w-4" />
            </button>
          )}
          {showRemoveIcon && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              className="p-1.5 rounded hover:bg-destructive/10 transition-colors text-destructive"
              title="Remove"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    );
  }

  // Text list
  return (
    <div className="flex items-center gap-2 p-2 rounded hover:bg-muted/50 transition-colors group">
      {/* Icon */}
      <div className="shrink-0">{getFileIcon(file)}</div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm truncate">{file.name}</p>
          {/* Status */}
          {file.status === "done" && (
            <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
          )}
          {file.status === "error" && (
            <AlertCircle className="h-4 w-4 text-red-500 shrink-0" />
          )}
          {file.status === "uploading" && (
            <Loader2 className="h-4 w-4 animate-spin shrink-0" />
          )}
        </div>

        {file.status === "uploading" && (
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${file.percent}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground">
              {file.percent}%
            </span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {showPreviewIcon && canPreview && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPreview?.(file);
            }}
            className="p-1 rounded hover:bg-muted transition-colors"
            title="Preview"
          >
            <Eye className="h-4 w-4" />
          </button>
        )}
        {showDownloadIcon && file.url && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDownload?.(file);
            }}
            className="p-1 rounded hover:bg-muted transition-colors"
            title="Download"
          >
            <Download className="h-4 w-4" />
          </button>
        )}
        {showRemoveIcon && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="p-1 rounded hover:bg-destructive/10 transition-colors text-destructive"
            title="Remove"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Upload;
