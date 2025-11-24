import React, { useRef } from 'react';
import { PhysicsCanvas } from './PhysicsCanvas';
import { Particle, Vector, randomRange } from '../Visuals';

// --- The Human Standard (Orbital Attractor) ---
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

// --- Fabric (Ripple Grid) ---
export const VisualGrid: React.FC = () => {
    // Using a heightmap based ripple simulation
    const cols = 50; // Higher res for finer look
    const rows = 50;
    const currentBuffer = useRef<Float32Array>(new Float32Array(cols * rows));
    const previousBuffer = useRef<Float32Array>(new Float32Array(cols * rows));
    const damping = 0.95; // Damping

    const init = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
        currentBuffer.current.fill(0);
        previousBuffer.current.fill(0);
    };

    const update = (ctx: CanvasRenderingContext2D, width: number, height: number, mouse: { x: number, y: number, isPressed: boolean }) => {
        // Clear with slight fade
        ctx.clearRect(0, 0, width, height);

        const scaleX = width / cols;
        const scaleY = height / rows;

        // Interaction: Add ripple on mouse move/click
        const time = Date.now() * 0.001;
        const isIdle = mouse.x < 0 || mouse.x > 1 || mouse.y < 0 || mouse.y > 1;

        let mx = mouse.x * cols;
        let my = mouse.y * rows;

        if (isIdle) {
            if (Math.random() < 0.01) { // Less frequent
                mx = Math.random() * cols;
                my = Math.random() * rows;
                const idx = Math.floor(mx) + Math.floor(my) * cols;
                if (idx >= 0 && idx < cols * rows) {
                    previousBuffer.current[idx] = 200;
                }
            }
        } else {
            const idx = Math.floor(mx) + Math.floor(my) * cols;
            if (idx >= 0 && idx < cols * rows) {
                previousBuffer.current[idx] = mouse.isPressed ? 500 : 100;
            }
        }

        // Process Ripple Simulation
        for (let i = cols; i < cols * rows - cols; i++) {
            currentBuffer.current[i] = (
                previousBuffer.current[i - 1] +
                previousBuffer.current[i + 1] +
                previousBuffer.current[i - cols] +
                previousBuffer.current[i + cols]
            ) / 2 - currentBuffer.current[i];

            currentBuffer.current[i] *= damping;
        }

        // Swap buffers
        const temp = previousBuffer.current;
        previousBuffer.current = currentBuffer.current;
        currentBuffer.current = temp;

        // Render
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const idx = y * cols + x;
                const val = currentBuffer.current[idx];

                // Only draw significant ripples
                if (Math.abs(val) > 0.1) {
                    const xPos = x * scaleX + scaleX / 2;
                    const yPos = y * scaleY + scaleY / 2;

                    const yOff = yPos - val * 0.5;

                    // Much smaller, finer dots
                    const radius = Math.min(Math.abs(val) * 0.05, 1.5);
                    // Lower opacity
                    const alpha = Math.min(Math.abs(val) * 0.01, 0.4);

                    ctx.beginPath();
                    ctx.arc(xPos, yOff, radius, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
                    ctx.fill();
                }
            }
        }
    };

    return <PhysicsCanvas onInit={init} onUpdate={update} />;
};

// --- The Distance Between Decision and Reality (Elastic Net) ---
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

