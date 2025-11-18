/**
 * Utility functions for Cropper component
 */

export interface CroppedImageOptions {
  /**
   * The source image URL or HTMLImageElement
   */
  imageSrc: string | HTMLImageElement;
  /**
   * Pixel coordinates of the cropped area
   */
  pixelCrop: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  /**
   * Rotation angle in degrees
   */
  rotation?: number;
  /**
   * Shape of the crop area
   */
  shape?: "rectangle" | "circle";
  /**
   * Output image format (default: 'image/png')
   */
  format?: "image/jpeg" | "image/png" | "image/webp";
  /**
   * Quality of the output image (0-1, default: 0.92)
   */
  quality?: number;
  /**
   * Flip the image horizontally
   */
  flip?: {
    horizontal?: boolean;
    vertical?: boolean;
  };
  /**
   * Output type: 'base64' (data URL) or 'blob' (Blob object)
   */
  type?: "base64" | "blob";
}

/**
 * Creates a cropped image from the given parameters and returns it as a base64 data URL or Blob
 *
 * @param options - Options for creating the cropped image
 * @returns Promise that resolves to a base64 data URL string or Blob based on the type option
 *
 * @example
 * ```tsx
 * // Get base64 data URL (default)
 * const croppedImageBase64 = await getCroppedImg({
 *   imageSrc: 'https://example.com/image.jpg',
 *   pixelCrop: { x: 100, y: 100, width: 200, height: 200 },
 *   rotation: 45,
 *   shape: 'circle',
 *   format: 'image/png',
 *   quality: 0.95
 * });
 *
 * // Get Blob
 * const croppedImageBlob = await getCroppedImg({
 *   imageSrc: 'https://example.com/image.jpg',
 *   pixelCrop: { x: 100, y: 100, width: 200, height: 200 },
 *   type: 'blob'
 * });
 * ```
 */
export async function getCroppedImg(
  options: CroppedImageOptions & { type: "blob" },
): Promise<Blob>;
export async function getCroppedImg(
  options: CroppedImageOptions & { type?: "base64" },
): Promise<string>;
export async function getCroppedImg(
  options: CroppedImageOptions,
): Promise<string | Blob> {
  const {
    imageSrc,
    pixelCrop,
    rotation = 0,
    shape = "rectangle",
    format = "image/png",
    quality = 0.92,
    flip = {},
    type = "base64",
  } = options;

  // Load image if URL is provided
  let image: HTMLImageElement;
  if (typeof imageSrc === "string") {
    image = await loadImage(imageSrc);
  } else {
    image = imageSrc;
  }

  const rotRad = getRadianAngle(rotation);
  const sin = Math.abs(Math.sin(rotRad));
  const cos = Math.abs(Math.cos(rotRad));

  // Calculate bounding box of rotated image
  const bBoxWidth = image.width * cos + image.height * sin;
  const bBoxHeight = image.width * sin + image.height * cos;

  // Step 1: Create a canvas for the rotated full image
  const tempCanvas = document.createElement("canvas");
  const tempCtx = tempCanvas.getContext("2d");

  if (!tempCtx) {
    throw new Error("Failed to get canvas 2D context");
  }

  // Set temp canvas to bounding box size
  tempCanvas.width = bBoxWidth;
  tempCanvas.height = bBoxHeight;

  // Translate to center
  tempCtx.translate(bBoxWidth / 2, bBoxHeight / 2);

  // Rotate
  tempCtx.rotate(rotRad);

  // Apply flip if needed
  if (flip.horizontal || flip.vertical) {
    const scaleX = flip.horizontal ? -1 : 1;
    const scaleY = flip.vertical ? -1 : 1;
    tempCtx.scale(scaleX, scaleY);
  }

  // Draw image centered
  tempCtx.drawImage(
    image,
    -image.width / 2,
    -image.height / 2,
    image.width,
    image.height,
  );

  // Step 2: Create output canvas and crop from temp canvas
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d", { alpha: true });

  if (!ctx) {
    throw new Error("Failed to get canvas 2D context");
  }

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // Clear canvas to ensure transparency (important for PNG output)
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Handle overflow: calculate the valid area to draw
  // When pixelCrop.x or y is negative, it means the crop area extends beyond the image
  const sourceX = Math.max(0, pixelCrop.x);
  const sourceY = Math.max(0, pixelCrop.y);

  // Calculate how much of the crop area is actually within the image bounds
  const sourceWidth = Math.min(
    pixelCrop.width - Math.max(0, -pixelCrop.x), // Reduce width if crop starts before image
    bBoxWidth - sourceX, // Don't exceed image right edge
  );
  const sourceHeight = Math.min(
    pixelCrop.height - Math.max(0, -pixelCrop.y), // Reduce height if crop starts before image
    bBoxHeight - sourceY, // Don't exceed image bottom edge
  );

  // Calculate where to place the cropped portion on the output canvas
  // If crop area extends beyond image (negative x/y), offset the destination
  const destX = Math.max(0, -pixelCrop.x);
  const destY = Math.max(0, -pixelCrop.y);

  // Only draw if there's a valid area to draw
  if (sourceWidth > 0 && sourceHeight > 0) {
    ctx.drawImage(
      tempCanvas,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      destX,
      destY,
      sourceWidth,
      sourceHeight,
    );
  }

  // Apply circular mask if shape is circle
  if (shape === "circle") {
    ctx.globalCompositeOperation = "destination-in";
    ctx.beginPath();
    ctx.arc(
      canvas.width / 2,
      canvas.height / 2,
      Math.min(canvas.width, canvas.height) / 2,
      0,
      Math.PI * 2,
    );
    ctx.fill();
  }

  // Return as blob or base64 based on type
  if (type === "blob") {
    return new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Failed to create blob from canvas"));
          }
        },
        format,
        quality,
      );
    });
  }

  // Convert to base64
  return canvas.toDataURL(format, quality);
}

