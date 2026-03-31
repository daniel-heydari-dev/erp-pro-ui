import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "../../forms/button";
import { BackgroundGradientAnimation } from "./BackgroundGradientAnimation";

const meta: Meta<typeof BackgroundGradientAnimation> = {
  title: "Visuals/BackgroundGradientAnimation",
  component: BackgroundGradientAnimation,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "BackgroundGradientAnimation creates a layered animated mesh background for landing pages, callouts, and immersive full-bleed surfaces. These stories cover hero usage, custom palettes, theme variations, and practical product layouts.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

function GradientFrame({
  children,
  className = "ui:h-[520px]",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`ui:relative ui:overflow-hidden ui:rounded-[28px] ${className}`}
    >
      {children}
    </div>
  );
}

export const HeroBanner: Story = {
  render: () => (
    <div className="ui:p-6">
      <GradientFrame>
        <BackgroundGradientAnimation
          containerClassName="ui:h-full ui:w-full"
          className="ui:relative ui:z-10 ui:flex ui:h-full ui:items-center ui:justify-center ui:p-8"
          interactive
        >
          <div className="ui:pointer-events-auto ui:max-w-3xl ui:rounded-[32px] ui:border ui:border-white/15 ui:bg-black/25 ui:p-8 ui:text-center ui:backdrop-blur-xl md:ui:p-12">
            <p className="ui:text-xs ui:font-semibold ui:uppercase ui:tracking-[0.24em] ui:text-white/65">
              Ambient Motion Surface
            </p>
            <h2 className="ui:mt-4 ui:text-4xl ui:font-semibold ui:text-white md:ui:text-6xl">
              Build launch moments that feel alive.
            </h2>
            <p className="ui:mx-auto ui:mt-4 ui:max-w-2xl ui:text-base ui:text-white/75 md:ui:text-lg">
              Use the animated mesh as a hero backdrop for marketing pages,
              onboarding flows, and product announcements without sacrificing
              legibility.
            </p>
            <div className="ui:mt-8 ui:flex ui:flex-wrap ui:justify-center ui:gap-3">
              <Button label="Start Building" primary />
              <Button
                label="View Patterns"
                className="ui:bg-white/10 ui:text-white ui:backdrop-blur-sm"
              />
            </div>
          </div>
        </BackgroundGradientAnimation>
      </GradientFrame>
    </div>
  ),
};

export const CustomPalette: Story = {
  render: () => (
    <div className="ui:p-6">
      <GradientFrame className="ui:h-[420px]">
        <BackgroundGradientAnimation
          gradientBackgroundStart="rgb(30, 0, 50)"
          gradientBackgroundEnd="rgb(0, 0, 20)"
          firstColor="255, 0, 100"
          secondColor="100, 0, 255"
          thirdColor="0, 200, 255"
          fourthColor="255, 200, 0"
          fifthColor="255, 120, 170"
          pointerColor="255, 255, 255"
          containerClassName="ui:h-full ui:w-full"
          className="ui:relative ui:z-10 ui:flex ui:h-full ui:items-end ui:p-8"
        >
          <div className="ui:max-w-md ui:rounded-3xl ui:border ui:border-white/15 ui:bg-black/30 ui:p-6 ui:backdrop-blur-lg">
            <p className="ui:text-xs ui:font-semibold ui:uppercase ui:tracking-[0.18em] ui:text-white/65">
              Vibrant Midnight
            </p>
            <p className="ui:mt-3 ui:text-2xl ui:font-semibold ui:text-white">
              Tune each blob independently.
            </p>
            <p className="ui:mt-2 ui:text-sm ui:text-white/75">
              Override the base gradient, all five blob colors, and the pointer
              color to match a campaign or product palette.
            </p>
          </div>
        </BackgroundGradientAnimation>
      </GradientFrame>
    </div>
  ),
};

