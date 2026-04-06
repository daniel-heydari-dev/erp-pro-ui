import { useState } from "react";
import {
  Button,
  Input,
  Select,
  Typography,
  TypographyAlign,
  TypographyWeight,
  TypographyTracking,
  TypographyGradient,
} from "erp-pro-ui";
import CodeBlock from "@/docs/components/CodeBlock";
import DocsButtonBar from "@/docs/components/DocsButtonBar";

const TypographyDoc = () => {
  const [sampleText, setSampleText] = useState("Build for precision.");
  const [activeAlign, setActiveAlign] = useState<TypographyAlign>("center");
  const [activeWeight, setActiveWeight] = useState<TypographyWeight>("black");
  const [activeTracking, setActiveTracking] =
    useState<TypographyTracking>("tighter");
  const [activeGradient, setActiveGradient] =
    useState<TypographyGradient>("galaxy");

  const weightOptions = [
    { label: "Thin", value: "thin" },
    { label: "Light", value: "light" },
    { label: "Normal", value: "normal" },
    { label: "Medium", value: "medium" },
    { label: "Semibold", value: "semibold" },
    { label: "Bold", value: "bold" },
    { label: "Black", value: "black" },
  ];
  const trackingOptions = [
    { label: "Tighter", value: "tighter" },
    { label: "Tight", value: "tight" },
    { label: "Normal", value: "normal" },
    { label: "Wide", value: "wide" },
  ];
  const gradientOptions = [
    { label: "Galaxy", value: "galaxy" },
    { label: "Ocean", value: "ocean" },
    { label: "Sunset", value: "sunset" },
    { label: "Neon", value: "neon" },
    { label: "Primary", value: "primary" },
  ];

  const fontSizes = [
    { label: "text-9xl", size: "128px", rem: "8rem", tracking: "-0.05em" },
    { label: "text-8xl", size: "96px", rem: "6rem", tracking: "-0.04em" },
    { label: "text-7xl", size: "72px", rem: "4.5rem", tracking: "-0.03em" },
    { label: "text-6xl", size: "60px", rem: "3.75rem", tracking: "-0.02em" },
    { label: "text-5xl", size: "48px", rem: "3rem", tracking: "-0.02em" },
    { label: "text-4xl", size: "36px", rem: "2.25rem", tracking: "-0.01em" },
    { label: "text-3xl", size: "30px", rem: "1.875rem", tracking: "0" },
    { label: "text-2xl", size: "24px", rem: "1.5rem", tracking: "0" },
    { label: "text-xl", size: "20px", rem: "1.25rem", tracking: "0" },
    { label: "text-lg", size: "18px", rem: "1.125rem", tracking: "0" },
    { label: "text-base", size: "16px", rem: "1rem", tracking: "0" },
    { label: "text-sm", size: "14px", rem: "0.875rem", tracking: "0" },
    { label: "text-xs", size: "12px", rem: "0.75rem", tracking: "0" },
  ];

  return (
    <section className="docs-section">
      <div className="flex flex-col gap-2 mb-12">
        <Typography variant="overline" gradient="ocean">
          Typographic System
        </Typography>
        <Typography variant="h1" className="normal-case! not-italic!">
          Precision & Clarity
        </Typography>
        <Typography variant="body1" className="max-w-2xl text-neutral-400">
          Our typography system is anchored by **Geist**, a high-performance
          variable font. It&apos;s engineered for visual precision, legibility,
          and a sophisticated aesthetic across all digital interfaces.
        </Typography>
      </div>

      {/* Section 1: Specimen Hero */}
      <div className="docs-showcase-card p-0 overflow-hidden mb-16 border-none bg-neutral-950">
        <div className="relative h-120 flex items-center justify-center bg-[radial-gradient(circle_at_center,var(--tw-gradient-from)_0%,transparent_70%)] from-purple-500/10">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(#ffffff 0.5px, transparent 0.5px)",
              backgroundSize: "24px 24px",
            }}
          />
          <Typography
            variant="h1"
            align={activeAlign}
            weight={activeWeight}
            tracking={activeTracking}
            gradient={activeGradient}
            className="text-7xl md:text-9xl transition-all duration-500 ease-out z-10 px-4 normal-case! not-italic!"
          >
            {sampleText}
          </Typography>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col gap-4 w-full max-w-2xl px-4 z-20">
            <div className="flex items-center gap-4 px-6 py-3 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl">
              <Input
                value={sampleText}
                onChange={(e) => setSampleText(e.target.value)}
                placeholder="Type something..."
                extra="border-transparent hover:border-white/20"
                bgClassName="bg-transparent"
                className="flex-1 border-none bg-transparent px-0 py-0 text-sm font-medium text-white placeholder:text-white/30 shadow-none focus-visible:ring-0"
              />
              <div className="h-4 w-px bg-white/10" />
              <Select
                value={activeWeight}
                onChange={(e) =>
                  setActiveWeight(e.target.value as TypographyWeight)
                }
                options={weightOptions}
                className="min-w-32"
                bgClassName="bg-transparent"
              />
            </div>

            <div className="flex items-center justify-between gap-6 px-6 py-2 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl">
              <div className="flex items-center gap-3">
                <span className="text-[9px] uppercase tracking-tighter text-white/40 font-black">
                  Align
                </span>
                <div className="flex gap-1">
                  {(["left", "center", "right"] as const).map((a) => (
                    <Button
                      key={a}
                      onClick={() => setActiveAlign(a)}
                      className={`h-6 w-6 rounded px-0 py-0 text-[10px] shadow-none hover:opacity-100 ${
                        activeAlign === a
                          ? "border-white bg-white text-black hover:bg-white"
                          : "border-transparent bg-transparent text-white/50 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {a[0].toUpperCase()}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="h-3 w-px bg-white/10" />
              <div className="flex items-center gap-3">
                <span className="text-[9px] uppercase tracking-tighter text-white/40 font-black">
                  Tracking
                </span>
                <Select
                  value={activeTracking}
                  onChange={(e) =>
                    setActiveTracking(e.target.value as TypographyTracking)
                  }
                  options={trackingOptions}
                  className="min-w-30"
                  bgClassName="bg-transparent"
                />
              </div>
              <div className="h-3 w-px bg-white/10" />
              <div className="flex items-center gap-3">
                <span className="text-[9px] uppercase tracking-tighter text-white/40 font-black">
                  Gradient
                </span>
                <Select
                  value={activeGradient.toString()}
                  onChange={(e) =>
                    setActiveGradient(e.target.value as TypographyGradient)
                  }
                  options={gradientOptions}
                  className="min-w-32"
                  bgClassName="bg-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Typeface Portraits */}
      <h2 className="docs-category-subtitle">The Typefaces</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* Geist Specimen */}
        <div className="docs-showcase-card flex flex-col p-8 gap-8">
          <div className="flex items-baseline justify-between">
            <Typography variant="h3" className="font-geist">
              Geist Sans
            </Typography>
            <Typography variant="caption" className="text-blue-500">
              Primary / UI
            </Typography>
          </div>
          <div className="flex flex-col gap-4">
            <div className="text-6xl md:text-8xl font-black font-geist tracking-tighter leading-none opacity-20">
              Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv
              Ww Xx Yy Zz 0 1 2 3 4 5 6 7 8 9
            </div>
            <Typography variant="body2" className="max-w-md">
              A modern, geometric sans-serif optimized for high-density screens.
              Geist provides exceptional clarity at small sizes while
              maintaining a premium, &quot;invisible&quot; quality at the core
              of our UI.
            </Typography>
          </div>
          <div className="grid grid-cols-5 gap-2 mt-4">
            {["thin", "light", "normal", "medium", "black"].map((w) => (
              <div key={w} className="flex flex-col items-center gap-1">
                <span
                  className={`text-4xl font-geist ${w === "black" ? "font-black" : w === "medium" ? "font-medium" : w === "normal" ? "font-normal" : w === "light" ? "font-light" : "font-thin"}`}
                >
                  G
                </span>
                <span className="text-[8px] uppercase tracking-widest text-neutral-500 font-bold">
                  {w}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Display Specimen */}
        <div className="docs-showcase-card flex flex-col p-8 gap-8">
          <div className="flex items-baseline justify-between">
            <Typography variant="h3" style={{ fontFamily: "Bebas Neue" }}>
              Bebas Neue
            </Typography>
            <Typography variant="caption" className="text-purple-500">
              Secondary / Display
            </Typography>
          </div>
          <div className="flex flex-col gap-4">
            <div
              className="text-6xl md:text-8xl font-geist tracking-tighter leading-none opacity-20"
              style={{ fontFamily: "Bebas Neue" }}
            >
              AA BB CC DD EE FF GG HH II JJ KK LL MM NN OO PP QQ RR SS TT UU VV
              WW XX YY ZZ 0 1 2 3 4 5 6 7 8 9
            </div>
            <Typography variant="body2" className="max-w-md">
              A bold, impactful display typeface with a tight vertical feel.
              Best used in all-caps for large headlines, hero messaging, and
              brand-defining moments where impact is paramount.
            </Typography>
          </div>
          <div className="flex items-center justify-center p-8 bg-neutral-100 dark:bg-neutral-900 rounded-xl">
            <Typography
              variant="h1"
              style={{ fontFamily: "Bebas Neue" }}
              gradient="sunset"
              className="text-6xl md:text-7xl mb-0! tracking-widest"
            >
              IMPACTFUL
            </Typography>
          </div>
        </div>
      </div>

      {/* Section 3: The Type Scale */}
      <h2 className="docs-category-subtitle">Typographic Scale</h2>
      <p className="docs-paragraph">
        Our scale is based on a 4px grid for vertical rhythm and visual harmony.
      </p>
      <div className="docs-showcase-card p-0 overflow-hidden mb-16">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50 dark:bg-neutral-900/50 border-b border-neutral-200 dark:border-neutral-800">
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-neutral-400">
                  Class
                </th>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-neutral-400">
                  Px / Rem
                </th>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-neutral-400">
                  Tracking / Leading
                </th>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-neutral-400">
                  Sample
                </th>
              </tr>
            </thead>
            <tbody>
              {fontSizes.map((s) => (
                <tr
                  key={s.label}
                  className="border-b border-neutral-100 dark:border-neutral-900 last:border-none hover:bg-neutral-50 dark:hover:bg-neutral-950/50 transition-colors group"
                >
                  <td className="px-8 py-6 font-mono text-xs text-blue-500 group-hover:font-bold transition-all">
                    {s.label}
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <span className="text-sm font-bold">{s.size}</span>
                    <span className="text-[10px] text-neutral-500 ml-2">
                      {s.rem}
                    </span>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <span className="text-xs font-medium text-neutral-500">
                      {s.tracking} / Default
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className={s.label}>Visual Specimen</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 4: Visual Hierarchy */}
      <h2 className="docs-category-subtitle">Typographic Hierarchy</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="docs-showcase-card flex flex-col p-8 gap-6 justify-center">
          <Typography variant="overline" className="text-indigo-500">
            Case Study
          </Typography>
          <Typography variant="h2" className="normal-case! not-italic!">
            Modern Banking for Modern Teams
          </Typography>
          <Typography variant="body1">
            Building a financial platform requires trust, speed, and a obsessive
            attention to detail. Our system ensures every transaction record is
            perfectly legible.
          </Typography>
          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 rounded-full bg-indigo-500" />
            <div className="flex flex-col">
              <Typography
                variant="body2"
                className="text-neutral-900! dark:text-white! font-bold leading-none"
              >
                James Wilson
              </Typography>
              <Typography variant="caption">
                Product Designer, Fintech Inc.
              </Typography>
            </div>
          </div>
        </div>

        <div className="docs-showcase-card flex flex-col p-8 bg-neutral-950 border-none relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 blur-[100px] pointer-events-none" />
          <Typography variant="h6" gradient="primary" className="mb-2">
            Admin Dashboard
          </Typography>
          <div className="flex flex-col gap-8 mt-4">
            <div className="flex flex-col">
              <Typography variant="caption" className="mb-1">
                Monthly Recurring Revenue
              </Typography>
              <Typography variant="h1" className="text-5xl! mb-0! italic-none">
                $42,900.00
              </Typography>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 text-[10px] font-bold">
                  +12.4%
                </span>
                <Typography variant="caption" className="text-[10px]">
                  vs. last month
                </Typography>
              </div>
            </div>
            <div className="h-px w-full bg-white/5" />
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <Typography variant="caption">New Users</Typography>
                <Typography variant="h4" className="mb-0!">
                  1,204
                </Typography>
              </div>
              <div className="flex flex-col">
                <Typography variant="caption">Churn Rate</Typography>
                <Typography variant="h4" className="mb-0!">
                  0.8%
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 5: Usage */}
      <h2 className="docs-category-subtitle">Props</h2>
      <CodeBlock
        code={`import { Typography } from 'erp-pro-ui';

/* Regular Heading */
<Typography variant="h1">The Title</Typography>

/* Aligned & Weighted */
<Typography variant="h2" align="center" weight="black">Centered</Typography>

/* With Gradient */
<Typography variant="h1" gradient="ocean">Ocean Vibes</Typography>

/* Custom Tracking */
<Typography variant="overline" tracking="widest">Spaced Label</Typography>`}
      />

      <DocsButtonBar
        prev={{ label: "Icons", route: "/ui-basics/icons" }}
        next={{ label: "Truncated Text", route: "/ui-basics/truncated-text" }}
      />
    </section>
  );
};
export default TypographyDoc;
