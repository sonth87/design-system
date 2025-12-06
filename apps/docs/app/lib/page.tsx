"use client";

import { AdminLayout } from "@/components/admin-layout";
import {
  TypingText,
  BlurText,
  FlipWords,
  GradientText,
  ShimmeringText,
  TextGenerateEffect,
} from "@dsui/design-system";

export default function LibPage() {
  return (
    <AdminLayout>
      <div className="p-6 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Design System Libraries</h1>
          <p className="text-muted-foreground mt-2">
            Explore utility libraries and animations from our design system.
          </p>
        </div>

        <div className="bg-card border rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-semibold">Text Animation Library</h2>
            <p className="text-muted-foreground mt-2">
              Animated text components for enhanced user experience
            </p>
          </div>
          <div className="p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Typing Text</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <TypingText
                    text="Welcome to our design system! This text is being typed automatically."
                    className="text-lg"
                    cursorClassName="bg-primary"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Blur Text</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <BlurText
                    text="This text has a blur animation effect"
                    className="text-lg"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Gradient Text</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <GradientText
                    text="Gradient animated text"
                    className="text-lg"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Shimmering Text</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <ShimmeringText
                    text="Shimmer effect on text"
                    className="text-lg"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Flip Words</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <FlipWords
                    words={["Hello", "World", "Design", "System"]}
                    className="text-lg"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Text Generate Effect
                </h3>
                <div className="bg-muted p-4 rounded-lg">
                  <TextGenerateEffect
                    words="Generated text effect"
                    className="text-lg"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Available Components
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium">BlurText</h4>
                    <p className="text-sm text-muted-foreground">
                      Blur animation effect
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium">CircularText</h4>
                    <p className="text-sm text-muted-foreground">
                      Circular text animation
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium">FlipWords</h4>
                    <p className="text-sm text-muted-foreground">
                      Word flipping animation
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium">GradientText</h4>
                    <p className="text-sm text-muted-foreground">
                      Gradient color animation
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium">RollingText</h4>
                    <p className="text-sm text-muted-foreground">
                      Rolling text effect
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium">RotatingText</h4>
                    <p className="text-sm text-muted-foreground">
                      Rotation animation
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium">ShimmeringText</h4>
                    <p className="text-sm text-muted-foreground">
                      Shimmer effect
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium">SplittingText</h4>
                    <p className="text-sm text-muted-foreground">
                      Text splitting animation
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium">TextGenerateEffect</h4>
                    <p className="text-sm text-muted-foreground">
                      Text generation effect
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium">TextHoverEffect</h4>
                    <p className="text-sm text-muted-foreground">
                      Hover interaction effect
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium">TypingText</h4>
                    <p className="text-sm text-muted-foreground">
                      Typing animation
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium">WritingText</h4>
                    <p className="text-sm text-muted-foreground">
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
