// High-fidelity procedural ophthalmic macro-photograph generator
// Provides 4 instantly testable clinical sample subjects for zero-friction evaluation

function createOphthalmicSample(preset) {
  const canvas = document.createElement('canvas');
  const width = 640;
  const height = 480;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // 1. Skin & orbital background
  const skinGrad = ctx.createRadialGradient(
    width / 2, height / 2, 80,
    width / 2, height / 2, 380
  );
  skinGrad.addColorStop(0, preset.skinInner);
  skinGrad.addColorStop(0.7, preset.skinMid);
  skinGrad.addColorStop(1, preset.skinOuter);
  ctx.fillStyle = skinGrad;
  ctx.fillRect(0, 0, width, height);

  // Subtle skin texture/noise
  ctx.fillStyle = 'rgba(0,0,0,0.02)';
  for (let i = 0; i < 4000; i++) {
    const rx = Math.random() * width;
    const ry = Math.random() * height;
    ctx.fillRect(rx, ry, 1, 1);
  }

  // 2. Eyeball (Sclera)
  ctx.save();
  ctx.beginPath();
  // Almond-shaped palpebral fissure
  const eyeLeft = width * 0.18;
  const eyeRight = width * 0.82;
  const eyeY = height * 0.52;

  ctx.moveTo(eyeLeft, eyeY);
  // Upper lid curve
  ctx.bezierCurveTo(
    width * 0.35, eyeY - height * 0.32,
    width * 0.65, eyeY - height * 0.30,
    eyeRight, eyeY
  );
  // Lower lid curve
  ctx.bezierCurveTo(
    width * 0.65, eyeY + height * 0.22,
    width * 0.35, eyeY + height * 0.20,
    eyeLeft, eyeY
  );
  ctx.closePath();
  ctx.clip();

  // Sclera shading
  const scleraGrad = ctx.createRadialGradient(
    width * 0.5, eyeY, 40,
    width * 0.5, eyeY, 240
  );
  scleraGrad.addColorStop(0, '#FFFFFF');
  scleraGrad.addColorStop(0.75, '#F5ECE8');
  scleraGrad.addColorStop(1, '#E2D1C8');
  ctx.fillStyle = scleraGrad;
  ctx.fill();

  // Micro-capillaries in sclera
  ctx.strokeStyle = 'rgba(210, 80, 80, 0.2)';
  ctx.lineWidth = 0.8;
  for (let c = 0; c < 12; c++) {
    ctx.beginPath();
    const startX = c < 6 ? eyeLeft + Math.random() * 80 : eyeRight - Math.random() * 80;
    ctx.moveTo(startX, eyeY + (Math.random() - 0.5) * 40);
    ctx.lineTo(startX + (Math.random() - 0.5) * 30, eyeY + (Math.random() - 0.5) * 30);
    ctx.stroke();
  }

  // 3. Iris
  const irisCenterX = width * 0.5;
  const irisCenterY = eyeY - height * 0.03;
  const irisRadius = height * 0.26;

  const irisGrad = ctx.createRadialGradient(
    irisCenterX, irisCenterY, 15,
    irisCenterX, irisCenterY, irisRadius
  );
  irisGrad.addColorStop(0, preset.irisInner);
  irisGrad.addColorStop(0.65, preset.irisMid);
  irisGrad.addColorStop(1, preset.irisOuter);

  ctx.beginPath();
  ctx.arc(irisCenterX, irisCenterY, irisRadius, 0, Math.PI * 2);
  ctx.fillStyle = irisGrad;
  ctx.fill();

  // Iris fibers (crypts)
  ctx.lineWidth = 0.75;
  for (let a = 0; a < 180; a += 2) {
    const rad = (a * Math.PI) / 90;
    const rStart = irisRadius * 0.28;
    const rEnd = irisRadius * (0.85 + Math.random() * 0.15);
    ctx.strokeStyle = a % 4 === 0 ? preset.irisFiberLight : preset.irisFiberDark;
    ctx.beginPath();
    ctx.moveTo(irisCenterX + Math.cos(rad) * rStart, irisCenterY + Math.sin(rad) * rStart);
    ctx.lineTo(irisCenterX + Math.cos(rad) * rEnd, irisCenterY + Math.sin(rad) * rEnd);
    ctx.stroke();
  }

  // Limbal ring
  ctx.strokeStyle = preset.limbalRing;
  ctx.lineWidth = 3.5;
  ctx.stroke();

  // 4. Pupil
  const pupilRadius = irisRadius * 0.32;
  ctx.beginPath();
  ctx.arc(irisCenterX, irisCenterY, pupilRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#060B11';
  ctx.fill();

  // 5. Corneal light reflection (catchlight)
  ctx.beginPath();
  ctx.ellipse(irisCenterX - irisRadius * 0.35, irisCenterY - irisRadius * 0.35, 16, 10, -Math.PI / 6, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(irisCenterX + irisRadius * 0.25, irisCenterY + irisRadius * 0.3, 5, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.fill();

  ctx.restore(); // unclip sclera

  // 6. Eyelid crease and marginal shadow
  ctx.strokeStyle = preset.eyelidCrease;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(eyeLeft - 20, eyeY - height * 0.15);
  ctx.bezierCurveTo(
    width * 0.35, eyeY - height * 0.38,
    width * 0.65, eyeY - height * 0.36,
    eyeRight + 20, eyeY - height * 0.12
  );
  ctx.stroke();

  // Draw natural eyelashes onto the sample image
  const lashColor = preset.lashColor || '#14181E';
  ctx.strokeStyle = lashColor;
  ctx.lineCap = 'round';

  // Upper lashes
  const numUpper = preset.lashCountUpper || 85;
  for (let i = 0; i < numUpper; i++) {
    const t = i / (numUpper - 1);
    const rootX = eyeLeft + t * (eyeRight - eyeLeft);
    const arc = Math.sin(t * Math.PI);
    const rootY = eyeY - arc * (height * 0.26);

    const spread = (t - 0.5) * 0.9;
    const angle = -Math.PI / 2 + spread + (Math.random() - 0.5) * 0.18;
    const len = (40 + Math.random() * 32) * (arc * 0.7 + 0.3) * preset.lengthScale;

    ctx.lineWidth = (2.2 + Math.random() * 0.8);
    ctx.beginPath();
    ctx.moveTo(rootX, rootY);
    const cx = rootX + Math.cos(angle) * (len * 0.5) + (t < 0.5 ? -8 : 8);
    const cy = rootY + Math.sin(angle) * (len * 0.5);
    const tx = rootX + Math.cos(angle) * len + (t < 0.5 ? -14 : 14);
    const ty = rootY + Math.sin(angle) * len;
    ctx.quadraticCurveTo(cx, cy, tx, ty);
    ctx.stroke();
  }

  // Lower lashes
  const numLower = preset.lashCountLower || 45;
  for (let j = 0; j < numLower; j++) {
    const t = j / (numLower - 1);
    const rootX = eyeLeft + t * (eyeRight - eyeLeft);
    const arc = Math.sin(t * Math.PI);
    const rootY = eyeY + arc * (height * 0.16);

    const spread = (t - 0.5) * 0.6;
    const angle = Math.PI / 2 + spread + (Math.random() - 0.5) * 0.15;
    const len = (18 + Math.random() * 16) * (arc * 0.6 + 0.4) * preset.lengthScale;

    ctx.lineWidth = 1.3;
    ctx.beginPath();
    ctx.moveTo(rootX, rootY);
    const cx = rootX + Math.cos(angle) * (len * 0.5);
    const cy = rootY + Math.sin(angle) * (len * 0.5);
    const tx = rootX + Math.cos(angle) * len;
    const ty = rootY + Math.sin(angle) * len;
    ctx.quadraticCurveTo(cx, cy, tx, ty);
    ctx.stroke();
  }

  return canvas.toDataURL('image/jpeg', 0.92);
}

export const CLINICAL_PRESETS = [
  {
    id: 'subject-402',
    name: 'Subject #402: Dense Ciliary Predator',
    subtitle: 'Hyper-voluminous multi-layered follicular matrix',
    tag: 'High Density',
    badge: 'GRADE V-READY',
    skinInner: '#F7E7DE',
    skinMid: '#EBD2C5',
    skinOuter: '#D9B9A6',
    irisInner: '#1C6BB0',
    irisMid: '#0B4F9C',
    irisOuter: '#082B52',
    irisFiberLight: 'rgba(234, 245, 255, 0.45)',
    irisFiberDark: 'rgba(8, 43, 82, 0.45)',
    limbalRing: '#051E38',
    eyelidCrease: 'rgba(180, 130, 115, 0.6)',
    lashColor: '#0E1116',
    lashCountUpper: 110,
    lashCountLower: 60,
    lengthScale: 1.25,
    getThumbnail: function() { return createOphthalmicSample(this); }
  },
  {
    id: 'subject-773',
    name: 'Subject #773: Aerodynamic Curled Falcon',
    subtitle: 'High-elevation ciliary angle with supersonic winglets',
    tag: 'Aerodynamic Curvature',
    badge: 'DRAG COEFF: 0.31',
    skinInner: '#F2E4D6',
    skinMid: '#E2CEBA',
    skinOuter: '#C9AF96',
    irisInner: '#A07038',
    irisMid: '#6E4822',
    irisOuter: '#3B240E',
    irisFiberLight: 'rgba(255, 220, 160, 0.4)',
    irisFiberDark: 'rgba(40, 25, 10, 0.45)',
    limbalRing: '#221406',
    eyelidCrease: 'rgba(160, 115, 95, 0.6)',
    lashColor: '#171412',
    lashCountUpper: 90,
    lashCountLower: 45,
    lengthScale: 1.1,
    getThumbnail: function() { return createOphthalmicSample(this); }
  },
  {
    id: 'subject-109',
    name: 'Subject #109: Minimalist Follicle Sample',
    subtitle: 'Ultra-low drag, baseline particulate filtration',
    tag: 'Minimalist Bio-Spec',
    badge: 'GRADE II-B',
    skinInner: '#FBF2EB',
    skinMid: '#EED9CB',
    skinOuter: '#DCBEAB',
    irisInner: '#50A89A',
    irisMid: '#287569',
    irisOuter: '#164E45',
    irisFiberLight: 'rgba(200, 255, 240, 0.4)',
    irisFiberDark: 'rgba(10, 45, 40, 0.45)',
    limbalRing: '#0D312C',
    eyelidCrease: 'rgba(190, 140, 125, 0.5)',
    lashColor: '#362E2A',
    lashCountUpper: 55,
    lashCountLower: 28,
    lengthScale: 0.85,
    getThumbnail: function() { return createOphthalmicSample(this); }
  },
  {
    id: 'subject-881',
    name: 'Subject #881: Asymmetric Flutter Hazard',
    subtitle: 'Severe saccadic turbulence & flirtation warning',
    tag: 'Class IV Hazard',
    badge: 'FLUTTER: 9.8/10',
    skinInner: '#EED5C4',
    skinMid: '#DBB8A2',
    skinOuter: '#C2987E',
    irisInner: '#3E424B',
    irisMid: '#25282F',
    irisOuter: '#121417',
    irisFiberLight: 'rgba(220, 225, 235, 0.35)',
    irisFiberDark: 'rgba(10, 12, 16, 0.5)',
    limbalRing: '#08090C',
    eyelidCrease: 'rgba(145, 100, 85, 0.65)',
    lashColor: '#090A0D',
    lashCountUpper: 125,
    lashCountLower: 68,
    lengthScale: 1.35,
    getThumbnail: function() { return createOphthalmicSample(this); }
  }
];

// Pre-initialize thumbnails cache
let initializedPresets = null;

export function getClinicalPresets() {
  if (!initializedPresets) {
    initializedPresets = CLINICAL_PRESETS.map(preset => ({
      ...preset,
      dataUrl: preset.getThumbnail()
    }));
  }
  return initializedPresets;
}
