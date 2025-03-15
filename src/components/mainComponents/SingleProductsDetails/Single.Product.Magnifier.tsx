"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface MagnifierProps {
  src: string;
  width: number;
  height: number;
  zoomScale: number;
  transitionSpeed?: number;
  className?: string;
}

const Magnifier = ({
  src,
  width,
  height,
  zoomScale,
  transitionSpeed = 0.3,
  className,
}: MagnifierProps) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  // Attach the ref to the container instead of the Image
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;
        const x = Math.max(0, Math.min(offsetX, rect.width));
        const y = Math.max(0, Math.min(offsetY, rect.height));

        setMousePosition({
          x: (x / rect.width) * 100,
          y: (y / rect.height) * 100,
        });
      }
    };

    if (isZoomed) {
      window.addEventListener("mousemove", handleMouseMove);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
    }

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isZoomed]);

  return (
    <div
      ref={containerRef}
      className={`relative inline-block overflow-hidden ${className}`}
      style={{
        width,
        height,
        lineHeight: 0,
      }}
      onMouseEnter={() => setIsZoomed(true)}
      onMouseLeave={() => setIsZoomed(false)}
    >
      <Image
        src={src}
        alt="Product image"
        width={width}
        height={height}
        className="block h-full w-full object-contain object-center transition-transform duration-300 ease-out"
        style={{
          transform: isZoomed ? "scale(1.05)" : "scale(1)",
          cursor: isZoomed ? "zoom-out" : "zoom-in",
          margin: 0,
        }}
      />

      {isZoomed && (
        <div
          className="absolute z-10 h-48 w-48 rounded-full border-4 border-white/20 shadow-2xl backdrop-blur-sm"
          style={{
            backgroundImage: `url(${src})`,
            backgroundSize: `${zoomScale * 100}%`,
            backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
            left: `calc(${mousePosition.x}% - 6rem)`,
            top: `calc(${mousePosition.y}% - 6rem)`,
            pointerEvents: "none",
            transition: `
              left ${transitionSpeed}s cubic-bezier(0.4, 0, 0.2, 1),
              top ${transitionSpeed}s cubic-bezier(0.4, 0, 0.2, 1),
              background-position ${transitionSpeed}s linear
            `,
            clipPath: "circle(50% at 50% 50%)",
          }}
        />
      )}

      <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-black/80 px-3 py-1.5 text-sm text-white/90 backdrop-blur-sm transition-opacity duration-300 hover:bg-black/90">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 19l-4.5-4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{isZoomed ? "Scroll to Zoom" : "Hover to Zoom"}</span>
      </div>
    </div>
  );
};

export default Magnifier;
