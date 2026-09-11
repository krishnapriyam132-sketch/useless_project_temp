import React from 'react';
import { X, BookOpen, ExternalLink, CheckCircle, FileText } from 'lucide-react';

export function ScientificMethodologyModal({ onClose }) {
  return (
    <div className="modal-backdrop" style={{ zIndex: 1200 }}>
      <div className="clinical-card" style={{
        maxWidth: '820px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        background: '#FFFFFF',
        padding: '0',
        boxShadow: '0 25px 80px rgba(8, 43, 82, 0.4)'
      }}>
        {/* Header */}
        <div className="clinical-card-header" style={{ padding: '1.25rem 2rem', position: 'sticky', top: 0, zIndex: 10, background: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <BookOpen size={18} color="var(--color-deep-blue)" />
            <h3>Peer-Reviewed Clinical Whitepaper & Mathematical Formalism</h3>
          </div>
          <button onClick={onClose} className="btn btn-ghost" style={{ padding: '0.4rem' }}>
            <X size={20} />
          </button>
        </div>

        {/* Paper Content */}
        <div style={{ padding: '2.5rem 3rem', lineHeight: 1.7, fontSize: '0.92rem', color: 'var(--color-navy)' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              JOURNAL OF SUPERFLUOUS BIO-AERODYNAMICS • VOL. 14, ARTICLE 402 • USELESS 3.0 PROCEEDINGS
            </div>

            <h1 style={{ fontSize: '1.65rem', fontWeight: 800, lineHeight: 1.3, marginBottom: '0.75rem', color: 'var(--color-navy)' }}>
              Paraxial Ciliary Quantitation and Navier-Stokes Aerodynamic Boundary Modeling in Homo Sapiens: A Rigorous Methodology for an Entirely Useless Biometric
            </h1>

            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              <strong>Bartholomew Follicle, Ph.D.</strong><sup>1</sup>, 
              <strong>Cynthia Reticle, M.D.</strong><sup>2</sup>, 
              <strong>The International Ciliary Taskforce</strong><sup>3</sup>
            </div>
            <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-light)', marginTop: '0.35rem' }}>
              1. Department of Unnecessary Optics, Zurich • 2. Ocular Turbulence Institute, Boston
            </div>
          </div>

          {/* Abstract Box */}
          <div style={{
            background: 'var(--color-light-blue)',
            borderLeft: '4px solid var(--color-deep-blue)',
            padding: '1.25rem 1.5rem',
            borderRadius: '0 8px 8px 0',
            marginBottom: '2rem',
            fontSize: '0.86rem'
          }}>
            <h4 style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--color-deep-blue)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
              ABSTRACT
            </h4>
            <p style={{ color: 'var(--color-navy)' }}>
              While medical artificial intelligence has advanced oncology and genomics, the pressing challenge of precisely counting and aerodynamic profiling of human eyelashes has remained shamefully neglected. Here, we present <strong>LashScore 3.4</strong>, a real-time computer vision framework that segments individual ciliary follicles, computes laminar boundary drag coefficients ($C_d$), and models saccadic micro-turbulence. In clinical validation on 4,000 ocular specimens, LashScore achieved 99.4% paraxial precision while delivering exactly 0.00% diagnostic medical utility.
            </p>
          </div>

          {/* Section 1 */}
          <h3 style={{ fontSize: '1.15rem', color: 'var(--color-navy)', marginBottom: '0.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.25rem' }}>
            1. Mathematical Aerodynamic Modeling
          </h3>
          <p style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>
            Eyelashes operate as cylindrical cantilevered bluff bodies subject to cross-flow during forward ambulation and ocular saccades. The net aerodynamic drag force $F_d$ exerted upon the ocular margin is computed as:
          </p>

          <div style={{
            background: 'var(--color-bg)',
            padding: '1rem',
            borderRadius: '8px',
            textAlign: 'center',
            fontFamily: 'var(--font-mono)',
            fontSize: '1rem',
            color: 'var(--color-deep-blue)',
            margin: '1rem 0',
            border: '1px solid var(--color-border)'
          }}>
            F_d = ½ · ρ_air · v² · ∑ [ L_i · d_i · C_d(θ_i) ]
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
            where <em>L_i</em> is the individual follicle length, <em>d_i</em> is the follicular shaft caliber, and <em>θ_i</em> represents the ciliary elevation angle relative to the ocular horizontal plane.
          </p>

          {/* Section 2 */}
          <h3 style={{ fontSize: '1.15rem', color: 'var(--color-navy)', marginBottom: '0.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.25rem' }}>
            2. The Dramatic Flutter Potential (DFP) Equation
          </h3>
          <p style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>
            Subject flutter frequency during rapid intentional blinking (often misdiagnosed as flirting) induces vortex shedding at frequency <em>f_vortex</em>:
          </p>

          <div style={{
            background: 'var(--color-bg)',
            padding: '1rem',
            borderRadius: '8px',
            textAlign: 'center',
            fontFamily: 'var(--font-mono)',
            fontSize: '1rem',
            color: 'var(--color-deep-blue)',
            margin: '1rem 0',
            border: '1px solid var(--color-border)'
          }}>
            DFP = (N_superior / 12) + (L_mean / 1.5) · St · sin(θ_mean)
          </div>

          {/* Section 3: Ethics */}
          <h3 style={{ fontSize: '1.15rem', color: 'var(--color-navy)', marginBottom: '0.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.25rem' }}>
            3. Ethical Declarations & Useless 3.0 Disclaimers
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
            This study was conducted in strict accordance with the Declaration of Helsinki and Useless 3.0 Hackathon regulations. The authors declare no conflict of interest, except for a shared clinical obsession with eyelashes. No cosmetics companies were bribed or harmed during this endeavor.
          </p>

          {/* Footer close */}
          <div style={{ textAlign: 'center', borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem' }}>
            <button onClick={onClose} className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>
              Return to Diagnostic Platform
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
