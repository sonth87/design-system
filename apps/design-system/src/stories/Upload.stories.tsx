import type { Meta, StoryObj } from "@storybook/react";
import {
  Upload,
  type UploadFile,
  type UploadProps,
} from "../components/Upload/Upload";
import { useState } from "react";
import Button from "../components/Button/Button";
import { UploadCloud, Image as ImageIcon, File } from "lucide-react";
import Dialog from "../components/Dialog/Dialog";
import { Toaster } from "../components/Toast/Toast";

const meta: Meta<typeof Upload> = {
  title: "Form Components/Upload",
  component: Upload,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: [
        "outline",
        "primaryOutline",
        "icon",
        "dropzone",
        "primaryDropzone",
        "secondaryDropzone",
      ],
      description: "Visual variant of the upload component",
      table: {
        category: "Appearance",
      },
    },
    size: {
      control: "radio",
      options: ["small", "medium", "large"],
      description: "Size of upload button",
      table: {
        category: "Appearance",
      },
    },
    listType: {
      control: "radio",
      options: ["text", "picture", "picture-card", "picture-circle"],
      description: "Display type for file list",
      table: {
        category: "Display",
      },
    },
    multiple: {
      control: "boolean",
      description: "Allow multiple file uploads",
      table: {
        category: "Behavior",
      },
    },
    disabled: {
      control: "boolean",
      description: "Disable upload",
      table: {
        category: "State",
      },
    },
    directory: {
      control: "boolean",
      description: "Enable directory upload",
      table: {
        category: "Behavior",
      },
    },
    maxCount: {
      control: "number",
      description: "Maximum number of files",
      table: {
        category: "Validation",
      },
    },
    maxSize: {
      control: "number",
      description: "Maximum file size in bytes",
      table: {
        category: "Validation",
      },
    },
    accept: {
      control: "text",
      description: "Accepted file types",
      table: {
        category: "Validation",
      },
    },
    uploadText: {
      control: "text",
      description: "Upload area text",
      table: {
        category: "Content",
      },
    },
    uploadDescription: {
      control: "text",
      description: "Upload area description",
      table: {
        category: "Content",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Upload>;

// ============================================================================
// BASIC EXAMPLES
// ============================================================================

export const Default: Story = {
  render: function DefaultUpload(args: UploadProps) {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    return (
      <>
        <div className="text-left">
          <Upload
            {...args}
            fileList={fileList}
            onChange={({ fileList: newFileList }) => setFileList(newFileList)}
          />
        </div>
        <Toaster />
      </>
    );
  },
  args: {
    variant: "secondaryDropzone",
    uploadText: "Click to upload",
    uploadDescription: "or drag and drop",
  },
};

export const WithCustomButton: Story = {
  render: function CustomButtonUpload() {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    return (
      <>
        <div className="w-[500px]">
          <Upload
            fileList={fileList}
            onChange={({ fileList: newFileList }) => setFileList(newFileList)}
          >
            <Button>
              <UploadCloud className="mr-2 h-4 w-4" />
              Choose File
            </Button>
          </Upload>
        </div>
        <Toaster />
      </>
    );
  },
};

export const MultipleFiles: Story = {
  render: function MultipleFilesUpload() {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    return (
      <>
        <div className="w-[500px]">
          <Upload
            multiple
            fileList={fileList}
            onChange={({ fileList: newFileList }) => setFileList(newFileList)}
          />
          <p className="text-sm text-muted-foreground mt-2">
            You can select multiple files at once
          </p>
        </div>
        <Toaster />
      </>
    );
  },
};

// ============================================================================
// LIST TYPE VARIANTS
// ============================================================================

export const TextList: Story = {
  render: function TextListUpload() {
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handlePreview = (file: UploadFile) => {
      if (file.url) {
        window.open(file.url, "_blank");
      }
    };

    return (
      <div className="w-[500px]">
        <Upload
          listType="text"
          multiple
          fileList={fileList}
          onChange={({ fileList: newFileList }) => setFileList(newFileList)}
          // onPreview={handlePreview}
        />
      </div>
    );
  },
};

export const PictureList: Story = {
  render: function PictureListUpload() {
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handlePreview = (file: UploadFile) => {
      if (file.url) {
        window.open(file.url, "_blank");
      }
    };

    return (
      <div className="w-[500px]">
        <Upload
          listType="picture"
          accept="image/*"
          multiple
          fileList={fileList}
          onChange={({ fileList: newFileList }) => setFileList(newFileList)}
          onPreview={handlePreview}
        />
      </div>
    );
  },
};

export const PictureCard: Story = {
  render: function PictureCardUpload() {
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handlePreview = (file: UploadFile) => {
      if (file.url) {
        window.open(file.url, "_blank");
      }
    };

    return (
      <div className="w-[600px]">
        <Upload
          listType="picture-card"
          accept="image/*"
          multiple
          maxCount={6}
          fileList={fileList}
          onChange={({ fileList: newFileList }) => setFileList(newFileList)}
          onPreview={handlePreview}
        >
          <div className="flex flex-col items-center justify-center gap-2 p-4">
            <ImageIcon className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm font-medium">Upload</p>
          </div>
        </Upload>
      </div>
    );
  },
};

export const PictureCircle: Story = {
  render: function PictureCircleUpload() {
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handlePreview = (file: UploadFile) => {
      if (file.url) {
        window.open(file.url, "_blank");
      }
    };

    return (
      <div className="w-[600px]">
        <Upload
          listType="picture-circle"
          accept="image/*"
          multiple
          maxCount={4}
          fileList={fileList}
          onChange={({ fileList: newFileList }) => setFileList(newFileList)}
          onPreview={handlePreview}
        >
          <div className="flex flex-col items-center justify-center gap-2 p-4">
            <ImageIcon className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm font-medium">Upload</p>
          </div>
        </Upload>
        <p className="text-sm text-muted-foreground mt-2">
          Perfect for avatar or profile pictures
        </p>
      </div>
    );
  },
};

// ============================================================================
// VALIDATION
// ============================================================================

export const WithMaxCount: Story = {
  render: function MaxCountUpload() {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    return (
      <>
        <div className="w-[500px]">
          <Upload
            multiple
            maxCount={3}
            fileList={fileList}
            onChange={({ fileList: newFileList }) => setFileList(newFileList)}
          />
          <p className="text-sm text-muted-foreground mt-2">
            Maximum 3 files allowed
          </p>
        </div>
        <Toaster />
      </>
    );
  },
};

export const WithMaxSize: Story = {
  render: function MaxSizeUpload() {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    return (
      <>
        <div className="w-[500px]">
          <Upload
            multiple
            maxSize={2 * 1024 * 1024} // 2MB
            fileList={fileList}
            onChange={({ fileList: newFileList }) => setFileList(newFileList)}
          />
          <p className="text-sm text-muted-foreground mt-2">
            Maximum file size: 2MB
          </p>
        </div>
        <Toaster />
      </>
    );
  },
};

export const BeforeUpload: Story = {
  render: function BeforeUploadExample() {
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handleBeforeUpload = async (file: File) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        alert("You can only upload image files!");
        return false;
      }

      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        alert("Image must be smaller than 5MB!");
        return false;
      }

      return true;
    };

    return (
      <div className="w-[500px]">
        <Upload
          accept="image/*"
          multiple
          fileList={fileList}
          onChange={({ fileList: newFileList }) => setFileList(newFileList)}
          beforeUpload={handleBeforeUpload}
        />
        <p className="text-sm text-muted-foreground mt-2">
          Only images under 5MB are allowed
        </p>
      </div>
    );
  },
};

