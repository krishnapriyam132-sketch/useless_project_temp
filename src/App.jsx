import React, { useState, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CaptureZone } from './components/CaptureZone';
import { ScanningModal } from './components/ScanningModal';
import { ResultsDashboard } from './components/ResultsDashboard';
import { InteractiveInspector } from './components/InteractiveInspector';
import { SpeciesComparison } from './components/SpeciesComparison';
import { ClinicalCertificate } from './components/ClinicalCertificate';
import { ScientificMethodologyModal } from './components/ScientificMethodologyModal';

import { runFullCiliaryAnalysis } from './utils/cvEngine';
import { computeLashScoreMetrics } from './utils/scoringEngine';

export function App() {
  const [isMuted, setIsMuted] = useState(false);
  const [activeImage, setActiveImage] = useState(null);
  const [activeImageName, setActiveImageName] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const [cvData, setCvData] = useState(null);
  const [results, setResults] = useState(null);

  // Modals & Navigation
  const [showWhitepaper, setShowWhitepaper] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  // Staged CV calculations
  const pendingAnalysisRef = useRef(null);

  const handleImageSelected = async (dataUrl, name) => {
    setActiveImage(dataUrl);
    setActiveImageName(name);
    setIsAnalyzing(true);

    // Kick off CV analysis in background while scanning modal plays its animation
    try {
      const cvResults = await runFullCiliaryAnalysis(dataUrl);
      const metricsResults = computeLashScoreMetrics(cvResults);
      pendingAnalysisRef.current = { cvResults, metricsResults };
    } catch (err) {
      console.error('CV pipeline error:', err);
    }
  };

  const handleScanAnimationComplete = () => {
    if (pendingAnalysisRef.current) {
      setCvData(pendingAnalysisRef.current.cvResults);
      setResults(pendingAnalysisRef.current.metricsResults);
    }
    setIsAnalyzing(false);

    // Smooth scroll to results
    setTimeout(() => {
      document.getElementById('results-dashboard')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleResetScan = () => {
    setActiveImage(null);
    setActiveImageName('');
    setCvData(null);
    setResults(null);
    setShowCertificate(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToScan = () => {
    document.getElementById('scan-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToInspector = () => {
    document.getElementById('inspector-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToComparison = () => {
    document.getElementById('species-comparison')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app-root">
      {/* Background ambient medical grid */}
      <div className="scientific-bg"></div>

      <div className="content-wrapper">
        <Navbar
          isMuted={isMuted}
          setIsMuted={setIsMuted}
          onOpenWhitepaper={() => setShowWhitepaper(true)}
          hasResult={!!results}
          onResetScan={handleResetScan}
        />

        <main>
          <HeroSection onScrollToScan={scrollToScan} />

          <CaptureZone
            onImageSelected={handleImageSelected}
            isAnalyzing={isAnalyzing}
          />

          {/* Active Diagnostic Modal */}
          {isAnalyzing && (
            <ScanningModal onScanComplete={handleScanAnimationComplete} />
          )}

          {/* Results Presentation */}
          {results && cvData && (
            <>
              <ResultsDashboard
                results={results}
                imageName={activeImageName}
                onViewInspector={scrollToInspector}
                onViewCertificate={() => setShowCertificate(true)}
                onViewComparison={scrollToComparison}
              />

              <InteractiveInspector
                cvData={cvData}
                rawImageSrc={activeImage}
              />

              <SpeciesComparison userMetrics={results.metrics} />
            </>
          )}
        </main>

        {/* Certificate Modal */}
        {showCertificate && results && (
          <ClinicalCertificate
            results={results}
            imageName={activeImageName}
            onClose={() => setShowCertificate(false)}
          />
        )}

        {/* Scientific Whitepaper Modal */}
        {showWhitepaper && (
          <ScientificMethodologyModal onClose={() => setShowWhitepaper(false)} />
        )}

        {/* Clinical Disclaimer & Footer */}
        <footer style={{
          borderTop: '1px solid var(--color-border)',
          background: '#FFFFFF',
          padding: '2.5rem 0',
          marginTop: '4rem',
          fontSize: '0.82rem',
          color: 'var(--color-text-muted)'
        }}>
          <div className="container" style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem'
          }}>
            <div>
              <div style={{ fontWeight: 800, color: 'var(--color-navy)', fontSize: '1rem', marginBottom: '0.25rem' }}>
                LashScore™ AI Bio-Aerodynamics Platform
              </div>
              <p style={{ maxWidth: '580px', lineHeight: 1.5, fontSize: '0.75rem' }}>
                Created for the <strong>Useless 3.0</strong> Competition. 
                Built to deliver ultra-rigorous, mathematically peer-reviewed solutions to a problem nobody asked for.
                All ciliary drag coefficients are computed in simulated atmospheric conditions.
              </p>
            </div>

            <div style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}>
              <div style={{ color: 'var(--color-deep-blue)', fontWeight: 700 }}>
                IRB-00-USELESS-3.0 CERTIFIED
              </div>
              <div style={{ color: 'var(--color-text-light)', marginTop: '2px' }}>
                PARAXIAL PRECISION: 99.4% • CLINICAL VALUE: 0.00%
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
