import { useState } from "react";
import { Carousel } from "../carousel";
import { AnimatedContent } from "../animated-content";
import { GradualBlur } from "../gradual-blur/GradualBlur";
import { Button } from "../Button";
import { Dialog } from "../dialog/Dialog";

export const Preview = () => {
  const [open, setOpen] = useState(false);

  const carouselItems = [
    {
      id: "1",
      image: "https://picsum.photos/1200/600?random=1",
      title: "Crystal Clear Design",
      description: "Experience the next level of UI clarity with our glassmorphism effects.",
    },
    {
      id: "2",
      image: "https://picsum.photos/1200/600?random=2",
      title: "Fluid Animations",
      description: "Smooth, spring-based transitions that feel natural and responsive.",
    },
    {
      id: "3",
      image: "https://picsum.photos/1200/600?random=3",
      title: "Interactive Components",
      description: "Engage your users with rich, interactive elements.",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-neutral-50 dark:bg-neutral-950 p-8 space-y-16">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto space-y-8">
        <GradualBlur duration={1} blur={10} direction="bottom">
          <h1 className="text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            Design System Showcase
          </h1>
          <p className="text-xl text-center text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Explore our latest components featuring advanced animations and crystal glass aesthetics.
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

      {/* Features Grid */}
      <section className="max-w-5xl mx-auto">
        <GradualBlur triggerOnView threshold={0.2} blur={5}>
          <h2 className="text-3xl font-bold mb-8 text-neutral-900 dark:text-white">
            New Capabilities
          </h2>
        </GradualBlur>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Fluid Motion", icon: "🌊", delay: 0 },
            { title: "Glass Depth", icon: "💎", delay: 0.1 },
            { title: "Smart Layouts", icon: "📐", delay: 0.2 },
          ].map((item, i) => (
            <AnimatedContent
              key={i}
              preset="slideUp"
              delay={item.delay}
              triggerOnView
              threshold={0.2}
              className="h-full"
            >
              <div className="bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-white/10 p-8 rounded-2xl h-full hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-white">{item.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Built with Framer Motion for buttery smooth 60fps animations that delight users.
                </p>
              </div>
            </AnimatedContent>
          ))}
        </div>
      </section>

      {/* Button Showcase */}
      <section className="max-w-5xl mx-auto">
        <GradualBlur triggerOnView threshold={0.2} blur={5}>
          <h2 className="text-3xl font-bold mb-8 text-neutral-900 dark:text-white">
            Interactive Elements
          </h2>
        </GradualBlur>

        <div className="bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-white/10 rounded-2xl p-8 overflow-hidden relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
            {/* Primary Buttons */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Primary Actions</h3>
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
              <p className="text-sm text-neutral-500 mt-2">
                High-emphasis actions with shadow and hover effects.
              </p>
            </div>

            {/* Secondary Buttons */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Secondary Actions</h3>
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
              <p className="text-sm text-neutral-500 mt-2">
                Alternative actions for lower priority tasks.
              </p>
            </div>
          </div>

          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        </div>
      </section>

      {/* Interactive Demo */}
      <section className="max-w-5xl mx-auto bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl p-12 text-center">
        <AnimatedContent preset="zoom" triggerOnView>
          <h2 className="text-3xl font-bold mb-4 text-neutral-900 dark:text-white">
            Try the Crystal Dialog
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-8 max-w-xl mx-auto">
            Experience the new frosted glass effect with spring-loaded entrance animations.
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
