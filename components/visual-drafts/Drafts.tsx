import React, { useRef } from 'react';
import { PhysicsCanvas } from './PhysicsCanvas';
import { Particle, Vector, randomRange } from '../Visuals';

// --- Draft 1: Orbital Attractor ---
export const VisualOrbital: React.FC = () => {
    const particles = useRef<Particle[]>([]);

    const init = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
        particles.current = Array.from({ length: 100 }).map((_, i) => ({
            id: i,
            pos: { x: Math.random() * 100, y: Math.random() * 100 },
            vel: { x: randomRange(-0.5, 0.5), y: randomRange(-0.5, 0.5) },
            acc: { x: 0, y: 0 },
            radius: randomRange(0.5, 2),
            life: 1,
            color: 'rgba(255, 255, 255, 0.6)',
            mass: randomRange(0.5, 1.5)
        }));
    };

    const update = (ctx: CanvasRenderingContext2D, width: number, height: number, mouse: { x: number, y: number, isPressed: boolean }) => {
        ctx.clearRect(0, 0, width, height);
        const scaleX = width / 100;
        const scaleY = height / 100;

        // Auto-animation: Virtual mouse
        const time = Date.now() * 0.001;
        const isIdle = mouse.x < 0 || mouse.x > 1 || mouse.y < 0 || mouse.y > 1;
        const mx = isIdle ? 50 + Math.sin(time) * 20 : mouse.x * 100;
        const my = isIdle ? 50 + Math.cos(time * 0.7) * 20 : mouse.y * 100;
        const isPressed = isIdle ? false : mouse.isPressed;

        particles.current.forEach(p => {
            // Orbit logic
            const dx = mx - p.pos.x;
            const dy = my - p.pos.y;
            const dist = Math.sqrt(dx * dx + dy * dy) + 0.1;

            // Tangential force for orbit
            const angle = Math.atan2(dy, dx);
            let orbitForce = 0.5 / dist;

            // Click Interaction: Subtle repulsion
            if (isPressed) {
                // Gentle push away
                p.acc.x -= (dx / dist) * 0.1;
                p.acc.y -= (dy / dist) * 0.1;
            } else {
                p.acc.x += Math.cos(angle + Math.PI / 2) * orbitForce;
                p.acc.y += Math.sin(angle + Math.PI / 2) * orbitForce;
                // Gentle Attraction
                p.acc.x += (dx / dist) * 0.02;
                p.acc.y += (dy / dist) * 0.02;
            }

            p.vel.x += p.acc.x;
            p.vel.y += p.acc.y;
            p.vel.x *= 0.98;
            p.vel.y *= 0.98;
            p.pos.x += p.vel.x;
            p.pos.y += p.vel.y;
            p.acc = { x: 0, y: 0 };

            ctx.beginPath();
            ctx.arc(p.pos.x * scaleX, p.pos.y * scaleY, p.radius * (width / 100 * 0.5), 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        });
    };

    return <PhysicsCanvas onInit={init} onUpdate={update} />;
};