// ============================================================================
// DIRECTORY UPLOAD
// ============================================================================

export const DirectoryUpload: Story = {
  render: function DirectoryUploadExample() {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    return (
      <div className="w-[500px]">
        <Upload
          directory
          multiple
          fileList={fileList}
          onChange={({ fileList: newFileList }) => setFileList(newFileList)}
        >
          <Button>
            <File className="mr-2 h-4 w-4" />
            Select Folder
          </Button>
        </Upload>
        <p className="text-sm text-muted-foreground mt-2">
          Upload entire directory with all files
        </p>
        {fileList.length > 0 && (
          <p className="text-sm font-medium mt-2">
            {fileList.length} file(s) uploaded
          </p>
        )}
      </div>
    );
  },
};

// ============================================================================
// ADVANCED FEATURES
// ============================================================================

export const WithImagePreview: Story = {
  render: function ImagePreviewExample() {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");

    const handlePreview = (file: UploadFile) => {
      setPreviewImage(file.url || file.thumbUrl || "");
      setPreviewTitle(file.name);
      setPreviewOpen(true);
    };

    return (
      <div className="w-[600px]">
        <Upload
          listType="picture-card"
          accept="image/*"
          multiple
          fileList={fileList}
          onChange={({ fileList: newFileList }) => setFileList(newFileList)}
          onPreview={handlePreview}
        >
          <div className="flex flex-col items-center justify-center gap-2 p-4">
            <ImageIcon className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm font-medium">Upload</p>
          </div>
        </Upload>

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

        <p className="text-sm text-muted-foreground mt-2">
          Click on images to preview
        </p>
      </div>
    );
  },
};

