import { useEffect, useMemo, useState, useRef } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export function BackgroundParticles() {
    const [init, setInit] = useState(false);
    const [particleColor, setParticleColor] = useState('');
    const [backgroundColor, setBackgroundColor] = useState('');

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);


    useEffect(() => {
        if (init) {
            const pColor = getComputedStyle(document.documentElement).getPropertyValue('--color-white').trim();
            const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--color-background').trim();

            if (pColor) {
                setParticleColor(pColor);
            }

            if (bgColor) {
                setBackgroundColor(bgColor);
            }
        }
    }, [init]);

    const particlesLoaded = (container) => {
        console.log(container);
    };

    const options = useMemo(
        () => ({
            background: {
                color: {
                    value: backgroundColor,
                },
            },
            fpsLimit: 120,
            interactivity: {
                detectsOn: "canvas",
                events: {
                    onHover: {
                        enable: true,
                        mode: "bubble"
                    },
                    onClick: {
                        enable: true,
                        mode: "push"
                    },
                },
                modes: {
                    bubble: {
                        distance: 85,
                        size: 1,
                        duration: 4
                    },
                    push: {
                        quantity: 4
                    },
                }
            },
            particles: {
                color: {
                    value: particleColor,
                },
                move: {
                    enable: true,
                    speed: 0.05,
                    direction: "none",
                    random: true,
                    straight: false,
                },
                number: {
                    value: 355,
                    density: {
                        enable: true,
                    }
                },
                opacity: {
                    value: { min: 0, max: 1 },
                    animation: {
                        enable: true,
                        speed: 0.05,
                        sync: false
                    }
                },
                shape: {
                    type: "circle",
                },
                size: {
                    value: { min: 1, max: 3 },
                    random: true,
                    animation: {
                        enable: true,
                        speed: 1,
                        sync: false
                    }
                },
            },
            detectRetina: true,
        }),
        [particleColor, backgroundColor],
    );

    if (init) {
        return (

            <Particles
                id="tsparticles"
                particlesLoaded={particlesLoaded}
                options={options}
            />

        );
    }

    return <></>;
}