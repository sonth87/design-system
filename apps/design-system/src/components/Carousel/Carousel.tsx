import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  Children,
  isValidElement,
  cloneElement,
} from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { cn } from "@dsui/ui/lib/utils";
import { ImageViewer } from "../ImageViewer";
import type { ImageInfo } from "../ImageViewer";

// ============================================================================
// Types
// ============================================================================

export type SliderEffect =
  | "slide"
  | "fade"
  | "cube"
  | "coverflow"
  | "flip"
  | "cards";

export type SliderDirection = "horizontal" | "vertical";

export type PaginationType =
  | "bullets"
  | "fraction"
  | "progressbar"
  | "scrollbar"
  | "custom";

export interface AutoplayOptions {
  delay?: number;
  disableOnInteraction?: boolean;
  pauseOnMouseEnter?: boolean;
  reverseDirection?: boolean;
  stopOnLastSlide?: boolean;
}

export interface BreakpointOptions {
  slidesPerView?: number;
  spaceBetween?: number;
  slidesPerGroup?: number;
}

export interface NavigationOptions {
  enabled?: boolean;
  prevEl?: React.ReactNode;
  nextEl?: React.ReactNode;
  hideOnClick?: boolean;
  position?: "inside" | "outside"; // inside = overlay on image, outside = beside image
}

export interface PaginationOptions {
  enabled?: boolean;
  type?: PaginationType;
  clickable?: boolean;
  dynamicBullets?: boolean;
  dynamicMainBullets?: number;
  position?: "inside" | "outside"; // inside = overlay on image, outside = below image
  renderBullet?: (index: number, className: string) => React.ReactNode;
  renderFraction?: (
    currentClass: string,
    totalClass: string
  ) => React.ReactNode;
  renderProgressbar?: (progressbarFillClass: string) => React.ReactNode;
  renderScrollbar?: (scrollbarDragClass: string) => React.ReactNode;
  renderCustom?: (current: number, total: number) => React.ReactNode;
}

export interface CarouselProps {
  children: React.ReactNode;
  // Core
  initialSlide?: number;
  direction?: SliderDirection;
  speed?: number;
  spaceBetween?: number;
  slidesPerView?: number | "auto";
  slidesPerGroup?: number;
  centeredSlides?: boolean;
  loop?: boolean;
  loopedSlides?: number;
  rewind?: boolean;
  effect?: SliderEffect;
  // Responsive breakpoints
  breakpoints?: Record<number, BreakpointOptions>;
  // Navigation
  navigation?: boolean | NavigationOptions;
  // Pagination
  pagination?: boolean | PaginationOptions;
  // Autoplay
  autoplay?: boolean | AutoplayOptions;
  // Interaction
  allowTouchMove?: boolean;
  grabCursor?: boolean;
  keyboard?: boolean;
  mousewheel?: boolean;
  freeMode?: boolean;
  // Styling
  className?: string;
  containerClassName?: string;
  wrapperClassName?: string;
  slideClassName?: string;
  // Image Viewer
  enableImageViewer?: boolean;
  // Callbacks
  onSlideChange?: (swiper: { activeIndex: number; realIndex: number }) => void;
  onReachBeginning?: () => void;
  onReachEnd?: () => void;
  onAutoplayStart?: () => void;
  onAutoplayStop?: () => void;
}

// ============================================================================
// Carousel Slide Component Types
// ============================================================================

export interface CarouselSlideProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