export const AvatarUpload: Story = {
  render: function AvatarUploadExample() {
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const beforeUpload = async (file: File) => {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        alert("Only JPG/PNG files allowed!");
        return false;
      }

      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        alert("Image must be smaller than 2MB!");
        return false;
      }

      return true;
    };

    const uploadButton = (
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="text-4xl font-light text-muted-foreground">+</div>
        <div className="text-sm text-muted-foreground">Upload</div>
      </div>
    );

    return (
      <div className="w-full max-w-2xl">
        <h3 className="text-lg font-semibold mb-4">Avatar Upload</h3>

        {/* Avatar variant - New simple style */}
        <div className="mb-8">
          <p className="text-sm font-medium mb-3">Avatar Variant (Simple)</p>
          <div className="flex gap-6">
            {/* Square Avatar */}
            <div>
              <p className="text-xs text-muted-foreground mb-2">Square</p>
              <Upload
                variant="avatar"
                accept="image/png,image/jpeg"
                maxCount={1}
                fileList={fileList}
                onChange={({ fileList: newFileList }) =>
                  setFileList(newFileList)
                }
                beforeUpload={beforeUpload}
                className="w-[100px] h-[100px]"
                showUploadList={false}
              >
                {uploadButton}
              </Upload>
            </div>

            {/* Circle Avatar */}
            <div>
              <p className="text-xs text-muted-foreground mb-2">Circle</p>
              <Upload
                variant="avatarCircle"
                accept="image/png,image/jpeg"
                maxCount={1}
                fileList={fileList}
                onChange={({ fileList: newFileList }) =>
                  setFileList(newFileList)
                }
                beforeUpload={beforeUpload}
                className="w-[100px] h-[100px]"
                showUploadList={false}
              >
                {uploadButton}
              </Upload>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-muted rounded text-xs text-muted-foreground">
          <strong>Validation:</strong> Only JPG/PNG, max 2MB, 1 file only
        </div>
      </div>
    );
  },
};

export const CustomRequest: Story = {
  render: function CustomRequestUpload() {
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const customUpload = ({
      file,
      onProgress,
      onSuccess,
      onError,
    }: {
      file: File;
      onProgress: (percent: number) => void;
      onSuccess: (response: unknown) => void;
      onError: (error: Error) => void;
    }) => {
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        onProgress(progress);

        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onSuccess({
              url: URL.createObjectURL(file),
              name: file.name,
            });
          }, 500);
        }
      }, 200);
    };

    return (
      <div className="w-[500px]">
        <Upload
          multiple
          listType="picture"
          fileList={fileList}
          onChange={({ fileList: newFileList }) => setFileList(newFileList)}
          customRequest={customUpload}
        />
        <p className="text-sm text-muted-foreground mt-2">
          Custom upload with progress simulation
        </p>
      </div>
    );
  },
};

// ============================================================================
// VARIANTS
// ============================================================================