// --- Data Stream (Depth Rain) ---
export const VisualRain: React.FC = () => {
    const drops = useRef<any[]>([]);
    const splashes = useRef<any[]>([]);

    const init = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
        drops.current = Array.from({ length: 100 }).map(() => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            z: Math.random() * 0.5 + 0.5, // Depth for parallax/speed
            speed: randomRange(0.5, 2.0),
            len: randomRange(5, 15)
        }));
        splashes.current = [];
    };

    const update = (ctx: CanvasRenderingContext2D, width: number, height: number, mouse: { x: number, y: number, isPressed: boolean }) => {
        ctx.clearRect(0, 0, width, height);
        const scaleX = width / 100;
        const scaleY = height / 100;

        const isIdle = mouse.x < 0 || mouse.x > 1 || mouse.y < 0 || mouse.y > 1;
        const mx = isIdle ? -100 : mouse.x * 100;
        const isPressed = isIdle ? false : mouse.isPressed;

        // 1. Update & Draw Drops
        ctx.lineWidth = 1;
        drops.current.forEach(d => {
            // Speed influenced by depth
            d.y += d.speed * d.z * (isPressed ? 3 : 1);

            // Interaction: "Wind" from mouse cursor
            if (!isIdle) {
                const dx = d.x - mx;
                // Repel horizontally
                if (Math.abs(dx) < 15) {
                    d.x += (dx / Math.abs(dx || 0.1)) * 0.5;
                }
            }

            if (d.y > 100) {
                // Splash effect
                if (Math.random() > 0.6) {
                    for (let i = 0; i < 2; i++) {
                        splashes.current.push({
                            x: d.x,
                            y: 100,
                            vx: (Math.random() - 0.5) * 1.5,
                            vy: -Math.random() * 1.5,
                            life: 1.0,
                            color: `rgba(255,255,255,${d.z * 0.5})`
                        });
                    }
                }
                d.y = -d.len;
                d.x = Math.random() * 100;
            }

            // Draw Drop
            const alpha = d.z * 0.4;
            ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
            ctx.beginPath();
            ctx.moveTo(d.x * scaleX, d.y * scaleY);
            ctx.lineTo(d.x * scaleX, (d.y - d.len * d.z) * scaleY);
            ctx.stroke();
        });

        // 2. Update & Draw Splashes
        for (let i = splashes.current.length - 1; i >= 0; i--) {
            const s = splashes.current[i];
            s.x += s.vx;
            s.y += s.vy;
            s.vy += 0.1; // Gravity
            s.life -= 0.05;

            if (s.life <= 0) {
                splashes.current.splice(i, 1);
                continue;
            }

            ctx.fillStyle = `rgba(255,255,255,${s.life * 0.5})`;
            ctx.beginPath();
            ctx.fillRect(s.x * scaleX, s.y * scaleY, 1.5, 1.5);
        }
    };

    return <PhysicsCanvas onInit={init} onUpdate={update} />;
};

// --- Nebula (3D Spiral) ---
export const VisualGalaxy: React.FC = () => {
    const stars = useRef<any[]>([]);

    const init = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
        stars.current = Array.from({ length: 400 }).map(() => ({
            angle: Math.random() * Math.PI * 2,
            radius: randomRange(5, 50),
            speed: randomRange(0.002, 0.008) * (Math.random() > 0.5 ? 1 : 0.8), // Differential rotation
            size: randomRange(0.5, 2),
            z: Math.random(), // 0 to 1
            color: Math.random() > 0.85 ? '#AADDFF' : 'white'
        }));
    };

    const update = (ctx: CanvasRenderingContext2D, width: number, height: number, mouse: { x: number, y: number, isPressed: boolean }) => {
        // Trail effect: Soft clear
        // We paint a semi-transparent black rectangle to fade out previous frames
        ctx.fillStyle = 'rgba(0,0,0,0.15)';
        ctx.fillRect(0, 0, width, height);

        const scaleX = width / 100;
        const scaleY = height / 100;
        const time = Date.now() * 0.001;

        const isIdle = mouse.x < 0 || mouse.x > 1 || mouse.y < 0 || mouse.y > 1;
        const mx = isIdle ? 50 + Math.sin(time * 0.5) * 40 : mouse.x * 100;
        const my = isIdle ? 50 + Math.cos(time * 0.5) * 40 : mouse.y * 100;
        const isPressed = isIdle ? false : mouse.isPressed;

        const tiltX = (mx - 50) * 0.015;
        const tiltY = (my - 50) * 0.015;

        stars.current.forEach(s => {
            s.angle += s.speed * (isPressed ? 8 : 1);

            // 3D Projection approximation
            const zVolume = (s.z - 0.5) * 30; // Depth [-15, 15]

            // X/Y on plane
            const xBase = Math.cos(s.angle) * s.radius;
            const yBase = Math.sin(s.angle) * s.radius;

            // Apply tilt
            // Rotating the entire galaxy plane based on mouse
            const x = xBase + zVolume * tiltX;
            const y = yBase * 0.6 + zVolume * tiltY; // 0.6 aspect ratio for tilted disk look

            const px = 50 + x;
            const py = 50 + y;

            // Perspective scale
            const perspective = 1 + (zVolume * tiltY) * 0.01;
            const scale = s.size * perspective * (0.6 + s.z * 0.6);

            // Opacity
            // Fade distant/small stars
            const alpha = 0.3 + (s.z * 0.7);

            ctx.beginPath();
            ctx.arc(px * scaleX, py * scaleY, Math.max(0.1, scale), 0, Math.PI * 2);
            ctx.fillStyle = s.color;
            ctx.globalAlpha = alpha;
            ctx.fill();
        });

        ctx.globalAlpha = 1;
    };

    return <PhysicsCanvas onInit={init} onUpdate={update} />;
};

