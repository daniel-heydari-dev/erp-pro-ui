import { BackgroundGradientAnimation } from "./BackgroundGradientAnimation";

export default function BackgroundGradientAnimationDemo() {
  return (
    <BackgroundGradientAnimation>
      <div className="ui:absolute ui:z-50 ui:inset-0 ui:flex ui:items-center ui:justify-center ui:text-ds-on-accent ui:font-bold ui:px-4 ui:pointer-events-none ui:text-3xl ui:text-center md:ui:text-4xl lg:ui:text-7xl">
        <p className="ui:bg-clip-text ui:text-transparent ui:drop-shadow-2xl ui:bg-gradient-to-b ui:from-ds-on-accent ui:to-ds-on-accent/35">
          Gradients X Animations
        </p>
      </div>
    </BackgroundGradientAnimation>
  );
}
