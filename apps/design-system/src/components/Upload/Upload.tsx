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
  "ds:relative ds:flex ds:justify-center ds:items-center ds:rounded-lg ds:transition-all ds:duration-200 ds:cursor-pointer ds:select-none",
  {
    variants: {
      variant: {
        outline: "ds:border ds:border-ink800/10 ds:bg-white ds:text-ink800",
        primaryOutline: "ds:border ds:border-primaryA-500 ds:bg-white ds:text-primaryA-500",
        icon: "ds:border ds:border-primaryA-500 ds:text-primaryA-500 ds:bg-white ds:rounded-xl ds:p-2",
        avatar:
          "ds:border-2 ds:border-dashed ds:border-ink800/20 ds:bg-white ds:!w-full ds:!h-full ds:flex-col ds:text-center ds:hover:border-ink800/40 ds:!p-1",
        avatarCircle:
          "ds:border-2 ds:border-dashed ds:border-ink800/20 ds:bg-white ds:!w-full ds:!h-full ds:rounded-full ds:flex-col ds:text-center ds:hover:border-ink800/40 ds:!p-1",
        dropzone:
          "ds:border ds:border-ink800/10 ds:bg-white ds:flex-col ds:text-center ds:py-10",
        primaryDropzone:
          "ds:border ds:border-primaryA-500 ds:bg-primaryA-500/10 ds:flex-col ds:text-center ds:py-10",
        secondaryDropzone:
          "ds:border ds:border-ink800/10 ds:bg-ink800/10 ds:flex-col ds:text-center ds:py-10",
      },

      size: {
        small: "ds:h-8 ds:p-[6px] ds:text-sm",
        medium: "ds:h-10 ds:p-2 ds:text-base",
        large: "ds:h-12 ds:p-3 ds:text-base",
      },

      status: {
        idle: "",
        dragover: "ds:border-primaryA-500 ds:bg-primaryA-500/5 ds:scale-[1.02]",
        disabled: "ds:opacity-50 ds:cursor-not-allowed",
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

  if (type.startsWith("image/")) return <ImageIcon className="ds:h-4 ds:w-4" />;
  if (type.startsWith("video/")) return <Film className="ds:h-4 ds:w-4" />;
  if (type.startsWith("audio/")) return <Music className="ds:h-4 ds:w-4" />;
  if (name.endsWith(".zip") || name.endsWith(".rar") || name.endsWith(".7z"))
    return <Archive className="ds:h-4 ds:w-4" />;
  if (
    name.endsWith(".js") ||
    name.endsWith(".ts") ||
    name.endsWith(".jsx") ||
    name.endsWith(".tsx") ||
    name.endsWith(".css") ||
    name.endsWith(".html")
  )
    return <FileCode className="ds:h-4 ds:w-4" />;
  if (name.endsWith(".txt") || name.endsWith(".md"))
    return <FileText className="ds:h-4 ds:w-4" />;
  return <File className="ds:h-4 ds:w-4" />;
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
              ) && "ds:min-h-[180px] ds:min-w-[300px]",
              !showBorder && "ds:border-0",
              !iconOnly &&
                variant !== "avatar" &&
                variant !== "avatarCircle" &&
                "ds:px-4",
              // Remove disabled opacity for avatar variants when image is shown
              (variant === "avatar" || variant === "avatarCircle") &&
                fileList.length > 0 &&
                fileList[0].url &&
                "ds:opacity-100!"
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
              className="ds:hidden"
              {...(directory
                ? ({ webkitdirectory: "", directory: "" } as any)
                : {})}
            />

            {/* Avatar variant - show image if exists and not disabled, otherwise show children */}
            {variant === "avatar" || variant === "avatarCircle" ? (
              <>
                {fileList.length > 0 && fileList[0].url && !disabled ? (
                  <div className="ds:relative ds:w-full ds:h-full ds:group">
                    <img
                      draggable={false}
                      src={fileList[0].url || fileList[0].thumbUrl}
                      alt={fileList[0].name}
                      className={cn(
                        "ds:w-full ds:h-full ds:object-cover",
                        variant === "avatarCircle" && "ds:rounded-full",
                        variant === "avatar" && "ds:rounded-lg"
                      )}
                    />
                    {/* Delete button overlay */}
                    <div
                      className={cn(
                        "ds:absolute ds:inset-0 ds:bg-blackOpacity600 ds:opacity-0 ds:group-hover:opacity-100 ds:transition-opacity ds:flex ds:items-center ds:justify-center",
                        variant === "avatarCircle" && "ds:rounded-full",
                        variant === "avatar" && "ds:rounded-lg"
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(fileList[0]);
                      }}
                    >
                      <Trash2 className="ds:h-6 ds:w-6 ds:text-white ds:cursor-pointer ds:hover:scale-110 ds:transition-transform" />
                    </div>
                  </div>
                ) : (
                  children
                )}
              </>
            ) : (
              <div
                className={cn(
                  "ds:flex ds:items-center ds:justify-center ds:gap-2",
                  ["secondaryDropzone", "dropzone", "primaryDropzone"].includes(
                    variant as any
                  ) && "ds:flex-col"
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
                        ? "ds:h-10 ds:w-10"
                        : size === "small"
                          ? "ds:h-5 ds:w-5"
                          : "ds:h-6 ds:w-6",
                      variant === "outline" && "ds:text-ink600",
                      [
                        "primaryDropzone",
                        "secondaryDropzone",
                        "primaryOutline",
                      ].includes(variant as any) && "ds:text-primaryA-500"
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
                            ? "ds:h-10 ds:w-10"
                            : size === "small"
                              ? "ds:h-5 ds:w-5"
                              : "ds:h-6 ds:w-6",
                          variant === "outline" && "ds:text-ink600",
                          [
                            "secondaryDropzone",
                            "primaryDropzone",
                            "primaryOutline",
                          ].includes(variant as any) && "ds:text-primaryA-500"
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
                            ? "ds:h-10 ds:w-10"
                            : size === "small"
                              ? "ds:h-5 ds:w-5"
                              : "ds:h-6 ds:w-6",
                          variant === "outline" && "ds:text-ink600",
                          [
                            "primaryDropzone",
                            "secondaryDropzone",
                            "primaryOutline",
                          ].includes(variant as any) && "ds:text-primaryA-500"
                        )}
                      />
                    )}
                  </>
                )}
                {!iconOnly && (
                  <>
                    <span className="ds:font-medium ds:whitespace-nowrap ds:text-sm">
                      {uploadText}
                    </span>
                    {uploadDescription &&
                      [
                        "dropzone",
                        "primaryDropzone",
                        "secondaryDropzone",
                      ].includes(variant as any) && (
                        <span className="ds:text-xs ds:text-ink600">
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
                "ds:mt-4",
                (effectiveListType === "picture-card" ||
                  effectiveListType === "picture-circle") &&
                  "ds:grid ds:gap-2",
                effectiveListType === "picture" && "ds:space-y-2"
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
            className="ds:w-full ds:h-auto ds:max-h-[70vh] ds:object-contain"
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
        className="ds:relative ds:aspect-square ds:rounded-lg ds:border ds:bg-ink200/50 ds:overflow-hidden ds:group"
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
            className="ds:h-full ds:w-full ds:object-cover ds:rounded-lg"
          />
        ) : (
          <div className="ds:flex ds:items-center ds:justify-center ds:h-full">
            {getFileIcon(file)}
          </div>
        )}

        {/* Upload Progress */}
        {file.status === "uploading" && (
          <div className="ds:absolute ds:inset-0 ds:bg-white/80 ds:flex ds:items-center ds:justify-center">
            <div className="ds:w-full ds:px-4">
              <div className="ds:flex ds:items-center ds:gap-2 ds:mb-2">
                <Loader2 className="ds:h-4 ds:w-4 ds:animate-spin" />
                <span className="ds:text-xs">{file.percent}%</span>
              </div>
              <div className="ds:h-1 ds:bg-ink200 ds:rounded-full ds:overflow-hidden">
                <div
                  className="ds:h-full ds:bg-primaryA-500 ds:transition-all ds:duration-300"
                  style={{ width: `${file.percent}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Status Icon */}
        {file.status === "done" && (
          <div className="ds:absolute ds:top-2 ds:right-2 ds:bg-green-500 ds:rounded-full ds:p-1">
            <CheckCircle2 className="ds:h-4 ds:w-4 ds:text-white" />
          </div>
        )}
        {file.status === "error" && (
          <div className="ds:absolute ds:top-2 ds:right-2 ds:bg-red-500 ds:rounded-full ds:p-1">
            <AlertCircle className="ds:h-4 ds:w-4 ds:text-white" />
          </div>
        )}

        {/* Hover Actions */}
        <div className="ds:absolute ds:inset-0 ds:bg-blackOpacity700 ds:opacity-0 ds:group-hover:opacity-100 ds:transition-opacity ds:flex ds:items-center ds:justify-center ds:gap-2">
          {showPreviewIcon && canPreview && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPreview?.(file);
              }}
              className="ds:p-1 ds:rounded-full ds:bg-white/20 ds:hover:bg-white/30 ds:transition-colors"
              title="Preview"
            >
              <Eye className="ds:h-4 ds:w-4 ds:text-white" />
            </button>
          )}
          {showDownloadIcon && file.url && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDownload?.(file);
              }}
              className="ds:p-1 ds:rounded-full ds:bg-white/20 ds:hover:bg-white/30 ds:transition-colors"
              title="Download"
            >
              <Download className="ds:h-4 ds:w-4 ds:text-white" />
            </button>
          )}
          {showRemoveIcon && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              className="ds:p-1 ds:rounded-full ds:bg-white/20 ds:hover:bg-white/30 ds:transition-colors"
              title="Remove"
            >
              <Trash2 className="ds:h-4 ds:w-4 ds:text-white" />
            </button>
          )}
        </div>

        {/* File name tooltip */}
        <div className="ds:absolute ds:bottom-0 ds:left-0 ds:right-0 ds:bg-blackOpacity700 ds:p-2 ds:text-white ds:text-xs ds:truncate ds:opacity-0 ds:group-hover:opacity-100 ds:transition-opacity">
          {file.name}
        </div>
      </div>
    );
  }

  if (listType === "picture-circle") {
    return (
      <div
        className={cn(
          "ds:relative ds:aspect-square ds:rounded-full ds:border ds:bg-ink200/50 ds:overflow-hidden ds:group",
          file.status === "done" && "ds:border-2 ds:border-green-500",
          file.status === "error" && "ds:border-2 ds:border-red-500"
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
            className="ds:h-full ds:w-full ds:object-cover ds:rounded-full"
          />
        ) : (
          <div className="ds:flex ds:items-center ds:justify-center ds:h-full ds:rounded-full ds:bg-ink200">
            {getFileIcon(file)}
          </div>
        )}

        {/* Upload Progress */}
        {file.status === "uploading" && (
          <div className="ds:absolute ds:inset-0 ds:bg-white/80 ds:flex ds:items-center ds:justify-center ds:rounded-full">
            <div className="ds:w-full ds:px-4">
              <div className="ds:flex ds:items-center ds:gap-2 ds:mb-2 ds:justify-center">
                <Loader2 className="ds:h-4 ds:w-4 ds:animate-spin" />
                <span className="ds:text-xs">{file.percent}%</span>
              </div>
              <div className="ds:h-1 ds:bg-ink200 ds:rounded-full ds:overflow-hidden">
                <div
                  className="ds:h-full ds:bg-primaryA-500 ds:transition-all ds:duration-300"
                  style={{ width: `${file.percent}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Hover Actions */}
        <div className="ds:absolute ds:inset-0 ds:bg-blackOpacity700 ds:opacity-0 ds:group-hover:opacity-100 ds:transition-opacity ds:flex ds:items-center ds:justify-center ds:gap-2 ds:rounded-full">
          {showPreviewIcon && canPreview && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPreview?.(file);
              }}
              className="ds:p-1 ds:rounded-full ds:bg-white/20 ds:hover:bg-white/30 ds:transition-colors"
              title="Preview"
            >
              <Eye className="ds:h-4 ds:w-4 ds:text-white" />
            </button>
          )}
          {showDownloadIcon && file.url && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDownload?.(file);
              }}
              className="ds:p-1 ds:rounded-full ds:bg-white/20 ds:hover:bg-white/30 ds:transition-colors"
              title="Download"
            >
              <Download className="ds:h-4 ds:w-4 ds:text-white" />
            </button>
          )}
          {showRemoveIcon && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              className="ds:p-1 ds:rounded-full ds:bg-white/20 ds:hover:bg-white/30 ds:transition-colors"
              title="Remove"
            >
              <Trash2 className="ds:h-4 ds:w-4 ds:text-white" />
            </button>
          )}
          {/* File name tooltip */}
          <div className="ds:absolute ds:bottom-0 ds:left-0 ds:right-0 ds:bg-blackOpacity700 ds:p-2 ds:text-white ds:text-xs ds:truncate ds:opacity-0 ds:group-hover:opacity-100 ds:transition-opacity">
            {file.name}
          </div>
        </div>
      </div>
    );
  }

  if (listType === "picture") {
    return (
      <div className="ds:flex ds:items-center ds:gap-3 ds:p-2 ds:rounded-lg ds:border ds:bg-white ds:hover:bg-ink200/50 ds:transition-colors ds:group">
        {/* Thumbnail */}
        <div className="ds:shrink-0 ds:h-10 ds:w-10 ds:rounded ds:overflow-hidden ds:bg-ink200 ds:flex ds:items-center ds:justify-center">
          {file.url && isImage ? (
            <img
              src={file.thumbUrl || file.url}
              alt={file.name}
              className="ds:h-full ds:w-full ds:object-cover"
            />
          ) : (
            getFileIcon(file)
          )}
        </div>

        {/* Info */}
        <div className="ds:flex-1 ds:min-w-0">
          <p className="ds:text-sm ds:font-medium ds:truncate">{file.name}</p>
          <div className="ds:flex ds:items-center ds:gap-2 ds:mt-1">
            {file.size && (
              <span className="ds:text-xs ds:text-ink700">
                {formatFileSize(file.size)}
              </span>
            )}
            {file.status === "uploading" && (
              <span className="ds:text-xs ds:text-primaryA-500">{file.percent}%</span>
            )}
            {file.status === "done" && (
              <CheckCircle2 className="ds:h-4 ds:w-4 ds:text-green-500" />
            )}
            {file.status === "error" && (
              <AlertCircle className="ds:h-4 ds:w-4 ds:text-red-500" />
            )}
          </div>
          {file.status === "uploading" && (
            <div className="ds:h-1 ds:bg-ink200 ds:rounded-full ds:overflow-hidden ds:mt-2">
              <div
                className="ds:h-full ds:bg-primaryA-500 ds:transition-all ds:duration-300"
                style={{ width: `${file.percent}%` }}
              />
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="ds:flex ds:items-center ds:gap-1 ds:opacity-0 ds:group-hover:opacity-100 ds:transition-opacity">
          {showPreviewIcon && canPreview && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPreview?.(file);
              }}
              className="ds:p-1.5 ds:rounded ds:hover:bg-ink200 ds:transition-colors"
              title="Preview"
            >
              <Eye className="ds:h-4 ds:w-4" />
            </button>
          )}
          {showDownloadIcon && file.url && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDownload?.(file);
              }}
              className="ds:p-1.5 ds:rounded ds:hover:bg-ink200 ds:transition-colors"
              title="Download"
            >
              <Download className="ds:h-4 ds:w-4" />
            </button>
          )}
          {showRemoveIcon && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              className="ds:p-1.5 ds:rounded ds:hover:bg-red600/10 ds:transition-colors ds:text-red600"
              title="Remove"
            >
              <X className="ds:h-4 ds:w-4" />
            </button>
          )}
        </div>
      </div>
    );
  }

  // Text list
  return (
    <div className="ds:flex ds:items-center ds:gap-2 ds:p-2 ds:rounded ds:hover:bg-ink200/50 ds:transition-colors ds:group">
      {/* Icon */}
      <div className="ds:shrink-0">{getFileIcon(file)}</div>

      {/* Info */}
      <div className="ds:flex-1 ds:min-w-0">
        <div className="ds:flex ds:items-center ds:gap-2">
          <p className="ds:text-sm ds:truncate">{file.name}</p>
          {/* Status */}
          {file.status === "done" && (
            <CheckCircle2 className="ds:h-4 ds:w-4 ds:text-green-500 ds:shrink-0" />
          )}
          {file.status === "error" && (
            <AlertCircle className="ds:h-4 ds:w-4 ds:text-red-500 ds:shrink-0" />
          )}
          {file.status === "uploading" && (
            <Loader2 className="ds:h-4 ds:w-4 ds:animate-spin ds:shrink-0" />
          )}
        </div>

        {file.status === "uploading" && (
          <div className="ds:flex ds:items-center ds:gap-2">
            <div className="ds:flex-1 ds:h-1 ds:bg-ink200 ds:rounded-full ds:overflow-hidden">
              <div
                className="ds:h-full ds:bg-primaryA-500 ds:transition-all ds:duration-300"
                style={{ width: `${file.percent}%` }}
              />
            </div>
            <span className="ds:text-xs ds:text-ink700">
              {file.percent}%
            </span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="ds:flex ds:items-center ds:gap-1 ds:opacity-0 ds:group-hover:opacity-100 ds:transition-opacity">
        {showPreviewIcon && canPreview && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPreview?.(file);
            }}
            className="ds:p-1 ds:rounded ds:hover:bg-ink200 ds:transition-colors"
            title="Preview"
          >
            <Eye className="ds:h-4 ds:w-4" />
          </button>
        )}
        {showDownloadIcon && file.url && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDownload?.(file);
            }}
            className="ds:p-1 ds:rounded ds:hover:bg-ink200 ds:transition-colors"
            title="Download"
          >
            <Download className="ds:h-4 ds:w-4" />
          </button>
        )}
        {showRemoveIcon && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="ds:p-1 ds:rounded ds:hover:bg-red600/10 ds:transition-colors ds:text-red600"
            title="Remove"
          >
            <Trash2 className="ds:h-4 ds:w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Upload;