// --- Draft 2: Repulsor Grid ---
export const VisualGrid: React.FC = () => {
    const points = useRef<Vector[]>([]);

    const init = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
        points.current = [];
        for (let x = 5; x < 100; x += 5) {
            for (let y = 5; y < 100; y += 5) {
                points.current.push({ x, y });
            }
        }
    };

    const update = (ctx: CanvasRenderingContext2D, width: number, height: number, mouse: { x: number, y: number, isPressed: boolean }) => {
        ctx.clearRect(0, 0, width, height);
        const scaleX = width / 100;
        const scaleY = height / 100;

        // Auto-animation: Virtual mouse
        const time = Date.now() * 0.001;
        const isIdle = mouse.x < 0 || mouse.x > 1 || mouse.y < 0 || mouse.y > 1;
        const mx = isIdle ? 50 + Math.sin(time * 0.5) * 30 : mouse.x * 100;
        const my = isIdle ? 50 + Math.cos(time * 0.3) * 30 : mouse.y * 100;
        const isPressed = isIdle ? false : mouse.isPressed;

        points.current.forEach(pt => {
            const dx = pt.x - mx;
            const dy = pt.y - my;
            const dist = Math.sqrt(dx * dx + dy * dy);

            let drawX = pt.x;
            let drawY = pt.y;

            const range = isPressed ? 40 : (isIdle ? 30 : 20);
            const strength = isPressed ? 1.5 : (isIdle ? 0.8 : 0.5);

            if (dist < range) {
                const force = (range - dist) * strength;
                const angle = Math.atan2(dy, dx);
                drawX += Math.cos(angle) * force;
                drawY += Math.sin(angle) * force;
            }

            ctx.beginPath();
            ctx.arc(drawX * scaleX, drawY * scaleY, 1, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.1, 1 - dist / 30)})`;
            ctx.fill();
        });
    };

    return <PhysicsCanvas onInit={init} onUpdate={update} />;
};

// --- Draft 3: Elastic Net ---
export const VisualNet: React.FC = () => {
    const nodes = useRef<any[]>([]);

    const init = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
        nodes.current = [];
        const cols = 10;
        const rows = 10;
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                nodes.current.push({
                    baseX: (i / (cols - 1)) * 80 + 10,
                    baseY: (j / (rows - 1)) * 80 + 10,
                    x: (i / (cols - 1)) * 80 + 10,
                    y: (j / (rows - 1)) * 80 + 10,
                    vx: 0, vy: 0
                });
            }
        }
    };

    const update = (ctx: CanvasRenderingContext2D, width: number, height: number, mouse: { x: number, y: number, isPressed: boolean }) => {
        ctx.clearRect(0, 0, width, height);
        const scaleX = width / 100;
        const scaleY = height / 100;

        // Auto-animation: Virtual mouse
        const time = Date.now() * 0.001;
        const isIdle = mouse.x < 0 || mouse.x > 1 || mouse.y < 0 || mouse.y > 1;
        const mx = isIdle ? 50 + Math.sin(time * 0.8) * 25 : mouse.x * 100;
        const my = isIdle ? 50 + Math.cos(time * 0.6) * 25 : mouse.y * 100;
        const isPressed = isIdle ? false : mouse.isPressed;

        // Physics
        nodes.current.forEach(n => {
            // Return to base
            const dxBase = n.baseX - n.x;
            const dyBase = n.baseY - n.y;
            n.vx += dxBase * 0.05;
            n.vy += dyBase * 0.05;

            // Mouse repulsion
            const dx = n.x - mx;
            const dy = n.y - my;
            const dist = Math.sqrt(dx * dx + dy * dy);

            const range = isPressed ? 40 : 20;
            const strength = isPressed ? 0.3 : 0.1;

            if (dist < range) {
                const force = (range - dist) * strength;
                const angle = Math.atan2(dy, dx);
                n.vx += Math.cos(angle) * force;
                n.vy += Math.sin(angle) * force;
            }

            n.vx *= 0.9;
            n.vy *= 0.9;
            n.x += n.vx;
            n.y += n.vy;
        });

        // Draw connections
        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        ctx.lineWidth = 0.5;
        const cols = 10;
        for (let i = 0; i < nodes.current.length; i++) {
            const n = nodes.current[i];
            // Right neighbor
            if ((i + 1) % cols !== 0) {
                const right = nodes.current[i + 1];
                ctx.beginPath();
                ctx.moveTo(n.x * scaleX, n.y * scaleY);
                ctx.lineTo(right.x * scaleX, right.y * scaleY);
                ctx.stroke();
            }
            // Bottom neighbor
            if (i + cols < nodes.current.length) {
                const bottom = nodes.current[i + cols];
                ctx.beginPath();
                ctx.moveTo(n.x * scaleX, n.y * scaleY);
                ctx.lineTo(bottom.x * scaleX, bottom.y * scaleY);
                ctx.stroke();
            }

            ctx.beginPath();
            ctx.arc(n.x * scaleX, n.y * scaleY, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = 'white';
            ctx.fill();
        }
    };

    return <PhysicsCanvas onInit={init} onUpdate={update} />;
};

// --- Draft 4: Digital Rain ---
export const VisualRain: React.FC = () => {
    const drops = useRef<any[]>([]);

    const init = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
        drops.current = Array.from({ length: 50 }).map(() => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            speed: randomRange(0.2, 0.8),
            len: randomRange(2, 5)
        }));
    };

    const update = (ctx: CanvasRenderingContext2D, width: number, height: number, mouse: { x: number, y: number, isPressed: boolean }) => {
        ctx.clearRect(0, 0, width, height);
        const scaleX = width / 100;
        const scaleY = height / 100;

        // Auto-animation: Virtual mouse
        const time = Date.now() * 0.001;
        const isIdle = mouse.x < 0 || mouse.x > 1 || mouse.y < 0 || mouse.y > 1;
        const mx = isIdle ? 50 + Math.sin(time) * 30 : mouse.x * 100;
        const my = isIdle ? 50 + Math.cos(time) * 30 : mouse.y * 100;
        const isPressed = isIdle ? false : mouse.isPressed;

        ctx.strokeStyle = 'rgba(255,255,255,0.5)';
        ctx.lineWidth = 1;

        drops.current.forEach(d => {
            d.y += d.speed * (isPressed ? 3 : 1); // Speed up on click

            // Mouse distortion
            const dx = d.x - mx;
            const dy = d.y - my;
            const dist = Math.sqrt(dx * dx + dy * dy);
            let drawX = d.x;
            if (dist < 15) {
                drawX += (dx / dist) * 5;
            }

            if (d.y > 100) {
                d.y = -10;
                d.x = Math.random() * 100;
            }

            ctx.beginPath();
            ctx.moveTo(drawX * scaleX, d.y * scaleY);
            ctx.lineTo(drawX * scaleX, (d.y - d.len) * scaleY);
            ctx.stroke();
        });
    };

    return <PhysicsCanvas onInit={init} onUpdate={update} />;
};

// --- Draft 5: Galaxy Spiral ---
export const VisualGalaxy: React.FC = () => {
    const stars = useRef<any[]>([]);

    const init = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
        stars.current = Array.from({ length: 200 }).map(() => ({
            angle: Math.random() * Math.PI * 2,
            radius: randomRange(5, 40),
            speed: randomRange(0.002, 0.01),
            size: randomRange(0.5, 1.5)
        }));
    };

    const update = (ctx: CanvasRenderingContext2D, width: number, height: number, mouse: { x: number, y: number, isPressed: boolean }) => {
        ctx.clearRect(0, 0, width, height);
        const scaleX = width / 100;
        const scaleY = height / 100;

        // Auto-animation: Virtual mouse
        const time = Date.now() * 0.001;
        const isIdle = mouse.x < 0 || mouse.x > 1 || mouse.y < 0 || mouse.y > 1;
        const mx = isIdle ? 50 + Math.sin(time * 0.5) * 40 : mouse.x * 100;
        const my = isIdle ? 50 + Math.cos(time * 0.5) * 40 : mouse.y * 100;
        const isPressed = isIdle ? false : mouse.isPressed;

        // Tilt based on mouse Y
        const tilt = (my - 50) * 0.01;

        stars.current.forEach(s => {
            s.angle += s.speed * (isPressed ? 5 : 1); // Spin faster on click

            // Elliptical orbit
            let x = 50 + Math.cos(s.angle) * s.radius;
            let y = 50 + Math.sin(s.angle) * s.radius * (1 + tilt);

            // Mouse influence
            const dx = x - mx;
            const dy = y - my;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 20) {
                x += (dx / dist) * 2;
                y += (dy / dist) * 2;
            }

            ctx.beginPath();
            ctx.arc(x * scaleX, y * scaleY, s.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255,${0.8 - dist / 100})`;
            ctx.fill();
        });
    };

    return <PhysicsCanvas onInit={init} onUpdate={update} />;
};

