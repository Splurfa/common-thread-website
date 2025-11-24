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

// --- Draft 2: Repulsor Grid -> Fabric ---
export const VisualGrid: React.FC = () => {
    const nodes = useRef<any[]>([]);
    const constraints = useRef<any[]>([]);

    const init = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
        nodes.current = [];
        constraints.current = [];
        const rows = 12;
        const cols = 12;
        const spacingX = 60 / (cols - 1);
        const spacingY = 60 / (rows - 1);
        
        // Create nodes (Centered grid)
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                nodes.current.push({
                    x: 20 + x * spacingX,
                    y: 20 + y * spacingY,
                    baseX: 20 + x * spacingX,
                    baseY: 20 + y * spacingY,
                    vx: 0,
                    vy: 0
                });
            }
        }

        // Create constraints (Springs)
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const i = y * cols + x;
                // Right neighbor
                if (x < cols - 1) constraints.current.push({ p1: i, p2: i + 1, len: spacingX });
                // Bottom neighbor
                if (y < rows - 1) constraints.current.push({ p1: i, p2: i + cols, len: spacingY });
            }
        }
    };

    const update = (ctx: CanvasRenderingContext2D, width: number, height: number, mouse: { x: number, y: number, isPressed: boolean }) => {
        ctx.clearRect(0, 0, width, height);
        const scaleX = width / 100;
        const scaleY = height / 100;

        const time = Date.now() * 0.001;
        const isIdle = mouse.x < 0 || mouse.x > 1 || mouse.y < 0 || mouse.y > 1;
        const mx = isIdle ? 50 + Math.sin(time * 0.5) * 30 : mouse.x * 100;
        const my = isIdle ? 50 + Math.cos(time * 0.3) * 30 : mouse.y * 100;
        const isPressed = isIdle ? false : mouse.isPressed;

        // 1. Accumulate Forces
        nodes.current.forEach(p => {
            // Spring to base (Keep the overall shape)
            const kBase = 0.05;
            p.vx += (p.baseX - p.x) * kBase;
            p.vy += (p.baseY - p.y) * kBase;

            // Mouse Interaction (Repulsion)
            const dx = p.x - mx;
            const dy = p.y - my;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 25) {
                const force = (25 - dist) * (isPressed ? 0.5 : 0.2);
                p.vx += (dx / dist) * force;
                p.vy += (dy / dist) * force;
            }
        });

        // 2. Resolve Constraints (Springs between nodes)
        const iterations = 3; // More stable with iterations
        for (let i = 0; i < iterations; i++) {
            constraints.current.forEach(c => {
                const n1 = nodes.current[c.p1];
                const n2 = nodes.current[c.p2];
                
                const dx = n2.x - n1.x;
                const dy = n2.y - n1.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const diff = (dist - c.len) * 0.1; // Stiffness
                
                if (dist > 0) {
                    const offX = (dx / dist) * diff;
                    const offY = (dy / dist) * diff;
                    
                    n1.vx += offX;
                    n1.vy += offY;
                    n2.vx -= offX;
                    n2.vy -= offY;
                }
            });
        }

        // 3. Integration
        nodes.current.forEach(p => {
            p.vx *= 0.9;
            p.vy *= 0.9;
            p.x += p.vx;
            p.y += p.vy;
        });

        // 4. Draw
        ctx.strokeStyle = 'rgba(255,255,255,0.15)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        constraints.current.forEach(c => {
            const n1 = nodes.current[c.p1];
            const n2 = nodes.current[c.p2];
            ctx.moveTo(n1.x * scaleX, n1.y * scaleY);
            ctx.lineTo(n2.x * scaleX, n2.y * scaleY);
        });
        ctx.stroke();

        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        nodes.current.forEach(p => {
            // Speed affects size
            const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
            const r = 1 + speed;
            ctx.beginPath();
            ctx.arc(p.x * scaleX, p.y * scaleY, r, 0, Math.PI * 2);
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

// --- Draft 4: Digital Rain -> Data Stream ---
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
                    for(let i=0; i<2; i++) {
                        splashes.current.push({
                            x: d.x,
                            y: 100,
                            vx: (Math.random()-0.5) * 1.5,
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
        for(let i=splashes.current.length-1; i>=0; i--) {
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

// --- Draft 5: Galaxy Spiral -> Nebula ---
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

// --- Draft 7: Tethered Chain -> Connections ---
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
            const last = chain[chain.length-1];
            ctx.beginPath();
            ctx.arc(last.x * scaleX, last.y * scaleY, 3, 0, Math.PI * 2);
            ctx.fillStyle = 'white';
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
            ctx.moveTo(-len/2, 0);
            ctx.lineTo(len/2, 0);
            ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
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
