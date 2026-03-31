import { useEffect, useRef, useState } from 'react';
import { mergeClassNames } from '../../../utils';

export interface BackgroundGradientAnimationProps {
  gradientBackgroundStart?: string;
  gradientBackgroundEnd?: string;
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  fifthColor?: string;
  pointerColor?: string;
  size?: string;
  blendingValue?: string;
  children?: React.ReactNode;
  className?: string;
  interactive?: boolean;
  containerClassName?: string;
}

export const BackgroundGradientAnimation = ({
  gradientBackgroundStart = 'rgb(108, 0, 162)',
  gradientBackgroundEnd = 'rgb(0, 17, 82)',
  firstColor = '18, 113, 255',
  secondColor = '221, 74, 255',
  thirdColor = '100, 220, 255',
  fourthColor = '200, 50, 50',
  fifthColor = '180, 180, 50',
  pointerColor = '140, 100, 255',
  size = '80%',
  blendingValue = 'hard-light',
  children,
  className,
  interactive = true,
  containerClassName,
}: BackgroundGradientAnimationProps) => {
  const interactiveRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentPositionRef = useRef({ x: 0, y: 0 });
  const targetPositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!interactive) {
      return;
    }

    let animationFrameId = 0;

    const move = () => {
      const interactiveElement = interactiveRef.current;

      if (interactiveElement) {
        const currentPosition = currentPositionRef.current;
        const targetPosition = targetPositionRef.current;

        currentPosition.x += (targetPosition.x - currentPosition.x) / 20;
        currentPosition.y += (targetPosition.y - currentPosition.y) / 20;

        interactiveElement.style.transform = `translate(${Math.round(
          currentPosition.x,
        )}px, ${Math.round(currentPosition.y)}px)`;
      }

      animationFrameId = window.requestAnimationFrame(move);
    };

    animationFrameId = window.requestAnimationFrame(move);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [interactive]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (interactiveRef.current) {
      const rect = interactiveRef.current.getBoundingClientRect();
      targetPositionRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    }
  };

  const [isSafari] = useState(() =>
    typeof navigator !== 'undefined'
      ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
      : false,
  );

  const blobStyle = (
    color: string,
    _animationClass: string,
    transformOrigin: string,
    opacity: number = 1,
  ): React.CSSProperties => ({
    position: 'absolute',
    width: size,
    height: size,
    top: `calc(50% - ${size} / 2)`,
    left: `calc(50% - ${size} / 2)`,
    background: `radial-gradient(circle at center, rgba(${color}, 0.8) 0, rgba(${color}, 0) 50%) no-repeat`,
    mixBlendMode: blendingValue as React.CSSProperties['mixBlendMode'],
    transformOrigin,
    opacity,
  });

  return (
    <div
      ref={containerRef}
      className={mergeClassNames(
        'h-screen w-screen relative overflow-hidden top-0 left-0',
        containerClassName,
      )}
      style={{
        background: `linear-gradient(40deg, ${gradientBackgroundStart}, ${gradientBackgroundEnd})`,
      }}
    >
      <svg className="hidden">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className={mergeClassNames('', className)}>{children}</div>
      <div
        className="h-full w-full"
        style={{
          filter: isSafari ? 'blur(24px)' : 'url(#blurMe) blur(40px)',
        }}
      >
        {/* First blob */}
        <div
          className="ui:animate-gradient-first"
          style={blobStyle(
            firstColor,
            'animate-gradient-first',
            'center center',
          )}
        />
        {/* Second blob */}
        <div
          className="ui:animate-gradient-second"
          style={blobStyle(
            secondColor,
            'animate-gradient-second',
            'calc(50% - 400px)',
          )}
        />
        {/* Third blob */}
        <div
          className="ui:animate-gradient-third"
          style={blobStyle(
            thirdColor,
            'animate-gradient-third',
            'calc(50% + 400px)',
          )}
        />
        {/* Fourth blob */}
        <div
          className="ui:animate-gradient-fourth"
          style={blobStyle(
            fourthColor,
            'animate-gradient-fourth',
            'calc(50% - 200px)',
            0.7,
          )}
        />
        {/* Fifth blob */}
        <div
          className="ui:animate-gradient-fifth"
          style={blobStyle(
            fifthColor,
            'animate-gradient-fifth',
            'calc(50% - 800px) calc(50% + 800px)',
          )}
        />

        {interactive && (
          <div
            ref={interactiveRef}
            onMouseMove={handleMouseMove}
            className="absolute w-full h-full"
            style={{
              top: '-50%',
              left: '-50%',
              willChange: 'transform',
              opacity: 0.7,
              background: `radial-gradient(circle at center, rgba(${pointerColor}, 0.8) 0, rgba(${pointerColor}, 0) 50%) no-repeat`,
              mixBlendMode:
                blendingValue as React.CSSProperties['mixBlendMode'],
            }}
          />
        )}
      </div>
    </div>
  );
};