export const DropzoneVariants: Story = {
  render: function DropzoneVariantsExample() {
    return (
      <div className="w-[600px] space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-2">Primary Dropzone</h3>
          <Upload variant="primaryDropzone" />
        </div>
        <div>
          <h3 className="text-sm font-medium mb-2">Secondary Dropzone</h3>
          <Upload variant="secondaryDropzone" />
        </div>
        <div>
          <h3 className="text-sm font-medium mb-2">Default Dropzone</h3>
          <Upload variant="dropzone" />
        </div>
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultFileList: [
      {
        uid: "1",
        name: "sample.pdf",
        status: "done",
      },
    ],
  },
};

export const WithDefaultFiles: Story = {
  render: function WithDefaultFilesExample() {
    const [fileList, setFileList] = useState<UploadFile[]>([
      {
        uid: "1",
        name: "nature-landscape.jpg",
        status: "done",
        url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop",
        thumbUrl:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&auto=format&fit=crop",
        type: "image/jpeg",
        size: 245678,
      },
      {
        uid: "2",
        name: "mountain-view.jpg",
        status: "done",
        url: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&auto=format&fit=crop",
        thumbUrl:
          "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=200&auto=format&fit=crop",
        type: "image/jpeg",
        size: 312456,
      },
      {
        uid: "3",
        name: "ocean-sunset.jpg",
        status: "done",
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop",
        thumbUrl:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&auto=format&fit=crop",
        type: "image/jpeg",
        size: 198765,
      },
    ]);

    return (
      <>
        <div className="w-[600px]">
          <h3 className="text-lg font-semibold mb-4">
            Upload with Default Files
          </h3>
          <Upload
            listType="text"
            accept="image/*"
            multiple
            maxCount={6}
            fileList={fileList}
            onChange={({ fileList: newFileList }) => setFileList(newFileList)}
          >
            <div className="flex flex-col items-center justify-center gap-2 p-4">
              <ImageIcon className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm font-medium">Upload</p>
            </div>
          </Upload>
          <p className="text-sm text-muted-foreground mt-4">
            These images are already loaded. Try hovering over them to see
            preview and download buttons.
          </p>
        </div>
        <Toaster />
      </>
    );
  },
};

export const WithDifferentStatuses: Story = {
  render: function WithDifferentStatusesExample() {
    const [fileList, setFileList] = useState<UploadFile[]>([
      {
        uid: "1",
        name: "completed-file.jpg",
        status: "done",
        url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop",
        thumbUrl:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&auto=format&fit=crop",
        type: "image/jpeg",
        size: 245678,
      },
      {
        uid: "2",
        name: "uploading-file.jpg",
        status: "uploading",
        url: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&auto=format&fit=crop",
        thumbUrl:
          "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=200&auto=format&fit=crop",
        type: "image/jpeg",
        size: 312456,
        percent: 65,
      },
      {
        uid: "3",
        name: "failed-upload.jpg",
        status: "error",
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop",
        thumbUrl:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&auto=format&fit=crop",
        type: "image/jpeg",
        size: 198765,
        error: new Error("Upload failed"),
      },
    ]);

    return (
      <>
        <div className="w-[600px] space-y-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Different File Statuses - Text List
            </h3>
            <Upload
              listType="text"
              accept="image/*"
              multiple
              maxCount={6}
              fileList={fileList}
              onChange={({ fileList: newFileList }) => setFileList(newFileList)}
            />
            <div className="mt-4 p-3 bg-muted rounded-md text-sm space-y-1">
              <p className="font-medium">File Statuses:</p>
              <p>
                <span className="inline-flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <strong>Done:</strong> Upload completed successfully (can
                  preview & download)
                </span>
              </p>
              <p>
                <span className="inline-flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                  <strong>Uploading:</strong> File is currently uploading
                  (cannot download yet)
                </span>
              </p>
              <p>
                <span className="inline-flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  <strong>Error:</strong> Upload failed (cannot download)
                </span>
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Picture Card View</h3>
            <Upload
              listType="picture-card"
              accept="image/*"
              multiple
              maxCount={6}
              fileList={fileList}
              onChange={({ fileList: newFileList }) => setFileList(newFileList)}
            >
              <div className="flex flex-col items-center justify-center gap-2 p-4">
                <ImageIcon className="h-8 w-8 text-muted-foreground" />
                <p className="text-sm font-medium">Upload</p>
              </div>
            </Upload>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Picture Circle View</h3>
            <Upload
              listType="picture-circle"
              accept="image/*"
              multiple
              maxCount={6}
              fileList={fileList}
              onChange={({ fileList: newFileList }) => setFileList(newFileList)}
            >
              <div className="flex flex-col items-center justify-center gap-2 p-4">
                <ImageIcon className="h-8 w-8 text-muted-foreground" />
                <p className="text-sm font-medium">Upload</p>
              </div>
            </Upload>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Picture List View</h3>
            <Upload
              listType="picture"
              accept="image/*"
              multiple
              maxCount={6}
              fileList={fileList}
              onChange={({ fileList: newFileList }) => setFileList(newFileList)}
            />
          </div>
        </div>
        <Toaster />
      </>
    );
  },
};
