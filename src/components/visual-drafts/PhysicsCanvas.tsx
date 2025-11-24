import React, { useRef, useEffect } from 'react';
import { useRelativeMouse } from '../Visuals';

interface PhysicsCanvasProps {
    onInit?: (ctx: CanvasRenderingContext2D, width: number, height: number) => void;
    onUpdate: (ctx: CanvasRenderingContext2D, width: number, height: number, mouse: { x: number, y: number, isPressed: boolean }) => void;
    className?: string;
}

export const PhysicsCanvas: React.FC<PhysicsCanvasProps> = ({ onInit, onUpdate, className = "w-full h-full" }) => {
    const { ref, mouseRef, handleMouseMove, handleTouchMove, handleMouseDown, handleMouseUp, handleTouchStart, handleTouchEnd } = useRelativeMouse();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const initializedRef = useRef(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        let animationId: number;

        const render = () => {
            // Handle Resize
            if (canvas.width !== canvas.offsetWidth || canvas.height !== canvas.offsetHeight) {
                canvas.width = canvas.offsetWidth;
                canvas.height = canvas.offsetHeight;
                initializedRef.current = false; // Re-init on resize if needed
            }

            const width = canvas.width;
            const height = canvas.height;

            // Init hook
            try {
                if (!initializedRef.current && onInit) {
                    onInit(ctx, width, height);
                    initializedRef.current = true;
                }

                // Update hook
                onUpdate(ctx, width, height, mouseRef.current);
            } catch (e) {
                console.error("PhysicsCanvas Error:", e);
                // Stop animation on error to prevent log spam
                return;
            }

            animationId = requestAnimationFrame(render);
        };

        render();
        return () => cancelAnimationFrame(animationId);
    }, [onInit, onUpdate, mouseRef]);

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className={`cursor-pointer ${className}`}
            style={{ touchAction: 'none' }}
        >
            <canvas ref={canvasRef} className="w-full h-full block" />
        </div>
    );
};
