import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
  Cropper,
  CropperImage,
  CropperArea,
  type CropperProps,
  type CropperPoint,
  type CropperShape,
  type CropperObjectFit,
  getCroppedImg,
  downloadImage,
  useCropperTool,
  CropperTool,
} from "../../components/Cropper";
import Select from "@/components/Select";
import Switch from "@/components/Switch";
import Button from "@/components/Button";
import { RotateCcwIcon, DownloadIcon } from "lucide-react";
import Slider from "@/components/Slider";
import i18n from "../../../.storybook/i18n";

const meta: Meta<CropperProps> = {
  title: "Media/Cropper",
  component: Cropper,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A powerful image and video cropping component with zoom, rotation, and aspect ratio controls.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    aspectRatio: {
      control: { type: "number", min: 0.1, max: 5, step: 0.1 },
      description: i18n.t("stories.cropper.argTypes.aspectRatio.description"),
      table: {
        defaultValue: { summary: "4/3" },
        category: "Layout",
      },
    },
    shape: {
      control: "select",
      options: ["rectangle", "circle"],
      description: i18n.t("stories.cropper.argTypes.shape.description"),
      table: {
        defaultValue: { summary: "rectangle" },
        category: "Appearance",
      },
    },
    objectFit: {
      control: "select",
      options: ["contain", "cover", "horizontal-cover", "vertical-cover"],
      description: i18n.t("stories.cropper.argTypes.objectFit.description"),
      table: {
        defaultValue: { summary: "contain" },
        category: "Appearance",
      },
    },
    withGrid: {
      control: "boolean",
      description: i18n.t("stories.cropper.argTypes.withGrid.description"),
      table: {
        defaultValue: { summary: "false" },
        category: "Appearance",
      },
    },
    zoom: {
      control: { type: "number", min: 0.1, max: 10, step: 0.1 },
      description: i18n.t("stories.cropper.argTypes.zoom.description"),
      table: {
        defaultValue: { summary: "1" },
        category: "Zoom",
      },
    },
    minZoom: {
      control: { type: "number", min: 0.1, max: 5, step: 0.1 },
      description: i18n.t("stories.cropper.argTypes.minZoom.description"),
      table: {
        defaultValue: { summary: "1" },
        category: "Zoom",
      },
    },
    maxZoom: {
      control: { type: "number", min: 1, max: 20, step: 0.5 },
      description: i18n.t("stories.cropper.argTypes.maxZoom.description"),
      table: {
        defaultValue: { summary: "3" },
        category: "Zoom",
      },
    },
    rotation: {
      control: { type: "number", min: 0, max: 360, step: 15 },
      description: i18n.t("stories.cropper.argTypes.rotation.description"),
      table: {
        defaultValue: { summary: "0" },
        category: "Transform",
      },
    },
    allowOverflow: {
      control: "boolean",
      description: i18n.t("stories.cropper.argTypes.allowOverflow.description"),
      table: {
        defaultValue: { summary: "false" },
        category: "Behavior",
      },
    },
    preventScrollZoom: {
      control: "boolean",
      description: i18n.t(
        "stories.cropper.argTypes.preventScrollZoom.description"
      ),
      table: {
        defaultValue: { summary: "false" },
        category: "Behavior",
      },
    },
  },
  args: {
    aspectRatio: 1 / 1,
    shape: "rectangle",
    objectFit: "contain",
    withGrid: false,
    zoom: 1,
    minZoom: 1,
    maxZoom: 3,
    rotation: 0,
    allowOverflow: false,
    preventScrollZoom: false,
  },
  decorators: [
    (Story) => (
      <div className="w-[600px] min-h-[300px] border border-gray-200 rounded-lg overflow-hidden">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Cropper>;

const sampleImage =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop";

export const Default: Story = {
  render: (args) => (
    <Cropper {...args} className="min-h-[300px] w-full">
      <CropperImage src={sampleImage} alt="Sample landscape" />
      <CropperArea />
    </Cropper>
  ),
};

export const ControlledState = () => {
  const id = React.useId();
  const [crop, setCrop] = React.useState<CropperPoint>({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);
  const [rotation, setRotation] = React.useState(0);
  const [shape, setShape] = React.useState<NonNullable<string>>("rectangle");
  const [objectFit, setObjectFit] =
    React.useState<NonNullable<string>>("contain");
  const [withGrid, setWithGrid] = React.useState(false);
  const [allowOverflow, setAllowOverflow] = React.useState(false);
  const [croppedImage, setCroppedImage] = React.useState<string | null>(null);

  const updateCroppedImage = React.useCallback(
    async (croppedAreaPixels: {
      x: number;
      y: number;
      width: number;
      height: number;
    }) => {
      try {
        // Sử dụng getCroppedImg utility function
        const croppedImageBase64 = await getCroppedImg({
          imageSrc: sampleImage,
          pixelCrop: croppedAreaPixels,
          rotation,
          shape: shape as CropperShape,
          format: "image/png",
          quality: 0.95,
        });

        setCroppedImage(croppedImageBase64);
      } catch (e) {
        console.error("Crop failed:", e);
      }
    },
    [rotation, shape, allowOverflow]
  );

  const onCropAreaChange = React.useCallback(
    async (
      _croppedArea: { x: number; y: number; width: number; height: number },
      croppedAreaPixels: {
        x: number;
        y: number;
        width: number;
        height: number;
      }
    ) => {
      await updateCroppedImage(croppedAreaPixels);
    },
    [updateCroppedImage]
  );

  const onCropReset = React.useCallback(() => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
  }, []);

  const handleDownload = React.useCallback(() => {
    if (croppedImage) {
      downloadImage(croppedImage, "cropped-image.png");
    }
  }, [croppedImage]);

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium">
            {croppedImage ? "Cropped Image" : "Original Image"}
          </span>
          <img
            src={croppedImage || sampleImage}
            alt="Sample landscape"
            className={"size-32"}
          />
        </div>
        {croppedImage && (
          <Button onClick={handleDownload} size="sm">
            <DownloadIcon className="size-4 mr-2" />
            Download
          </Button>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor={`${id}-shape`}>Shape:</label>
          <Select
            value={shape}
            onValueChange={(value: string) => setShape(value)}
            options={[
              { value: "rectangle", label: "Rectangle" },
              { value: "circle", label: "Circle" },
            ]}
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor={`${id}-object-fit`}>Object Fit:</label>
          <Select
            value={objectFit}
            onValueChange={(value) => setObjectFit(value)}
            options={[
              { value: "contain", label: "Contain" },
              { value: "cover", label: "Cover" },
              { value: "horizontal-cover", label: "Horizontal Cover" },
              { value: "vertical-cover", label: "Vertical Cover" },
            ]}
          />
        </div>
        <div className="flex items-center gap-2">
          <Switch
            id={`${id}-grid`}
            checked={withGrid}
            onCheckedChange={setWithGrid}
          />
          <label htmlFor={`${id}-grid`}>Show Grid</label>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            id={`${id}-overflow`}
            checked={allowOverflow}
            onCheckedChange={setAllowOverflow}
          />
          <label htmlFor={`${id}-overflow`}>Allow Overflow</label>
        </div>
      </div>
      <Cropper
        aspectRatio={1}
        crop={crop}
        zoom={zoom}
        rotation={rotation}
        shape={shape as CropperShape}
        objectFit={objectFit as CropperObjectFit}
        withGrid={withGrid}
        allowOverflow={allowOverflow}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropAreaChange={onCropAreaChange}
        className="min-h-72 w-full"
      >
        <CropperImage
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
          alt="Forest landscape"
          crossOrigin="anonymous"
        />
        <CropperArea />
      </Cropper>

      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <div className="flex w-full flex-col gap-2.5">
          <label htmlFor={`${id}-zoom`}>Zoom: {zoom.toFixed(2)}</label>
          <Slider
            id={`${id}-zoom`}
            value={[zoom]}
            onValueChange={(value) => setZoom(value[0] ?? 1)}
            min={1}
            max={3}
            step={0.1}
          />
        </div>
        <div className="flex w-full flex-col gap-2.5">
          <label htmlFor={`${id}-rotation`}>
            Rotation: {rotation.toFixed(0)}°
          </label>
          <Slider
            id={`${id}-rotation`}
            value={[rotation]}
            onValueChange={(value) => setRotation(value[0] ?? 0)}
            min={-180}
            max={180}
            step={1}
          />
        </div>
      </div>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-3 right-2 size-8"
        onClick={onCropReset}
      >
        <RotateCcwIcon />
      </Button>
    </div>
  );
};

export const CropperWithHook = () => {
  const {
    crop,
    zoom,
    rotation,
    setCrop,
    setZoom,
    setRotation,
    croppedImage,
    handleCropAreaChange,
    reset,
  } = useCropperTool({
    imageSrc: sampleImage,
    cropOptions: {
      shape: "circle",
      format: "image/png",
      quality: 0.95,
    },
    // type: "blob", // or 'base64'
  });

  const id = React.useId();

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center gap-4">
        {croppedImage && (
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium">Cropped Image</span>
            <img src={croppedImage} alt="Cropped result" className="size-32" />
          </div>
        )}
        {croppedImage && (
          <Button
            onClick={() => downloadImage(croppedImage, "cropped-image.png")}
            size="sm"
          >
            <DownloadIcon className="size-4 mr-2" />
            Download
          </Button>
        )}
      </div>

      <Cropper
        aspectRatio={1}
        crop={crop}
        zoom={zoom}
        rotation={rotation}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropAreaChange={handleCropAreaChange}
        className="min-h-72 w-full"
        shape="circle"
      >
        <CropperImage
          src={sampleImage}
          alt="Sample landscape"
          crossOrigin="anonymous"
        />
        <CropperArea />
      </Cropper>

      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <div className="flex w-full flex-col gap-2.5">
          <label htmlFor={`${id}-zoom`}>Zoom: {zoom.toFixed(2)}</label>
          <Slider
            id={`${id}-zoom`}
            value={[zoom]}
            onValueChange={(value) => setZoom(value[0] ?? 1)}
            min={1}
            max={3}
            step={0.1}
          />
        </div>
        <div className="flex w-full flex-col gap-2.5">
          <label htmlFor={`${id}-rotation`}>
            Rotation: {rotation.toFixed(0)}°
          </label>
          <Slider
            id={`${id}-rotation`}
            value={[rotation]}
            onValueChange={(value) => setRotation(value[0] ?? 0)}
            min={-180}
            max={180}
            step={1}
          />
        </div>
      </div>

      <Button variant="outline" onClick={reset} className="w-fit">
        <RotateCcwIcon className="size-4 mr-2" />
        Reset
      </Button>
    </div>
  );
};

export const CropperWithCropperTool = () => {
  const [croppedImage, setCroppedImage] = React.useState<string | null>(null);
  const [zoom, setZoom] = React.useState(1);
  const [rotation, setRotation] = React.useState(0);
  const id = React.useId();

  const handleCropComplete = React.useCallback((base64: string) => {
    setCroppedImage(base64);
  }, []);

  const handleDownload = React.useCallback(() => {
    if (croppedImage) {
      downloadImage(croppedImage, "cropped-avatar.png");
    }
  }, [croppedImage]);

  const handleReset = React.useCallback(() => {
    setZoom(1);
    setRotation(0);
    setCroppedImage(null);
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center gap-4">
        {croppedImage && (
          <>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">Cropped Avatar</span>
              <img
                src={croppedImage}
                alt="Cropped avatar"
                className="size-32 rounded-full border-2 border-gray-200"
              />
            </div>
            <Button onClick={handleDownload} size="sm">
              <DownloadIcon className="size-4 mr-2" />
              Download
            </Button>
          </>
        )}
      </div>

      <CropperTool
        src={sampleImage}
        alt="Sample landscape"
        aspectRatio={1}
        shape="circle"
        zoom={zoom}
        rotation={rotation}
        onZoomChange={setZoom}
        onCropComplete={handleCropComplete}
        cropOptions={{
          format: "image/png",
          quality: 0.95,
        }}
        className="min-h-72 w-full"
        crossOrigin="anonymous"
      />

      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <div className="flex w-full flex-col gap-2.5">
          <label htmlFor={`${id}-zoom`}>Zoom: {zoom.toFixed(2)}</label>
          <Slider
            id={`${id}-zoom`}
            value={[zoom]}
            onValueChange={(value) => setZoom(value[0] ?? 1)}
            min={1}
            max={3}
            step={0.1}
          />
        </div>
        <div className="flex w-full flex-col gap-2.5">
          <label htmlFor={`${id}-rotation`}>
            Rotation: {rotation.toFixed(0)}°
          </label>
          <Slider
            id={`${id}-rotation`}
            value={[rotation]}
            onValueChange={(value) => setRotation(value[0] ?? 0)}
            min={-180}
            max={180}
            step={1}
          />
        </div>
      </div>

      <Button variant="outline" onClick={handleReset} className="w-fit">
        <RotateCcwIcon className="size-4 mr-2" />
        Reset
      </Button>
    </div>
  );
};
