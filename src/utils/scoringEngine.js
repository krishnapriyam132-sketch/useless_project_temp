// Scientific Scoring Engine for LashScore™ AI
// Computes absurdly pedantic, peer-reviewed metrics and hilarious clinical commentary

export function computeLashScoreMetrics(cvResults) {
  const { lashes, ocular } = cvResults;
  const upperLashes = lashes.filter((l) => l.type === 'upper');
  const lowerLashes = lashes.filter((l) => l.type === 'lower');

  const totalCount = lashes.length;
  const upperCount = upperLashes.length;
  const lowerCount = lowerLashes.length;
  const ratio = (upperCount / Math.max(1, lowerCount)).toFixed(2);

  // Mean length
  const totalLength = lashes.reduce((acc, l) => acc + l.lengthMm, 0);
  const avgLength = parseFloat((totalLength / Math.max(1, totalCount)).toFixed(2));

  // Mean curvature angle
  const totalAngle = upperLashes.reduce((acc, l) => acc + l.angleDeg, 0);
  const avgAngle = Math.round(totalAngle / Math.max(1, upperCount));

  // Aerodynamic Drag Coefficient Cd: based on density & length
  const density = totalCount / (ocular.irisRadius * 2);
  const rawCd = 0.22 + (density * 0.18) + (avgLength * 0.02);
  const dragCoeff = parseFloat(Math.min(0.85, Math.max(0.18, rawCd)).toFixed(3));

  // Wind-Shear Force (Newtons) per blink
  // F = 0.5 * rho * v^2 * A * Cd (assuming blink angular velocity ~ 400 deg/s)
  const blinkThrust = parseFloat((0.015 + (upperCount * 0.00032) * (avgLength / 7)).toFixed(4));

  // Debris Deflection Efficiency %
  const deflectionPct = parseFloat(Math.min(99.4, 78.0 + (totalCount * 0.14) + (avgAngle * 0.08)).toFixed(1));

  // Dramatic Flutter Potential (1.0 to 10.0)
  const flutterRaw = (upperCount / 12) + (avgLength / 1.5) + (avgAngle / 25);
  const flutterPotential = parseFloat(Math.min(10.0, Math.max(2.1, flutterRaw * 0.8)).toFixed(1));

  // Overall LashScore (0 to 100)
  const baseScore = Math.round(
    (totalCount * 0.35) +
    (avgLength * 4.2) +
    (avgAngle * 0.25) +
    (flutterPotential * 2.8)
  );
  const overallScore = Math.min(99, Math.max(42, baseScore));

  // Grade classification
  let grade = {
    code: 'GRADE III-B',
    title: 'Certified Ocular Windshield Wiper',
    badgeColor: '#2196F3',
    description: 'Adequate atmospheric particulate deflection. Meets baseline mammalian ciliary compliance.'
  };

  if (overallScore >= 92) {
    grade = {
      code: 'GRADE V-APEX',
      title: 'Transcendental Peacock Apex Predator',
      badgeColor: '#0B4F9C',
      description: 'Lash density and lift pose minor aerodynamic turbulence hazards to regional aviation. Exceptional dramatic potency.'
    };
  } else if (overallScore >= 80) {
    grade = {
      code: 'GRADE IV-A',
      title: 'High-Velocity Biological Flyswatter',
      badgeColor: '#2196F3',
      description: 'Superior follicular curvature. Capable of generating measurable micro-drafts during rapid saccadic eye movements.'
    };
  } else if (overallScore >= 65) {
    grade = {
      code: 'GRADE III-A',
      title: 'Standard Defensive Bristle Matrix',
      badgeColor: '#2196F3',
      description: 'Statistically average particulate barrier. Evolutionary purpose is 70% aesthetic, 30% dust mitigation.'
    };
  } else {
    grade = {
      code: 'GRADE II-MIN',
      title: 'Aerodynamic Minimalist Filter',
      badgeColor: '#7E9EB8',
      description: 'Ultra-light follicular configuration. Minimum aerodynamic drag; vulnerable to high-speed airborne pollen.'
    };
  }

  // Real world aerodynamic comparison
  const dragComparisons = [
    { threshold: 0.55, text: 'Equivalent to a 1997 Volvo 850 Station Wagon with a roof rack' },
    { threshold: 0.42, text: 'Comparable to a Toyota Prius driving in reverse' },
    { threshold: 0.32, text: 'Aerodynamically synchronized with a peregrine falcon in a steep dive' },
    { threshold: 0.0, text: 'Sleeker than a NASA experimental hypersonic glide vehicle' }
  ];
  const dragComparison = dragComparisons.find(d => dragCoeff >= d.threshold)?.text || dragComparisons[1].text;

  // Flutter Hazard Classification
  let flutterClassification = 'Class I: Safe for Social Interaction';
  if (flutterPotential >= 9.0) {
    flutterClassification = 'Class IV: Weaponized Seduction Hazard (IRB Restricted)';
  } else if (flutterPotential >= 7.5) {
    flutterClassification = 'Class III: Noticeable Micro-Turbulence Generator';
  } else if (flutterPotential >= 5.5) {
    flutterClassification = 'Class II: Standard Conversational Flutter';
  }

  // Procedural peer-reviewed clinical findings
  const clinicalFindings = [
    `Subject displays a Total Ciliary Count of ${totalCount} follicles (${upperCount} superior / ${lowerCount} inferior), exhibiting a Ciliary Ratio of ${ratio}:1 (Normal human range: 2.1 - 2.6:1).`,
    `Mean follicular elevation angle measured at ${avgAngle}°. Navier-Stokes laminar flow modeling predicts boundary layer separation at ${Math.round(avgAngle * 1.3)} km/h atmospheric headwinds.`,
    `Calculated blink-thrust yields ${blinkThrust} Newtons of kinetic displacement per ocular closure event. Net annual forward propulsion estimated at 0.00042 km/year if blinking continuously while facing east.`,
    `Particulate Deflection Quotient registered at ${deflectionPct}%, comfortably exceeding ISO-2026-USELESS biological particulate exclusion protocols.`,
    `Dramatic Flutter Potential indexed at ${flutterPotential}/10.0 (${flutterClassification}). Telemetry suggests blinking thrice in rapid succession may cause involuntary eye contact escalation.`
  ];

  const evolutionaryDiagnosis = {
    vanityPercent: Math.round(75 + Math.random() * 18),
    defensePercent: Math.round(8 + Math.random() * 10),
    windNoiseDampingPercent: Math.round(1 + Math.random() * 5),
    existentialUtility: 0.02
  };

  const clinicalRecommendation = [
    "Refrain from vigorous blinking while inspecting sensitive micro-electronics or handling powdered sugar.",
    "No immediate surgical ciliary intervention indicated. Subject's eyelashes are certified safe for terrestrial use.",
    "Recommend recalibrating personal vanity indices by +14% to account for superior follicular volume."
  ];

  return {
    overallScore,
    grade,
    metrics: {
      totalCount,
      upperCount,
      lowerCount,
      ratio,
      avgLength,
      avgAngle,
      dragCoeff,
      dragComparison,
      blinkThrust,
      deflectionPct,
      flutterPotential,
      flutterClassification
    },
    clinicalFindings,
    evolutionaryDiagnosis,
    clinicalRecommendation,
    timestamp: new Date().toISOString(),
    protocolId: `LS-2026-CV-${Math.floor(100000 + Math.random() * 900000)}`
  };
}
