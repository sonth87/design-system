import React, { useState, useCallback, useEffect } from "react";
import { ZoomIn } from "lucide-react";
import { cn } from "@dsui/ui/index";

// Dynamic import for react-viewer to avoid SSR issues
let Viewer: any = null;
if (typeof window !== "undefined") {
  import("react-viewer").then((module) => {
    Viewer = module.default;
  });
}

// ============================================================================
// Types
// ============================================================================

export interface ImageInfo {
  src: string;
  alt?: string;
  downloadUrl?: string;
}

export interface ImageViewerProps {
  images: ImageInfo[];
  visible?: boolean;
  onClose?: () => void;
  activeIndex?: number;
  onIndexChange?: (_index: number) => void;
  zoomSpeed?: number;
  disableKeyboardSupport?: boolean;
  noNavbar?: boolean;
  noToolbar?: boolean;
  rotatable?: boolean;
  scalable?: boolean;
  changeable?: boolean;
  noClose?: boolean;
  minScale?: number;
  maxScale?: number;
  defaultScale?: number;
  className?: string;
  downloadable?: boolean;
  noImgDetails?: boolean;
  noResetZoomAfterChange?: boolean;
  drag?: boolean;
}

export interface ImageViewerImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
  width?: string | number;
  height?: string | number;
  preview?: boolean;
  previewSrc?: string;
  fallback?: string;
  placeholder?: React.ReactNode | boolean;
  className?: string;
  wrapperClassName?: string;
  onPreviewClick?: () => void;
}

// ============================================================================
// ImageViewer Component
// ============================================================================

export const ImageViewer: React.FC<ImageViewerProps> = ({
  images,
  visible = false,
  onClose,
  activeIndex = 0,
  onIndexChange,
  zoomSpeed = 0.1,
  disableKeyboardSupport = false,
  noNavbar = false,
  noToolbar = false,
  rotatable = true,
  scalable = true,
  changeable = true,
  noClose = false,
  minScale = 0.1,
  maxScale = 50,
  defaultScale = 1,
  className,
  downloadable = false,
  noImgDetails = false,
  noResetZoomAfterChange = false,
  drag = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(activeIndex);
  const [ViewerComponent, setViewerComponent] = useState<any>(null);

  // Load Viewer dynamically on client-side only
  useEffect(() => {
    if (typeof window !== "undefined" && !ViewerComponent) {
      import("react-viewer").then((module) => {
        setViewerComponent(() => module.default);
      });
    }
  }, [ViewerComponent]);

  useEffect(() => {
    setCurrentIndex(activeIndex);
  }, [activeIndex]);

  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  const handleIndexChange = useCallback(
    (_activeImage: any, index: number) => {
      setCurrentIndex(index);
      onIndexChange?.(index);
    },
    [onIndexChange]
  );

  // Handle download to save file locally
  const handleDownload = useCallback(() => {
    const currentImage = images[currentIndex];
    const downloadUrl = currentImage.downloadUrl || currentImage.src;

    // Create a temporary anchor element to trigger download
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = currentImage.alt || `image-${currentIndex + 1}`;

    // For cross-origin images, try to download via fetch
    fetch(downloadUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch(() => {
        // Fallback: do nothing if fetch fails
      });
  }, [images, currentIndex]);

  // Transform images to include downloadUrl
  const viewerImages = images.map((img) => ({
    src: img.src,
    alt: img.alt || "",
    downloadUrl: img.downloadUrl || img.src,
  }));

  // Don't render until Viewer is loaded
  if (!ViewerComponent) {
    return null;
  }

  return (
    <ViewerComponent
      visible={visible}
      onClose={handleClose}
      onMaskClick={handleClose}
      images={viewerImages}
      activeIndex={currentIndex}
      onChange={handleIndexChange}
      zoomSpeed={zoomSpeed}
      disableKeyboardSupport={disableKeyboardSupport}
      noNavbar={noNavbar}
      noToolbar={noToolbar}
      rotatable={rotatable}
      scalable={scalable}
      changeable={changeable}
      noClose={noClose}
      minScale={minScale}
      maxScale={maxScale}
      defaultScale={defaultScale}
      className={cn("image-viewer-antd-style", className)}
      downloadable={downloadable}
      noImgDetails={noImgDetails}
      noResetZoomAfterChange={noResetZoomAfterChange}
      showTotal={true}
      drag={drag}
      customToolbar={(toolbars: any) => {
        // Replace download button with a custom-rendered button to prevent viewer state change
        return toolbars.map((toolbar: any) => {
          if (toolbar.key === "download") {
            return {
              ...toolbar,
              actionType: undefined, // Remove default action
              onClick: undefined,
              render: (
                <button
                  type="button"
                  className="react-viewer-icon react-viewer-download"
                  title="Download"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDownload();
                  }}
                >
                  {/* SVG icon for download (Ant Design style) */}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 3v10m0 0l-4-4m4 4l4-4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <rect
                      x="4"
                      y="17"
                      width="12"
                      height="2"
                      rx="1"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              ),
            };
          }
          return toolbar;
        });
      }}
    />
  );
};