// --- Noise Field (Dense Flow) ---
export const VisualFlow: React.FC = () => {
    const particles = useRef<any[]>([]);
    // Simple pseudo-random noise function
    const noise = (x: number, y: number) => {
        const sin = Math.sin(x * 12.9898 + y * 78.233);
        return (sin * 43758.5453) % 1;
    };

    const init = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
        // Reduced count from 2000 to 800 for less "busyness"
        particles.current = Array.from({ length: 800 }).map(() => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            vx: 0,
            vy: 0,
            life: Math.random(),
            maxLife: 1 + Math.random(),
            // Lower opacity for subtler look
            color: `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`
        }));
    };

    const update = (ctx: CanvasRenderingContext2D, width: number, height: number, mouse: { x: number, y: number, isPressed: boolean }) => {
        // Fade out for trails - increased fade for cleaner look
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fillRect(0, 0, width, height);

        const scaleX = width / 100;
        const scaleY = height / 100;
        const time = Date.now() * 0.0001; // Slower time

        const isIdle = mouse.x < 0 || mouse.x > 1 || mouse.y < 0 || mouse.y > 1;
        const mx = isIdle ? 50 : mouse.x * 100;
        const my = isIdle ? 50 : mouse.y * 100;

        particles.current.forEach(p => {
            // Noise-based flow
            const scale = 0.03; // Larger noise scale = smoother flow
            const n = noise(p.x * scale + time, p.y * scale + time) * Math.PI * 4;

            // Flow vector
            const fx = Math.cos(n);
            const fy = Math.sin(n);

            // Mouse influence
            const dx = mx - p.x;
            const dy = my - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const influence = Math.max(0, (30 - dist) / 30);

            // Apply forces - gentler
            p.vx += fx * 0.03;
            p.vy += fy * 0.03;

            if (influence > 0) {
                if (mouse.isPressed) {
                    p.vx += (dx / dist) * influence * 0.3;
                    p.vy += (dy / dist) * influence * 0.3;
                } else {
                    p.vx += (Math.random() - 0.5) * influence * 0.3;
                    p.vy += (Math.random() - 0.5) * influence * 0.3;
                }
            }

            // Friction and movement
            p.vx *= 0.95;
            p.vy *= 0.95;
            p.x += p.vx;
            p.y += p.vy;

            // Wrap around
            if (p.x < 0) p.x = 100;
            if (p.x > 100) p.x = 0;
            if (p.y < 0) p.y = 100;
            if (p.y > 100) p.y = 0;

            // Render
            ctx.fillStyle = p.color;
            ctx.fillRect(p.x * scaleX, p.y * scaleY, 1.5, 1.5);
        });
    };

    return <PhysicsCanvas onInit={init} onUpdate={update} />;
};