export const ThemeGallery: Story = {
  render: () => (
    <div className="ui:grid ui:gap-6 ui:p-6 md:ui:grid-cols-2 xl:ui:grid-cols-4">
      {[
        {
          name: "Ocean",
          props: {
            gradientBackgroundStart: "rgb(0, 50, 100)",
            gradientBackgroundEnd: "rgb(0, 20, 60)",
            firstColor: "0, 150, 200",
            secondColor: "0, 200, 180",
            thirdColor: "50, 100, 200",
            fourthColor: "0, 80, 150",
            fifthColor: "100, 200, 220",
            pointerColor: "0, 255, 200",
          },
        },
        {
          name: "Sunset",
          props: {
            gradientBackgroundStart: "rgb(255, 100, 50)",
            gradientBackgroundEnd: "rgb(150, 0, 100)",
            firstColor: "255, 150, 50",
            secondColor: "255, 80, 100",
            thirdColor: "255, 200, 100",
            fourthColor: "200, 50, 100",
            fifthColor: "255, 100, 150",
            pointerColor: "255, 200, 100",
          },
        },
        {
          name: "Aurora",
          props: {
            gradientBackgroundStart: "rgb(0, 30, 50)",
            gradientBackgroundEnd: "rgb(0, 10, 30)",
            firstColor: "0, 255, 150",
            secondColor: "0, 200, 255",
            thirdColor: "100, 255, 200",
            fourthColor: "0, 150, 200",
            fifthColor: "50, 255, 150",
            pointerColor: "100, 255, 200",
          },
        },
        {
          name: "Galaxy",
          props: {
            gradientBackgroundStart: "rgb(30, 0, 60)",
            gradientBackgroundEnd: "rgb(0, 0, 30)",
            firstColor: "100, 50, 200",
            secondColor: "150, 100, 255",
            thirdColor: "50, 50, 150",
            fourthColor: "200, 100, 255",
            fifthColor: "100, 150, 255",
            pointerColor: "200, 150, 255",
          },
        },
      ].map((theme) => (
        <GradientFrame key={theme.name} className="ui:h-[280px]">
          <BackgroundGradientAnimation
            {...theme.props}
            containerClassName="ui:h-full ui:w-full"
            className="ui:relative ui:z-10 ui:flex ui:h-full ui:items-end ui:p-5"
          >
            <div className="ui:rounded-2xl ui:border ui:border-white/15 ui:bg-black/25 ui:px-4 ui:py-3 ui:backdrop-blur-md">
              <p className="ui:text-lg ui:font-semibold ui:text-white">
                {theme.name}
              </p>
              <p className="ui:text-sm ui:text-white/70">
                Preset example for mood-driven surfaces.
              </p>
            </div>
          </BackgroundGradientAnimation>
        </GradientFrame>
      ))}
    </div>
  ),
};

export const ProductShowcase: Story = {
  render: () => (
    <div className="ui:p-6">
      <GradientFrame className="ui:h-[560px]">
        <BackgroundGradientAnimation
          gradientBackgroundStart="rgb(18, 12, 42)"
          gradientBackgroundEnd="rgb(5, 5, 24)"
          containerClassName="ui:h-full ui:w-full"
          className="ui:relative ui:z-10 ui:flex ui:h-full ui:items-center ui:justify-center ui:p-8"
        >
          <div className="ui:grid ui:w-full ui:max-w-5xl ui:gap-4 md:ui:grid-cols-3">
            {[
              {
                plan: "Starter",
                price: "$29",
                features: ["1 workspace", "Email support", "Basic analytics"],
              },
              {
                plan: "Growth",
                price: "$79",
                features: [
                  "5 workspaces",
                  "Priority routing",
                  "Advanced dashboards",
                ],
              },
              {
                plan: "Enterprise",
                price: "$149",
                features: [
                  "Unlimited teams",
                  "Custom roles",
                  "Dedicated success lead",
                ],
              },
            ].map((tier, index) => (
              <div
                key={tier.plan}
                className="ui:flex ui:flex-col ui:rounded-[28px] ui:border ui:border-white/15 ui:bg-white/10 ui:p-6 ui:backdrop-blur-xl"
              >
                <p className="ui:text-sm ui:font-medium ui:text-white/70">
                  {tier.plan}
                </p>
                <p className="ui:mt-3 ui:text-4xl ui:font-semibold ui:text-white">
                  {tier.price}
                  <span className="ui:ml-1 ui:text-sm ui:font-medium ui:text-white/60">
                    /mo
                  </span>
                </p>
                <ul className="ui:mt-5 ui:space-y-2 ui:text-sm ui:text-white/75">
                  {tier.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <div className="ui:mt-6 ui:pt-2">
                  <Button
                    label={index === 1 ? "Start Trial" : "Choose Plan"}
                    primary={index === 1}
                    className={
                      index === 1 ? "" : "ui:bg-white/10 ui:text-white"
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </BackgroundGradientAnimation>
      </GradientFrame>
    </div>
  ),
};
