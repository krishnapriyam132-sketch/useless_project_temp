import React, { useEffect, useState } from 'react';
import { Activity, ShieldAlert, Cpu } from 'lucide-react';
import { soundEngine } from '../utils/audioSynthesizer';

const SCAN_STEPS = [
  { text: 'Calibrating corneal paraxial reference plane...', pct: 15 },
  { text: 'Computing 2D Sobel spatial intensity gradients...', pct: 35 },
  { text: 'Segmenting superior & inferior ciliary follicle vectors...', pct: 60 },
  { text: 'Simulating Navier-Stokes laminar drag & wind-shear tensors...', pct: 82 },
  { text: 'Cross-validating against Global Ciliary Archive v3.0...', pct: 95 },
  { text: 'Generating peer-reviewed clinical pathology impression...', pct: 100 }
];

export function ScanningModal({ onScanComplete }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progress, setProgress] = useState(10);
  const [telemetryLogs, setTelemetryLogs] = useState([
    'INITIALIZING BIO-IMAGING SUBSYSTEM...',
    'SENSOR FEED ACQUIRED: 640x480 RGB 24-BIT'
  ]);

  useEffect(() => {
    let step = 0;
    soundEngine.playScanSweep();

    const interval = setInterval(() => {
      step++;
      if (step < SCAN_STEPS.length) {
        setCurrentStepIndex(step);
        setProgress(SCAN_STEPS[step].pct);
        setTelemetryLogs((prev) => [
          ...prev,
          `[+${step * 420}ms] ${SCAN_STEPS[step].text}`
        ]);
        soundEngine.playRadarBlip(600 + step * 80);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          soundEngine.playDiagnosticComplete();
          onScanComplete();
        }, 400);
      }
    }, 450);

    return () => clearInterval(interval);
  }, [onScanComplete]);

  return (
    <div className="modal-backdrop">
      <div className="clinical-card" style={{
        maxWidth: '520px',
        width: '100%',
        padding: '2rem',
        background: '#FFFFFF',
        boxShadow: '0 20px 60px rgba(8, 43, 82, 0.3)',
        border: '1px solid var(--color-bright-blue)'
      }}>
        {/* Radar Spinner & Reticle */}
        <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 1.75rem auto' }}>
          {/* Concentric rings */}
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '2px solid rgba(11, 79, 156, 0.15)'
          }}></div>
          <div style={{
            position: 'absolute',
            inset: '16px',
            borderRadius: '50%',
            border: '1px dashed var(--color-bright-blue)',
            animation: 'spinClockwise 8s linear infinite'
          }}></div>
          <div style={{
            position: 'absolute',
            inset: '32px',
            borderRadius: '50%',
            background: 'var(--color-light-blue)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-deep-blue)'
          }}>
            <Cpu size={26} className="pulse-icon" />
          </div>

          {/* Sweeper blade */}
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            borderTop: '3px solid var(--color-bright-blue)',
            animation: 'spinClockwise 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite'
          }}></div>
        </div>

        {/* Status titles */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div className="badge-clinical active" style={{ marginBottom: '0.5rem' }}>
            <span className="pulse-dot"></span>
            ACTIVE DIAGNOSTIC PASS
          </div>
          <h3 style={{ fontSize: '1.3rem', color: 'var(--color-navy)', marginBottom: '0.25rem' }}>
            Quantifying Ciliary Matrix
          </h3>
          <p style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)' }}>
            {SCAN_STEPS[currentStepIndex].text}
          </p>
        </div>

        {/* Progress Bar */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
            marginBottom: '0.35rem',
            color: 'var(--color-text-muted)'
          }}>
            <span>PARAXIAL RESOLUTION</span>
            <span style={{ color: 'var(--color-deep-blue)', fontWeight: 700 }}>{progress}%</span>
          </div>
          <div style={{
            height: '8px',
            background: 'var(--color-light-blue)',
            borderRadius: '999px',
            overflow: 'hidden',
            border: '1px solid rgba(11, 79, 156, 0.1)'
          }}>
            <div style={{
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(90deg, var(--color-deep-blue) 0%, var(--color-bright-blue) 100%)',
              borderRadius: '999px',
              transition: 'width 0.4s ease'
            }}></div>
          </div>
        </div>

        {/* Telemetry Console */}
        <div style={{
          background: 'var(--color-navy)',
          color: '#80D0FF',
          padding: '0.85rem 1rem',
          borderRadius: 'var(--radius-sm)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.68rem',
          height: '110px',
          overflowY: 'auto',
          lineHeight: '1.5',
          border: '1px solid rgba(33, 150, 243, 0.3)'
        }}>
          {telemetryLogs.map((log, idx) => (
            <div key={idx} style={{ opacity: idx === telemetryLogs.length - 1 ? 1 : 0.75 }}>
              {log}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes spinClockwise {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .pulse-icon {
          animation: pulseIcon 1.2s ease-in-out infinite alternate;
        }
        @keyframes pulseIcon {
          from { transform: scale(0.9); opacity: 0.8; }
          to { transform: scale(1.1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
