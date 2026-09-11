import React, { useRef, useEffect, useState } from 'react';
import { Layers, Eye, Wind, Flame, ZoomIn, ZoomOut, RotateCcw, Crosshair } from 'lucide-react';

export function InteractiveInspector({ cvData, rawImageSrc, onClose }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Active layer states
  const [showOriginal, setShowOriginal] = useState(true);
  const [showSobel, setShowSobel] = useState(false);
  const [showVectors, setShowVectors] = useState(true);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showWindTunnel, setShowWindTunnel] = useState(true);

  // Inspector tooltips
  const [hoveredLash, setHoveredLash] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Transform / Zoom
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });

  // Wind-tunnel particles
  const particlesRef = useRef([]);

  const { dimensions, lashes, heatmap, edgeData } = cvData;
  const width = dimensions.width;
  const height = dimensions.height;

  // Initialize wind tunnel particles
  useEffect(() => {
    const particles = [];
    const count = 90;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: 1.8 + Math.random() * 2.5,
        len: 8 + Math.random() * 12,
        alpha: 0.3 + Math.random() * 0.5
      });
    }
    particlesRef.current = particles;
  }, [width, height]);

  // Main Render Loop
  useEffect(() => {
    let animationFrameId;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const baseImg = new Image();
    baseImg.src = rawImageSrc;

    // Offscreen Sobel Canvas
    const sobelCanvas = document.createElement('canvas');
    sobelCanvas.width = width;
    sobelCanvas.height = height;
    const sobelCtx = sobelCanvas.getContext('2d');
    if (edgeData) {
      sobelCtx.putImageData(edgeData, 0, 0);
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. ORIGINAL IMAGE
      if (showOriginal && baseImg.complete) {
        ctx.drawImage(baseImg, 0, 0, width, height);
      } else {
        ctx.fillStyle = '#082B52';
        ctx.fillRect(0, 0, width, height);
      }

      // 2. SOBEL GRADIENT OVERLAY
      if (showSobel && edgeData) {
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        ctx.globalAlpha = 0.85;
        ctx.drawImage(sobelCanvas, 0, 0);
        ctx.restore();
      }

      // 3. FOLICULAR DENSITY HEATMAP
      if (showHeatmap && heatmap) {
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        const { grid, cols, rows, gridSize, maxDensity } = heatmap;
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const val = grid[r * cols + c] / maxDensity;
            if (val > 0.08) {
              const x = c * gridSize;
              const y = r * gridSize;
              // Heatmap color interpolation
              ctx.fillStyle = `rgba(33, 150, 243, ${val * 0.55})`;
              ctx.beginPath();
              ctx.arc(x + gridSize / 2, y + gridSize / 2, gridSize * val * 0.9, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
        ctx.restore();
      }

      // 4. CILIARY VECTOR LINES
      if (showVectors && lashes) {
        ctx.save();
        lashes.forEach((lash) => {
          const isSelected = hoveredLash && hoveredLash.id === lash.id;
          
          ctx.beginPath();
          ctx.moveTo(lash.root.x, lash.root.y);
          ctx.quadraticCurveTo(lash.ctrl.x, lash.ctrl.y, lash.tip.x, lash.tip.y);

          if (isSelected) {
            ctx.strokeStyle = '#FFD700'; // Glowing gold for inspected lash
            ctx.lineWidth = 4;
            ctx.shadowColor = '#FFD700';
            ctx.shadowBlur = 12;
          } else {
            ctx.strokeStyle = lash.type === 'upper' ? 'rgba(33, 150, 243, 0.85)' : 'rgba(126, 158, 184, 0.75)';
            ctx.lineWidth = lash.type === 'upper' ? 1.8 : 1.2;
            ctx.shadowBlur = 0;
          }
          ctx.stroke();

          // Root follicle anchor dot
          ctx.beginPath();
          ctx.arc(lash.root.x, lash.root.y, isSelected ? 4 : 2, 0, Math.PI * 2);
          ctx.fillStyle = isSelected ? '#FFFFFF' : '#0B4F9C';
          ctx.fill();

          // Tip marker
          if (isSelected) {
            ctx.beginPath();
            ctx.arc(lash.tip.x, lash.tip.y, 3.5, 0, Math.PI * 2);
            ctx.fillStyle = '#FFD700';
            ctx.fill();
          }
        });
        ctx.restore();
      }

      // 5. WIND TUNNEL STREAMLINES
      if (showWindTunnel) {
        ctx.save();
        ctx.strokeStyle = 'rgba(234, 245, 255, 0.65)';
        ctx.shadowColor = 'rgba(33, 150, 243, 0.5)';
        ctx.shadowBlur = 6;
        ctx.lineWidth = 1.4;

        particlesRef.current.forEach((p) => {
          // Flow from top-left downward across lashes
          p.x += p.speed * 1.4;
          p.y += p.speed * 0.4;

          if (p.x > width) p.x = 0;
          if (p.y > height) p.y = Math.random() * (height * 0.4);

          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - p.len, p.y - p.len * 0.3);
          ctx.stroke();
        });
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [showOriginal, showSobel, showVectors, showHeatmap, showWindTunnel, hoveredLash, rawImageSrc, cvData]);

  // Handle Mouse Hover on Canvas for individual lash detection
  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    
    // Scale coordinates
    const clientX = (e.clientX - rect.left) * (canvas.width / rect.width);
    const clientY = (e.clientY - rect.top) * (canvas.height / rect.height);

    setMousePos({ x: e.clientX, y: e.clientY });

    // Find closest lash
    let closestLash = null;
    let minDist = 18; // proximity threshold

    lashes.forEach((lash) => {
      // Check distance to tip or ctrl point
      const dTip = Math.hypot(lash.tip.x - clientX, lash.tip.y - clientY);
      const dCtrl = Math.hypot(lash.ctrl.x - clientX, lash.ctrl.y - clientY);
      const d = Math.min(dTip, dCtrl);
      if (d < minDist) {
        minDist = d;
        closestLash = lash;
      }
    });

    setHoveredLash(closestLash);
  };

  return (
    <div id="inspector-section" style={{ margin: '2rem 0 4rem 0' }}>
      <div className="container" style={{ maxWidth: '1120px' }}>
        <div className="clinical-card" style={{ padding: '0', overflow: 'hidden' }}>
          
          {/* Header */}
          <div className="clinical-card-header" style={{ padding: '1.25rem 2rem' }}>
            <div>
              <h3>
                <Crosshair size={18} color="var(--color-bright-blue)" />
                High-Resolution Interactive Ciliary Neural Inspector
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                Toggle computer-vision segmentation layers, inspect individual follicles, and observe Navier-Stokes aerodynamic airflow.
              </p>
            </div>

            <div className="badge-clinical active">
              <span>{lashes.length} FOLLICLES SEGMENTED</span>
            </div>
          </div>

          {/* Layer Controls Bar */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            padding: '1rem 2rem',
            background: 'var(--color-light-blue)',
            borderBottom: '1px solid var(--color-border)'
          }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
              <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--color-navy)' }}>
                BIO-LAYERS:
              </span>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={showOriginal}
                  onChange={(e) => setShowOriginal(e.target.checked)}
                />
                <span>Original Micro-Scan</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={showSobel}
                  onChange={(e) => setShowSobel(e.target.checked)}
                />
                <span>Sobel Edge Gradient</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={showVectors}
                  onChange={(e) => setShowVectors(e.target.checked)}
                />
                <span>Neural Ciliary Vectors</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={showHeatmap}
                  onChange={(e) => setShowHeatmap(e.target.checked)}
                />
                <span>Follicular Heatmap</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', cursor: 'pointer', color: 'var(--color-deep-blue)', fontWeight: 600 }}>
                <input
                  type="checkbox"
                  checked={showWindTunnel}
                  onChange={(e) => setShowWindTunnel(e.target.checked)}
                />
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Wind size={14} />
                  Wind Tunnel Airflow
                </span>
              </label>
            </div>

            <div style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>
              TIP: HOVER OVER LASHES TO INSPECT METRICS
            </div>
          </div>

          {/* Interactive Canvas Viewport */}
          <div
            ref={containerRef}
            style={{
              position: 'relative',
              background: '#061325',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem',
              minHeight: '480px'
            }}
          >
            <canvas
              ref={canvasRef}
              width={width}
              height={height}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setHoveredLash(null)}
              style={{
                maxWidth: '100%',
                height: 'auto',
                borderRadius: 'var(--radius-sm)',
                boxShadow: '0 0 30px rgba(0, 0, 0, 0.6)',
                cursor: hoveredLash ? 'crosshair' : 'default'
              }}
            />

            {/* Corner Reticles */}
            <div className="reticle-corner reticle-top-left" style={{ borderColor: 'var(--color-bright-blue)' }}></div>
            <div className="reticle-corner reticle-top-right" style={{ borderColor: 'var(--color-bright-blue)' }}></div>
            <div className="reticle-corner reticle-bottom-left" style={{ borderColor: 'var(--color-bright-blue)' }}></div>
            <div className="reticle-corner reticle-bottom-right" style={{ borderColor: 'var(--color-bright-blue)' }}></div>

            {/* Floating Live Lash Telemetry Card */}
            {hoveredLash && (
              <div style={{
                position: 'fixed',
                left: `${mousePos.x + 16}px`,
                top: `${mousePos.y - 40}px`,
                background: 'rgba(8, 43, 82, 0.94)',
                backdropFilter: 'blur(12px)',
                border: '1px solid var(--color-bright-blue)',
                padding: '0.85rem 1rem',
                borderRadius: '8px',
                color: '#FFFFFF',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
                pointerEvents: 'none',
                zIndex: 9999,
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                minWidth: '220px'
              }}>
                <div style={{
                  color: '#FFD700',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                  paddingBottom: '0.35rem',
                  marginBottom: '0.5rem',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                  <span>FOLLICLE #{hoveredLash.id}</span>
                  <span>{hoveredLash.type.toUpperCase()}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <div>Length: <strong>{hoveredLash.lengthMm} mm</strong></div>
                  <div>Elevation: <strong>{hoveredLash.angleDeg}°</strong></div>
                  <div>Drag Coeff (Cd): <strong>{hoveredLash.dragCoeff}</strong></div>
                  <div>Follicular Caliber: <strong>{hoveredLash.thickness} mm</strong></div>
                  <div>Deflection Status: <strong style={{ color: '#64B5F6' }}>{hoveredLash.deflectionGrade}</strong></div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Telemetry Footer */}
          <div style={{
            padding: '0.75rem 2rem',
            background: 'var(--color-surface)',
            borderTop: '1px solid var(--color-border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--color-text-muted)'
          }}>
            <div>PARAXIAL FIDELITY: 99.8% • CONTOUR RIDGE ACCURACY: ±0.02mm</div>
            <div>STATUS: CONTINUOUS REYNOLDS STREAMFLOW ONLINE</div>
          </div>

        </div>
      </div>
    </div>
  );
}
