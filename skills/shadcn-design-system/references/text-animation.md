# Text Animation Components Reference
## @sth87/shadcn-design-system

All text animation components are named exports from the package root:

```tsx
import {
  BlurText,
  RotatingText,
  CircularText,
  FlipWords,
  GradientText,
  RollingText,
  ShimmeringText,
  SplittingText,
  TextGenerateEffect,
  TextHoverEffect,
  TextPressure,
  TypingText,
  WritingText,
} from "@sth87/shadcn-design-system";
```

These components use `motion/react` (Framer Motion v11+) internally.

---

## BlurText

Animates text in from a blurred state, word by word.

```tsx
<BlurText
  text="Hello, world!"
  className="text-4xl font-bold"
  delay={80}          // ms between each word, default 80
  duration={0.6}      // animation duration per word in seconds
  once={true}         // only animate on first intersection
/>

// Large hero heading
<BlurText
  text="Build beautiful interfaces faster."
  className="text-6xl font-black tracking-tight"
  delay={60}
/>
```

---

## RotatingText

Cycles through a list of words with a rotation animation.

```tsx
<RotatingText
  words={["Beautiful", "Modern", "Fast", "Accessible"]}
  className="text-2xl text-primary font-semibold"
  interval={2000}          // ms between word changes
  transitionDuration={0.4} // animation duration in seconds
/>

// In a heading with static text
<h1 className="text-4xl font-bold">
  We build <RotatingText words={["products", "experiences", "interfaces"]} className="text-primary" />
</h1>
```

---

## CircularText

Arranges characters radially around a circle path.

```tsx
<CircularText
  text="Design System • Component Library • "  // text repeats around circle
  radius={80}              // circle radius in px
  className="text-sm text-muted-foreground"
  spin={true}              // rotate the circle continuously
  spinDuration={8}         // seconds per full rotation
/>

// Static badge ring
<div className="relative w-32 h-32 flex items-center justify-center">
  <CircularText text="@sth87/shadcn • " radius={56} className="text-xs" spin />
  <span className="text-2xl">🎨</span>
</div>
```

---

## FlipWords

Flips through a word list with vertical flip animation.

```tsx
<FlipWords
  words={["innovative", "accessible", "beautiful", "performant"]}
  className="text-3xl font-semibold text-primary"
  duration={1200}     // ms per word
/>

// Sentence with flipping word
<p className="text-2xl">
  Build <FlipWords words={["faster", "smarter", "better"]} className="font-bold" /> with our design system.
</p>
```

---

## GradientText

Animated gradient fill that sweeps across the text.

```tsx
<GradientText
  text="Gradient Heading"
  className="text-5xl font-bold"
  from="#f37320"     // gradient start color
  to="#213f99"       // gradient end color
  animate={true}     // loop the gradient sweep
  duration={3}       // seconds per sweep cycle
/>

// Static gradient (no animation)
<GradientText
  text="Premium UI"
  className="text-4xl font-black"
  from="var(--primary)"
  to="var(--secondary)"
  animate={false}
/>
```

---

## RollingText

Rolling ticker / slot-machine style character-by-character animation. Great for numbers and counters.

```tsx
// Counter animation
<RollingText
  text="$1,234,567"
  className="text-3xl font-mono font-bold tabular-nums"
/>

// Score display
<RollingText text={score.toString().padStart(6, "0")} className="text-5xl font-black font-mono" />

// Animated stat
function Stat({ value, label }) {
  return (
    <div className="text-center">
      <RollingText text={value} className="text-4xl font-bold" />
      <p className="text-muted-foreground">{label}</p>
    </div>
  );
}
```

---

## ShimmeringText

A light sheen sweeps across the text on hover or continuously in loop mode.

```tsx
// Loop sheen
<ShimmeringText
  text="Premium Feature"
  className="text-xl font-semibold"
  loop={true}
  duration={2.5}       // seconds per sheen sweep
/>

// Hover-triggered
<ShimmeringText
  text="Hover me to shine"
  className="text-2xl font-bold cursor-pointer"
  loop={false}         // only shimmers on hover
/>
```

