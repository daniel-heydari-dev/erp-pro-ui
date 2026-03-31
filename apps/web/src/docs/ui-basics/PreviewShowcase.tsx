import { useState } from "react";
import {
  AnimatedContent,
  Button,
  Carousel,
  Dialog,
  GradualBlur,
} from "erp-pro-ui";

const carouselItems = [
  {
    id: "1",
    image: "https://picsum.photos/1200/600?random=1",
    title: "Crystal Clear Design",
    description:
      "Experience the next level of UI clarity with our glassmorphism effects.",
  },
  {
    id: "2",
    image: "https://picsum.photos/1200/600?random=2",
    title: "Fluid Animations",
    description:
      "Smooth, spring-based transitions that feel natural and responsive.",
  },
  {
    id: "3",
    image: "https://picsum.photos/1200/600?random=3",
    title: "Interactive Components",
    description: "Engage your users with rich, interactive elements.",
  },
];

const featureCards = [
  { title: "Fluid Motion", icon: "🌊", delay: 0 },
  { title: "Glass Depth", icon: "💎", delay: 0.1 },
  { title: "Smart Layouts", icon: "📐", delay: 0.2 },
] as const;

const PreviewShowcase = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen w-full space-y-16 bg-neutral-50 p-8 dark:bg-neutral-950">
      <section className="mx-auto max-w-5xl space-y-8">
        <GradualBlur duration={1} blur={10} direction="bottom">
          <h1 className="mb-4 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-center text-5xl font-bold text-transparent">
            Design System Showcase
          </h1>
          <p className="mx-auto max-w-2xl text-center text-xl text-neutral-600 dark:text-neutral-400">
            Explore our latest components featuring advanced animations and
            crystal glass aesthetics.
          </p>
        </GradualBlur>

        <AnimatedContent preset="scale" delay={0.3} duration={0.8}>
          <Carousel
            items={carouselItems}
            animation="cube"
            height={500}
            autoPlay={5000}
            showArrows
            showDots
            variant="glass"
            className="shadow-2xl"
          />
        </AnimatedContent>
      </section>

      <section className="mx-auto max-w-5xl">
        <GradualBlur triggerOnView threshold={0.2} blur={5}>
          <h2 className="mb-8 text-3xl font-bold text-neutral-900 dark:text-white">
            New Capabilities
          </h2>
        </GradualBlur>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {featureCards.map((item) => (
            <AnimatedContent
              key={item.title}
              preset="slideUp"
              delay={item.delay}
              triggerOnView
              threshold={0.2}
              className="h-full"
            >
              <div className="h-full rounded-2xl border border-neutral-200 bg-white p-8 transition-shadow hover:shadow-lg dark:border-white/10 dark:bg-neutral-900/50">
                <div className="mb-4 text-4xl">{item.icon}</div>
                <h3 className="mb-2 text-xl font-semibold text-neutral-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Built with Framer Motion for buttery smooth 60fps animations
                  that delight users.
                </p>
              </div>
            </AnimatedContent>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl">
        <GradualBlur triggerOnView threshold={0.2} blur={5}>
          <h2 className="mb-8 text-3xl font-bold text-neutral-900 dark:text-white">
            Interactive Elements
          </h2>
        </GradualBlur>

        <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-8 dark:border-white/10 dark:bg-neutral-900/50">
          <div className="relative z-10 grid grid-cols-1 gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <h3 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-white">
                Primary Actions
              </h3>
              <div className="flex flex-wrap items-end gap-4">
                <AnimatedContent preset="scale" delay={0.1} triggerOnView>
                  <Button label="Small" primary size="small" />
                </AnimatedContent>
                <AnimatedContent preset="scale" delay={0.2} triggerOnView>
                  <Button label="Medium" primary size="medium" />
                </AnimatedContent>
                <AnimatedContent preset="scale" delay={0.3} triggerOnView>
                  <Button label="Large" primary size="large" />
                </AnimatedContent>
              </div>
              <p className="mt-2 text-sm text-neutral-500">
                High-emphasis actions with shadow and hover effects.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-white">
                Secondary Actions
              </h3>
              <div className="flex flex-wrap items-end gap-4">
                <AnimatedContent preset="scale" delay={0.4} triggerOnView>
                  <Button label="Small" size="small" />
                </AnimatedContent>
                <AnimatedContent preset="scale" delay={0.5} triggerOnView>
                  <Button label="Medium" size="medium" />
                </AnimatedContent>
                <AnimatedContent preset="scale" delay={0.6} triggerOnView>
                  <Button label="Large" size="large" />
                </AnimatedContent>
              </div>
              <p className="mt-2 text-sm text-neutral-500">
                Alternative actions for lower priority tasks.
              </p>
            </div>
          </div>

          <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-br from-blue-500/5 to-purple-500/5 blur-3xl" />
        </div>
      </section>

      <section className="mx-auto max-w-5xl rounded-3xl bg-linear-to-br from-blue-50 to-purple-50 p-12 text-center dark:from-blue-900/20 dark:to-purple-900/20">
        <AnimatedContent preset="zoom" triggerOnView>
          <h2 className="mb-4 text-3xl font-bold text-neutral-900 dark:text-white">
            Try the Crystal Dialog
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-lg text-neutral-600 dark:text-neutral-300">
            Experience the new frosted glass effect with spring-loaded entrance
            animations.
          </p>
          <Button
            label="Open Crystal Dialog"
            primary
            size="large"
            onClick={() => setOpen(true)}
          />
        </AnimatedContent>
      </section>

      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Crystal Dialog"
        description="This dialog features a beautiful backdrop blur, gradient borders, and elastic spring animation."
        variant="info"
        preset="confirm"
        animation="elastic"
        confirmLabel="Awesome"
        onConfirm={() => setOpen(false)}
      />
    </div>
  );
};

export default PreviewShowcase;
