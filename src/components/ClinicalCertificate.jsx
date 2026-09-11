import React, { useEffect } from 'react';
import { Award, Printer, X, ShieldCheck, CheckCircle2, Download } from 'lucide-react';
import confetti from 'canvas-confetti';

export function ClinicalCertificate({ results, imageName, onClose }) {
  const { overallScore, grade, metrics, protocolId, timestamp } = results;

  useEffect(() => {
    // Fire celebratory confetti on certificate generation
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0B4F9C', '#2196F3', '#EAF5FF', '#082B52', '#FFD700']
      });
    } catch (e) {
      // ignore
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-backdrop" style={{ zIndex: 1100 }}>
      <div style={{
        maxWidth: '840px',
        width: '100%',
        maxHeight: '92vh',
        overflowY: 'auto',
        position: 'relative'
      }}>
        {/* Floating action bar */}
        <div className="no-print" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(8px)',
          padding: '0.75rem 1.25rem',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-navy)' }}>
            <Award size={18} color="var(--color-deep-blue)" />
            <span>Official Clinical Ciliary Accreditation Document</span>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={handlePrint} className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.82rem' }}>
              <Printer size={15} />
              <span>Print / Save as PDF</span>
            </button>
            <button onClick={onClose} className="btn btn-ghost" style={{ padding: '0.5rem' }}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* The Printable Certificate */}
        <div className="certificate-print-zone" style={{
          background: '#FFFFFF',
          padding: '3.5rem 3rem',
          borderRadius: '16px',
          boxShadow: '0 25px 70px rgba(8, 43, 82, 0.35)',
          border: '8px double var(--color-deep-blue)',
          position: 'relative',
          color: 'var(--color-navy)',
          fontFamily: 'var(--font-sans)'
        }}>
          {/* Watermark */}
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.035,
            pointerEvents: 'none',
            fontSize: '12rem',
            fontWeight: 900,
            userSelect: 'none'
          }}>
            LASH
          </div>

          {/* Certificate Header */}
          <div style={{ textAlign: 'center', borderBottom: '2px solid var(--color-deep-blue)', paddingBottom: '1.75rem', marginBottom: '2rem' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              color: 'var(--color-deep-blue)',
              textTransform: 'uppercase',
              marginBottom: '0.5rem'
            }}>
              <ShieldCheck size={14} />
              INTERNATIONAL INSTITUTE FOR SUPERFLUOUS OCULAR BIOMETRICS
            </div>
            
            <h1 style={{
              fontSize: '2.2rem',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'var(--color-navy)',
              margin: '0.25rem 0'
            }}>
              OFFICIAL CILIARY PATHOLOGY ACCREDITATION
            </h1>

            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
              CERTIFICATE IDENTIFIER: {protocolId} • ISSUED UNDER PROTOCOL ISO-2026-USELESS
            </p>
          </div>

          {/* Body Statement */}
          <div style={{ textAlign: 'center', marginBottom: '2rem', lineHeight: 1.6 }}>
            <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
              This certifies that the ocular specimen of subject:
            </p>
            <div style={{
              fontSize: '1.6rem',
              fontWeight: 800,
              color: 'var(--color-deep-blue)',
              borderBottom: '1px dashed var(--color-border)',
              display: 'inline-block',
              padding: '0 2rem 0.25rem 2rem',
              marginBottom: '0.75rem'
            }}>
              {imageName || 'ANONYMOUS CILIARY SUBJECT'}
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-main)', maxWidth: '620px', margin: '0 auto' }}>
              has undergone algorithmic paraxial ciliary quantitation, Navier-Stokes drag coefficient profiling, 
              and saccadic turbulence modeling, attaining an aggregate follicular performance index of:
            </p>
          </div>

          {/* Center Score Seal Banner */}
          <div style={{
            background: 'var(--color-light-blue)',
            border: '2px solid var(--color-border-bright)',
            borderRadius: '12px',
            padding: '1.5rem',
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--color-deep-blue)', fontWeight: 700, marginBottom: '0.25rem' }}>
              OFFICIAL LASHSCORE™ COMPOSITE RATING
            </div>
            <div style={{ fontSize: '3.6rem', fontWeight: 900, color: 'var(--color-navy)', lineHeight: 1, fontFamily: 'var(--font-mono)' }}>
              {overallScore} <span style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-bright-blue)' }}>/ 100</span>
            </div>
            <div style={{
              display: 'inline-block',
              marginTop: '0.5rem',
              padding: '4px 14px',
              borderRadius: '999px',
              background: 'var(--color-deep-blue)',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.85rem',
              fontFamily: 'var(--font-mono)'
            }}>
              {grade.code}: {grade.title.toUpperCase()}
            </div>
          </div>

          {/* Telemetry Breakdown Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
            marginBottom: '2.5rem',
            background: 'var(--color-bg)',
            padding: '1.25rem',
            borderRadius: '8px',
            border: '1px solid var(--color-border)'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>CILIARY COUNT</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-navy)' }}>{metrics.totalCount} Follicles</div>
              <div style={{ fontSize: '0.68rem', color: 'var(--color-text-light)' }}>{metrics.upperCount} Sup / {metrics.lowerCount} Inf</div>
            </div>

            <div style={{ textAlign: 'center', borderLeft: '1px solid var(--color-border)', borderRight: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>DRAG COEFFICIENT</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-navy)' }}>{metrics.dragCoeff} Cd</div>
              <div style={{ fontSize: '0.68rem', color: 'var(--color-text-light)' }}>Sub-Sonic Laminar</div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>DRAMATIC FLUTTER</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-navy)' }}>{metrics.flutterPotential} / 10</div>
              <div style={{ fontSize: '0.68rem', color: 'var(--color-text-light)' }}>{metrics.flutterClassification.split(':')[0]}</div>
            </div>
          </div>

          {/* Signature & Seal Footer */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            borderTop: '1px solid var(--color-border)',
            paddingTop: '1.5rem'
          }}>
            {/* Seal Graphic */}
            <div style={{
              width: '90px',
              height: '90px',
              borderRadius: '50%',
              border: '3px double var(--color-deep-blue)',
              background: 'radial-gradient(circle, #FFFFFF 50%, var(--color-light-blue) 100%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '4px',
              boxShadow: '0 0 15px rgba(11, 79, 156, 0.15)'
            }}>
              <Award size={24} color="var(--color-deep-blue)" />
              <div style={{ fontSize: '0.45rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--color-navy)', marginTop: '2px' }}>
                VERIFIED SEAL<br />USELESS 3.0
              </div>
            </div>

            {/* Barcode representation */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'monospace',
                letterSpacing: '3px',
                fontSize: '1.4rem',
                color: 'var(--color-navy)',
                userSelect: 'none'
              }}>
                |||| | |||||| | ||| |||| |
              </div>
              <div style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>
                {timestamp.slice(0, 10)} • HASH: {protocolId.slice(-6)}
              </div>
            </div>

            {/* Doctor Signature */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'cursive',
                fontSize: '1.4rem',
                color: 'var(--color-deep-blue)',
                borderBottom: '1px solid var(--color-navy)',
                paddingBottom: '2px',
                marginBottom: '4px'
              }}>
                Dr. Bartholomew Follicle, Ph.D.
              </div>
              <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>
                Chair of Superfluous Ophthalmic Aerodynamics
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