// --- Draft 6: Noise Field ---
export const VisualFlow: React.FC = () => {
    const particles = useRef<Particle[]>([]);

    const init = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
        particles.current = Array.from({ length: 150 }).map((_, i) => ({
            id: i,
            pos: { x: Math.random() * 100, y: Math.random() * 100 },
            vel: { x: 0, y: 0 },
            acc: { x: 0, y: 0 },
            radius: randomRange(0.5, 1.5),
            life: 1,
            color: 'rgba(255,255,255,0.4)',
            mass: 1
        }));
    };

    const update = (ctx: CanvasRenderingContext2D, width: number, height: number, mouse: { x: number, y: number, isPressed: boolean }) => {
        ctx.clearRect(0, 0, width, height);
        const scaleX = width / 100;
        const scaleY = height / 100;

        // Auto-animation: Virtual mouse
        const time = Date.now() * 0.001;
        const isIdle = mouse.x < 0 || mouse.x > 1 || mouse.y < 0 || mouse.y > 1;
        const mx = isIdle ? 50 + Math.sin(time) * 30 : mouse.x * 100;
        const my = isIdle ? 50 + Math.cos(time * 1.2) * 30 : mouse.y * 100;
        const isPressed = isIdle ? false : mouse.isPressed;

        particles.current.forEach(p => {
            // Simple flow field approximation using sin/cos
            const angle = Math.sin(p.pos.x * 0.1) + Math.cos(p.pos.y * 0.1);
            p.acc.x += Math.cos(angle) * (isPressed ? 0.1 : 0.02); // Stronger flow on click
            p.acc.y += Math.sin(angle) * (isPressed ? 0.1 : 0.02);

            // Mouse attraction
            const dx = mx - p.pos.x;
            const dy = my - p.pos.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 30) {
                p.acc.x += (dx / dist) * 0.05;
                p.acc.y += (dy / dist) * 0.05;
            }

            p.vel.x += p.acc.x;
            p.vel.y += p.acc.y;
            p.vel.x *= 0.95;
            p.vel.y *= 0.95;
            p.pos.x += p.vel.x;
            p.pos.y += p.vel.y;
            p.acc = { x: 0, y: 0 };

            // Wrap
            if (p.pos.x < 0) p.pos.x = 100;
            if (p.pos.x > 100) p.pos.x = 0;
            if (p.pos.y < 0) p.pos.y = 100;
            if (p.pos.y > 100) p.pos.y = 0;

            ctx.beginPath();
            ctx.arc(p.pos.x * scaleX, p.pos.y * scaleY, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        });
    };

    return <PhysicsCanvas onInit={init} onUpdate={update} />;
};