ImageViewer.displayName = "ImageViewer";

// ============================================================================
// ImageViewerImage Component (Wrapper for single image with preview)
// ============================================================================

export const ImageViewerImage: React.FC<ImageViewerImageProps> = ({
  src,
  alt = "",
  width,
  height,
  preview = true,
  previewSrc,
  fallback,
  placeholder,
  className,
  wrapperClassName,
  onPreviewClick,
  onError,
  ...props
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [viewerVisible, setViewerVisible] = useState(false);

  const handleLoad = () => {
    setLoading(false);
    setError(false);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setLoading(false);
    setError(true);
    onError?.(e);
  };

  const handlePreview = () => {
    if (!preview) return;
    setViewerVisible(true);
    onPreviewClick?.();
  };

  const handleCloseViewer = () => {
    setViewerVisible(false);
  };

  const showPlaceholder = loading && placeholder;
  const showFallback = error && fallback;
  const showPreviewMask = preview && !loading && !error;

  return (
    <>
      <div
        className={cn(
          "ds-image-viewer-root relative inline-block",
          wrapperClassName
        )}
      >
        <div className="relative inline-block">
          {showPlaceholder && (
            <div
              className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse"
              style={{ width, height }}
            >
              {placeholder === true ? (
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              ) : (
                placeholder
              )}
            </div>
          )}

          <img
            src={showFallback ? fallback : src}
            alt={alt}
            width={width}
            height={height}
            className={cn(
              "ds-image-viewer-img max-w-full h-auto align-middle",
              loading && "opacity-0",
              className
            )}
            onLoad={handleLoad}
            onError={handleError}
            {...props}
          />

          {showPreviewMask && (
            <div
              onClick={handlePreview}
              className={cn(
                "ds-image-viewer-mask absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer",
                "bg-black/50 backdrop-blur-sm"
              )}
            >
              <div className="text-white text-sm flex items-center gap-2">
                <ZoomIn className="w-5 h-5" />
                <span>Preview</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Viewer Modal */}
      <ImageViewer
        images={[{ src: previewSrc || src, alt }]}
        visible={viewerVisible}
        onClose={handleCloseViewer}
        rotatable
        scalable
        downloadable
      />
    </>
  );
};

ImageViewerImage.displayName = "ImageViewer.Image";

// ============================================================================
// ImageViewerGroup Component
// ============================================================================

interface ImageViewerGroupProps {
  children: React.ReactNode;
  images: ImageInfo[];
  preview?: boolean;
}

export const ImageViewerGroup: React.FC<ImageViewerGroupProps> = ({
  children,
  images,
  preview = true,
}) => {
  const [viewerVisible, setViewerVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePreview = useCallback((index: number) => {
    setCurrentIndex(index);
    setViewerVisible(true);
  }, []);

  const handleClose = useCallback(() => {
    setViewerVisible(false);
  }, []);

  const contextValue = React.useMemo(
    () => ({
      handlePreview,
      preview,
    }),
    [handlePreview, preview]
  );

  return (
    <>
      <ImageViewerGroupContext.Provider value={contextValue}>
        {children}
      </ImageViewerGroupContext.Provider>

      <ImageViewer
        images={images}
        visible={viewerVisible}
        onClose={handleClose}
        activeIndex={currentIndex}
        onIndexChange={setCurrentIndex}
        rotatable
        scalable
        downloadable
      />
    </>
  );
};

ImageViewerGroup.displayName = "ImageViewer.Group";

// Context for Group
const ImageViewerGroupContext = React.createContext<{
  handlePreview?: (_index: number) => void;
  preview?: boolean;
} | null>(null);

// Export with namespace
const ImageViewerNamespace = Object.assign(ImageViewer, {
  Image: ImageViewerImage,
  Group: ImageViewerGroup,
});

export default ImageViewerNamespace;
