import React from 'react';
import { 
  Award, 
  Wind, 
  Eye, 
  Compass, 
  ShieldCheck, 
  Flame, 
  FileText, 
  Layers, 
  BarChart3, 
  AlertTriangle,
  Sparkles,
  Info
} from 'lucide-react';

export function ResultsDashboard({ 
  results, 
  imageName, 
  onViewInspector, 
  onViewCertificate, 
  onViewComparison 
}) {
  const { overallScore, grade, metrics, clinicalFindings, evolutionaryDiagnosis, clinicalRecommendation, protocolId } = results;

  return (
    <div id="results-dashboard" style={{ margin: '2rem 0 3.5rem 0' }}>
      <div className="container" style={{ maxWidth: '1120px' }}>
        
        {/* Top Hero Composite Card */}
        <div className="clinical-card" style={{
          background: 'linear-gradient(135deg, #FFFFFF 0%, #F5FAFF 100%)',
          border: '1.5px solid var(--color-border-bright)',
          padding: '2rem 2.25rem',
          marginBottom: '2rem',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            borderBottom: '1px solid var(--color-deep-blue-10)',
            paddingBottom: '1.75rem',
            marginBottom: '1.75rem'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.35rem' }}>
                <span className="badge-clinical active">
                  <span className="pulse-dot"></span>
                  ANALYSIS VALIDATED
                </span>
                <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>
                  PROTOCOL: {protocolId}
                </span>
              </div>
              <h2 style={{ fontSize: '1.85rem', color: 'var(--color-navy)', letterSpacing: '-0.02em' }}>
                Ocular Ciliary Pathology Assessment
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                Target Specimen: <strong style={{ color: 'var(--color-deep-blue)' }}>{imageName}</strong> • Calibrated via 11.8mm Corneal Paraxial Constant
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                onClick={onViewInspector}
                className="btn btn-primary"
                style={{ fontSize: '0.85rem', padding: '0.65rem 1.25rem' }}
              >
                <Layers size={16} />
                <span>Interactive Mask Inspector</span>
              </button>
              
              <button
                onClick={onViewCertificate}
                className="btn btn-secondary"
                style={{ fontSize: '0.85rem', padding: '0.65rem 1.25rem' }}
              >
                <FileText size={16} />
                <span>Certified Clinical Report</span>
              </button>

              <button
                onClick={onViewComparison}
                className="btn btn-ghost"
                style={{ fontSize: '0.85rem', padding: '0.65rem 1rem', border: '1px solid var(--color-border)' }}
              >
                <BarChart3 size={16} color="var(--color-deep-blue)" />
                <span>Species Benchmark</span>
              </button>
            </div>
          </div>

          {/* Composite Score Banner */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            alignItems: 'center'
          }}>
            {/* Score Wheel */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }}>
              <div style={{
                width: '110px',
                height: '110px',
                borderRadius: '50%',
                background: 'conic-gradient(var(--color-bright-blue) 0%, var(--color-deep-blue) 75%, var(--color-light-blue) 75%)',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 20px rgba(33, 150, 243, 0.3)',
                flexShrink: 0
              }}>
                <div style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-navy)', lineHeight: 1 }}>
                    {overallScore}
                  </span>
                  <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>
                    / 100 LASH
                  </span>
                </div>
              </div>

              <div>
                <div style={{
                  display: 'inline-block',
                  background: 'rgba(33, 150, 243, 0.12)',
                  color: 'var(--color-deep-blue)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '4px',
                  marginBottom: '0.35rem'
                }}>
                  {grade.code}
                </div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--color-navy)', marginBottom: '0.35rem' }}>
                  {grade.title}
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: 1.4 }}>
                  {grade.description}
                </p>
              </div>
            </div>

            {/* Evolutionary Allocation Bar */}
            <div style={{
              background: 'var(--color-light-blue)',
              padding: '1.25rem 1.5rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(33, 150, 243, 0.2)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.78rem',
                fontFamily: 'var(--font-mono)',
                marginBottom: '0.75rem'
              }}>
                <span style={{ fontWeight: 700, color: 'var(--color-navy)' }}>EVOLUTIONARY UTILITY MATRIX</span>
                <span style={{ color: 'var(--color-deep-blue)' }}>ISO-DARWIN-99</span>
              </div>

              {/* Stacked Progress Bar */}
              <div style={{
                height: '12px',
                borderRadius: '6px',
                display: 'flex',
                overflow: 'hidden',
                marginBottom: '0.75rem',
                border: '1px solid rgba(11, 79, 156, 0.15)'
              }}>
                <div style={{ width: `${evolutionaryDiagnosis.vanityPercent}%`, background: 'var(--color-deep-blue)' }} title="Aesthetic Vanity"></div>
                <div style={{ width: `${evolutionaryDiagnosis.defensePercent}%`, background: 'var(--color-bright-blue)' }} title="Debris Defense"></div>
                <div style={{ width: `${evolutionaryDiagnosis.windNoiseDampingPercent}%`, background: '#64B5F6' }} title="Wind Damping"></div>
                <div style={{ width: '2%', background: '#90CAF9' }} title="Real Clinical Purpose"></div>
              </div>

              {/* Legend */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.72rem', fontFamily: 'var(--font-mono)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: 'var(--color-deep-blue)' }}></span>
                  <span>Vanity: {evolutionaryDiagnosis.vanityPercent}%</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: 'var(--color-bright-blue)' }}></span>
                  <span>Dust Defense: {evolutionaryDiagnosis.defensePercent}%</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#90CAF9' }}></span>
                  <span>Real Utility: 0.02%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Key Biometric Metric Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem'
        }}>
          {/* Metric 1: Total Ciliary Count */}
          <div className="clinical-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>
                  BIOMETRIC METRIC 01
                </span>
                <h4 style={{ fontSize: '1.05rem', color: 'var(--color-navy)', marginTop: '2px' }}>
                  Total Ciliary Count (TCC)
                </h4>
              </div>
              <div style={{
                padding: '0.5rem',
                borderRadius: '8px',
                background: 'var(--color-light-blue)',
                color: 'var(--color-deep-blue)'
              }}>
                <Eye size={20} />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--color-navy)', fontFamily: 'var(--font-mono)', lineHeight: 1 }}>
                {metrics.totalCount}
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                visible follicles
              </span>
            </div>

            <div style={{ background: 'var(--color-bg)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
              <div className="telemetry-row">
                <span className="telemetry-key">Superior Lashes (Upper):</span>
                <span className="telemetry-val">{metrics.upperCount} units</span>
              </div>
              <div className="telemetry-row">
                <span className="telemetry-key">Inferior Lashes (Lower):</span>
                <span className="telemetry-val">{metrics.lowerCount} units</span>
              </div>
              <div className="telemetry-row">
                <span className="telemetry-key">Sup/Inf Ciliary Ratio:</span>
                <span className="telemetry-val">{metrics.ratio}:1 (Avg: 2.3:1)</span>
              </div>
            </div>
          </div>

          {/* Metric 2: Ciliary Lift Index */}
          <div className="clinical-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>
                  BIOMETRIC METRIC 02
                </span>
                <h4 style={{ fontSize: '1.05rem', color: 'var(--color-navy)', marginTop: '2px' }}>
                  Ciliary Lift Index (CLI)
                </h4>
              </div>
              <div style={{
                padding: '0.5rem',
                borderRadius: '8px',
                background: 'var(--color-light-blue)',
                color: 'var(--color-deep-blue)'
              }}>
                <Compass size={20} />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--color-navy)', fontFamily: 'var(--font-mono)', lineHeight: 1 }}>
                {metrics.avgAngle}°
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                angular elevation
              </span>
            </div>

            <div style={{ background: 'var(--color-bg)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
              <div className="telemetry-row">
                <span className="telemetry-key">Aerodynamic Formation:</span>
                <span className="telemetry-val">Hyperbolic Winglet</span>
              </div>
              <div className="telemetry-row">
                <span className="telemetry-key">Mean Follicle Length:</span>
                <span className="telemetry-val">{metrics.avgLength} mm</span>
              </div>
              <div className="telemetry-row">
                <span className="telemetry-key">Laminar Separation:</span>
                <span className="telemetry-val">Minimal Stall</span>
              </div>
            </div>
          </div>

          {/* Metric 3: Aerodynamic Drag Coefficient */}
          <div className="clinical-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>
                  BIOMETRIC METRIC 03
                </span>
                <h4 style={{ fontSize: '1.05rem', color: 'var(--color-navy)', marginTop: '2px' }}>
                  Follicular Drag Coeff (Cd)
                </h4>
              </div>
              <div style={{
                padding: '0.5rem',
                borderRadius: '8px',
                background: 'var(--color-light-blue)',
                color: 'var(--color-deep-blue)'
              }}>
                <Wind size={20} />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--color-navy)', fontFamily: 'var(--font-mono)', lineHeight: 1 }}>
                {metrics.dragCoeff}
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                dimensionless Cd
              </span>
            </div>

            <div style={{ background: 'var(--color-bg)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
              <div className="telemetry-row">
                <span className="telemetry-key">Vehicle Equivalent:</span>
                <span className="telemetry-val" style={{ fontSize: '0.75rem' }}>{metrics.dragComparison}</span>
              </div>
              <div className="telemetry-row">
                <span className="telemetry-key">Wind-Tunnel Score:</span>
                <span className="telemetry-val">Sub-Sonic Compliant</span>
              </div>
            </div>
          </div>

          {/* Metric 4: Blink Wind-Shear Force */}
          <div className="clinical-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>
                  BIOMETRIC METRIC 04
                </span>
                <h4 style={{ fontSize: '1.05rem', color: 'var(--color-navy)', marginTop: '2px' }}>
                  Blink Wind-Shear Thrust
                </h4>
              </div>
              <div style={{
                padding: '0.5rem',
                borderRadius: '8px',
                background: 'var(--color-light-blue)',
                color: 'var(--color-deep-blue)'
              }}>
                <Sparkles size={20} />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--color-navy)', fontFamily: 'var(--font-mono)', lineHeight: 1 }}>
                {metrics.blinkThrust}
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                Newtons / blink
              </span>
            </div>

            <div style={{ background: 'var(--color-bg)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
              <div className="telemetry-row">
                <span className="telemetry-key">Gnat Displacement Radius:</span>
                <span className="telemetry-val">4.2 cm</span>
              </div>
              <div className="telemetry-row">
                <span className="telemetry-key">Net Annual Propulsion:</span>
                <span className="telemetry-val">0.00042 km/yr</span>
              </div>
            </div>
          </div>

          {/* Metric 5: Debris Deflection Efficiency */}
          <div className="clinical-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>
                  BIOMETRIC METRIC 05
                </span>
                <h4 style={{ fontSize: '1.05rem', color: 'var(--color-navy)', marginTop: '2px' }}>
                  Particulate Deflection (DDE)
                </h4>
              </div>
              <div style={{
                padding: '0.5rem',
                borderRadius: '8px',
                background: 'var(--color-light-blue)',
                color: 'var(--color-deep-blue)'
              }}>
                <ShieldCheck size={20} />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--color-navy)', fontFamily: 'var(--font-mono)', lineHeight: 1 }}>
                {metrics.deflectionPct}%
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                filtration efficiency
              </span>
            </div>

            <div style={{ background: 'var(--color-bg)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
              <div className="telemetry-row">
                <span className="telemetry-key">Pollen Defense Rating:</span>
                <span className="telemetry-val">HEPA-Biological</span>
              </div>
              <div className="telemetry-row">
                <span className="telemetry-key">ISO Protocol:</span>
                <span className="telemetry-val">ASTM-F2100-USELESS</span>
              </div>
            </div>
          </div>

          {/* Metric 6: Dramatic Flutter Potential */}
          <div className="clinical-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>
                  BIOMETRIC METRIC 06
                </span>
                <h4 style={{ fontSize: '1.05rem', color: 'var(--color-navy)', marginTop: '2px' }}>
                  Dramatic Flutter Potential (DFP)
                </h4>
              </div>
              <div style={{
                padding: '0.5rem',
                borderRadius: '8px',
                background: 'var(--color-light-blue)',
                color: 'var(--color-deep-blue)'
              }}>
                <Flame size={20} />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--color-navy)', fontFamily: 'var(--font-mono)', lineHeight: 1 }}>
                {metrics.flutterPotential}
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                / 10.0 scale
              </span>
            </div>

            <div style={{ background: 'var(--color-bg)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
              <div className="telemetry-row">
                <span className="telemetry-key">Legal Hazard Status:</span>
                <span className="telemetry-val" style={{ color: 'var(--color-deep-blue)' }}>{metrics.flutterClassification}</span>
              </div>
              <div className="telemetry-row">
                <span className="telemetry-key">Seduction Radius:</span>
                <span className="telemetry-val">1.8 meters</span>
              </div>
            </div>
          </div>
        </div>

        {/* Clinical Findings & Recommendations Panel */}
        <div className="clinical-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <div className="clinical-card-header" style={{ margin: '-2rem -2rem 1.5rem -2rem', padding: '1.25rem 2rem' }}>
            <h3>
              <FileText size={18} color="var(--color-deep-blue)" />
              Automated Clinical Pathology Impression & Peer-Reviewed Commentary
            </h3>
            <div className="badge-clinical">
              AI CLINICAL SIGN-OFF
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '0.95rem', color: 'var(--color-navy)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Info size={16} color="var(--color-bright-blue)" />
              Ophthalmic Follicular Findings:
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {clinicalFindings.map((finding, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    fontSize: '0.86rem',
                    lineHeight: 1.5,
                    color: 'var(--color-text-main)',
                    background: 'var(--color-bg)',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    borderLeft: '3px solid var(--color-bright-blue)'
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--color-deep-blue)',
                    fontWeight: 700,
                    flexShrink: 0
                  }}>
                    [0{idx + 1}]
                  </span>
                  <span>{finding}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Official Recommendations */}
          <div style={{
            background: 'var(--color-light-blue)',
            padding: '1.25rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(33, 150, 243, 0.2)'
          }}>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--color-navy)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertTriangle size={16} color="var(--color-deep-blue)" />
              Official Ciliary Recommendations:
            </h4>
            <ul style={{ paddingLeft: '1.25rem', fontSize: '0.84rem', color: 'var(--color-text-main)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {clinicalRecommendation.map((rec, i) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