---

## SplittingText

Splits text into individual characters and animates them with stagger.

```tsx
<SplittingText
  text="Hello World"
  className="text-4xl font-bold"
  stagger={0.03}           // seconds between each character
  animation="slide-up"     // "slide-up" | "fade" | "zoom" | "bounce"
/>

// Reveal on scroll
<SplittingText
  text="Scroll to reveal"
  className="text-3xl"
  stagger={0.02}
  animation="fade"
  once={true}
/>
```

---

## TextGenerateEffect

Typewriter-style word-by-word reveal. Text appears to be generated in real-time.

```tsx
<TextGenerateEffect
  words="Build fast. Ship confidently. Delight your users."
  className="text-2xl font-medium"
/>

// Slower reveal
<TextGenerateEffect
  words="Welcome to our platform. Let's get started."
  className="text-xl text-muted-foreground"
  duration={0.8}      // seconds per word
  filter={true}       // add blur filter on reveal (default true)
/>

// In hero section
<div className="text-center space-y-4">
  <h1 className="text-6xl font-black">Design System</h1>
  <TextGenerateEffect
    words="A collection of reusable components built with Radix UI and Tailwind CSS."
    className="text-xl text-muted-foreground max-w-2xl mx-auto"
  />
</div>
```

---

## TextHoverEffect

SVG-based gradient trail and glow that follows the cursor as it moves over the text.

```tsx
<TextHoverEffect
  text="HOVER ME"
  className="text-6xl font-black"
  duration={0.5}      // trail follow speed in seconds
/>

// Large display text
<TextHoverEffect
  text="DESIGN SYSTEM"
  className="text-8xl font-black tracking-widest"
/>

// Used as section heading
<div className="flex items-center justify-center h-32">
  <TextHoverEffect text="COMPONENTS" className="text-5xl font-black" />
</div>
```

---

## TextPressure

Variable font weight animation that responds to mouse proximity — characters "feel the pressure" of the cursor.

```tsx
<TextPressure
  text="PRESSURE"
  className="text-5xl font-black"
  minFontWeight={100}   // minimum variable font weight
  maxFontWeight={900}   // maximum variable font weight
  radius={120}          // influence radius in px
/>

// Requires a variable font loaded (Inter, Geist, etc.)
<TextPressure
  text="FEEL ME"
  className="text-6xl"
  style={{ fontFamily: "'Inter var', sans-serif" }}
/>
```

---

## TypingText

Classic typing cursor animation with configurable multi-string cycling.

```tsx
<TypingText
  strings={["Developer", "Designer", "Creator"]}
  className="text-xl font-medium"
  typeSpeed={80}        // ms per character typed
  deleteSpeed={40}      // ms per character deleted
  delaySpeed={1500}     // ms pause between strings
  loop={true}
/>

// Single string with cursor only
<TypingText
  strings={["Welcome to our platform."]}
  className="text-2xl"
  typeSpeed={60}
  loop={false}
  showCursor={true}
  cursorChar="|"
/>

// In a hero section
<h1 className="text-5xl font-bold">
  I am a{" "}
  <span className="text-primary">
    <TypingText strings={["developer", "designer", "maker"]} loop />
  </span>
</h1>
```

---

## WritingText

SVG path drawing animation — text appears to be hand-written or drawn in real time.

```tsx
<WritingText
  text="Hello"
  className="text-6xl"
  duration={2}          // seconds to draw full text
  color="currentColor"
/>

// Signature-style
<WritingText
  text="Signature"
  className="text-4xl font-bold italic"
  duration={1.5}
  strokeWidth={2}
/>

// On scroll
<WritingText
  text="Draw me"
  className="text-5xl font-black"
  duration={1}
  once={true}           // only draw once when entering viewport
/>
```