// --- Draft 7: Tethered Chain ---
export const VisualChain: React.FC = () => {
    const chain = useRef<Vector[]>([]);

    const init = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
        chain.current = Array.from({ length: 20 }).map(() => ({ x: 50, y: 50 }));
    };

    const update = (ctx: CanvasRenderingContext2D, width: number, height: number, mouse: { x: number, y: number, isPressed: boolean }) => {
        ctx.clearRect(0, 0, width, height);
        const scaleX = width / 100;
        const scaleY = height / 100;

        // Auto-animation: Virtual mouse
        const time = Date.now() * 0.001;
        const isIdle = mouse.x < 0 || mouse.x > 1 || mouse.y < 0 || mouse.y > 1;
        const mx = isIdle ? 50 + Math.sin(time) * 30 : mouse.x * 100;
        const my = isIdle ? 50 + Math.sin(time * 2) * 15 : mouse.y * 100;
        const isPressed = isIdle ? false : mouse.isPressed;

        // Head follows mouse
        chain.current[0].x += (mx - chain.current[0].x) * 0.2;
        chain.current[0].y += (my - chain.current[0].y) * 0.2;

        // Segments follow previous
        for (let i = 1; i < chain.current.length; i++) {
            const prev = chain.current[i - 1];
            const curr = chain.current[i];
            const dx = prev.x - curr.x;
            const dy = prev.y - curr.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const targetDist = isPressed ? 4 : 2; // Stretch on click

            if (dist > targetDist) {
                const angle = Math.atan2(dy, dx);
                curr.x = prev.x - Math.cos(angle) * targetDist;
                curr.y = prev.y - Math.sin(angle) * targetDist;
            }
        }

        // Draw
        ctx.beginPath();
        ctx.moveTo(chain.current[0].x * scaleX, chain.current[0].y * scaleY);
        for (let i = 1; i < chain.current.length; i++) {
            ctx.lineTo(chain.current[i].x * scaleX, chain.current[i].y * scaleY);
        }
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();

        chain.current.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x * scaleX, p.y * scaleY, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255,255,255,0.8)';
            ctx.fill();
        });
    };

    return <PhysicsCanvas onInit={init} onUpdate={update} />;
};

