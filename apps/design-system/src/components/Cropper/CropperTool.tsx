import React from "react";
import {
  Cropper,
  CropperImage,
  CropperArea,
  type CropperProps,
  type CropperPoint,
  type CropperAreaData,
} from "./Cropper";
import { getCroppedImg, type CroppedImageOptions } from "./utils";

export interface CropperToolProps extends Omit<CropperProps, "onCropComplete"> {
  /**
   * Image source URL
   */
  src: string;
  /**
   * Alt text for the image
   */
  alt?: string;
  /**
   * Callback when crop is completed with the cropped image as base64
   */
  onCropComplete?: (croppedImageBase64: string) => void;
  /**
   * Callback when crop area changes (for real-time updates)
   */
  onCropAreaChange?: (
    croppedArea: CropperAreaData,
    croppedAreaPixels: CropperAreaData
  ) => void;
  /**
   * Options for the cropped image output
   */
  cropOptions?: Pick<CroppedImageOptions, "format" | "quality" | "flip">;
  /**
   * Cross-origin setting for the image
   */
  crossOrigin?: "anonymous" | "use-credentials";
}

/**
 * A higher-level Cropper component that handles image cropping automatically
 * and returns the cropped image as base64 data URL.
 *
 * @example
 * ```tsx
 * <CropperTool
 *   src="https://example.com/image.jpg"
 *   aspectRatio={1}
 *   shape="circle"
 *   onCropComplete={(base64) => {
 *     console.log('Cropped image:', base64);
 *   }}
 * />
 * ```
 */
export const CropperTool = React.forwardRef<HTMLDivElement, CropperToolProps>(
  (props, ref) => {
    const {
      src,
      alt = "Crop image",
      onCropComplete,
      onCropAreaChange,
      cropOptions = {},
      crossOrigin = "anonymous",
      rotation = 0,
      shape = "rectangle",
      ...cropperProps
    } = props;

    const handleCropComplete = React.useCallback(
      async (
        _croppedArea: CropperAreaData,
        croppedAreaPixels: CropperAreaData
      ) => {
        if (!onCropComplete) return;

        try {
          const croppedImageBase64 = await getCroppedImg({
            imageSrc: src,
            pixelCrop: croppedAreaPixels,
            rotation,
            shape,
            format: cropOptions.format || "image/jpeg",
            quality: cropOptions.quality ?? 0.92,
            flip: cropOptions.flip,
          });

          onCropComplete(croppedImageBase64);
        } catch (error) {
          console.error("Error creating cropped image:", error);
        }
      },
      [src, rotation, shape, cropOptions, onCropComplete]
    );

    return (
      <Cropper
        ref={ref}
        {...cropperProps}
        rotation={rotation}
        shape={shape}
        onCropComplete={handleCropComplete}
        onCropAreaChange={onCropAreaChange}
      >
        <CropperImage src={src} alt={alt} crossOrigin={crossOrigin} />
        <CropperArea />
      </Cropper>
    );
  }
);

CropperTool.displayName = "CropperTool";

export interface UseCropperToolOptions {
  /**
   * Image source URL
   */
  imageSrc: string;
  /**
   * Initial crop position
   */
  initialCrop?: CropperPoint;
  /**
   * Initial zoom level
   */
  initialZoom?: number;
  /**
   * Initial rotation angle
   */
  initialRotation?: number;
  /**
   * Crop options (shape, format, quality, etc.)
   */
  cropOptions?: Omit<CroppedImageOptions, "imageSrc" | "pixelCrop">;
}

/**
 * Hook to easily handle cropping logic in your components.
 * Automatically handles crop area changes and generates cropped images.
 *
 * @example
 * ```tsx
 * const {
 *   crop,
 *   zoom,
 *   rotation,
 *   setCrop,
 *   setZoom,
 *   setRotation,
 *   croppedImage,
 *   handleCropAreaChange,
 *   reset
 * } = useCropperTool({
 *   imageSrc: "https://example.com/image.jpg",
 *   cropOptions: { shape: "circle", format: "image/png" }
 * });
 *
 * return (
 *   <div>
 *     <Cropper
 *       crop={crop}
 *       zoom={zoom}
 *       rotation={rotation}
 *       onCropChange={setCrop}
 *       onZoomChange={setZoom}
 *       onCropAreaChange={handleCropAreaChange}
 *     >
 *       <CropperImage src={imageSrc} />
 *       <CropperArea />
 *     </Cropper>
 *     {croppedImage && <img src={croppedImage} alt="Cropped" />}
 *   </div>
 * );
 * ```
 */
export function useCropperTool(options: UseCropperToolOptions) {
  const {
    imageSrc,
    initialCrop,
    initialZoom = 1,
    initialRotation = 0,
    cropOptions,
  } = options;

  const [crop, setCrop] = React.useState<CropperPoint>(
    initialCrop || { x: 0, y: 0 }
  );
  const [zoom, setZoom] = React.useState(initialZoom);
  const [rotation, setRotation] = React.useState(initialRotation);
  const [croppedImage, setCroppedImage] = React.useState<string | null>(null);

  const handleCropAreaChange = React.useCallback(
    async (
      _croppedArea: CropperAreaData,
      croppedAreaPixels: CropperAreaData
    ) => {
      try {
        const base64 = await getCroppedImg({
          imageSrc,
          pixelCrop: croppedAreaPixels,
          rotation,
          shape: cropOptions?.shape,
          format: cropOptions?.format,
          quality: cropOptions?.quality,
          flip: cropOptions?.flip,
        });
        setCroppedImage(base64);
      } catch (error) {
        console.error("Error creating cropped image:", error);
      }
    },
    [imageSrc, rotation, cropOptions]
  );

  const reset = React.useCallback(() => {
    setCrop(initialCrop || { x: 0, y: 0 });
    setZoom(initialZoom);
    setRotation(initialRotation);
    setCroppedImage(null);
  }, [initialCrop, initialZoom, initialRotation]);

  return {
    crop,
    zoom,
    rotation,
    croppedImage,
    setCrop,
    setZoom,
    setRotation,
    setCroppedImage,
    handleCropAreaChange,
    reset,
  };
}