// --- Connections (Physics Chain) ---
export const VisualChain: React.FC = () => {
    // We use Verlet integration for stable string physics
    const chains = useRef<any[][]>([]);

    const init = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
        chains.current = [];
        const chainCount = 5;
        for (let i = 0; i < chainCount; i++) {
            const chain = [];
            const startX = 20 + i * (60 / (chainCount - 1));
            const segments = 15;
            for (let j = 0; j < segments; j++) {
                chain.push({
                    x: startX,
                    y: 10 + j * 5,
                    oldX: startX,
                    oldY: 10 + j * 5,
                    pinned: j === 0 // Pin the top node
                });
            }
            chains.current.push(chain);
        }
    };

    const update = (ctx: CanvasRenderingContext2D, width: number, height: number, mouse: { x: number, y: number, isPressed: boolean }) => {
        ctx.clearRect(0, 0, width, height);
        const scaleX = width / 100;
        const scaleY = height / 100;
        const time = Date.now() * 0.001;

        const isIdle = mouse.x < 0 || mouse.x > 1 || mouse.y < 0 || mouse.y > 1;
        const mx = isIdle ? 50 + Math.sin(time) * 30 : mouse.x * 100;
        const my = isIdle ? 50 + Math.cos(time * 0.5) * 30 : mouse.y * 100;
        const isPressed = isIdle ? false : mouse.isPressed;

        const gravity = 0.2;
        const friction = 0.95;
        const segmentLength = 5;

        chains.current.forEach((chain, chainIndex) => {
            // 1. Verlet Integration
            chain.forEach(p => {
                if (p.pinned) return;

                const vx = (p.x - p.oldX) * friction;
                const vy = (p.y - p.oldY) * friction;

                p.oldX = p.x;
                p.oldY = p.y;

                p.x += vx;
                p.y += vy;
                p.y += gravity;

                // Interaction
                const dx = p.x - mx;
                const dy = p.y - my;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 20) {
                    const force = (20 - dist) * 0.1;
                    const angle = Math.atan2(dy, dx);
                    // Push away
                    p.x += Math.cos(angle) * force;
                    p.y += Math.sin(angle) * force;
                }

                // Idle wind
                if (isIdle) {
                    p.x += Math.sin(time * 2 + p.y * 0.1 + chainIndex) * 0.02;
                }
            });

            // 2. Constraints (Iterative for stability)
            for (let k = 0; k < 5; k++) {
                for (let i = 0; i < chain.length - 1; i++) {
                    const p1 = chain[i];
                    const p2 = chain[i + 1];

                    const dx = p2.x - p1.x;
                    const dy = p2.y - p1.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist === 0) continue; // Prevent NaN

                    const diff = dist - segmentLength;
                    const percent = diff / dist / 2;
                    const offsetX = dx * percent;
                    const offsetY = dy * percent;

                    if (!p1.pinned) {
                        p1.x += offsetX;
                        p1.y += offsetY;
                    }
                    if (!p2.pinned) {
                        p2.x -= offsetX;
                        p2.y -= offsetY;
                    } else {
                        // If p1 is pinned, p2 takes all movement
                        p2.x -= offsetX * 2;
                        p2.y -= offsetY * 2;
                    }
                }
            }

            // 3. Draw
            ctx.beginPath();
            ctx.moveTo(chain[0].x * scaleX, chain[0].y * scaleY);
            for (let i = 1; i < chain.length; i++) {
                const p = chain[i];
                // Smooth curve using quadratic bezier
                // For last segment just draw line
                ctx.lineTo(p.x * scaleX, p.y * scaleY);
            }
            ctx.strokeStyle = `rgba(255,255,255,${0.5 + (chainIndex % 2) * 0.2})`;
            ctx.lineWidth = 2;
            ctx.stroke();

            // End cap
            const last = chain[chain.length - 1];
            ctx.beginPath();
            ctx.arc(last.x * scaleX, last.y * scaleY, 3, 0, Math.PI * 2);
            ctx.fillStyle = 'white';
            ctx.fill();
        });
    };

    return <PhysicsCanvas onInit={init} onUpdate={update} />;
};

// --- Shatter / Reform (Crystalline Mosaic) ---
export const VisualShatter: React.FC = () => {
    const shards = useRef<any[]>([]);
    const state = useRef<'solid' | 'shattering' | 'reforming'>('solid');

    const init = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
        shards.current = [];
        const hexRadius = 30;
        const centerX = 50;
        const centerY = 50;

        // Slightly more shards but very delicate
        for (let i = 0; i < 40; i++) {
            const angle = Math.random() * Math.PI * 2;
            const r = Math.sqrt(Math.random()) * hexRadius;
            const x = centerX + Math.cos(angle) * r;
            const y = centerY + Math.sin(angle) * r;

            shards.current.push({
                baseX: x,
                baseY: y,
                x: x,
                y: y,
                vx: 0,
                vy: 0,
                angle: Math.random() * Math.PI * 2,
                rotation: 0,
                vRotation: 0,
                size: 2 + Math.random() * 3,
                color: `rgba(255, 255, 255, ${0.3 + Math.random() * 0.4})` // Lower opacity
            });
        }
    };

    const update = (ctx: CanvasRenderingContext2D, width: number, height: number, mouse: { x: number, y: number, isPressed: boolean }) => {
        ctx.clearRect(0, 0, width, height);
        const scaleX = width / 100;
        const scaleY = height / 100;

        const isIdle = mouse.x < 0 || mouse.x > 1 || mouse.y < 0 || mouse.y > 1;

        if (mouse.isPressed) {
            state.current = 'shattering';
        } else if (!isIdle && state.current === 'shattering') {
            state.current = 'reforming';
        }

        if (isIdle && Math.random() < 0.005) {
            state.current = state.current === 'solid' ? 'shattering' : 'solid';
        }

        const mx = isIdle ? 50 : mouse.x * 100;
        const my = isIdle ? 50 : mouse.y * 100;

        shards.current.forEach(s => {
            if (state.current === 'shattering') {
                const dx = s.x - mx;
                const dy = s.y - my;
                const dist = Math.sqrt(dx * dx + dy * dy) + 0.1;

                const force = 150 / (dist * dist);
                s.vx += (dx / dist) * force;
                s.vy += (dy / dist) * force;
                s.vRotation += (Math.random() - 0.5) * 0.5;
            } else {
                const dx = s.baseX - s.x;
                const dy = s.baseY - s.y;
                s.vx += dx * 0.05;
                s.vy += dy * 0.05;

                s.rotation *= 0.9;
                s.vRotation *= 0.9;
            }

            s.vx *= 0.92;
            s.vy *= 0.92;
            s.x += s.vx;
            s.y += s.vy;
            s.rotation += s.vRotation;

            ctx.save();
            ctx.translate(s.x * scaleX, s.y * scaleY);
            ctx.rotate(s.rotation);
            ctx.beginPath();
            const sz = s.size * scaleX;
            ctx.moveTo(0, -sz);
            ctx.lineTo(sz, sz);
            ctx.lineTo(-sz, sz);
            ctx.closePath();

            // Stroke only for delicate look
            ctx.strokeStyle = s.color;
            ctx.lineWidth = 0.5; // Very thin lines
            ctx.stroke();
            // Optional: very faint fill
            ctx.fillStyle = s.color.replace(')', ', 0.1)').replace('rgb', 'rgba');
            ctx.fill();

            ctx.restore();
        });
    };

    return <PhysicsCanvas onInit={init} onUpdate={update} />;
};