// ============================================================================
// Carousel Component
// ============================================================================

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      children,
      initialSlide = 0,
      direction = "horizontal",
      speed = 300,
      spaceBetween = 0,
      slidesPerView = 1,
      slidesPerGroup = 1,
      centeredSlides = false,
      loop = false,
      rewind = false,
      effect = "slide",
      breakpoints,
      navigation = false,
      pagination = false,
      autoplay = false,
      allowTouchMove = true,
      grabCursor = true,
      keyboard = false,
      mousewheel = false,
      className,
      containerClassName,
      wrapperClassName,
      slideClassName,
      enableImageViewer = false,
      onSlideChange,
      onReachBeginning,
      onReachEnd,
      onAutoplayStart,
      onAutoplayStop,
    },
    ref
  ) => {
    // Parse navigation options
    const navigationOptions: NavigationOptions =
      typeof navigation === "boolean"
        ? { enabled: navigation, position: "inside" }
        : { enabled: true, position: "inside", ...navigation };

    // Parse pagination options
    const paginationOptions: PaginationOptions =
      typeof pagination === "boolean"
        ? { enabled: pagination, type: "bullets", position: "inside" }
        : { enabled: true, type: "bullets", position: "inside", ...pagination };

    // Parse autoplay options
    const autoplayOptions: AutoplayOptions = useMemo(
      () =>
        typeof autoplay === "boolean"
          ? { delay: 3000, disableOnInteraction: true }
          : { delay: 3000, disableOnInteraction: true, ...autoplay },
      [autoplay]
    );

    // State
    const [activeIndex, setActiveIndex] = useState(initialSlide);
    const [isBeginning, setIsBeginning] = useState(initialSlide === 0);
    const [isEnd, setIsEnd] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [translate, setTranslate] = useState(0);
    const [isAutoplayRunning, setIsAutoplayRunning] = useState(false);
    const [showScrollbar, setShowScrollbar] = useState(false);
    const [windowWidth, setWindowWidth] = useState(
      typeof window !== "undefined" ? window.innerWidth : 1024
    );
    const [viewerVisible, setViewerVisible] = useState(false);
    const [viewerIndex, setViewerIndex] = useState(0);

    // Handle window resize for breakpoints
    useEffect(() => {
      if (!breakpoints) return;

      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [breakpoints]);

    // Get current breakpoint values
    const currentBreakpoint = useMemo(() => {
      if (!breakpoints) {
        return { slidesPerView, spaceBetween, slidesPerGroup };
      }

      const breakpointKeys = Object.keys(breakpoints)
        .map(Number)
        .sort((a, b) => b - a); // Sort descending

      for (const breakpoint of breakpointKeys) {
        if (windowWidth >= breakpoint) {
          return {
            slidesPerView:
              breakpoints[breakpoint].slidesPerView ?? slidesPerView,
            spaceBetween: breakpoints[breakpoint].spaceBetween ?? spaceBetween,
            slidesPerGroup:
              breakpoints[breakpoint].slidesPerGroup ?? slidesPerGroup,
          };
        }
      }

      return { slidesPerView, spaceBetween, slidesPerGroup };
    }, [breakpoints, windowWidth, slidesPerView, spaceBetween, slidesPerGroup]);

    // Use breakpoint values
    const actualSlidesPerView = currentBreakpoint.slidesPerView;
    const actualSpaceBetween = currentBreakpoint.spaceBetween;
    const actualSlidesPerGroup = currentBreakpoint.slidesPerGroup;

    // Refs
    const containerRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const autoplayTimerRef = useRef<number | null>(null);
    const scrollbarTimerRef = useRef<number | null>(null);
    const dragStateRef = useRef({
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
    });
    const hasDraggedRef = useRef(false);

    // Get slides
    const slides = Children.toArray(children).filter(
      (child) => isValidElement(child) && child.type === CarouselSlide
    );
    const totalSlides = slides.length;

    // Helper function to find image in children
    const findImageInChildren = useCallback(
      (
        children: React.ReactNode
      ): React.ReactElement<
        React.ImgHTMLAttributes<HTMLImageElement>
      > | null => {
        let result: React.ReactElement<
          React.ImgHTMLAttributes<HTMLImageElement>
        > | null = null;

        React.Children.forEach(children, (child) => {
          if (result) return;

          if (isValidElement(child)) {
            if (child.type === "img") {
              result = child as React.ReactElement<
                React.ImgHTMLAttributes<HTMLImageElement>
              >;
            } else if (
              child.props &&
              typeof child.props === "object" &&
              "children" in child.props
            ) {
              result = findImageInChildren(
                child.props.children as React.ReactNode
              );
            }
          }
        });

        return result;
      },
      []
    );

    // Extract images for ImageViewer
    const imageInfos = useMemo((): ImageInfo[] => {
      if (!enableImageViewer) return [];

      return slides.map((slide) => {
        const slideElement = slide as React.ReactElement<CarouselSlideProps>;
        const imgElement = findImageInChildren(slideElement.props.children);

        if (imgElement) {
          return {
            src: imgElement.props.src || "",
            alt: imgElement.props.alt || "",
          };
        }

        return { src: "", alt: "" };
      });
    }, [slides, enableImageViewer, findImageInChildren]);

    // Handle slide click for image viewer
    const handleSlideClick = useCallback(
      (index: number) => {
        console.log("Slide clicked:", {
          index,
          enableImageViewer,
          hasSrc: !!imageInfos[index]?.src,
          hasDragged: hasDraggedRef.current,
          imageInfos,
        });

        // Only open viewer if not dragged
        if (
          enableImageViewer &&
          imageInfos[index]?.src &&
          !hasDraggedRef.current
        ) {
          console.log("Opening viewer at index:", index);
          setViewerIndex(index);
          setViewerVisible(true);
        }
      },
      [enableImageViewer, imageInfos]
    );

    // Calculate visible slides
    const visibleSlides =
      actualSlidesPerView === "auto"
        ? 1
        : Math.min(actualSlidesPerView as number, totalSlides);

    // Update beginning/end state
    useEffect(() => {
      if (loop) {
        setIsBeginning(false);
        setIsEnd(false);
      } else {
        setIsBeginning(activeIndex === 0);
        setIsEnd(activeIndex >= totalSlides - visibleSlides);
      }
    }, [activeIndex, totalSlides, visibleSlides, loop]);

    // Slide to index
    const slideTo = useCallback(
      (index: number) => {
        let newIndex = index;

        if (loop) {
          // In loop mode, allow any index
          newIndex = ((index % totalSlides) + totalSlides) % totalSlides;
        } else if (rewind) {
          // In rewind mode, wrap around
          if (index < 0) newIndex = totalSlides - 1;
          else if (index >= totalSlides) newIndex = 0;
          else newIndex = index;
        } else {
          // Normal mode, clamp to bounds
          newIndex = Math.max(0, Math.min(index, totalSlides - visibleSlides));
        }

        setActiveIndex(newIndex);

        // Calculate translate
        const containerSize =
          direction === "horizontal"
            ? containerRef.current?.offsetWidth || 0
            : containerRef.current?.offsetHeight || 0;

        const slideSize = containerSize / visibleSlides;
        let newTranslate = -newIndex * (slideSize + actualSpaceBetween);

        if (centeredSlides && visibleSlides < totalSlides) {
          newTranslate += containerSize / 2 - slideSize / 2;
        }

        setTranslate(newTranslate);

        // Show scrollbar on slide change
        if (paginationOptions.type === "scrollbar") {
          setShowScrollbar(true);
          if (scrollbarTimerRef.current) {
            clearTimeout(scrollbarTimerRef.current);
          }
          scrollbarTimerRef.current = setTimeout(() => {
            setShowScrollbar(false);
          }, 1000) as unknown as number;
        }

        // Callbacks
        onSlideChange?.({ activeIndex: newIndex, realIndex: newIndex });

        if (newIndex === 0) onReachBeginning?.();
        if (newIndex >= totalSlides - visibleSlides) onReachEnd?.();
      },
      [
        totalSlides,
        visibleSlides,
        loop,
        rewind,
        direction,
        actualSpaceBetween,
        centeredSlides,
        paginationOptions.type,
        onSlideChange,
        onReachBeginning,
        onReachEnd,
      ]
    );

    // Navigation
    const slideNext = useCallback(() => {
      slideTo(activeIndex + actualSlidesPerGroup);
    }, [activeIndex, actualSlidesPerGroup, slideTo]);

    const slidePrev = useCallback(() => {
      slideTo(activeIndex - actualSlidesPerGroup);
    }, [activeIndex, actualSlidesPerGroup, slideTo]);

    // Autoplay
    const stopAutoplay = useCallback(() => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
        autoplayTimerRef.current = null;
      }
      setIsAutoplayRunning(false);
      onAutoplayStop?.();
    }, [onAutoplayStop]);

    const startAutoplay = useCallback(() => {
      if (!autoplay) return;

      autoplayTimerRef.current = setInterval(() => {
        if (autoplayOptions.reverseDirection) {
          slidePrev();
        } else {
          slideNext();
        }

        if (autoplayOptions.stopOnLastSlide && isEnd) {
          stopAutoplay();
        }
      }, autoplayOptions.delay) as unknown as number;

      setIsAutoplayRunning(true);
      onAutoplayStart?.();
    }, [
      autoplayOptions,
      autoplay,
      slideNext,
      slidePrev,
      isEnd,
      onAutoplayStart,
      stopAutoplay,
    ]);

    // Auto-start autoplay
    useEffect(() => {
      if (autoplay) {
        startAutoplay();
      }
      return () => stopAutoplay();
    }, [autoplay, startAutoplay, stopAutoplay]);

    // Pause on hover
    const handleMouseEnter = useCallback(() => {
      if (autoplayOptions.pauseOnMouseEnter && isAutoplayRunning) {
        stopAutoplay();
      }
    }, [autoplayOptions.pauseOnMouseEnter, isAutoplayRunning, stopAutoplay]);

    const handleMouseLeave = useCallback(() => {
      if (autoplayOptions.pauseOnMouseEnter && autoplay && !isAutoplayRunning) {
        startAutoplay();
      }
    }, [
      autoplayOptions.pauseOnMouseEnter,
      autoplay,
      isAutoplayRunning,
      startAutoplay,
    ]);

    // Touch/drag handlers
    const handlePointerDown = useCallback(
      (e: React.PointerEvent) => {
        if (!allowTouchMove) return;

        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch (err) {
          console.error("Failed to capture pointer:", err);
        }

        dragStateRef.current.startX = e.clientX;
        dragStateRef.current.startY = e.clientY;
        dragStateRef.current.currentX = e.clientX;
        dragStateRef.current.currentY = e.clientY;
        hasDraggedRef.current = false;
        setIsDragging(true);

        if (autoplayOptions.disableOnInteraction) {
          stopAutoplay();
        }
      },
      [allowTouchMove, autoplayOptions.disableOnInteraction, stopAutoplay]
    );

    const handlePointerMove = useCallback(
      (e: React.PointerEvent) => {
        if (!allowTouchMove) return;

        const startX = dragStateRef.current.startX;
        const startY = dragStateRef.current.startY;

        // Check if drag has started (startX/Y are set)
        if (startX === 0 && startY === 0) return;

        e.preventDefault();
        dragStateRef.current.currentX = e.clientX;
        dragStateRef.current.currentY = e.clientY;

        // Mark as dragged if moved more than 5px
        const diffX = Math.abs(e.clientX - dragStateRef.current.startX);
        const diffY = Math.abs(e.clientY - dragStateRef.current.startY);
        if (diffX > 5 || diffY > 5) {
          hasDraggedRef.current = true;
        }

        setIsDragging(true);
      },
      [allowTouchMove]
    );

    const handlePointerUp = useCallback(() => {
      const startX = dragStateRef.current.startX;
      const startY = dragStateRef.current.startY;

      // Check if we actually dragged
      if (startX === 0 && startY === 0) return;

      const diffX = dragStateRef.current.currentX - startX;
      const diffY = dragStateRef.current.currentY - startY;
      const diff = direction === "horizontal" ? diffX : diffY;

      // Determine slide action with lower threshold
      const threshold = 0;
      if (Math.abs(diff) > threshold && hasDraggedRef.current) {
        if (diff > 0) {
          // Swipe right/down = previous slide
          slidePrev();
        } else {
          // Swipe left/up = next slide
          slideNext();
        }
      } else {
        // Snap back to current
        slideTo(activeIndex);
      }

      // Reset after a small delay to allow onClick to check the flag
      setTimeout(() => {
        setIsDragging(false);
        dragStateRef.current.startX = 0;
        dragStateRef.current.startY = 0;
        dragStateRef.current.currentX = 0;
        dragStateRef.current.currentY = 0;
        hasDraggedRef.current = false;
      }, 50);
    }, [direction, slidePrev, slideNext, slideTo, activeIndex]);

    // Keyboard navigation
    useEffect(() => {
      if (!keyboard) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          e.preventDefault();
          slidePrev();
        } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          e.preventDefault();
          slideNext();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [keyboard, slideNext, slidePrev]);

    // Mousewheel navigation
    useEffect(() => {
      if (!mousewheel) return;

      const handleWheel = (e: WheelEvent) => {
        e.preventDefault();
        if (e.deltaY > 0) slideNext();
        else if (e.deltaY < 0) slidePrev();
      };

      const container = containerRef.current;
      if (container) {
        container.addEventListener("wheel", handleWheel, { passive: false });
        return () => container.removeEventListener("wheel", handleWheel);
      }
    }, [mousewheel, slideNext, slidePrev]);

    // Render pagination
    const renderPagination = () => {
      if (!paginationOptions.enabled) return null;

      const {
        type,
        clickable,
        dynamicBullets,
        dynamicMainBullets = 1,
        position = "inside",
      } = paginationOptions;

      const isOutside = position === "outside";

      if (type === "bullets") {
        const bulletsToShow = dynamicBullets
          ? Math.min(dynamicMainBullets * 2 + 1, totalSlides)
          : totalSlides;

        return (
          <div
            className={cn(
              "ds:flex ds:items-center ds:justify-center ds:gap-2",
              isOutside
                ? "ds:mt-4" // Outside: margin-top for spacing
                : "ds:absolute ds:bottom-4 ds:left-1/2 ds:-translate-x-1/2", // Inside: overlay
              direction === "vertical" &&
                !isOutside &&
                "ds:flex-col ds:right-4 ds:left-auto ds:top-1/2 ds:-translate-y-1/2 ds:translate-x-0 ds:bottom-auto"
            )}
          >
            {Array.from({ length: bulletsToShow }).map((_, i) => {
              const bulletIndex = dynamicBullets
                ? Math.max(
                    0,
                    Math.min(
                      i + activeIndex - dynamicMainBullets,
                      totalSlides - 1
                    )
                  )
                : i;

              const isActive = bulletIndex === activeIndex;

              return paginationOptions.renderBullet ? (
                <React.Fragment key={bulletIndex}>
                  {paginationOptions.renderBullet(
                    bulletIndex,
                    cn(
                      "ds:carousel-pagination-bullet",
                      isActive && "ds:carousel-pagination-bullet-active"
                    )
                  )}
                </React.Fragment>
              ) : (
                <button
                  key={bulletIndex}
                  onClick={() => clickable && slideTo(bulletIndex)}
                  className={cn(
                    "ds:rounded-full ds:transition-all",
                    direction === "horizontal" ? "ds:w-2 ds:h-2" : "ds:w-2 ds:h-2",
                    isActive
                      ? direction === "horizontal"
                        ? "ds:bg-primary ds:w-6"
                        : "ds:bg-primary ds:h-6"
                      : "ds:bg-muted-foreground/30 ds:hover:bg-muted-foreground/50",
                    clickable && "ds:cursor-pointer"
                  )}
                  aria-label={`Go to slide ${bulletIndex + 1}`}
                />
              );
            })}
          </div>
        );
      }

      if (type === "fraction") {
        return (
          <div
            className={cn(
              "ds:text-center ds:text-sm ds:text-muted-foreground ds:bg-background/80 ds:backdrop-blur ds:px-3 ds:py-1 ds:rounded-full",
              isOutside
                ? "ds:mt-4 ds:mx-auto ds:w-fit" // Outside: centered with margin
                : "ds:absolute ds:bottom-4 ds:left-1/2 ds:-translate-x-1/2" // Inside: overlay
            )}
          >
            {paginationOptions.renderFraction ? (
              paginationOptions.renderFraction(
                "carousel-pagination-current",
                "carousel-pagination-total"
              )
            ) : (
              <>
                <span className="ds:carousel-pagination-current ds:font-semibold ds:text-foreground">
                  {activeIndex + 1}
                </span>
                {" / "}
                <span className="ds:carousel-pagination-total">{totalSlides}</span>
              </>
            )}
          </div>
        );
      }

      if (type === "progressbar") {
        const progress = ((activeIndex + 1) / totalSlides) * 100;
        const isInside = paginationOptions.position === "inside";

        const handleProgressbarClick = (
          e: React.MouseEvent<HTMLDivElement>
        ) => {
          if (!clickable) return;
          const rect = e.currentTarget.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const percentage = clickX / rect.width;
          const targetIndex = Math.floor(percentage * totalSlides);
          slideTo(Math.min(targetIndex, totalSlides - 1));
        };

        return (
          <div
            onClick={handleProgressbarClick}
            className={cn(
              "ds:w-full ds:h-1 ds:bg-muted ds:rounded-full ds:overflow-hidden",
              isInside
                ? "ds:absolute ds:bottom-0 ds:left-0 ds:right-0 ds:rounded-none"
                : "ds:mt-4",
              clickable && "ds:cursor-pointer"
            )}
          >
            {paginationOptions.renderProgressbar ? (
              paginationOptions.renderProgressbar("carousel-progressbar-fill")
            ) : (
              <div
                className="ds:carousel-progressbar-fill ds:h-full ds:bg-primary ds:transition-all ds:duration-300"
                style={{ width: `${progress}%` }}
              />
            )}
          </div>
        );
      }

      if (type === "custom" && paginationOptions.renderCustom) {
        return (
          <div
            className={cn(
              isOutside
                ? "ds:mt-4 ds:flex ds:justify-center" // Outside: centered with margin
                : "ds:absolute ds:bottom-4 ds:left-1/2 ds:-translate-x-1/2" // Inside: overlay
            )}
          >
            {paginationOptions.renderCustom(activeIndex + 1, totalSlides)}
          </div>
        );
      }

      if (type === "scrollbar") {
        const dragWidth = (1 / totalSlides) * 100;
        const scrollPosition =
          (activeIndex / (totalSlides - 1)) * (100 - dragWidth);

        const handleScrollbarClick = (e: React.MouseEvent<HTMLDivElement>) => {
          if (!clickable) return;

          // Show scrollbar on click
          setShowScrollbar(true);
          if (scrollbarTimerRef.current) {
            clearTimeout(scrollbarTimerRef.current);
          }

          const rect = e.currentTarget.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const percentage = clickX / rect.width;
          const targetIndex = Math.round(percentage * (totalSlides - 1));
          slideTo(Math.max(0, Math.min(targetIndex, totalSlides - 1)));

          // Hide after 1s
          scrollbarTimerRef.current = setTimeout(() => {
            setShowScrollbar(false);
          }, 1000) as unknown as number;
        };

        return (
          <div
            onClick={handleScrollbarClick}
            className={cn(
              "ds:w-full ds:h-1 ds:bg-muted/50 ds:rounded-full ds:transition-opacity ds:duration-300",
              isOutside
                ? "ds:mt-4" // Outside: margin-top for spacing
                : "ds:absolute ds:bottom-0 ds:left-1/2 ds:-translate-x-1/2", // Inside: overlay at bottom
              clickable && "ds:cursor-pointer",
              showScrollbar ? "ds:opacity-100" : "ds:opacity-0"
            )}
          >
            {paginationOptions.renderScrollbar ? (
              paginationOptions.renderScrollbar("carousel-scrollbar-drag")
            ) : (
              <div
                className="ds:carousel-scrollbar-drag ds:h-full ds:bg-primary ds:rounded-full ds:transition-all ds:duration-300 ds:absolute ds:left-0"
                style={{
                  width: `${dragWidth}%`,
                  left: `${scrollPosition}%`,
                }}
              />
            )}
          </div>
        );
      }

      return null;
    };

    // Get effect transform/classes for slides
    const getSlideTransform = (index: number) => {
      const diff = index - activeIndex;

      switch (effect) {
        case "fade":
          return {
            opacity: diff === 0 ? 1 : 0,
            zIndex: diff === 0 ? 10 : 0,
          };
        case "cube":
          return {
            transform: `translateX(${diff * 100}%) rotateY(${diff * -90}deg)`,
            transformOrigin: diff > 0 ? "left center" : "right center",
          };
        case "coverflow":
          return {
            transform: `translateX(${diff * 60}%) translateZ(${Math.abs(diff) * -100}px) rotateY(${diff * -50}deg)`,
            zIndex: -Math.abs(diff),
          };
        case "flip":
          return {
            transform: `rotateY(${diff * 180}deg)`,
            backfaceVisibility: "hidden" as const,
          };
        case "cards":
          return {
            transform: `translateX(${diff * 50}px) translateZ(${-Math.abs(diff) * 100}px) scale(${1 - Math.abs(diff) * 0.2})`,
            opacity: diff === 0 ? 1 : 0.5,
            zIndex: 100 - Math.abs(diff) * 10,
            transition: "all 0.5s ease",
          };
        default:
          return {};
      }
    };

    return (
      <>
        <div
          ref={ref}
          className={cn("ds:carousel-container", containerClassName, className)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            ref={containerRef}
            className={cn(
              "ds:carousel ds:relative ds:overflow-hidden",
              (effect === "fade" ||
                effect === "cube" ||
                effect === "flip" ||
                effect === "cards") &&
                "ds:aspect-4/3",
              effect === "coverflow" && "ds:aspect-4/2 ds:rounded-xl",
              direction === "vertical" && effect === "slide" && "ds:h-full",
              grabCursor && allowTouchMove && !isDragging && "ds:cursor-grab",
              isDragging && "ds:cursor-grabbing"
            )}
          >
            {/* Wrapper */}
            <div
              ref={wrapperRef}
              className={cn(
                "ds:carousel-wrapper ds:select-none",
                effect === "slide" && "ds:flex",
                direction === "vertical" &&
                  effect === "slide" &&
                  "ds:flex-col ds:h-full",
                effect !== "slide" && "ds:relative",
                wrapperClassName
              )}
              style={{
                transform:
                  effect === "slide"
                    ? direction === "horizontal"
                      ? `translateX(${translate}px)`
                      : `translateY(${translate}px)`
                    : undefined,
                transition: isDragging ? "none" : `transform ${speed}ms ease`,
                gap: effect === "slide" ? `${actualSpaceBetween}px` : undefined,
                perspective:
                  effect !== "slide" && effect !== "fade"
                    ? "1200px"
                    : undefined,
                touchAction: allowTouchMove ? "none" : "auto",
                height:
                  direction === "vertical" && effect === "slide"
                    ? "100%"
                    : undefined,
              }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              {slides.map((slide, index) => {
                const isActive = index === activeIndex;
                const slideElement =
                  slide as React.ReactElement<CarouselSlideProps>;

                return cloneElement(slideElement, {
                  key: index,
                  className: cn(
                    "ds:carousel-slide",
                    slideClassName,
                    slideElement.props.className,
                    effect !== "slide" && "ds:absolute ds:inset-0",
                    effect === "fade" && "ds:transition-opacity ds:duration-300",
                    effect !== "slide" &&
                      effect !== "fade" &&
                      "ds:transition-all ds:duration-500",
                    enableImageViewer &&
                      imageInfos[index]?.src &&
                      "ds:cursor-pointer"
                  ),
                  style: {
                    flex:
                      effect === "slide"
                        ? direction === "vertical"
                          ? `0 0 100%`
                          : `0 0 calc(${100 / visibleSlides}% - ${(actualSpaceBetween * (visibleSlides - 1)) / visibleSlides}px)`
                        : undefined,
                    minWidth:
                      effect === "slide" && direction === "horizontal"
                        ? 0
                        : undefined,
                    minHeight:
                      effect === "slide" && direction === "vertical"
                        ? 0
                        : undefined,
                    height:
                      direction === "vertical" && effect === "slide"
                        ? "100%"
                        : undefined,
                    userSelect: "none",
                    // @ts-expect-error - WebkitUserDrag is not in CSSProperties but is valid CSS
                    WebkitUserDrag: "none",
                    ...(effect !== "slide" ? getSlideTransform(index) : {}),
                    ...slideElement.props.style,
                  } as React.CSSProperties,
                  onClick: (e: React.MouseEvent) => {
                    e.stopPropagation();
                    handleSlideClick(index);
                  },
                  onDragStart: (e: React.DragEvent) => e.preventDefault(),
                  "data-active": isActive,
                  "data-index": index,
                } as Partial<CarouselSlideProps>);
              })}
            </div>

            {/* Pagination - Inside only (overlay on slider) */}
            {paginationOptions.enabled &&
              paginationOptions.position !== "outside" &&
              renderPagination()}

            {/* Navigation - Inside (overlay on slider) */}
            {navigationOptions.enabled &&
              navigationOptions.position === "inside" && (
                <>
                  <button
                    onClick={slidePrev}
                    disabled={!loop && !rewind && isBeginning}
                    className={cn(
                      "ds:absolute ds:z-10 ds:w-10 ds:h-10 ds:rounded-full ds:bg-background/80 ds:backdrop-blur ds:shadow-lg ds:flex ds:items-center ds:justify-center ds:transition-all ds:hover:bg-background ds:disabled:opacity-30 ds:disabled:cursor-not-allowed",
                      direction === "horizontal"
                        ? "ds:left-4 ds:top-1/2 ds:-translate-y-1/2"
                        : "ds:top-4 ds:left-1/2 ds:-translate-x-1/2"
                    )}
                    aria-label="Previous slide"
                  >
                    {navigationOptions.prevEl ||
                      (direction === "horizontal" ? (
                        <ChevronLeft className="ds:w-5 ds:h-5" />
                      ) : (
                        <ChevronUp className="ds:w-5 ds:h-5" />
                      ))}
                  </button>
                  <button
                    onClick={slideNext}
                    disabled={!loop && !rewind && isEnd}
                    className={cn(
                      "ds:absolute ds:z-10 ds:w-10 ds:h-10 ds:rounded-full ds:bg-background/80 ds:backdrop-blur ds:shadow-lg ds:flex ds:items-center ds:justify-center ds:transition-all ds:hover:bg-background ds:disabled:opacity-30 ds:disabled:cursor-not-allowed",
                      direction === "horizontal"
                        ? "ds:right-4 ds:top-1/2 ds:-translate-y-1/2"
                        : "ds:bottom-4 ds:left-1/2 ds:-translate-x-1/2"
                    )}
                    aria-label="Next slide"
                  >
                    {navigationOptions.nextEl ||
                      (direction === "horizontal" ? (
                        <ChevronRight className="ds:w-5 ds:h-5" />
                      ) : (
                        <ChevronDown className="ds:w-5 ds:h-5" />
                      ))}
                  </button>
                </>
              )}
          </div>

          {/* Pagination - Outside (below slider) */}
          {paginationOptions.enabled &&
            paginationOptions.position === "outside" &&
            renderPagination()}
        </div>

        {/* Image Viewer */}
        {enableImageViewer && imageInfos.length > 0 && (
          <ImageViewer
            images={imageInfos}
            visible={viewerVisible}
            onClose={() => {
              console.log("Closing viewer");
              setViewerVisible(false);
            }}
            activeIndex={viewerIndex}
            onIndexChange={setViewerIndex}
          />
        )}
        {/* {enableImageViewer && (
          <div
            style={{
              position: "fixed",
              top: 10,
              right: 10,
              background: "white",
              padding: "10px",
              zIndex: 9999,
              fontSize: "12px",
            }}
          >
            Debug: visible={String(viewerVisible)}, images={imageInfos.length},
            index={viewerIndex}
          </div>
        )} */}
      </>
    );
  }
);

Carousel.displayName = "Carousel";

// ============================================================================
// Carousel Slide Component
// ============================================================================

export const CarouselSlide = React.forwardRef<
  HTMLDivElement,
  CarouselSlideProps
>(({ children, className, style, ...props }, ref) => {
  return (
    <div ref={ref} className={className} style={style} {...props}>
      {children}
    </div>
  );
});

CarouselSlide.displayName = "CarouselSlide";

export default Carousel;
