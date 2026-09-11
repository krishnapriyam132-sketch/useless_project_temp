import React from 'react';
import { Eye, Volume2, VolumeX, FileText, Activity, ShieldCheck, RefreshCw } from 'lucide-react';
import { soundEngine } from '../utils/audioSynthesizer';

export function Navbar({ isMuted, setIsMuted, onOpenWhitepaper, hasResult, onResetScan }) {
  const handleToggleSound = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      soundEngine.playRadarBlip(660);
    }
  };

  return (
    <header style={{
      borderBottom: '1px solid var(--color-border)',
      background: 'rgba(255, 255, 255, 0.92)',
      backdropFilter: 'blur(16px)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '72px'
      }}>
        {/* Logo & Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, var(--color-deep-blue) 0%, var(--color-bright-blue) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(11, 79, 156, 0.25)',
            color: '#FFFFFF'
          }}>
            <Eye size={24} strokeWidth={2.2} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{
                fontSize: '1.25rem',
                fontWeight: '800',
                color: 'var(--color-navy)',
                letterSpacing: '-0.03em'
              }}>
                LashScore<span style={{ color: 'var(--color-bright-blue)' }}>™</span>
              </span>
              <span className="badge-clinical active">
                <span className="pulse-dot"></span>
                AI v3.4-BIO
              </span>
            </div>
            <p style={{
              fontSize: '0.72rem',
              color: 'var(--color-text-muted)',
              fontFamily: 'var(--font-mono)',
              marginTop: '-2px'
            }}>
              Ocular-Ciliary Neural Quantitation Engine
            </p>
          </div>
        </div>

        {/* Center Clinical Status Badges (Hidden on small screens) */}
        <div style={{
          display: 'none',
          alignItems: 'center',
          gap: '1.25rem',
          fontSize: '0.78rem',
          fontFamily: 'var(--font-mono)'
        }} className="nav-telemetry-desktop">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-text-muted)' }}>
            <Activity size={14} color="var(--color-bright-blue)" />
            <span>CALIBRATION: <strong style={{ color: 'var(--color-navy)' }}>11.8mm LIMBAL REF</strong></span>
          </div>
          <div style={{ width: '1px', height: '18px', background: 'var(--color-border)' }}></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-text-muted)' }}>
            <ShieldCheck size={14} color="var(--color-deep-blue)" />
            <span>IRB: <strong style={{ color: 'var(--color-navy)' }}>#00-USELESS-3.0</strong></span>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          {hasResult && (
            <button
              onClick={onResetScan}
              className="btn btn-secondary"
              style={{ padding: '0.55rem 0.95rem', fontSize: '0.82rem' }}
              title="Initiate New Ciliary Scan"
            >
              <RefreshCw size={15} />
              <span>New Patient Scan</span>
            </button>
          )}

          <button
            onClick={onOpenWhitepaper}
            className="btn btn-ghost"
            style={{ padding: '0.55rem 0.85rem', fontSize: '0.82rem' }}
            title="View Peer-Reviewed Whitepaper"
          >
            <FileText size={16} color="var(--color-deep-blue)" />
            <span style={{ display: 'inline' }}>Clinical Whitepaper</span>
          </button>

          <button
            onClick={handleToggleSound}
            className="btn btn-ghost"
            style={{
              padding: '0.55rem',
              color: isMuted ? 'var(--color-text-muted)' : 'var(--color-bright-blue)'
            }}
            title={isMuted ? 'Unmute Diagnostic Telemetry Audio' : 'Mute Diagnostic Audio'}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </div>
      </div>
      
      <style>{`
        @media (min-width: 860px) {
          .nav-telemetry-desktop {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
}