// --- Sonar / Pulse ---
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

// --- The Bandwidth Paradox (Boids Flocking) ---
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

// --- The Invisible Service Standard (Magnet Field) ---
export const VisualMagnet: React.FC = () => {
    const filings = useRef<any[]>([]);

    const init = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
        filings.current = [];
        // Grid of lines
        for (let x = 4; x < 100; x += 3) {
            for (let y = 4; y < 100; y += 3) {
                filings.current.push({
                    baseX: x,
                    baseY: y,
                    x: x,
                    y: y,
                    vx: 0,
                    vy: 0,
                    angle: 0
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

        // In idle, we simulate a wandering magnetic anomaly
        const mx = isIdle ? 50 + Math.sin(time * 0.5) * 40 : mouse.x * 100;
        const my = isIdle ? 50 + Math.cos(time * 0.3) * 40 : mouse.y * 100;
        const isPressed = isIdle ? false : mouse.isPressed;

        ctx.lineWidth = 1;

        filings.current.forEach(f => {
            // 1. Spring force to base position (Elastic Recovery)
            const k = 0.03;
            const damping = 0.92;
            f.vx += (f.baseX - f.x) * k;
            f.vy += (f.baseY - f.y) * k;

            // 2. Mouse Interaction
            const dx = mx - f.x;
            const dy = my - f.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // "Breaking the Monolith" logic
            // The field is rigid until disrupted

            if (isPressed) {
                // Violent Repulsion (Breaking)
                if (dist < 40) {
                    const force = (40 - dist) * 1.5;
                    f.vx -= (dx / dist) * force;
                    f.vy -= (dy / dist) * force;
                }
            } else {
                // Hover: Magnetic repulsion/displacement (Tactile feel)
                if (dist < 30) {
                    const force = (30 - dist) * 0.1;
                    f.vx -= (dx / dist) * force;
                    f.vy -= (dy / dist) * force;
                }
            }

            // Add some noise/turbulence
            f.vx += (Math.random() - 0.5) * 0.05;
            f.vy += (Math.random() - 0.5) * 0.05;

            // Physics Integration
            f.vx *= damping;
            f.vy *= damping;
            f.x += f.vx;
            f.y += f.vy;

            // Visualization
            const speed = Math.sqrt(f.vx * f.vx + f.vy * f.vy);

            // Calculate rotation
            // Idle/Base: Align with noise/flow
            let angle = Math.sin(time + f.baseX * 0.1) * 0.3 + Math.cos(time + f.baseY * 0.1) * 0.3;

            // Influence by mouse field if close
            if (dist < 50) {
                const fieldAngle = Math.atan2(dy, dx);
                // Blend based on distance
                const influence = Math.max(0, 1 - dist / 50);
                // Simple interpolation (lerp) for angle isn't perfect but works for small deltas
                // If moving fast, align with velocity (chaos)
                if (speed > 0.5) {
                    angle = Math.atan2(f.vy, f.vx);
                } else {
                    // Align away/towards center? 
                    // Let's make them point at the mouse like compass needles
                    angle = fieldAngle;
                }
            } else if (speed > 0.2) {
                angle = Math.atan2(f.vy, f.vx);
            }

            const len = 2 + speed * 4;
            const alpha = 0.2 + Math.min(0.8, speed * 0.8);

            ctx.save();
            ctx.translate(f.x * scaleX, f.y * scaleY);
            ctx.rotate(angle);
            ctx.beginPath();
            ctx.moveTo(-len / 2, 0);
            ctx.lineTo(len / 2, 0);
            ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
            ctx.stroke();
            ctx.restore();
        });
    };

    return <PhysicsCanvas onInit={init} onUpdate={update} />;
};

// --- Vortex Suction (Dense) ---
export const VisualVortex: React.FC = () => {
    const particles = useRef<Particle[]>([]);

    const init = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
        particles.current = Array.from({ length: 1000 }).map((_, i) => {
            const angle = Math.random() * Math.PI * 2;
            // Bias distribution towards center for density
            const r = Math.pow(Math.random(), 2) * 60;
            return {
                id: i,
                pos: { x: 50 + Math.cos(angle) * r, y: 50 + Math.sin(angle) * r },
                vel: { x: 0, y: 0 },
                acc: { x: 0, y: 0 },
                radius: Math.random() < 0.8 ? randomRange(0.5, 1.0) : randomRange(1.5, 2.5), // Mix of small and large
                life: 1,
                color: 'rgba(255, 255, 255, 0.6)',
                mass: 1
            };
        });
    };

    const update = (ctx: CanvasRenderingContext2D, width: number, height: number, mouse: { x: number, y: number, isPressed: boolean }) => {
        ctx.clearRect(0, 0, width, height);
        const scaleX = width / 100;
        const scaleY = height / 100;

        const time = Date.now() * 0.001;
        const isIdle = mouse.x < 0 || mouse.x > 1 || mouse.y < 0 || mouse.y > 1;
        const mx = isIdle ? 50 : mouse.x * 100;
        const my = isIdle ? 50 : mouse.y * 100;
        const isPressed = isIdle ? false : mouse.isPressed;

        particles.current.forEach(p => {
            const dx = mx - p.pos.x;
            const dy = my - p.pos.y;
            const dist = Math.sqrt(dx * dx + dy * dy) + 0.1;
            const angle = Math.atan2(dy, dx);

            // Forces - Slowed down significantly
            const suction = isPressed ? 0.8 : 0.15; // Reduced from 2.0 / 0.5
            const rotation = isPressed ? 1.5 : 0.3; // Reduced from 4.0 / 1.0

            // Tangential (Rotation) + Radial (Suction)
            p.acc.x += Math.cos(angle) * (suction / dist);
            p.acc.y += Math.sin(angle) * (suction / dist);
            p.acc.x += Math.cos(angle + Math.PI / 2) * (rotation / Math.sqrt(dist));
            p.acc.y += Math.sin(angle + Math.PI / 2) * (rotation / Math.sqrt(dist));

            // Physics
            p.vel.x += p.acc.x;
            p.vel.y += p.acc.y;
            p.vel.x *= 0.94; // Increased drag (lower number) to slow movement
            p.vel.y *= 0.94;
            p.pos.x += p.vel.x;
            p.pos.y += p.vel.y;
            p.acc = { x: 0, y: 0 };

            // Reset if sucked in too close or drifted too far
            if (dist < 1 || dist > 80) {
                const a = Math.random() * Math.PI * 2;
                const r = 50 + Math.random() * 10;
                p.pos.x = mx + Math.cos(a) * r;
                p.pos.y = my + Math.sin(a) * r;
                p.vel = { x: 0, y: 0 };
            }

            // Render with depth approximation (opacity based on velocity/dist)
            const alpha = Math.min(1, (p.vel.x * p.vel.x + p.vel.y * p.vel.y) * 0.5 + 0.2);

            ctx.beginPath();
            ctx.arc(p.pos.x * scaleX, p.pos.y * scaleY, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.fill();
        });
    };

    return <PhysicsCanvas onInit={init} onUpdate={update} />;
};