// --- Draft 8: Shatter ---
export const VisualShatter: React.FC = () => {
    const shards = useRef<any[]>([]);
    const shattered = useRef(false);

    const init = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
        shards.current = [];
        // Create a circle of shards
        for (let i = 0; i < 50; i++) {
            const angle = (i / 50) * Math.PI * 2;
            shards.current.push({
                baseX: 50 + Math.cos(angle) * 10,
                baseY: 50 + Math.sin(angle) * 10,
                x: 50 + Math.cos(angle) * 10,
                y: 50 + Math.sin(angle) * 10,
                vx: 0, vy: 0,
                angle: angle
            });
        }
    };

    const update = (ctx: CanvasRenderingContext2D, width: number, height: number, mouse: { x: number, y: number, isPressed: boolean }) => {
        ctx.clearRect(0, 0, width, height);
        const scaleX = width / 100;
        const scaleY = height / 100;

        // Auto-animation: Virtual mouse
        const time = Date.now() * 0.001;
        const isIdle = mouse.x < 0 || mouse.x > 1 || mouse.y < 0 || mouse.y > 1;
        const mx = isIdle ? 50 + Math.sin(time) * 20 : mouse.x * 100;
        const my = isIdle ? 50 + Math.cos(time) * 20 : mouse.y * 100;
        const isPressed = isIdle ? (Math.sin(time * 3) > 0.8) : mouse.isPressed; // Auto-shatter occasionally

        const distToCenter = Math.sqrt(Math.pow(mx - 50, 2) + Math.pow(my - 50, 2));

        if (distToCenter < 15 || isPressed) shattered.current = true;
        else if (distToCenter > 40) shattered.current = false;

        shards.current.forEach(s => {
            if (shattered.current) {
                // Explode out
                s.vx += Math.cos(s.angle) * (isPressed ? 1.0 : 0.5);
                s.vy += Math.sin(s.angle) * (isPressed ? 1.0 : 0.5);
            } else {
                // Return to base
                s.vx += (s.baseX - s.x) * 0.1;
                s.vy += (s.baseY - s.y) * 0.1;
            }

            s.vx *= 0.9;
            s.vy *= 0.9;
            s.x += s.vx;
            s.y += s.vy;

            ctx.beginPath();
            ctx.moveTo(s.x * scaleX, s.y * scaleY);
            ctx.lineTo((s.x + Math.cos(s.angle) * 2) * scaleX, (s.y + Math.sin(s.angle) * 2) * scaleY);
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 2;
            ctx.stroke();
        });
    };

    return <PhysicsCanvas onInit={init} onUpdate={update} />;
};

