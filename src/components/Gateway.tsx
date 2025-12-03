import React, { useState, useEffect } from 'react';
import { PhysicsCanvas } from './visual-drafts/PhysicsCanvas';

interface GatewayProps {
    onEnter: () => void;
}

// Simple particle system for atmospheric effect
interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    alpha: number;
}

export const Gateway: React.FC<GatewayProps> = ({ onEnter }) => {
    const [showGateway, setShowGateway] = useState(true);
    const [textVisible, setTextVisible] = useState(false);
    const [exiting, setExiting] = useState(false);

    // Particles state - initialized once
    const particlesRef = React.useRef<Particle[]>([]);

    // Fade in text after 1-2 seconds of ambient atmosphere
    useEffect(() => {
        const timer = setTimeout(() => {
            setTextVisible(true);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    // Physics canvas initialization
    const handleInit = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
        // Initialize particles - subtle, atmospheric
        const particleCount = 50;
        particlesRef.current = Array.from({ length: particleCount }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 2 + 1,
            alpha: Math.random() * 0.3 + 0.1
        }));
    };

    // Physics canvas update loop
    const handleUpdate = (
        ctx: CanvasRenderingContext2D,
        width: number,
        height: number,
        mouse: { x: number; y: number; isPressed: boolean }
    ) => {
        // Clear canvas with dark background
        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(0, 0, width, height);

        // Update and draw particles
        particlesRef.current.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Wrap around edges
            if (particle.x < 0) particle.x = width;
            if (particle.x > width) particle.x = 0;
            if (particle.y < 0) particle.y = height;
            if (particle.y > height) particle.y = 0;

            // Mouse interaction - subtle repulsion
            if (mouse.x !== -1 && mouse.y !== -1) {
                const dx = particle.x - mouse.x;
                const dy = particle.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const interactionRadius = 150;

                if (dist < interactionRadius) {
                    const force = (interactionRadius - dist) / interactionRadius;
                    particle.vx += (dx / dist) * force * 0.1;
                    particle.vy += (dy / dist) * force * 0.1;
                }
            }

            // Damping
            particle.vx *= 0.99;
            particle.vy *= 0.99;

            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${particle.alpha})`;
            ctx.fill();
        });

        // Draw connections between nearby particles
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;
        const connectionDistance = 100;

        for (let i = 0; i < particlesRef.current.length; i++) {
            for (let j = i + 1; j < particlesRef.current.length; j++) {
                const p1 = particlesRef.current[i];
                const p2 = particlesRef.current[j];
                const dx = p2.x - p1.x;
                const dy = p2.y - p1.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < connectionDistance) {
                    const alpha = (1 - dist / connectionDistance) * 0.1;
                    ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        }
    };

    // Handle CTA click - trigger exit animation
    const handleEnterClick = () => {
        setExiting(true);
        // Wait for slide-up animation to complete before calling onEnter
        setTimeout(() => {
            setShowGateway(false);
            onEnter();
        }, 700);
    };

    if (!showGateway) return null;

    return (
        <div
            className={`fixed inset-0 z-50 bg-[#0a0a0a] ${
                exiting
                    ? '-translate-y-full duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]'
                    : 'translate-y-0'
            } transition-transform`}
        >
            {/* Physics Canvas Background */}
            <PhysicsCanvas
                onInit={handleInit}
                onUpdate={handleUpdate}
                className="absolute inset-0 w-full h-full"
            />

            {/* Content Layer - Text and CTA */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                {/* Invitation Text */}
                <div
                    className={`text-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                >
                    <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white tracking-tight leading-tight px-8">
                        Something different begins here.
                    </h1>
                </div>

                {/* CTA Button */}
                <button
                    onClick={handleEnterClick}
                    className={`pointer-events-auto mt-12 md:mt-16 px-12 py-4 border border-white/20 text-white font-mono text-sm tracking-wide hover:bg-white/5 hover:border-white/40 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                    style={{ transitionDelay: textVisible ? '200ms' : '0ms' }}
                >
                    Enter
                </button>
            </div>
        </div>
    );
};
