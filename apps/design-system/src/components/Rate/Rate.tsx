"use client";

import React, { useState, useRef } from "react";
import type { KeyboardEvent } from "react";
import { Star, StarHalf } from "lucide-react";
import { cn } from "@dsui/ui/lib/utils";

export interface RateProps {
  // Display
  count?: number;
  value?: number;
  defaultValue?: number;
  allowHalf?: boolean;
  allowClear?: boolean;

  // Appearance
  size?: "small" | "middle" | "large";
  character?: React.ReactNode | ((rateProps: RateProps) => React.ReactNode);
  className?: string;
  style?: React.CSSProperties;

  // Interaction
  disabled?: boolean;
  autoFocus?: boolean;
  keyboard?: boolean;

  // Tooltips
  tooltips?: string[];

  // Callbacks
  onChange?: (value: number) => void;
  onHoverChange?: (value: number) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyDown?: (event: KeyboardEvent<HTMLDivElement>) => void;
}

const Rate = React.forwardRef<HTMLDivElement, RateProps>(
  (
    {
      count = 5,
      value: controlledValue,
      defaultValue = 0,
      allowHalf = false,
      allowClear = true,
      size = "middle",
      character,
      className,
      style,
      disabled = false,
      autoFocus = false,
      keyboard = true,
      tooltips,
      onChange,
      onHoverChange,
      onFocus,
      onBlur,
      onKeyDown,
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const [hoverValue, setHoverValue] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Use controlled or uncontrolled value
    const value =
      controlledValue !== undefined ? controlledValue : internalValue;

    // Size in pixels
    const sizeMap = {
      small: 20,
      middle: 24,
      large: 32,
    };

    // Handle star click
    const handleStarClick = (starIndex: number, isHalf: boolean) => {
      if (disabled) return;

      const newValue = isHalf ? starIndex + 0.5 : starIndex + 1;

      // If clicking the same value and allowClear is true, clear the rating
      if (allowClear && newValue === value) {
        setInternalValue(0);
        onChange?.(0);
      } else {
        setInternalValue(newValue);
        onChange?.(newValue);
      }
    };

    // Handle star hover
    const handleStarHover = (starIndex: number, isHalf: boolean) => {
      if (disabled) return;

      const newHoverValue = isHalf ? starIndex + 0.5 : starIndex + 1;
      setHoverValue(newHoverValue);
      onHoverChange?.(newHoverValue);
    };

    // Handle mouse leave
    const handleMouseLeave = () => {
      setHoverValue(null);
      onHoverChange?.(0);
    };

    // Handle keyboard navigation
    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      if (!keyboard || disabled) return;

      onKeyDown?.(event);

      const step = allowHalf ? 0.5 : 1;
      let newValue = value;

      switch (event.key) {
        case "ArrowRight":
        case "ArrowUp":
          event.preventDefault();
          newValue = Math.min(value + step, count);
          break;
        case "ArrowLeft":
        case "ArrowDown":
          event.preventDefault();
          newValue = Math.max(value - step, 0);
          break;
        case "Home":
          event.preventDefault();
          newValue = allowHalf ? 0.5 : 1;
          break;
        case "End":
          event.preventDefault();
          newValue = count;
          break;
        default:
          return;
      }

      setInternalValue(newValue);
      onChange?.(newValue);
    };

    // Handle focus
    const handleFocus = () => {
      onFocus?.();
    };

    // Handle blur
    const handleBlur = () => {
      onBlur?.();
    };

    // Get star fill percentage
    const getStarFill = (starIndex: number) => {
      const currentValue = hoverValue !== null ? hoverValue : value;

      if (currentValue >= starIndex + 1) {
        return 100; // Full star
      } else if (currentValue > starIndex && currentValue < starIndex + 1) {
        return (currentValue - starIndex) * 100; // Partial star
      }
      return 0; // Empty star
    };

    // Check if star should show as half
    const isHalfStar = (starIndex: number) => {
      if (!allowHalf) return false;
      const currentValue = hoverValue !== null ? hoverValue : value;
      const fill = currentValue - starIndex;
      return fill > 0 && fill <= 0.5;
    };

    // Render character
    const renderCharacter = (isHalf: boolean = false) => {
      if (typeof character === "function") {
        return character({
          count,
          value,
          defaultValue,
          allowHalf,
          allowClear,
          size,
          disabled,
        });
      }
      if (isHalf) {
        return <StarHalf className="w-full h-full" />;
      }
      return character || <Star className="w-full h-full" />;
    };

    // Get tooltip for star
    const getTooltip = (starIndex: number) => {
      if (!tooltips || !tooltips[starIndex]) return undefined;
      return tooltips[starIndex];
    };

    return (
      <div
        ref={(node) => {
          containerRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        className={cn(
          "inline-flex items-center gap-1",
          disabled && "opacity-50 cursor-not-allowed",
          !disabled && "cursor-pointer",
          className,
        )}
        style={style}
        onMouseLeave={handleMouseLeave}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex={disabled ? -1 : 0}
        role="slider"
        aria-label="Rate"
        aria-valuemin={0}
        aria-valuemax={count}
        aria-valuenow={value}
        aria-disabled={disabled}
        autoFocus={autoFocus}
      >
        {Array.from({ length: count }, (_, index) => {
          const fillPercentage = getStarFill(index);
          const tooltip = getTooltip(index);
          const showHalfStar = isHalfStar(index);

          return (
            <div key={index} className="relative group" title={tooltip}>
              {/* Container for half stars */}
              <div
                className="relative inline-flex"
                style={{
                  width: `${sizeMap[size]}px`,
                  height: `${sizeMap[size]}px`,
                }}
              >
                {/* Empty star background */}
                <div className="text-muted-foreground/30 pointer-events-none">
                  {renderCharacter(false)}
                </div>

                {/* Filled star overlay */}
                {fillPercentage > 0 && (
                  <div className="absolute inset-0 text-yellow-400 pointer-events-none">
                    {showHalfStar ? (
                      renderCharacter(true)
                    ) : (
                      <div
                        className="overflow-hidden"
                        style={{ width: `${fillPercentage}%` }}
                      >
                        {renderCharacter(false)}
                      </div>
                    )}
                  </div>
                )}

                {/* Interactive overlay for clicking and hovering */}
                {!disabled && (
                  <>
                    {allowHalf ? (
                      <>
                        {/* Left half */}
                        <div
                          className="absolute inset-0 w-1/2 cursor-pointer"
                          onClick={() => handleStarClick(index, true)}
                          onMouseEnter={() => handleStarHover(index, true)}
                        />
                        {/* Right half */}
                        <div
                          className="absolute inset-0 left-1/2 w-1/2 cursor-pointer"
                          onClick={() => handleStarClick(index, false)}
                          onMouseEnter={() => handleStarHover(index, false)}
                        />
                      </>
                    ) : (
                      <div
                        className="absolute inset-0 cursor-pointer"
                        onClick={() => handleStarClick(index, false)}
                        onMouseEnter={() => handleStarHover(index, false)}
                      />
                    )}
                  </>
                )}
              </div>

              {/* Show tooltip text below star on hover */}
              {tooltip &&
                (hoverValue === index + 1 ||
                  (allowHalf && hoverValue === index + 0.5)) && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-1 text-xs bg-foreground text-background rounded whitespace-nowrap z-10">
                    {tooltip}
                  </div>
                )}
            </div>
          );
        })}
      </div>
    );
  },
);

Rate.displayName = "Rate";

export default Rate;
