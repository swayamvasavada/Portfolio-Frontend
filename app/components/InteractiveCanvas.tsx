"use client";

import { useCallback, useMemo } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { type Engine, type ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

export default function InteractiveCanvas() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: { value: "transparent" },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "grab",
          },
        },
        modes: {
          grab: {
            distance: 200,
            links: { opacity: 0.8, color: "#06b6d4" },
          },
        },
      },
      particles: {
        color: { value: ["#06b6d4", "#3b82f6"] },
        links: {
          color: "#334155",
          distance: 150,
          enable: true,
          opacity: 0.4,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: { default: "bounce" },
          random: true,
          speed: 0.6,
          straight: false,
        },
        number: {
          density: { enable: true },
          value: 60,
        },
        opacity: { value: 0.7 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 3 } },
      },
      detectRetina: true,
    }),
    [],
  );

  return (
    <div className="absolute inset-0 z-0 pointer-events-auto">
      <ParticlesProvider init={particlesInit}>
        <Particles
          id="tsparticles"
          options={options}
          className="w-full h-full"
        />
      </ParticlesProvider>
    </div>
  );
}