// --- Draft 9: Pulse ---
export const VisualPulse: React.FC = () => {
    const waves = useRef<any[]>([]);
    const lastPulse = useRef(0);

    const init = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
        waves.current = [];
    };

    const update = (ctx: CanvasRenderingContext2D, width: number, height: number, mouse: { x: number, y: number, isPressed: boolean }) => {
        ctx.clearRect(0, 0, width, height);
        const scaleX = width / 100;
        const scaleY = height / 100;

        // Auto-animation: Virtual mouse
        const time = Date.now() * 0.001;
        const isIdle = mouse.x < 0 || mouse.x > 1 || mouse.y < 0 || mouse.y > 1;
        const mx = isIdle ? 50 + Math.sin(time) * 30 : mouse.x * 100;
        const my = isIdle ? 50 + Math.cos(time) * 30 : mouse.y * 100;
        const isPressed = isIdle ? (Math.random() > 0.98) : mouse.isPressed; // Random auto-pulse

        const now = Date.now();

        // Auto pulse or mouse pulse
        if (now - lastPulse.current > 1000) {
            waves.current.push({ x: 50, y: 50, r: 0, alpha: 1 });
            lastPulse.current = now;
        }

        // Mouse movement creates waves
        if (Math.random() > 0.9 || isPressed) {
            waves.current.push({ x: mx, y: my, r: 0, alpha: isPressed ? 0.8 : 0.5 });
        }

        for (let i = waves.current.length - 1; i >= 0; i--) {
            const w = waves.current[i];
            w.r += 0.5;
            w.alpha -= 0.01;

            if (w.alpha <= 0) {
                waves.current.splice(i, 1);
                continue;
            }

            ctx.beginPath();
            ctx.arc(w.x * scaleX, w.y * scaleY, w.r * (width / 100), 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(255,255,255,${w.alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    };

    return <PhysicsCanvas onInit={init} onUpdate={update} />;
};

// --- Draft 10: Boids ---
export const VisualFlock: React.FC = () => {
    const boids = useRef<any[]>([]);

    const init = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
        boids.current = Array.from({ length: 40 }).map(() => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            vx: randomRange(-0.5, 0.5),
            vy: randomRange(-0.5, 0.5)
        }));
    };

    const update = (ctx: CanvasRenderingContext2D, width: number, height: number, mouse: { x: number, y: number, isPressed: boolean }) => {
        ctx.clearRect(0, 0, width, height);
        const scaleX = width / 100;
        const scaleY = height / 100;

        // Auto-animation: Virtual mouse
        const time = Date.now() * 0.001;
        const isIdle = mouse.x < 0 || mouse.x > 1 || mouse.y < 0 || mouse.y > 1;
        const mx = isIdle ? 50 + Math.sin(time * 0.5) * 40 : mouse.x * 100;
        const my = isIdle ? 50 + Math.cos(time * 0.7) * 40 : mouse.y * 100;
        const isPressed = isIdle ? false : mouse.isPressed;

        boids.current.forEach(b => {
            // Cohesion, Alignment, Separation (Simplified)
            let cx = 0, cy = 0; // Center of mass
            let ax = 0, ay = 0; // Avg velocity
            let sx = 0, sy = 0; // Separation

            boids.current.forEach(other => {
                if (b === other) return;
                const dx = b.x - other.x;
                const dy = b.y - other.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 10) {
                    sx += dx / dist;
                    sy += dy / dist;
                }
                cx += other.x;
                cy += other.y;
                ax += other.vx;
                ay += other.vy;
            });

            cx /= boids.current.length - 1;
            cy /= boids.current.length - 1;
            ax /= boids.current.length - 1;
            ay /= boids.current.length - 1;

            b.vx += (cx - b.x) * 0.001 + ax * 0.01 + sx * 0.05;
            b.vy += (cy - b.y) * 0.001 + ay * 0.01 + sy * 0.05;

            // Mouse attraction
            const dx = mx - b.x;
            const dy = my - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (isPressed) {
                // Scatter on click
                if (dist < 30) {
                    b.vx -= dx * 0.05;
                    b.vy -= dy * 0.05;
                }
            } else {
                // Attract
                b.vx += dx * 0.005;
                b.vy += dy * 0.005;
            }

            // Limit speed
            const speed = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
            if (speed > 1) {
                b.vx = (b.vx / speed);
                b.vy = (b.vy / speed);
            }

            b.x += b.vx;
            b.y += b.vy;

            // Wrap
            if (b.x < 0) b.x = 100;
            if (b.x > 100) b.x = 0;
            if (b.y < 0) b.y = 100;
            if (b.y > 100) b.y = 0;

            // Draw triangle
            const angle = Math.atan2(b.vy, b.vx);
            ctx.save();
            ctx.translate(b.x * scaleX, b.y * scaleY);
            ctx.rotate(angle);
            ctx.beginPath();
            ctx.moveTo(5, 0);
            ctx.lineTo(-3, 2);
            ctx.lineTo(-3, -2);
            ctx.closePath();
            ctx.fillStyle = 'rgba(255,255,255,0.7)';
            ctx.fill();
            ctx.restore();
        });
    };

    return <PhysicsCanvas onInit={init} onUpdate={update} />;
};

