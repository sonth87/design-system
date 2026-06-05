"use client";

import { AdminLayout } from "@/components/admin-layout";
import {
  TypingText,
  BlurText,
  FlipWords,
  GradientText,
  ShimmeringText,
  TextGenerateEffect,
} from "@sth87/shadcn-design-system";

export default function LibPage() {
  return (
    <AdminLayout>
      <div className="ds:p-6 ds:space-y-8">
        <div>
          <h1 className="ds:text-3xl ds:font-bold">Design System Libraries</h1>
          <p className="ds:text-muted-foreground ds:mt-2">
            Explore utility libraries and animations from our design system.
          </p>
        </div>

        <div className="ds:bg-card ds:border ds:rounded-lg ds:shadow-sm">
          <div className="ds:p-6 ds:border-b">
            <h2 className="ds:text-2xl ds:font-semibold">Text Animation Library</h2>
            <p className="ds:text-muted-foreground ds:mt-2">
              Animated text components for enhanced user experience
            </p>
          </div>
          <div className="ds:p-6 ds:space-y-6">
            <div className="ds:space-y-4">
              <div>
                <h3 className="ds:text-lg ds:font-semibold ds:mb-2">Typing Text</h3>
                <div className="ds:bg-muted ds:p-4 ds:rounded-lg">
                  <TypingText
                    text="Welcome to our design system! This text is being typed automatically."
                    className="ds:text-lg"
                    cursorClassName="ds:bg-primary"
                  />
                </div>
              </div>

              <div>
                <h3 className="ds:text-lg ds:font-semibold ds:mb-2">Blur Text</h3>
                <div className="ds:bg-muted ds:p-4 ds:rounded-lg">
                  <BlurText
                    text="This text has a blur animation effect"
                    className="ds:text-lg"
                  />
                </div>
              </div>

              <div>
                <h3 className="ds:text-lg ds:font-semibold ds:mb-2">Gradient Text</h3>
                <div className="ds:bg-muted ds:p-4 ds:rounded-lg">
                  <GradientText
                    text="Gradient animated text"
                    className="ds:text-lg"
                  />
                </div>
              </div>

              <div>
                <h3 className="ds:text-lg ds:font-semibold ds:mb-2">Shimmering Text</h3>
                <div className="ds:bg-muted ds:p-4 ds:rounded-lg">
                  <ShimmeringText
                    text="Shimmer effect on text"
                    className="ds:text-lg"
                  />
                </div>
              </div>

              <div>
                <h3 className="ds:text-lg ds:font-semibold ds:mb-2">Flip Words</h3>
                <div className="ds:bg-muted ds:p-4 ds:rounded-lg">
                  <FlipWords
                    words={["Hello", "World", "Design", "System"]}
                    className="ds:text-lg"
                  />
                </div>
              </div>

              <div>
                <h3 className="ds:text-lg ds:font-semibold ds:mb-2">
                  Text Generate Effect
                </h3>
                <div className="ds:bg-muted ds:p-4 ds:rounded-lg">
                  <TextGenerateEffect
                    words="Generated text effect"
                    className="ds:text-lg"
                  />
                </div>
              </div>

              <div>
                <h3 className="ds:text-lg ds:font-semibold ds:mb-2">
                  Available Components
                </h3>
                <div className="ds:grid ds:grid-cols-2 ds:md:grid-cols-3 ds:gap-4">
                  <div className="ds:p-4 ds:border ds:rounded-lg">
                    <h4 className="ds:font-medium">BlurText</h4>
                    <p className="ds:text-sm ds:text-muted-foreground">
                      Blur animation effect
                    </p>
                  </div>
                  <div className="ds:p-4 ds:border ds:rounded-lg">
                    <h4 className="ds:font-medium">CircularText</h4>
                    <p className="ds:text-sm ds:text-muted-foreground">
                      Circular text animation
                    </p>
                  </div>
                  <div className="ds:p-4 ds:border ds:rounded-lg">
                    <h4 className="ds:font-medium">FlipWords</h4>
                    <p className="ds:text-sm ds:text-muted-foreground">
                      Word flipping animation
                    </p>
                  </div>
                  <div className="ds:p-4 ds:border ds:rounded-lg">
                    <h4 className="ds:font-medium">GradientText</h4>
                    <p className="ds:text-sm ds:text-muted-foreground">
                      Gradient color animation
                    </p>
                  </div>
                  <div className="ds:p-4 ds:border ds:rounded-lg">
                    <h4 className="ds:font-medium">RollingText</h4>
                    <p className="ds:text-sm ds:text-muted-foreground">
                      Rolling text effect
                    </p>
                  </div>
                  <div className="ds:p-4 ds:border ds:rounded-lg">
                    <h4 className="ds:font-medium">RotatingText</h4>
                    <p className="ds:text-sm ds:text-muted-foreground">
                      Rotation animation
                    </p>
                  </div>
                  <div className="ds:p-4 ds:border ds:rounded-lg">
                    <h4 className="ds:font-medium">ShimmeringText</h4>
                    <p className="ds:text-sm ds:text-muted-foreground">
                      Shimmer effect
                    </p>
                  </div>
                  <div className="ds:p-4 ds:border ds:rounded-lg">
                    <h4 className="ds:font-medium">SplittingText</h4>
                    <p className="ds:text-sm ds:text-muted-foreground">
                      Text splitting animation
                    </p>
                  </div>
                  <div className="ds:p-4 ds:border ds:rounded-lg">
                    <h4 className="ds:font-medium">TextGenerateEffect</h4>
                    <p className="ds:text-sm ds:text-muted-foreground">
                      Text generation effect
                    </p>
                  </div>
                  <div className="ds:p-4 ds:border ds:rounded-lg">
                    <h4 className="ds:font-medium">TextHoverEffect</h4>
                    <p className="ds:text-sm ds:text-muted-foreground">
                      Hover interaction effect
                    </p>
                  </div>
                  <div className="ds:p-4 ds:border ds:rounded-lg">
                    <h4 className="ds:font-medium">TypingText</h4>
                    <p className="ds:text-sm ds:text-muted-foreground">
                      Typing animation
                    </p>
                  </div>
                  <div className="ds:p-4 ds:border ds:rounded-lg">
                    <h4 className="ds:font-medium">WritingText</h4>
                    <p className="ds:text-sm ds:text-muted-foreground">
                      Writing animation
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