/**
 * Load an image from URL
 */
function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";

    image.onload = () => resolve(image);
    image.onerror = (error) =>
      reject(new Error(`Failed to load image: ${error}`));

    image.src = url;
  });
}

/**
 * Convert degrees to radians
 */
function getRadianAngle(degreeValue: number): number {
  return (degreeValue * Math.PI) / 180;
}

/**
 * Calculate the rotated size of a rectangle
 *
 * @param width - Original width
 * @param height - Original height
 * @param rotation - Rotation angle in degrees
 * @returns Rotated size dimensions
 */
export function rotateSize(
  width: number,
  height: number,
  rotation: number,
): { width: number; height: number } {
  const rotRad = getRadianAngle(rotation);
  const cosRot = Math.cos(rotRad);
  const sinRot = Math.sin(rotRad);

  return {
    width: Math.abs(cosRot * width) + Math.abs(sinRot * height),
    height: Math.abs(sinRot * width) + Math.abs(cosRot * height),
  };
}

/**
 * Download a base64 image
 *
 * @param base64Data - Base64 data URL
 * @param filename - Output filename (default: 'cropped-image.jpg')
 *
 * @example
 * ```tsx
 * const croppedImage = await getCroppedImg({ ... });
 * downloadImage(croppedImage, 'my-cropped-image.png');
 * ```
 */
export function downloadImage(
  base64Data: string,
  filename: string = "cropped-image.jpg",
): void {
  const link = document.createElement("a");
  link.href = base64Data;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Convert base64 data URL to Blob
 *
 * @param base64Data - Base64 data URL
 * @returns Blob object
 *
 * @example
 * ```tsx
 * const croppedImage = await getCroppedImg({ ... });
 * const blob = base64ToBlob(croppedImage);
 * ```
 */
export function base64ToBlob(base64Data: string): Blob {
  const arr = base64Data.split(",");
  const mimeMatch = arr[0]?.match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : "image/jpeg";
  const bstr = atob(arr[1] ?? "");
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new Blob([u8arr], { type: mime });
}

/**
 * Convert base64 data URL to File
 *
 * @param base64Data - Base64 data URL
 * @param filename - Output filename
 * @returns File object
 *
 * @example
 * ```tsx
 * const croppedImage = await getCroppedImg({ ... });
 * const file = base64ToFile(croppedImage, 'cropped-image.jpg');
 * ```
 */
export function base64ToFile(base64Data: string, filename: string): File {
  const blob = base64ToBlob(base64Data);
  return new File([blob], filename, { type: blob.type });
}
