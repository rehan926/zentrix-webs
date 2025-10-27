import { useEffect, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Container, ISourceOptions } from "@tsparticles/engine";

interface ParticlesBackgroundProps {
  id: string;
  particleCount?: number;
}

const ParticlesBackground = ({ id, particleCount = 80 }: ParticlesBackgroundProps) => {
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    });
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 120,
      particles: {
        color: {
          value: "#facc15",
        },
        links: {
          color: "#facc15",
          distance: 150,
          enable: true,
          opacity: 0.3,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1.5,
          direction: "none",
          random: true,
          straight: false,
          outModes: {
            default: "bounce",
          },
        },
        number: {
          value: particleCount,
          density: {
            enable: true,
          },
        },
        opacity: {
          value: 0.5,
          random: true,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
    }),
    [particleCount]
  );

  const particlesLoaded = async (container?: Container) => {
    console.log("Particles loaded", container);
  };

  return (
    <Particles
      id={id}
      particlesLoaded={particlesLoaded}
      options={options}
      className="absolute inset-0 w-full h-full"
    />
  );
};

export default ParticlesBackground;