import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, Eye, CheckCircle2, AlertCircle, Sparkles, SlidersHorizontal } from 'lucide-react';
import { getClinicalPresets } from '../utils/sampleData';
import { soundEngine } from '../utils/audioSynthesizer';

export function CaptureZone({ onImageSelected, isAnalyzing }) {
  const [activeTab, setActiveTab] = useState('presets'); // 'presets' | 'upload' | 'webcam'
  const [dragActive, setDragActive] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);

  const presets = getClinicalPresets();

  // Stop camera stream on unmount or tab change
  useEffect(() => {
    if (activeTab !== 'webcam' && streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      setCameraActive(false);
    }
  }, [activeTab]);

  const handleStartCamera = async () => {
    setCameraError(null);
    try {
      soundEngine.playRadarBlip(440);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraActive(true);
    } catch (err) {
      console.error('Camera access error:', err);
      setCameraError('Ocular optical sensor unavailable. Please verify browser permissions or select a pre-calibrated sample.');
    }
  };

  const handleCaptureCamera = () => {
    if (!videoRef.current) return;
    soundEngine.playRadarBlip(880);

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.95);

    // Stop webcam
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      setCameraActive(false);
    }

    onImageSelected(dataUrl, 'Live Biometric Capture');
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid ocular photographic format (JPG, PNG, WEBP).');
      return;
    }
    soundEngine.playRadarBlip(520);
    const reader = new FileReader();
    reader.onload = (event) => {
      onImageSelected(event.target.result, file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleSelectPreset = (preset) => {
    soundEngine.playRadarBlip(750);
    onImageSelected(preset.dataUrl, preset.name);
  };

  return (
    <div id="scan-section" style={{ margin: '2rem 0 4rem 0' }}>
      <div className="container" style={{ maxWidth: '1080px' }}>
        <div className="clinical-card" style={{ padding: '0', overflow: 'hidden' }}>
          
          {/* Diagnostic Header Bar */}
          <div className="clinical-card-header" style={{ padding: '1.25rem 1.75rem' }}>
            <div>
              <h3>
                <SlidersHorizontal size={18} color="var(--color-bright-blue)" />
                Ocular Image Ingestion & Sensor Interface
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                Select a pre-calibrated ophthalmic subject, upload a macro photo, or engage live optical sensors.
              </p>
            </div>

            <div className="badge-clinical">
              <span className="pulse-dot"></span>
              SENSOR READY
            </div>
          </div>

          {/* Navigation Tabs */}
          <div style={{
            display: 'flex',
            borderBottom: '1px solid var(--color-border)',
            background: 'var(--color-light-blue)'
          }}>
            <button
              onClick={() => setActiveTab('presets')}
              style={{
                flex: 1,
                padding: '1rem',
                border: 'none',
                background: activeTab === 'presets' ? 'var(--color-surface)' : 'transparent',
                color: activeTab === 'presets' ? 'var(--color-deep-blue)' : 'var(--color-text-muted)',
                fontWeight: activeTab === 'presets' ? 700 : 500,
                borderBottom: activeTab === 'presets' ? '3px solid var(--color-bright-blue)' : '3px solid transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                fontSize: '0.9rem',
                transition: 'all 0.2s'
              }}
            >
              <Sparkles size={16} />
              <span>Pre-Calibrated Clinical Library (Instant)</span>
            </button>

            <button
              onClick={() => setActiveTab('upload')}
              style={{
                flex: 1,
                padding: '1rem',
                border: 'none',
                background: activeTab === 'upload' ? 'var(--color-surface)' : 'transparent',
                color: activeTab === 'upload' ? 'var(--color-deep-blue)' : 'var(--color-text-muted)',
                fontWeight: activeTab === 'upload' ? 700 : 500,
                borderBottom: activeTab === 'upload' ? '3px solid var(--color-bright-blue)' : '3px solid transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                fontSize: '0.9rem',
                transition: 'all 0.2s'
              }}
            >
              <Upload size={16} />
              <span>Upload Ocular Macro Photo</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('webcam');
                handleStartCamera();
              }}
              style={{
                flex: 1,
                padding: '1rem',
                border: 'none',
                background: activeTab === 'webcam' ? 'var(--color-surface)' : 'transparent',
                color: activeTab === 'webcam' ? 'var(--color-deep-blue)' : 'var(--color-text-muted)',
                fontWeight: activeTab === 'webcam' ? 700 : 500,
                borderBottom: activeTab === 'webcam' ? '3px solid var(--color-bright-blue)' : '3px solid transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                fontSize: '0.9rem',
                transition: 'all 0.2s'
              }}
            >
              <Camera size={16} />
              <span>Live Optical Bio-Sensor</span>
            </button>
          </div>

          {/* Tab Content Panels */}
          <div style={{ padding: '2rem' }}>
            
            {/* 1. CLINICAL PRESETS */}
            {activeTab === 'presets' && (
              <div>
                <div style={{
                  marginBottom: '1.25rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
                    Standardized ocular test benchmarks calibrated according to ISO-CILIARY specifications:
                  </p>
                  <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-light)' }}>
                    SELECT SUBJECT TO RUN PIPELINE
                  </span>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '1.25rem'
                }}>
                  {presets.map((preset) => (
                    <div
                      key={preset.id}
                      onClick={() => !isAnalyzing && handleSelectPreset(preset)}
                      style={{
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-border)',
                        overflow: 'hidden',
                        cursor: isAnalyzing ? 'not-allowed' : 'pointer',
                        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                        background: 'var(--color-surface)',
                        position: 'relative'
                      }}
                      className="preset-card-hover"
                    >
                      <div style={{ position: 'relative', width: '100%', height: '140px', background: '#082B52' }}>
                        <img
                          src={preset.dataUrl}
                          alt={preset.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <div style={{
                          position: 'absolute',
                          top: '8px',
                          right: '8px',
                          background: 'rgba(8, 43, 82, 0.75)',
                          backdropFilter: 'blur(4px)',
                          color: '#FFFFFF',
                          fontSize: '0.68rem',
                          fontFamily: 'var(--font-mono)',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          border: '1px solid rgba(255, 255, 255, 0.2)'
                        }}>
                          {preset.tag}
                        </div>
                      </div>

                      <div style={{ padding: '1rem' }}>
                        <h4 style={{ fontSize: '0.92rem', color: 'var(--color-navy)', marginBottom: '0.2rem' }}>
                          {preset.name}
                        </h4>
                        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.75rem', minHeight: '34px' }}>
                          {preset.subtitle}
                        </p>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{
                            fontSize: '0.7rem',
                            fontFamily: 'var(--font-mono)',
                            color: 'var(--color-deep-blue)',
                            fontWeight: 700
                          }}>
                            {preset.badge}
                          </span>
                          <button
                            disabled={isAnalyzing}
                            className="btn btn-secondary"
                            style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem' }}
                          >
                            Analyze
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. UPLOAD PHOTO */}
            {activeTab === 'upload' && (
              <div>
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={handleFileDrop}
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    border: `2px dashed ${dragActive ? 'var(--color-bright-blue)' : 'rgba(11, 79, 156, 0.3)'}`,
                    borderRadius: 'var(--radius-lg)',
                    padding: '3.5rem 2rem',
                    textAlign: 'center',
                    background: dragActive ? 'rgba(234, 245, 255, 0.8)' : 'var(--color-bg)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    position: 'relative'
                  }}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />

                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'var(--color-light-blue)',
                    border: '1px solid var(--color-border-bright)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.25rem auto',
                    color: 'var(--color-deep-blue)'
                  }}>
                    <Upload size={28} />
                  </div>

                  <h3 style={{ fontSize: '1.2rem', color: 'var(--color-navy)', marginBottom: '0.5rem' }}>
                    Drag & Drop High-Resolution Eye Macro Photo
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', maxWidth: '460px', margin: '0 auto 1.25rem auto' }}>
                    Ensure the subject's ocular aperture is illuminated. Close-up photos yielding visible follicular root sheaths yield optimal drag coefficient precision.
                  </p>

                  <button className="btn btn-primary" style={{ padding: '0.65rem 1.5rem', fontSize: '0.88rem' }}>
                    Browse Local System Files
                  </button>

                  <div style={{
                    marginTop: '1.5rem',
                    fontSize: '0.72rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--color-text-light)'
                  }}>
                    SUPPORTED STANDARDS: JPEG, PNG, WEBP • RECOMMENDED MINIMUM: 600×400px
                  </div>
                </div>
              </div>
            )}

            {/* 3. LIVE WEBCAM */}
            {activeTab === 'webcam' && (
              <div>
                {cameraError ? (
                  <div style={{
                    padding: '2.5rem',
                    textAlign: 'center',
                    background: 'var(--color-light-blue)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)'
                  }}>
                    <AlertCircle size={36} color="var(--color-deep-blue)" style={{ margin: '0 auto 1rem auto' }} />
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Optical Sensor Inaccessible</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', maxWidth: '440px', margin: '0 auto 1.25rem auto' }}>
                      {cameraError}
                    </p>
                    <button onClick={handleStartCamera} className="btn btn-primary" style={{ fontSize: '0.85rem' }}>
                      Retry Sensor Initialization
                    </button>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      position: 'relative',
                      maxWidth: '640px',
                      height: '420px',
                      margin: '0 auto 1.5rem auto',
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      background: '#082B52',
                      border: '2px solid var(--color-bright-blue)',
                      boxShadow: '0 8px 30px rgba(8, 43, 82, 0.2)'
                    }}>
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />

                      {/* Scientific HUD reticle overlay */}
                      <div className="reticle-corner reticle-top-left"></div>
                      <div className="reticle-corner reticle-top-right"></div>
                      <div className="reticle-corner reticle-bottom-left"></div>
                      <div className="reticle-corner reticle-bottom-right"></div>

                      {/* Paraxial guidance ellipse */}
                      <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '280px',
                        height: '160px',
                        borderRadius: '50%',
                        border: '2px dashed rgba(33, 150, 243, 0.7)',
                        pointerEvents: 'none',
                        boxShadow: '0 0 20px rgba(33, 150, 243, 0.25)'
                      }}>
                        <div style={{
                          position: 'absolute',
                          top: '-24px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          fontSize: '0.7rem',
                          fontFamily: 'var(--font-mono)',
                          color: '#FFFFFF',
                          background: 'rgba(8, 43, 82, 0.8)',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          whiteSpace: 'nowrap'
                        }}>
                          ALIGN OCULAR TARGET
                        </div>
                      </div>

                      {/* Live scanline */}
                      <div className="laser-scanner"></div>

                      {/* Sensor telemetry tag */}
                      <div style={{
                        position: 'absolute',
                        bottom: '12px',
                        left: '14px',
                        fontSize: '0.72rem',
                        fontFamily: 'var(--font-mono)',
                        color: 'rgba(255, 255, 255, 0.8)',
                        background: 'rgba(8, 43, 82, 0.75)',
                        padding: '3px 8px',
                        borderRadius: '4px'
                      }}>
                        FPS: 30.0 • EXPOSURE: AUTO • FOV: 68°
                      </div>
                    </div>

                    <button
                      onClick={handleCaptureCamera}
                      className="btn btn-primary"
                      style={{
                        padding: '0.85rem 2.25rem',
                        fontSize: '1rem',
                        borderRadius: '12px',
                        boxShadow: '0 4px 20px rgba(33, 150, 243, 0.4)'
                      }}
                    >
                      <Camera size={18} />
                      <span>Capture & Execute Ciliary Diagnostics</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .preset-card-hover:hover {
          transform: translateY(-4px);
          border-color: var(--color-bright-blue) !important;
          box-shadow: 0 10px 25px rgba(11, 79, 156, 0.12) !important;
        }
      `}</style>
    </div>
  );
}
