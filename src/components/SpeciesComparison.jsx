import React from 'react';
import { Award, Dna, Info, HelpCircle } from 'lucide-react';

export function SpeciesComparison({ userMetrics }) {
  const userCount = userMetrics?.totalCount || 135;
  const userDrag = userMetrics?.dragCoeff || 0.42;

  const species = [
    {
      name: 'Dromedary Camel (Camelus dromedarius)',
      ciliaryCount: 480,
      dragCoeff: 0.82,
      curvAngle: '35°',
      verdict: 'Saharan Dust Apex Predator',
      desc: 'Double-row ciliary curtain designed to withstand 70 knot sandstorms. Patient would be blinded in 4 seconds.',
      badgeColor: '#0B4F9C'
    },
    {
      name: 'African Giraffe (Giraffa camelopardalis)',
      ciliaryCount: 220,
      dragCoeff: 0.58,
      curvAngle: '55°',
      verdict: 'High-Altitude Foliage Deflector',
      desc: 'Optimized for acacia thorn deterrence. Imparts superior savannah aesthetic prestige.',
      badgeColor: '#2196F3'
    },
    {
      name: 'Subject (Your Ocular Specimen)',
      ciliaryCount: userCount,
      dragCoeff: userDrag,
      curvAngle: `${userMetrics?.avgAngle || 75}°`,
      verdict: 'Human Follicular Test Specimen',
      desc: 'Adequate for indoor air-conditioned office environments. Marginal utility during mild spring breezes.',
      badgeColor: 'var(--color-bright-blue)',
      isUser: true
    },
    {
      name: 'Homo Sapiens (Global 50th Percentile)',
      ciliaryCount: 120,
      dragCoeff: 0.41,
      curvAngle: '70°',
      verdict: 'Evolutionary Baseline',
      desc: 'Standard ciliary configuration. 80% vanity, 20% dust deflection.',
      badgeColor: '#7E9EB8'
    },
    {
      name: 'Mona Lisa (Leonardo da Vinci, 1503)',
      ciliaryCount: 0,
      dragCoeff: 0.04,
      curvAngle: '0°',
      verdict: 'Zero-Lash Renaissance Glider',
      desc: 'Zero ciliary follicles identified. Minimum drag coefficient, but severe vulnerability to 16th-century atmospheric soot.',
      badgeColor: '#082B52'
    }
  ];

  return (
    <div id="species-comparison" style={{ margin: '2rem 0 4rem 0' }}>
      <div className="container" style={{ maxWidth: '1120px' }}>
        <div className="clinical-card" style={{ padding: '0', overflow: 'hidden' }}>
          
          <div className="clinical-card-header" style={{ padding: '1.25rem 2rem' }}>
            <div>
              <h3>
                <Dna size={18} color="var(--color-deep-blue)" />
                Inter-Species Ciliary Benchmark & Phylogenetic Distribution
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                Comparing patient's follicular count and aerodynamic parameters against historical, mammalian, and artistic baselines.
              </p>
            </div>

            <div className="badge-clinical">
              PHYLOGENETIC COHORT
            </div>
          </div>

          {/* Table Container */}
          <div style={{ overflowX: 'auto', padding: '1.5rem 2rem' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              textAlign: 'left',
              fontSize: '0.85rem'
            }}>
              <thead>
                <tr style={{
                  borderBottom: '2px solid var(--color-deep-blue-10)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--color-text-muted)'
                }}>
                  <th style={{ padding: '0.75rem 1rem' }}>ORGANISM / SPECIMEN</th>
                  <th style={{ padding: '0.75rem 1rem' }}>TOTAL LASHES</th>
                  <th style={{ padding: '0.75rem 1rem' }}>DRAG COEFF (Cd)</th>
                  <th style={{ padding: '0.75rem 1rem' }}>CILIARY DENSITY RELATIVE TO CAMEL</th>
                  <th style={{ padding: '0.75rem 1rem' }}>CLINICAL CLASSIFICATION</th>
                </tr>
              </thead>
              <tbody>
                {species.map((specimen, idx) => {
                  const pctOfCamel = Math.round((specimen.ciliaryCount / 480) * 100);
                  return (
                    <tr
                      key={idx}
                      style={{
                        borderBottom: '1px solid rgba(11, 79, 156, 0.08)',
                        background: specimen.isUser ? 'rgba(33, 150, 243, 0.08)' : 'transparent',
                        fontWeight: specimen.isUser ? 700 : 400
                      }}
                    >
                      <td style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          {specimen.isUser && (
                            <span style={{
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              background: 'var(--color-bright-blue)'
                            }}></span>
                          )}
                          <span style={{ color: specimen.isUser ? 'var(--color-deep-blue)' : 'var(--color-navy)' }}>
                            {specimen.name}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                          {specimen.desc}
                        </div>
                      </td>

                      <td style={{ padding: '1rem', fontFamily: 'var(--font-mono)', fontSize: '1rem', color: 'var(--color-navy)' }}>
                        {specimen.ciliaryCount}
                      </td>

                      <td style={{ padding: '1rem', fontFamily: 'var(--font-mono)' }}>
                        {specimen.dragCoeff}
                      </td>

                      <td style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{
                            flex: 1,
                            height: '6px',
                            background: 'var(--color-light-blue)',
                            borderRadius: '3px',
                            overflow: 'hidden'
                          }}>
                            <div style={{
                              width: `${pctOfCamel}%`,
                              height: '100%',
                              background: specimen.isUser ? 'var(--color-bright-blue)' : 'var(--color-deep-blue)'
                            }}></div>
                          </div>
                          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', minWidth: '35px' }}>
                            {pctOfCamel}%
                          </span>
                        </div>
                      </td>

                      <td style={{ padding: '1rem' }}>
                        <span style={{
                          fontSize: '0.75rem',
                          fontFamily: 'var(--font-mono)',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          background: specimen.isUser ? 'var(--color-deep-blue)' : 'var(--color-light-blue)',
                          color: specimen.isUser ? '#FFFFFF' : 'var(--color-deep-blue)',
                          whiteSpace: 'nowrap'
                        }}>
                          {specimen.verdict}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div style={{
            padding: '1rem 2rem',
            background: 'var(--color-light-blue)',
            borderTop: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: '0.78rem',
            color: 'var(--color-deep-blue)'
          }}>
            <Info size={16} flexShrink={0} />
            <span>
              <strong>Phylogenetic Summary:</strong> Although patient's ciliary count is far inferior to the Saharan camel, 
              their dramatic flutter coefficient remains superior to 99.4% of terrestrial vertebrates.
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
