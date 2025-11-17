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
   * Callback when crop is completed with the cropped image as base64 or Blob
   */
  onCropComplete?: (croppedImage: string | Blob) => void;
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
  cropOptions?: Pick<
    CroppedImageOptions,
    "format" | "quality" | "flip" | "type"
  >;
  /**
   * Cross-origin setting for the image
   */
  crossOrigin?: "anonymous" | "use-credentials";
}

/**
 * A higher-level Cropper component that handles image cropping automatically
 * and returns the cropped image as base64 data URL or Blob.
 *
 * @example
 * ```tsx
 * // Get base64 output (default)
 * <CropperTool
 *   src="https://example.com/image.jpg"
 *   aspectRatio={1}
 *   shape="circle"
 *   onCropComplete={(base64) => {
 *     console.log('Cropped image:', base64);
 *   }}
 * />
 * 
 * // Get Blob output
 * <CropperTool
 *   src="https://example.com/image.jpg"
 *   aspectRatio={1}
 *   shape="circle"
 *   cropOptions={{ type: 'blob' }}
 *   onCropComplete={(blob) => {
 *     console.log('Cropped image blob:', blob);
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

    // State to manage crop position
    const [crop, setCrop] = React.useState<CropperPoint>({ x: 0, y: 0 });

    // Debounce timer ref
    const debounceTimerRef = React.useRef<number | null>(null);
    // Store previous crop area to compare
    const prevCropAreaRef = React.useRef<CropperAreaData | null>(null);

    const handleCropAreaChange = React.useCallback(
      async (
        _croppedArea: CropperAreaData,
        croppedAreaPixels: CropperAreaData
      ) => {
        // Call the user's onCropAreaChange if provided
        onCropAreaChange?.(_croppedArea, croppedAreaPixels);

        if (!onCropComplete) return;

        // Check if crop area actually changed
        if (prevCropAreaRef.current) {
          const prev = prevCropAreaRef.current;
          const isSame =
            prev.x === croppedAreaPixels.x &&
            prev.y === croppedAreaPixels.y &&
            prev.width === croppedAreaPixels.width &&
            prev.height === croppedAreaPixels.height;
          
          if (isSame) {
            return; // Don't regenerate if nothing changed
          }
        }

        // Update the ref
        prevCropAreaRef.current = croppedAreaPixels;

        // Clear previous timer
        if (debounceTimerRef.current) {
          window.clearTimeout(debounceTimerRef.current);
        }

        // Debounce the crop generation
        debounceTimerRef.current = window.setTimeout(async () => {
          try {
            const outputType = cropOptions.type || "base64";

            if (outputType === "blob") {
              const croppedBlob = await getCroppedImg({
                imageSrc: src,
                pixelCrop: croppedAreaPixels,
                rotation,
                shape,
                format: cropOptions.format || "image/jpeg",
                quality: cropOptions.quality ?? 0.92,
                flip: cropOptions.flip,
                type: "blob",
              });
              onCropComplete(croppedBlob);
            } else {
              const croppedImageBase64 = await getCroppedImg({
                imageSrc: src,
                pixelCrop: croppedAreaPixels,
                rotation,
                shape,
                format: cropOptions.format || "image/jpeg",
                quality: cropOptions.quality ?? 0.92,
                flip: cropOptions.flip,
                type: "base64",
              });
              onCropComplete(croppedImageBase64);
            }
          } catch (error) {
            console.error("Error creating cropped image:", error);
          }
        }, 300); // 300ms debounce delay
      },
      [src, rotation, shape, cropOptions, onCropComplete, onCropAreaChange]
    );

    // Cleanup debounce timer on unmount
    React.useEffect(() => {
      return () => {
        if (debounceTimerRef.current) {
          window.clearTimeout(debounceTimerRef.current);
        }
      };
    }, []);

    return (
      <Cropper
        ref={ref}
        {...cropperProps}
        crop={crop}
        rotation={rotation}
        shape={shape}
        onCropChange={setCrop}
        onCropAreaChange={handleCropAreaChange}
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
   * Crop options (shape, format, quality, type, etc.)
   */
  cropOptions?: Omit<CroppedImageOptions, "imageSrc" | "pixelCrop">;
  /**
   * Output type: 'base64' for data URL (default) or 'blob' for Blob object
   */
  type?: "base64" | "blob";
}

/**
 * Hook to easily handle cropping logic in your components.
 * Automatically handles crop area changes and generates cropped images.
 *
 * @example
 * ```tsx
 * // Get base64 output (default)
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
 * // Get Blob output
 * const {
 *   croppedImage, // This will be a Blob
 *   ...rest
 * } = useCropperTool({
 *   imageSrc: "https://example.com/image.jpg",
 *   type: "blob",
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
 *     {croppedImage && typeof croppedImage === 'string' && (
 *       <img src={croppedImage} alt="Cropped" />
 *     )}
 *   </div>
 * );
 * ```
 */
export function useCropperTool(
  options: UseCropperToolOptions
) {
  const {
    imageSrc,
    initialCrop,
    initialZoom = 1,
    initialRotation = 0,
    cropOptions,
    type = "base64",
  } = options;

  const [crop, setCrop] = React.useState<CropperPoint>(
    initialCrop || { x: 0, y: 0 }
  );
  const [zoom, setZoom] = React.useState(initialZoom);
  const [rotation, setRotation] = React.useState(initialRotation);
  const [croppedImage, setCroppedImage] = React.useState<string | Blob | null>(
    null
  );

  // Debounce timer ref
  const debounceTimerRef = React.useRef<number | null>(null);

  // Store previous crop area to compare
  const prevCropAreaRef = React.useRef<CropperAreaData | null>(null);

  const handleCropAreaChange = React.useCallback(
    async (
      _croppedArea: CropperAreaData,
      croppedAreaPixels: CropperAreaData
    ) => {
      // Check if crop area actually changed
      if (prevCropAreaRef.current) {
        const prev = prevCropAreaRef.current;
        const isSame =
          prev.x === croppedAreaPixels.x &&
          prev.y === croppedAreaPixels.y &&
          prev.width === croppedAreaPixels.width &&
          prev.height === croppedAreaPixels.height;
        
        if (isSame) {
          return; // Don't regenerate if nothing changed
        }
      }

      // Update the ref
      prevCropAreaRef.current = croppedAreaPixels;

      // Clear previous timer
      if (debounceTimerRef.current) {
        window.clearTimeout(debounceTimerRef.current);
      }

      // Set new timer to debounce the crop generation
      debounceTimerRef.current = window.setTimeout(async () => {
        try {
          if (type === "blob") {
            const blob = await getCroppedImg({
              imageSrc,
              pixelCrop: croppedAreaPixels,
              rotation,
              shape: cropOptions?.shape,
              format: cropOptions?.format,
              quality: cropOptions?.quality,
              flip: cropOptions?.flip,
              type: "blob",
            });
            setCroppedImage(blob);
          } else {
            const base64 = await getCroppedImg({
              imageSrc,
              pixelCrop: croppedAreaPixels,
              rotation,
              shape: cropOptions?.shape,
              format: cropOptions?.format,
              quality: cropOptions?.quality,
              flip: cropOptions?.flip,
              type: "base64",
            });
            setCroppedImage(base64);
          }
        } catch (error) {
          console.error("Error creating cropped image:", error);
        }
      }, 300); // 300ms debounce delay
    },
    [imageSrc, rotation, cropOptions, type]
  );

  // Cleanup debounce timer on unmount
  React.useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        window.clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

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
