import { BackgroundGradientAnimation, Button, Input } from "erp-pro-ui";
import DocsButtonBar from "@/docs/components/DocsButtonBar";
import CodeBlock from "@/docs/components/CodeBlock";

const BackgroundGradientAnimationDoc = () => {
  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Background Gradient Animation</h1>
      <p className="docs-paragraph">
        A mesmerizing, interactive background with animated blobs and smooth
        color transitions.
      </p>

      {/* Basic Usage */}
      <h2 className="docs-category-subtitle">Full Page Background</h2>
      <p className="docs-paragraph">
        This component is typically used as a heroic background for landing
        pages.
      </p>
      <div className="docs-showcase-card h-125 overflow-hidden rounded-2xl border-none p-0 relative group">
        <BackgroundGradientAnimation
          containerClassName="w-full h-full absolute inset-0"
          className="z-10 flex flex-col items-center justify-center p-8 text-center"
        >
          <div className="bg-black/20 backdrop-blur-md p-8 rounded-3xl border border-white/10 max-w-lg">
            <h3 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
              Ethereal Backgrounds
            </h3>
            <p className="text-white/80 text-lg mb-6">
              Modern, interactive gradient animations for high-end landing
              pages. Move your mouse to interact with the center light.
            </p>
            <Button className="border-white bg-white px-8 py-3 font-bold text-accent shadow-2xl hover:bg-white/90 hover:opacity-100">
              Get Started
            </Button>
          </div>
        </BackgroundGradientAnimation>

        {/* Overlay to indicate it's a preview */}
        <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-black/50 text-white text-[10px] rounded uppercase tracking-widest font-bold backdrop-blur-sm border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
          Interactive Preview
        </div>
      </div>

      <CodeBlock
        code={`import { BackgroundGradientAnimation, Button } from 'erp-pro-ui';

export function HeroBackgroundExample() {
  return (
    <BackgroundGradientAnimation
      containerClassName="w-full h-full absolute inset-0"
      className="z-10 flex flex-col items-center justify-center p-8 text-center"
    >
      <div className="max-w-lg rounded-3xl border border-white/10 bg-black/20 p-8 backdrop-blur-md">
        <h1 className="text-white text-4xl font-bold">Ethereal Backgrounds</h1>
        <p className="mt-4 text-lg text-white/80">
          Modern, interactive gradient animations for high-end landing pages.
        </p>
        <Button className="mt-6 border-white bg-white px-8 py-3 font-bold text-accent">
          Get Started
        </Button>
      </div>
    </BackgroundGradientAnimation>
  );
}`}
      />

      {/* Custom Colors */}
      <h2 className="docs-category-subtitle">Customizable Colors</h2>
      <p className="docs-paragraph">
        Control all 5 blob colors and the interactive pointer color.
      </p>
      <div className="docs-showcase-card h-100 overflow-hidden rounded-2xl border-none p-0 relative">
        <BackgroundGradientAnimation
          gradientBackgroundStart="rgb(30, 0, 50)"
          gradientBackgroundEnd="rgb(0, 0, 20)"
          firstColor="255, 0, 100"
          secondColor="100, 0, 255"
          thirdColor="0, 200, 255"
          fourthColor="255, 200, 0"
          pointerColor="255, 255, 255"
          containerClassName="w-full h-full absolute inset-0"
          className="z-10 flex items-center justify-center"
        >
          <div className="text-white/50 font-mono text-sm">
            Vibrant Midnight Preset
          </div>
        </BackgroundGradientAnimation>
      </div>

      <CodeBlock
        code={`import { BackgroundGradientAnimation } from 'erp-pro-ui';

export function CustomBackgroundPaletteExample() {
  return (
    <BackgroundGradientAnimation
      gradientBackgroundStart="rgb(30, 0, 50)"
      gradientBackgroundEnd="rgb(0, 0, 20)"
      firstColor="255, 0, 100"
      secondColor="100, 0, 255"
      thirdColor="0, 200, 255"
      fourthColor="255, 200, 0"
      fifthColor="255, 120, 170"
      pointerColor="255, 255, 255"
    />
  );
}`}
      />

      {/* Themes Section */}
      <h2 className="docs-category-subtitle">Themes</h2>
      <p className="docs-paragraph">
        Predefined color palettes for different moods and environments.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Ocean Theme */}
        <div className="flex flex-col gap-3">
          <div className="docs-showcase-card h-62.5 overflow-hidden rounded-xl border-none p-0 relative">
            <BackgroundGradientAnimation
              gradientBackgroundStart="rgb(0, 50, 100)"
              gradientBackgroundEnd="rgb(0, 20, 60)"
              firstColor="0, 150, 200"
              secondColor="0, 200, 180"
              thirdColor="50, 100, 200"
              fourthColor="0, 80, 150"
              fifthColor="100, 200, 220"
              pointerColor="0, 255, 200"
              containerClassName="w-full h-full absolute inset-0"
            />
          </div>
          <p className="text-sm font-medium">Ocean Theme</p>
        </div>

        {/* Sunset Theme */}
        <div className="flex flex-col gap-3">
          <div className="docs-showcase-card h-62.5 overflow-hidden rounded-xl border-none p-0 relative">
            <BackgroundGradientAnimation
              gradientBackgroundStart="rgb(255, 100, 50)"
              gradientBackgroundEnd="rgb(150, 0, 100)"
              firstColor="255, 150, 50"
              secondColor="255, 80, 100"
              thirdColor="255, 200, 100"
              fourthColor="200, 50, 100"
              fifthColor="255, 100, 150"
              pointerColor="255, 200, 100"
              containerClassName="w-full h-full absolute inset-0"
            />
          </div>
          <p className="text-sm font-medium">Sunset Theme</p>
        </div>

        {/* Aurora Theme */}
        <div className="flex flex-col gap-3">
          <div className="docs-showcase-card h-62.5 overflow-hidden rounded-xl border-none p-0 relative">
            <BackgroundGradientAnimation
              gradientBackgroundStart="rgb(0, 30, 50)"
              gradientBackgroundEnd="rgb(0, 10, 30)"
              firstColor="0, 255, 150"
              secondColor="0, 200, 255"
              thirdColor="100, 255, 200"
              fourthColor="0, 150, 200"
              fifthColor="50, 255, 150"
              pointerColor="100, 255, 200"
              containerClassName="w-full h-full absolute inset-0"
            />
          </div>
          <p className="text-sm font-medium">Aurora Theme</p>
        </div>

        {/* Neon Theme */}
        <div className="flex flex-col gap-3">
          <div className="docs-showcase-card h-62.5 overflow-hidden rounded-xl border-none p-0 relative">
            <BackgroundGradientAnimation
              gradientBackgroundStart="rgb(20, 0, 40)"
              gradientBackgroundEnd="rgb(0, 0, 20)"
              firstColor="255, 0, 255"
              secondColor="0, 255, 255"
              thirdColor="255, 255, 0"
              fourthColor="255, 0, 100"
              fifthColor="0, 255, 100"
              pointerColor="255, 100, 255"
              containerClassName="w-full h-full absolute inset-0"
            />
          </div>
          <p className="text-sm font-medium">Neon Theme</p>
        </div>

        {/* Forest Theme */}
        <div className="flex flex-col gap-3">
          <div className="docs-showcase-card h-62.5 overflow-hidden rounded-xl border-none p-0 relative">
            <BackgroundGradientAnimation
              gradientBackgroundStart="rgb(20, 50, 30)"
              gradientBackgroundEnd="rgb(10, 30, 20)"
              firstColor="50, 150, 50"
              secondColor="100, 180, 80"
              thirdColor="80, 120, 50"
              fourthColor="60, 100, 40"
              fifthColor="120, 200, 100"
              pointerColor="150, 220, 100"
              containerClassName="w-full h-full absolute inset-0"
            />
          </div>
          <p className="text-sm font-medium">Forest Theme</p>
        </div>

        {/* Galaxy Theme */}
        <div className="flex flex-col gap-3">
          <div className="docs-showcase-card h-62.5 overflow-hidden rounded-xl border-none p-0 relative">
            <BackgroundGradientAnimation
              gradientBackgroundStart="rgb(30, 0, 60)"
              gradientBackgroundEnd="rgb(0, 0, 30)"
              firstColor="100, 50, 200"
              secondColor="150, 100, 255"
              thirdColor="50, 50, 150"
              fourthColor="200, 100, 255"
              fifthColor="100, 150, 255"
              pointerColor="200, 150, 255"
              containerClassName="w-full h-full absolute inset-0"
            />
          </div>
          <p className="text-sm font-medium">Galaxy Theme</p>
        </div>
      </div>

      <CodeBlock
        code={`import { BackgroundGradientAnimation, Button, Input } from 'erp-pro-ui';

export function LoginBackgroundExample() {
  return (
    <BackgroundGradientAnimation
      gradientBackgroundStart="rgb(30, 40, 100)"
      gradientBackgroundEnd="rgb(10, 15, 50)"
      firstColor="80, 100, 200"
      secondColor="100, 80, 180"
      thirdColor="60, 120, 200"
      containerClassName="w-full h-full absolute inset-0"
      className="z-10 flex items-center justify-center p-4"
    >
      <div className="pointer-events-auto w-full max-w-md rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-white">Welcome Back</h2>
        <div className="space-y-4">
          <Input type="email" placeholder="Email" bgClassName="bg-white/10" className="border-white/20 text-white placeholder:text-white/50" />
          <Input type="password" placeholder="Password" bgClassName="bg-white/10" className="border-white/20 text-white placeholder:text-white/50" />
          <Button className="w-full border-white bg-white py-3 font-semibold text-indigo-900">
            Sign In
          </Button>
        </div>
      </div>
    </BackgroundGradientAnimation>
  );
}`}
      />

      {/* Practical Examples */}
      <h2 className="docs-category-subtitle">Practical Examples</h2>
      <p className="docs-paragraph">
        See how to use the component in real-world scenarios.
      </p>

      {/* Hero Section */}
      <div className="docs-showcase-card h-125 overflow-hidden rounded-2xl border-none p-0 relative mb-6">
        <BackgroundGradientAnimation
          containerClassName="w-full h-full absolute inset-0"
          className="z-10 flex flex-col items-center justify-center p-8 text-center"
        >
          <div className="flex flex-col items-center justify-center text-white text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent drop-shadow-2xl bg-linear-to-b from-white to-white/60">
              Build Something Amazing
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-2xl mb-8">
              Create beautiful, responsive designs with our powerful component
              library.
            </p>
            <div className="flex gap-4">
              <Button className="pointer-events-auto border-white bg-white px-8 py-3 font-semibold text-indigo-900 hover:bg-white/90 hover:opacity-100">
                Get Started
              </Button>
              <Button className="pointer-events-auto border-white/30 bg-white/20 px-8 py-3 font-semibold text-white hover:bg-white/30 hover:opacity-100">
                Learn More
              </Button>
            </div>
          </div>
        </BackgroundGradientAnimation>
      </div>

      {/* Login Page */}
      <div className="docs-showcase-card h-125 overflow-hidden rounded-2xl border-none p-0 relative mb-6">
        <BackgroundGradientAnimation
          gradientBackgroundStart="rgb(30, 40, 100)"
          gradientBackgroundEnd="rgb(10, 15, 50)"
          firstColor="80, 100, 200"
          secondColor="100, 80, 180"
          thirdColor="60, 120, 200"
          containerClassName="w-full h-full absolute inset-0"
          className="z-10 flex items-center justify-center p-4"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md border border-white/20 pointer-events-auto">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Welcome Back
            </h2>
            <div className="space-y-4">
              <Input
                type="email"
                placeholder="Email"
                extra="border-white/20 hover:border-white/40"
                bgClassName="bg-white/10"
                className="border-white/20 text-white placeholder:text-white/50 focus-visible:ring-white/30"
              />
              <Input
                type="password"
                placeholder="Password"
                extra="border-white/20 hover:border-white/40"
                bgClassName="bg-white/10"
                className="border-white/20 text-white placeholder:text-white/50 focus-visible:ring-white/30"
              />
              <Button className="w-full border-white bg-white py-3 font-semibold text-indigo-900 shadow-none hover:bg-white/90 hover:opacity-100">
                Sign In
              </Button>
            </div>
            <p className="text-white/60 text-center mt-4 text-sm">
              Don&apos;t have an account?{" "}
              <span className="text-white cursor-pointer hover:underline">
                Sign up
              </span>
            </p>
          </div>
        </BackgroundGradientAnimation>
      </div>

      {/* Card Showcase */}
      <div className="docs-showcase-card h-125 overflow-hidden rounded-2xl border-none p-0 relative mb-12">
        <BackgroundGradientAnimation
          gradientBackgroundStart="rgb(20, 10, 50)"
          gradientBackgroundEnd="rgb(5, 5, 25)"
          containerClassName="w-full h-full absolute inset-0"
          className="z-10 flex items-center justify-center p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl pointer-events-auto">
            {["Starter", "Pro", "Enterprise"].map((plan, i) => (
              <div
                key={plan}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-colors"
              >
                <h3 className="text-xl font-bold text-white mb-2">{plan}</h3>
                <p className="text-3xl font-bold text-white mb-4">
                  ${(i + 1) * 29}
                  <span className="text-sm text-white/60">/mo</span>
                </p>
                <ul className="space-y-2 text-white/80 text-sm mb-6">
                  <li>✓ Feature one</li>
                  <li>✓ Feature two</li>
                  <li>✓ Feature three</li>
                </ul>
                <Button className="w-full border-white/30 bg-white/20 py-2 font-medium text-white shadow-none hover:bg-white/30 hover:opacity-100">
                  Choose Plan
                </Button>
              </div>
            ))}
          </div>
        </BackgroundGradientAnimation>
      </div>

      {/* Props Reference */}
      <h2 className="docs-category-subtitle">Props</h2>
      <div className="overflow-x-auto">
        <table className="docs-props-table">
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="docs-prop-name">gradientBackgroundStart</td>
              <td>
                <span className="docs-prop-type">string</span>
              </td>
              <td>&apos;rgb(108, 0, 162)&apos;</td>
              <td>Start color for the base gradient</td>
            </tr>
            <tr>
              <td className="docs-prop-name">firstColor - fifthColor</td>
              <td>
                <span className="docs-prop-type">string</span>
              </td>
              <td>-</td>
              <td>
                RGB values for the 5 animated blobs (e.g. &apos;18, 113,
                255&apos;)
              </td>
            </tr>
            <tr>
              <td className="docs-prop-name">pointerColor</td>
              <td>
                <span className="docs-prop-type">string</span>
              </td>
              <td>&apos;140, 100, 255&apos;</td>
              <td>Color of the interactive mouse light (RGB)</td>
            </tr>
            <tr>
              <td className="docs-prop-name">size</td>
              <td>
                <span className="docs-prop-type">string</span>
              </td>
              <td>&apos;80%&apos;</td>
              <td>Base size of the animated blobs</td>
            </tr>
            <tr>
              <td className="docs-prop-name">interactive</td>
              <td>
                <span className="docs-prop-type">boolean</span>
              </td>
              <td>true</td>
              <td>Whether to enable mouse tracking interaction</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{
          label: "Animated Content",
          route: "/ui-basics/animated-content",
        }}
        next={{
          label: "Hover Border Gradient",
          route: "/ui-basics/hover-border-gradient",
        }}
      />
    </section>
  );
};

export default BackgroundGradientAnimationDoc;
