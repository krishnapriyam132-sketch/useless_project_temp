import React from 'react';
import { Shield, Sparkles, Wind, Microscope, ArrowDown } from 'lucide-react';

export function HeroSection({ onScrollToScan }) {
  return (
    <section style={{
      padding: '3.5rem 0 2rem 0',
      textAlign: 'center',
      position: 'relative'
    }}>
      <div className="container" style={{ maxWidth: '960px' }}>
        {/* Certification Badge */}
        <div style={{ display: 'inline-flex', marginBottom: '1.25rem' }}>
          <div className="badge-clinical" style={{
            background: 'var(--color-light-blue)',
            padding: '0.4rem 1rem',
            border: '1px solid var(--color-border-bright)'
          }}>
            <Microscope size={15} color="var(--color-deep-blue)" />
            <span>CLINICAL BIO-AERODYNAMICS PLATFORM • USELESS 3.0 GOLD MEDAL ENTRY</span>
          </div>
        </div>

        {/* Main Headline */}
        <h1 style={{
          fontSize: 'clamp(2.2rem, 4.8vw, 3.8rem)',
          lineHeight: 1.15,
          color: 'var(--color-navy)',
          fontWeight: 800,
          marginBottom: '1.25rem',
          letterSpacing: '-0.035em'
        }}>
          Unprecedented Precision in <br />
          <span style={{
            background: 'linear-gradient(135deg, var(--color-deep-blue) 0%, var(--color-bright-blue) 60%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Completely Useless Eyelash Science.
          </span>
        </h1>

        {/* Serious Scientific Subtitle */}
        <p style={{
          fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
          color: 'var(--color-text-muted)',
          maxWidth: '780px',
          margin: '0 auto 2.25rem auto',
          lineHeight: 1.6
        }}>
          LashScore™ leverages paraxial computer vision and simulated Navier-Stokes fluid mechanics to 
          quantify individual ciliary follicles, compute aerodynamic drag coefficients, and deliver 
          deeply condescending evolutionary assessments of your blink aerodynamics.
        </p>

        {/* Micro-Telemetry Banner */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          maxWidth: '860px',
          margin: '0 auto 2.5rem auto'
        }}>
          <div className="clinical-card" style={{ padding: '1.2rem', textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <Sparkles size={16} color="var(--color-bright-blue)" />
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>
                GLOBAL FOLICULAR REPO
              </span>
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-navy)', fontFamily: 'var(--font-mono)' }}>
              18,491,204
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>
              Lashes Cataloged Worldwide
            </div>
          </div>

          <div className="clinical-card" style={{ padding: '1.2rem', textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <Wind size={16} color="var(--color-deep-blue)" />
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>
                MEAN AERO DRAG (Cd)
              </span>
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-navy)', fontFamily: 'var(--font-mono)' }}>
              0.418 <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--color-bright-blue)' }}>±0.03</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>
              Comparable to '98 Honda Civic
            </div>
          </div>

          <div className="clinical-card" style={{ padding: '1.2rem', textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <Shield size={16} color="var(--color-bright-blue)" />
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>
                CLINICAL UTILITY RATE
              </span>
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-navy)', fontFamily: 'var(--font-mono)' }}>
              0.00%
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>
              100% Statistically Unnecessary
            </div>
          </div>
        </div>

        {/* Scroll down trigger */}
        <button
          onClick={onScrollToScan}
          className="btn btn-primary"
          style={{
            padding: '0.95rem 2rem',
            fontSize: '1rem',
            borderRadius: '14px',
            boxShadow: '0 8px 25px rgba(33, 150, 243, 0.35)'
          }}
        >
          <span>Initiate Ciliary Biometric Scan</span>
          <ArrowDown size={18} />
        </button>
      </div>
    </section>
  );
}
