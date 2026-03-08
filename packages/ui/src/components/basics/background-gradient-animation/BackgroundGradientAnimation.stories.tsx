import type { Meta, StoryObj } from "@storybook/react-vite";

import { BackgroundGradientAnimation, type BackgroundGradientAnimationProps } from "./BackgroundGradientAnimation";
import BackgroundGradientAnimationDemo from "./BackgroundGradientAnimationDemo";

const meta: Meta<typeof BackgroundGradientAnimation> = {
  title: "Components/BackgroundGradientAnimation",
  component: BackgroundGradientAnimation,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `A smooth and elegant background gradient animation that changes the gradient position over time. Perfect for hero sections, landing pages, and call-to-action backgrounds.`,
      },
    },
  },
  tags: [
    "autodocs",
    "card",
    "background",
    "gradient",
    "special",
    "call to action",
  ],
  argTypes: {
    gradientBackgroundStart: {
      control: "color",
      description: "Start color of the background gradient",
    },
    gradientBackgroundEnd: {
      control: "color",
      description: "End color of the background gradient",
    },
    firstColor: {
      control: "text",
      description:
        "RGB values for the first animated blob (e.g., '18, 113, 255')",
    },
    secondColor: {
      control: "text",
      description: "RGB values for the second animated blob",
    },
    thirdColor: {
      control: "text",
      description: "RGB values for the third animated blob",
    },
    fourthColor: {
      control: "text",
      description: "RGB values for the fourth animated blob",
    },
    fifthColor: {
      control: "text",
      description: "RGB values for the fifth animated blob",
    },
    pointerColor: {
      control: "text",
      description: "RGB values for the interactive pointer blob",
    },
    size: {
      control: "text",
      description: "Size of the animated blobs",
    },
    blendingValue: {
      control: "select",
      options: [
        "hard-light",
        "soft-light",
        "overlay",
        "multiply",
        "screen",
        "color-dodge",
      ],
      description: "CSS mix-blend-mode for the gradient blobs",
    },
    interactive: {
      control: "boolean",
      description: "Enable mouse-following interactive blob",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ## Demo Example
 *
 * The default demo showcasing the gradient animation with centered text.
 */
export const Demo: Story = {
  render: () => <BackgroundGradientAnimationDemo />,
};

/**
 * ## Default Background Gradient Animation
 *
 * A mesmerizing animated gradient background with floating color blobs.
 *
 * ### Import
 *
 * ```tsx
 * import { BackgroundGradientAnimation } from 'erp-pro-ui';
 * import 'erp-pro-ui/styles.css';
 * ```
 *
 * ### Usage
 *
 * ```tsx
 * import { BackgroundGradientAnimation } from 'erp-pro-ui';
 *
 * function HeroSection() {
 *   return (
 *     <BackgroundGradientAnimation>
 *       <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center">
 *         <h1>Welcome to Our Platform</h1>
 *       </div>
 *     </BackgroundGradientAnimation>
 *   );
 * }
 * ```
 */
export const Default: Story = {
  args: {},
  render: (args: BackgroundGradientAnimationProps) => (
    <BackgroundGradientAnimation {...args}>
      <div className="ui:absolute ui:z-50 ui:inset-0 ui:flex ui:items-center ui:justify-center ui:text-white ui:font-bold ui:px-4 ui:pointer-events-none ui:text-3xl ui:text-center md:ui:text-4xl lg:ui:text-7xl">
        <p className="ui:bg-clip-text ui:text-transparent ui:drop-shadow-2xl ui:bg-gradient-to-b ui:from-white/80 ui:to-white/20">
          Gradients X Animations
        </p>
      </div>
    </BackgroundGradientAnimation>
  ),
};

/**
 * ## Ocean Theme
 *
 * A calming ocean-inspired gradient with blues and teals.
 */
export const OceanTheme: Story = {
  args: {
    gradientBackgroundStart: "rgb(0, 50, 100)",
    gradientBackgroundEnd: "rgb(0, 20, 60)",
    firstColor: "0, 150, 200",
    secondColor: "0, 200, 180",
    thirdColor: "50, 100, 200",
    fourthColor: "0, 80, 150",
    fifthColor: "100, 200, 220",
    pointerColor: "0, 255, 200",
  },
  render: (args: BackgroundGradientAnimationProps) => (
    <BackgroundGradientAnimation {...args}>
      <div className="ui:absolute ui:z-50 ui:inset-0 ui:flex ui:items-center ui:justify-center ui:text-white ui:font-bold ui:px-4 ui:pointer-events-none ui:text-4xl ui:text-center">
        <p className="ui:bg-clip-text ui:text-transparent ui:drop-shadow-2xl ui:bg-gradient-to-b ui:from-cyan-200 ui:to-blue-400">
          Ocean Waves
        </p>
      </div>
    </BackgroundGradientAnimation>
  ),
};

/**
 * ## Sunset Theme
 *
 * A warm sunset-inspired gradient with oranges and pinks.
 */
export const SunsetTheme: Story = {
  args: {
    gradientBackgroundStart: "rgb(255, 100, 50)",
    gradientBackgroundEnd: "rgb(150, 0, 100)",
    firstColor: "255, 150, 50",
    secondColor: "255, 80, 100",
    thirdColor: "255, 200, 100",
    fourthColor: "200, 50, 100",
    fifthColor: "255, 100, 150",
    pointerColor: "255, 200, 100",
  },
  render: (args: BackgroundGradientAnimationProps) => (
    <BackgroundGradientAnimation {...args}>
      <div className="ui:absolute ui:z-50 ui:inset-0 ui:flex ui:items-center ui:justify-center ui:text-white ui:font-bold ui:px-4 ui:pointer-events-none ui:text-4xl ui:text-center">
        <p className="ui:bg-clip-text ui:text-transparent ui:drop-shadow-2xl ui:bg-gradient-to-b ui:from-yellow-200 ui:to-orange-400">
          Golden Sunset
        </p>
      </div>
    </BackgroundGradientAnimation>
  ),
};

/**
 * ## Aurora Theme
 *
 * A northern lights inspired gradient with greens and teals.
 */
export const AuroraTheme: Story = {
  args: {
    gradientBackgroundStart: "rgb(0, 30, 50)",
    gradientBackgroundEnd: "rgb(0, 10, 30)",
    firstColor: "0, 255, 150",
    secondColor: "0, 200, 255",
    thirdColor: "100, 255, 200",
    fourthColor: "0, 150, 200",
    fifthColor: "50, 255, 150",
    pointerColor: "100, 255, 200",
  },
  render: (args: BackgroundGradientAnimationProps) => (
    <BackgroundGradientAnimation {...args}>
      <div className="ui:absolute ui:z-50 ui:inset-0 ui:flex ui:items-center ui:justify-center ui:text-white ui:font-bold ui:px-4 ui:pointer-events-none ui:text-4xl ui:text-center">
        <p className="ui:bg-clip-text ui:text-transparent ui:drop-shadow-2xl ui:bg-gradient-to-b ui:from-green-200 ui:to-emerald-400">
          Northern Lights
        </p>
      </div>
    </BackgroundGradientAnimation>
  ),
};

/**
 * ## Neon Theme
 *
 * A vibrant cyberpunk-inspired gradient with neon colors.
 */
export const NeonTheme: Story = {
  args: {
    gradientBackgroundStart: "rgb(20, 0, 40)",
    gradientBackgroundEnd: "rgb(0, 0, 20)",
    firstColor: "255, 0, 255",
    secondColor: "0, 255, 255",
    thirdColor: "255, 255, 0",
    fourthColor: "255, 0, 100",
    fifthColor: "0, 255, 100",
    pointerColor: "255, 100, 255",
  },
  render: (args: BackgroundGradientAnimationProps) => (
    <BackgroundGradientAnimation {...args}>
      <div className="ui:absolute ui:z-50 ui:inset-0 ui:flex ui:items-center ui:justify-center ui:text-white ui:font-bold ui:px-4 ui:pointer-events-none ui:text-4xl ui:text-center">
        <p className="ui:bg-clip-text ui:text-transparent ui:drop-shadow-2xl ui:bg-gradient-to-b ui:from-pink-400 ui:to-cyan-400">
          Cyberpunk Neon
        </p>
      </div>
    </BackgroundGradientAnimation>
  ),
};

/**
 * ## Forest Theme
 *
 * An earthy forest-inspired gradient with greens and browns.
 */
export const ForestTheme: Story = {
  args: {
    gradientBackgroundStart: "rgb(20, 50, 30)",
    gradientBackgroundEnd: "rgb(10, 30, 20)",
    firstColor: "50, 150, 50",
    secondColor: "100, 180, 80",
    thirdColor: "80, 120, 50",
    fourthColor: "60, 100, 40",
    fifthColor: "120, 200, 100",
    pointerColor: "150, 220, 100",
  },
  render: (args: BackgroundGradientAnimationProps) => (
    <BackgroundGradientAnimation {...args}>
      <div className="ui:absolute ui:z-50 ui:inset-0 ui:flex ui:items-center ui:justify-center ui:text-white ui:font-bold ui:px-4 ui:pointer-events-none ui:text-4xl ui:text-center">
        <p className="ui:bg-clip-text ui:text-transparent ui:drop-shadow-2xl ui:bg-gradient-to-b ui:from-lime-200 ui:to-green-500">
          Enchanted Forest
        </p>
      </div>
    </BackgroundGradientAnimation>
  ),
};

/**
 * ## Galaxy Theme
 *
 * A deep space inspired gradient with purples and blues.
 */
export const GalaxyTheme: Story = {
  args: {
    gradientBackgroundStart: "rgb(30, 0, 60)",
    gradientBackgroundEnd: "rgb(0, 0, 30)",
    firstColor: "100, 50, 200",
    secondColor: "150, 100, 255",
    thirdColor: "50, 50, 150",
    fourthColor: "200, 100, 255",
    fifthColor: "100, 150, 255",
    pointerColor: "200, 150, 255",
  },
  render: (args: BackgroundGradientAnimationProps) => (
    <BackgroundGradientAnimation {...args}>
      <div className="ui:absolute ui:z-50 ui:inset-0 ui:flex ui:items-center ui:justify-center ui:text-white ui:font-bold ui:px-4 ui:pointer-events-none ui:text-4xl ui:text-center">
        <p className="ui:bg-clip-text ui:text-transparent ui:drop-shadow-2xl ui:bg-gradient-to-b ui:from-purple-200 ui:to-indigo-500">
          Cosmic Galaxy
        </p>
      </div>
    </BackgroundGradientAnimation>
  ),
};

/**
 * ## Non-Interactive
 *
 * Gradient animation without the mouse-following interactive blob.
 */
export const NonInteractive: Story = {
  args: {
    interactive: false,
  },
  render: (args: BackgroundGradientAnimationProps) => (
    <BackgroundGradientAnimation {...args}>
      <div className="ui:absolute ui:z-50 ui:inset-0 ui:flex ui:items-center ui:justify-center ui:text-white ui:font-bold ui:px-4 ui:pointer-events-none ui:text-4xl ui:text-center">
        <p className="ui:bg-clip-text ui:text-transparent ui:drop-shadow-2xl ui:bg-gradient-to-b ui:from-white/80 ui:to-white/20">
          Non-Interactive Mode
        </p>
      </div>
    </BackgroundGradientAnimation>
  ),
};

/**
 * ## Small Blobs
 *
 * Gradient animation with smaller blob sizes.
 */
export const SmallBlobs: Story = {
  args: {
    size: "40%",
  },
  render: (args: BackgroundGradientAnimationProps) => (
    <BackgroundGradientAnimation {...args}>
      <div className="ui:absolute ui:z-50 ui:inset-0 ui:flex ui:items-center ui:justify-center ui:text-white ui:font-bold ui:px-4 ui:pointer-events-none ui:text-4xl ui:text-center">
        <p className="ui:bg-clip-text ui:text-transparent ui:drop-shadow-2xl ui:bg-gradient-to-b ui:from-white/80 ui:to-white/20">
          Smaller Blobs
        </p>
      </div>
    </BackgroundGradientAnimation>
  ),
};

/**
 * ## Large Blobs
 *
 * Gradient animation with larger blob sizes for a more immersive effect.
 */
export const LargeBlobs: Story = {
  args: {
    size: "120%",
  },
  render: (args: BackgroundGradientAnimationProps) => (
    <BackgroundGradientAnimation {...args}>
      <div className="ui:absolute ui:z-50 ui:inset-0 ui:flex ui:items-center ui:justify-center ui:text-white ui:font-bold ui:px-4 ui:pointer-events-none ui:text-4xl ui:text-center">
        <p className="ui:bg-clip-text ui:text-transparent ui:drop-shadow-2xl ui:bg-gradient-to-b ui:from-white/80 ui:to-white/20">
          Larger Blobs
        </p>
      </div>
    </BackgroundGradientAnimation>
  ),
};

/**
 * ## Soft Light Blend
 *
 * Using soft-light blending mode for a gentler effect.
 */
export const SoftLightBlend: Story = {
  args: {
    blendingValue: "soft-light",
  },
  render: (args: BackgroundGradientAnimationProps) => (
    <BackgroundGradientAnimation {...args}>
      <div className="ui:absolute ui:z-50 ui:inset-0 ui:flex ui:items-center ui:justify-center ui:text-white ui:font-bold ui:px-4 ui:pointer-events-none ui:text-4xl ui:text-center">
        <p className="ui:bg-clip-text ui:text-transparent ui:drop-shadow-2xl ui:bg-gradient-to-b ui:from-white/80 ui:to-white/20">
          Soft Light Mode
        </p>
      </div>
    </BackgroundGradientAnimation>
  ),
};

/**
 * ## Overlay Blend
 *
 * Using overlay blending mode for enhanced contrast.
 */
export const OverlayBlend: Story = {
  args: {
    blendingValue: "overlay",
  },
  render: (args: BackgroundGradientAnimationProps) => (
    <BackgroundGradientAnimation {...args}>
      <div className="ui:absolute ui:z-50 ui:inset-0 ui:flex ui:items-center ui:justify-center ui:text-white ui:font-bold ui:px-4 ui:pointer-events-none ui:text-4xl ui:text-center">
        <p className="ui:bg-clip-text ui:text-transparent ui:drop-shadow-2xl ui:bg-gradient-to-b ui:from-white/80 ui:to-white/20">
          Overlay Mode
        </p>
      </div>
    </BackgroundGradientAnimation>
  ),
};

/**
 * ## Hero Section Example
 *
 * A practical example showing how to use the gradient as a hero background.
 */
export const HeroSection: Story = {
  args: {},
  render: (args: BackgroundGradientAnimationProps) => (
    <BackgroundGradientAnimation {...args}>
      <div className="ui:absolute ui:z-50 ui:inset-0 ui:flex ui:flex-col ui:items-center ui:justify-center ui:text-white ui:px-4 ui:pointer-events-none ui:text-center">
        <h1 className="ui:text-5xl md:ui:text-7xl ui:font-bold ui:mb-4 ui:bg-clip-text ui:text-transparent ui:drop-shadow-2xl ui:bg-gradient-to-b ui:from-white ui:to-white/60">
          Build Something Amazing
        </h1>
        <p className="ui:text-xl md:ui:text-2xl ui:text-white/80 ui:max-w-2xl ui:mb-8">
          Create beautiful, responsive designs with our powerful component
          library.
        </p>
        <div className="ui:flex ui:gap-4 ui:pointer-events-auto">
          <button className="ui:px-8 ui:py-3 ui:bg-white ui:text-purple-900 ui:font-semibold ui:rounded-full ui:hover:bg-white/90 ui:transition-colors">
            Get Started
          </button>
          <button className="ui:px-8 ui:py-3 ui:bg-white/20 ui:text-white ui:font-semibold ui:rounded-full ui:border ui:border-white/30 ui:hover:bg-white/30 ui:transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </BackgroundGradientAnimation>
  ),
};

/**
 * ## Login Page Example
 *
 * Using the gradient as a background for a login form.
 */
export const LoginPage: Story = {
  args: {
    gradientBackgroundStart: "rgb(30, 40, 100)",
    gradientBackgroundEnd: "rgb(10, 15, 50)",
    firstColor: "80, 100, 200",
    secondColor: "100, 80, 180",
    thirdColor: "60, 120, 200",
  },
  render: (args: BackgroundGradientAnimationProps) => (
    <BackgroundGradientAnimation {...args}>
      <div className="ui:absolute ui:z-50 ui:inset-0 ui:flex ui:items-center ui:justify-center ui:p-4">
        <div className="ui:bg-white/10 ui:backdrop-blur-lg ui:rounded-2xl ui:p-8 ui:w-full ui:max-w-md ui:border ui:border-white/20">
          <h2 className="ui:text-2xl ui:font-bold ui:text-white ui:mb-6 ui:text-center">
            Welcome Back
          </h2>
          <div className="ui:space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="ui:w-full ui:px-4 ui:py-3 ui:bg-white/10 ui:border ui:border-white/20 ui:rounded-lg ui:text-white ui:placeholder-white/50 ui:focus:outline-none ui:focus:ring-2 ui:focus:ring-white/30"
            />
            <input
              type="password"
              placeholder="Password"
              className="ui:w-full ui:px-4 ui:py-3 ui:bg-white/10 ui:border ui:border-white/20 ui:rounded-lg ui:text-white ui:placeholder-white/50 ui:focus:outline-none ui:focus:ring-2 ui:focus:ring-white/30"
            />
            <button className="ui:w-full ui:py-3 ui:bg-white ui:text-indigo-900 ui:font-semibold ui:rounded-lg ui:hover:bg-white/90 ui:transition-colors">
              Sign In
            </button>
          </div>
          <p className="ui:text-white/60 ui:text-center ui:mt-4 ui:text-sm">
            Don&apos;t have an account?{" "}
            <span className="ui:text-white ui:cursor-pointer ui:hover:underline">
              Sign up
            </span>
          </p>
        </div>
      </div>
    </BackgroundGradientAnimation>
  ),
};

/**
 * ## Card Showcase
 *
 * Using the gradient as a backdrop for floating cards.
 */
export const CardShowcase: Story = {
  args: {
    gradientBackgroundStart: "rgb(20, 10, 50)",
    gradientBackgroundEnd: "rgb(5, 5, 25)",
  },
  render: (args: BackgroundGradientAnimationProps) => (
    <BackgroundGradientAnimation {...args}>
      <div className="ui:absolute ui:z-50 ui:inset-0 ui:flex ui:items-center ui:justify-center ui:p-8">
        <div className="ui:grid ui:grid-cols-1 md:ui:grid-cols-3 ui:gap-6 ui:max-w-5xl">
          {["Starter", "Pro", "Enterprise"].map((plan, i) => (
            <div
              key={plan}
              className="ui:bg-white/10 ui:backdrop-blur-lg ui:rounded-2xl ui:p-6 ui:border ui:border-white/20 ui:hover:bg-white/15 ui:transition-colors"
            >
              <h3 className="ui:text-xl ui:font-bold ui:text-white ui:mb-2">
                {plan}
              </h3>
              <p className="ui:text-3xl ui:font-bold ui:text-white ui:mb-4">
                ${(i + 1) * 29}
                <span className="ui:text-sm ui:text-white/60">/mo</span>
              </p>
              <ul className="ui:space-y-2 ui:text-white/80 ui:text-sm ui:mb-6">
                <li>✓ Feature one</li>
                <li>✓ Feature two</li>
                <li>✓ Feature three</li>
                {i > 0 && <li>✓ Premium feature</li>}
                {i > 1 && <li>✓ Enterprise feature</li>}
              </ul>
              <button className="ui:w-full ui:py-2 ui:bg-white/20 ui:text-white ui:font-medium ui:rounded-lg ui:hover:bg-white/30 ui:transition-colors">
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </BackgroundGradientAnimation>
  ),
};