// --- Draft 11: Magnet Field ---
export const VisualMagnet: React.FC = () => {
    const filings = useRef<any[]>([]);

    const init = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
        filings.current = [];
        // Grid of lines
        for (let x = 5; x < 100; x += 3) {
            for (let y = 5; y < 100; y += 3) {
                filings.current.push({ x, y });
            }
        }
    };

    const update = (ctx: CanvasRenderingContext2D, width: number, height: number, mouse: { x: number, y: number, isPressed: boolean }) => {
        ctx.clearRect(0, 0, width, height);
        const scaleX = width / 100;
        const scaleY = height / 100;

        // Auto-animation: Virtual mouse
        const time = Date.now() * 0.001;
        const isIdle = mouse.x < 0 || mouse.x > 1 || mouse.y < 0 || mouse.y > 1;
        const mx = isIdle ? 50 + Math.sin(time) * 30 : mouse.x * 100;
        const my = isIdle ? 50 + Math.cos(time * 0.8) * 30 : mouse.y * 100;
        const isPressed = isIdle ? false : mouse.isPressed;

        ctx.strokeStyle = 'rgba(255,255,255,0.4)';
        ctx.lineWidth = 1;

        filings.current.forEach(f => {
            const dx = mx - f.x;
            const dy = my - f.y;
            const angle = Math.atan2(dy, dx);

            const len = isPressed ? 3 : 1.5;

            ctx.save();
            ctx.translate(f.x * scaleX, f.y * scaleY);
            ctx.rotate(angle);
            ctx.beginPath();
            ctx.moveTo(-len, 0);
            ctx.lineTo(len, 0);
            ctx.stroke();
            ctx.restore();
        });
    };

    return <PhysicsCanvas onInit={init} onUpdate={update} />;
};

// --- Draft 12: Vortex Suction ---
export const VisualVortex: React.FC = () => {
    const particles = useRef<Particle[]>([]);

    const init = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
        particles.current = Array.from({ length: 200 }).map((_, i) => ({
            id: i,
            pos: { x: Math.random() * 100, y: Math.random() * 100 },
            vel: { x: 0, y: 0 },
            acc: { x: 0, y: 0 },
            radius: randomRange(0.5, 1.5),
            life: 1,
            color: 'rgba(255, 255, 255, 0.6)',
            mass: 1
        }));
    };

    const update = (ctx: CanvasRenderingContext2D, width: number, height: number, mouse: { x: number, y: number, isPressed: boolean }) => {
        ctx.clearRect(0, 0, width, height);
        const scaleX = width / 100;
        const scaleY = height / 100;

        // Auto-animation: Virtual mouse
        const time = Date.now() * 0.001;
        const isIdle = mouse.x < 0 || mouse.x > 1 || mouse.y < 0 || mouse.y > 1;
        const mx = isIdle ? 50 + Math.sin(time) * 20 : mouse.x * 100;
        const my = isIdle ? 50 + Math.cos(time) * 20 : mouse.y * 100;
        const isPressed = isIdle ? false : mouse.isPressed;

        particles.current.forEach(p => {
            const dx = mx - p.pos.x;
            const dy = my - p.pos.y;
            const dist = Math.sqrt(dx * dx + dy * dy) + 0.1;
            const angle = Math.atan2(dy, dx);

            // Vortex force (tangential) + Suction (radial)
            const suction = isPressed ? 1.0 : 0.2;
            const rotation = isPressed ? 2.0 : 0.5;

            p.acc.x += Math.cos(angle) * (suction / dist); // Suction
            p.acc.y += Math.sin(angle) * (suction / dist);

            p.acc.x += Math.cos(angle + Math.PI / 2) * (rotation / dist); // Rotation
            p.acc.y += Math.sin(angle + Math.PI / 2) * (rotation / dist);

            p.vel.x += p.acc.x;
            p.vel.y += p.acc.y;
            p.vel.x *= 0.95;
            p.vel.y *= 0.95;
            p.pos.x += p.vel.x;
            p.pos.y += p.vel.y;
            p.acc = { x: 0, y: 0 };

            // Reset if too close
            if (dist < 2) {
                p.pos.x = Math.random() * 100;
                p.pos.y = Math.random() * 100;
                p.vel = { x: 0, y: 0 };
            }

            ctx.beginPath();
            ctx.arc(p.pos.x * scaleX, p.pos.y * scaleY, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        });
    };

    return <PhysicsCanvas onInit={init} onUpdate={update} />;
};
