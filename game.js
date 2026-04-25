// ===================================================================
// CHIMNEY RUSH — 2D fysikbaserat studs-spel
// ===================================================================

// ====== TUNING (persisted testlab) ======
const TUNING_KEY = 'chimney_tuning_v3';
const DEFAULT_TUNING = {
  // Fysik
  gravityDesert: 0.38, gravityCanyon: 0.38, gravityNeon: 0.28, gravityIce: 0.34, gravityVolcano: 0.40,
  airDrag: 0.9995, bounceDamp: 0.90, groundFric: 0.996, windMax: 0.18,
  tireR: 24,
  // Hastighet
  speedCapNormal: 19, speedCapLaunch: 29, speedCapNitro: 42,
  maxRpm: 100, rpmGain: 1.4, rpmDecay: 0.9, rpmMaxHoldFrames: 12,
  perfectMin: 70, perfectMax: 85,
  minAngle: 5, maxAngle: 80,
  // Skott / Nitro
  nitroPower: 14, nitroBoostFrames: 120, launchBoostFrames: 80,
  // Studsmatta
  trampMiniPower: 28, trampStdPower: 40, trampMegaPower: 56,
  tapMultPerfect: 2.0, tapMultStomp: 1.8, speedFactorMax: 0.6,
  // Stomp / Bounce
  stompImpulseY: 9, stompWindowFrames: 14, stompCooldown: 30, stompWhiffFrames: 25, stompWhiffPenalty: 0.85,
  powerBouncePerfect: 2.0, powerBounceGood: 1.4,
  // Stege
  ladderLen: 130, ladderTiltDx: 55, ladderThick: 10,
  ladderBounceVy: 20, ladderMinGap: 180, ladderMaxReach: 3500,
  // Flipper
  flipSwingFrames: 18, flipStrikeR: 26, flipLiftBase: 40, flipLiftScale: 0.65,
  // Power-ups
  airJumpPower: 14, magnetDuration: 600, magnetRadius: 250, magnetPullStrength: 12,
  // Hinder-frekvens (desert)
  wallFreqDesert: 0.35, spinnerFreqDesert: 0.2, rampFreqDesert: 0.35,
  barrelFreqDesert: 0.4, houseFreqDesert: 0.22, tntFreqDesert: 0.18, cannonFreqDesert: 0.10,
  bumperFreqDesert: 0.18, cactusFreqDesert: 0.10, spikeFreqDesert: 0.03, waterFreqDesert: 0.30,
  // Hinder-frekvens (canyon)
  wallFreqCanyon: 0.6, spinnerFreqCanyon: 0.45, rampFreqCanyon: 0.3,
  barrelFreqCanyon: 0.25, houseFreqCanyon: 0.15, tntFreqCanyon: 0.15, cannonFreqCanyon: 0.08,
  bumperFreqCanyon: 0.25, cactusFreqCanyon: 0.07, spikeFreqCanyon: 0.04, waterFreqCanyon: 0.35,
  // Hinder-frekvens (neon)
  wallFreqNeon: 0.2, spinnerFreqNeon: 0.55, rampFreqNeon: 0.55,
  barrelFreqNeon: 0.15, houseFreqNeon: 0.12, tntFreqNeon: 0.12, cannonFreqNeon: 0.12,
  bumperFreqNeon: 0.35, cactusFreqNeon: 0.05, spikeFreqNeon: 0.04, waterFreqNeon: 0.30,
  // Hinder-frekvens (ice) — icicles replace cacti, spikes more common, NO waterholes (frozen)
  wallFreqIce: 0.25, spinnerFreqIce: 0.30, rampFreqIce: 0.40,
  barrelFreqIce: 0.10, houseFreqIce: 0.08, tntFreqIce: 0.10, cannonFreqIce: 0.14,
  bumperFreqIce: 0.30, cactusFreqIce: 0, spikeFreqIce: 0.08, waterFreqIce: 0,
  // Hinder-frekvens (volcano) — magmaravin: lavafloder, eldbollar regnar, geysers
  // Inga vattenhål (förångas), inga kaktusar (förbrinner), spikes är obsidian
  wallFreqVolcano: 0.20, spinnerFreqVolcano: 0.25, rampFreqVolcano: 0.30,
  barrelFreqVolcano: 0.08, houseFreqVolcano: 0, tntFreqVolcano: 0.18, cannonFreqVolcano: 0.16,
  bumperFreqVolcano: 0.20, cactusFreqVolcano: 0, spikeFreqVolcano: 0.10, waterFreqVolcano: 0,
  lavaFreqVolcano: 0.45, geyserFreqVolcano: 0.30,
  // Pickups
  coinDensityDesert: 3, coinDensityCanyon: 2.5, coinDensityNeon: 2, coinDensityIce: 2.5, coinDensityVolcano: 2,
  starFreqDesert: 0.7, starFreqCanyon: 1.0, starFreqNeon: 1.1, starFreqIce: 1.3, starFreqVolcano: 1.5,
  balloonFreqDesert: 0.4, balloonFreqCanyon: 0.3, balloonFreqNeon: 0.9, balloonFreqIce: 0.7, balloonFreqVolcano: 0.5,
  nitroFreqDesert: 1.4, nitroFreqCanyon: 1.3, nitroFreqNeon: 1.7, nitroFreqIce: 1.9, nitroFreqVolcano: 2.1,
  // Terräng
  terrainAmpDesert: 80, terrainAmpCanyon: 140, terrainAmpNeon: 180, terrainAmpIce: 150, terrainAmpVolcano: 170,
  terrainStepDesert: 220, terrainStepCanyon: 200, terrainStepNeon: 240, terrainStepIce: 200, terrainStepVolcano: 210,
  // Finish-poäng
  multChimneyTop: 3.0, multBullseye: 1.7, multInring: 1.5,
  multMellan: 1.3, multYttre: 1.2, multFramme: 1.1,
};
let TUNING = (() => {
  try {
    const raw = localStorage.getItem(TUNING_KEY);
    if (raw) return { ...DEFAULT_TUNING, ...JSON.parse(raw) };
  } catch(_) {}
  return { ...DEFAULT_TUNING };
})();
function saveTuning() { try { localStorage.setItem(TUNING_KEY, JSON.stringify(TUNING)); } catch(_) {} }
function resetTuning() { TUNING = { ...DEFAULT_TUNING }; try { localStorage.removeItem(TUNING_KEY); } catch(_) {} applyTuning(); }
// applyTuning() defined after BIOMES

// ====== CONSTANTS (mutable — adjusted by upgrades & testlab) ======
let GRAVITY       = 0.32;
let AIR_DRAG      = TUNING.airDrag;
let BOUNCE_DAMP   = TUNING.bounceDamp;
let GROUND_FRIC   = TUNING.groundFric;
let TIRE_R        = TUNING.tireR;
let MAX_RPM       = TUNING.maxRpm;
let RPM_GAIN      = TUNING.rpmGain;
let RPM_DECAY     = TUNING.rpmDecay;
let MIN_ANGLE     = TUNING.minAngle;
let MAX_ANGLE     = TUNING.maxAngle;
let PERFECT_MIN   = TUNING.perfectMin;
let PERFECT_MAX   = TUNING.perfectMax;
let NITRO_POWER   = TUNING.nitroPower;
let WIND_MAX      = TUNING.windMax;

const PHASE = { AIM: 'AIM', FLY: 'FLY', DONE: 'DONE' };
const HS_KEY   = 'chimney_rush_highscore_v2';
const PROG_KEY = 'chimney_rush_progression_v1';
const DAILY_PB_KEY = 'chimney_rush_daily_pb_v1';

function todayStamp() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function loadDailyPB() {
  try {
    const raw = localStorage.getItem(DAILY_PB_KEY);
    if (!raw) return { date: todayStamp(), distM: 0, score: 0 };
    const parsed = JSON.parse(raw);
    if (parsed.date !== todayStamp()) return { date: todayStamp(), distM: 0, score: 0 };
    return parsed;
  } catch { return { date: todayStamp(), distM: 0, score: 0 }; }
}
function saveDailyPB(pb) {
  try { localStorage.setItem(DAILY_PB_KEY, JSON.stringify(pb)); } catch {}
}
let dailyPB = loadDailyPB();

// ====== PROGRESSION (coins + upgrades + missions) ======
const UPGRADES = {
  motor: { name: 'Motor', icon: '⚙️', max: 5, cost: [80, 200, 500, 1200, 2800], desc: '+4 RPM + bredare PERFECT-zon per nivå' },
  tire:  { name: 'Däck',  icon: '🛞', max: 5, cost: [100, 250, 600, 1400, 3200], desc: 'Studs +3% per nivå' },
  ladder:{ name: 'Stege', icon: '🪜', max: 3, cost: [150, 400, 1000],             desc: 'Vinkelrange ±5° per nivå' },
};

const MISSION_POOL = [
  { id: 'dist2k', desc: 'Flyg minst 2000m', reward: 200, test: s => s.distM >= 2000 },
  { id: 'dist5k', desc: 'Flyg minst 5000m', reward: 500, test: s => s.distM >= 5000 },
  { id: 'coins30', desc: 'Plocka 30 mynt i en run', reward: 250, test: s => s.coinsRun >= 30 },
  { id: 'stomp3', desc: 'Gör 3 perfekta stomps', reward: 300, test: s => s.stompsPerfect >= 3 },
  { id: 'combo5', desc: 'Nå 5x combo', reward: 250, test: s => s.maxCombo >= 5 },
  { id: 'walls5', desc: 'Krossa 5 väggar', reward: 300, test: s => s.wallsBroken >= 5 },
  { id: 'nitro3', desc: 'Använd 3 nitros i en run', reward: 250, test: s => s.nitroUsed >= 3 },
  { id: 'balloons4', desc: 'Spräng 4 ballonger', reward: 200, test: s => s.balloonsPopped >= 4 },
  { id: 'perfectShot', desc: 'Skjut i PERFECT-zon', reward: 150, test: s => s.perfectShots >= 1 },
  { id: 'noStomp', desc: 'Flyg 1500m utan att stompa', reward: 300, test: s => s.distM >= 1500 && s.stompsUsed === 0 },
];

function loadProgression() {
  try {
    const raw = localStorage.getItem(PROG_KEY);
    if (raw) return JSON.parse(raw);
  } catch(_) {}
  return { coins: 0, runs: 0, upgrades: { motor: 0, tire: 0, ladder: 0 }, missions: null, missionsDate: null };
}
function saveProgression() {
  try { localStorage.setItem(PROG_KEY, JSON.stringify(progression)); } catch(_) {}
}
const progression = loadProgression();

// Daily missions — rotate by calendar date (seeded)
function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
}
function mulberry32(a) {
  return function() {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = a;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function hashStr(s) { let h = 2166136261; for (let i=0; i<s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }

function rollDailyMissions() {
  const key = todayKey();
  if (progression.missionsDate === key && progression.missions) {
    progression.missions.forEach(m => {
      if (typeof m.test !== 'function') {
        const proto = MISSION_POOL.find(p => p.id === m.id);
        if (proto) m.test = proto.test;
      }
    });
    return;
  }
  const rng = mulberry32(hashStr(key));
  const pool = MISSION_POOL.slice();
  const picked = [];
  for (let i = 0; i < 3 && pool.length; i++) {
    const idx = Math.floor(rng() * pool.length);
    picked.push({ ...pool[idx], done: false });
    pool.splice(idx, 1);
  }
  progression.missions = picked;
  progression.missionsDate = key;
  saveProgression();
}
rollDailyMissions();

function applyUpgrades() {
  const u = progression.upgrades;
  MAX_RPM      = 100 + (u.motor || 0) * 4;
  PERFECT_MIN  = TUNING.perfectMin - (u.motor || 0);   // 70 → 65 vid lvl 5 (5 enheter bredare nedåt)
  PERFECT_MAX  = TUNING.perfectMax + (u.motor || 0);   // 85 → 90 vid lvl 5 (5 enheter uppåt — totalt +10 zon)
  BOUNCE_DAMP  = 0.85 + (u.tire || 0) * 0.02;
  MIN_ANGLE    = Math.max(0, 5 - (u.ladder || 0) * 2);
  MAX_ANGLE    = Math.min(88, 80 + (u.ladder || 0) * 3);
}
applyUpgrades();

// Per-run mission tracking
const runStats = {
  distM: 0, coinsRun: 0, stompsPerfect: 0, stompsUsed: 0,
  maxCombo: 0, wallsBroken: 0, nitroUsed: 0, balloonsPopped: 0, perfectShots: 0,
  ladderHits: 0,
};
function resetRunStats() {
  for (const k in runStats) runStats[k] = 0;
}

// ====== DOM ======
const canvas   = document.getElementById('game');
const ctx      = canvas.getContext('2d');
const stage    = document.getElementById('stage');
const scoreEl  = document.getElementById('score');
const distLiveEl = document.getElementById('distLive');
const starsEl  = document.getElementById('stars');
const starsMaxEl = document.getElementById('starsMax');
const tiresEl  = document.getElementById('tires');
const rpmFill  = document.getElementById('rpmFill');
const rpmVal   = document.getElementById('rpmVal');
const angFill  = document.getElementById('angFill');
const angVal   = document.getElementById('angVal');
const aimHud   = document.getElementById('aimHud');
const bigToast = document.getElementById('bigToast');
const comboEl  = document.getElementById('comboToast');
const overlay  = document.getElementById('overlay');

let W = 0, H = 0, DPR = 1;

// Polyfill roundRect for older browsers
if (typeof CanvasRenderingContext2D !== 'undefined' && !CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
    if (typeof r === 'number') r = [r, r, r, r];
    else if (r.length === 1) r = [r[0], r[0], r[0], r[0]];
    this.beginPath();
    this.moveTo(x + r[0], y);
    this.lineTo(x + w - r[1], y);
    this.arcTo(x + w, y, x + w, y + r[1], r[1]);
    this.lineTo(x + w, y + h - r[2]);
    this.arcTo(x + w, y + h, x + w - r[2], y + h, r[2]);
    this.lineTo(x + r[3], y + h);
    this.arcTo(x, y + h, x, y + h - r[3], r[3]);
    this.lineTo(x, y + r[0]);
    this.arcTo(x, y, x + r[0], y, r[0]);
    return this;
  };
}

function resize() {
  DPR = Math.min(window.devicePixelRatio || 1, 2);
  const r = stage.getBoundingClientRect();
  W = r.width; H = r.height;
  canvas.width  = Math.round(W * DPR);
  canvas.height = Math.round(H * DPR);
  canvas.style.width  = W + 'px';
  canvas.style.height = H + 'px';
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
}
window.addEventListener('resize', resize);

// ====== LEVEL ======
// Terrain control points (x, y in world coords). Y is screen-down.
let TERRAIN = [];
let OBSTACLES = [];
let PICKUPS = [];
let LEVEL = { launchX: 0, launchY: 0, finishX: 0, totalStars: 0 };

// Biome config: [desert, canyon, neon, ice, volcano]
const BIOME_LEN = 15000;         // each biome 15000m long
const WORLD_LEN = BIOME_LEN * 5; // 75000m total — 5 biomes (desert → canyon → neon → ice → volcano)
function biomeAt(x) {
  if (x < BIOME_LEN) return 0;
  if (x < BIOME_LEN * 2) return 1;
  if (x < BIOME_LEN * 3) return 2;
  if (x < BIOME_LEN * 4) return 3;
  return 4;
}
// Biome start X + launcher offset (matches buildLevel's LEVEL.launchX = 180 for biome 0)
const RESPAWN_LAUNCH_OFFSET = 180;
function biomeStartX(x) {
  return biomeAt(x) * BIOME_LEN + RESPAWN_LAUNCH_OFFSET;
}

const BIOMES = [
  { // 0 — desert
    sky: ['#2a1065', '#be185d', '#f97316'],
    groundTop: '#d97706', groundBot: '#7c2d12', groundLine: '#fbbf24',
    cacti: '#166534',
    gravity: TUNING.gravityDesert,
    terrainAmp: TUNING.terrainAmpDesert, terrainStep: TUNING.terrainStepDesert,
    wallFreq: TUNING.wallFreqDesert, spinnerFreq: TUNING.spinnerFreqDesert, rampFreq: TUNING.rampFreqDesert,
    barrelFreq: TUNING.barrelFreqDesert, houseFreq: TUNING.houseFreqDesert, tntFreq: TUNING.tntFreqDesert, cannonFreq: TUNING.cannonFreqDesert,
    bumperFreq: TUNING.bumperFreqDesert,
    cactusFreq: TUNING.cactusFreqDesert,
    spikeFreq: TUNING.spikeFreqDesert,
    waterFreq: TUNING.waterFreqDesert,
    coinDensity: TUNING.coinDensityDesert, starFreq: TUNING.starFreqDesert, balloonFreq: TUNING.balloonFreqDesert, nitroFreq: TUNING.nitroFreqDesert,
  },
  { // 1 — canyon
    sky: ['#1e1b4b', '#7c2d12', '#ea580c'],
    groundTop: '#9a3412', groundBot: '#431407', groundLine: '#f59e0b',
    cacti: '#14532d',
    gravity: TUNING.gravityCanyon,
    terrainAmp: TUNING.terrainAmpCanyon, terrainStep: TUNING.terrainStepCanyon,
    wallFreq: TUNING.wallFreqCanyon, spinnerFreq: TUNING.spinnerFreqCanyon, rampFreq: TUNING.rampFreqCanyon,
    barrelFreq: TUNING.barrelFreqCanyon, houseFreq: TUNING.houseFreqCanyon, tntFreq: TUNING.tntFreqCanyon, cannonFreq: TUNING.cannonFreqCanyon,
    bumperFreq: TUNING.bumperFreqCanyon,
    cactusFreq: TUNING.cactusFreqCanyon,
    spikeFreq: TUNING.spikeFreqCanyon,
    waterFreq: TUNING.waterFreqCanyon,
    coinDensity: TUNING.coinDensityCanyon, starFreq: TUNING.starFreqCanyon, balloonFreq: TUNING.balloonFreqCanyon, nitroFreq: TUNING.nitroFreqCanyon,
  },
  { // 2 — neon night
    sky: ['#0f172a', '#1e1b4b', '#312e81'],
    groundTop: '#4c1d95', groundBot: '#0f172a', groundLine: '#22d3ee',
    cacti: '#065f46',
    gravity: TUNING.gravityNeon,
    terrainAmp: TUNING.terrainAmpNeon, terrainStep: TUNING.terrainStepNeon,
    wallFreq: TUNING.wallFreqNeon, spinnerFreq: TUNING.spinnerFreqNeon, rampFreq: TUNING.rampFreqNeon,
    barrelFreq: TUNING.barrelFreqNeon, houseFreq: TUNING.houseFreqNeon, tntFreq: TUNING.tntFreqNeon, cannonFreq: TUNING.cannonFreqNeon,
    bumperFreq: TUNING.bumperFreqNeon,
    cactusFreq: TUNING.cactusFreqNeon,
    spikeFreq: TUNING.spikeFreqNeon,
    waterFreq: TUNING.waterFreqNeon,
    coinDensity: TUNING.coinDensityNeon, starFreq: TUNING.starFreqNeon, balloonFreq: TUNING.balloonFreqNeon, nitroFreq: TUNING.nitroFreqNeon,
  },
  { // 3 — ice world (biome 4) — frozen tundra, brutal density
    sky: ['#0c4a6e', '#0ea5e9', '#e0f2fe'],
    groundTop: '#e0f2fe', groundBot: '#1e3a8a', groundLine: '#7dd3fc',
    cacti: '#0ea5e9',                         // not rendered — cactusFreq is 0 here
    gravity: TUNING.gravityIce,
    terrainAmp: TUNING.terrainAmpIce, terrainStep: TUNING.terrainStepIce,
    wallFreq: TUNING.wallFreqIce, spinnerFreq: TUNING.spinnerFreqIce, rampFreq: TUNING.rampFreqIce,
    barrelFreq: TUNING.barrelFreqIce, houseFreq: TUNING.houseFreqIce, tntFreq: TUNING.tntFreqIce, cannonFreq: TUNING.cannonFreqIce,
    bumperFreq: TUNING.bumperFreqIce,
    cactusFreq: TUNING.cactusFreqIce,
    spikeFreq: TUNING.spikeFreqIce,
    waterFreq: TUNING.waterFreqIce,
    coinDensity: TUNING.coinDensityIce, starFreq: TUNING.starFreqIce, balloonFreq: TUNING.balloonFreqIce, nitroFreq: TUNING.nitroFreqIce,
  },
  { // 4 — volcano (biome 5) — glödande klippor, lava, eldbollar, geysers, askstorm
    sky: ['#1a0303', '#7f1d1d', '#f97316'],
    groundTop: '#1c0a0a', groundBot: '#0a0303', groundLine: '#f97316',
    cacti: '#7c2d12',                         // not rendered — cactusFreq is 0 here
    gravity: TUNING.gravityVolcano,
    terrainAmp: TUNING.terrainAmpVolcano, terrainStep: TUNING.terrainStepVolcano,
    wallFreq: TUNING.wallFreqVolcano, spinnerFreq: TUNING.spinnerFreqVolcano, rampFreq: TUNING.rampFreqVolcano,
    barrelFreq: TUNING.barrelFreqVolcano, houseFreq: TUNING.houseFreqVolcano, tntFreq: TUNING.tntFreqVolcano, cannonFreq: TUNING.cannonFreqVolcano,
    bumperFreq: TUNING.bumperFreqVolcano,
    cactusFreq: TUNING.cactusFreqVolcano,
    spikeFreq: TUNING.spikeFreqVolcano,
    waterFreq: TUNING.waterFreqVolcano,
    lavaFreq: TUNING.lavaFreqVolcano,
    geyserFreq: TUNING.geyserFreqVolcano,
    coinDensity: TUNING.coinDensityVolcano, starFreq: TUNING.starFreqVolcano, balloonFreq: TUNING.balloonFreqVolcano, nitroFreq: TUNING.nitroFreqVolcano,
  },
];

function applyTuning() {
  // Globala fysik-konstanter
  AIR_DRAG       = TUNING.airDrag;
  BOUNCE_DAMP    = TUNING.bounceDamp;
  GROUND_FRIC    = TUNING.groundFric;
  TIRE_R         = TUNING.tireR;
  MAX_RPM        = TUNING.maxRpm;
  RPM_GAIN       = TUNING.rpmGain;
  RPM_DECAY      = TUNING.rpmDecay;
  MIN_ANGLE      = TUNING.minAngle;
  MAX_ANGLE      = TUNING.maxAngle;
  PERFECT_MIN    = TUNING.perfectMin;
  PERFECT_MAX    = TUNING.perfectMax;
  NITRO_POWER    = TUNING.nitroPower;
  WIND_MAX       = TUNING.windMax;
  LADDER_LEN        = TUNING.ladderLen;
  LADDER_TILT_DX    = TUNING.ladderTiltDx;
  LADDER_THICK      = TUNING.ladderThick;
  LADDER_BOUNCE_VY  = TUNING.ladderBounceVy;
  LADDER_MIN_GAP    = TUNING.ladderMinGap;
  LADDER_MAX_REACH  = TUNING.ladderMaxReach;
  FLIP_SWING_FRAMES = TUNING.flipSwingFrames;
  FLIP_STRIKE_R     = TUNING.flipStrikeR;
  FLIP_LIFT_BASE    = TUNING.flipLiftBase;
  FLIP_LIFT_SCALE   = TUNING.flipLiftScale;
  // BIOMES (per-biom, inkl. grav/amp/step/freqs)
  const b0 = BIOMES[0], b1 = BIOMES[1], b2 = BIOMES[2], b3 = BIOMES[3], b4 = BIOMES[4];
  b0.gravity = TUNING.gravityDesert; b1.gravity = TUNING.gravityCanyon; b2.gravity = TUNING.gravityNeon; b3.gravity = TUNING.gravityIce; b4.gravity = TUNING.gravityVolcano;
  b0.terrainAmp = TUNING.terrainAmpDesert; b1.terrainAmp = TUNING.terrainAmpCanyon; b2.terrainAmp = TUNING.terrainAmpNeon; b3.terrainAmp = TUNING.terrainAmpIce; b4.terrainAmp = TUNING.terrainAmpVolcano;
  b0.terrainStep = TUNING.terrainStepDesert; b1.terrainStep = TUNING.terrainStepCanyon; b2.terrainStep = TUNING.terrainStepNeon; b3.terrainStep = TUNING.terrainStepIce; b4.terrainStep = TUNING.terrainStepVolcano;
  b0.wallFreq = TUNING.wallFreqDesert; b1.wallFreq = TUNING.wallFreqCanyon; b2.wallFreq = TUNING.wallFreqNeon; b3.wallFreq = TUNING.wallFreqIce; b4.wallFreq = TUNING.wallFreqVolcano;
  b0.spinnerFreq = TUNING.spinnerFreqDesert; b1.spinnerFreq = TUNING.spinnerFreqCanyon; b2.spinnerFreq = TUNING.spinnerFreqNeon; b3.spinnerFreq = TUNING.spinnerFreqIce; b4.spinnerFreq = TUNING.spinnerFreqVolcano;
  b0.rampFreq = TUNING.rampFreqDesert; b1.rampFreq = TUNING.rampFreqCanyon; b2.rampFreq = TUNING.rampFreqNeon; b3.rampFreq = TUNING.rampFreqIce; b4.rampFreq = TUNING.rampFreqVolcano;
  b0.barrelFreq = TUNING.barrelFreqDesert; b1.barrelFreq = TUNING.barrelFreqCanyon; b2.barrelFreq = TUNING.barrelFreqNeon; b3.barrelFreq = TUNING.barrelFreqIce; b4.barrelFreq = TUNING.barrelFreqVolcano;
  b0.houseFreq = TUNING.houseFreqDesert; b1.houseFreq = TUNING.houseFreqCanyon; b2.houseFreq = TUNING.houseFreqNeon; b3.houseFreq = TUNING.houseFreqIce; b4.houseFreq = TUNING.houseFreqVolcano;
  b0.tntFreq = TUNING.tntFreqDesert; b1.tntFreq = TUNING.tntFreqCanyon; b2.tntFreq = TUNING.tntFreqNeon; b3.tntFreq = TUNING.tntFreqIce; b4.tntFreq = TUNING.tntFreqVolcano;
  b0.cannonFreq = TUNING.cannonFreqDesert; b1.cannonFreq = TUNING.cannonFreqCanyon; b2.cannonFreq = TUNING.cannonFreqNeon; b3.cannonFreq = TUNING.cannonFreqIce; b4.cannonFreq = TUNING.cannonFreqVolcano;
  b0.bumperFreq = TUNING.bumperFreqDesert; b1.bumperFreq = TUNING.bumperFreqCanyon; b2.bumperFreq = TUNING.bumperFreqNeon; b3.bumperFreq = TUNING.bumperFreqIce; b4.bumperFreq = TUNING.bumperFreqVolcano;
  b0.cactusFreq = TUNING.cactusFreqDesert; b1.cactusFreq = TUNING.cactusFreqCanyon; b2.cactusFreq = TUNING.cactusFreqNeon; b3.cactusFreq = TUNING.cactusFreqIce; b4.cactusFreq = TUNING.cactusFreqVolcano;
  b0.spikeFreq = TUNING.spikeFreqDesert; b1.spikeFreq = TUNING.spikeFreqCanyon; b2.spikeFreq = TUNING.spikeFreqNeon; b3.spikeFreq = TUNING.spikeFreqIce; b4.spikeFreq = TUNING.spikeFreqVolcano;
  b0.waterFreq = TUNING.waterFreqDesert; b1.waterFreq = TUNING.waterFreqCanyon; b2.waterFreq = TUNING.waterFreqNeon; b3.waterFreq = TUNING.waterFreqIce; b4.waterFreq = TUNING.waterFreqVolcano;
  b4.lavaFreq = TUNING.lavaFreqVolcano; b4.geyserFreq = TUNING.geyserFreqVolcano;
  b0.coinDensity = TUNING.coinDensityDesert; b1.coinDensity = TUNING.coinDensityCanyon; b2.coinDensity = TUNING.coinDensityNeon; b3.coinDensity = TUNING.coinDensityIce; b4.coinDensity = TUNING.coinDensityVolcano;
  b0.starFreq = TUNING.starFreqDesert; b1.starFreq = TUNING.starFreqCanyon; b2.starFreq = TUNING.starFreqNeon; b3.starFreq = TUNING.starFreqIce; b4.starFreq = TUNING.starFreqVolcano;
  b0.balloonFreq = TUNING.balloonFreqDesert; b1.balloonFreq = TUNING.balloonFreqCanyon; b2.balloonFreq = TUNING.balloonFreqNeon; b3.balloonFreq = TUNING.balloonFreqIce; b4.balloonFreq = TUNING.balloonFreqVolcano;
  b0.nitroFreq = TUNING.nitroFreqDesert; b1.nitroFreq = TUNING.nitroFreqCanyon; b2.nitroFreq = TUNING.nitroFreqNeon; b3.nitroFreq = TUNING.nitroFreqIce; b4.nitroFreq = TUNING.nitroFreqVolcano;
  // Refresh upgrades (påverkar vissa globals ovanpå TUNING)
  if (typeof applyUpgrades === 'function') applyUpgrades();
}

// Gravity varies by biome — applied per-frame in update based on tire position
function gravityAtX(x) {
  const b = biomeAt(x);
  // Smooth blend across biome boundaries
  const within = x - b * BIOME_LEN;
  const t = Math.min(1, within / 500);
  const prev = b > 0 ? BIOMES[b - 1].gravity : BIOMES[0].gravity;
  return prev + (BIOMES[b].gravity - prev) * t;
}

function buildLevel() {
  // Ground level baseline (y grows downward)
  const BASE = 480;
  const seed = hashStr(`${progression.runs}-${todayKey()}-${Math.floor(Math.random() * 1000)}`);
  const rng = mulberry32(seed);
  const rnd = (a, b) => a + rng() * (b - a);
  const chance = p => rng() < p;

  // --- TERRAIN: procedurally generate control points per biome ---
  TERRAIN = [
    [-400, BASE],
    [0,    BASE],
    [260,  BASE],       // launch platform end (always flat at start)
  ];
  let prevY = BASE + 60;
  let x = 420;
  TERRAIN.push([x, prevY]);  // initial drop
  x = 620;
  TERRAIN.push([x, BASE + 20]);

  while (x < WORLD_LEN) {
    const biome = BIOMES[biomeAt(x)];
    x += biome.terrainStep + rnd(-40, 60);
    // Vertical target: oscillate around BASE by biome amplitude
    const phase = x / 400;
    const wave = Math.sin(phase) * biome.terrainAmp * 0.6;
    const noise = rnd(-biome.terrainAmp * 0.5, biome.terrainAmp * 0.5);
    let y = BASE + wave + noise;
    // Prevent too-steep jumps
    const maxDelta = 140;
    if (y - prevY > maxDelta) y = prevY + maxDelta;
    if (prevY - y > maxDelta) y = prevY - maxDelta;
    // Clamp
    y = Math.max(BASE - 260, Math.min(BASE + 140, y));
    TERRAIN.push([x, y]);
    prevY = y;
  }
  // Finish plateau
  TERRAIN.push([WORLD_LEN + 400, BASE - 60]);
  TERRAIN.push([WORLD_LEN + 800, BASE - 60]);

  LEVEL.launchX = 180;
  LEVEL.launchY = terrainAt(180);
  LEVEL.finishX = WORLD_LEN;
  LEVEL.finishCY = terrainAt(WORLD_LEN) - 240;

  // Helper: true if x sits inside any biome-start clear zone (no obstacles, trampolines, or pickups here)
  const BIOME_LAUNCH_CLEAR = 600;
  const isInBiomeLaunchZone = (xx) => {
    for (let b = 1; b < 5; b++) {
      const s = b * BIOME_LEN;
      if (xx >= s - 50 && xx < s + BIOME_LAUNCH_CLEAR) return true;
    }
    return false;
  };

  // --- OBSTACLES: distributed per biome ---
  OBSTACLES = [];
  // Flat zones that get applied to TERRAIN after obstacle placement so ramps / houses
  // sit on level ground rather than on sloped control points.
  const flats = [];
  let ox = 900;
  while (ox < WORLD_LEN - 400) {
    if (isInBiomeLaunchZone(ox)) { ox += 200; continue; }
    const biome = BIOMES[biomeAt(ox)];
    const r = rng();
    let cumul = 0;
    // Grace zone: no cactus in the first 300m (1500 world-units after launcher).
    // Player needs a clean runway before the pin-in-place hazard is in play.
    const CACTUS_GRACE_X = LEVEL.launchX + 1500;
    const cactusWeight = ox < CACTUS_GRACE_X ? 0 : (biome.cactusFreq || 0);
    // Spikes are instant-death — longer grace zone so players can warm up first.
    const SPIKE_GRACE_X = LEVEL.launchX + 3000;
    const spikeWeight = ox < SPIKE_GRACE_X ? 0 : (biome.spikeFreq || 0);
    const types = [
      ['wall',    biome.wallFreq],
      ['spinner', biome.spinnerFreq],
      ['ramp',    biome.rampFreq],
      ['barrel',  biome.barrelFreq],
      ['house',   biome.houseFreq || 0],
      ['tnt',     biome.tntFreq || 0],
      ['cannon',  biome.cannonFreq || 0],
      ['bumper',  biome.bumperFreq || 0],
      ['cactus',  cactusWeight],
      ['spike',   spikeWeight],
      ['water',   ox < SPIKE_GRACE_X ? 0 : (biome.waterFreq || 0)],
      ['lava',    ox < SPIKE_GRACE_X ? 0 : (biome.lavaFreq || 0)],
      ['geyser',  biome.geyserFreq || 0],
    ];
    const total = types.reduce((s, t) => s + t[1], 0);
    const pick = r * total;
    let chosen = 'wall';
    for (const [t, w] of types) { cumul += w; if (pick <= cumul) { chosen = t; break; } }

    if (chosen === 'wall') {
      OBSTACLES.push({ type: 'wall', x: ox, h: 60 + Math.floor(rng() * 60), broken: false });
    } else if (chosen === 'spinner') {
      OBSTACLES.push({ type: 'spinner', x: ox, y: terrainAt(ox) - 100 - rng() * 80, rot: rng() * Math.PI, speed: (rng() * 0.08 + 0.04) * (rng() < 0.5 ? -1 : 1) });
    } else if (chosen === 'ramp') {
      const h = 60 + Math.floor(rng() * 160);
      const w = 100 + Math.floor(rng() * 140);
      OBSTACLES.push({ type: 'ramp', x: ox, w, h });
      flats.push({ x1: ox - 80, x2: ox + w + 80, y: terrainAt(ox + w * 0.5) });
    } else if (chosen === 'barrel') {
      OBSTACLES.push({ type: 'barrel', x: ox, toppled: false });
      if (chance(0.5)) OBSTACLES.push({ type: 'barrel', x: ox + 38, toppled: false });
    } else if (chosen === 'house') {
      OBSTACLES.push({ type: 'house', x: ox });
      flats.push({ x1: ox - 50, x2: ox + 86 + 50, y: terrainAt(ox + 43) });
    } else if (chosen === 'tnt') {
      OBSTACLES.push({ type: 'tnt', x: ox, triggered: false });
    } else if (chosen === 'cannon') {
      // Cannon angle: 30°–65° above horizontal (upward). Stored as radians.
      const ang = (30 + rng() * 35) * Math.PI / 180;
      OBSTACLES.push({ type: 'cannon', x: ox, angle: ang, cooldown: 0 });
      flats.push({ x1: ox - 50, x2: ox + 50, y: terrainAt(ox) });
    } else if (chosen === 'bumper') {
      // Pinball-style bouncer floating above terrain
      const by = terrainAt(ox) - (120 + rng() * 140);
      OBSTACLES.push({ type: 'bumper', x: ox, y: by, r: 28, cooldown: 0, hitT: 0 });
    } else if (chosen === 'cactus') {
      // Spiky cactus that pins the tire on contact — player must escape with drag/airjump/bomb
      const h = 72 + Math.floor(rng() * 32);
      OBSTACLES.push({ type: 'cactus', x: ox, h, flashT: 0 });
      flats.push({ x1: ox - 28, x2: ox + 28, y: terrainAt(ox) });
    } else if (chosen === 'spike') {
      // Spike trap — low & wide death hazard; must be hopped/flown over.
      // Punctures the tire on contact = instant death. Shield shatters it for +200.
      const nSpikes = 3 + Math.floor(rng() * 3);  // 3–5 spikes in a row
      OBSTACLES.push({ type: 'spike', x: ox, w: 44, h: 28, n: nSpikes, broken: false, flashT: 0 });
      flats.push({ x1: ox - 28, x2: ox + 28, y: terrainAt(ox) });
    } else if (chosen === 'water') {
      // Water hole — instant death pool that sits in a depression on the terrain.
      // Wide pool, must be jumped/flown over. Shield-immune (death on contact).
      const w = 80 + Math.floor(rng() * 80);   // 80–160 wide
      const depth = 26;
      const surfaceY = terrainAt(ox + w * 0.5) + depth;
      OBSTACLES.push({ type: 'water', x: ox, w, depth, surfaceY, shimmer: rng() * Math.PI * 2 });
      flats.push({ x1: ox - 40, x2: ox + w + 40, y: terrainAt(ox + w * 0.5) + depth });
    } else if (chosen === 'lava') {
      // Lavaflod — instant-death pool av smält sten. Glödande röd/orange yta + bubblor.
      // Sköld-immun: ingen räddar dig från lava.
      const w = 90 + Math.floor(rng() * 110);  // 90–200 wide (bredare än vatten — vulkanen är otäckare)
      const depth = 30;
      const surfaceY = terrainAt(ox + w * 0.5) + depth;
      OBSTACLES.push({ type: 'lava', x: ox, w, depth, surfaceY, shimmer: rng() * Math.PI * 2, bubbleT: rng() * 60 });
      flats.push({ x1: ox - 40, x2: ox + w + 40, y: terrainAt(ox + w * 0.5) + depth });
    } else if (chosen === 'geyser') {
      // Geyser — pulserar mellan dormant/charging/erupting. Vid eruption skickas hjulet
      // skarpt uppåt om det är ovanför. Dorrmant fas är säker att rulla över.
      // Cycle: dormant 180f → charging 60f → erupting 90f (totalt ~5.5s)
      OBSTACLES.push({
        type: 'geyser',
        x: ox,
        w: 56,
        height: 220 + Math.floor(rng() * 80),  // hur högt strålen når
        cycleT: Math.floor(rng() * 330),        // random offset så de inte alla pulsar synkat
        cycleDur: 330,                           // 5.5s totalt
        boostedT: 0,                             // räknar frames sen senaste boost (cooldown per hjul)
      });
      flats.push({ x1: ox - 36, x2: ox + 36, y: terrainAt(ox) });
    }
    // Progressive biome difficulty: denser obstacle spacing in later biomes
    // (öken 0.8x, canyon 1.2x, neon 1.5x, ice 1.7x, volcano 1.9x).
    const _bi = biomeAt(ox);
    const _biomeDiff = _bi === 0 ? 0.8 : _bi === 1 ? 1.2 : _bi === 2 ? 1.5 : _bi === 3 ? 1.7 : 1.9;
    ox += (400 + rng() * 500) / _biomeDiff;
  }
  // Mega ramp near each biome boundary for drama
  const mega1x = BIOME_LEN - 200, mega1w = 200;
  const mega2x = BIOME_LEN * 2 - 200, mega2w = 220;
  const mega3x = BIOME_LEN * 3 - 200, mega3w = 240;       // neon → ice transition kicker
  const mega4x = BIOME_LEN * 4 - 200, mega4w = 260;       // ice → volcano transition kicker
  OBSTACLES.push({ type: 'ramp', x: mega1x, w: mega1w, h: 200 });
  OBSTACLES.push({ type: 'ramp', x: mega2x, w: mega2w, h: 220 });
  OBSTACLES.push({ type: 'ramp', x: mega3x, w: mega3w, h: 240 });
  OBSTACLES.push({ type: 'ramp', x: mega4x, w: mega4w, h: 260 });
  flats.push({ x1: mega1x - 100, x2: mega1x + mega1w + 100, y: terrainAt(mega1x + mega1w * 0.5) });
  flats.push({ x1: mega2x - 100, x2: mega2x + mega2w + 100, y: terrainAt(mega2x + mega2w * 0.5) });
  flats.push({ x1: mega3x - 100, x2: mega3x + mega3w + 100, y: terrainAt(mega3x + mega3w * 0.5) });
  flats.push({ x1: mega4x - 100, x2: mega4x + mega4w + 100, y: terrainAt(mega4x + mega4w * 0.5) });

  // --- APPLY FLAT ZONES: replace TERRAIN control points inside each flat range with
  // two anchor points at the same y, so ramps and houses sit on level ground.
  for (const f of flats) {
    TERRAIN = TERRAIN.filter(p => p[0] <= f.x1 || p[0] >= f.x2);
    TERRAIN.push([f.x1, f.y]);
    TERRAIN.push([f.x2, f.y]);
  }
  TERRAIN.sort((a, b) => a[0] - b[0]);

  // Biome-start launch zones: flatten terrain so the cannon always sits on level ground
  // when the player respawns into a new biome. Sample y at zone center (after mega-ramp flats
  // applied) so the platform is consistent with where the player actually lands.
  for (let b = 1; b < 5; b++) {
    const bStart = b * BIOME_LEN;
    const flatY = terrainAt(bStart + 300);
    TERRAIN = TERRAIN.filter(p => p[0] <= bStart - 50 || p[0] >= bStart + 600);
    TERRAIN.push([bStart - 50, flatY]);
    TERRAIN.push([bStart + 600, flatY]);
  }
  TERRAIN.sort((a, b) => a[0] - b[0]);

  // --- TRAMPOLINES: three tiers scattered through the world ---
  // Pass through again to place bounce pads on flat terrain, roughly one per 600-900m
  let tx = 900;
  while (tx < WORLD_LEN - 400) {
    if (isInBiomeLaunchZone(tx)) { tx += 200; continue; }
    // Avoid placing directly on top of existing obstacles
    const conflict = OBSTACLES.some(o => Math.abs((o.x || 0) - tx) < 90 && o.type !== 'finish');
    if (!conflict) {
      const roll = rng();
      let tier, power, score, w, h;
      if (roll < 0.55)        { tier = 'mini';  power = TUNING.trampMiniPower; score = 60;  w = 58; h = 16; }
      else if (roll < 0.88)   { tier = 'std';   power = TUNING.trampStdPower;  score = 120; w = 72; h = 20; }
      else                    { tier = 'mega';  power = TUNING.trampMegaPower; score = 250; w = 92; h = 26; }
      OBSTACLES.push({ type: 'trampoline', x: tx, tier, power, score, w, h, cooldown: 0 });
    }
    tx += 580 + rng() * 420;
  }

  OBSTACLES.push({ type: 'finish', x: WORLD_LEN, cy: 0 });

  // --- LADDER-MEN: scatter along the track, each draggable within its slot ---
  state.ladders = [];
  {
    const startX = LEVEL.launchX + LADDER_MIN_GAP + 200;
    const endX   = WORLD_LEN - 1400;
    let lx = startX;
    const positions = [];
    while (lx < endX) {
      positions.push(lx);
      lx += 1700 + rng() * 1200;
    }
    for (let i = 0; i < positions.length; i++) {
      const spawn = positions[i];
      const prev = i > 0 ? positions[i - 1] : LEVEL.launchX + LADDER_MIN_GAP;
      const next = i < positions.length - 1 ? positions[i + 1] : endX + 200;
      const slotMin = Math.max(LEVEL.launchX + LADDER_MIN_GAP, (prev + spawn) / 2 + 120);
      const slotMax = Math.min(WORLD_LEN - 500, (spawn + next) / 2 - 120);
      state.ladders.push({
        x: spawn,
        spawn,
        slotMin: Math.min(slotMin, spawn),
        slotMax: Math.max(slotMax, spawn),
        grabbed: false,
        cooldown: 0,
        walking: 0,
        tilt: LADDER_TILT_DX,
      });
    }
  }

  // --- PICKUPS: procedural clusters ---
  PICKUPS = [];
  let px = 700;
  while (px < WORLD_LEN - 100) {
    if (isInBiomeLaunchZone(px)) { px += 200; continue; }
    const biome = BIOMES[biomeAt(px)];
    const terrY = terrainAt(px);
    // Progressive biome difficulty scales pickup density too, so rewards track risk.
    const _pbi = biomeAt(px);
    const _pDiff = _pbi === 0 ? 1.0 : _pbi === 1 ? 1.3 : _pbi === 2 ? 1.6 : _pbi === 3 ? 1.5 : 1.7;
    // Coin arc
    if (chance(0.55)) {
      const arcLen = 3 + Math.floor(rng() * (biome.coinDensity + 2));
      const peak = 80 + rng() * 80;
      for (let i = 0; i < arcLen; i++) {
        const cx = px + i * 50;
        const t = i / Math.max(1, arcLen - 1);
        const cy = terrainAt(cx) - 60 - Math.sin(t * Math.PI) * peak;
        PICKUPS.push({ type: 'coin', x: cx, y: cy, taken: false });
      }
      px += (arcLen * 50 + 120) / _pDiff;
      continue;
    }
    // Star
    if (chance(biome.starFreq * 0.25)) {
      PICKUPS.push({ type: 'star', x: px, y: terrY - 150 - rng() * 80, taken: false });
      px += 250 / _pDiff;
      continue;
    }
    // Balloon cluster
    if (chance(biome.balloonFreq * 0.3)) {
      const n = 1 + Math.floor(rng() * 3);
      for (let i = 0; i < n; i++) {
        PICKUPS.push({ type: 'balloon', x: px + i * 90, y: terrainAt(px + i * 90) - 180 - rng() * 80, taken: false });
      }
      px += (n * 90 + 150) / _pDiff;
      continue;
    }
    // Power-up slot: airjump common, nitro + bomb slightly rarer, shield rare, medkit & power equally uncommon
    if (chance(biome.nitroFreq * 0.7)) {
      const r = rng();
      let powerType;
      if (r < 0.24)      powerType = 'airjump';
      else if (r < 0.40) powerType = 'nitro';
      else if (r < 0.54) powerType = 'bomb';
      else if (r < 0.66) powerType = 'magnet';
      else if (r < 0.76) powerType = 'shield';
      else if (r < 0.88) powerType = 'medkit';
      else               powerType = 'power';
      PICKUPS.push({ type: powerType, x: px, y: terrY - 120 - rng() * 60, taken: false });
      px += 220 / _pDiff;
      continue;
    }
    px += (150 + rng() * 180) / _pDiff;
  }

  LEVEL.totalStars = PICKUPS.filter(p => p.type === 'star').length;
  starsMaxEl.textContent = LEVEL.totalStars;
  PICKUPS.forEach((p, i) => { if (p.type === 'balloon') p.baseY = p.y; p._i = i; });
}

// Interpolate terrain y at given world x (smoothstep between control points).
// Binary search + monotone-hint cache: turns the hot terrain sampler from O(n) per call
// to O(log n) worst-case and O(1) for sequential access (render loops stepping left→right).
let _terrainHint = 0;
function terrainAt(x) {
  const T = TERRAIN;
  const last = T.length - 1;
  if (x <= T[0][0]) return T[0][1];
  if (x >= T[last][0]) return T[last][1];
  // Fast path: check hint and immediate neighbors (rendering is mostly sequential in x)
  let i = _terrainHint;
  if (i > last - 1) i = last - 1;
  if (i < 0) i = 0;
  if (x >= T[i][0] && x <= T[i + 1][0]) {
    // hit
  } else if (i + 1 <= last - 1 && x >= T[i + 1][0] && x <= T[i + 2][0]) {
    i = i + 1;
  } else {
    // Binary search
    let lo = 0, hi = last - 1;
    while (lo <= hi) {
      const m = (lo + hi) >> 1;
      if (x < T[m][0]) hi = m - 1;
      else if (x > T[m + 1][0]) lo = m + 1;
      else { i = m; break; }
    }
  }
  _terrainHint = i;
  const [x1, y1] = T[i], [x2, y2] = T[i + 1];
  const t = (x - x1) / (x2 - x1);
  const s = t * t * (3 - 2 * t);
  return y1 + (y2 - y1) * s;
}
function terrainSlope(x) {
  const d = 4;
  return (terrainAt(x + d) - terrainAt(x - d)) / (2 * d);
}

// ====== STATE ======
const state = {
  phase: PHASE.AIM,
  rpm: 0,
  rpmMaxHoldT: 0,            // frames remaining at MAX before RPM drops back to 0
  gassing: false,
  angle: 45,
  angleDir: 0,
  tire: null,
  cam: { x: 0, y: 0, zoom: 0.6, userZoomNear: 1, userZoomFar: 1 },
  score: 0,
  coinsRun: 0,
  starsGot: 0,
  tiresLeft: 5,
  maxX: 0,
  particles: [],
  popups: [],                // floating +N text particles
  tornados: [],              // 🌪️ aktiva tornadoer (bara öken-biome)
  tornadoSpawnT: 0,          // frames kvar till nästa möjliga spawn-roll
  birds: [],                 // 🐦 fågelflockar
  birdSpawnT: 60,            // frames till nästa flock
  penguins: [],              // 🐧 marklevande pingvinflockar (isbiomen)
  penguinSpawnT: 240,        // frames till nästa pingvinflock
  freezeWind: 0,             // > 0 = aktiv frysande vind, värde = frames kvar
  freezeWindT: 0,            // frames sedan aktivering (för fade-in/varning)
  freezeWindNextT: 600,      // frames till nästa möjliga frysvind
  health: 100,               // hjulets hälsa (0-100). Vid 0 → finishRun.
  damageFlashT: 0,           // röd blink på hjulet vid skada
  fireballs: [],             // 🔥 fallande eldbollar (vulkanen)
  fireballSpawnT: 90,        // frames till nästa möjliga eldboll
  ashParticles: [],           // 💨 ask som driver i bakgrunden (vulkanen)
  storms: [],                // ⛈️ åskmoln (sällsynta)
  stormSpawnT: 1500,         // frames till nästa stormroll (~25s)
  wetGrounds: [],            // {x1,x2,until} marker som är blöta efter regn
  lightningFlashT: 0,        // visuell blixt-overlay frames
  combo: { count: 0, timer: 0, mult: 1 },
  time: 0,
  startLaunchX: 0,
  groundContactT: 0,
  wind: { strength: 0, target: 0, nextChange: 0 },
  windScale: 1,              // full wind at launch, decays on each ground bounce
  windDisabled: false,       // tap on wind-HUD togglar av/på all vindkraft (sparas i localStorage)
  nitroCharges: 0,
  airjumpCharges: 0,         // 🪂 airborne bounces, max 3
  magnetCharges: 0,          // 🧲 magnets, max 3
  bombCharges: 0,            // 💣 instant up+right blast, max 5
  shieldCharges: 0,          // 🛡️ activates 3s invulnerability, max 3
  shieldT: 0,                // active shield frames (3s = 180)
  magnetT: 0,                // active magnet frames (5s = 300)
  perfect: false,
  stompWindow: 0,            // frames of "perfect stomp" active window
  stompCooldown: 0,
  stompWhiffT: 0,            // frames left to land a stomp-boost; expires → -15% vx penalty
  trampTapBoostT: 0,         // armed pre-impact tap: trampoline collision reads this for +50% bounce
  trampLandT: -999,          // last frame the tire landed on a trampoline (for post-impact tap boost)
  trampImpactSpeed: 0,       // bounce magnitude from last trampoline landing (drives post-tap boost size)
  nitroBoostT: 0,            // frames where tire can exceed the normal speed cap (nitro burst)
  launchBoostT: 0,           // brief window right after firing where cap is raised so initial shot feels punchy
  rollBudget: 0,             // drag-to-relaunch pool; depletes across all slow-downs in one shot
  rollBudgetMax: 40,         // pool ceiling in percent units (40 base, +powerExtra up to 210, total cap 250)
  powerExtra: 0,             // bought extra units (30 per shop purchase, max 210). Consumable — drains on use.
  rollActive: false,         // meter visible + drag accepted
  rollTapFlash: 0,           // frames of visual feedback on last relaunch
  rollAssistT: 0,            // after relaunch: slope can't drag ball backward
  relaunchDrag: { active: false, pid: -1, startX: 0, startY: 0, curX: 0, curY: 0 },
  landT: -999,               // frame when tire transitioned air→ground (for power-bounce timing)
  landImpactSpeed: 0,        // magnitude of vertical impact at last land (drives bounce size)
  pendingBounceT: 0,         // pre-landing tap buffer: tap slightly before land still bounces
  superStudsT: 0,            // frame when stomp+trampoline combo primed the super-bounce window
  flightMult: 1,             // in-flight combo multiplier
  flightMultDecayT: 0,       // frames-on-ground before decay step
  airTimeFrames: 0,          // consecutive airborne frames
  rotAccum: 0,               // accumulated rotation this flight for trick detection
  flipsCounted: 0,           // flips already awarded this flight
  scorePulseT: 0,            // score pulse animation frames
  recordCelebT: 0,           // new-record celebration frames
  recordTriggered: false,    // celebrate once per run
  nearMissFrames: {},        // obstacleIdx -> frame# awarded, prevent double-counting
  hitstop: 0,                // frames to freeze physics
  slowMoT: 0, slowMoCooldown: 0, timeScale: 1,
  finishPending: 0,          // frames until finishRun fires (lets player see outcome)
  finishResult: true,        // what to pass to finishRun when pending expires
  finishStuck: false,        // freeze tire at impact point during pending
  finishStickX: 0, finishStickY: 0,
  stuckOnCactus: null,       // { pinX, pinY, side } while impaled; cleared by any escape action
  highScore: parseInt(localStorage.getItem(HS_KEY) || '0', 10) || 0,
  newRecord: false,
  ladders: [],               // populated per-run; each { x, slotMin, slotMax, grabbed, cooldown, walking }
};

// Ladder config (bound to TUNING)
let LADDER_LEN       = TUNING.ladderLen;
let LADDER_TILT_DX   = TUNING.ladderTiltDx;
let LADDER_THICK     = TUNING.ladderThick;
let LADDER_BOUNCE_VY = TUNING.ladderBounceVy;
let LADDER_MIN_GAP   = TUNING.ladderMinGap;
let LADDER_MAX_REACH = TUNING.ladderMaxReach;

// Returns { baseX, baseY, topX, topY, dir } for the given ladder index
function ladderPose(i) {
  const L = state.ladders[i];
  const baseX = L.x;
  const baseY = terrainAt(baseX);
  const dir   = (LEVEL.launchX < baseX) ? -1 : 1; // sign toward launcher
  const tilt  = (L.tilt !== undefined) ? L.tilt : LADDER_TILT_DX;
  const topX  = baseX - dir * tilt;
  const topY  = baseY - LADDER_LEN;
  return { baseX, baseY, topX, topY, dir };
}

// True if any ladder is currently being dragged
function anyLadderGrabbed() {
  for (let i = 0; i < state.ladders.length; i++) {
    if (state.ladders[i].grabbed) return true;
  }
  return false;
}

function addPopup(x, y, text, color) {
  state.popups.push({ x, y, vy: -2.4, life: 55, max: 55, text, color: color || '#fbbf24' });
}

// ====== INPUT ======
function startGas() { if (state.phase === PHASE.AIM) state.gassing = true; }
function endGas()   { state.gassing = false; }
function fire() {
  // fire() is only the shoot-from-aim action; in-flight abilities use dedicated inputs
  if (state.phase !== PHASE.AIM) return;
  if (state.tiresLeft <= 0) { flashToast('INGA DÄCK KVAR!', '#ef4444'); return; }
  if (state.rpm < 8) { flashToast('FÖR LÅG RPM!', '#ef4444'); return; }
  state.tiresLeft--;
  const rad = state.angle * Math.PI / 180;
  const lx = LEVEL.launchX + 60 + Math.cos(rad) * 80;
  const ly = LEVEL.launchY - 25 - Math.sin(rad) * 80;
  // Base velocity + PERFECT zone bonus — launch window lets this briefly exceed the normal cap
  // 1.44x boost (was 1.2x) — max-RPM shots now reach ~20% further so nailing the
  // release window is rewarded, especially since the RPM meter resets to 0 every ~200ms.
  let v = (state.rpm * 0.14 + 5.8) * 1.44;
  const isPerfect = state.rpm >= PERFECT_MIN && state.rpm <= PERFECT_MAX;
  if (isPerfect) {
    v *= 1.25;
    state.perfect = true;
    runStats.perfectShots++;
    flashToast('PERFEKT SKOTT! x1.25', '#10b981');
    shake(22);
  }
  // Range boost from mid-shop — +15% per stack
  if (state.rangeBoost > 0) v *= (1 + 0.15 * state.rangeBoost);
  const a = -state.angle * Math.PI / 180;
  state.tire = {
    x: lx, y: ly,
    vx: Math.cos(a) * v,
    vy: Math.sin(a) * v,
    rot: 0, vrot: v * 0.08,
    trail: [],
    rpmAtShot: state.rpm,
    anglAtShot: state.angle,
  };
  state.phase = PHASE.FLY;
  state.startLaunchX = lx;
  state.maxX = lx;
  state.rpm = 0;
  state.rpmMaxHoldT = 0;
  state.launchBoostT = TUNING.launchBoostFrames;
  // Power meter (drag-to-relaunch): base 40% + consumable powerExtra (30 per shop, max 210).
  // 0 extras → 40%, max 5 buys (150 extras) + pickups → 250% cap. Extras deplete on use — must restock.
  state.rollBudgetMax = 40 + (state.powerExtra || 0);
  state.rollBudget = state.rollBudgetMax;
  state.rollActive = false;
  state.rollTapFlash = 0;
  state.rollAssistT = 0;
  state.relaunchDrag.active = false;
  state.relaunchDrag.pid = -1;
  state.landT = -999;
  state.trampLandT = -999;
  state.trampTapBoostT = 0;
  state.superStudsT = 0;
  state.flightMult = 1;
  state.flightMultDecayT = 0;
  state.airTimeFrames = 0;
  state.rotAccum = 0;
  state.flipsCounted = 0;
  state.recordTriggered = false;
  state.nearMissFrames = {};
  state._mult3 = state._mult5 = state._mult10 = false;
  state.windScale = 1;
  state.antiLoop = { events: [], kickT: 0 };
  state.tornados = [];
  state.tornadoSpawnT = 60; // första rollen redan ~1s in i flykten
  state.birds = [];
  state.birdSpawnT = 60;
  state.penguins = [];
  state.penguinSpawnT = 240;
  state.freezeWind = 0;
  state.freezeWindT = 0;
  state.freezeWindNextT = 600 + Math.floor(Math.random() * 600);
  state.storms = [];
  state.stormSpawnT = 450 + Math.floor(Math.random() * 300); // 15-25s till första rollen
  state.wetGrounds = [];
  state.lightningFlashT = 0;
  state.health = 100;
  state.damageFlashT = 0;
  // aim-HUD byter syfte under FLY (visar HÄLSA + KRAFT istället för RPM + VINKEL)
  updateFireButton();
  shake(isPerfect ? 22 : 14);
  sfxLaunch();
  if (isPerfect) {
    addParticles(lx, ly, '#10b981', 30, { up: 6, spread: 10, size: 4 });
    addParticles(lx, ly, '#fbbf24', 20, { up: 4, spread: 8, size: 3 });
  }
}

function unstickFromCactus(vx, vy) {
  if (!state.stuckOnCactus || !state.tire) return;
  const t = state.tire;
  // Nudge tire away from the cactus so next frame's collision check clears
  const side = state.stuckOnCactus.side;
  t.x += side === 'left' ? -6 : 6;
  t.y -= 4;
  if (typeof vx === 'number') t.vx = vx;
  if (typeof vy === 'number') t.vy = vy;
  addParticles(t.x, t.y, '#84cc16', 18, { up: 4, spread: 7, size: 3 });
  flashToast('🌵 LOSSAD!', '#84cc16');
  tone(440, 0.08, 'sine', 0.14, 300);
  state.stuckOnCactus = null;
}

function useAirjump() {
  if (!state.tire || state.phase !== PHASE.FLY || state.airjumpCharges <= 0) return;
  const t = state.tire;
  state.airjumpCharges--;
  if (state.stuckOnCactus) unstickFromCactus();
  // Big upward bounce regardless of position, small forward carry
  t.vy = -TUNING.airJumpPower;
  t.vx *= 1.1;
  if (Math.abs(t.vx) < 4) t.vx += Math.sign(t.vx || 1) * 2;
  state.landT = -999;     // consume any landing window so powerBounce doesn't stack
  bumpMult(0.3);
  awardScore(50, '🪂 AIR JUMP!', '#60a5fa');
  addParticles(t.x, t.y + TIRE_R, '#60a5fa', 20, { up: 4, spread: 7, size: 3, shape: 'circle' });
  addParticles(t.x, t.y + TIRE_R, '#fbbf24', 10, { up: 3, spread: 5, size: 2 });
  shake(8);
  tone(880, 0.12, 'sine', 0.18, 400);
  setTimeout(() => tone(1320, 0.08, 'sine', 0.14, 300), 60);
  updateAirjumpBadge();
}

function useMagnet() {
  if (!state.tire || state.phase !== PHASE.FLY || state.magnetCharges <= 0) return;
  if (state.magnetT > 0) return;  // already active
  state.magnetCharges--;
  state.magnetT = TUNING.magnetDuration;
  flashToast('🧲 MAGNET!', '#a855f7');
  shake(4);
  tone(520, 0.1, 'triangle', 0.14, 300);
  setTimeout(() => tone(780, 0.1, 'triangle', 0.14, 300), 80);
  setTimeout(() => tone(1040, 0.12, 'triangle', 0.16, 400), 160);
  updateMagnetBadge();
}

function useNitro() {
  if (!state.tire || state.nitroCharges <= 0) return;
  const t = state.tire;
  state.nitroCharges--;
  runStats.nitroUsed++;
  if (state.stuckOnCactus) {
    // When stuck, nitro kicks up+away-from-cactus so we have velocity for the boost math below
    const away = state.stuckOnCactus.side === 'left' ? -1 : 1;
    unstickFromCactus(away * 8, -6);
  }
  const speed = Math.sqrt(t.vx * t.vx + t.vy * t.vy) || 1;
  const dx = t.vx / speed, dy = t.vy / speed;
  t.vx += dx * NITRO_POWER;
  t.vy += dy * NITRO_POWER - 2;
  // Open the high-speed window: nitro is the only source of "crazy fast"
  state.nitroBoostT = TUNING.nitroBoostFrames;
  flashToast('🔥 NITRO!', '#ef4444');
  shake(16);
  state.hitstop = 4;
  sfxLaunch();
  for (let i = 0; i < 40; i++) {
    state.particles.push({
      x: t.x - dx * 20, y: t.y - dy * 20,
      vx: -dx * (3 + Math.random() * 5) + (Math.random() - 0.5) * 4,
      vy: -dy * (3 + Math.random() * 5) + (Math.random() - 0.5) * 4,
      life: 35 + Math.random() * 25, max: 60,
      color: Math.random() < 0.5 ? '#ef4444' : '#fbbf24',
      size: 3 + Math.random() * 3,
      g: 0.05, shape: 'circle',
    });
  }
  updateNitroBadge();
}

function useBomb() {
  if (!state.tire || state.phase !== PHASE.FLY || state.bombCharges <= 0) return;
  const t = state.tire;
  state.bombCharges--;
  if (state.stuckOnCactus) unstickFromCactus();
  // Fixed up+right blast — mirrors the cannon/TNT feel but always launches the ball the
  // same way so the player has a reliable "get me out of here" escape tool.
  const BLAST = 24;
  const ang = -Math.PI / 3;   // 60° up-right
  t.vx = Math.cos(ang) * BLAST + 4;
  t.vy = Math.sin(ang) * BLAST - 4;
  state.nitroBoostT = Math.max(state.nitroBoostT, 30);
  state.launchBoostT = Math.max(state.launchBoostT, 70);
  state.landT = -999;
  bumpMult(0.4);
  awardScore(180, '💣 BOMB!', '#ef4444');
  addParticles(t.x, t.y, '#ef4444', 40, { up: 8, spread: 14, size: 5 });
  addParticles(t.x, t.y, '#fbbf24', 28, { up: 6, spread: 10, size: 4 });
  addParticles(t.x, t.y, '#fef3c7', 18, { up: 4, spread: 8, size: 3 });
  shake(22);
  state.hitstop = 5;
  tone(120, 0.2, 'sawtooth', 0.25, -400);
  setTimeout(() => tone(80, 0.15, 'sawtooth', 0.2, -600), 60);
  updateBombBadge();
}

function useShield() {
  if (!state.tire || state.phase !== PHASE.FLY || state.shieldCharges <= 0) return;
  if (state.shieldT > 0) return;  // already active
  state.shieldCharges--;
  state.shieldT = 600;  // 10s at 60fps
  flashToast('🛡️ SKÖLD!', '#22d3ee');
  shake(6);
  tone(660, 0.1, 'sine', 0.14, 300);
  setTimeout(() => tone(990, 0.1, 'sine', 0.14, 300), 80);
  setTimeout(() => tone(1320, 0.12, 'sine', 0.16, 400), 160);
  addParticles(state.tire.x, state.tire.y, '#22d3ee', 28, { up: 6, spread: 10, size: 4 });
  updateShieldBadge();
}

function bumpMult(add, label) {
  if (state.phase !== PHASE.FLY) return;
  state.flightMult = Math.min(10, state.flightMult + add);
  state.flightMultDecayT = 0;
  // Thresholds for juice
  const m = state.flightMult;
  if (m >= 10 && !state._mult10) { state._mult10 = true; state.hitstop = 6; shake(22); flashToast('x10 INFERNO!', '#ef4444'); tone(1400, 0.2, 'square', 0.25, 600); }
  else if (m >= 5 && !state._mult5) { state._mult5 = true; state.hitstop = 3; shake(12); flashToast('x5 ON FIRE!', '#f97316'); tone(1000, 0.15, 'square', 0.2, 400); }
  else if (m >= 3 && !state._mult3) { state._mult3 = true; shake(6); flashToast('x3 COMBO!', '#fbbf24'); tone(700, 0.1, 'square', 0.15, 200); }
  if (label) flashToast(label, '#fbbf24');
}

function awardScore(base, label, color) {
  const mult = state.flightMult > 1 ? state.flightMult : 1;
  const gain = Math.round(base * mult);
  state.score += gain;
  // Anti-exploit: om spelaren farmar poäng i en tight loop (t.ex. stege↔spinner-studs)
  // så kickas däcket åt ett slumpat håll för att bryta money-buggen.
  if (state.tire) {
    if (!state.antiLoop) state.antiLoop = { events: [], kickT: 0 };
    state.antiLoop.events.push({ t: state.time, x: state.tire.x, gain });
    const cutoff = state.time - 120; // 2s fönster
    while (state.antiLoop.events.length && state.antiLoop.events[0].t < cutoff) {
      state.antiLoop.events.shift();
    }
    if (state.time >= state.antiLoop.kickT && state.antiLoop.events.length >= 4) {
      let sum = 0, minX = Infinity, maxX = -Infinity;
      for (const e of state.antiLoop.events) {
        sum += e.gain;
        if (e.x < minX) minX = e.x;
        if (e.x > maxX) maxX = e.x;
      }
      if (sum > 2500 && (maxX - minX) < 180) {
        const t = state.tire;
        t.vx = 10 + Math.random() * 6;           // 10–16 framåt
        t.vy = -(5 + Math.random() * 6);         // 5–11 uppåt
        t.vrot = (Math.random() - 0.5) * 0.5;
        addParticles(t.x, t.y, '#fde047', 22, { up: 6, spread: 9, size: 3 });
        addParticles(t.x, t.y, '#f472b6', 12, { up: 4, spread: 6, size: 2 });
        flashToast('🎲 SLUMPSTUDS', '#fde047');
        tone(700, 0.1, 'square', 0.15, 220);
        state.antiLoop.events = [];
        state.antiLoop.kickT = state.time + 180; // 3s cooldown innan ny kick
      }
    }
  }
  if (label && state.tire) {
    const l = mult > 1.5 ? `${label} +${gain} (x${mult.toFixed(1)})` : `${label} +${gain}`;
    addPopup(state.tire.x, state.tire.y - 40, l, color || '#fbbf24');
  }
  state.scorePulseT = 12;
  return gain;
}

// Flipper timing windows (also read by ramp physics + render, bound to TUNING)
let FLIP_SWING_FRAMES = TUNING.flipSwingFrames;
let FLIP_STRIKE_R     = TUNING.flipStrikeR;
let FLIP_LIFT_BASE    = TUNING.flipLiftBase;
let FLIP_LIFT_SCALE   = TUNING.flipLiftScale;

// Ramp is tappable only if the tire is actually in the swing's reach zone
function nearestFlipperInRange() {
  if (!state.tire) return null;
  const t = state.tire;
  let best = null, bestDx = Infinity;
  for (const o of OBSTACLES) {
    if (o.type !== 'ramp') continue;
    const cx = o.x + o.w * 0.5;
    const dx = Math.abs(t.x - cx);
    // Tight approach window — tire must be within 1.5× the ramp's own width.
    // Stops spam-tap from arming flippers from the other end of the biome.
    if (dx > o.w * 1.5) continue;
    if (dx >= bestDx) continue;
    const gy = terrainAt(cx);
    const tipYReach = (gy - o.h) - (o.h * FLIP_LIFT_SCALE + FLIP_LIFT_BASE);
    if (t.y > gy + 10) continue;                       // below ground line
    if (t.y < tipYReach - 200) continue;               // too far above — swing can't plausibly reach
    if ((o._flipCooldown || 0) > 0) continue;
    if ((o._flipSwingT || 0) > 0) continue;            // already swinging
    best = o; bestDx = dx;
  }
  return best;
}

// Flipper tap: just arms the swing — physics loop handles actual hit-detection + timing-based kick
function flipperTap() {
  if (!state.tire || state.phase !== PHASE.FLY) return false;
  const t = state.tire;
  // Must be actually moving into a ramp — spam-tapping with a stalled tire no longer arms it
  if (Math.abs(t.vx) < 6) return false;
  const o = nearestFlipperInRange();
  if (!o) return false;
  o._flipSwingT = FLIP_SWING_FRAMES;
  o._flipSwingMax = FLIP_SWING_FRAMES;
  o._flipHit = false;
  tone(420, 0.04, 'square', 0.1, 60);
  return true;
}

// Drag-to-relaunch: replaces tap-to-roll when ball is stuck. Drag vector = launch direction,
// drag length = power fraction. Short drags preserve budget; full drag dumps all remaining power.
const RELAUNCH_DRAG_MAX = 140;   // px of drag = 100% power
const RELAUNCH_DRAG_MIN = 18;    // below this = tap, no launch, budget preserved
function executeRelaunch(dxScreen, dyScreen) {
  if (!state.tire || state.phase !== PHASE.FLY) return false;
  if (state.rollBudget <= 0) return false;
  const len = Math.hypot(dxScreen, dyScreen);
  if (len < RELAUNCH_DRAG_MIN) return false;
  const t = state.tire;
  // Capture stuck-state before clearing it so we can bias direction & teleport clear of the cactus
  const wasStuck = state.stuckOnCactus;
  if (state.stuckOnCactus) unstickFromCactus();
  const pRaw = Math.min(1, len / RELAUNCH_DRAG_MAX);
  const p = pRaw >= 0.95 ? 1 : pRaw;
  // Max-cap per skott: även om poolen har 300% kvar så dumpar ett enda fulldrag max 25 units (3 pulls från 75 base).
  // Drag-mängden avgör skottets styrka (0..1); kostnaden skalar mot MAX_CONSUME_PER_SHOT, inte hela poolen.
  const MAX_CONSUME_PER_SHOT = 25;
  const consume = Math.min(state.rollBudget, p * MAX_CONSUME_PER_SHOT);
  const power = Math.min(1, consume / MAX_CONSUME_PER_SHOT);
  const powClamp = Math.min(1.2, power);
  // Direction in game coords: screen y-down matches world y-down, so no sign flip
  const inv = 1 / len;
  let dirX = dxScreen * inv;
  let dirY = dyScreen * inv;
  // Cactus-escape: dragging horizontally must FLY away from the cactus, not skim back into it.
  // Force the horizontal component to point away from the cactus and add a guaranteed upward kick,
  // then teleport the tire well clear so the next collision check doesn't re-pin it.
  if (wasStuck) {
    const obsX = wasStuck.obsX != null ? wasStuck.obsX : t.x;
    const awaySign = (dirX !== 0)
      ? Math.sign(dirX)
      : (wasStuck.side === 'left' ? -1 : 1);
    // Mirror dirX if the drag pointed back into the cactus
    if (Math.sign(dirX) !== awaySign) dirX = -dirX;
    // Guarantee upward component: at least 0.45 of unit vector going up
    if (dirY > -0.45) dirY = -0.45;
    // Renormalize so the unit vector stays a unit vector
    const dn = Math.hypot(dirX, dirY) || 1;
    dirX /= dn; dirY /= dn;
    // Teleport tire well clear of the cactus body (cactus width is 32, plus tire radius + buffer)
    t.x = obsX + awaySign * (TIRE_R + 32);
    t.y -= 12;
  }
  // Momentum bonus: drags aligned with current velocity get extra speed; perpendicular = half; opposite = none
  const curSpd = Math.hypot(t.vx, t.vy);
  let momentumBonus = 0;
  if (curSpd > 1) {
    const alignment = (dirX * t.vx + dirY * t.vy) / curSpd; // -1..1
    const alignFactor = (alignment + 1) * 0.5;              // 0..1
    momentumBonus = alignFactor * curSpd * 0.6;
  }
  const BASE_SPEED = 14;
  const speed = powClamp * BASE_SPEED + 2 + momentumBonus;
  t.vx = dirX * speed;
  t.vy = dirY * speed;
  state.rollBudget = Math.max(0, state.rollBudget - consume);
  state.rollAssistT = 40;
  state.rollTapFlash = 10;
  state.launchBoostT = 70;
  addParticles(t.x, t.y, '#fbbf24', 16, { up: 4, spread: 6, size: 3 });
  addParticles(t.x, t.y, '#ef4444', 10, { up: 3, spread: 5, size: 2, shape: 'circle' });
  tone(380 + powClamp * 520, 0.08, 'square', 0.14, 260);
  if (momentumBonus > 6)     flashToast('⚡ MOMENTUM!',     '#f97316');
  else if (p >= 1)           flashToast('⚡ FULL POWER!',   '#22c55e');
  else if (p < 0.3)          flashToast('SPARAT KRAFT',    '#60a5fa');
  if (state.rollBudget <= 0) flashToast('SLUT PÅ KRAFT!',  '#ef4444');
  shake(Math.round(3 + powClamp * 6 + momentumBonus * 0.4));
  return true;
}

// Trampoline-tap helper: returns a nearby trampoline if the tire is positioned such
// that a tap should count as a "bounce-timing boost" rather than a stomp dive.
// Checks: pad within 60px x-slack from tire, pad top between 200px below and 40px above tire.
function findTrampolineForTap(t) {
  if (!OBSTACLES || !t) return null;
  for (let i = 0; i < OBSTACLES.length; i++) {
    const o = OBSTACLES[i];
    if (o.type !== 'trampoline' || o.cooldown > 0) continue;
    if (Math.abs(t.x - o.x) > (o.w || 72) / 2 + 60) continue;
    const gy = terrainAt(o.x);
    const padTop = gy - (o.h || 20);
    if (t.y + TIRE_R > padTop - 200 && t.y - TIRE_R < padTop + 40) return o;
  }
  return null;
}

function stomp() {
  if (!state.tire || state.phase !== PHASE.FLY) return;
  if (state.stompCooldown > 0) return;
  const t = state.tire;
  // Only meaningful when airborne
  const airborne = (state.time - state.groundContactT) > 4;
  if (!airborne) return;

  // Trampoline tap-boost: if tire is heading into a trampoline OR just bounced off one,
  // convert this tap into a +50% bounce instead of a stomp dive. The player expects
  // "tap near trampoline = higher bounce", not "slam down into the pad".
  const postTramp = state.trampLandT > 0 && (state.time - state.trampLandT) < 10;
  if (postTramp && t.vy < 0) {
    // Already bounced — add +50% of the impact speed as extra upward velocity.
    const extra = (state.trampImpactSpeed || 0) * 0.5;
    t.vy -= extra;                    // more upward
    t.vx *= 1.08;                     // slight forward carry
    state.trampLandT = -999;          // consume
    addParticles(t.x, t.y, '#fbbf24', 18, { up: 5, spread: 7, size: 3 });
    addParticles(t.x, t.y, '#f472b6', 12, { up: 4, spread: 5, size: 3 });
    shake(10);
    tone(1400, 0.1, 'triangle', 0.16, 400);
    awardScore(150, '🎯 TAJMAD STUDS!', '#fbbf24');
    state.stompCooldown = 10;
    return;
  }
  const nearTramp = findTrampolineForTap(t);
  if (nearTramp) {
    // Arm pre-impact boost; trampoline collision reads trampTapBoostT for +50% tapMult.
    state.trampTapBoostT = 18;
    addParticles(t.x, t.y, '#fbbf24', 12, { up: 3, spread: 4, size: 3 });
    tone(900, 0.06, 'triangle', 0.12, 300);
    state.stompCooldown = 8;
    return;
  }

  t.vy += TUNING.stompImpulseY;
  t.vx *= 0.92;
  t.vx += Math.sign(t.vx || 1) * 1.5;
  runStats.stompsUsed++;
  state.stompWindow = TUNING.stompWindowFrames;
  state.stompCooldown = TUNING.stompCooldown;
  state.stompWhiffT = TUNING.stompWhiffFrames;     // cleared on trampoline/ramp hit; expiring → vx penalty
  // Shockwave particles
  for (let i = 0; i < 14; i++) {
    state.particles.push({
      x: t.x, y: t.y + TIRE_R,
      vx: (Math.random() - 0.5) * 6,
      vy: Math.random() * 3 + 1,
      life: 26, max: 40,
      color: '#60a5fa',
      size: 3, g: 0.2, shape: 'circle',
    });
  }
  tone(440, 0.06, 'sawtooth', 0.1, -200);
}

// Power-bounce: tap-timing window after landing. Bounce size = impact × timing mult.
function powerBounce() {
  if (!state.tire || state.phase !== PHASE.FLY) return false;
  const dt = state.time - state.landT;
  if (dt < 0 || dt > 30) return false;
  // Require the tire to actually be touching (or just left) ground/surface — no mid-air bounces.
  // Window widened 6 → 12 so a tap slightly after landing still registers.
  if ((state.time - state.groundContactT) > 12) return false;
  const t = state.tire;
  // Scale bounce from landing impact — soft land = soft bounce, hard stomp = huge bounce
  const impact = state.landImpactSpeed || Math.abs(t.vy) || 2;
  // Superstuds chain: stomp → trampoline → bounce-tap (all within window) = mega payoff
  const superChain = (state.superStudsT > 0) && (state.time - state.superStudsT) <= 10;
  let bounceFactor, vxBoost, label, color, freq, scoreGain, multBump, shakeAmt;
  if (dt <= 6) {
    bounceFactor = TUNING.powerBouncePerfect; vxBoost = 1.15;
    label = '⚡ PERFECT BOUNCE!'; color = '#ef4444'; freq = 1200;
    multBump = 0.8; scoreGain = 200; shakeAmt = 18;
    state.hitstop = 3;
  } else if (dt <= 14) {
    bounceFactor = TUNING.powerBounceGood; vxBoost = 1.08;
    label = '✨ BOUNCE!'; color = '#fbbf24'; freq = 900;
    multBump = 0.4; scoreGain = 80; shakeAmt = 10;
  } else {
    // Outside the timing window → spam-tap gets nothing. You must actually nail
    // the landing moment for a bounce boost; lazy taps just fall through to stomp/normal physics.
    return false;
  }
  if (superChain) {
    bounceFactor *= 2.5;
    vxBoost *= 1.3;
    label = '🚀 SUPERSTUDS!';
    color = '#f472b6';
    freq = 1500;
    scoreGain = 400;
    multBump = Math.max(multBump, 1.0);
    shakeAmt = 24;
    state.hitstop = 5;
  }
  t.vy = -impact * bounceFactor;
  t.vx *= vxBoost;
  // Forward-carry: convert downward landing impact into horizontal travel so a
  // stomp-bounce doesn't pogo in place. Harder the drop, bigger the sideways kick.
  const carryDir = Math.sign(t.vx) || 1;
  const carryKick = Math.min(16, impact * 0.55) * (superChain ? 1.4 : 1);
  t.vx += carryDir * carryKick;
  if (multBump) bumpMult(multBump);
  if (scoreGain) awardScore(scoreGain, label, color);
  if (shakeAmt) shake(shakeAmt);
  state.landT = -999;
  state.trampLandT = -999;
  state.trampTapBoostT = 0;
  state.superStudsT = 0;
  const pcount = Math.min(30, Math.round(4 + impact * 1.2) + (superChain ? 14 : 0));
  addParticles(t.x, t.y + TIRE_R, superChain ? '#f472b6' : '#fde68a', pcount, { up: 2 + impact * 0.3, spread: 3 + impact * 0.4, size: 3, shape: 'circle' });
  if (superChain) {
    addParticles(t.x, t.y + TIRE_R, '#fbbf24', 18, { up: 5, spread: 7, size: 4 });
    tone(1800, 0.2, 'square', 0.22, 800);
  }
  tone(freq, 0.1, 'square', 0.15, 400);
  return true;
}

function updateFireButton() {
  if (state.phase === PHASE.FLY && state.nitroCharges > 0) {
    stage.classList.add('nitro-ready');
  } else {
    stage.classList.remove('nitro-ready');
  }
  const btn = document.getElementById('btnBoost');
  if (btn) {
    const show = state.phase === PHASE.FLY && state.nitroCharges > 0;
    btn.classList.toggle('hidden', !show);
    const cnt = document.getElementById('btnBoostCount');
    if (cnt) cnt.textContent = state.nitroCharges;
  }
  const ajBtn = document.getElementById('btnAirjump');
  if (ajBtn) {
    const show = state.phase === PHASE.FLY && state.airjumpCharges > 0;
    ajBtn.classList.toggle('hidden', !show);
    const cnt = document.getElementById('btnAirjumpCount');
    if (cnt) cnt.textContent = state.airjumpCharges;
  }
  const mgBtn = document.getElementById('btnMagnet');
  if (mgBtn) {
    const show = state.phase === PHASE.FLY && (state.magnetCharges > 0 || state.magnetT > 0);
    mgBtn.classList.toggle('hidden', !show);
    mgBtn.classList.toggle('active', state.magnetT > 0);
    const cnt = document.getElementById('btnMagnetCount');
    if (cnt) cnt.textContent = state.magnetT > 0 ? Math.ceil(state.magnetT / 60) + 's' : state.magnetCharges;
  }
  const bmBtn = document.getElementById('btnBomb');
  if (bmBtn) {
    const show = state.phase === PHASE.FLY && state.bombCharges > 0;
    bmBtn.classList.toggle('hidden', !show);
    const cnt = document.getElementById('btnBombCount');
    if (cnt) cnt.textContent = state.bombCharges;
  }
  const shBtn = document.getElementById('btnShield');
  if (shBtn) {
    const show = state.phase === PHASE.FLY && (state.shieldCharges > 0 || state.shieldT > 0);
    shBtn.classList.toggle('hidden', !show);
    shBtn.classList.toggle('active', state.shieldT > 0);
    const cnt = document.getElementById('btnShieldCount');
    if (cnt) cnt.textContent = state.shieldT > 0 ? Math.ceil(state.shieldT / 60) + 's' : state.shieldCharges;
  }
}

function updateNitroBadge() {
  const el = document.getElementById('nitroCount');
  if (el) el.textContent = state.nitroCharges;
  updateFireButton();
}
function updateAirjumpBadge() {
  const el = document.getElementById('airjumpCount');
  if (el) el.textContent = state.airjumpCharges;
  const btn = document.getElementById('btnAirjump');
  if (btn) {
    const show = state.phase === PHASE.FLY && state.airjumpCharges > 0;
    btn.classList.toggle('hidden', !show);
    const cnt = document.getElementById('btnAirjumpCount');
    if (cnt) cnt.textContent = state.airjumpCharges;
  }
}
function updateMagnetBadge() {
  const el = document.getElementById('magnetCount');
  if (el) el.textContent = state.magnetCharges;
  updateFireButton();
}
function updateBombBadge() {
  const el = document.getElementById('bombCount');
  if (el) el.textContent = state.bombCharges;
  updateFireButton();
}
function updateShieldBadge() {
  const el = document.getElementById('shieldCount');
  if (el) el.textContent = state.shieldCharges;
  updateFireButton();
}
function restart() {
  applyUpgrades();
  progression.runs++;
  saveProgression();
  state.phase = PHASE.AIM;
  state.rpm = 0;
  state.rpmMaxHoldT = 0;
  state.score = 0;
  state.coinsRun = 0;
  state.starsGot = 0;
  state.tiresLeft = 5;
  state.rangeBoost = 0;
  state.powerExtra = 0;
  state.rollBudgetMax = 40;
  state.rollBudget = 0;
  state.maxX = 0;
  state.tire = null;
  state.particles = [];
  state.popups = [];
  state.tornados = [];
  state.tornadoSpawnT = 600;
  state.birds = [];
  state.birdSpawnT = 60;
  state.penguins = [];
  state.penguinSpawnT = 240;
  state.freezeWind = 0;
  state.freezeWindT = 0;
  state.freezeWindNextT = 600 + Math.floor(Math.random() * 600);
  state.storms = [];
  state.stormSpawnT = 450 + Math.floor(Math.random() * 300);
  state.wetGrounds = [];
  state.lightningFlashT = 0;
  state.fireballs = [];
  state.fireballSpawnT = 120;
  state.ashParticles = [];
  state.health = 100;
  state.damageFlashT = 0;
  state.drowning = null;
  state.deathCause = null;
  state.combo = { count: 0, timer: 0, mult: 1 };
  state.nitroCharges = 0;
  state.airjumpCharges = 0;
  state.magnetCharges = 0;
  state.bombCharges = 0;
  state.shieldCharges = 0;
  state.shieldT = 0;
  state.magnetT = 0;
  state.perfect = false;
  state.newRecord = false;
  state.stompWindow = 0;
  state.stompCooldown = 0;
  state.stompWhiffT = 0;
  state.hitstop = 0;
  state.slowMoT = 0;
  state.slowMoCooldown = 0;
  state.finishPending = 0;
  state.finishStuck = false;
  state.stuckOnCactus = null;
  state.wind = { strength: 0, target: randomWind(), nextChange: 60 };
  resetRunStats();
  buildLevel();  // populates state.ladders
  state.cam.x = LEVEL.launchX - W * 0.25;
  state.cam.y = terrainAt(LEVEL.launchX) - H * 0.55;
  updateHud();
  updateNitroBadge();
  aimHud.classList.remove('hidden');
  updateFireButton();
  overlay.classList.add('hidden');
}
function retry() {
  // Between-tire reset: behåller 70% av poängen (30%-avdraget körs i finishRun innan retry).
  // coinsRun behålls också mellan liv. Vid game-over (alla liv slut) nollställs båda i finishRun.
  state.phase = PHASE.AIM;
  state.tire = null;
  state.particles = [];
  state.popups = [];
  state.tornados = [];
  state.tornadoSpawnT = 600;
  state.birds = [];
  state.birdSpawnT = 60;
  state.penguins = [];
  state.penguinSpawnT = 240;
  state.freezeWind = 0;
  state.freezeWindT = 0;
  state.freezeWindNextT = 600 + Math.floor(Math.random() * 600);
  state.storms = [];
  state.stormSpawnT = 450 + Math.floor(Math.random() * 300);
  state.wetGrounds = [];
  state.lightningFlashT = 0;
  state.fireballs = [];
  state.fireballSpawnT = 120;
  state.ashParticles = [];
  state.health = 100;
  state.damageFlashT = 0;
  state.drowning = null;
  state.deathCause = null;
  state.combo = { count: 0, timer: 0, mult: 1 };
  state.rpm = 0;
  state.perfect = false;
  state.starsGot = 0;
  state.maxX = 0;
  state.newRecord = false;
  state.recordTriggered = false;
  state.flightMult = 1;
  state.flightMultDecayT = 0;
  state.finishPending = 0;
  state.finishStuck = false;
  state.stuckOnCactus = null;
  resetRunStats();
  aimHud.classList.remove('hidden');
  updateHud();
  updateFireButton();
}

// ====== MID-RUN SHOP (between tire deaths) ======
const MIDSHOP_ITEMS = [
  { id: 'tire',    icon: '🛞', name: '+1 Däck',     cost: [2000, 3500, 5500, 8500, 13000], max: 5, stat: () => state.tiresLeft,      apply: () => { state.tiresLeft++; } },
  { id: 'nitro',   icon: '🔥', name: '+1 Nitro',    cost: [600, 900, 1400, 2100, 3200], max: 5, stat: () => state.nitroCharges,   apply: () => { state.nitroCharges++; } },
  { id: 'airjump', icon: '🪂', name: '+1 Airjump',  cost: [600, 900, 1400, 2100, 3200], max: 5, stat: () => state.airjumpCharges, apply: () => { state.airjumpCharges++; } },
  { id: 'magnet',  icon: '🧲', name: '+1 Magnet',   cost: [800, 1200, 1800, 2700, 4000], max: 5, stat: () => state.magnetCharges,  apply: () => { state.magnetCharges++; } },
  { id: 'bomb',    icon: '💣', name: '+1 Bomb',     cost: [700, 1050, 1600, 2400, 3600], max: 5, stat: () => state.bombCharges || 0, apply: () => { state.bombCharges = (state.bombCharges || 0) + 1; } },
  { id: 'shield',  icon: '🛡️', name: '+1 Sköld',    cost: [1500, 2300, 3500, 5300, 8000], max: 5, stat: () => state.shieldCharges || 0, apply: () => { state.shieldCharges = (state.shieldCharges || 0) + 1; } },
  { id: 'medkit',  icon: '❤️', name: 'Heal 100%',   cost: [1200], max: 1, stat: () => (state.health || 0) >= 100 ? 1 : 0, apply: () => { state.health = 100; } },
  { id: 'range',   icon: '🚀', name: '+15% Räckvidd', cost: [1500, 2200, 3300, 5000, 7500], max: 5, stat: () => state.rangeBoost || 0, apply: () => { state.rangeBoost = (state.rangeBoost || 0) + 1; } },
  { id: 'power',   icon: '⚡', name: '+30% Kraft',    cost: [800, 1200, 1800, 2700, 4000], max: 5, stat: () => Math.floor((state.powerExtra || 0) / 30), apply: () => { state.powerExtra = Math.min(210, (state.powerExtra || 0) + 30); } },
];
function midShopCost(it) {
  const cur = it.stat();
  const arr = Array.isArray(it.cost) ? it.cost : [it.cost];
  return arr[Math.min(cur, arr.length - 1)];
}

const DEATH_CAUSE_TITLES = {
  water:    '💧 DRUNKNADE!',
  lava:     '🌋 BRANN UPP!',
  fireball: '🔥 ELDBOLLEN TOG DIG!',
  spike:    '⚙️ SPIKAD!',
  storm:    '⚡ BLIXTNEDSLAG!',
  cactus:   '🌵 KAKTUS-FÄLLA!',
  default:  '🛞 DÄCK SPRACK!',
};

function openMidShop() {
  const ov = document.getElementById('midShopOverlay');
  if (!ov) { retry(); return; }
  // Sätt rubrik baserat på dödsorsak
  const titleEl = ov.querySelector('h2');
  if (titleEl) {
    const cause = state.deathCause || 'default';
    titleEl.textContent = DEATH_CAUSE_TITLES[cause] || DEATH_CAUSE_TITLES.default;
  }
  ov.classList.remove('hidden');
  renderMidShop();
}

function renderMidShop() {
  const grid = document.getElementById('midShopGrid');
  const coinsEl = document.getElementById('midCoins');
  if (coinsEl) coinsEl.textContent = progression.coins;
  const ids = ['midTires','midNitro','midAirjump','midMagnet','midRange','midPower'];
  const stats = [state.tiresLeft, state.nitroCharges, state.airjumpCharges, state.magnetCharges, state.rangeBoost || 0, Math.floor((state.powerExtra || 0) / 30)];
  ids.forEach((id, i) => { const el = document.getElementById(id); if (el) el.textContent = stats[i]; });
  if (!grid) return;
  grid.innerHTML = MIDSHOP_ITEMS.map(it => {
    const cur = it.stat();
    const maxed = cur >= it.max;
    const cost = midShopCost(it);
    const canBuy = !maxed && progression.coins >= cost;
    const btnLbl = maxed ? 'MAX' : `🪙 ${cost}`;
    return `
      <div class="midshop-row">
        <div class="midshop-icon">${it.icon}</div>
        <div class="midshop-main">
          <div class="midshop-name">${it.name}</div>
          <div class="midshop-bar">${Array.from({length: it.max}, (_, i) => `<span class="mdot ${i < cur ? 'on' : ''}"></span>`).join('')}</div>
        </div>
        <button class="midshop-btn${canBuy ? '' : ' locked'}" data-buy="${it.id}" ${canBuy ? '' : 'disabled'}>${btnLbl}</button>
      </div>`;
  }).join('');
  grid.querySelectorAll('[data-buy]').forEach(btn => {
    btn.onclick = () => {
      const id = btn.dataset.buy;
      const it = MIDSHOP_ITEMS.find(x => x.id === id);
      if (!it) return;
      if (it.stat() >= it.max) return;
      const cost = midShopCost(it);
      if (progression.coins < cost) return;
      progression.coins -= cost;
      it.apply();
      saveProgression();
      sfxStar();
      renderMidShop();
      updateHud();
      updateNitroBadge();
      updateAirjumpBadge && updateAirjumpBadge();
      updateMagnetBadge && updateMagnetBadge();
    };
  });
}

window.midShopContinue = function () {
  const ov = document.getElementById('midShopOverlay');
  if (ov) ov.classList.add('hidden');
  retry();
};

// Vindfaser — alternerar lugnt och vindstöt så det oftast är stilla men ibland blåser ordentligt.
//   ~55% av tiden: STILLA (target ≈ 0, varar 6-12s)
//   45% av tiden:  STÖT — viktad fördelning, varar max 10s, sen tillbaka till lugnt
//     35%  lätt höger        (0.30-0.55)
//     25%  max höger         (0.85-1.00)
//     20%  lätt vänster      (-0.30 till -0.55)
//     20%  max vänster       (-0.85 till -1.00)  ← lite mer sällsynt än höger
function pickWindGust() {
  const r = Math.random();
  if (r < 0.35) return 0.30 + Math.random() * 0.25;          // lätt höger
  if (r < 0.60) return 0.85 + Math.random() * 0.15;          // max höger
  if (r < 0.80) return -(0.30 + Math.random() * 0.25);       // lätt vänster
  return -(0.85 + Math.random() * 0.15);                     // max vänster
}
function randomWind() {
  // Behålls för bakåtkompat (anropas från start/restart) — returnerar en lugn startpunkt.
  return (Math.random() - 0.5) * 0.08;
}

function isMobileView() { return Math.min(W, H) < 700 || window.innerWidth < 820; }

// Blend factor 0..1: 0 = stationary ("near"), 1 = fast ("far"). Used to pick which
// user-zoom pivot applies and to interpolate between the two auto targets.
function speedBlend() {
  if (!state.tire || state.phase !== PHASE.FLY) return 0;
  const speed = Math.hypot(state.tire.vx, state.tire.vy);
  return Math.max(0, Math.min(1, (speed - 3) / 22));
}

function desiredZoom() {
  const base = isMobileView() ? 0.52 : 0.72;
  const nearBase = base + 0.30;
  const farBase  = base - 0.10;
  const uN = state.cam.userZoomNear || 1;
  const uF = state.cam.userZoomFar  || 1;
  const t = speedBlend();
  const auto = (nearBase * uN) * (1 - t) + (farBase * uF) * t;
  return Math.max(0.2, Math.min(2.6, auto));
}

window.restart = restart;

// ====== TOUCH CONTROL (press-hold-drag-release on stage + pinch-zoom) ======
const touchHint = document.getElementById('touchHint');
let touchAim = { active: false, startY: 0, startAngle: 45, pid: -1 };

// Active pointer registry for pinch detection
const activePointers = new Map();   // id -> {x, y}
let pinch = null;                    // { startDist, startUserZoom } when active

function hideTouchHint() { touchHint?.classList.add('hidden'); }

function cancelAim() {
  touchAim.active = false;
  touchAim.pid = -1;
  endGas();
  stage.classList.remove('gassing');
}

function pointerDistance() {
  const pts = [...activePointers.values()];
  if (pts.length < 2) return 0;
  const dx = pts[0].x - pts[1].x;
  const dy = pts[0].y - pts[1].y;
  return Math.hypot(dx, dy);
}

// Ladder drag tracking
let ladderDrag = { active: false, pid: -1, lastClientX: 0, lastClientY: 0, idx: -1, holdFrames: 0, moveCooldown: 0, hasMoved: false };
// Pending ladder grab — armed on pointerdown while a ladder-man is visible.
// Commits to a real drag once the finger moves past a small threshold; until then,
// the tap can still fall through to stomp / relaunch drag so we don't hijack every touch.
let pendingLadder = null; // { idx, startX, startY, pid }
const PENDING_LADDER_PX = 6;

function ladderManScreenPos(i) {
  const L = state.ladders[i];
  const baseX = L.x;
  const baseY = terrainAt(baseX) - 30;      // roughly chest height
  const [wx, wy] = worldToScreen(baseX, baseY);
  const z = state.cam.zoom || 1;
  return [wx * z, wy * z];
}

// Returns true if the pointer is on or near the tire on screen — used to
// disambiguate "tap on wheel → relaunch" vs. "tap on ladder-man → ladder drag"
// when both are visible. Accepts the tap if either:
//   a) it's within a generous screen-pixel radius of the tire, OR
//   b) it's measurably closer to the tire than to any visible ladder-man.
function pointerHitTire(clientX, clientY) {
  if (!state.tire) return false;
  const r = stage.getBoundingClientRect();
  const cx = clientX - r.left;
  const cy = clientY - r.top;
  const [wx, wy] = worldToScreen(state.tire.x, state.tire.y);
  const z = state.cam.zoom || 1;
  const sx = wx * z, sy = wy * z;
  const tireDist = Math.hypot(cx - sx, cy - sy);
  // Screen-pixel floor so zoom-out doesn't shrink the hit target below finger size
  const radiusPx = Math.max(90, (TIRE_R + 32) * z);
  if (tireDist <= radiusPx) return true;
  // Tie-break: if the nearest visible ladder-man is farther than the tire by a
  // meaningful margin, treat the tap as a tire tap.
  let nearestLadder = Infinity;
  for (let i = 0; i < state.ladders.length; i++) {
    const [lx, ly] = ladderManScreenPos(i);
    if (lx < 0 || lx > W || ly < 0 || ly > H) continue;
    const d = Math.hypot(cx - lx, cy - ly);
    if (d < nearestLadder) nearestLadder = d;
  }
  return nearestLadder !== Infinity && tireDist < nearestLadder - 20;
}

// Returns index of the ladder hit, or -1 if none
function pointerHitLadder(clientX, clientY) {
  const r = stage.getBoundingClientRect();
  const cx = clientX - r.left;
  const cy = clientY - r.top;
  // If any ladder-man is on screen, pick the nearest one regardless of tap distance.
  // Lets the user grab + drag the man from anywhere while the ball flies.
  let bestIdx = -1;
  let bestDist = Infinity;
  for (let i = 0; i < state.ladders.length; i++) {
    const [lx, ly] = ladderManScreenPos(i);
    if (lx < 0 || lx > W || ly < 0 || ly > H) continue;  // must be visible on screen
    const d = Math.hypot(cx - lx, cy - ly);
    if (d < bestDist) { bestDist = d; bestIdx = i; }
  }
  return bestIdx;
}

stage.addEventListener('pointerdown', e => {
  if (e.target.closest('button')) return;
  e.preventDefault();
  hideTouchHint();

  // Vind-HUD toggle: panel ligger på (W-164..W-16) × (34..78) i canvas-koord.
  // Måste kollas FÖRE all aim/ladder/relaunch-logik så tappet inte dubbelregistreras.
  {
    const _r = stage.getBoundingClientRect();
    const _lx = e.clientX - _r.left, _ly = e.clientY - _r.top;
    if (_lx >= W - 164 && _lx <= W - 16 && _ly >= 34 && _ly <= 78) {
      state.windDisabled = !state.windDisabled;
      try { localStorage.setItem('chimney_windDisabled', state.windDisabled ? '1' : '0'); } catch {}
      flashToast(state.windDisabled ? '🚫 VIND AV' : '💨 VIND PÅ', state.windDisabled ? '#94a3b8' : '#22d3ee');
      tone(state.windDisabled ? 320 : 640, 0.08, 'square', 0.12, 240);
      return;
    }
  }

  activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

  // Start pinch as soon as we have 2 active pointers
  if (activePointers.size >= 2) {
    // Cancel any in-flight aim / ladder drag — pinch takes over
    cancelAim();
    pendingLadder = null;
    if (ladderDrag.active) {
      if (state.ladders[ladderDrag.idx]) state.ladders[ladderDrag.idx].grabbed = false;
      ladderDrag.active = false;
      ladderDrag.idx = -1;
    }
    pinch = {
      startDist: pointerDistance() || 1,
      startUserNear: state.cam.userZoomNear || 1,
      startUserFar:  state.cam.userZoomFar  || 1,
      startBlend:    speedBlend(),
    };
    return;
  }

  // Tap during FLY:
  // - powerBounce: time-sensitive landing punch
  // - flipperTap + stomp: manually arm the flipper swing AND dive into it. If the swing
  //   connects, the collision logic kicks the ball strong (unchanged from before).
  // - If a ladder-man is visible, arm a *pending* grab; it only commits once the finger
  //   actually drags. A plain tap still falls through to stomp / relaunch.
  // - Otherwise: arm drag tracking; short tap falls through to stomp.
  if (state.phase === PHASE.FLY) {
    if (powerBounce()) return;
    // Pre-landing bounce buffer: if tire is about to land (close to ground, moving down),
    // queue the tap so it fires the instant we touch down — covers "tappade precis innan landing".
    if (state.tire) {
      const _t = state.tire;
      const _gy = terrainAt(_t.x);
      const _heightAbove = _gy - (_t.y + TIRE_R);
      if (_heightAbove > 0 && _heightAbove < 140 && _t.vy > 1) {
        state.pendingBounceT = 12;
      }
    }
    if (flipperTap()) {
      stomp();
      return;
    }
    // Tap on (or very near) the tire always chooses tire-relaunch over ladder-grab,
    // even if a ladder-man is visible. Tap anywhere else arms the ladder grab.
    // Once pointerdown commits to a target the choice is locked until pointerup —
    // you must release and tap again outside the tire to move the ladder-man.
    const tapOnTire = pointerHitTire(e.clientX, e.clientY);
    const hitIdx = tapOnTire ? -1 : pointerHitLadder(e.clientX, e.clientY);
    if (hitIdx >= 0) {
      pendingLadder = { idx: hitIdx, startX: e.clientX, startY: e.clientY, pid: e.pointerId };
      try { stage.setPointerCapture(e.pointerId); } catch(_) {}
    }
    if (state.rollBudget > 0) {
      try { stage.setPointerCapture(e.pointerId); } catch(_) {}
      state.relaunchDrag.active = true;
      state.relaunchDrag.pid = e.pointerId;
      state.relaunchDrag.startX = e.clientX;
      state.relaunchDrag.startY = e.clientY;
      state.relaunchDrag.curX = e.clientX;
      state.relaunchDrag.curY = e.clientY;
      return;
    }
    // No relaunch budget: if a ladder is pending, wait for pointerup to decide
    // (drag → grab, tap → stomp). Otherwise stomp immediately.
    if (!pendingLadder) stomp();
    return;
  }
  if (state.phase !== PHASE.AIM) return;
  if (state.tiresLeft <= 0) return;

  try { stage.setPointerCapture(e.pointerId); } catch(_) {}
  touchAim.active = true;
  touchAim.startY = e.clientY;
  touchAim.startAngle = state.angle;
  touchAim.pid = e.pointerId;
  state.angleDir = 0;
  startGas();
  stage.classList.add('gassing');
});

stage.addEventListener('pointermove', e => {
  if (activePointers.has(e.pointerId)) {
    activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
  }

  // Pinch-zoom while 2+ fingers down. The pivot (near vs far) is locked when pinch starts,
  // so the user targets whichever speed regime they're currently in.
  if (pinch && activePointers.size >= 2) {
    e.preventDefault();
    const dist = pointerDistance();
    if (dist > 0) {
      const ratio = dist / pinch.startDist;
      if (pinch.startBlend < 0.5) {
        state.cam.userZoomNear = Math.max(0.5, Math.min(2.6, pinch.startUserNear * ratio));
      } else {
        state.cam.userZoomFar  = Math.max(0.5, Math.min(2.6, pinch.startUserFar  * ratio));
      }
    }
    return;
  }

  // Pending ladder grab — commits to a real drag once the finger moves past the threshold.
  // Cancels any armed relaunch drag so the ladder wins when the player clearly meant to grab.
  if (pendingLadder && e.pointerId === pendingLadder.pid) {
    const ddx = e.clientX - pendingLadder.startX;
    const ddy = e.clientY - pendingLadder.startY;
    if (Math.hypot(ddx, ddy) > PENDING_LADDER_PX) {
      const idx = pendingLadder.idx;
      const sx = pendingLadder.startX;
      const sy = pendingLadder.startY;
      pendingLadder = null;
      if (state.relaunchDrag.active && e.pointerId === state.relaunchDrag.pid) {
        state.relaunchDrag.active = false;
        state.relaunchDrag.pid = -1;
      }
      ladderDrag.active = true;
      ladderDrag.pid = e.pointerId;
      ladderDrag.lastClientX = sx;   // so the ladder branch below applies the full tap→now delta
      ladderDrag.lastClientY = sy;
      ladderDrag.idx = idx;
      ladderDrag.holdFrames = 0;
      ladderDrag.moveCooldown = 0;
      ladderDrag.hasMoved = true;
      if (state.ladders[idx]) state.ladders[idx].grabbed = true;
      // fall through to the ladder drag branch so this move event actually moves the man
    }
  }

  // Relaunch drag — track current pointer so render can draw the aim arrow
  if (state.relaunchDrag.active && e.pointerId === state.relaunchDrag.pid) {
    e.preventDefault();
    state.relaunchDrag.curX = e.clientX;
    state.relaunchDrag.curY = e.clientY;
    return;
  }

  // Ladder drag — horizontal delta moves the man, vertical delta tilts the ladder
  if (ladderDrag.active && e.pointerId === ladderDrag.pid) {
    e.preventDefault();
    const L = state.ladders[ladderDrag.idx];
    if (L) {
      const z = state.cam.zoom || 1;
      const dx = e.clientX - ladderDrag.lastClientX;
      const dy = e.clientY - ladderDrag.lastClientY;
      ladderDrag.lastClientX = e.clientX;
      ladderDrag.lastClientY = e.clientY;
      L.x = Math.max(L.slotMin, Math.min(L.slotMax, L.x + dx / z));
      // Drag UP (dy < 0) leans the top farther away = more forward-launch angle
      // Drag DOWN (dy > 0) stands it straighter or leans it backward
      if (L.tilt === undefined) L.tilt = LADDER_TILT_DX;
      L.tilt = Math.max(-80, Math.min(140, L.tilt + (-dy / z) * 0.7));
      if (Math.abs(dx) > 0.5) {
        L.walking = 8;
        // Ladder-man "swings" the ball in his drag direction. Window of 14 frames
        // lets the bounce pick up the latest swing without freezing old directions.
        L.dragSign = Math.sign(dx);
        L.dragT = 14;
      }
      // Any meaningful movement flags the drag as active — drag activates slow-mo almost
      // instantly (20ms ≈ 1 frame) so you have time to place the man while the ball flies.
      if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
        ladderDrag.hasMoved = true;
      }
    }
    return;
  }

  if (!touchAim.active || e.pointerId !== touchAim.pid) return;
  e.preventDefault();
  const dy = touchAim.startY - e.clientY;
  state.angle = Math.max(MIN_ANGLE, Math.min(MAX_ANGLE, touchAim.startAngle + dy * 0.25));
});

function finishPointer(e, fireOnRelease) {
  activePointers.delete(e.pointerId);
  // Pending ladder that never committed to a drag. If nothing else is armed we treat it
  // as a plain tap → stomp (mirrors the old tap-in-flight behavior). If a relaunch drag
  // is active alongside it, that branch handles the tap/drag decision instead.
  let pendingTapStomp = false;
  if (pendingLadder && e && e.pointerId === pendingLadder.pid) {
    pendingTapStomp = !state.relaunchDrag.active && !ladderDrag.active;
    pendingLadder = null;
  }
  // End pinch when fewer than 2 active pointers remain
  if (pinch && activePointers.size < 2) {
    pinch = null;
    return;  // never fire a shot when exiting a pinch
  }
  // End relaunch drag — drag launches, short tap falls through to stomp
  if (state.relaunchDrag.active && e && e.pointerId === state.relaunchDrag.pid) {
    const dx = state.relaunchDrag.curX - state.relaunchDrag.startX;
    const dy = state.relaunchDrag.curY - state.relaunchDrag.startY;
    state.relaunchDrag.active = false;
    state.relaunchDrag.pid = -1;
    if (!fireOnRelease) return;
    const len = Math.hypot(dx, dy);
    if (len >= RELAUNCH_DRAG_MIN) {
      executeRelaunch(dx, dy);
    } else {
      stomp(); // quick tap → stomp
    }
    return;
  }
  // End ladder drag
  if (ladderDrag.active && e && e.pointerId === ladderDrag.pid) {
    if (state.ladders[ladderDrag.idx]) state.ladders[ladderDrag.idx].grabbed = false;
    ladderDrag.active = false;
    ladderDrag.pid = -1;
    ladderDrag.idx = -1;
    return;
  }
  if (!touchAim.active) {
    // Plain tap that only armed a pending ladder (no relaunch budget) → stomp now.
    if (pendingTapStomp && fireOnRelease && state.phase === PHASE.FLY) stomp();
    return;
  }
  if (e && e.pointerId !== touchAim.pid) return;
  touchAim.active = false;
  touchAim.pid = -1;
  endGas();
  stage.classList.remove('gassing');
  if (fireOnRelease) fire();
}

stage.addEventListener('pointerup',     e => finishPointer(e, true));
stage.addEventListener('pointercancel', e => finishPointer(e, false));

// Desktop: mouse wheel zoom (ctrl/meta optional — works either way). Targets the
// pivot matching the current speed regime, same as pinch.
stage.addEventListener('wheel', e => {
  e.preventDefault();
  const factor = e.deltaY < 0 ? 1.08 : 1 / 1.08;
  if (speedBlend() < 0.5) {
    state.cam.userZoomNear = Math.max(0.5, Math.min(2.6, (state.cam.userZoomNear || 1) * factor));
  } else {
    state.cam.userZoomFar  = Math.max(0.5, Math.min(2.6, (state.cam.userZoomFar  || 1) * factor));
  }
}, { passive: false });

document.getElementById('btnHelp').addEventListener('click', () => {
  document.getElementById('helpSheet').classList.remove('hidden');
});
document.getElementById('btnShop').addEventListener('click', () => {
  window.openShop();
});

// Shared helper: fires only on pointerdown (never on click — which would double-trigger on
// mobile). 1-second cooldown per button so a slightly mushy tap can't drain multiple charges.
function wirePowerButton(btnId, canFire, doFire) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  let lastFire = 0;
  const COOLDOWN_MS = 1000;
  const onDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const now = performance.now();
    if (now - lastFire < COOLDOWN_MS) return;
    if (state.phase !== PHASE.FLY) return;
    if (!canFire()) return;
    lastFire = now;
    btn.classList.add('cooling');
    doFire();
    setTimeout(() => btn.classList.remove('cooling'), COOLDOWN_MS);
  };
  btn.addEventListener('pointerdown', onDown);
  // Swallow the synthetic click so it can't fire a second charge
  btn.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); });
}

wirePowerButton('btnBoost',   () => state.nitroCharges   > 0, useNitro);
wirePowerButton('btnAirjump', () => state.airjumpCharges > 0, useAirjump);
wirePowerButton('btnMagnet',  () => state.magnetCharges  > 0, useMagnet);
wirePowerButton('btnBomb',    () => state.bombCharges    > 0, useBomb);
wirePowerButton('btnShield',  () => state.shieldCharges  > 0 && state.shieldT === 0, useShield);

// Keyboard as backup
window.addEventListener('keydown', e => {
  if (e.repeat) return;
  if (e.code === 'Space')     { e.preventDefault(); startGas(); stage.classList.add('gassing'); hideTouchHint(); }
  if (e.code === 'KeyE')      fire();
  if (e.code === 'KeyR')      restart();
  if (e.code === 'KeyN' && state.phase === PHASE.FLY && state.nitroCharges > 0) useNitro();
  if (e.code === 'KeyA' && state.phase === PHASE.FLY && state.airjumpCharges > 0) useAirjump();
  if (e.code === 'KeyM' && state.phase === PHASE.FLY && state.magnetCharges > 0) useMagnet();
  if (e.code === 'KeyB' && state.phase === PHASE.FLY && state.bombCharges > 0) useBomb();
  if (e.code === 'KeyH' && state.phase === PHASE.FLY && state.shieldCharges > 0) useShield();
  if (e.code === 'KeyS' && state.phase === PHASE.FLY) {
    if (!powerBounce()) {
      if (state.tire) {
        const _t = state.tire;
        const _ha = terrainAt(_t.x) - (_t.y + TIRE_R);
        if (_ha > 0 && _ha < 140 && _t.vy > 1) state.pendingBounceT = 12;
      }
      flipperTap(); stomp();
    }
  }
  if (e.code === 'ArrowUp')   { e.preventDefault(); state.angleDir = +1; }
  if (e.code === 'ArrowDown') { e.preventDefault(); state.angleDir = -1; }
});
window.addEventListener('keyup', e => {
  if (e.code === 'Space')     { endGas(); stage.classList.remove('gassing'); }
  if (e.code === 'ArrowUp'   && state.angleDir ===  1) state.angleDir = 0;
  if (e.code === 'ArrowDown' && state.angleDir === -1) state.angleDir = 0;
});

// ====== AUDIO (zzfx-lite synth) ======
let audioCtx = null;
function getAC() {
  if (!audioCtx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (AC) audioCtx = new AC();
  }
  return audioCtx;
}
function tone(freq, dur = 0.1, type = 'square', vol = 0.15, sweep = 0) {
  const ac = getAC(); if (!ac) return;
  const o = ac.createOscillator(); const g = ac.createGain();
  o.type = type; o.frequency.value = freq;
  if (sweep) o.frequency.linearRampToValueAtTime(freq + sweep, ac.currentTime + dur);
  g.gain.value = vol;
  g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + dur);
  o.connect(g); g.connect(ac.destination);
  o.start(); o.stop(ac.currentTime + dur);
}
function sfxCoin()   { tone(880, 0.08, 'square', 0.12, 400); setTimeout(() => tone(1320, 0.1, 'square', 0.1), 60); }
function sfxStar()   { tone(600, 0.12, 'sine', 0.15, 600); setTimeout(() => tone(1200, 0.12, 'sine', 0.13, 400), 80); setTimeout(() => tone(1800, 0.18, 'sine', 0.12), 160); }
function sfxBounce() { tone(180, 0.06, 'sawtooth', 0.12, -80); }
function sfxLaunch() { tone(120, 0.5, 'sawtooth', 0.22, 200); }
function sfxBreak()  { tone(90, 0.25, 'square', 0.2, -60); }
function sfxFinish() { [660, 880, 1100, 1320].forEach((f,i) => setTimeout(() => tone(f, 0.18, 'square', 0.15), i*120)); }

// ====== PARTICLES ======
const MAX_PARTICLES = 200;
function addParticles(x, y, color, n = 12, opts = {}) {
  const sx = opts.vx || 0, sy = opts.vy || 0;
  for (let i = 0; i < n; i++) {
    state.particles.push({
      x, y,
      vx: sx + (Math.random() - 0.5) * (opts.spread || 5),
      vy: sy - Math.random() * (opts.up || 4),
      life: 30 + Math.random() * 30,
      max: 60,
      color,
      size: (opts.size || 3) + Math.random() * 2,
      g: opts.g == null ? 0.25 : opts.g,
      shape: opts.shape || 'square',
    });
  }
  // PERF: Hard-cap globalt antal partiklar — vid burst-events (death, mega-combo)
  // kan listan annars växa till 500+ och tappa frames. Drop:a äldsta vid overflow.
  if (state.particles.length > MAX_PARTICLES) {
    state.particles.splice(0, state.particles.length - MAX_PARTICLES);
  }
}

// ====== EFFECTS ======
let shakeAmt = 0;
function shake(v) { shakeAmt = Math.max(shakeAmt, v); }
function flashToast(text, color) {
  bigToast.textContent = text;
  bigToast.style.color = color || '#fbbf24';
  bigToast.classList.add('show');
  clearTimeout(bigToast._t);
  bigToast._t = setTimeout(() => bigToast.classList.remove('show'), 900);
}
function setCombo(text) {
  comboEl.textContent = text;
  comboEl.classList.add('show');
  clearTimeout(comboEl._t);
  comboEl._t = setTimeout(() => comboEl.classList.remove('show'), 1200);
}

// ====== UPDATE ======
function update() {
  state.time++;
  if (state.damageFlashT > 0) state.damageFlashT--;

  // Hitstop — freeze physics for a few frames on big impacts
  if (state.hitstop > 0) {
    state.hitstop--;
    updateHud();
    return;
  }

  // Slow-mo: ladder grip. A quick tap (no drag, no hold) = no slow-mo.
  // - Drag (finger moves) → slow-mo after ~20ms so you can reposition the man mid-flight
  // - Pure hold still → slow-mo after 300ms, then deepens the longer you hold (50% → 33% → 25%)
  if (state.slowMoCooldown > 0) state.slowMoCooldown--;
  if (state.phase === PHASE.FLY && ladderDrag.active) {
    if (ladderDrag.moveCooldown > 0) ladderDrag.moveCooldown--;
    ladderDrag.holdFrames++;
  } else {
    ladderDrag.holdFrames = 0;
  }
  const h = ladderDrag.holdFrames;
  const threshold = ladderDrag.hasMoved ? 1 : 18;  // drag: immediate; hold: ~300ms
  const ladderSlow = state.phase === PHASE.FLY && ladderDrag.active && h >= threshold;
  // Smooth slow-mo: scale physics per-frame (same FPS, smaller deltas) instead of frame-skipping.
  // Previously we skipped frames, which looked like lag. Now the wheel moves slowly but renders every frame.
  if (ladderSlow) {
    state.slowMoT = Math.max(state.slowMoT, 20);
    if (ladderDrag.hasMoved) state.timeScale = 0.5;
    else state.timeScale = h < 36 ? 0.5 : h < 54 ? 0.33 : 0.25;
  } else if (state.slowMoT > 0) {
    state.slowMoT--;
    state.timeScale = 0.5;
  } else {
    state.timeScale = 1;
  }

  // Wind system — alternerar mellan LUGN och VINDSTÖT.
  // Lugnt: 6-12s, target ≈ 0. Stöt: 4-10s, target picked from pickWindGust().
  state.wind.nextChange--;
  if (state.wind.nextChange <= 0) {
    if (state.wind.gustActive) {
      // Avsluta stöt → tillbaka till lugnt
      state.wind.target = (Math.random() - 0.5) * 0.08;
      state.wind.nextChange = 360 + Math.floor(Math.random() * 360);  // 6-12s lugnt
      state.wind.gustActive = false;
    } else {
      // 55% chans att fortsätta lugnt, annars en stöt
      if (Math.random() < 0.55) {
        state.wind.target = (Math.random() - 0.5) * 0.08;
        state.wind.nextChange = 360 + Math.floor(Math.random() * 360);  // 6-12s lugnt
        state.wind.gustActive = false;
      } else {
        state.wind.target = pickWindGust();
        state.wind.nextChange = 240 + Math.floor(Math.random() * 360);  // 4-10s stöt
        state.wind.gustActive = true;
      }
    }
  }
  // Lerp strength toward target
  state.wind.strength += (state.wind.target - state.wind.strength) * 0.008;

  // Tornado-system (öken-only)
  updateTornados();
  // Fågelflockar
  updateBirds();
  // Pingvinflockar (isbiomen)
  updatePenguins();
  // Frysande vind (isbiomen)
  updateFreezeWind();
  // Åskmoln + regn + blixt
  updateStorms();
  applyStormEffects();
  // Eldbollar + aska (vulkanen)
  updateFireballs();
  updateAshParticles();

  // Angle adjust held
  if (state.phase === PHASE.AIM && state.angleDir) {
    state.angle = Math.max(MIN_ANGLE, Math.min(MAX_ANGLE, state.angle + state.angleDir * 0.5));
  }

  // RPM — ramps up while gassing, then when it hits MAX it holds for a short
  // window (~200ms) and drops straight back to 0 so the player has to time the
  // release. You can't just hold forever to guarantee a max shot.
  if (state.phase === PHASE.AIM) {
    if (state.gassing) {
      if (state.rpm >= MAX_RPM) {
        if (state.rpmMaxHoldT <= 0) state.rpmMaxHoldT = TUNING.rpmMaxHoldFrames;
        state.rpmMaxHoldT--;
        if (state.rpmMaxHoldT <= 0) {
          state.rpm = 0;            // "tappa kraft" — restart the ramp
        } else {
          state.rpm = MAX_RPM;
        }
      } else {
        state.rpm = Math.min(MAX_RPM, state.rpm + RPM_GAIN);
        state.rpmMaxHoldT = 0;
      }
    } else {
      state.rpm = Math.max(0, state.rpm - RPM_DECAY);
      state.rpmMaxHoldT = 0;
    }
  }

  // Tire physics
  if (state.phase === PHASE.FLY && state.tire) {
    const t = state.tire;

    // Finish-pending: tire is stuck on the target/chimney, just tick down and exit
    if (state.finishPending > 0) {
      state.finishPending--;
      if (state.finishStuck) {
        t.x = state.finishStickX;
        t.y = state.finishStickY;
        t.vx = 0; t.vy = 0;
        t.rot += t.vrot;
        t.vrot *= 0.97;
      } else {
        // Miss: let tire coast through the air a bit, keep physics lite
        t.vy += gravityAtX(t.x) * 0.5;
        t.vx *= AIR_DRAG;
        t.x += t.vx;
        t.y += t.vy;
        t.rot += t.vrot;
      }
      if (state.finishPending === 0) {
        state.finishStuck = false;
        finishRun(state.finishResult);
      }
      updateHud();
      return;
    }

    // Drunknar: hjulet sjunker mot botten + fade-out, ingen fysik/kollision
    if (state.drowning) {
      const d = state.drowning;
      d.t++;
      const f = Math.min(1, d.t / d.max);
      // Ease-in: snabbt först, sen långsammare ner
      const ease = 1 - Math.pow(1 - f, 2);
      t.y = d.startY + (d.sinkTo - d.startY) * ease;
      t.vx = 0; t.vy = 0;
      t.rot += 0.04;  // sakta rotation under sjunkningen
      // Bubblor / gnistor under hjulet
      if (state.time % 3 === 0) {
        if (d.isLava) {
          // Lava: gnistor + svart rök istället för luftbubblor
          state.particles.push({
            x: t.x + (Math.random() - 0.5) * 14,
            y: t.y + 6,
            vx: (Math.random() - 0.5) * 1.0,
            vy: -2 - Math.random() * 1.5,
            life: 40, max: 40,
            color: `rgba(${Math.random() < 0.5 ? '254,240,138' : '251,146,60'},${0.7 + Math.random() * 0.3})`,
            size: 2 + Math.random() * 2,
            g: 0.02, shape: 'square',
          });
          if (Math.random() < 0.5) {
            state.particles.push({
              x: t.x + (Math.random() - 0.5) * 18,
              y: t.y - 4,
              vx: (Math.random() - 0.5) * 0.4,
              vy: -1.5 - Math.random() * 0.8,
              life: 60, max: 60,
              color: `rgba(31,41,55,${0.45 + Math.random() * 0.3})`,
              size: 3 + Math.random() * 3,
              g: 0, shape: 'circle',
            });
          }
        } else {
          state.particles.push({
            x: t.x + (Math.random() - 0.5) * 12,
            y: t.y + 6,
            vx: (Math.random() - 0.5) * 0.6,
            vy: -1.2 - Math.random() * 0.8,
            life: 40, max: 40,
            color: `rgba(186, 230, 253, ${0.55 + Math.random() * 0.3})`,
            size: 2 + Math.random() * 2,
            g: 0, shape: 'circle',
          });
        }
      }
      updateHud();
      return;
    }

    // Stuck on cactus: pin tire in place, skip physics/obstacles/pickups until released.
    // Exception: a swinging ladder-man can smack the tire free.
    if (state.stuckOnCactus) {
      const c = state.stuckOnCactus;
      t.x = c.pinX; t.y = c.pinY;
      t.vx = 0; t.vy = 0;
      // Continuous death check: if we've burned all charges AND no ladder-man is near
      // enough to swing-free us, there's no way forward — end the run.
      const hasCharges = state.rollBudget > 0 || state.airjumpCharges > 0
                      || state.bombCharges > 0 || state.nitroCharges > 0;
      let ladderNearby = false;
      for (let li = 0; li < state.ladders.length; li++) {
        const L = state.ladders[li];
        if (L.cooldown > 0) continue;
        if (Math.abs(t.x - L.x) < 300) { ladderNearby = true; break; }
      }
      if (!hasCharges && !ladderNearby) {
        addParticles(t.x, t.y, '#166534', 28, { up: 5, spread: 8, size: 4 });
        addParticles(t.x, t.y, '#ef4444', 20, { up: 4, spread: 7, size: 3 });
        flashToast('☠️ INGEN UTVÄG!', '#ef4444');
        shake(18); state.hitstop = 6;
        tone(160, 0.25, 'sawtooth', 0.22, -400);
        finishRun(false);
        updateHud();
        return;
      }
      // Subtle wobble so it looks alive
      t.rot += Math.sin(state.time * 0.15) * 0.02;
      // Occasional prickle particles
      if (state.time % 14 === 0) {
        addParticles(t.x, t.y, '#166534', 2, { up: 1, spread: 3, size: 2 });
      }
      // Ladder-swing release: if a nearby ladder is being actively dragged and its
      // shaft touches the tire, free it in the swing direction. Passive contact does nothing.
      for (let li = 0; li < state.ladders.length; li++) {
        const L = state.ladders[li];
        if (L.cooldown > 0) continue;
        const swingActive = (L.dragT || 0) > 0 && L.dragSign;
        if (!swingActive) continue;
        if (Math.abs(t.x - L.x) > 200) continue;
        const { baseX, baseY, topX, topY } = ladderPose(li);
        const sx = topX - baseX, sy = topY - baseY;
        const lenSq = sx * sx + sy * sy;
        const px = t.x - baseX, py = t.y - baseY;
        const u = Math.max(0, Math.min(1, (px * sx + py * sy) / lenSq));
        const cx = baseX + u * sx, cy = baseY + u * sy;
        const dd = Math.hypot(t.x - cx, t.y - cy);
        if (dd < TIRE_R + LADDER_THICK + 4) {
          const dir = L.dragSign;
          const vx = dir * 12;
          const vy = -10;
          L.cooldown = 20;
          L.dragT = 0;
          awardScore(150, '🪜 STEGE BEFRIAR!', '#22d3ee');
          addParticles(cx, cy, '#22d3ee', 24, { up: 6, spread: 10, size: 3, shape: 'circle' });
          addParticles(cx, cy, '#fef3c7', 14, { up: 4, spread: 6, size: 3 });
          shake(14);
          state.hitstop = 3;
          tone(880, 0.1, 'square', 0.14, -40);
          unstickFromCactus(vx, vy);
          updateHud();
          return;
        }
      }
      updateHud();
      return;
    }

    // Save trail
    t.trail.push({ x: t.x, y: t.y, a: 1 });
    if (t.trail.length > 18) t.trail.shift();
    t.trail.forEach((p, i) => p.a = i / t.trail.length);

    // Physics — gravity varies by biome. timeScale < 1 during slow-mo keeps same FPS but stretches time.
    const TS = state.timeScale || 1;
    const gNow = gravityAtX(t.x);
    t.vy += gNow * TS;
    // Frame-drag approximated linearly so it scales with timeScale (light drag near 1.0)
    const dragFactor = 1 - (1 - AIR_DRAG) * TS;
    t.vx *= dragFactor;
    t.vy *= dragFactor;
    const airborne = (state.time - state.groundContactT) > 3;
    // Höjdberoende vind — piecewise:
    //   0-30px över mark   → 0.05× (nästan ingen vind, så man kan rulla fram normalt)
    //   30-100px (taknivå) → 0.05 → 0.3
    //   100-300px          → 0.3 → 1.5
    //   300-600px+         → 1.5 → 3.0 (cap)
    // Hus är 78px → "precis ovanför taken" ger ~0.3, högt ovan stadssilhuetten skalar upp.
    const _gyForWind = terrainAt(t.x);
    const _airHeight = Math.max(0, _gyForWind - t.y);
    let heightFactor;
    if (_airHeight < 30) heightFactor = 0.05;
    else if (_airHeight < 100) heightFactor = 0.05 + (_airHeight - 30) / 70 * 0.25;
    else if (_airHeight < 300) heightFactor = 0.30 + (_airHeight - 100) / 200 * 1.2;
    else heightFactor = Math.min(3.0, 1.5 + (_airHeight - 300) / 200 * 0.75);
    const windAccel = state.windDisabled ? 0
      : state.wind.strength * WIND_MAX * state.windScale * heightFactor;
    t.vx += windAccel * TS;
    // Tornadon — stark uppåtsug + chaos om tiren är inom radien.
    applyTornadoForces();
    // Global speed cap — ramps/trampolines/bounces can't push past this unless nitro or launch-window
    if (state.nitroBoostT > 0) state.nitroBoostT--;
    if (state.launchBoostT > 0) state.launchBoostT--;
    const cap = state.nitroBoostT > 0 ? TUNING.speedCapNitro
              : state.launchBoostT > 0 ? TUNING.speedCapLaunch
              : TUNING.speedCapNormal;
    const sp = Math.hypot(t.vx, t.vy);
    if (sp > cap) {
      const k = cap / sp;
      t.vx *= k;
      t.vy *= k;
    }
    t.x  += t.vx * TS;
    t.y  += t.vy * TS;
    t.rot += t.vrot * TS;

    if (state.stompWindow > 0) state.stompWindow--;
    if (state.trampTapBoostT > 0) state.trampTapBoostT--;
    if (state.stompCooldown > 0) state.stompCooldown--;
    if (state.pendingBounceT > 0) state.pendingBounceT--;
    // Whiff penalty: if the stomp window expires without hitting a trampoline or ramp,
    // the tire loses 15% forward speed. Spam-stomping in open air now costs you distance.
    if (state.stompWhiffT > 0) {
      state.stompWhiffT--;
      if (state.stompWhiffT === 0) {
        t.vx *= TUNING.stompWhiffPenalty;
        flashToast('💨 BOM!', '#94a3b8');
      }
    }
    if (state.magnetT > 0) {
      state.magnetT--;
      if (state.magnetT === 0) updateMagnetBadge();
    }
    if (state.shieldT > 0) {
      state.shieldT--;
      if (state.shieldT === 0) { updateShieldBadge(); flashToast('SKÖLD SLUT', '#64748b'); }
    }

    // Back-wall / house — only blocks when tire is low enough to hit the house body.
    // Flying over the roof sends the tire off the level (lost).
    const backWallX = LEVEL.launchX - 120;
    const backWallTopY = terrainAt(backWallX) - 106; // match house roof peak in renderer
    if (t.x - TIRE_R < backWallX && t.y + TIRE_R > backWallTopY) {
      t.x = backWallX + TIRE_R;
      if (t.vx < 0) {
        t.vx = -t.vx * 0.7;
        addParticles(backWallX, t.y, '#a16207', 8, { up: 2, spread: 3, size: 2 });
        shake(Math.min(10, Math.abs(t.vx) * 1.5));
        sfxBounce();
      }
    }
    // Off-level left — tire flew past the house roof and fell off the world
    if (t.x < LEVEL.launchX - 600 && state.phase === PHASE.FLY && state.finishPending === 0) {
      flashToast('UTANFÖR BANAN!', '#ef4444');
      finishRun(false);
    }

    // Terrain collision
    const gy = terrainAt(t.x);
    if (t.y + TIRE_R > gy) {
      t.y = gy - TIRE_R;
      const sl = terrainSlope(t.x);
      const normX = -sl; const normY = -1;
      const nlen = Math.sqrt(normX * normX + normY * normY);
      const nx = normX / nlen, ny = normY / nlen;
      const dot = t.vx * nx + t.vy * ny;
      if (dot < 0) {
        const impactSpeed = Math.abs(dot);
        // Stomp on ground = speed PENALTY (only trampolines reward stomp)
        const stompedOnGround = state.stompWindow > 0 && t.vy > 3;
        if (stompedOnGround) {
          state.stompWindow = 0;
          // Preserve forward direction — smash kills vertical bounce, not horizontal travel.
          // Asymmetric cap: hard stomps (high impact) keep more bounce than soft ones.
          const stompFloor = -Math.max(2, Math.min(6, impactSpeed * 0.3));
          t.vy = Math.max(t.vy * -0.2, stompFloor);
          t.vx *= 0.92;
        } else {
          const vxBefore = t.vx;
          // Angle-dependent damp: direct perpendicular hits lose more energy,
          // glancing hits preserve more — feels like real rubber on gravel.
          const _speedPreBounce = Math.hypot(t.vx, t.vy);
          const _cosTh = _speedPreBounce > 0.01 ? Math.abs(dot) / _speedPreBounce : 0;
          let _damp = BOUNCE_DAMP - 0.12 * _cosTh;  // 0.78 direct, ~0.90 glance
          // Blött underlag: studsa lite längre och hala undan
          if (isWetAt(t.x)) _damp = Math.min(0.97, _damp + 0.08);
          t.vx -= 2 * dot * nx * _damp;
          t.vy -= 2 * dot * ny * _damp;
          // Anti-reversal: only near-flat bumps (< ~17°) preserve forward direction.
          // Steeper slopes let physics take over so walls actually bounce the tire back.
          if (Math.sign(vxBefore) !== 0 && Math.sign(t.vx) !== Math.sign(vxBefore)) {
            const slopeSteep = Math.abs(sl);
            if (slopeSteep < 0.3) {
              const preserveFactor = 0.70 + (1 - slopeSteep / 0.3) * 0.20;
              t.vx = vxBefore * preserveFactor;
            }
          }
        }
        if (impactSpeed > 2) {
          addParticles(t.x, gy, '#b45309', Math.min(16, impactSpeed * 2), { up: impactSpeed * 0.3, spread: impactSpeed });
          if (impactSpeed > 3) sfxBounce();
          shake(impactSpeed * 0.7);
        }
        if (impactSpeed > 2 && state.windScale > 0.12) {
          state.windScale *= 0.85;
          if (state.windScale < 0.12) state.windScale = 0.12;
        }
        // Track landing moment for power-bounce timing window.
        // Threshold lowered 8 → 4 so short hops also open the bounce window.
        if ((state.time - state.groundContactT) > 4) {
          state.landT = state.time;
          state.landImpactSpeed = impactSpeed;
          // Pre-landing tap buffer: if player tapped just before touchdown, fire the bounce now.
          if (state.pendingBounceT > 0) {
            state.pendingBounceT = 0;
            powerBounce();
          }
        }
        state.groundContactT = state.time;
      }
      // Ground friction & slope-aware rolling
      const slopeSteep = Math.abs(sl);
      // Gravity component along slope (linear, physically-motivated): g * sl
      // Multiplier gives noticeable climb-slowdown / downhill-roll without runaway.
      let slopeAccel = sl * GRAVITY * 2.2;
      // Roll-assist grace: just tapped, don't let slope drag the ball backward
      const rollAssisting = (state.rollAssistT || 0) > 0;
      if (rollAssisting && slopeAccel < 0) slopeAccel = 0;
      if (Math.abs(t.vy) < 1.8) {
        t.vy = 0;
        const wet = isWetAt(t.x);
        const fricBase = rollAssisting ? 0.999 : (wet ? 0.9988 : GROUND_FRIC);
        const fric = Math.max(0.970, fricBase - slopeSteep * 0.025);
        t.vx *= fric;
        // Rolling resistance — constant rubber-on-ground brake so the ball eventually
        // stops on flat terrain instead of coasting forever. Suppressed during roll-assist.
        // På blött underlag halveras rolling resistance för extra halka.
        const rr = rollAssisting ? 0.005 : (wet ? 0.008 : 0.02);
        if (Math.abs(t.vx) > rr) t.vx -= Math.sign(t.vx) * rr;
        else t.vx = 0;
        t.vx += slopeAccel;
        if (Math.abs(t.vx) > 2 && state.time % 4 === 0) {
          addParticles(t.x - Math.sign(t.vx) * TIRE_R * 0.5, gy - 2, '#a16207', 1, { up: 1, spread: 1, size: 2, g: 0.05 });
        }
      } else {
        // Even while bouncing, gently pull along slope so short hops still respect hills
        t.vx += slopeAccel * 0.45;
      }
      // Spin lerps toward rolling speed — gives slip/burnout feel on landing.
      // Air-spin doesn't instantly match translation; takes ~80ms to sync.
      const targetVrot = t.vx / TIRE_R;
      t.vrot += (targetVrot - t.vrot) * 0.25;
    }

    // Roll-meter activation — when tire is on ground and crawling, show tap-to-roll meter
    const sp2D = Math.hypot(t.vx, t.vy);
    const onGround = (t.y + TIRE_R) >= (terrainAt(t.x) - 2);
    if (state.phase === PHASE.FLY && onGround && state.rollBudget > 5) {
      if (!state.rollActive && sp2D < 4.0) {
        state.rollActive = true;
      } else if (state.rollActive && sp2D > 8.5) {
        state.rollActive = false;
      }
    } else {
      state.rollActive = false;
    }
    if (state.rollTapFlash > 0) state.rollTapFlash--;
    if (state.rollAssistT > 0) state.rollAssistT--;
    if (state.scorePulseT > 0) state.scorePulseT--;
    if (state.recordCelebT > 0) state.recordCelebT--;

    // Combo decay — continuous pressure: ticks down 0.45 per 60 frames (~1s) when no bump lands.
    // bumpMult() resets flightMultDecayT so keeping the combo alive requires staying in the action.
    // x10 → x1 tar ~20s om man inte fortsätter studsa.
    state.flightMultDecayT++;
    if (state.flightMultDecayT > 60 && state.flightMult > 1) {
      state.flightMult = Math.max(1, state.flightMult - 0.45);
      state.flightMultDecayT = 0;
      if (state.flightMult <= 1) {
        state._mult3 = state._mult5 = state._mult10 = false;
      }
    }

    // Ladder collision — any ladder along the track can catapult the tire upward
    for (let li = 0; li < state.ladders.length; li++) {
      const L = state.ladders[li];
      if (L.cooldown > 0) L.cooldown--;
      if (L.walking > 0)  L.walking--;
      if (L.dragT > 0)    L.dragT--;
      if (L.cooldown > 0) continue;
      // Broad-phase cull: skip if tire nowhere near this ladder
      if (Math.abs(t.x - L.x) > 200) continue;
      const { baseX, baseY, topX, topY } = ladderPose(li);
      const sx = topX - baseX, sy = topY - baseY;
      const lenSq = sx * sx + sy * sy;
      const px = t.x - baseX, py = t.y - baseY;
      const u = Math.max(0, Math.min(1, (px * sx + py * sy) / lenSq));
      const cx = baseX + u * sx, cy = baseY + u * sy;
      const dd = Math.hypot(t.x - cx, t.y - cy);
      if (dd < TIRE_R + LADDER_THICK) {
        const speed = Math.hypot(t.vx, t.vy);
        // Launch the tire ALONG the ladder (base → top) — the ladder's tilt
        // directly determines the launch direction. Same behavior as a tilted ramp:
        // top leans forward = launch forward; top leans back = launch back; vertical = straight up.
        const segLen = Math.hypot(sx, sy) || 1;
        let launchX = sx / segLen;   // pointing from base toward top
        let launchY = sy / segLen;   // negative (top is up)
        // Wall-bounce: tire approaches from the right moving left → always kick back right.
        // Overrides the ladder-tilt launch so you can't shortcut past a ladder by slamming left into it.
        const approachedFromRight = (t.x > L.x) && (t.vx < 0);
        // Ladder-man swing: his drag momentum *always* wins. If he's moving right when the
        // ball hits, the ball goes right — regardless of which side the ball approached from.
        // Same for left. This matches "baseball bat" intuition and overrides wall-bounce.
        const swingActive = (L.dragT || 0) > 0 && L.dragSign;
        const swingRight = swingActive && L.dragSign > 0;
        const swingLeft  = swingActive && L.dragSign < 0;
        let swingBonus = 0;
        if (swingRight) {
          launchX = 1; launchY = -0.7;
          const L2 = Math.hypot(launchX, launchY); launchX /= L2; launchY /= L2;
          swingBonus = 6;
        } else if (swingLeft) {
          launchX = -1; launchY = -0.7;
          const L2 = Math.hypot(launchX, launchY); launchX /= L2; launchY /= L2;
          swingBonus = 6;
        } else if (approachedFromRight) {
          launchX = Math.abs(launchX) || 0.7;
          launchY = -Math.abs(launchY || 0.7);  // force upward
          const L2 = Math.hypot(launchX, launchY) || 1;
          launchX /= L2; launchY /= L2;
        }
        const launchMag = Math.max(LADDER_BOUNCE_VY, speed * 0.9) + swingBonus;
        const extraX = (swingRight)
          ? Math.min(6, speed * 0.15 + 3)
          : (swingLeft)
            ? -Math.min(6, speed * 0.15 + 3)
            : approachedFromRight
              ? Math.min(4, speed * 0.15)
              : Math.sign(t.vx || launchX) * Math.min(4, speed * 0.15);
        t.vx = launchX * launchMag + extraX;
        t.vy = launchY * launchMag;
        if (swingRight || swingLeft) {
          // Consume the swing so one drag = one boosted bounce
          L.dragT = 0;
          flashToast(swingRight ? '➡️ SWING!' : '⬅️ SWING!', '#fde047');
        }
        // Guarantee upward motion even for near-horizontal ladders
        if (t.vy > -5) t.vy = -5;
        // Push tire off the segment so it doesn't stick
        const nxLen = Math.hypot(t.x - cx, t.y - cy) || 1;
        const nx = (t.x - cx) / nxLen, ny = (t.y - cy) / nxLen;
        t.x = cx + nx * (TIRE_R + LADDER_THICK + 2);
        t.y = cy + ny * (TIRE_R + LADDER_THICK + 2);
        L.cooldown = 20;
        bumpMult(0.5);
        awardScore(120, '🪜 STEGE!', '#22d3ee');
        runStats.ladderHits = (runStats.ladderHits || 0) + 1;
        addParticles(cx, cy, '#22d3ee', 24, { up: 6, spread: 10, size: 3, shape: 'circle' });
        addParticles(cx, cy, '#fef3c7', 14, { up: 4, spread: 6, size: 3 });
        shake(14);
        state.hitstop = 3;
        tone(880, 0.1, 'square', 0.14, -40);
      }
    }

    // Obstacles
    // Fast x-cull: obstacles far from the tire can't collide this frame. Widest obstacle
    // footprint is ~220 (ramps), so 500 world-units of slack is safe.
    const _collideMinX = t.x - 500;
    const _collideMaxX = t.x + 500;
    OBSTACLES.forEach(o => {
      if (o.x < _collideMinX || o.x > _collideMaxX) return;
      if (o.type === 'wall' && !o.broken) {
        const wx = o.x, wy = terrainAt(o.x) - o.h, ww = 18, wh = o.h;
        if (t.x + TIRE_R > wx && t.x - TIRE_R < wx + ww && t.y + TIRE_R > wy && t.y - TIRE_R < wy + wh) {
          const speed = Math.sqrt(t.vx * t.vx + t.vy * t.vy);
          if (state.shieldT > 0) {
            o.broken = true;
            awardScore(100, '🛡️ PLÖJT!', '#22d3ee');
            runStats.wallsBroken++;
            addParticles(wx + ww/2, wy + wh/2, '#22d3ee', 22, { spread: 8, up: 5, size: 4 });
            addParticles(wx + ww/2, wy + wh/2, '#d97706', 18, { spread: 6, up: 3, size: 3 });
            sfxBreak(); shake(8);
          } else if (speed > 7) {
            o.broken = true;
            bumpMult(0.4);
            awardScore(75, '💥 KROSS!', '#f59e0b');
            runStats.wallsBroken++;
            addParticles(wx + ww/2, wy + wh/2, '#d97706', 26, { spread: 8, up: 5, size: 4 });
            addParticles(wx + ww/2, wy + wh/2, '#78350f', 18, { spread: 6, up: 3, size: 3 });
            sfxBreak(); shake(12);
            state.hitstop = 3;
            t.vx *= 0.75;
            damageTire(2, 10, '🧱 TEGEL');
          } else {
            // Bounce off (based on approach direction)
            if (t.vx > 0) t.x = wx - TIRE_R;
            else          t.x = wx + ww + TIRE_R;
            t.vx = -t.vx * 0.6;
            sfxBounce(); shake(6);
          }
        }
      } else if (o.type === 'house') {
        const hw = 86, hh = 78, roofH = 28;
        const gy = terrainAt(o.x + hw * 0.5);
        const hxL = o.x;
        const hxR = o.x + hw;
        const bodyTop = gy - hh;
        const roofTop = bodyTop - roofH;
        if (t.x + TIRE_R > hxL && t.x - TIRE_R < hxR &&
            t.y + TIRE_R > roofTop && t.y - TIRE_R < gy) {
          if (state.shieldT > 0 && !o.crushed) {
            o.crushed = true;
            awardScore(150, '🛡️ KROSSAT HUS!', '#22d3ee');
            addParticles(o.x + hw/2, bodyTop + hh/2, '#22d3ee', 30, { up: 6, spread: 12, size: 5 });
            addParticles(o.x + hw/2, bodyTop + hh/2, '#a16207', 24, { up: 5, spread: 10, size: 4 });
            addParticles(o.x + hw/2, bodyTop + hh/2, '#78350f', 18, { up: 4, spread: 8, size: 3 });
            sfxBreak(); shake(14);
          } else if (!o.crushed) {
            const penLeft   = (t.x + TIRE_R) - hxL;
            const penRight  = hxR - (t.x - TIRE_R);
            const penTop    = (t.y + TIRE_R) - roofTop;
            const minP = Math.min(penLeft, penRight, penTop);
            if (minP === penTop && t.vy > 0) {
              t.y = roofTop - TIRE_R;
              t.vy = -Math.abs(t.vy) * 0.55;
              t.vx *= 0.9;
            } else if (minP === penLeft && t.vx > 0) {
              t.x = hxL - TIRE_R;
              t.vx = -Math.abs(t.vx) * 0.7;
              t.vy -= 1;
            } else if (minP === penRight && t.vx < 0) {
              t.x = hxR + TIRE_R;
              t.vx = Math.abs(t.vx) * 0.7;
              t.vy -= 1;
            }
            addParticles(t.x, t.y, '#a16207', 10, { up: 2, spread: 3, size: 2 });
            shake(Math.min(12, Math.abs(t.vx) * 1.2 + Math.abs(t.vy) * 0.6));
            sfxBounce();
          }
        }
      } else if (o.type === 'barrel' && !o.toppled) {
        const bx = o.x, by = terrainAt(o.x) - 30, br = 16;
        const dx = t.x - bx, dy = t.y - by;
        const d = Math.sqrt(dx*dx + dy*dy);
        if (d < TIRE_R + br) {
          o.toppled = true;
          state.score += 20;
          addParticles(bx, by, '#b45309', 14, { spread: 6, up: 3, size: 3 });
          setCombo('+20');
          sfxBounce();
          // push through a bit
          t.vx *= 0.92;
        }
      } else if (o.type === 'tnt' && !o.triggered) {
        // 💥 TNT barrel — big explosion on contact
        const bx = o.x, by = terrainAt(o.x) - 32, br = 20;
        const dx = t.x - bx, dy = t.y - by;
        const d = Math.sqrt(dx*dx + dy*dy);
        if (d < TIRE_R + br) {
          o.triggered = true;
          // Blast velocity in tire's travel direction (keeps momentum direction; up-biased)
          const sp = Math.hypot(t.vx, t.vy) || 1;
          const dirX = (t.vx / sp) || 1;
          const dirY = Math.min(0, t.vy / sp);  // bias upward — never slam into ground
          const BLAST = 22;
          t.vx = dirX * BLAST + Math.sign(dirX) * 4;
          t.vy = (dirY * BLAST) - 14;  // always kick up
          state.launchBoostT = Math.max(state.launchBoostT, 60);
          awardScore(200, '💥 TNT!', '#ef4444');
          addParticles(bx, by, '#ef4444', 40, { up: 8, spread: 14, size: 5 });
          addParticles(bx, by, '#fbbf24', 28, { up: 6, spread: 10, size: 4 });
          addParticles(bx, by, '#fef3c7', 18, { up: 4, spread: 8, size: 3 });
          shake(22);
          state.hitstop = 5;
          tone(120, 0.2, 'sawtooth', 0.25, -400);
          setTimeout(() => tone(80, 0.15, 'sawtooth', 0.2, -600), 60);
          // Detonate nearby barrels/tnt too (chain)
          OBSTACLES.forEach(n => {
            if ((n.type === 'barrel' && !n.toppled) || (n.type === 'tnt' && !n.triggered)) {
              if (n !== o && Math.abs(n.x - bx) < 90) {
                if (n.type === 'barrel') n.toppled = true;
                else n.triggered = true;
                addParticles(n.x, terrainAt(n.x) - 30, '#ef4444', 18, { up: 5, spread: 8, size: 3 });
              }
            }
          });
        }
      } else if (o.type === 'cannon') {
        // 🎯 Cannon: landing on its mouth fires the tire in the cannon's angle
        if (o.cooldown > 0) { o.cooldown--; }
        else {
          const cx = o.x, cy = terrainAt(o.x) - 24;  // mouth height
          const dx = t.x - cx, dy = t.y - cy;
          const d = Math.sqrt(dx*dx + dy*dy);
          if (d < TIRE_R + 22 && t.vy >= -2) {
            const launchSpeed = Math.max(24, Math.hypot(t.vx, t.vy) * 1.05);
            t.vx = Math.cos(o.angle) * launchSpeed;
            t.vy = -Math.sin(o.angle) * launchSpeed;
            t.x = cx + Math.cos(o.angle) * (TIRE_R + 26);
            t.y = cy - Math.sin(o.angle) * (TIRE_R + 26);
            state.launchBoostT = Math.max(state.launchBoostT, 70);
            o.cooldown = 40;
            awardScore(150, '🎯 KANON!', '#fbbf24');
            addParticles(cx, cy, '#fbbf24', 30, { up: 7, spread: 10, size: 4 });
            addParticles(cx, cy, '#f59e0b', 20, { up: 5, spread: 8, size: 3 });
            addParticles(cx, cy, '#ffffff', 16, { up: 6, spread: 8, size: 2 });
            shake(18);
            state.hitstop = 4;
            tone(140, 0.18, 'sawtooth', 0.22, -300);
            setTimeout(() => tone(880, 0.1, 'square', 0.16, 400), 40);
          }
        }
      } else if (o.type === 'cactus') {
        if (o.broken) return;
        if (o.flashT > 0) o.flashT--;
        // Bounding box: narrow + tall, sitting on terrain
        const cw = 32;
        const gy = terrainAt(o.x);
        const cxL = o.x - cw / 2;
        const cxR = o.x + cw / 2;
        const cTop = gy - o.h;
        if (!state.stuckOnCactus && state.shieldT === 0 &&
            t.x + TIRE_R > cxL && t.x - TIRE_R < cxR &&
            t.y + TIRE_R > cTop && t.y - TIRE_R < gy) {
          // Determine which side the tire came from
          const side = (t.vx >= 0) ? 'left' : 'right';
          const pinX = side === 'left' ? cxL - TIRE_R * 0.6 : cxR + TIRE_R * 0.6;
          const pinY = Math.max(cTop + 10, Math.min(gy - TIRE_R - 5, t.y));
          // 10-20% skada när man fastnar — kan döda om HP redan är lågt
          const died = damageTire(10, 20, '🌵 KAKTUS');
          if (died) return;
          state.stuckOnCactus = { pinX, pinY, side, obsX: o.x };
          t.vx = 0; t.vy = 0; t.vrot = 0;
          t.x = pinX; t.y = pinY;
          o.flashT = 30;
          addParticles(t.x, t.y, '#166534', 24, { up: 4, spread: 6, size: 3 });
          addParticles(t.x, t.y, '#84cc16', 14, { up: 3, spread: 5, size: 3 });
          flashToast('🌵 FASTNAT! Dra eller 🪂/💣 för att lossa', '#22c55e');
          shake(8); state.hitstop = 3;
          tone(220, 0.15, 'sawtooth', 0.18, -200);
        } else if (state.shieldT > 0 &&
                   t.x + TIRE_R > cxL && t.x - TIRE_R < cxR &&
                   t.y + TIRE_R > cTop && t.y - TIRE_R < gy && !o.broken) {
          // Shield shatters the cactus — it's gone for the rest of the run
          o.broken = true;
          o._crushed = true;
          awardScore(150, '🛡️ KAKTUS KROSSAD!', '#22d3ee');
          // Shatter burst: green shards + yellow spines + bright flash
          addParticles(o.x, gy - o.h / 2, '#22d3ee', 26, { up: 6, spread: 10, size: 5 });
          addParticles(o.x, gy - o.h / 2, '#166534', 32, { up: 7, spread: 12, size: 4 });
          addParticles(o.x, gy - o.h / 2, '#84cc16', 22, { up: 5, spread: 10, size: 3 });
          addParticles(o.x, gy - o.h / 2, '#fef3c7', 16, { up: 4, spread: 8, size: 2 });
          shake(10);
          tone(520, 0.18, 'square', 0.2, 300);
          setTimeout(() => tone(220, 0.2, 'sawtooth', 0.18, -200), 40);
        }
      } else if (o.type === 'spike') {
        // Spike trap — 50% damage + bounce (or death if HP runs out). Shield shatters.
        if (o.broken) return;
        if (o.flashT > 0) o.flashT--;
        if (o.dmgCooldown && o.dmgCooldown > 0) o.dmgCooldown--;
        const sw = o.w || 44, sh = o.h || 28;
        const gy = terrainAt(o.x);
        const sxL = o.x - sw / 2, sxR = o.x + sw / 2;
        const sTop = gy - sh;
        if (t.x + TIRE_R > sxL && t.x - TIRE_R < sxR &&
            t.y + TIRE_R > sTop && t.y - TIRE_R < gy) {
          if (state.shieldT > 0) {
            o.broken = true;
            awardScore(200, '🛡️ KROSSAT!', '#22d3ee');
            addParticles(o.x, gy - sh / 2, '#22d3ee', 28, { up: 6, spread: 12, size: 5 });
            addParticles(o.x, gy - sh / 2, '#94a3b8', 22, { up: 5, spread: 10, size: 4 });
            addParticles(o.x, gy - sh / 2, '#fef3c7', 14, { up: 4, spread: 8, size: 3 });
            shake(12);
            tone(560, 0.2, 'square', 0.22, 300);
            setTimeout(() => tone(240, 0.22, 'sawtooth', 0.2, -200), 40);
          } else if (!o.dmgCooldown || o.dmgCooldown <= 0) {
            // 50% skada — om HP kvar studsar hjulet iväg, annars dör det.
            o.dmgCooldown = 45; // ingen re-trigger på 0.75s
            o.flashT = 30;
            addParticles(t.x, t.y, '#ef4444', 22, { up: 6, spread: 8, size: 4 });
            addParticles(t.x, t.y, '#7f1d1d', 14, { up: 4, spread: 6, size: 3 });
            shake(18); state.hitstop = 4;
            tone(160, 0.22, 'sawtooth', 0.22, -400);
            const died = damageTire(20, 50, '⚙️ SPIKAR');
            if (!died) {
              // Studsa uppåt + bakåt från spikarna
              const side = (t.x < o.x) ? -1 : 1;
              t.vx = side * Math.max(6, Math.abs(t.vx) * 0.7);
              t.vy = -Math.max(8, Math.abs(t.vy) * 0.8 + 4);
              t.y = sTop - TIRE_R - 2;
            }
            return;
          }
        }
      } else if (o.type === 'water') {
        // Water hole — instant death on contact (sköld räddar inte från drunkning).
        const wx1 = o.x, wx2 = o.x + o.w;
        const surfY = o.surfaceY;
        if (t.x + TIRE_R > wx1 && t.x - TIRE_R < wx2 && t.y + TIRE_R > surfY - 4 && !o._splashed) {
          o._splashed = true;
          // Splash
          addParticles(t.x, surfY, '#38bdf8', 32, { up: 8, spread: 12, size: 5 });
          addParticles(t.x, surfY, '#bae6fd', 24, { up: 6, spread: 10, size: 4 });
          addParticles(t.x, surfY, '#0ea5e9', 20, { up: 4, spread: 8, size: 3 });
          shake(14); state.hitstop = 4;
          tone(160, 0.3, 'sawtooth', 0.22, -500);
          setTimeout(() => tone(120, 0.3, 'sine', 0.18, -400), 80);
          state.health = 0;
          state.damageFlashT = 24;
          state.deathCause = 'water';
          // Drunknings-animation: hjulet sjunker under ytan + fade-out under 50 frames.
          state.drowning = {
            t: 0,
            max: 50,
            surfaceY: surfY,
            startY: t.y,
            sinkTo: surfY + 60,
          };
          // Stoppa fysiken så hjulet inte studsar/rullar under animationen
          t.vx = 0;
          t.vy = 0;
          flashToast('💧 DRUNKNAR!', '#0ea5e9');
          setTimeout(() => finishRun(false), 850);
          return;
        }
      } else if (o.type === 'lava') {
        // Lavaflod — instant-death; samma sjunkningsanimation som vatten men eldigt tema.
        const wx1 = o.x, wx2 = o.x + o.w;
        const surfY = o.surfaceY;
        if (t.x + TIRE_R > wx1 && t.x - TIRE_R < wx2 && t.y + TIRE_R > surfY - 4 && !o._splashed) {
          o._splashed = true;
          // Lava splash — gnistor + glödande droppar
          addParticles(t.x, surfY, '#fbbf24', 32, { up: 10, spread: 14, size: 5 });
          addParticles(t.x, surfY, '#f97316', 24, { up: 8, spread: 12, size: 4 });
          addParticles(t.x, surfY, '#dc2626', 20, { up: 6, spread: 10, size: 4 });
          addParticles(t.x, surfY, '#7f1d1d', 14, { up: 4, spread: 8, size: 3 });
          shake(20); state.hitstop = 5;
          tone(140, 0.4, 'sawtooth', 0.28, -400);
          setTimeout(() => tone(90, 0.5, 'sawtooth', 0.22, -550), 80);
          state.health = 0;
          state.damageFlashT = 30;
          state.deathCause = 'lava';
          // Sjunker långsammare i lava (mer trögflytande) — samma fält som drowning
          state.drowning = {
            t: 0,
            max: 60,
            surfaceY: surfY,
            startY: t.y,
            sinkTo: surfY + 50,
            isLava: true,
          };
          t.vx = 0;
          t.vy = 0;
          flashToast('🌋 BRINNER UPP!', '#f97316');
          setTimeout(() => finishRun(false), 900);
          return;
        }
      } else if (o.type === 'geyser') {
        // Geyser — när den eruperar (cycleT i [240, 330]) och hjulet är ovanför pelaren,
        // skickas hjulet uppåt med en kraftig impuls. Sköld behövs inte; inte dödlig.
        const cycleT = o.cycleT || 0;
        const erupting = cycleT >= 240 && cycleT < 330;
        if (erupting) {
          const cx = o.x;
          const groundY = terrainAt(cx);
          const topY = groundY - (o.height || 240);
          // Kollidera om hjulet är inom geysers x-band och under kolonnens topp men över marken
          if (Math.abs(t.x - cx) < (o.w || 56) * 0.5 + TIRE_R && t.y > topY - TIRE_R && t.y < groundY + TIRE_R && (o.boostedT || 0) === 0) {
            o.boostedT = 30; // 0.5s cooldown så vi inte spammar boost
            // Stark uppåtsåt + lite x-bibehåll
            t.vy = -22;
            // Begränsa nedåtgående hastighet
            if (t.vy > -22) t.vy = -22;
            shake(10); state.hitstop = 2;
            tone(660, 0.18, 'sawtooth', 0.16, 200);
            setTimeout(() => tone(880, 0.14, 'sine', 0.12, 240), 60);
            addParticles(cx, groundY - 20, '#fef3c7', 24, { up: 12, spread: 8, size: 4 });
            addParticles(cx, groundY - 20, '#fb923c', 18, { up: 10, spread: 6, size: 4 });
            addParticles(cx, groundY - 20, '#fbbf24', 14, { up: 8, spread: 5, size: 3 });
            awardScore(80, '♨️ GEYSER!', '#fb923c');
            flashToast('♨️ GEYSER-BOOST!', '#fb923c');
          }
        }
        if (o.boostedT > 0) o.boostedT--;
      } else if (o.type === 'bumper') {
        if (o.cooldown > 0) o.cooldown--;
        if (o.hitT > 0) o.hitT--;
        const bx = o.x, by = o.y, br = o.r;
        const dx = t.x - bx, dy = t.y - by;
        const d = Math.sqrt(dx*dx + dy*dy);
        if (d < TIRE_R + br && o.cooldown === 0) {
          const nx = (dx || 0.001) / (d || 1);
          const ny = (dy || -0.001) / (d || 1);
          // Push tire outside the bumper along the normal
          t.x = bx + nx * (TIRE_R + br + 1);
          t.y = by + ny * (TIRE_R + br + 1);
          // Pinball kick: outward impulse + retain speed
          const inSpd = Math.max(10, Math.hypot(t.vx, t.vy));
          const KICK = 18;
          t.vx = nx * (inSpd * 0.7 + KICK);
          t.vy = ny * (inSpd * 0.7 + KICK) - 2;
          o.cooldown = 14;
          o.hitT = 14;
          bumpMult(0.35);
          awardScore(60, '🎯 BUMPER!', '#22c55e');
          addParticles(bx, by, '#22c55e', 20, { up: 5, spread: 8, size: 4 });
          addParticles(bx, by, '#fef08a', 14, { up: 4, spread: 6, size: 3 });
          shake(8); state.hitstop = 2;
          tone(880, 0.08, 'square', 0.18, 120);
          setTimeout(() => tone(1320, 0.08, 'square', 0.14, 200), 40);
        }
      } else if (o.type === 'spinner') {
        const sx = o.x, sy = o.y;
        const dx = t.x - sx, dy = t.y - sy;
        const d = Math.sqrt(dx*dx + dy*dy);
        const HR = 60;
        if (d < TIRE_R + 14) {
          if (state.shieldT > 0 && !o._shieldPassed) {
            // Sköld: flyg rakt igenom utan fysikreflektion
            o._shieldPassed = true;
            awardScore(300, '🛡️ IGENOM!', '#22d3ee');
            addParticles(t.x, t.y, '#22d3ee', 20, { spread: 8, up: 4, size: 3 });
            addParticles(t.x, t.y, '#67e8f9', 14, { spread: 6, up: 3, size: 2 });
            shake(6); tone(1200, 0.08, 'triangle', 0.14, 280);
          } else if (state.shieldT === 0) {
            // compute blade angle interaction
            const nx = dx / d, ny = dy / d;
            t.x = sx + nx * (TIRE_R + 14);
            t.y = sy + ny * (TIRE_R + 14);
            const boost = 9;
            t.vx = nx * boost + o.speed * 80 * -ny;
            t.vy = ny * boost + o.speed * 80 * nx - 3;
            bumpMult(0.6);
            awardScore(30, '🌀 SLUNGAD!', '#60a5fa');
            addParticles(t.x, t.y, '#3b82f6', 16, { spread: 8, up: 5, size: 3 });
            shake(10); sfxBounce();
          }
        } else if (o._shieldPassed && d > TIRE_R + 40) {
          o._shieldPassed = false;
        }
      } else if (o.type === 'trampoline') {
        if (o.cooldown > 0) { o.cooldown--; return; }
        // Bounce pad bounding box: pad center is at terrain level
        const gy = terrainAt(o.x);
        const padTop = gy - o.h;        // top surface of the pad
        const padLeft = o.x - o.w / 2;
        const padRight = o.x + o.w / 2;
        // Tire within pad's x range AND has fallen onto or through the top surface while moving down
        if (t.x > padLeft - TIRE_R && t.x < padRight + TIRE_R &&
            t.y + TIRE_R > padTop && t.y - TIRE_R < padTop + o.h &&
            t.vy > -1) {
          // Tap-boost (new): player tapped while heading into the pad → +50% bounce, no stomp dive.
          // Falls through to legacy stomp-boost branches only if no tap-boost is armed.
          const isTapBoost = state.trampTapBoostT > 0;
          const isStomped = !isTapBoost && state.stompWindow > 0;
          const isPerfectTap = !isTapBoost && state.stompWindow >= (TUNING.stompWindowFrames - 3);  // tap within last ~3 frames
          const tapMult = isTapBoost ? 1.5 : isPerfectTap ? TUNING.tapMultPerfect : isStomped ? TUNING.tapMultStomp : 1.0;
          // Speed-based bounce: higher incoming speed = higher bounce (up to +60%)
          const speed = Math.hypot(t.vx, t.vy);
          const speedFactor = 1 + Math.min(TUNING.speedFactorMax, speed * 0.025);
          const mult = tapMult * speedFactor;
          const boost = o.power * mult;

          // Strong upward velocity + slight forward carry
          t.y = padTop - TIRE_R - 1;
          t.vy = -boost;
          t.vx += Math.sign(t.vx || 1) * (isStomped ? 4 : 2);

          // Open a bounce-timing window so tap right after can chain into super-bounce
          state.landT = state.time;
          state.landImpactSpeed = boost;
          state.trampLandT = state.time;    // trampoline-specific — drives post-impact tap boost
          state.trampImpactSpeed = boost;
          if (isStomped) state.superStudsT = state.time;   // stomp-chain primes super-tier
          if (isStomped) state.stompWhiffT = 0;             // landed a stomp-boost → no whiff penalty

          // Cooldown so we don't re-trigger same frame/pad
          o.cooldown = 24;
          // Suppress stomp window after a perfect hit (prevents chain-abuse on same pad)
          if (isStomped) state.stompWindow = 0;
          if (isTapBoost) state.trampTapBoostT = 0;   // consume tap-boost flag

          bumpMult(isTapBoost ? 0.9 : isStomped ? 1.2 : 0.7);
          const baseGain = Math.round(o.score * mult);
          const gain = Math.round(baseGain * state.flightMult);
          state.score += gain;
          state.scorePulseT = 14;
          runStats.tramps = (runStats.tramps || 0) + 1;
          if (isStomped) runStats.trampsPerfect = (runStats.trampsPerfect || 0) + 1;

          // Color by tier
          const col = isTapBoost ? '#fbbf24' : isPerfectTap ? '#f472b6' : (o.tier === 'mega' ? '#ef4444' : o.tier === 'std' ? '#f97316' : '#22c55e');
          const label = isTapBoost
            ? `🎯 TAJMAD STUDS! +${gain}`
            : isPerfectTap
              ? `🎯 2× PERFEKT TAJMING! +${gain}`
              : isStomped
                ? `💥 PERFEKT STUDS! +${gain}`
                : (o.tier === 'mega' ? `🚀 MEGA! +${gain}` : o.tier === 'std' ? `STUDS! +${gain}` : `Studs +${gain}`);
          addPopup(o.x, padTop - 30, `+${gain}`, col);
          flashToast(label, col);
          addParticles(o.x, padTop, col, isTapBoost ? 30 : isPerfectTap ? 36 : isStomped ? 28 : 18, { up: 7, spread: 10, size: 4, shape: 'circle' });
          if (isStomped) addParticles(o.x, padTop, '#fef3c7', 14, { up: 5, spread: 8, size: 3 });
          if (isPerfectTap) addParticles(o.x, padTop, '#fbbf24', 18, { up: 6, spread: 9, size: 4 });
          if (isTapBoost) addParticles(o.x, padTop, '#f472b6', 16, { up: 5, spread: 8, size: 3 });
          shake(isPerfectTap ? 20 : isTapBoost ? 14 : isStomped ? 16 : 10);
          state.hitstop = isPerfectTap ? 5 : isTapBoost ? 3 : isStomped ? 4 : 2;
          tone(isPerfectTap ? 1400 : isTapBoost ? 1200 : isStomped ? 1100 : 700, 0.1, 'square', 0.14, 200);
          if (isStomped) tone(1600, 0.12, 'triangle', 0.1, 400);
          if (isPerfectTap) tone(1900, 0.14, 'triangle', 0.12, 600);
          if (isTapBoost) tone(1700, 0.12, 'triangle', 0.12, 500);
        }
      } else if (o.type === 'ramp') {
        // triangle from (x, gy) to (x+w, gy-h)
        const gy = terrainAt(o.x + o.w * 0.5);
        const rx1 = o.x, ry1 = gy;
        const rx2 = o.x + o.w, ry2 = gy - o.h;
        if (t.x > rx1 && t.x < rx2 && t.vx > 2) {
          const tr = (t.x - rx1) / (rx2 - rx1);
          const rampY = ry1 + (ry2 - ry1) * tr;
          if (t.y + TIRE_R > rampY) {
            t.y = rampY - TIRE_R;
            const slope = (ry2 - ry1) / (rx2 - rx1);
            const nx = -slope, ny = -1;
            const nl = Math.sqrt(nx*nx + ny*ny);
            const nnx = nx / nl, nny = ny / nl;
            const dot = t.vx * nnx + t.vy * nny;
            if (dot < 0) {
              t.vx -= 2 * dot * nnx * 0.9;
              t.vy -= 2 * dot * nny * 0.9;
            }
            // Ramp kicker: upward+forward impulse near the top of the ramp
            // so tire actually launches into the air instead of just grazing off.
            if (tr > 0.35 && (o._boostT || 0) <= 0) {
              const dx = rx2 - rx1, dy = ry2 - ry1;
              const tanLen = Math.hypot(dx, dy) || 1;
              const tangX = dx / tanLen;
              const tangY = dy / tanLen;       // negative (up along the ramp)
              // Scale kick with approach speed AND ramp height — fast-hit ramps fly
              const approachSpeed = Math.hypot(t.vx, t.vy);
              const kick = Math.min(24, 5 + approachSpeed * 0.5 + o.h * 0.022);
              t.vx += tangX * kick;
              t.vy += tangY * kick;             // adds upward speed
              // Extra pure-upward pop so it feels like a jump, not a slide
              t.vy -= Math.min(9, approachSpeed * 0.28);
              // Let the tire exceed the normal speed cap briefly so ramps actually fly
              state.launchBoostT = Math.max(state.launchBoostT, 50);
              o._boostT = 12;                   // cooldown to avoid re-triggering
              bumpMult(0.5);
              awardScore(40, '⛰️ RAMP!', '#fbbf24');
              addParticles(t.x, rampY, '#fbbf24', 10, { up: 4, spread: 4, size: 3, shape: 'circle' });
              tone(520, 0.08, 'square', 0.1, 80);
            }
          }
        }
        if (o._boostT > 0) o._boostT--;
        if (o._flipCooldown > 0) o._flipCooldown--;
        // Flipper swing: if arm is in motion and hasn't connected yet, check collision with tire
        if ((o._flipSwingT || 0) > 0 && !o._flipHit) {
          const swingMax = o._flipSwingMax || FLIP_SWING_FRAMES;
          const elapsed = swingMax - o._flipSwingT;
          const phase = elapsed / swingMax;                // 0..1
          const liftMax = o.h * FLIP_LIFT_SCALE + FLIP_LIFT_BASE;
          const lift = Math.sin(phase * Math.PI) * liftMax;
          const rx1 = o.x, ry1 = gy;
          const rx2 = o.x + o.w, ry2 = (gy - o.h) - lift;
          const vx = rx2 - rx1, vy = ry2 - ry1;
          const wxp = t.x - rx1, wyp = t.y - ry1;
          const segLen2 = vx * vx + vy * vy;
          const tp = segLen2 > 0 ? Math.max(0, Math.min(1, (wxp * vx + wyp * vy) / segLen2)) : 0;
          const px = rx1 + tp * vx, py = ry1 + tp * vy;
          const d = Math.hypot(t.x - px, t.y - py);
          if (d < TIRE_R + FLIP_STRIKE_R) {
            const power = 1 - phase;                       // earlier hits = more power
            const approach = Math.hypot(t.vx, t.vy);
            const kickBase = 12 + approach * 0.55 + o.h * 0.022;
            const kick = kickBase * (0.35 + power * 1.15); // 0.35x..1.5x
            const tanLen = Math.hypot(vx, vy) || 1;
            const tangX = vx / tanLen, tangY = vy / tanLen;
            t.vx += tangX * kick;
            t.vy += tangY * kick;
            t.vy -= 8 + power * 12;
            if (t.vx < 0) t.vx = Math.max(0, t.vx + 4);
            // Briefly allow exceeding the normal cap so strong flipper hits actually launch high
            state.launchBoostT = Math.max(state.launchBoostT, 60);
            o._flipHit = true;
            o._flipCooldown = 30;
            state.rollAssistT = 30;
            state.landT = -999;
            bumpMult(0.3 + power * 0.5);
            const pts = Math.round(50 + power * 150);
            const col = power >= 0.7 ? '#22c55e' : power >= 0.4 ? '#60a5fa' : '#94a3b8';
            const label = power >= 0.7 ? '⚡ PERFECT FLIPPER!'
                         : power >= 0.4 ? '⚡ FLIPPER!'
                         : '⚡ NUDGE';
            awardScore(pts, label, col);
            addParticles(px, py, col, 20, { up: 5, spread: 7, size: 3 });
            addParticles(px, py, '#fbbf24', 10, { up: 4, spread: 5, size: 2 });
            tone(520 + power * 400, 0.08, 'square', 0.16, 220);
            shake(Math.round(4 + power * 8));
            state.stompWhiffT = 0;   // flipper-strike redeems the armed stomp
          }
        }
        if (o._flipSwingT > 0) o._flipSwingT--;
      } else if (o.type === 'finish') {
        if (t.x > o.x && state.phase === PHASE.FLY && state.finishPending === 0) {
          const dySigned = t.y - LEVEL.finishCY;   // negativt = ovanför tavlan (högre upp)
          const dy = Math.abs(dySigned);
          const fmt = n => n.toFixed(1).replace(/\.0$/, '');
          // Tower top is ~132 world-units above finishCY (finishCY = terrainAt-240, towerTop = terrainAt-372)
          const TOWER_TOP_DY = -132;
          const CHIMNEY_ZONE = 30;   // +/- window around tower top counts as chimney bonus
          let zoneMult = TUNING.multFramme, label = `FRAMME! x${fmt(TUNING.multFramme)}`, col = '#10b981';
          let isMiss = false, isChimney = false;
          if (dySigned < TOWER_TOP_DY - CHIMNEY_ZONE) {
            // Flew completely over the tower → no bonus
            isMiss = true;
            zoneMult = 1.0;
            label = '❌ MISS! Över tornet';
            col = '#ef4444';
          } else if (dySigned < TOWER_TOP_DY + CHIMNEY_ZONE) {
            // Landed on the chimney top
            isChimney = true;
            zoneMult = TUNING.multChimneyTop;
            label = `🏆 CHIMNEY BONUS! x${fmt(TUNING.multChimneyTop)}`;
            col = '#fde047';
          } else if (dy < 18)   { zoneMult = TUNING.multBullseye; label = `🎯 BULLSEYE! x${fmt(TUNING.multBullseye)}`; col = '#ef4444'; }
          else if (dy < 38)     { zoneMult = TUNING.multInring;   label = `INRING! x${fmt(TUNING.multInring)}`;        col = '#fbbf24'; }
          else if (dy < 65)     { zoneMult = TUNING.multMellan;   label = `MELLAN! x${fmt(TUNING.multMellan)}`;        col = '#3b82f6'; }
          else if (dy < 100 + TIRE_R) { zoneMult = TUNING.multYttre; label = `YTTRE! x${fmt(TUNING.multYttre)}`;        col = '#a855f7'; }
          else                  { isMiss = true; zoneMult = 1.0;  label = '❌ MISS! Under tavlan'; col = '#ef4444'; }

          const before = state.score;
          state.score = Math.round(state.score * zoneMult);
          state.goalBonus = state.score - before;
          state.goalMult = zoneMult;
          state.scorePulseT = 30;
          flashToast(label, col);

          if (!isMiss) {
            // Stick the tire to the impact point so the player sees it land
            state.finishStuck = true;
            state.finishStickX = isChimney ? o.x : o.x + 2;
            state.finishStickY = isChimney ? (LEVEL.finishCY + TOWER_TOP_DY) : t.y;
            t.vx = 0; t.vy = 0; t.vrot = 0.15;
            t.x = state.finishStickX;
            t.y = state.finishStickY;
            addParticles(t.x, t.y, col, 36, { up: 7, spread: 12, size: 5 });
            addParticles(t.x, t.y, '#fbbf24', 24, { up: 5, spread: 10, size: 4 });
            addParticles(t.x, t.y, '#ffffff', 16, { up: 4, spread: 8, size: 3 });
            shake(isChimney ? 28 : 22);
            state.hitstop = 6;
            sfxFinish();
          } else {
            // Let the tire continue flying briefly so the miss reads visually
            shake(8);
            addParticles(t.x, t.y, '#ef4444', 14, { up: 4, spread: 8, size: 3 });
            sfxBounce();
          }
          state.finishPending = isMiss ? 75 : 100;  // frames to hold before ending
          state.finishResult = true;  // always counts as a completed goal run
        }
      }
    });

    // Near-miss bonus: +150 if tire skims within 25px of a wall/spinner/cactus
    // without hitting it. Fires once per approach; flag resets when tire moves >120px away.
    for (let oi = 0; oi < OBSTACLES.length; oi++) {
      const o = OBSTACLES[oi];
      if (o.x < _collideMinX || o.x > _collideMaxX) { o._nearMissed = false; continue; }
      let gap = Infinity;
      if (o.type === 'wall' && !o.broken) {
        const wx = o.x, wy = terrainAt(o.x) - o.h, ww = 18, wh = o.h;
        const cx = Math.max(wx, Math.min(t.x, wx + ww));
        const cy = Math.max(wy, Math.min(t.y, wy + wh));
        gap = Math.hypot(t.x - cx, t.y - cy) - TIRE_R;
      } else if (o.type === 'cactus' && !o.broken) {
        const cw = 32, gy = terrainAt(o.x);
        const cxL = o.x - cw / 2, cxR = o.x + cw / 2, cTop = gy - o.h;
        const px = Math.max(cxL, Math.min(t.x, cxR));
        const py = Math.max(cTop, Math.min(t.y, gy));
        gap = Math.hypot(t.x - px, t.y - py) - TIRE_R;
      } else if (o.type === 'spike' && !o.broken) {
        const sw = o.w || 44, sh = o.h || 28;
        const gy = terrainAt(o.x);
        const sxL = o.x - sw / 2, sxR = o.x + sw / 2, sTop = gy - sh;
        const px = Math.max(sxL, Math.min(t.x, sxR));
        const py = Math.max(sTop, Math.min(t.y, gy));
        gap = Math.hypot(t.x - px, t.y - py) - TIRE_R;
      } else if (o.type === 'spinner') {
        gap = Math.hypot(t.x - o.x, t.y - o.y) - (TIRE_R + 14);
      } else {
        continue;
      }
      if (gap > 120) { o._nearMissed = false; continue; }
      if (gap <= 0) continue;           // collision handled in main loop
      if (gap < 25 && !o._nearMissed) {
        o._nearMissed = true;
        awardScore(150, '🎯 NÄRA!', '#fde047');
        addParticles(t.x, t.y, '#fde047', 12, { up: 3, spread: 5, size: 3 });
        tone(1200, 0.06, 'square', 0.1, 200);
      }
    }

    // Magnet: pull nearby pickups toward the tire while active
    const MAGNET_RADIUS = TUNING.magnetRadius;
    const magnetActive = state.magnetT > 0;
    if (magnetActive) {
      const r2 = MAGNET_RADIUS * MAGNET_RADIUS;
      const _magMinX = t.x - MAGNET_RADIUS;
      const _magMaxX = t.x + MAGNET_RADIUS;
      PICKUPS.forEach(p => {
        if (p.taken || p.type === 'magnet') return;
        if (p.x < _magMinX || p.x > _magMaxX) return;
        const py0 = p.type === 'balloon' ? p.baseY + Math.sin((state.time + p._i * 30) * 0.05) * 18 : p.y;
        const ddx = t.x - p.x, ddy = t.y - py0;
        const d2 = ddx*ddx + ddy*ddy;
        if (d2 < r2 && d2 > 1) {
          const d = Math.sqrt(d2);
          const pull = TUNING.magnetPullStrength * (1 - d / MAGNET_RADIUS);  // stronger when closer
          p.x += (ddx / d) * pull;
          if (p.type === 'balloon') p.baseY += (ddy / d) * pull;
          else p.y += (ddy / d) * pull;
        }
      });
    }

    // Pickups
    // Pickups only collide close to the tire (radius ~18 + balloons float ~18). Cull by x-distance.
    const _pickMinX = t.x - 100;
    const _pickMaxX = t.x + 100;
    PICKUPS.forEach(p => {
      if (p.taken) return;
      if (p.x < _pickMinX || p.x > _pickMaxX) return;
      // Balloons bob — use current Y for collision
      const py = p.type === 'balloon' ? p.baseY + Math.sin((state.time + p._i * 30) * 0.05) * 18 : p.y;
      const dx = t.x - p.x, dy = t.y - py;
      let r = 18;
      if (p.type === 'star') r = 26;
      else if (p.type === 'balloon') r = 22;
      else if (p.type === 'nitro') r = 22;
      else if (p.type === 'airjump') r = 22;
      else if (p.type === 'magnet') r = 22;
      else if (p.type === 'power') r = 22;
      else if (p.type === 'bomb') r = 22;
      else if (p.type === 'shield') r = 22;
      else if (p.type === 'medkit') r = 22;
      // Magnet active doubles the effective collect radius (auto-vacuum)
      if (magnetActive && p.type !== 'magnet') r += 14;
      if (dx*dx + dy*dy < (TIRE_R + r) * (TIRE_R + r)) {
        p.taken = true;
        if (p.type === 'coin') {
          state.combo.count++;
          state.combo.timer = 110;
          state.coinsRun++;
          runStats.coinsRun++;
          // Progressive combo: x10 requires a strong 75-coin chain
          const c = state.combo.count;
          const mult = c >= 75 ? 10
                     : c >= 55 ? 9
                     : c >= 40 ? 8
                     : c >= 30 ? 7
                     : c >= 22 ? 6
                     : c >= 15 ? 5
                     : c >= 10 ? 4
                     : c >= 6  ? 3
                     : c >= 3  ? 2 : 1;
          state.combo.mult = mult;
          if (mult > runStats.maxCombo) runStats.maxCombo = mult;
          const gain = Math.round(25 * mult * state.flightMult);
          state.score += gain;
          state.scorePulseT = 10;
          if (state.tire && (state.time - state.groundContactT) > 4) bumpMult(0.2);
          addPopup(p.x, p.y - 20, `+${gain}`, mult > 1 ? '#f472b6' : '#fbbf24');
          if (mult > 1) setCombo(`x${mult} COMBO! +${gain}`);
          addParticles(p.x, p.y, '#fbbf24', 12, { up: 3, spread: 4, size: 3 });
          sfxCoin();
        } else if (p.type === 'star') {
          state.starsGot++;
          state.score += 300;
          addPopup(p.x, p.y - 20, '+300 STJÄRNA', '#fbbf24');
          addParticles(p.x, p.y, '#fbbf24', 24, { up: 5, spread: 8, size: 4 });
          addParticles(p.x, p.y, '#ffffff', 14, { up: 3, spread: 6, size: 2 });
          sfxStar(); shake(4);
        } else if (p.type === 'balloon') {
          bumpMult(0.4);
          awardScore(150, '🎈 BALLONG!', '#ec4899');
          runStats.balloonsPopped++;
          t.vy = Math.min(t.vy, -9);
          t.vx += 1.5;
          addParticles(p.x, py, '#ec4899', 18, { up: 4, spread: 7, size: 4, shape: 'circle' });
          addParticles(p.x, py, '#fef3c7', 10, { up: 3, spread: 5, size: 3 });
          sfxStar(); shake(6);
        } else if (p.type === 'nitro') {
          state.nitroCharges = Math.min(5, state.nitroCharges + 1);
          state.score += 100;
          addPopup(p.x, p.y - 20, '🔥 NITRO!', '#ef4444');
          addParticles(p.x, p.y, '#ef4444', 20, { up: 5, spread: 6, size: 3 });
          addParticles(p.x, p.y, '#fbbf24', 14, { up: 4, spread: 5, size: 3 });
          sfxCoin(); shake(4);
          updateNitroBadge();
        } else if (p.type === 'airjump') {
          state.airjumpCharges = Math.min(5, state.airjumpCharges + 1);
          state.score += 60;
          addPopup(p.x, p.y - 20, '🪂 AIR JUMP!', '#60a5fa');
          addParticles(p.x, p.y, '#60a5fa', 20, { up: 5, spread: 6, size: 3 });
          addParticles(p.x, p.y, '#93c5fd', 14, { up: 4, spread: 5, size: 3 });
          sfxCoin(); shake(3);
          updateAirjumpBadge();
        } else if (p.type === 'magnet') {
          state.magnetCharges = Math.min(5, state.magnetCharges + 1);
          state.score += 80;
          addPopup(p.x, p.y - 20, '🧲 MAGNET!', '#a855f7');
          addParticles(p.x, p.y, '#a855f7', 22, { up: 5, spread: 6, size: 3 });
          addParticles(p.x, p.y, '#f0abfc', 14, { up: 4, spread: 5, size: 3 });
          sfxCoin(); shake(3);
          updateMagnetBadge();
        } else if (p.type === 'power') {
          // +50 units to powerExtra pool (capped at 210 = 250% total), refill rollBudget to new max.
          state.powerExtra = Math.min(210, (state.powerExtra || 0) + 50);
          state.rollBudgetMax = 40 + state.powerExtra;
          state.rollBudget = state.rollBudgetMax;
          state.score += 250;
          addPopup(p.x, p.y - 20, '⚡ +50% KRAFT!', '#fde047');
          addParticles(p.x, p.y, '#fde047', 30, { up: 6, spread: 8, size: 4 });
          addParticles(p.x, p.y, '#22c55e', 20, { up: 5, spread: 7, size: 3 });
          addParticles(p.x, p.y, '#ffffff', 12, { up: 4, spread: 5, size: 2 });
          sfxCoin(); shake(8);
          tone(900, 0.1, 'triangle', 0.18, 320);
          setTimeout(() => tone(1400, 0.12, 'triangle', 0.16, 400), 60);
        } else if (p.type === 'bomb') {
          state.bombCharges = Math.min(5, state.bombCharges + 1);
          state.score += 90;
          addPopup(p.x, p.y - 20, '💣 BOMB!', '#ef4444');
          addParticles(p.x, p.y, '#ef4444', 20, { up: 5, spread: 6, size: 3 });
          addParticles(p.x, p.y, '#1f2937', 14, { up: 4, spread: 5, size: 3 });
          sfxCoin(); shake(3);
          updateBombBadge();
        } else if (p.type === 'shield') {
          state.shieldCharges = Math.min(5, state.shieldCharges + 1);
          state.score += 120;
          addPopup(p.x, p.y - 20, '🛡️ SKÖLD!', '#22d3ee');
          addParticles(p.x, p.y, '#22d3ee', 22, { up: 5, spread: 6, size: 3 });
          addParticles(p.x, p.y, '#bae6fd', 14, { up: 4, spread: 5, size: 3 });
          sfxCoin(); shake(3);
          updateShieldBadge();
        } else if (p.type === 'medkit') {
          const heal = 25 + Math.random() * 25;
          const before = state.health || 0;
          state.health = Math.min(100, before + heal);
          const actual = Math.round(state.health - before);
          state.score += 100;
          addPopup(p.x, p.y - 20, `❤️ +${actual}% HÄLSA!`, '#22c55e');
          addParticles(p.x, p.y, '#22c55e', 24, { up: 5, spread: 7, size: 3 });
          addParticles(p.x, p.y, '#fecaca', 16, { up: 4, spread: 5, size: 3 });
          sfxCoin(); shake(3);
          tone(660, 0.1, 'sine', 0.16, 380);
          setTimeout(() => tone(990, 0.1, 'sine', 0.14, 420), 70);
        }
      }
    });

    // Combo timer
    if (state.combo.timer > 0) {
      state.combo.timer--;
      if (state.combo.timer === 0) { state.combo.count = 0; state.combo.mult = 1; }
    }

    // Track max distance + runStats distance
    if (t.x > state.maxX) state.maxX = t.x;
    runStats.distM = Math.max(runStats.distM, Math.round((state.maxX - state.startLaunchX) / 5));

    // Slow-mo: triggered when approaching finish fast (once per run-approach)
    const distToFinish = LEVEL.finishX - t.x;
    const totalSpd = Math.sqrt(t.vx * t.vx + t.vy * t.vy);
    if (state.slowMoT === 0 && state.slowMoCooldown === 0 && distToFinish > 0 && distToFinish < 600 && totalSpd > 12) {
      state.slowMoT = 40;
      state.slowMoCooldown = 300;
    }

    // End conditions
    const totalSpeed = Math.sqrt(t.vx * t.vx + t.vy * t.vy);
    // Don't end the run while the player can still tap-roll
    const rollAvailable = state.rollBudget > 5;
    // Slow-and-near-ground stop
    if (!rollAvailable && totalSpeed < 0.6 && state.time - state.groundContactT < 30 && Math.abs(t.vy) < 1) {
      if (state.phase === PHASE.FLY) finishRun(false);
    }
    // Robust stuck detection — any near-zero motion for 90+ frames, regardless of ground
    if (totalSpeed < 0.35 && Math.abs(t.vy) < 0.4) {
      t.stuckFrames = (t.stuckFrames || 0) + 1;
      const stuckLimit = rollAvailable ? 240 : 90;
      if (t.stuckFrames > stuckLimit && state.phase === PHASE.FLY) finishRun(false);
    } else {
      t.stuckFrames = 0;
    }
    if (t.y > 2000) {
      if (state.phase === PHASE.FLY) finishRun(false);
    }
  }

  // Spinners rotate
  // Only animate spinners near the camera — no-one sees rotation 40000 units away
  const _spinMinX = state.cam.x - 200;
  const _spinMaxX = state.cam.x + viewWidth() + 200;
  OBSTACLES.forEach(o => {
    if (o.type === 'spinner' && o.x >= _spinMinX && o.x <= _spinMaxX) o.rot += o.speed;
    else if (o.type === 'geyser' && o.x >= _spinMinX && o.x <= _spinMaxX) {
      o.cycleT = (o.cycleT + 1) % o.cycleDur;
    }
  });

  // Particles — PERF: in-place loop med swap-pop (sparar filter-allokering varje frame)
  {
    const ps = state.particles;
    for (let i = ps.length - 1; i >= 0; i--) {
      const pt = ps[i];
      pt.vy += pt.g;
      pt.x += pt.vx; pt.y += pt.vy;
      pt.life--;
      if (pt.life <= 0) {
        const last = ps.length - 1;
        if (i !== last) ps[i] = ps[last];
        ps.pop();
      }
    }
    if (ps.length > 500) ps.splice(0, ps.length - 500);
  }

  // Popups — PERF: in-place loop med swap-pop
  {
    const pops = state.popups;
    for (let i = pops.length - 1; i >= 0; i--) {
      const pp = pops[i];
      pp.y += pp.vy; pp.vy *= 0.94; pp.life--;
      if (pp.life <= 0) {
        const last = pops.length - 1;
        if (i !== last) pops[i] = pops[last];
        pops.pop();
      }
    }
    if (pops.length > 40) pops.splice(0, pops.length - 40);
  }

  // Shake decay
  if (shakeAmt > 0.2) shakeAmt *= 0.86; else shakeAmt = 0;

  // Camera zoom (smooth lerp toward desired)
  state.cam.zoom += (desiredZoom() - state.cam.zoom) * 0.06;
  const z = state.cam.zoom;

  // Camera follow — account for zoom so tire lands at consistent screen position
  // Look-ahead: smoothed bias so quick direction-flips don't make cam jitter.
  let targetX;
  if (state.tire) {
    const vx = state.tire.vx;
    const absVx = Math.abs(vx);
    let desiredBias = 0;
    if (absVx > 0.3) {
      const mag = Math.min(0.42, 0.20 + absVx * 0.035);
      desiredBias = Math.sign(vx) * mag;
    }
    // Smooth the bias itself — slower when sign flips (prevents camera whiplash)
    if (state.cam.leadBias === undefined) state.cam.leadBias = 0;
    const flipping = Math.sign(desiredBias) !== 0 && Math.sign(state.cam.leadBias) !== 0
                  && Math.sign(desiredBias) !== Math.sign(state.cam.leadBias);
    const biasLerp = flipping ? 0.015 : 0.04;
    state.cam.leadBias += (desiredBias - state.cam.leadBias) * biasLerp;
    const frac = 0.5 - state.cam.leadBias;
    targetX = state.tire.x - W * frac / z;
  } else {
    targetX = LEVEL.launchX - W * 0.25 / z;
    state.cam.leadBias = 0;
  }

  // Y focal: bias toward ground so we don't stare at empty sky when tire is high
  let targetY;
  if (state.tire) {
    const gy = terrainAt(state.tire.x);
    // Weighted average: tire gets 55%, ground 45% — always shows ground
    const focalY = state.tire.y * 0.55 + gy * 0.45;
    targetY = focalY - H * 0.5 / z;
  } else {
    targetY = terrainAt(LEVEL.launchX) - H * 0.55 / z;
  }
  state.cam.x += (targetX - state.cam.x) * 0.11;
  state.cam.y += (targetY - state.cam.y) * 0.08;
  state.cam.x = Math.max(-100, state.cam.x);

  updateHud();
}

function finishRun(won) {
  state.phase = PHASE.DONE;
  // Clear any lingering slow-mo/hitstop so the game doesn't appear frozen
  state.slowMoT = 0;
  state.slowMoCooldown = 0;
  state.hitstop = 0;
  updateFireButton();

  // Highscore — saved on every ball (goal OR fail), since each ball is its own attempt
  if (state.score > state.highScore && !state.recordTriggered) {
    state.highScore = state.score;
    state.newRecord = true;
    state.recordTriggered = true;
    try { localStorage.setItem(HS_KEY, String(state.score)); } catch {}
    const nr = document.getElementById('newRecordFX');
    const nrSub = document.getElementById('nrSub');
    if (nr) {
      if (nrSub) nrSub.textContent = state.score.toLocaleString('sv-SE');
      nr.classList.remove('hidden');
      shake(30);
      tone(700, 0.25, 'square', 0.3, 1400);
      setTimeout(() => tone(1000, 0.25, 'square', 0.3, 1600), 180);
      setTimeout(() => tone(1400, 0.4, 'square', 0.3, 1800), 380);
      setTimeout(() => { nr.classList.add('hidden'); }, 1500);
    }
  }

  // Daily PB — saved on EVERY tire death (not just game-over), so each try counts.
  // dailyPB.distM lagras som ABSOLUT världsposition (maxX/5) så biome-respawn inte korrumperar
  // jämförelsen. Run-relativ distans (för "denna flykt"-display) räknas separat via runDistM.
  const runDistM = Math.max(0, Math.round((state.maxX - state.startLaunchX) / 5));
  const worldDistM = Math.max(0, Math.round(state.maxX / 5));
  if (dailyPB.date !== todayStamp()) dailyPB = { date: todayStamp(), distM: 0, score: 0 };
  if (worldDistM > dailyPB.distM) {
    dailyPB.distM = worldDistM;
    dailyPB.score = state.score;
    saveDailyPB(dailyPB);
    flashToast(`🚩 NYTT DAGS-REKORD: ${worldDistM}m`, '#fde047');
  } else if (state.score > dailyPB.score) {
    dailyPB.score = state.score;
    saveDailyPB(dailyPB);
  }

  if (!won && state.tiresLeft > 0) {
    // Förbruka bought power-extras baserat på hur mycket över base 40 som användes.
    // Base 40 är gratis varje skott; allt över det kommer från powerExtra-lagret.
    const _used = Math.max(0, state.rollBudgetMax - state.rollBudget);
    const _extraUsed = Math.max(0, _used - 40);
    state.powerExtra = Math.max(0, (state.powerExtra || 0) - _extraUsed);
    // Biome-respawn: nästa skott avfyras från starten av det biom man dog i.
    if (state.tire) {
      const _bi = biomeAt(state.tire.x);
      LEVEL.launchX = biomeStartX(state.tire.x);
      state.cam.x = LEVEL.launchX - W * 0.25;
      state.cam.y = terrainAt(LEVEL.launchX) - H * 0.55;
      const biomeName = ['ÖKNEN', 'KANJONEN', 'NEON', 'ISEN'][_bi] || 'BANAN';
      flashToast(`🔁 RESPAWN: ${biomeName}`, '#22d3ee');
    }
    flashToast(`DÄCK KVAR: ${state.tiresLeft}`, '#fbbf24');

    // 30%-poängavdrag med synlig nedräkning. Spelaren behåller 70%.
    const _startScore = state.score;
    const _kept = Math.round(_startScore * 0.7);
    const _lost = _startScore - _kept;
    if (_lost > 0) {
      flashToast(`💸 -30% POÄNG (-${_lost.toLocaleString('sv-SE')})`, '#ef4444');
      const _steps = 18;
      const _stepDelay = 35;
      let _i = 0;
      const _tick = setInterval(() => {
        _i++;
        const _frac = _i / _steps;
        state.score = Math.round(_startScore - _lost * _frac);
        state.scorePulseT = 10;
        if (_i % 3 === 0) tone(220 - _i * 4, 0.05, 'square', 0.08, 180);
        updateHud();
        if (_i >= _steps) {
          clearInterval(_tick);
          state.score = _kept;
          updateHud();
          setTimeout(openMidShop, 250);
        }
      }, _stepDelay);
    } else {
      setTimeout(openMidShop, 700);
    }
    return;
  }

  // Game over (alla liv slut): tappa både poäng och pengar.
  // Highscore har redan fångats ovan på _ursprungliga_ state.score, så det räddas.
  // Vi nollställer score/coinsRun här innan coin-tjäning beräknas.
  if (!won && state.tiresLeft <= 0) {
    if (state.score > 0 || state.coinsRun > 0) {
      flashToast('💀 ALLT FÖRLORAT', '#ef4444');
    }
    state.score = 0;
    state.coinsRun = 0;
    state.scorePulseT = 14;
    updateHud();
  }

  const distM = runDistM;
  runStats.distM = distM;

  // Coins earned: 1 coin per 10 score + explicit coin count bonus
  const earnedCoins = Math.floor(state.score / 8) + Math.floor(state.coinsRun * 2);
  progression.coins += earnedCoins;

  // Check missions
  let missionRewards = 0;
  const completedMissions = [];
  if (progression.missions) {
    progression.missions.forEach(m => {
      if (!m.done && typeof m.test === 'function' && m.test(runStats)) {
        m.done = true;
        missionRewards += m.reward;
        completedMissions.push(m.desc);
      }
    });
    progression.coins += missionRewards;
  }
  saveProgression();

  setTimeout(() => {
    overlay.classList.remove('hidden');
    document.getElementById('ovTitle').textContent = state.newRecord ? '🏆 NYTT REKORD!' : (won ? '🎯 FRAMME I MÅL!' : '💀 SLUT');
    document.getElementById('ovScore').textContent = state.score;
    document.getElementById('ovStars').textContent = `${state.starsGot}/${LEVEL.totalStars}`;
    document.getElementById('ovDist').textContent = distM + ' m';
    let medal = '🥉 BRONS';
    if (state.score >= 10000 || (won && state.starsGot === LEVEL.totalStars)) medal = '🥇 GULD';
    else if (state.score >= 5000) medal = '🥈 SILVER';
    if (state.score < 500) medal = '💀 GAME OVER';
    document.getElementById('ovMedal').textContent = medal;
    const hsEl = document.getElementById('ovHighscore');
    if (hsEl) hsEl.textContent = state.highScore;
    const coinsEl = document.getElementById('ovCoins');
    if (coinsEl) coinsEl.textContent = `+${earnedCoins}${missionRewards ? ` (+${missionRewards} uppdrag)` : ''}`;
    const totalEl = document.getElementById('ovTotalCoins');
    if (totalEl) totalEl.textContent = progression.coins;
    // Mission list in overlay
    const missListEl = document.getElementById('ovMissions');
    if (missListEl && progression.missions) {
      missListEl.innerHTML = progression.missions.map(m =>
        `<div class="miss ${m.done ? 'done' : ''}">${m.done ? '✅' : '⬜'} ${m.desc} <span class="reward">+${m.reward}</span></div>`
      ).join('');
    }
    if (completedMissions.length) {
      flashToast(`🎖️ UPPDRAG KLART!`, '#a855f7');
    }
    renderShop();
  }, 250);
}

// ====== SHOP ======
function renderShop() {
  const el = document.getElementById('shopGrid');
  if (!el) return;
  el.innerHTML = '';
  Object.entries(UPGRADES).forEach(([key, u]) => {
    const lvl = progression.upgrades[key] || 0;
    const maxed = lvl >= u.max;
    const cost = maxed ? 0 : u.cost[lvl];
    const canBuy = !maxed && progression.coins >= cost;
    const dots = Array.from({length: u.max}, (_, i) =>
      `<span class="dot ${i < lvl ? 'on' : ''}"></span>`
    ).join('');
    const btn = maxed
      ? `<span class="max-badge">MAX</span>`
      : `<button class="up-btn${canBuy ? '' : ' locked'}" data-up="${key}" ${canBuy ? '' : 'disabled'}>🪙 ${cost}</button>`;
    el.insertAdjacentHTML('beforeend', `
      <div class="up-row">
        <div class="up-icon">${u.icon}</div>
        <div class="up-main">
          <div class="up-name">${u.name} <span class="up-lv">Lv ${lvl}/${u.max}</span></div>
          <div class="up-desc">${u.desc}</div>
          <div class="up-dots">${dots}</div>
        </div>
        <div class="up-buy">${btn}</div>
      </div>
    `);
  });
  const coinEl = document.getElementById('shopCoins');
  if (coinEl) coinEl.textContent = progression.coins;
  el.querySelectorAll('[data-up]').forEach(btn => {
    btn.onclick = () => {
      const k = btn.dataset.up;
      const u = UPGRADES[k];
      const lvl = progression.upgrades[k] || 0;
      if (lvl >= u.max) return;
      const cost = u.cost[lvl];
      if (progression.coins < cost) return;
      progression.coins -= cost;
      progression.upgrades[k] = lvl + 1;
      saveProgression();
      applyUpgrades();
      sfxStar();
      renderShop();
    };
  });
}
window.openShop = () => {
  document.getElementById('shopOverlay')?.classList.remove('hidden');
  renderShop();
  renderTestlab();
};
window.closeShop = () => document.getElementById('shopOverlay')?.classList.add('hidden');

// ====== TESTLAB — live-tunable parameters ======
const TESTLAB_SECTIONS = [
  { id: 'fysik', title: '⚡ Fysik', regenOnChange: false, params: [
    ['gravityDesert',   'Gravitation (öken)',   0.05, 1.2,   0.01],
    ['gravityCanyon',   'Gravitation (kanjon)', 0.05, 1.2,   0.01],
    ['gravityNeon',     'Gravitation (neon)',   0.05, 1.2,   0.01],
    ['airDrag',         'Luftmotstånd',         0.95, 1.0,   0.0005],
    ['bounceDamp',      'Studs-dämpning',       0.5,  1.0,   0.01],
    ['groundFric',      'Markfriktion',         0.9,  1.0,   0.001],
    ['windMax',         'Max vindkraft',        0.0,  0.8,   0.01],
    ['tireR',           'Hjul-radie',           10,   60,    1],
  ]},
  { id: 'speed', title: '🚀 Hastighet', regenOnChange: false, params: [
    ['speedCapNormal',  'Speedcap normal',      5,    60,    1],
    ['speedCapLaunch',  'Speedcap launch',      5,    80,    1],
    ['speedCapNitro',   'Speedcap nitro',       5,    100,   1],
    ['maxRpm',          'Max RPM',              40,   200,   5],
    ['rpmGain',         'RPM-ökning',           0.3,  3.0,   0.1],
    ['rpmDecay',        'RPM-läckage',          0.3,  2.0,   0.05],
    ['rpmMaxHoldFrames','MAX-hold (f)',         3,    60,    1],
    ['perfectMin',      'Perfect RPM min',      30,   100,   1],
    ['perfectMax',      'Perfect RPM max',      40,   100,   1],
    ['minAngle',        'Min vinkel',           0,    45,    1],
    ['maxAngle',        'Max vinkel',           45,   89,    1],
  ]},
  { id: 'skott', title: '🎯 Skott & Nitro', regenOnChange: false, params: [
    ['nitroPower',      'Nitro-kraft',          2,    40,    1],
    ['nitroBoostFrames','Nitro boost-tid (f)',  30,   300,   10],
    ['launchBoostFrames','Launch boost-tid (f)',20,   240,   10],
  ]},
  { id: 'tramp', title: '🟠 Studsmatta', regenOnChange: true, params: [
    ['trampMiniPower',  'Mini studs-kraft',     5,    40,    1],
    ['trampStdPower',   'Std studs-kraft',      5,    50,    1],
    ['trampMegaPower',  'Mega studs-kraft',     5,    60,    1],
    ['tapMultPerfect',  'Perfekt tap mult',     1.0,  4.0,   0.1],
    ['tapMultStomp',    'Stomp tap mult',       1.0,  3.0,   0.1],
    ['speedFactorMax',  'Max speed-bonus',      0.0,  2.0,   0.05],
  ]},
  { id: 'stomp', title: '💥 Stomp & Bounce', regenOnChange: false, params: [
    ['stompImpulseY',       'Stomp Y-impuls',       3,   20,    1],
    ['stompWindowFrames',   'Stomp-fönster (f)',    4,   30,    1],
    ['stompCooldown',       'Stomp-cooldown (f)',   5,   60,    1],
    ['powerBouncePerfect',  'Power PERFECT mult',   1.0, 4.0,   0.1],
    ['powerBounceGood',     'Power GOOD mult',      1.0, 3.0,   0.1],
  ]},
  { id: 'ladder', title: '🪜 Stege', regenOnChange: true, params: [
    ['ladderLen',       'Längd',                60,   300,   5],
    ['ladderTiltDx',    'Default-tilt',         10,   150,   5],
    ['ladderThick',     'Kollisions-tjocklek',  4,    30,    1],
    ['ladderBounceVy',  'Min launch-fart',      8,    50,    1],
    ['ladderMinGap',    'Min-avstånd skorsten', 80,   500,   10],
    ['ladderMaxReach',  'Max framåt-räckvidd',  500,  6000,  100],
  ]},
  { id: 'flipper', title: '🏓 Flipper', regenOnChange: false, params: [
    ['flipSwingFrames', 'Sväng-tid (f)',        8,    40,    1],
    ['flipStrikeR',     'Träff-radie',          10,   60,    1],
    ['flipLiftBase',    'Lift-bas',             10,   100,   2],
    ['flipLiftScale',   'Lift-skala',           0.2,  1.5,   0.05],
  ]},
  { id: 'powerups', title: '🧲 Power-ups', regenOnChange: false, params: [
    ['airJumpPower',        'Air jump-kraft',       5,    30,    1],
    ['magnetDuration',      'Magnet-tid (f)',       60,   900,   30],
    ['magnetRadius',        'Magnet-radie',         100,  600,   10],
    ['magnetPullStrength',  'Magnet drag-kraft',    1,    20,    0.5],
  ]},
  { id: 'freq-desert', title: '🏜️ Hinder (öken)', regenOnChange: true, params: [
    ['wallFreqDesert',    'Väggar',    0, 1, 0.05],
    ['spinnerFreqDesert', 'Spinners',  0, 1, 0.05],
    ['rampFreqDesert',    'Ramper',    0, 1, 0.05],
    ['barrelFreqDesert',  'Tunnor',    0, 1, 0.05],
    ['houseFreqDesert',   'Hus',       0, 1, 0.05],
    ['tntFreqDesert',     'TNT',       0, 1, 0.05],
    ['cannonFreqDesert',  'Kanoner',   0, 1, 0.05],
  ]},
  { id: 'freq-canyon', title: '🏔️ Hinder (kanjon)', regenOnChange: true, params: [
    ['wallFreqCanyon',    'Väggar',    0, 1, 0.05],
    ['spinnerFreqCanyon', 'Spinners',  0, 1, 0.05],
    ['rampFreqCanyon',    'Ramper',    0, 1, 0.05],
    ['barrelFreqCanyon',  'Tunnor',    0, 1, 0.05],
    ['houseFreqCanyon',   'Hus',       0, 1, 0.05],
    ['tntFreqCanyon',     'TNT',       0, 1, 0.05],
    ['cannonFreqCanyon',  'Kanoner',   0, 1, 0.05],
  ]},
  { id: 'freq-neon', title: '🌃 Hinder (neon)', regenOnChange: true, params: [
    ['wallFreqNeon',    'Väggar',    0, 1, 0.05],
    ['spinnerFreqNeon', 'Spinners',  0, 1, 0.05],
    ['rampFreqNeon',    'Ramper',    0, 1, 0.05],
    ['barrelFreqNeon',  'Tunnor',    0, 1, 0.05],
    ['houseFreqNeon',   'Hus',       0, 1, 0.05],
    ['tntFreqNeon',     'TNT',       0, 1, 0.05],
    ['cannonFreqNeon',  'Kanoner',   0, 1, 0.05],
  ]},
  { id: 'pickups', title: '💰 Pickups', regenOnChange: true, params: [
    ['coinDensityDesert',  'Myntdensitet (öken)',    0, 6,  0.25],
    ['coinDensityCanyon',  'Myntdensitet (kanjon)',  0, 6,  0.25],
    ['coinDensityNeon',    'Myntdensitet (neon)',    0, 6,  0.25],
    ['starFreqDesert',     'Stjärnor (öken)',        0, 2,  0.1],
    ['starFreqCanyon',     'Stjärnor (kanjon)',      0, 2,  0.1],
    ['starFreqNeon',       'Stjärnor (neon)',        0, 2,  0.1],
    ['balloonFreqDesert',  'Ballonger (öken)',       0, 2,  0.1],
    ['balloonFreqCanyon',  'Ballonger (kanjon)',     0, 2,  0.1],
    ['balloonFreqNeon',    'Ballonger (neon)',       0, 2,  0.1],
    ['nitroFreqDesert',    'Nitro (öken)',           0, 2,  0.1],
    ['nitroFreqCanyon',    'Nitro (kanjon)',         0, 2,  0.1],
    ['nitroFreqNeon',      'Nitro (neon)',           0, 2,  0.1],
  ]},
  { id: 'terrain', title: '🗺️ Terräng', regenOnChange: true, params: [
    ['terrainAmpDesert',   'Amplitud (öken)',      20, 400, 5],
    ['terrainAmpCanyon',   'Amplitud (kanjon)',    20, 400, 5],
    ['terrainAmpNeon',     'Amplitud (neon)',      20, 400, 5],
    ['terrainStepDesert',  'Steg-längd (öken)',    80, 500, 10],
    ['terrainStepCanyon',  'Steg-längd (kanjon)',  80, 500, 10],
    ['terrainStepNeon',    'Steg-längd (neon)',    80, 500, 10],
  ]},
  { id: 'finish', title: '🏆 Finish-poäng', regenOnChange: false, params: [
    ['multChimneyTop', 'CHIMNEY TOP', 1.0, 5.0, 0.1],
    ['multBullseye',   'BULLSEYE',    1.0, 5.0, 0.1],
    ['multInring',     'INRING',      1.0, 5.0, 0.1],
    ['multMellan',     'MELLAN',      1.0, 5.0, 0.1],
    ['multYttre',      'YTTRE',       1.0, 5.0, 0.1],
    ['multFramme',     'FRAMME',      1.0, 5.0, 0.1],
  ]},
];

let _testlabActive = localStorage.getItem('chimney_testlab_active') || TESTLAB_SECTIONS[0].id;

function renderTestlab() {
  const el = document.getElementById('testlabGrid');
  if (!el) return;
  if (!TESTLAB_SECTIONS.find(s => s.id === _testlabActive)) _testlabActive = TESTLAB_SECTIONS[0].id;
  const active = TESTLAB_SECTIONS.find(s => s.id === _testlabActive);

  const tabsHtml = TESTLAB_SECTIONS.map(sec =>
    `<button class="tl-tab${sec.id === _testlabActive ? ' active' : ''}" data-tltab="${sec.id}">${sec.title}</button>`
  ).join('');

  const rowsHtml = active.params.map(([key, lbl, min, max, step]) => {
    const cur = TUNING[key];
    const def = DEFAULT_TUNING[key];
    const displayVal = Number.isInteger(step) ? cur : (+cur).toFixed(step < 0.01 ? 4 : step < 0.1 ? 3 : 2);
    return `
      <div class="tl-row" data-key="${key}">
        <div class="tl-label">${lbl}${cur !== def ? ' <span style="color:#f59e0b">•</span>' : ''}</div>
        <div class="tl-value">${displayVal}</div>
        <div class="tl-slider-row">
          <input type="range" min="${min}" max="${max}" step="${step}" value="${cur}" data-tl="${key}">
          <input type="number" min="${min}" max="${max}" step="${step}" value="${cur}" data-tln="${key}">
          <button class="tl-reset" data-tlr="${key}" title="Återställ">↺</button>
        </div>
      </div>`;
  }).join('');

  el.innerHTML = `
    <div class="tl-tabs-wrap">
      <div class="tl-tabs">${tabsHtml}</div>
    </div>
    <div class="tl-panel">
      <div class="tl-panel-title">${active.title}</div>
      ${active.regenOnChange ? '<div class="tl-section-note">⚠️ Ny bana vid nästa restart</div>' : ''}
      <div class="tl-panel-body">${rowsHtml}</div>
    </div>
  `;

  // Scroll active tab into view — only the tab strip, never ancestors
  const tabsEl = el.querySelector('.tl-tabs');
  const activeTabEl = el.querySelector('.tl-tab.active');
  if (tabsEl && activeTabEl) {
    const target = activeTabEl.offsetLeft - (tabsEl.clientWidth - activeTabEl.offsetWidth) / 2;
    tabsEl.scrollLeft = Math.max(0, target);
  }

  // Tab click handler
  el.querySelectorAll('[data-tltab]').forEach(t => {
    t.onclick = () => {
      _testlabActive = t.dataset.tltab;
      localStorage.setItem('chimney_testlab_active', _testlabActive);
      renderTestlab();
    };
  });

  // Slider + number input handlers
  const updateValue = (key, val) => {
    const def = DEFAULT_TUNING[key];
    if (typeof def !== 'number') return;
    TUNING[key] = val;
    saveTuning();
    applyTuning();
    const row = el.querySelector(`[data-key="${key}"]`);
    if (row) {
      const stepAttr = row.querySelector('input[type="range"]').step;
      const step = parseFloat(stepAttr);
      const displayVal = Number.isInteger(step) ? val : val.toFixed(step < 0.01 ? 4 : step < 0.1 ? 3 : 2);
      row.querySelector('.tl-value').textContent = displayVal;
      const lbl = row.querySelector('.tl-label');
      const text = lbl.textContent.replace(/\s*•\s*$/, '').trim();
      lbl.innerHTML = text + (val !== def ? ' <span style="color:#f59e0b">•</span>' : '');
      row.querySelector('input[type="range"]').value = val;
      row.querySelector('input[type="number"]').value = val;
    }
  };

  el.querySelectorAll('input[data-tl]').forEach(inp => {
    inp.oninput = () => updateValue(inp.dataset.tl, parseFloat(inp.value));
  });
  el.querySelectorAll('input[data-tln]').forEach(inp => {
    inp.onchange = () => {
      const v = parseFloat(inp.value);
      if (!isNaN(v)) updateValue(inp.dataset.tln, v);
    };
  });
  el.querySelectorAll('[data-tlr]').forEach(btn => {
    btn.onclick = () => {
      const key = btn.dataset.tlr;
      updateValue(key, DEFAULT_TUNING[key]);
    };
  });
}

// Tab switcher
document.addEventListener('click', e => {
  const tab = e.target.closest('.shop-tab');
  if (tab) {
    const id = tab.dataset.tab;
    document.querySelectorAll('.shop-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === id));
    const up = document.getElementById('tabUpgrade');
    const tl = document.getElementById('tabTestlab');
    if (up) up.classList.toggle('hidden', id !== 'upgrade');
    if (tl) tl.classList.toggle('hidden', id !== 'testlab');
    if (id === 'testlab') renderTestlab();
  }
});

// Testlab reset + export buttons
document.addEventListener('click', e => {
  if (e.target && e.target.id === 'testlabReset') {
    if (confirm('Återställ ALLA testlab-värden till default?')) {
      resetTuning();
      renderTestlab();
      flashToast('↺ Återställt', '#f59e0b');
    }
  }
  if (e.target && e.target.id === 'testlabExport') {
    // Only export non-default values for cleanliness
    const diff = {};
    Object.keys(TUNING).forEach(k => {
      if (TUNING[k] !== DEFAULT_TUNING[k]) diff[k] = TUNING[k];
    });
    const json = Object.keys(diff).length === 0
      ? '{ /* allt är default */ }'
      : JSON.stringify(diff, null, 2);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(json).then(() => {
        flashToast('📋 JSON kopierad!', '#10b981');
      }, () => {
        prompt('Kopiera JSON:', json);
      });
    } else {
      prompt('Kopiera JSON:', json);
    }
  }
});

// Apply tuning on startup (so any already-saved values take effect)
applyTuning();

// HUD-labels — caches DOM-referenser för meter-rubrikerna så vi kan swappa dem
// mellan AIM (RPM/VINKEL) och FLY (HÄLSA/KRAFT).
const _aimHudLabels = aimHud ? aimHud.querySelectorAll('.label') : [];
const _aimHudValBoxes = aimHud ? aimHud.querySelectorAll('.val') : [];
const _aimHudPerfectZone = aimHud ? aimHud.querySelector('.zone.perfect') : null;

function updateHud() {
  // Mätarna byter syfte mellan AIM (RPM + VINKEL) och FLY (HÄLSA + KRAFT)
  if (state.phase === PHASE.FLY) {
    // Hälsa
    const hp = Math.max(0, state.health || 0);
    rpmFill.style.width = hp + '%';
    rpmFill.style.background = hp > 60 ? '#22c55e' : hp > 30 ? '#fbbf24' : '#ef4444';
    if (_aimHudLabels[0]) _aimHudLabels[0].textContent = 'HÄLSA';
    rpmVal.textContent = Math.round(hp);
    rpmVal.style.color = '';
    if (_aimHudPerfectZone) _aimHudPerfectZone.style.display = 'none';
    // Kraft (drag-power för relaunch)
    const pwrMax = state.rollBudgetMax || 40;
    const pwrPct = Math.max(0, Math.min(100, ((state.rollBudget || 0) / pwrMax) * 100));
    angFill.style.width = pwrPct + '%';
    angFill.style.background = '#60a5fa';
    if (_aimHudLabels[1]) _aimHudLabels[1].textContent = 'KRAFT';
    if (_aimHudValBoxes[1]) _aimHudValBoxes[1].innerHTML = `<span id="angVal">${Math.round(pwrPct)}</span>%`;
  } else {
    rpmFill.style.width = state.rpm + '%';
    rpmFill.style.background = '';
    if (_aimHudLabels[0]) _aimHudLabels[0].textContent = 'RPM';
    rpmVal.textContent = Math.round(state.rpm);
    if (_aimHudPerfectZone) _aimHudPerfectZone.style.display = '';
    angFill.style.width = ((state.angle - MIN_ANGLE) / (MAX_ANGLE - MIN_ANGLE) * 100) + '%';
    angFill.style.background = '';
    if (_aimHudLabels[1]) _aimHudLabels[1].textContent = 'VINKEL';
    if (_aimHudValBoxes[1]) _aimHudValBoxes[1].innerHTML = `<span id="angVal">${Math.round(state.angle)}</span>°`;
  }
  scoreEl.textContent = state.score;
  if (distLiveEl) {
    const liveDist = state.phase === PHASE.FLY && state.tire
      ? Math.max(runStats.distM || 0, Math.round((state.maxX - state.startLaunchX) / 5))
      : (runStats.distM || 0);
    distLiveEl.textContent = liveDist;
  }
  starsEl.textContent = state.starsGot;
  tiresEl.textContent = state.tiresLeft;
  const hsEl = document.getElementById('hs');
  if (hsEl) hsEl.textContent = state.highScore;
  // Live highlight on RPM val when in PERFECT zone
  if (state.rpm >= PERFECT_MIN && state.rpm <= PERFECT_MAX) {
    rpmVal.style.color = '#10b981';
  } else {
    rpmVal.style.color = '';
  }
  // Big score HUD (visible during flight/roll)
  const bs = document.getElementById('bigScore');
  if (bs) {
    const showBig = state.phase === PHASE.FLY || state.phase === PHASE.DONE;
    bs.classList.toggle('visible', showBig);
    const bsv = document.getElementById('bigScoreVal');
    if (bsv) {
      bsv.textContent = state.score.toLocaleString('sv-SE');
      bsv.classList.toggle('pulse', state.scorePulseT > 0);
    }
    const bm = document.getElementById('bigMult');
    if (bm) {
      const m = state.flightMult || 1;
      if (m > 1.01) {
        bm.classList.remove('hidden');
        bm.textContent = 'x' + m.toFixed(1);
        bm.classList.toggle('tier3', m >= 5);
        bm.classList.toggle('tier2', m >= 3 && m < 5);
        bm.classList.toggle('pop', state.scorePulseT > 8);
      } else {
        bm.classList.add('hidden');
        bm.classList.remove('tier2', 'tier3', 'pop');
      }
    }
    // Daily PB chase indicator — använder ABSOLUTA världsmeter så biome-respawn inte ger fel jämförelse.
    const pbChase = document.getElementById('bigPbChase');
    if (pbChase) {
      if (dailyPB && dailyPB.date === todayStamp() && dailyPB.distM > 0 && showBig) {
        const curWorldM = Math.max(0, Math.round((state.tire ? state.tire.x : (LEVEL && LEVEL.launchX) || 0) / 5));
        const remaining = dailyPB.distM - curWorldM;
        if (remaining > 0) {
          pbChase.classList.remove('hidden', 'beat');
          pbChase.innerHTML = `🚩 <b>${remaining}m</b> till dagsrekord`;
          pbChase.classList.toggle('near', remaining <= 50);
        } else {
          pbChase.classList.remove('hidden');
          pbChase.classList.add('beat');
          pbChase.classList.remove('near');
          pbChase.innerHTML = `🔥 <b>+${-remaining}m</b> över dagsrekord!`;
        }
      } else {
        pbChase.classList.add('hidden');
      }
    }
  }
  // Roll-meter (drag-to-relaunch power budget, ONLY visible once drag passes the launch threshold — same as the arrow)
  const rm = document.getElementById('rollMeter');
  if (rm) {
    const d = state.relaunchDrag;
    const dragLen = d.active ? Math.hypot(d.curX - d.startX, d.curY - d.startY) : 0;
    const show = state.phase === PHASE.FLY && state.rollBudget > 0 && d.active && dragLen >= RELAUNCH_DRAG_MIN;
    rm.classList.toggle('hidden', !show);
    rm.classList.toggle('flash', state.rollTapFlash > 0);
    if (show) {
      // rollBudget is already measured in percent units (50 = 50%, 200 = 200%). The fill bar
      // is sized against the absolute 200 ceiling so a fully-upgraded player sees a full bar.
      const pct = state.rollBudget;
      const fill = document.getElementById('rollFill');
      if (fill) fill.style.width = Math.min(100, pct / 2) + '%';
      const pctEl = document.getElementById('rollPct');
      if (pctEl) pctEl.textContent = Math.round(pct);
    }
  }
}

// ====== RENDER ======
function worldToScreen(wx, wy) {
  return [wx - state.cam.x, wy - state.cam.y];
}

// Visible world width/height in pre-scale canvas units (world-space shapes live here)
function viewWidth()  { return W / (state.cam.zoom || 1); }
function viewHeight() { return H / (state.cam.zoom || 1); }

function currentBiomeSky() {
  // Smoothly blend sky colors across biome boundaries based on camera center
  // (account for zoom: visible world-width = W / zoom)
  const z = state.cam.zoom || 1;
  const camCenterX = state.cam.x + W / (2 * z);
  const b = biomeAt(camCenterX);
  const prev = BIOMES[Math.max(0, b - 1)].sky;
  const curr = BIOMES[b].sky;
  const within = camCenterX - b * BIOME_LEN;
  const t = Math.min(1, Math.max(0, within / 500));
  const mix = (a, c) => {
    const ah = a.match(/\w\w/g).map(x => parseInt(x, 16));
    const ch = c.match(/\w\w/g).map(x => parseInt(x, 16));
    const out = ah.map((v, i) => Math.round(v + (ch[i] - v) * t));
    return `#${out.map(v => v.toString(16).padStart(2, '0')).join('')}`;
  };
  return [mix(prev[0], curr[0]), mix(prev[1], curr[1]), mix(prev[2], curr[2])];
}

function drawSky() {
  const [c0, c1, c2] = currentBiomeSky();
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0,    c0);
  g.addColorStop(0.45, c1);
  g.addColorStop(0.75, c2);
  g.addColorStop(1,    '#fde68a');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  // Subtle stars in purple zone
  ctx.fillStyle = 'rgba(254, 243, 199, 0.75)';
  const starSeed = [
    [0.08, 0.08], [0.22, 0.05], [0.31, 0.12], [0.45, 0.07], [0.56, 0.15],
    [0.68, 0.06], [0.78, 0.11], [0.89, 0.04], [0.12, 0.18], [0.38, 0.19],
    [0.62, 0.22], [0.85, 0.18]
  ];
  starSeed.forEach(([sx, sy]) => {
    const x = sx * W, y = sy * H;
    const twinkle = 0.5 + 0.5 * Math.sin(state.time * 0.05 + x);
    ctx.globalAlpha = twinkle;
    ctx.fillRect(x, y, 1.5, 1.5);
  });
  ctx.globalAlpha = 1;

  // Sun (low in orange zone)
  const sunX = W * 0.68, sunY = H * 0.6;
  const rg = ctx.createRadialGradient(sunX, sunY, 10, sunX, sunY, 220);
  rg.addColorStop(0, 'rgba(255, 251, 195, 0.95)');
  rg.addColorStop(0.3, 'rgba(253, 224, 71, 0.6)');
  rg.addColorStop(0.6, 'rgba(251, 146, 60, 0.3)');
  rg.addColorStop(1, 'rgba(236, 72, 153, 0)');
  ctx.fillStyle = rg;
  ctx.fillRect(sunX - 220, sunY - 220, 440, 440);
  ctx.fillStyle = '#fef9c3';
  ctx.beginPath(); ctx.arc(sunX, sunY, 52, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#fde68a';
  ctx.beginPath(); ctx.arc(sunX, sunY, 44, 0, Math.PI * 2); ctx.fill();
}

function drawClouds() {
  const px = state.cam.x * 0.15;
  // Magenta-tinted clouds
  ctx.fillStyle = 'rgba(251, 113, 133, 0.4)';
  const clouds = [
    [120, 140, 40], [420, 180, 28], [780, 130, 50], [1200, 160, 35],
    [1600, 120, 42], [2000, 170, 30], [2400, 145, 45], [2800, 155, 32],
    [3200, 130, 40], [3600, 160, 36], [4000, 125, 48],
  ];
  clouds.forEach(([cx, cy, r]) => {
    const x = (cx - px) % (W + 400);
    const sx = x < 0 ? x + W + 400 : x;
    ctx.beginPath();
    ctx.arc(sx, cy, r, 0, Math.PI * 2);
    ctx.arc(sx + r * 0.7, cy + 3, r * 0.8, 0, Math.PI * 2);
    ctx.arc(sx - r * 0.6, cy + 5, r * 0.7, 0, Math.PI * 2);
    ctx.arc(sx + r * 1.3, cy - 2, r * 0.6, 0, Math.PI * 2);
    ctx.fill();
  });
  // Highlight edge (golden)
  ctx.fillStyle = 'rgba(253, 224, 71, 0.5)';
  clouds.forEach(([cx, cy, r]) => {
    const x = (cx - px) % (W + 400);
    const sx = x < 0 ? x + W + 400 : x;
    ctx.beginPath();
    ctx.arc(sx, cy - r * 0.3, r * 0.5, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawMountains() {
  // Far layer — distant pink/magenta mesas
  const px1 = state.cam.x * 0.3;
  ctx.fillStyle = '#9d174d';
  ctx.beginPath();
  ctx.moveTo(0, H * 0.75);
  for (let x = 0; x <= W; x += 30) {
    const wx = x + px1;
    const y = H * 0.75 - Math.sin(wx * 0.004) * 40 - Math.sin(wx * 0.011) * 18 - 40;
    ctx.lineTo(x, y);
  }
  ctx.lineTo(W, H); ctx.lineTo(0, H);
  ctx.fill();

  // Middle layer — rust orange mesas
  const px2 = state.cam.x * 0.5;
  ctx.fillStyle = '#c2410c';
  ctx.beginPath();
  ctx.moveTo(0, H * 0.82);
  for (let x = 0; x <= W; x += 24) {
    const wx = x + px2;
    const y = H * 0.82 - Math.abs(Math.sin(wx * 0.003)) * 55 - Math.sin(wx * 0.013) * 10 - 20;
    ctx.lineTo(x, y);
  }
  ctx.lineTo(W, H); ctx.lineTo(0, H);
  ctx.fill();

  // Near layer — golden dunes
  const px3 = state.cam.x * 0.7;
  ctx.fillStyle = '#b45309';
  ctx.beginPath();
  ctx.moveTo(0, H * 0.88);
  for (let x = 0; x <= W; x += 20) {
    const wx = x + px3;
    const y = H * 0.88 - Math.sin(wx * 0.006) * 22 - Math.sin(wx * 0.018) * 10 - 15;
    ctx.lineTo(x, y);
  }
  ctx.lineTo(W, H); ctx.lineTo(0, H);
  ctx.fill();
}

function drawCacti() {
  const cacti = [
    { wx: 480, h: 50 }, { wx: 720, h: 42 }, { wx: 1300, h: 55 },
    { wx: 1580, h: 38 }, { wx: 2150, h: 48 }, { wx: 2650, h: 52 },
    { wx: 2950, h: 45 }, { wx: 3450, h: 50 }, { wx: 3950, h: 42 },
    { wx: 4150, h: 56 },
  ];
  const vw = viewWidth();
  cacti.forEach((c, i) => {
    const gy = terrainAt(c.wx);
    const [x, y] = worldToScreen(c.wx, gy);
    if (x < -60 || x > vw + 60) return;
    // Silhouette shadow behind
    ctx.fillStyle = '#14532d';
    // Stem
    ctx.fillRect(x - 7, y - c.h, 14, c.h);
    // Round top
    ctx.beginPath(); ctx.arc(x, y - c.h, 7, 0, Math.PI * 2); ctx.fill();
    // Arms (vary left/right based on index)
    const leftLong = (i % 2 === 0);
    if (leftLong) {
      ctx.fillRect(x - 20, y - c.h * 0.55, 6, c.h * 0.40);
      ctx.fillRect(x - 20, y - c.h * 0.55, 13, 6);
      ctx.beginPath(); ctx.arc(x - 14, y - c.h * 0.55, 3, 0, Math.PI * 2); ctx.fill();
    } else {
      ctx.fillRect(x + 14, y - c.h * 0.45, 6, c.h * 0.32);
      ctx.fillRect(x + 7, y - c.h * 0.45, 13, 6);
      ctx.beginPath(); ctx.arc(x + 20, y - c.h * 0.45, 3, 0, Math.PI * 2); ctx.fill();
    }
    // Highlight stripe
    ctx.fillStyle = '#166534';
    ctx.fillRect(x - 3, y - c.h + 2, 3, c.h - 3);
    // Tiny spines
    ctx.fillStyle = '#14532d';
    for (let sy = 4; sy < c.h - 4; sy += 10) {
      ctx.fillRect(x - 6, y - c.h + sy, 1, 2);
      ctx.fillRect(x + 5, y - c.h + sy, 1, 2);
    }
  });
}

function drawTerrain() {
  const z = state.cam.zoom;
  const viewW = W / z;
  const viewH = H / z;
  const startX = state.cam.x - 60;
  const endX = state.cam.x + viewW + 60;
  const camCenterX = state.cam.x + viewW / 2;
  const biome = BIOMES[biomeAt(camCenterX)];

  // PERF: Single sample-pass at step=6 — alla efterföljande fillar/stroken delar samma punkter.
  // Sparar ~1500 terrainAt-calls per frame jämfört med 4 separata pass.
  const step = 6;
  const camX = state.cam.x;
  const camY = state.cam.y;
  const xs = [];
  const ys = [];
  for (let x = startX; x <= endX; x += step) {
    xs.push(x - camX);
    ys.push(terrainAt(x) - camY);
  }
  const lastIdx = xs.length - 1;

  // Far silhouette behind (deeper, darker) — offset slightly for parallax feel
  ctx.fillStyle = hexToRgba(biome.groundBot, 0.55);
  ctx.beginPath();
  ctx.moveTo(xs[0], viewH + 50);
  for (let i = 0; i <= lastIdx; i++) {
    const xWorld = startX + i * step;
    ctx.lineTo(xs[i], ys[i] + 30 + Math.sin(xWorld * 0.012) * 4);
  }
  ctx.lineTo(xs[lastIdx], viewH + 50);
  ctx.closePath();
  ctx.fill();

  // PERF: Cache:a gradienten — skapas annars varje frame (~0.5ms).
  // Key:n inkluderar viewport-size + biome-färger + camY (för korrekt y-offset).
  const _gradKey = `${Math.round(viewH)}|${biome.groundTop}|${biome.groundBot}|${Math.round(camY/8)}`;
  if (drawTerrain._gk !== _gradKey) {
    const g = ctx.createLinearGradient(0, -camY, 0, viewH - camY);
    g.addColorStop(0, biome.groundTop);
    g.addColorStop(0.35, biome.groundTop);
    g.addColorStop(1, biome.groundBot);
    drawTerrain._grad = g;
    drawTerrain._gk = _gradKey;
  }
  ctx.fillStyle = drawTerrain._grad;
  ctx.beginPath();
  ctx.moveTo(xs[0], viewH + 50);
  for (let i = 0; i <= lastIdx; i++) ctx.lineTo(xs[i], ys[i]);
  ctx.lineTo(xs[lastIdx], viewH + 50);
  ctx.closePath();
  ctx.fill();

  // Band underneath (subtle stripe for depth)
  ctx.fillStyle = hexToRgba(biome.groundBot, 0.35);
  ctx.beginPath();
  ctx.moveTo(xs[0], viewH + 50);
  for (let i = 0; i <= lastIdx; i++) ctx.lineTo(xs[i], ys[i] + 40);
  ctx.lineTo(xs[lastIdx], viewH + 50);
  ctx.closePath();
  ctx.fill();

  // Top edge highlight (biome-colored) — återanvänder samma punkter
  ctx.strokeStyle = biome.groundLine;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(xs[0], ys[0]);
  for (let i = 1; i <= lastIdx; i++) ctx.lineTo(xs[i], ys[i]);
  ctx.stroke();

  // Sub-line (warmer)
  ctx.strokeStyle = hexToRgba(biome.groundBot, 0.55);
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(xs[0], ys[0] + 5);
  for (let i = 1; i <= lastIdx; i++) ctx.lineTo(xs[i], ys[i] + 5);
  ctx.stroke();

  // Pebbles & tufts
  for (let wx = Math.floor(startX / 55) * 55; wx < endX; wx += 55) {
    const y = terrainAt(wx) - state.cam.y;
    const seed = Math.abs(Math.sin(wx * 0.137));
    if (seed > 0.75) {
      ctx.fillStyle = biome.groundBot;
      ctx.beginPath();
      ctx.arc(wx - state.cam.x, y + 3, 3, 0, Math.PI * 2);
      ctx.fill();
    } else if (seed > 0.45) {
      ctx.fillStyle = hexToRgba(biome.groundLine, 0.9);
      ctx.beginPath();
      ctx.arc(wx - state.cam.x, y + 2, 2, 0, Math.PI * 2);
      ctx.fill();
    } else if (seed > 0.25) {
      ctx.strokeStyle = hexToRgba(biome.groundLine, 0.9);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(wx - state.cam.x - 2, y); ctx.lineTo(wx - state.cam.x - 1, y - 4);
      ctx.moveTo(wx - state.cam.x, y); ctx.lineTo(wx - state.cam.x, y - 5);
      ctx.moveTo(wx - state.cam.x + 2, y); ctx.lineTo(wx - state.cam.x + 1, y - 4);
      ctx.stroke();
    }
  }
}

function drawBackWall() {
  // Small desert house that blocks the tire from rolling off the left edge
  const wallX = LEVEL.launchX - 120;
  const groundY = terrainAt(wallX);
  const [sx, sy] = worldToScreen(wallX, groundY);
  if (sx < -200 || sx > viewWidth() + 200) return;

  const houseW = 86;
  const houseH = 78;
  const hx = sx - houseW;  // house sits to the LEFT of the wall line
  const hy = sy - houseH;

  // Sand/dust mound at the base
  ctx.fillStyle = '#a16207';
  ctx.beginPath();
  ctx.ellipse(hx + houseW - 6, sy + 4, houseW * 0.75, 8, 0, 0, Math.PI * 2);
  ctx.fill();

  // Wall body (adobe/tan)
  ctx.fillStyle = '#e7d3a1';
  ctx.fillRect(hx, hy, houseW, houseH);
  ctx.strokeStyle = '#78350f'; ctx.lineWidth = 2;
  ctx.strokeRect(hx, hy, houseW, houseH);

  // Brick/adobe shading lines
  ctx.strokeStyle = 'rgba(120, 53, 15, 0.35)';
  ctx.lineWidth = 1;
  for (let r = 1; r < 4; r++) {
    ctx.beginPath();
    ctx.moveTo(hx + 2, hy + r * 18);
    ctx.lineTo(hx + houseW - 2, hy + r * 18);
    ctx.stroke();
  }

  // Pitched roof
  ctx.fillStyle = '#b45309';
  ctx.beginPath();
  ctx.moveTo(hx - 6, hy);
  ctx.lineTo(hx + houseW / 2, hy - 28);
  ctx.lineTo(hx + houseW + 6, hy);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#78350f'; ctx.lineWidth = 2;
  ctx.stroke();

  // Roof shadow
  ctx.fillStyle = 'rgba(0,0,0,0.18)';
  ctx.fillRect(hx, hy, houseW, 4);

  // Door (wooden, near the right edge so it faces the launcher)
  const doorW = 18, doorH = 34;
  const dx = hx + houseW - doorW - 10;
  const dy = hy + houseH - doorH;
  ctx.fillStyle = '#7c2d12';
  ctx.fillRect(dx, dy, doorW, doorH);
  ctx.strokeStyle = '#451a03';
  ctx.strokeRect(dx, dy, doorW, doorH);
  ctx.fillStyle = '#fbbf24';
  ctx.beginPath(); ctx.arc(dx + doorW - 4, dy + doorH / 2, 1.5, 0, Math.PI * 2); ctx.fill();

  // Window (shuttered)
  const winW = 22, winH = 20;
  const wx = hx + 12;
  const wy = hy + 18;
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(wx, wy, winW, winH);
  ctx.strokeStyle = '#78350f'; ctx.lineWidth = 2;
  ctx.strokeRect(wx, wy, winW, winH);
  // Window cross
  ctx.strokeStyle = '#e7d3a1';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(wx + winW / 2, wy); ctx.lineTo(wx + winW / 2, wy + winH);
  ctx.moveTo(wx, wy + winH / 2); ctx.lineTo(wx + winW, wy + winH / 2);
  ctx.stroke();

  // Chimney on the roof
  ctx.fillStyle = '#78350f';
  ctx.fillRect(hx + houseW - 28, hy - 20, 10, 14);
  ctx.strokeStyle = '#451a03';
  ctx.strokeRect(hx + houseW - 28, hy - 20, 10, 14);

  // "STOP"-style bump line showing the collision edge
  ctx.strokeStyle = 'rgba(239, 68, 68, 0.35)';
  ctx.setLineDash([4, 4]);
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(sx, hy);
  ctx.lineTo(sx, sy);
  ctx.stroke();
  ctx.setLineDash([]);
}

function drawLauncher() {
  // Only if visible
  const lx = LEVEL.launchX;
  const ly = terrainAt(lx);
  const [sx, sy] = worldToScreen(lx, ly);
  if (sx < -200 || sx > viewWidth() + 200) return;

  // Wood platform / trolley under the machine
  ctx.fillStyle = '#78350f';
  ctx.fillRect(sx - 40, sy - 2, 140, 10);
  ctx.strokeStyle = '#451a03'; ctx.lineWidth = 2;
  ctx.strokeRect(sx - 40, sy - 2, 140, 10);
  // Plank seams
  ctx.strokeStyle = '#451a03';
  for (let i = 1; i < 4; i++) {
    const px = sx - 40 + i * 35;
    ctx.beginPath(); ctx.moveTo(px, sy - 2); ctx.lineTo(px, sy + 8); ctx.stroke();
  }
  // Wheels on trolley
  ctx.fillStyle = '#1f2937';
  [sx - 25, sx + 85].forEach(wxx => {
    ctx.beginPath(); ctx.arc(wxx, sy + 12, 8, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#0f172a'; ctx.stroke();
    ctx.fillStyle = '#374151';
    ctx.beginPath(); ctx.arc(wxx, sy + 12, 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#1f2937';
  });

  // Engine (NAVY BLUE machine) with yellow trim
  const ex = sx - 10, ey = sy - 58;
  ctx.fillStyle = '#1e3a8a';
  ctx.fillRect(ex, ey, 80, 58);
  ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 3;
  ctx.strokeRect(ex, ey, 80, 58);
  // Yellow trim stripe
  ctx.fillStyle = '#fbbf24';
  ctx.fillRect(ex, ey + 16, 80, 4);
  // Exhaust stack (dark)
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(ex + 14, ey - 16, 14, 18);
  ctx.strokeStyle = '#000'; ctx.strokeRect(ex + 14, ey - 16, 14, 18);
  // Yellow band on stack
  ctx.fillStyle = '#fbbf24';
  ctx.fillRect(ex + 14, ey - 11, 14, 3);
  // Red light
  ctx.fillStyle = '#ef4444';
  ctx.beginPath(); ctx.arc(ex + 65, ey + 8, 4, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#0f172a'; ctx.stroke();
  // Gauge
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(ex + 38, ey + 35, 34, 12);
  ctx.fillStyle = '#10b981';
  const gW = (state.rpm / 100) * 30;
  ctx.fillStyle = state.rpm > 70 ? '#ef4444' : state.rpm > 40 ? '#fbbf24' : '#10b981';
  ctx.fillRect(ex + 40, ey + 37, gW, 8);
  ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 1;
  ctx.strokeRect(ex + 38, ey + 35, 34, 12);

  // Worker (operator) — blue overalls + blue cap + light skin (matches reference art)
  const wx = ex - 26, wy = ey + 4;
  const SKIN = '#fde68a';         // pale cream skin
  const SKIN_SHADE = '#fbbf24';   // shade under chin
  const OUTLINE = '#0f172a';
  const OVERALL = '#2563eb';      // medium blue overalls
  const OVERALL_DK = '#1e40af';   // darker blue (legs/straps)
  const CAP = '#1d4ed8';          // blue cap
  const CAP_BRIM = '#1e3a8a';     // darker brim
  const SHIRT = '#0f172a';        // dark undershirt

  // Legs
  ctx.fillStyle = OVERALL_DK;
  ctx.fillRect(wx + 2, wy + 32, 8, 20);
  ctx.fillRect(wx + 12, wy + 32, 8, 20);
  ctx.strokeStyle = OUTLINE; ctx.lineWidth = 2;
  ctx.strokeRect(wx + 2, wy + 32, 8, 20);
  ctx.strokeRect(wx + 12, wy + 32, 8, 20);
  // Boots (dark)
  ctx.fillStyle = '#1f2937';
  ctx.fillRect(wx, wy + 50, 12, 4);
  ctx.fillRect(wx + 10, wy + 50, 12, 4);
  ctx.strokeRect(wx, wy + 50, 12, 4);
  ctx.strokeRect(wx + 10, wy + 50, 12, 4);
  // Body (blue overalls)
  ctx.fillStyle = OVERALL;
  ctx.fillRect(wx, wy, 22, 36);
  ctx.strokeRect(wx, wy, 22, 36);
  // Dark shirt showing at neck (V-cut)
  ctx.fillStyle = SHIRT;
  ctx.beginPath();
  ctx.moveTo(wx + 7, wy);
  ctx.lineTo(wx + 15, wy);
  ctx.lineTo(wx + 11, wy + 5);
  ctx.closePath();
  ctx.fill();
  // Overall straps (darker blue, go over shoulders)
  ctx.fillStyle = OVERALL_DK;
  ctx.fillRect(wx + 3, wy, 3, 14);
  ctx.fillRect(wx + 16, wy, 3, 14);
  // Strap buttons (yellow/gold)
  ctx.fillStyle = '#fbbf24';
  ctx.beginPath(); ctx.arc(wx + 4.5, wy + 14, 1.5, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(wx + 17.5, wy + 14, 1.5, 0, Math.PI * 2); ctx.fill();
  // Pocket detail
  ctx.strokeStyle = OVERALL_DK; ctx.lineWidth = 1;
  ctx.strokeRect(wx + 7, wy + 20, 8, 8);

  // Head (skin)
  ctx.fillStyle = SKIN;
  ctx.strokeStyle = OUTLINE; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.arc(wx + 11, wy - 9, 10, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  // Chin shade
  ctx.fillStyle = SKIN_SHADE; ctx.globalAlpha = 0.35;
  ctx.beginPath(); ctx.arc(wx + 11, wy - 5, 7, 0, Math.PI, false); ctx.fill();
  ctx.globalAlpha = 1;
  // Ear
  ctx.fillStyle = SKIN;
  ctx.beginPath(); ctx.arc(wx + 1, wy - 9, 2, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

  // Cap (blue with visor/brim)
  ctx.fillStyle = CAP;
  ctx.beginPath();
  ctx.ellipse(wx + 11, wy - 16, 12, 7, 0, Math.PI, 2 * Math.PI);
  ctx.closePath();
  ctx.fill(); ctx.stroke();
  // Cap highlight
  ctx.fillStyle = '#3b82f6';
  ctx.beginPath();
  ctx.ellipse(wx + 8, wy - 18, 5, 2.5, -0.2, Math.PI, 2 * Math.PI);
  ctx.fill();
  // Brim/visor (darker blue, protruding forward/right)
  ctx.fillStyle = CAP_BRIM;
  ctx.beginPath();
  ctx.ellipse(wx + 18, wy - 12, 8, 3, 0, 0, Math.PI * 2);
  ctx.fill(); ctx.stroke();
  // Cap band
  ctx.strokeStyle = CAP_BRIM; ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(wx, wy - 12); ctx.lineTo(wx + 22, wy - 12);
  ctx.stroke();

  // Eyes
  ctx.fillStyle = OUTLINE;
  ctx.fillRect(wx + 6, wy - 10, 2, 2.5);
  ctx.fillRect(wx + 13, wy - 10, 2, 2.5);
  // Nose (small)
  ctx.strokeStyle = SKIN_SHADE; ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(wx + 11, wy - 7); ctx.lineTo(wx + 11, wy - 4);
  ctx.stroke();
  // Smile
  ctx.strokeStyle = OUTLINE; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.arc(wx + 11, wy - 4, 2.5, 0.15, Math.PI - 0.15); ctx.stroke();

  // Arm reaching to engine (skin colored with overall cuff)
  // Cuff (overalls sleeve end)
  ctx.strokeStyle = OVERALL; ctx.lineWidth = 7; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(wx + 22, wy + 10); ctx.lineTo(wx + 30, wy + 18); ctx.stroke();
  // Forearm (skin)
  ctx.strokeStyle = SKIN; ctx.lineWidth = 5; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(wx + 28, wy + 17); ctx.lineTo(ex + 4, ey + 30); ctx.stroke();
  // Hand (fist)
  ctx.fillStyle = SKIN;
  ctx.beginPath(); ctx.arc(ex + 4, ey + 30, 3.5, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = OUTLINE; ctx.lineWidth = 1; ctx.stroke();
  ctx.lineCap = 'butt';

  // Ladder (angle indicator)
  const rad = state.angle * Math.PI / 180;
  const lx2 = ex + 60, ly2 = ey + 25;
  const lenL = 80;
  const tx = lx2 + Math.cos(-rad) * lenL;
  const ty = ly2 + Math.sin(-rad) * lenL;
  ctx.strokeStyle = '#fcd34d';
  ctx.lineWidth = 5;
  ctx.beginPath(); ctx.moveTo(lx2 - 3, ly2); ctx.lineTo(tx - 3, ty); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(lx2 + 3, ly2); ctx.lineTo(tx + 3, ty); ctx.stroke();
  // Rungs
  for (let i = 1; i < 6; i++) {
    const t = i / 6;
    const rx1 = lx2 - 3 + Math.cos(-rad) * lenL * t;
    const ry1 = ly2 + Math.sin(-rad) * lenL * t;
    const perpX = -Math.sin(-rad) * 6, perpY = Math.cos(-rad) * 6;
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(rx1 - perpX, ry1 - perpY); ctx.lineTo(rx1 + perpX, ry1 + perpY); ctx.stroke();
  }
  // Tire at ladder top (if aiming) — YELLOW spinning preview
  if (state.phase === PHASE.AIM) {
    ctx.save();
    ctx.translate(tx, ty);
    ctx.rotate(state.time * 0.3 * (state.rpm / 100));
    drawTireShape(18);
    ctx.restore();

    // Trajectory preview (accounts for new physics + wind)
    if (state.rpm > 5) {
      const isPerf = state.rpm >= PERFECT_MIN && state.rpm <= PERFECT_MAX;
      let v = state.rpm * 0.30 + 10;
      if (isPerf) v *= 1.55;
      const a = -state.angle * Math.PI / 180;
      let px = tx + state.cam.x, py = ty + state.cam.y;
      let pvx = Math.cos(a) * v, pvy = Math.sin(a) * v;
      ctx.fillStyle = isPerf ? 'rgba(16, 185, 129, 0.7)' : 'rgba(251, 191, 36, 0.6)';
      for (let i = 0; i < 60; i++) {
        pvy += GRAVITY;
        pvx *= AIR_DRAG;
        pvy *= AIR_DRAG;
        if (!state.windDisabled) pvx += state.wind.strength * WIND_MAX;  // preview wind
        px += pvx; py += pvy;
        if (py > terrainAt(px)) break;
        if (i % 2 === 0) {
          const [dx, dy] = worldToScreen(px, py);
          ctx.beginPath();
          ctx.arc(dx, dy, Math.max(1.5, 4 - i * 0.05), 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  }

  // Exhaust smoke
  if (state.gassing) {
    ctx.fillStyle = 'rgba(226, 232, 240, 0.75)';
    for (let i = 0; i < 4; i++) {
      const t = (state.time * 0.06 + i * 0.3) % 1;
      ctx.beginPath();
      ctx.arc(ex + 19 - t * 14, ey - 14 - t * 50, 6 + t * 12, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function drawObstacles() {
  const vw = viewWidth();
  // Fast x-cull: skip obstacles well outside the viewport before touching terrainAt/worldToScreen.
  const _drawMinX = state.cam.x - 300;
  const _drawMaxX = state.cam.x + vw + 300;
  OBSTACLES.forEach(o => {
    if (o.x < _drawMinX || o.x > _drawMaxX) return;
    if (o.type === 'house') {
      const houseW = 86;
      const houseH = 78;
      const gy = terrainAt(o.x + houseW * 0.5);
      const [sx, sy] = worldToScreen(o.x + houseW, gy);
      if (sx < -200 || sx - houseW > vw + 200) return;
      const hx = sx - houseW;
      const hy = sy - houseH;

      // Sand mound at base
      ctx.fillStyle = '#a16207';
      ctx.beginPath();
      ctx.ellipse(hx + houseW * 0.5, sy + 4, houseW * 0.7, 7, 0, 0, Math.PI * 2);
      ctx.fill();

      // Adobe body
      ctx.fillStyle = '#e7d3a1';
      ctx.fillRect(hx, hy, houseW, houseH);
      ctx.strokeStyle = '#78350f'; ctx.lineWidth = 2;
      ctx.strokeRect(hx, hy, houseW, houseH);

      // Brick seams
      ctx.strokeStyle = 'rgba(120, 53, 15, 0.35)';
      ctx.lineWidth = 1;
      for (let r = 1; r < 4; r++) {
        ctx.beginPath();
        ctx.moveTo(hx + 2, hy + r * 18);
        ctx.lineTo(hx + houseW - 2, hy + r * 18);
        ctx.stroke();
      }

      // Pitched roof
      ctx.fillStyle = '#b45309';
      ctx.beginPath();
      ctx.moveTo(hx - 6, hy);
      ctx.lineTo(hx + houseW * 0.5, hy - 28);
      ctx.lineTo(hx + houseW + 6, hy);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#78350f'; ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = 'rgba(0,0,0,0.18)';
      ctx.fillRect(hx, hy, houseW, 4);

      // Door
      const doorW = 18, doorH = 34;
      const dxp = hx + houseW * 0.5 - doorW * 0.5;
      const dyp = hy + houseH - doorH;
      ctx.fillStyle = '#7c2d12';
      ctx.fillRect(dxp, dyp, doorW, doorH);
      ctx.strokeStyle = '#451a03';
      ctx.strokeRect(dxp, dyp, doorW, doorH);
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath(); ctx.arc(dxp + doorW - 4, dyp + doorH * 0.5, 1.5, 0, Math.PI * 2); ctx.fill();

      // Windows (one each side)
      const winW = 16, winH = 16;
      [hx + 10, hx + houseW - 10 - winW].forEach(wx => {
        const wy = hy + 18;
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(wx, wy, winW, winH);
        ctx.strokeStyle = '#78350f'; ctx.lineWidth = 2;
        ctx.strokeRect(wx, wy, winW, winH);
        ctx.strokeStyle = '#e7d3a1';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(wx + winW * 0.5, wy); ctx.lineTo(wx + winW * 0.5, wy + winH);
        ctx.moveTo(wx, wy + winH * 0.5); ctx.lineTo(wx + winW, wy + winH * 0.5);
        ctx.stroke();
      });

      // Chimney
      ctx.fillStyle = '#78350f';
      ctx.fillRect(hx + houseW - 28, hy - 20, 10, 14);
      ctx.strokeStyle = '#451a03';
      ctx.strokeRect(hx + houseW - 28, hy - 20, 10, 14);
      return;
    }
    if (o.type === 'ramp') {
      const gy = terrainAt(o.x + o.w * 0.5);
      const [x1, y1] = worldToScreen(o.x, gy);
      let [x2, y2] = worldToScreen(o.x + o.w, gy - o.h);
      if (x2 < -50 || x1 > vw + 50) return;
      // Swing anim: lift tip through a pinball-arc while the flipper is active
      const swing = (o._flipSwingT || 0);
      const swingMax = o._flipSwingMax || FLIP_SWING_FRAMES;
      if (swing > 0) {
        const phase = (swingMax - swing) / swingMax;
        const lift = Math.sin(phase * Math.PI) * (o.h * FLIP_LIFT_SCALE + FLIP_LIFT_BASE);
        y2 -= lift;
      }
      // Neon glow when the tire is actually within strike reach
      let inRange = false;
      if (state.tire && state.phase === PHASE.FLY && (o._flipCooldown || 0) === 0 && swing <= 0) {
        const cx = o.x + o.w * 0.5;
        const t = state.tire;
        const dxw = Math.abs(t.x - cx);
        const tipYReach = (gy - o.h) - (o.h * FLIP_LIFT_SCALE + FLIP_LIFT_BASE);
        inRange = dxw < 180 && t.y > tipYReach - 200 && t.y < gy + 10;
      }
      // Neon outer glow when in range
      if (inRange) {
        const pulse = 0.5 + Math.sin(state.time * 0.25) * 0.3;
        ctx.save();
        ctx.shadowColor = '#60a5fa';
        ctx.shadowBlur = 18 + pulse * 10;
        ctx.strokeStyle = `rgba(96,165,250,${0.65 + pulse * 0.25})`;
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.restore();
      }
      // Cooldown tint
      const cooldownFrac = Math.min(1, (o._flipCooldown || 0) / 30);
      ctx.fillStyle = cooldownFrac > 0 ? '#44403c' : '#78716c';
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.lineTo(x2, y1);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = swing > 0 ? '#60a5fa' : '#292524';
      ctx.lineWidth = swing > 0 ? 3 : 2;
      ctx.stroke();
      // Yellow stripes
      ctx.fillStyle = '#fbbf24';
      for (let i = 0; i < 5; i++) {
        const t1 = i / 5, t2 = (i + 0.5) / 5;
        const sx1 = x1 + (x2 - x1) * t1, sy1 = y1 + (y2 - y1) * t1;
        const sx2 = x1 + (x2 - x1) * t2, sy2 = y1 + (y2 - y1) * t2;
        ctx.beginPath();
        ctx.moveTo(sx1, sy1 - 6); ctx.lineTo(sx2, sy2 - 6);
        ctx.lineTo(sx2, sy2); ctx.lineTo(sx1, sy1);
        ctx.closePath();
        ctx.fill();
      }
      // Flipper icon at tip — lightning bolt
      const iconScale = inRange ? 1.2 + Math.sin(state.time * 0.3) * 0.1 : 1;
      ctx.save();
      ctx.translate(x2, y2 - 14);
      ctx.scale(iconScale, iconScale);
      ctx.fillStyle = inRange ? '#fbbf24' : '#facc15';
      ctx.strokeStyle = '#7c2d12';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-4, -8); ctx.lineTo(2, -2); ctx.lineTo(-1, -2);
      ctx.lineTo(3, 8); ctx.lineTo(-2, 1); ctx.lineTo(1, 1);
      ctx.closePath();
      ctx.fill(); ctx.stroke();
      ctx.restore();
    } else if (o.type === 'trampoline') {
      const gy = terrainAt(o.x);
      const [x, y] = worldToScreen(o.x, gy);
      if (x + o.w < -50 || x - o.w > vw + 50) return;
      const padW = o.w;
      const padH = o.h;
      const compress = o.cooldown > 0 ? Math.min(6, o.cooldown * 0.4) : 0;
      const matY = y - padH + compress;
      // Tier colors
      const tierCol = o.tier === 'mega' ? '#ef4444' : o.tier === 'std' ? '#f97316' : '#22c55e';
      const tierDark = o.tier === 'mega' ? '#991b1b' : o.tier === 'std' ? '#9a3412' : '#166534';
      const tierLight = o.tier === 'mega' ? '#fca5a5' : o.tier === 'std' ? '#fdba74' : '#86efac';
      // Ground shadow
      ctx.fillStyle = 'rgba(0,0,0,0.28)';
      ctx.beginPath(); ctx.ellipse(x, y + 2, padW * 0.55, 4, 0, 0, Math.PI * 2); ctx.fill();
      // Spring legs (zigzag)
      ctx.strokeStyle = '#334155'; ctx.lineWidth = 2.5;
      const legXs = [x - padW * 0.35, x + padW * 0.35];
      legXs.forEach(lx => {
        const segs = 4;
        const segH = (y - matY) / segs;
        ctx.beginPath();
        ctx.moveTo(lx, y);
        for (let s = 1; s <= segs; s++) {
          const ny = y - segH * s;
          const nx = lx + (s % 2 === 0 ? -4 : 4);
          ctx.lineTo(nx, ny);
        }
        ctx.lineTo(lx, matY);
        ctx.stroke();
      });
      // Mat base (dark)
      ctx.fillStyle = tierDark;
      ctx.fillRect(x - padW / 2, matY + padH * 0.55, padW, padH * 0.45);
      ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 2;
      ctx.strokeRect(x - padW / 2, matY + padH * 0.55, padW, padH * 0.45);
      // Mat top (colored)
      const mg = ctx.createLinearGradient(x - padW / 2, matY, x - padW / 2, matY + padH * 0.55);
      mg.addColorStop(0, tierLight);
      mg.addColorStop(1, tierCol);
      ctx.fillStyle = mg;
      ctx.fillRect(x - padW / 2, matY, padW, padH * 0.55);
      ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 2;
      ctx.strokeRect(x - padW / 2, matY, padW, padH * 0.55);
      // Stripe pattern
      ctx.fillStyle = 'rgba(255,255,255,0.35)';
      const stripeCount = o.tier === 'mega' ? 5 : o.tier === 'std' ? 4 : 3;
      for (let i = 0; i < stripeCount; i++) {
        const sx = x - padW / 2 + (i + 0.5) * (padW / stripeCount);
        ctx.fillRect(sx - 2, matY + 3, 4, padH * 0.55 - 6);
      }
      // Tier badge for mega
      if (o.tier === 'mega') {
        ctx.fillStyle = '#fef3c7';
        ctx.font = 'bold 10px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('MEGA', x, matY - 4);
      } else if (o.tier === 'std') {
        ctx.fillStyle = '#fef3c7';
        ctx.font = 'bold 9px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('↑', x, matY - 3);
      }
      // Pulse glow when mega & ready
      if (o.tier === 'mega' && o.cooldown <= 0) {
        const pulse = 0.4 + 0.3 * Math.sin(performance.now() * 0.006);
        ctx.strokeStyle = `rgba(239,68,68,${pulse})`;
        ctx.lineWidth = 3;
        ctx.strokeRect(x - padW / 2 - 2, matY - 2, padW + 4, padH * 0.55 + 4);
      }
    } else if (o.type === 'wall' && !o.broken) {
      const wy = terrainAt(o.x) - o.h;
      const [x, y] = worldToScreen(o.x, wy);
      if (x + 20 < -50 || x > vw + 50) return;
      // Ground shadow
      const [gx, gy] = worldToScreen(o.x, terrainAt(o.x));
      ctx.fillStyle = 'rgba(0,0,0,0.28)';
      ctx.beginPath(); ctx.ellipse(gx + 9, gy + 2, 14, 3.5, 0, 0, Math.PI * 2); ctx.fill();
      // Brick gradient body
      const wg = ctx.createLinearGradient(x, y, x + 18, y);
      wg.addColorStop(0, '#b45309');
      wg.addColorStop(0.5, '#ea580c');
      wg.addColorStop(1, '#7c2d12');
      ctx.fillStyle = wg;
      ctx.fillRect(x, y, 18, o.h);
      ctx.strokeStyle = '#451a03'; ctx.lineWidth = 1.5;
      for (let b = 0; b < Math.ceil(o.h / 12); b++) {
        ctx.strokeRect(x, y + b * 12, 18, 12);
      }
      // Top cap highlight
      ctx.fillStyle = 'rgba(254, 243, 199, 0.3)';
      ctx.fillRect(x + 1, y + 1, 16, 2);
    } else if (o.type === 'barrel' && !o.toppled) {
      const by = terrainAt(o.x) - 30;
      const [x, y] = worldToScreen(o.x, by);
      if (x < -50 || x > vw + 50) return;
      // Ground shadow
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.beginPath(); ctx.ellipse(x, y + 16, 16, 4, 0, 0, Math.PI * 2); ctx.fill();
      // Barrel body with radial gradient for round feel
      const bg = ctx.createRadialGradient(x - 4, y - 4, 2, x, y, 18);
      bg.addColorStop(0, '#fbbf24');
      bg.addColorStop(0.5, '#b45309');
      bg.addColorStop(1, '#78350f');
      ctx.fillStyle = bg;
      ctx.beginPath(); ctx.arc(x, y, 16, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#451a03'; ctx.lineWidth = 2; ctx.stroke();
      ctx.fillStyle = '#78350f';
      ctx.fillRect(x - 14, y - 3, 28, 3);
      ctx.fillRect(x - 14, y + 2, 28, 3);
      // Specular highlight
      ctx.fillStyle = 'rgba(254, 243, 199, 0.35)';
      ctx.beginPath(); ctx.ellipse(x - 5, y - 5, 3, 5, -0.5, 0, Math.PI * 2); ctx.fill();
    } else if (o.type === 'tnt' && !o.triggered) {
      // 💥 TNT barrel — red with yellow "TNT" label + sparking fuse
      const by = terrainAt(o.x) - 32;
      const [x, y] = worldToScreen(o.x, by);
      if (x < -50 || x > vw + 50) return;
      // Shadow
      ctx.fillStyle = 'rgba(0,0,0,0.35)';
      ctx.beginPath(); ctx.ellipse(x, y + 20, 18, 4, 0, 0, Math.PI * 2); ctx.fill();
      // Warning glow (red pulse)
      const warn = 0.25 + Math.sin(state.time * 0.18) * 0.15;
      const glow = ctx.createRadialGradient(x, y, 4, x, y, 42);
      glow.addColorStop(0, `rgba(239,68,68,${warn})`);
      glow.addColorStop(1, 'rgba(239,68,68,0)');
      ctx.fillStyle = glow;
      ctx.beginPath(); ctx.arc(x, y, 42, 0, Math.PI * 2); ctx.fill();
      // Barrel body
      const bg = ctx.createLinearGradient(x, y - 20, x, y + 20);
      bg.addColorStop(0, '#ef4444');
      bg.addColorStop(0.5, '#b91c1c');
      bg.addColorStop(1, '#7f1d1d');
      ctx.fillStyle = bg;
      ctx.beginPath(); ctx.roundRect(x - 18, y - 20, 36, 40, 3); ctx.fill();
      ctx.strokeStyle = '#450a0a'; ctx.lineWidth = 2; ctx.stroke();
      // Horizontal bands
      ctx.fillStyle = '#fef3c7';
      ctx.fillRect(x - 18, y - 12, 36, 3);
      ctx.fillRect(x - 18, y + 9, 36, 3);
      // TNT label
      ctx.fillStyle = '#fef3c7';
      ctx.font = 'bold 11px "Courier New", monospace';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('TNT', x, y);
      // Fuse (top)
      ctx.strokeStyle = '#78350f'; ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, y - 20);
      ctx.quadraticCurveTo(x + 3, y - 27, x + 6, y - 28);
      ctx.stroke();
      // Spark on fuse tip
      const sp = (state.time * 0.3) % 1;
      ctx.fillStyle = sp > 0.5 ? '#fbbf24' : '#fef3c7';
      ctx.beginPath(); ctx.arc(x + 6, y - 28, 2 + sp * 1.5, 0, Math.PI * 2); ctx.fill();
      // Highlight
      ctx.fillStyle = 'rgba(255,255,255,0.25)';
      ctx.beginPath(); ctx.ellipse(x - 8, y - 8, 3, 7, -0.3, 0, Math.PI * 2); ctx.fill();
    } else if (o.type === 'cannon') {
      // 🎯 Cannon — metal cylinder with wheels, angled upward
      const gy = terrainAt(o.x);
      const [x, y] = worldToScreen(o.x, gy);
      if (x < -80 || x > vw + 80) return;
      ctx.save();
      ctx.translate(x, y);
      // Shadow
      ctx.fillStyle = 'rgba(0,0,0,0.35)';
      ctx.beginPath(); ctx.ellipse(0, 2, 26, 5, 0, 0, Math.PI * 2); ctx.fill();
      // Base/platform (wood)
      ctx.fillStyle = '#78350f';
      ctx.beginPath(); ctx.roundRect(-24, -14, 48, 14, 3); ctx.fill();
      ctx.strokeStyle = '#451a03'; ctx.lineWidth = 2; ctx.stroke();
      // Wheels
      ctx.fillStyle = '#1f2937';
      ctx.beginPath(); ctx.arc(-16, -2, 7, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(16, -2, 7, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(-16, -2, 7, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(16, -2, 7, 0, Math.PI * 2); ctx.stroke();
      // Wheel spokes
      ctx.strokeStyle = '#6b7280'; ctx.lineWidth = 1.2;
      [-16, 16].forEach(wx => {
        for (let k = 0; k < 4; k++) {
          const ang = k * Math.PI / 4 + (state.time * 0.02);
          ctx.beginPath();
          ctx.moveTo(wx, -2);
          ctx.lineTo(wx + Math.cos(ang) * 5, -2 + Math.sin(ang) * 5);
          ctx.stroke();
        }
      });
      // Barrel (rotated by angle)
      ctx.save();
      ctx.translate(0, -14);
      ctx.rotate(-o.angle);  // angle is above-horizontal → negative for canvas
      const bg2 = ctx.createLinearGradient(0, -7, 0, 7);
      bg2.addColorStop(0, '#6b7280');
      bg2.addColorStop(0.5, '#374151');
      bg2.addColorStop(1, '#111827');
      ctx.fillStyle = bg2;
      ctx.beginPath(); ctx.roundRect(0, -8, 34, 16, 3); ctx.fill();
      ctx.strokeStyle = '#000'; ctx.lineWidth = 2; ctx.stroke();
      // Bands
      ctx.fillStyle = '#1f2937';
      ctx.fillRect(6, -9, 3, 18);
      ctx.fillRect(18, -9, 3, 18);
      // Muzzle ring
      ctx.fillStyle = '#111827';
      ctx.beginPath(); ctx.arc(34, 0, 9, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#0f172a';
      ctx.beginPath(); ctx.arc(34, 0, 6, 0, Math.PI * 2); ctx.fill();
      // Ready glow in muzzle
      if (o.cooldown <= 0) {
        const pulse = 0.5 + Math.sin(state.time * 0.2) * 0.3;
        ctx.fillStyle = `rgba(251, 191, 36, ${pulse})`;
        ctx.beginPath(); ctx.arc(34, 0, 4, 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore();
      ctx.restore();
    } else if (o.type === 'cactus') {
      if (o.broken) return;
      const gy0 = terrainAt(o.x);
      const [x, gy] = worldToScreen(o.x, gy0);
      if (x < -80 || x > vw + 80) return;
      const h = o.h || 90;
      const flash = (o.flashT || 0) / 30;
      // Shadow
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.beginPath(); ctx.ellipse(x, gy + 1, 22, 4, 0, 0, Math.PI * 2); ctx.fill();
      // Trunk
      ctx.save();
      ctx.translate(x, gy);
      const trunkG = ctx.createLinearGradient(-10, 0, 10, 0);
      trunkG.addColorStop(0, '#166534');
      trunkG.addColorStop(0.5, '#22c55e');
      trunkG.addColorStop(1, '#14532d');
      ctx.fillStyle = trunkG;
      ctx.beginPath();
      ctx.roundRect(-11, -h, 22, h, 10);
      ctx.fill();
      ctx.strokeStyle = '#052e16'; ctx.lineWidth = 2; ctx.stroke();
      // Ribs
      ctx.strokeStyle = 'rgba(5,46,22,0.55)';
      ctx.lineWidth = 1.4;
      for (let rx = -6; rx <= 6; rx += 6) {
        ctx.beginPath();
        ctx.moveTo(rx, -h + 8); ctx.lineTo(rx, -8);
        ctx.stroke();
      }
      // Arms
      const armY = -h * 0.55;
      // Left arm
      ctx.fillStyle = trunkG;
      ctx.beginPath();
      ctx.roundRect(-22, armY + 14, 12, 28, 6);
      ctx.fill(); ctx.strokeStyle = '#052e16'; ctx.lineWidth = 2; ctx.stroke();
      ctx.fillStyle = trunkG;
      ctx.beginPath();
      ctx.roundRect(-22, armY - 4, 22, 18, 6);
      ctx.fill(); ctx.stroke();
      // Right arm
      ctx.fillStyle = trunkG;
      ctx.beginPath();
      ctx.roundRect(10, armY + 4, 12, 22, 6);
      ctx.fill(); ctx.stroke();
      ctx.beginPath();
      ctx.roundRect(0, armY - 10, 22, 14, 6);
      ctx.fill(); ctx.stroke();
      // Spines (small yellow-white tufts dotted around the trunk)
      ctx.strokeStyle = '#fef3c7'; ctx.lineWidth = 1.2;
      for (let row = 0; row < 10; row++) {
        const ry = -h + 10 + row * ((h - 16) / 10);
        for (let side = -1; side <= 1; side += 2) {
          ctx.beginPath();
          ctx.moveTo(side * 10, ry);
          ctx.lineTo(side * 15, ry - 1);
          ctx.stroke();
        }
      }
      // Flash ring on impact
      if (flash > 0) {
        ctx.globalAlpha = flash * 0.7;
        ctx.strokeStyle = '#fde047';
        ctx.lineWidth = 3;
        ctx.beginPath(); ctx.arc(0, -h * 0.5, 30 + (1 - flash) * 12, 0, Math.PI * 2); ctx.stroke();
        ctx.globalAlpha = 1;
      }
      ctx.restore();
    } else if (o.type === 'spike') {
      if (o.broken) return;
      const gy0 = terrainAt(o.x);
      const [x, gy] = worldToScreen(o.x, gy0);
      if (x < -80 || x > vw + 80) return;
      const w = o.w || 44, h = o.h || 28, n = o.n || 4;
      const sflash = (o.flashT || 0) / 30;
      ctx.save();
      ctx.translate(x, gy);
      // Warning glow when tire is close
      const tire = state.tire;
      if (tire && Math.abs(tire.x - o.x) < 90) {
        const proximity = 1 - Math.min(1, Math.abs(tire.x - o.x) / 90);
        const pulseA = 0.2 + Math.sin(state.time * 0.4) * 0.1 + proximity * 0.35;
        ctx.globalAlpha = pulseA;
        const rg = ctx.createRadialGradient(0, -h / 2, 2, 0, -h / 2, w * 1.2);
        rg.addColorStop(0, '#ef4444');
        rg.addColorStop(1, 'rgba(239,68,68,0)');
        ctx.fillStyle = rg;
        ctx.beginPath(); ctx.arc(0, -h / 2, w * 1.2, 0, Math.PI * 2); ctx.fill();
        ctx.globalAlpha = 1;
      }
      // Base plate (metallic dark)
      const plateG = ctx.createLinearGradient(-w / 2, 0, w / 2, 0);
      plateG.addColorStop(0, '#1e293b');
      plateG.addColorStop(0.5, '#475569');
      plateG.addColorStop(1, '#1e293b');
      ctx.fillStyle = plateG;
      ctx.beginPath();
      ctx.roundRect(-w / 2, -6, w, 6, 2);
      ctx.fill();
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 1.2;
      ctx.stroke();
      // Spikes — sharp triangles with bright red tips
      const step = w / n;
      for (let i = 0; i < n; i++) {
        const sx0 = -w / 2 + i * step + 2;
        const sx1 = sx0 + step - 4;
        const sxm = (sx0 + sx1) / 2;
        const tipY = -h;
        // Body (steel)
        const spikeG = ctx.createLinearGradient(sx0, 0, sx1, 0);
        spikeG.addColorStop(0, '#475569');
        spikeG.addColorStop(0.5, '#cbd5e1');
        spikeG.addColorStop(1, '#334155');
        ctx.fillStyle = spikeG;
        ctx.beginPath();
        ctx.moveTo(sx0, -6);
        ctx.lineTo(sx1, -6);
        ctx.lineTo(sxm, tipY);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 1;
        ctx.stroke();
        // Red warning tip
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.moveTo(sxm - 3, tipY + 6);
        ctx.lineTo(sxm + 3, tipY + 6);
        ctx.lineTo(sxm, tipY);
        ctx.closePath();
        ctx.fill();
      }
      // Flash burst on impact
      if (sflash > 0) {
        ctx.globalAlpha = sflash * 0.8;
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 3;
        ctx.beginPath(); ctx.arc(0, -h / 2, 28 + (1 - sflash) * 18, 0, Math.PI * 2); ctx.stroke();
        ctx.globalAlpha = 1;
      }
      ctx.restore();
    } else if (o.type === 'water') {
      const [x1, y1] = worldToScreen(o.x, o.surfaceY);
      const [x2] = worldToScreen(o.x + o.w, o.surfaceY);
      if (x2 < -80 || x1 > vw + 80) return;
      const ww = x2 - x1;
      const depth = (o.depth || 26) * (state.zoom || 1);
      // Water body
      const wg = ctx.createLinearGradient(0, y1, 0, y1 + depth);
      wg.addColorStop(0, '#0ea5e9');
      wg.addColorStop(0.5, '#0369a1');
      wg.addColorStop(1, '#0c4a6e');
      ctx.fillStyle = wg;
      ctx.beginPath();
      ctx.rect(x1, y1, ww, depth + 60);
      ctx.fill();
      // Surface highlight band
      ctx.fillStyle = 'rgba(186,230,253,0.55)';
      ctx.fillRect(x1, y1 - 1, ww, 3);
      // Shimmer waves
      o.shimmer = (o.shimmer || 0) + 0.06;
      ctx.strokeStyle = 'rgba(255,255,255,0.45)';
      ctx.lineWidth = 1.2;
      const segs = Math.max(4, Math.floor(ww / 18));
      for (let s = 0; s < segs; s++) {
        const sx = x1 + (s + 0.5) * (ww / segs);
        const off = Math.sin(o.shimmer + s * 0.7) * 1.5;
        ctx.beginPath();
        ctx.moveTo(sx - 6, y1 + 4 + off);
        ctx.quadraticCurveTo(sx, y1 + 2 + off, sx + 6, y1 + 4 + off);
        ctx.stroke();
      }
      // Warning skull when tire is close
      const tire = state.tire;
      if (tire && Math.abs(tire.x - (o.x + o.w / 2)) < 200) {
        const proximity = 1 - Math.min(1, Math.abs(tire.x - (o.x + o.w / 2)) / 200);
        ctx.globalAlpha = 0.5 + Math.sin(state.time * 0.3) * 0.2 + proximity * 0.3;
        ctx.fillStyle = '#fef3c7';
        ctx.font = `${14 * (state.zoom || 1)}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText('💀', x1 + ww / 2, y1 - 8);
        ctx.globalAlpha = 1;
      }
    } else if (o.type === 'lava') {
      const [x1, y1] = worldToScreen(o.x, o.surfaceY);
      const [x2] = worldToScreen(o.x + o.w, o.surfaceY);
      if (x2 < -80 || x1 > vw + 80) return;
      const ww = x2 - x1;
      const depth = (o.depth || 30) * (state.zoom || 1);
      // Glödande lavakropp — gult i kärnan, orange mitt, mörkröd botten
      const lg = ctx.createLinearGradient(0, y1, 0, y1 + depth);
      lg.addColorStop(0, '#fde047');
      lg.addColorStop(0.25, '#fb923c');
      lg.addColorStop(0.6, '#dc2626');
      lg.addColorStop(1, '#7f1d1d');
      ctx.fillStyle = lg;
      ctx.beginPath();
      ctx.rect(x1, y1, ww, depth + 60);
      ctx.fill();
      // Glow halo över ytan
      const gh = ctx.createLinearGradient(0, y1 - 30, 0, y1 + 8);
      gh.addColorStop(0, 'rgba(251,146,60,0)');
      gh.addColorStop(1, 'rgba(254,240,138,0.55)');
      ctx.fillStyle = gh;
      ctx.fillRect(x1, y1 - 30, ww, 38);
      // Het yt-band
      ctx.fillStyle = 'rgba(254,240,138,0.85)';
      ctx.fillRect(x1, y1 - 1, ww, 3);
      // Bubblor på ytan — periodiska
      o.bubbleT = (o.bubbleT || 0) + 1;
      o.shimmer = (o.shimmer || 0) + 0.07;
      const segs = Math.max(4, Math.floor(ww / 16));
      for (let s = 0; s < segs; s++) {
        const sxw = x1 + (s + 0.5) * (ww / segs);
        const ph = (o.shimmer + s * 0.9);
        // Bubbla pulserar mellan 0..1 — radie skalar med pulsen
        const pulse = 0.5 + 0.5 * Math.sin(ph + s);
        const r = 1.5 + pulse * 3.2;
        ctx.fillStyle = `rgba(254,240,138,${0.25 + pulse * 0.5})`;
        ctx.beginPath();
        ctx.arc(sxw, y1 + 4 - pulse * 2, r, 0, Math.PI * 2);
        ctx.fill();
      }
      // Krackelerings-mönster på ytan (mörka sprickor i en avsvalnad skorpa)
      ctx.strokeStyle = 'rgba(127,29,29,0.45)';
      ctx.lineWidth = 1;
      for (let s = 0; s < segs; s++) {
        const sxw = x1 + s * (ww / segs);
        const off = Math.sin(o.shimmer * 0.5 + s * 1.3) * 2;
        ctx.beginPath();
        ctx.moveTo(sxw, y1 + 6 + off);
        ctx.lineTo(sxw + ww / segs * 0.7, y1 + 9 + off * 0.5);
        ctx.stroke();
      }
      // Spawn-emissions: glödande gnistor sticker upp då och då
      if (state.particles && state.particles.length < 380 && o.bubbleT % 8 === 0 && Math.random() < 0.6) {
        state.particles.push({
          x: o.x + Math.random() * o.w,
          y: o.surfaceY - 2,
          vx: (Math.random() - 0.5) * 1.4,
          vy: -2 - Math.random() * 2,
          life: 36 + Math.floor(Math.random() * 16),
          max: 50,
          color: `rgba(254,240,138,${0.7 + Math.random() * 0.3})`,
          size: 1.5 + Math.random() * 1.5,
          g: 0.04, shape: 'square',
        });
      }
      // Varnings-skull
      const tire = state.tire;
      if (tire && Math.abs(tire.x - (o.x + o.w / 2)) < 220) {
        const proximity = 1 - Math.min(1, Math.abs(tire.x - (o.x + o.w / 2)) / 220);
        ctx.globalAlpha = 0.6 + Math.sin(state.time * 0.3) * 0.2 + proximity * 0.2;
        ctx.fillStyle = '#fde047';
        ctx.font = `${14 * (state.zoom || 1)}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText('💀', x1 + ww / 2, y1 - 10);
        ctx.globalAlpha = 1;
      }
    } else if (o.type === 'geyser') {
      const cx = o.x;
      const groundY = terrainAt(cx);
      const [sx, sy] = worldToScreen(cx, groundY);
      if (sx < -120 || sx > vw + 120) return;
      const cycleT = o.cycleT || 0;
      const w = o.w || 56;
      const z = state.zoom || 1;
      // Faser: dormant 0..240, charging 240..240, erupting 240..330 (men charging is the last 60 of dormant)
      // Tolka: cycle är 0..330; dormant 0..180, charging 180..240, erupting 240..330
      const isDormant = cycleT < 180;
      const isCharging = cycleT >= 180 && cycleT < 240;
      const isErupting = cycleT >= 240 && cycleT < 330;
      // Bas: stenring kring munstycket
      ctx.save();
      ctx.translate(sx, sy);
      // Mörk obsidian-ring
      ctx.fillStyle = '#1c0a0a';
      ctx.beginPath();
      ctx.ellipse(0, 0, (w * 0.55) * z, 8 * z, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#0a0303';
      ctx.beginPath();
      ctx.ellipse(0, -2 * z, (w * 0.4) * z, 5 * z, 0, 0, Math.PI * 2);
      ctx.fill();
      // Inre glöd från munstycket — alltid synligt, intensiteten skiftar
      const baseGlow = isDormant ? 0.25 : isCharging ? 0.5 + (cycleT - 180) / 60 * 0.4 : 0.95;
      const glowR = (w * 0.42) * z;
      const glow = ctx.createRadialGradient(0, -2 * z, 1, 0, -2 * z, glowR);
      glow.addColorStop(0, `rgba(254,240,138,${baseGlow})`);
      glow.addColorStop(0.5, `rgba(251,146,60,${baseGlow * 0.6})`);
      glow.addColorStop(1, 'rgba(220,38,38,0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(0, -2 * z, glowR, 0, Math.PI * 2);
      ctx.fill();
      // Charging — pulserande varnings-skiva
      if (isCharging) {
        const t = (cycleT - 180) / 60;
        const pulse = 0.5 + 0.5 * Math.sin(state.time * 0.6);
        ctx.globalAlpha = 0.4 + pulse * 0.4;
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.ellipse(0, -2 * z, (w * 0.55 + t * 6) * z, (8 + t * 4) * z, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
        // Spawn-små varningspartiklar
        if (state.particles && state.particles.length < 380 && state.time % 4 === 0) {
          state.particles.push({
            x: cx + (Math.random() - 0.5) * w * 0.6,
            y: groundY - 4,
            vx: (Math.random() - 0.5) * 0.8,
            vy: -2 - Math.random() * 2,
            life: 28, max: 28,
            color: `rgba(254,240,138,${0.7 + Math.random() * 0.3})`,
            size: 1.5 + Math.random() * 1.2,
            g: 0.06, shape: 'square',
          });
        }
      }
      // Erupting — en kolonn av lava/ånga som sträcker sig uppåt
      if (isErupting) {
        const eruptT = (cycleT - 240) / 90;     // 0..1 över hela eruption
        const env = Math.sin(eruptT * Math.PI);   // ramp upp + ner
        const colH = (o.height || 240) * env * z;
        const colW = w * (0.55 + env * 0.3) * z;
        // Outer flame
        const flame = ctx.createLinearGradient(0, 0, 0, -colH);
        flame.addColorStop(0, 'rgba(254,240,138,0.95)');
        flame.addColorStop(0.4, 'rgba(251,146,60,0.85)');
        flame.addColorStop(0.75, 'rgba(220,38,38,0.6)');
        flame.addColorStop(1, 'rgba(220,38,38,0)');
        ctx.fillStyle = flame;
        ctx.beginPath();
        ctx.moveTo(-colW * 0.5, 0);
        ctx.quadraticCurveTo(-colW * 0.3, -colH * 0.6, 0, -colH);
        ctx.quadraticCurveTo(colW * 0.3, -colH * 0.6, colW * 0.5, 0);
        ctx.closePath();
        ctx.fill();
        // Inner core (white-hot)
        const core = ctx.createLinearGradient(0, 0, 0, -colH * 0.8);
        core.addColorStop(0, 'rgba(255,255,255,0.9)');
        core.addColorStop(0.5, 'rgba(254,240,138,0.7)');
        core.addColorStop(1, 'rgba(251,146,60,0)');
        ctx.fillStyle = core;
        ctx.beginPath();
        ctx.moveTo(-colW * 0.25, 0);
        ctx.quadraticCurveTo(-colW * 0.1, -colH * 0.6, 0, -colH * 0.8);
        ctx.quadraticCurveTo(colW * 0.1, -colH * 0.6, colW * 0.25, 0);
        ctx.closePath();
        ctx.fill();
        // Spawn-eruption-partiklar
        if (state.particles && state.particles.length < 400 && state.time % 2 === 0) {
          state.particles.push({
            x: cx + (Math.random() - 0.5) * w * 0.5,
            y: groundY - 4,
            vx: (Math.random() - 0.5) * 2.5,
            vy: -8 - Math.random() * 6,
            life: 40 + Math.floor(Math.random() * 30),
            max: 70,
            color: `rgba(${Math.random() < 0.5 ? '254,240,138' : '251,146,60'},${0.7 + Math.random() * 0.3})`,
            size: 2 + Math.random() * 2,
            g: 0.18, shape: 'square',
          });
        }
      }
      ctx.restore();
      // Status-skylt över munstycket
      if (isCharging || isDormant) {
        ctx.save();
        ctx.translate(sx, sy - 18 * z);
        ctx.font = `${12 * z}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.globalAlpha = 0.85;
        ctx.fillText('♨️', 0, 0);
        ctx.globalAlpha = 1;
        ctx.restore();
      }
    } else if (o.type === 'bumper') {
      const [x, y] = worldToScreen(o.x, o.y);
      if (x < -80 || x > vw + 80) return;
      const hit = (o.hitT || 0) / 14;
      const pulse = 1 + Math.sin(state.time * 0.18) * 0.05 + hit * 0.35;
      const R = (o.r || 28) * pulse;
      ctx.save();
      ctx.translate(x, y);
      // Glow
      const gg = ctx.createRadialGradient(0, 0, R * 0.5, 0, 0, R * 2.1);
      gg.addColorStop(0, `rgba(34,197,94,${0.35 + hit * 0.4})`);
      gg.addColorStop(1, 'rgba(34,197,94,0)');
      ctx.fillStyle = gg;
      ctx.beginPath(); ctx.arc(0, 0, R * 2.1, 0, Math.PI * 2); ctx.fill();
      // Outer ring (black)
      ctx.fillStyle = '#0f172a';
      ctx.beginPath(); ctx.arc(0, 0, R + 3, 0, Math.PI * 2); ctx.fill();
      // Ring (bright green)
      const rg = ctx.createRadialGradient(-R * 0.35, -R * 0.35, R * 0.2, 0, 0, R);
      rg.addColorStop(0, '#86efac');
      rg.addColorStop(0.6, '#22c55e');
      rg.addColorStop(1, '#166534');
      ctx.fillStyle = rg;
      ctx.beginPath(); ctx.arc(0, 0, R, 0, Math.PI * 2); ctx.fill();
      // Inner white dome
      const dg = ctx.createRadialGradient(-R * 0.25, -R * 0.25, R * 0.1, 0, 0, R * 0.65);
      dg.addColorStop(0, '#ffffff');
      dg.addColorStop(0.6, '#fef08a');
      dg.addColorStop(1, '#facc15');
      ctx.fillStyle = dg;
      ctx.beginPath(); ctx.arc(0, 0, R * 0.62, 0, Math.PI * 2); ctx.fill();
      // Star mark
      ctx.fillStyle = '#166534';
      ctx.font = `bold ${Math.round(R * 0.7)}px "Courier New", monospace`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('★', 0, 1);
      // Highlight
      ctx.fillStyle = 'rgba(255,255,255,0.45)';
      ctx.beginPath(); ctx.ellipse(-R * 0.35, -R * 0.4, R * 0.18, R * 0.3, -0.3, 0, Math.PI * 2); ctx.fill();
      // Hit flash ring
      if (hit > 0) {
        ctx.globalAlpha = hit;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.beginPath(); ctx.arc(0, 0, R * (1.2 + (1 - hit) * 0.5), 0, Math.PI * 2); ctx.stroke();
        ctx.globalAlpha = 1;
      }
      // Tether line down to ground
      const [, gy] = worldToScreen(o.x, terrainAt(o.x));
      ctx.strokeStyle = 'rgba(15,23,42,0.4)';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(0, R);
      ctx.lineTo(0, gy - y);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
    } else if (o.type === 'spinner') {
      const [x, y] = worldToScreen(o.x, o.y);
      if (x < -100 || x > vw + 100) return;
      // center
      ctx.fillStyle = '#1e40af'; ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(x, y, 10, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      // blades
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(o.rot);
      for (let a = 0; a < 4; a++) {
        ctx.fillStyle = a % 2 === 0 ? '#3b82f6' : '#60a5fa';
        ctx.beginPath();
        ctx.moveTo(0, -6);
        ctx.lineTo(50, -3);
        ctx.lineTo(50, 3);
        ctx.lineTo(0, 6);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.rotate(Math.PI / 2);
      }
      ctx.restore();
      // pole
      const gy = terrainAt(o.x);
      const [px, py] = worldToScreen(o.x, gy);
      ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 4;
      ctx.beginPath(); ctx.moveTo(x, y + 10); ctx.lineTo(px, py); ctx.stroke();
    } else if (o.type === 'finish') {
      const gy = terrainAt(o.x);
      const [x, y] = worldToScreen(o.x, gy);
      if (x < -150 || x > vw + 150) return;
      // ===== Target Chimney Tower =====
      const towerW = 90;
      const towerH = 360;
      const tx1 = x - towerW / 2;
      const ty1 = y - towerH;
      // Tower base (wider footing)
      ctx.fillStyle = '#78350f';
      ctx.fillRect(tx1 - 8, y - 20, towerW + 16, 20);
      ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 2.5;
      ctx.strokeRect(tx1 - 8, y - 20, towerW + 16, 20);
      // Tower body (tan bricks)
      ctx.fillStyle = '#d97706';
      ctx.fillRect(tx1, ty1, towerW, towerH);
      ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 3;
      ctx.strokeRect(tx1, ty1, towerW, towerH);
      // Brick pattern
      ctx.strokeStyle = 'rgba(69,26,3,0.5)'; ctx.lineWidth = 1;
      for (let row = 0; row < Math.floor(towerH / 16); row++) {
        const offX = row % 2 === 0 ? 0 : towerW / 6;
        ctx.beginPath();
        ctx.moveTo(tx1, ty1 + row * 16); ctx.lineTo(tx1 + towerW, ty1 + row * 16);
        ctx.stroke();
        for (let c = 0; c < 6; c++) {
          const cx = tx1 + c * (towerW / 3) + offX;
          if (cx > tx1 && cx < tx1 + towerW) {
            ctx.beginPath();
            ctx.moveTo(cx, ty1 + row * 16); ctx.lineTo(cx, ty1 + (row + 1) * 16);
            ctx.stroke();
          }
        }
      }
      // Top cap
      ctx.fillStyle = '#b45309';
      ctx.fillRect(tx1 - 6, ty1 - 12, towerW + 12, 14);
      ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 2.5;
      ctx.strokeRect(tx1 - 6, ty1 - 12, towerW + 12, 14);
      // Horizontal bands
      ctx.fillStyle = '#78350f';
      ctx.fillRect(tx1, ty1 + towerH * 0.55, towerW, 6);

      // ===== BULLSEYE TARGET =====
      const cy = y - 220; // matches LEVEL.finishCY
      const cx = x;
      // Outer ring (purple)
      ctx.fillStyle = '#a855f7';
      ctx.beginPath(); ctx.arc(cx, cy, 100, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 2.5; ctx.stroke();
      // Ring 4 (blue)
      ctx.fillStyle = '#3b82f6';
      ctx.beginPath(); ctx.arc(cx, cy, 65, 0, Math.PI * 2); ctx.fill();
      ctx.stroke();
      // Ring 3 (yellow)
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath(); ctx.arc(cx, cy, 38, 0, Math.PI * 2); ctx.fill();
      ctx.stroke();
      // Bullseye (red)
      ctx.fillStyle = '#ef4444';
      ctx.beginPath(); ctx.arc(cx, cy, 18, 0, Math.PI * 2); ctx.fill();
      ctx.stroke();
      // Center dot
      ctx.fillStyle = '#fef3c7';
      ctx.beginPath(); ctx.arc(cx, cy, 6, 0, Math.PI * 2); ctx.fill();

      // Labels
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 11px "Courier New", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('2500', cx, cy - 30); // bullseye value floating above
      ctx.fillText('1000', cx + 48, cy - 2);
      ctx.fillText('500',  cx + 78, cy + 28);
      ctx.fillText('200',  cx + 108, cy + 8);

      // Ladder on side (decorative)
      ctx.strokeStyle = '#78350f'; ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(tx1 + towerW - 10, y); ctx.lineTo(tx1 + towerW - 10, ty1 + 40);
      ctx.moveTo(tx1 + towerW - 4, y);  ctx.lineTo(tx1 + towerW - 4, ty1 + 40);
      ctx.stroke();
      ctx.strokeStyle = '#b45309'; ctx.lineWidth = 2;
      for (let r = 0; r < 14; r++) {
        const ry = y - 20 - r * 24;
        if (ry < ty1 + 40) break;
        ctx.beginPath();
        ctx.moveTo(tx1 + towerW - 10, ry); ctx.lineTo(tx1 + towerW - 4, ry);
        ctx.stroke();
      }

      // "MÅL" banner
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(tx1 - 10, ty1 - 40, towerW + 20, 22);
      ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 2;
      ctx.strokeRect(tx1 - 10, ty1 - 40, towerW + 20, 22);
      ctx.fillStyle = '#fef3c7';
      ctx.font = 'bold 16px "Courier New", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('🎯 MÅL', x, ty1 - 24);
      ctx.textAlign = 'left';
    }
  });
}

function drawLadderMan() {
  for (let i = 0; i < state.ladders.length; i++) {
    drawOneLadderMan(i);
  }
}

function drawOneLadderMan(i) {
  const L = state.ladders[i];
  const { baseX, baseY, topX, topY, dir } = ladderPose(i);
  const [sbx, sby] = worldToScreen(baseX, baseY);
  const [stx, sty] = worldToScreen(topX, topY);
  const vw = viewWidth();
  if (sbx < -80 || sbx > vw + 80) return;

  // Ground shadow where he stands
  ctx.fillStyle = 'rgba(0,0,0,0.35)';
  ctx.beginPath(); ctx.ellipse(sbx, sby + 2, 20, 4, 0, 0, Math.PI * 2); ctx.fill();

  // === Ladder ===
  const ang = Math.atan2(sty - sby, stx - sbx);
  const railOff = 6;
  const perpX = Math.cos(ang + Math.PI / 2) * railOff;
  const perpY = Math.sin(ang + Math.PI / 2) * railOff;
  // Rails
  ctx.strokeStyle = L.grabbed ? '#fde047' : '#fbbf24';
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(sbx - perpX, sby - perpY); ctx.lineTo(stx - perpX, sty - perpY);
  ctx.moveTo(sbx + perpX, sby + perpY); ctx.lineTo(stx + perpX, sty + perpY);
  ctx.stroke();
  // Rail outline
  ctx.strokeStyle = '#78350f';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(sbx - perpX, sby - perpY); ctx.lineTo(stx - perpX, sty - perpY);
  ctx.moveTo(sbx + perpX, sby + perpY); ctx.lineTo(stx + perpX, sty + perpY);
  ctx.stroke();
  // Rungs
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 3;
  for (let i = 1; i < 7; i++) {
    const t = i / 7;
    const rx = sbx + (stx - sbx) * t;
    const ry = sby + (sty - sby) * t;
    ctx.beginPath();
    ctx.moveTo(rx - perpX, ry - perpY);
    ctx.lineTo(rx + perpX, ry + perpY);
    ctx.stroke();
  }
  ctx.lineCap = 'butt';

  // Hover indicator when grabbed — pulsing halo
  if (L.grabbed) {
    const pulse = 0.5 + 0.5 * Math.sin(state.time * 0.25);
    ctx.strokeStyle = `rgba(253, 224, 71, ${0.4 + pulse * 0.4})`;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(sbx - perpX - 2, sby - perpY); ctx.lineTo(stx - perpX - 2, sty - perpY);
    ctx.moveTo(sbx + perpX + 2, sby + perpY); ctx.lineTo(stx + perpX + 2, sty + perpY);
    ctx.stroke();
  }

  // === Worker (faces launcher = opposite of dir) ===
  // He stands on the far side of the ladder so he's not in front of it from player's view.
  // Face direction = toward launcher. If launcher is left (dir=-1 means ladder leans left → he faces left).
  const faceLeft = (dir < 0);  // -1 means launcher is to the left
  // Position: to the opposite side of the lean
  const standOff = -dir * 18;    // stands on side away from the ladder's top
  const wx = sbx + standOff;
  const wy = sby - 4;            // feet at ground
  ctx.save();
  ctx.translate(wx, wy);
  if (faceLeft) ctx.scale(-1, 1);  // mirror if facing left
  // Colors (match launcher worker)
  const SKIN = '#fde68a';
  const OUTLINE = '#0f172a';
  const OVERALL = '#2563eb';
  const CAP = '#1e40af';
  const CAP_BRIM = '#0f172a';
  // Walking leg bounce
  const walkBob = L.walking > 0 ? Math.sin(state.time * 0.6) * 2 : 0;
  // Legs (overalls)
  ctx.fillStyle = OVERALL;
  ctx.fillRect(-6, -14, 5, 14 + walkBob);
  ctx.fillRect(1,  -14, 5, 14 - walkBob);
  // Boots
  ctx.fillStyle = OUTLINE;
  ctx.fillRect(-7, -2 + walkBob, 7, 3);
  ctx.fillRect(0,  -2 - walkBob, 7, 3);
  // Torso (overalls)
  ctx.fillStyle = OVERALL;
  ctx.fillRect(-8, -28, 16, 15);
  ctx.strokeStyle = OUTLINE; ctx.lineWidth = 1.2;
  ctx.strokeRect(-8, -28, 16, 15);
  // Yellow stripe
  ctx.fillStyle = '#fbbf24';
  ctx.fillRect(-8, -22, 16, 2);
  // Collar (shirt peeking)
  ctx.fillStyle = '#e5e7eb';
  ctx.fillRect(-4, -30, 8, 3);
  // Head (skin)
  ctx.fillStyle = SKIN;
  ctx.beginPath(); ctx.arc(0, -36, 6.5, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = OUTLINE; ctx.lineWidth = 1; ctx.stroke();
  // Eye (facing right in local coords, flipped above if facing left)
  ctx.fillStyle = OUTLINE;
  ctx.fillRect(2, -37, 1.5, 2);
  // Smile
  ctx.strokeStyle = OUTLINE; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.arc(2, -34, 1.8, 0.15, Math.PI - 0.15); ctx.stroke();
  // Hard hat
  ctx.fillStyle = CAP;
  ctx.beginPath();
  ctx.ellipse(0, -41, 8, 5.5, 0, Math.PI, 0);
  ctx.fill();
  ctx.fillRect(-8, -41, 16, 2);
  ctx.strokeStyle = CAP_BRIM; ctx.lineWidth = 1;
  ctx.strokeRect(-8, -41, 16, 2);
  // Hat yellow stripe
  ctx.fillStyle = '#fbbf24';
  ctx.fillRect(-8, -40, 16, 1);
  // Arm reaching to ladder — stroke from shoulder to a point on the ladder's base rail
  ctx.strokeStyle = OVERALL; ctx.lineWidth = 5; ctx.lineCap = 'round';
  // In local coords, ladder base (sbx, sby) is at (-standOff, +4). If mirrored (faceLeft), flip x sign.
  const ladderLocalX = faceLeft ? (standOff) : (-standOff);
  const ladderLocalY = +4;
  ctx.beginPath();
  ctx.moveTo(0, -24);
  ctx.lineTo(ladderLocalX, ladderLocalY - 6);
  ctx.stroke();
  // Hand
  ctx.fillStyle = SKIN;
  ctx.beginPath(); ctx.arc(ladderLocalX, ladderLocalY - 6, 3, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = OUTLINE; ctx.lineWidth = 1; ctx.stroke();
  ctx.lineCap = 'butt';

  ctx.restore();

  // Grab hint ring (only when not grabbed, pulsing faintly, during AIM phase)
  if (!L.grabbed && state.phase === PHASE.AIM) {
    const pulse = 0.5 + 0.5 * Math.sin(state.time * 0.12);
    ctx.strokeStyle = `rgba(34, 211, 238, ${0.25 + pulse * 0.2})`;
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.arc(sbx, sby - 24, 34, 0, Math.PI * 2); ctx.stroke();
    ctx.setLineDash([]);
  }
}

function drawPickups() {
  const vw = viewWidth();
  // Fast x-cull: skip pickups outside the viewport before computing bob/worldToScreen.
  const _pkMinX = state.cam.x - 80;
  const _pkMaxX = state.cam.x + vw + 80;
  PICKUPS.forEach(p => {
    if (p.taken) return;
    if (p.x < _pkMinX || p.x > _pkMaxX) return;
    // Balloons float more prominently
    const bobY = p.type === 'balloon'
      ? p.baseY + Math.sin((state.time + p._i * 30) * 0.05) * 18
      : p.y + Math.sin((state.time + p.x) * 0.08) * 3;
    const [x, y] = worldToScreen(p.x, bobY);
    if (x < -60 || x > vw + 60) return;
    if (p.type === 'coin') {
      // Glow halo (pulsing)
      const pulse = 0.7 + 0.3 * Math.sin(state.time * 0.15 + p.x);
      const glow = ctx.createRadialGradient(x, y, 2, x, y, 28);
      glow.addColorStop(0, `rgba(251,191,36,${0.55 * pulse})`);
      glow.addColorStop(1, 'rgba(251,191,36,0)');
      ctx.fillStyle = glow;
      ctx.beginPath(); ctx.arc(x, y, 28, 0, Math.PI * 2); ctx.fill();
      ctx.save();
      ctx.translate(x, y);
      const stretch = Math.abs(Math.cos(state.time * 0.1 + p.x));
      ctx.scale(stretch, 1);
      const cg = ctx.createRadialGradient(-3, -3, 1, 0, 0, 11);
      cg.addColorStop(0, '#fef3c7');
      cg.addColorStop(0.5, '#fbbf24');
      cg.addColorStop(1, '#b45309');
      ctx.fillStyle = cg;
      ctx.beginPath(); ctx.arc(0, 0, 10, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#78350f'; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.fillStyle = '#fef3c7';
      ctx.font = 'bold 12px serif';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('$', 0, 1);
      ctx.restore();
    } else if (p.type === 'star') {
      // Large pulsing glow
      const pulse = 0.75 + 0.25 * Math.sin(state.time * 0.1 + p.x);
      const glow = ctx.createRadialGradient(x, y, 4, x, y, 44);
      glow.addColorStop(0, `rgba(253,224,71,${0.6 * pulse})`);
      glow.addColorStop(0.6, 'rgba(251,146,60,0.2)');
      glow.addColorStop(1, 'rgba(251,146,60,0)');
      ctx.fillStyle = glow;
      ctx.beginPath(); ctx.arc(x, y, 44, 0, Math.PI * 2); ctx.fill();
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(Math.sin(state.time * 0.05 + p.x) * 0.2);
      const R = 16, r = 7;
      const sg = ctx.createRadialGradient(-3, -5, 2, 0, 0, 16);
      sg.addColorStop(0, '#fef3c7');
      sg.addColorStop(0.5, '#fde047');
      sg.addColorStop(1, '#fbbf24');
      ctx.fillStyle = sg;
      ctx.beginPath();
      for (let i = 0; i < 10; i++) {
        const ang = -Math.PI / 2 + i * Math.PI / 5;
        const rr = i % 2 === 0 ? R : r;
        const px = Math.cos(ang) * rr, py = Math.sin(ang) * rr;
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#78350f'; ctx.lineWidth = 2; ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.beginPath(); ctx.arc(-4, -5, 3, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    } else if (p.type === 'balloon') {
      // Balloon (pink/magenta) with string
      ctx.save();
      ctx.translate(x, y);
      // String
      ctx.strokeStyle = '#fef3c7'; ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, 18);
      ctx.quadraticCurveTo(3, 30, 0, 42);
      ctx.stroke();
      // Body
      const balloonColors = ['#ec4899', '#a855f7', '#3b82f6', '#10b981', '#f97316'];
      const col = balloonColors[p._i % balloonColors.length];
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.ellipse(0, 0, 16, 20, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 2; ctx.stroke();
      // Knot
      ctx.fillStyle = '#0f172a';
      ctx.beginPath(); ctx.moveTo(-3, 18); ctx.lineTo(3, 18); ctx.lineTo(0, 22); ctx.closePath(); ctx.fill();
      // Highlight
      ctx.fillStyle = 'rgba(255,255,255,0.45)';
      ctx.beginPath(); ctx.ellipse(-5, -7, 4, 7, -0.3, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    } else if (p.type === 'nitro') {
      // Nitro canister — red/orange with flame
      ctx.save();
      ctx.translate(x, y);
      const pulse = 1 + Math.sin(state.time * 0.2 + p._i) * 0.08;
      ctx.scale(pulse, pulse);
      // Glow
      const glow = ctx.createRadialGradient(0, 0, 4, 0, 0, 26);
      glow.addColorStop(0, 'rgba(239,68,68,0.6)');
      glow.addColorStop(1, 'rgba(239,68,68,0)');
      ctx.fillStyle = glow;
      ctx.beginPath(); ctx.arc(0, 0, 26, 0, Math.PI * 2); ctx.fill();
      // Canister body (rounded rect)
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.roundRect(-10, -16, 20, 26, 4);
      ctx.fill();
      ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 2; ctx.stroke();
      // Cap
      ctx.fillStyle = '#1f2937';
      ctx.fillRect(-6, -20, 12, 5);
      // Label
      ctx.fillStyle = '#fef3c7';
      ctx.font = 'bold 9px "Courier New", monospace';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('N', 0, -2);
      // Flame burst behind
      ctx.fillStyle = '#fbbf24';
      const ft = state.time * 0.15 + p._i;
      ctx.beginPath();
      ctx.moveTo(0, 11);
      ctx.quadraticCurveTo(-6, 16 + Math.sin(ft) * 2, 0, 22 + Math.sin(ft) * 3);
      ctx.quadraticCurveTo(6, 16 + Math.cos(ft) * 2, 0, 11);
      ctx.fill();
      ctx.restore();
    } else if (p.type === 'airjump') {
      // Airjump — blue parachute with up-arrow
      ctx.save();
      ctx.translate(x, y);
      const pulse = 1 + Math.sin(state.time * 0.18 + p._i) * 0.1;
      const bob = Math.sin(state.time * 0.08 + p._i * 0.5) * 3;
      ctx.translate(0, bob);
      ctx.scale(pulse, pulse);
      // Glow
      const glow = ctx.createRadialGradient(0, 0, 4, 0, 0, 28);
      glow.addColorStop(0, 'rgba(96,165,250,0.55)');
      glow.addColorStop(1, 'rgba(96,165,250,0)');
      ctx.fillStyle = glow;
      ctx.beginPath(); ctx.arc(0, 0, 28, 0, Math.PI * 2); ctx.fill();
      // Parachute dome (half-circle)
      ctx.fillStyle = '#60a5fa';
      ctx.beginPath();
      ctx.moveTo(-14, 0);
      ctx.quadraticCurveTo(0, -22, 14, 0);
      ctx.lineTo(14, 2);
      ctx.lineTo(-14, 2);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#1e3a8a'; ctx.lineWidth = 2; ctx.stroke();
      // Parachute panels
      ctx.strokeStyle = '#1e40af';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-8, -2); ctx.lineTo(-6, -16);
      ctx.moveTo(0, -2);  ctx.lineTo(0, -20);
      ctx.moveTo(8, -2);  ctx.lineTo(6, -16);
      ctx.stroke();
      // Strings
      ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(-12, 1); ctx.lineTo(-3, 14);
      ctx.moveTo(-5, 1);  ctx.lineTo(-1, 14);
      ctx.moveTo(5, 1);   ctx.lineTo(1, 14);
      ctx.moveTo(12, 1);  ctx.lineTo(3, 14);
      ctx.stroke();
      // Up-arrow badge
      ctx.fillStyle = '#fde68a';
      ctx.beginPath();
      ctx.moveTo(0, 8); ctx.lineTo(-5, 16); ctx.lineTo(-2, 16);
      ctx.lineTo(-2, 20); ctx.lineTo(2, 20); ctx.lineTo(2, 16);
      ctx.lineTo(5, 16);
      ctx.closePath(); ctx.fill();
      ctx.strokeStyle = '#78350f'; ctx.lineWidth = 1; ctx.stroke();
      ctx.restore();
    } else if (p.type === 'power') {
      // Power booster — amber battery with lightning bolt
      ctx.save();
      ctx.translate(x, y);
      const pulse = 1 + Math.sin(state.time * 0.22 + p._i) * 0.1;
      const bob = Math.sin(state.time * 0.09 + p._i * 0.6) * 3;
      ctx.translate(0, bob);
      ctx.scale(pulse, pulse);
      // Glow
      const glow = ctx.createRadialGradient(0, 0, 4, 0, 0, 28);
      glow.addColorStop(0, 'rgba(251,191,36,0.65)');
      glow.addColorStop(1, 'rgba(251,191,36,0)');
      ctx.fillStyle = glow;
      ctx.beginPath(); ctx.arc(0, 0, 28, 0, Math.PI * 2); ctx.fill();
      // Battery body
      const bg = ctx.createLinearGradient(0, -16, 0, 16);
      bg.addColorStop(0, '#fde047');
      bg.addColorStop(0.5, '#fbbf24');
      bg.addColorStop(1, '#b45309');
      ctx.fillStyle = bg;
      ctx.beginPath(); ctx.roundRect(-11, -14, 22, 26, 4); ctx.fill();
      ctx.strokeStyle = '#78350f'; ctx.lineWidth = 2; ctx.stroke();
      // Battery nub
      ctx.fillStyle = '#78350f';
      ctx.fillRect(-5, -18, 10, 4);
      // Lightning bolt
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.moveTo(-3, -8);
      ctx.lineTo(3, -2);
      ctx.lineTo(-1, -1);
      ctx.lineTo(4, 8);
      ctx.lineTo(-2, 2);
      ctx.lineTo(2, 1);
      ctx.closePath();
      ctx.fill();
      // Highlight
      ctx.fillStyle = 'rgba(255,255,255,0.35)';
      ctx.beginPath(); ctx.ellipse(-6, -6, 3, 6, -0.3, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    } else if (p.type === 'bomb') {
      // Bomb pickup — black sphere with a lit fuse and red sparks
      ctx.save();
      ctx.translate(x, y);
      const pulse = 1 + Math.sin(state.time * 0.22 + p._i) * 0.08;
      const bob = Math.sin(state.time * 0.09 + p._i * 0.6) * 3;
      ctx.translate(0, bob);
      ctx.scale(pulse, pulse);
      // Glow
      const glow = ctx.createRadialGradient(0, 0, 4, 0, 0, 28);
      glow.addColorStop(0, 'rgba(239,68,68,0.55)');
      glow.addColorStop(1, 'rgba(239,68,68,0)');
      ctx.fillStyle = glow;
      ctx.beginPath(); ctx.arc(0, 0, 28, 0, Math.PI * 2); ctx.fill();
      // Body
      const bg = ctx.createRadialGradient(-4, -4, 2, 0, 0, 14);
      bg.addColorStop(0, '#475569');
      bg.addColorStop(1, '#0f172a');
      ctx.fillStyle = bg;
      ctx.beginPath(); ctx.arc(0, 2, 12, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#020617'; ctx.lineWidth = 1.5; ctx.stroke();
      // Highlight
      ctx.fillStyle = 'rgba(255,255,255,0.35)';
      ctx.beginPath(); ctx.ellipse(-4, -2, 3, 5, -0.3, 0, Math.PI * 2); ctx.fill();
      // Fuse cap
      ctx.fillStyle = '#78350f';
      ctx.fillRect(-3, -12, 6, 4);
      // Fuse wire
      ctx.strokeStyle = '#d97706'; ctx.lineWidth = 2;
      const ft = state.time * 0.25 + p._i;
      ctx.beginPath();
      ctx.moveTo(0, -12);
      ctx.quadraticCurveTo(5 + Math.sin(ft) * 2, -16, 3, -20);
      ctx.stroke();
      // Spark at fuse tip
      const sparkR = 2 + Math.sin(ft * 2) * 1.2;
      ctx.fillStyle = '#fde047';
      ctx.beginPath(); ctx.arc(3, -20, sparkR, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath(); ctx.arc(3, -20, sparkR * 0.5, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    } else if (p.type === 'magnet') {
      // Magnet — purple horseshoe magnet
      ctx.save();
      ctx.translate(x, y);
      const pulse = 1 + Math.sin(state.time * 0.2 + p._i) * 0.1;
      const bob = Math.sin(state.time * 0.09 + p._i * 0.5) * 3;
      ctx.translate(0, bob);
      ctx.scale(pulse, pulse);
      // Glow
      const glow = ctx.createRadialGradient(0, 0, 4, 0, 0, 28);
      glow.addColorStop(0, 'rgba(168,85,247,0.6)');
      glow.addColorStop(1, 'rgba(168,85,247,0)');
      ctx.fillStyle = glow;
      ctx.beginPath(); ctx.arc(0, 0, 28, 0, Math.PI * 2); ctx.fill();
      // Horseshoe body (U-shape)
      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 8;
      ctx.lineCap = 'butt';
      ctx.beginPath();
      ctx.arc(0, 0, 10, Math.PI, Math.PI * 2, false);
      ctx.stroke();
      // Dark outline
      ctx.strokeStyle = '#4c1d95';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 0, 6, Math.PI, Math.PI * 2, false);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, 14, Math.PI, Math.PI * 2, false);
      ctx.stroke();
      // Legs (going down)
      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(-10, 0); ctx.lineTo(-10, 10);
      ctx.moveTo(10, 0);  ctx.lineTo(10, 10);
      ctx.stroke();
      // Pole tips (N/S silver caps)
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(-14, 8, 8, 5);
      ctx.fillRect(6, 8, 8, 5);
      ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 1;
      ctx.strokeRect(-14, 8, 8, 5);
      ctx.strokeRect(6, 8, 8, 5);
      // N / S labels
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 7px "Courier New", monospace';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('N', -10, 10.5);
      ctx.fillText('S', 10, 10.5);
      // Attraction sparks
      const sp = state.time * 0.2 + p._i;
      ctx.strokeStyle = '#f0abfc';
      ctx.lineWidth = 1.2;
      for (let k = 0; k < 3; k++) {
        const sa = sp + k * 2.1;
        ctx.beginPath();
        ctx.moveTo(Math.cos(sa) * 18, Math.sin(sa) * 18 - 4);
        ctx.lineTo(Math.cos(sa) * 22, Math.sin(sa) * 22 - 4);
        ctx.stroke();
      }
      ctx.restore();
    } else if (p.type === 'shield') {
      // Shield pickup — cyan shield emblem
      ctx.save();
      ctx.translate(x, y);
      const pulse = 1 + Math.sin(state.time * 0.2 + p._i) * 0.08;
      const bob = Math.sin(state.time * 0.09 + p._i * 0.5) * 3;
      ctx.translate(0, bob);
      ctx.scale(pulse, pulse);
      // Glow
      const glow = ctx.createRadialGradient(0, 0, 4, 0, 0, 30);
      glow.addColorStop(0, 'rgba(34,211,238,0.6)');
      glow.addColorStop(1, 'rgba(34,211,238,0)');
      ctx.fillStyle = glow;
      ctx.beginPath(); ctx.arc(0, 0, 30, 0, Math.PI * 2); ctx.fill();
      // Shield body
      const sg = ctx.createLinearGradient(0, -14, 0, 14);
      sg.addColorStop(0, '#67e8f9');
      sg.addColorStop(1, '#0891b2');
      ctx.fillStyle = sg;
      ctx.beginPath();
      ctx.moveTo(0, -14);
      ctx.lineTo(13, -9);
      ctx.lineTo(13, 4);
      ctx.quadraticCurveTo(10, 14, 0, 18);
      ctx.quadraticCurveTo(-10, 14, -13, 4);
      ctx.lineTo(-13, -9);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#155e75'; ctx.lineWidth = 1.5; ctx.stroke();
      // Cross / emblem
      ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 2.4; ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(0, -8); ctx.lineTo(0, 8);
      ctx.moveTo(-7, 0); ctx.lineTo(7, 0);
      ctx.stroke();
      // Highlight
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.beginPath(); ctx.ellipse(-5, -6, 3, 6, -0.3, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    } else if (p.type === 'medkit') {
      // Medkit pickup — white box with red cross
      ctx.save();
      ctx.translate(x, y);
      const pulse = 1 + Math.sin(state.time * 0.18 + p._i) * 0.07;
      const bob = Math.sin(state.time * 0.09 + p._i * 0.5) * 3;
      ctx.translate(0, bob);
      ctx.scale(pulse, pulse);
      // Glow
      const glow = ctx.createRadialGradient(0, 0, 4, 0, 0, 28);
      glow.addColorStop(0, 'rgba(34,197,94,0.55)');
      glow.addColorStop(1, 'rgba(34,197,94,0)');
      ctx.fillStyle = glow;
      ctx.beginPath(); ctx.arc(0, 0, 28, 0, Math.PI * 2); ctx.fill();
      // Box body
      const bg = ctx.createLinearGradient(0, -14, 0, 14);
      bg.addColorStop(0, '#ffffff');
      bg.addColorStop(1, '#e5e7eb');
      ctx.fillStyle = bg;
      ctx.fillRect(-14, -12, 28, 24);
      ctx.strokeStyle = '#9ca3af';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(-14, -12, 28, 24);
      // Lid line
      ctx.strokeStyle = '#9ca3af';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(-14, -6); ctx.lineTo(14, -6); ctx.stroke();
      // Red cross
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(-2, -8, 4, 16);
      ctx.fillRect(-8, -2, 16, 4);
      // Highlight
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.fillRect(-12, -10, 4, 3);
      ctx.restore();
    }
  });
}

// ====== TORNADOS (öken-only) ======
// Lifecycle: GROW (~120 frames, scale 0.2→1.0) → ACTIVE (360-540 frames, full size, drift)
//          → SHRINK (~120 frames, scale 1.0→0) → despawn.
// Effekten på tiren = stark uppåtsug + slumpmässiga sidokrafter (chaos), spinner upp tiren.
function spawnTornado() {
  if (!state.tire) return;
  // Försök spawna 400-1000px framför tiren. Om utanför desert: prova kortare
  // avstånd ner till 200px, annars bakom tiren. Garanterar att tornadon faktiskt visas.
  let aheadX = state.tire.x + 400 + Math.random() * 600;
  if (biomeAt(aheadX) !== 0) {
    // Sök närmare position som fortfarande är i desert
    const candidates = [
      state.tire.x + 250 + Math.random() * 200,
      state.tire.x + 150,
      state.tire.x - 200 - Math.random() * 200,
    ];
    aheadX = candidates.find(x => biomeAt(x) === 0);
    if (aheadX == null) return;
  }
  const groundY = terrainAt(aheadX);
  state.tornados.push({
    x: aheadX,
    y: groundY,                       // basen står på marken
    height: 220 + Math.random() * 80, // 220-300px hög
    radius: 60 + Math.random() * 20,  // 60-80px bred topp
    scale: 0.2,
    phase: 'grow',                    // grow → active → shrink
    phaseT: 0,
    growDur: 120,
    activeDur: 360 + Math.floor(Math.random() * 180),  // 6-9s @ 60fps
    shrinkDur: 120,
    rot: 0,
    drift: (Math.random() < 0.5 ? -1 : 1) * (0.4 + Math.random() * 0.6),  // px/frame
    wobblePhase: Math.random() * Math.PI * 2,
    hitTire: false,                   // har redan gett bonuspoäng?
  });
  // Spawn-FX
  addParticles(aheadX, groundY, '#a78bfa', 18, { up: 4, spread: 8, size: 3 });
  addParticles(aheadX, groundY, '#fef3c7', 12, { up: 3, spread: 6, size: 2 });
  tone(180, 0.4, 'sawtooth', 0.06, -120);
}

// Debug: knapp för att spawna åskmoln. Tornado-knappen togs bort i v118
// (tornadosystemet är kvar och spawnar automatiskt i öken).
(function injectWaterDebugBtn() {
  // Rensa gamla debug-knappar (tornado, storm) som ligger kvar från äldre cache
  ['btnDebugTornado', 'btnDebugStorm'].forEach(id => {
    const old = document.getElementById(id);
    if (old) old.remove();
  });
  if (document.getElementById('btnDebugWater')) return;
  const btn = document.createElement('button');
  btn.id = 'btnDebugWater';
  btn.type = 'button';
  btn.textContent = '💧';
  btn.title = 'Spawna vattenhål (debug)';
  btn.style.cssText = [
    'position:fixed',
    'top:96px',
    'right:12px',
    'z-index:9999',
    'width:48px',
    'height:48px',
    'border-radius:50%',
    'border:2px solid #38bdf8',
    'background:rgba(12, 74, 110, 0.92)',
    'color:#fff',
    'font-size:24px',
    'box-shadow:0 4px 12px rgba(0,0,0,0.4)',
    'cursor:pointer',
    'display:flex',
    'align-items:center',
    'justify-content:center',
  ].join(';');
  btn.addEventListener('click', () => window.debugSpawnWater && window.debugSpawnWater());
  document.body.appendChild(btn);
})();

// Debug: force-spawn ett vattenhål precis framför hjulet.
window.debugSpawnWater = function () {
  if (!state.tire) {
    flashToast('💧 Skjut iväg först', '#ef4444');
    return;
  }
  const t = state.tire;
  const ox = t.x + 350;            // ~350 enheter framför hjulet
  const w = 140;                    // bred pool
  const depth = 26;
  // Sänk terrängen i vattenhålets bredd så poolen sitter i en sänka
  const baseY = terrainAt(ox + w * 0.5);
  const surfaceY = baseY + depth;
  // Mutera TERRAIN: ta bort kontrollpunkter inuti och lägg två i kanten på samma y
  TERRAIN = TERRAIN.filter(p => p[0] <= ox - 40 || p[0] >= ox + w + 40);
  TERRAIN.push([ox - 40, surfaceY]);
  TERRAIN.push([ox + w + 40, surfaceY]);
  TERRAIN.sort((a, b) => a[0] - b[0]);
  OBSTACLES.push({ type: 'water', x: ox, w, depth, surfaceY, shimmer: Math.random() * Math.PI * 2 });
  addParticles(ox + w / 2, surfaceY, '#38bdf8', 22, { up: 4, spread: 10, size: 4 });
  flashToast('💧 VATTENHÅL FRAMÅT!', '#38bdf8');
  tone(220, 0.2, 'sine', 0.12, -200);
};

// Bakåtkompat: gamla SW-cachade index.html kan fortfarande peka på debugSpawnStorm-namnet.
window.debugSpawnStorm = window.debugSpawnWater;

function updateTornados() {
  if (state.phase !== PHASE.FLY) return;
  // Spawn-roll: bara om tiren är i öken och inga tornados aktiva.
  state.tornadoSpawnT--;
  if (state.tornadoSpawnT <= 0 && state.tornados.length === 0 && state.tire && biomeAt(state.tire.x) === 0) {
    // Hög chans (80%) per roll — vill säkra att en tornado dyker upp under öken-passagen.
    if (Math.random() < 0.8) spawnTornado();
    state.tornadoSpawnT = 180 + Math.floor(Math.random() * 180); // 3-6s mellan rolls
  }
  for (let i = state.tornados.length - 1; i >= 0; i--) {
    const tn = state.tornados[i];
    tn.phaseT++;
    tn.rot += 0.25;
    tn.wobblePhase += 0.04;
    if (tn.phase === 'grow') {
      tn.scale = 0.2 + 0.8 * (tn.phaseT / tn.growDur);
      if (tn.phaseT >= tn.growDur) { tn.phase = 'active'; tn.phaseT = 0; tn.scale = 1.0; }
    } else if (tn.phase === 'active') {
      tn.scale = 1.0;
      // Drift horisontellt, men håll dig inom desert-biome
      tn.x += tn.drift;
      if (biomeAt(tn.x) !== 0) tn.drift *= -1;  // studsa tillbaka vid biome-gräns
      if (tn.phaseT >= tn.activeDur) { tn.phase = 'shrink'; tn.phaseT = 0; }
      // Spiral-partiklar runt tornadon
      if (state.time % 2 === 0) {
        const tr = tn.radius * tn.scale;
        for (let p = 0; p < 3; p++) {
          const ang = tn.rot + (p / 3) * Math.PI * 2;
          const yOff = -Math.random() * tn.height * tn.scale;
          const r = tr * (1 - Math.abs(yOff) / (tn.height * tn.scale + 1) * 0.5);
          state.particles.push({
            x: tn.x + Math.cos(ang) * r,
            y: tn.y + yOff,
            vx: -Math.sin(ang) * 4 + (Math.random() - 0.5),
            vy: -1.2 - Math.random() * 1.5,
            life: 30, max: 30,
            color: `rgba(180, 160, 130, ${0.4 + Math.random() * 0.3})`,
            size: 2 + Math.random() * 2,
            g: 0, shape: 'square',
          });
        }
      }
    } else if (tn.phase === 'shrink') {
      tn.scale = Math.max(0, 1.0 - tn.phaseT / tn.shrinkDur);
      if (tn.phaseT >= tn.shrinkDur) {
        addParticles(tn.x, tn.y, '#a78bfa', 14, { up: 3, spread: 8, size: 2 });
        tone(120, 0.3, 'sine', 0.05, -80);
        state.tornados.splice(i, 1);
        continue;
      }
    }
    // Wobble-x för organisk rörelse
    tn.renderX = tn.x + Math.sin(tn.wobblePhase) * 6;
  }
}

function applyTornadoForces() {
  if (state.phase !== PHASE.FLY || !state.tire || state.tornados.length === 0) return;
  const t = state.tire;
  const TS = state.timeScale || 1;
  for (const tn of state.tornados) {
    if (tn.scale < 0.3) continue; // för liten för effekt
    const cx = tn.renderX || tn.x;
    const topY = tn.y - tn.height * tn.scale;
    // Inverkan: kontrollera om tiren är i tornadons cylinder.
    const dx = t.x - cx;
    const yFromBase = tn.y - t.y;  // hur högt tiren är över marken vid tornadon
    if (yFromBase < -20 || yFromBase > tn.height * tn.scale + 60) continue;
    const localFrac = Math.max(0, Math.min(1, yFromBase / (tn.height * tn.scale)));
    const localR = tn.radius * tn.scale * (0.5 + localFrac * 0.5); // smalare nedtill, bredare upptill
    if (Math.abs(dx) > localR + TIRE_R + 30) continue;
    // Inom tornadons grepp!
    const grip = Math.max(0, 1 - Math.abs(dx) / (localR + TIRE_R + 30));
    // Stark uppåt-sug
    t.vy -= (1.4 + grip * 1.6) * TS;
    // Slumpmässig sidokraft (chaos)
    t.vx += ((Math.random() - 0.5) * 6 + (cx - t.x) * 0.04) * grip * TS;
    // Spin-up
    t.vrot += (Math.random() - 0.5) * 0.6 * grip;
    // Cap så vi inte slänger tiren orealistiskt långt
    const sp = Math.hypot(t.vx, t.vy);
    if (sp > 30) { t.vx *= 30 / sp; t.vy *= 30 / sp; }
    // Bonuspoäng vid första kontakt
    if (!tn.hitTire) {
      tn.hitTire = true;
      awardScore(500, '🌪️ TORNADO!', '#a78bfa');
      bumpMult(0.8);
      shake(14);
      tone(220, 0.18, 'sawtooth', 0.16, -200);
      addParticles(t.x, t.y, '#a78bfa', 20, { up: 5, spread: 9, size: 3 });
    }
  }
}

function drawTornados() {
  for (const tn of state.tornados) {
    if (tn.scale <= 0) continue;
    const wx = tn.renderX || tn.x;
    const wy = tn.y;
    const h = tn.height * tn.scale;
    const fontPx = h * 1.0;
    // Konvertera världs- till skärmkoordinater (canvas har shake+zoom, ej kameraoffset).
    const [sx, sy] = worldToScreen(wx, wy - h * 0.5);
    ctx.save();
    ctx.translate(sx, sy);
    const wobble = Math.sin(tn.rot * 0.5) * 0.08;
    ctx.rotate(wobble);
    ctx.font = `${Math.max(20, Math.round(fontPx))}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(0,0,0,0.35)';
    ctx.fillText('🌪️', 4, 6);
    ctx.fillStyle = '#fff';
    ctx.fillText('🌪️', 0, 0);
    ctx.restore();
  }
}

// ====== BIRDS 🐦 ======
function spawnBirdFlock(forceX) {
  if (!state.tire) return;
  const baseX = forceX != null ? forceX
    : state.tire.x + 600 + Math.random() * 400;
  const groundY = terrainAt(baseX);
  const flightY = groundY - 200 - Math.random() * 200; // ovanför hustaken
  const flockSize = 2 + Math.floor(Math.random() * 3); // 2-4 fåglar
  // Riktning: 60% mot hjulet (left), 40% med hjulet (right)
  const dir = Math.random() < 0.6 ? -1 : 1;
  const speed = (1.0 + Math.random() * 1.4) * dir;
  const phaseOffset = Math.random() * Math.PI * 2;
  for (let i = 0; i < flockSize; i++) {
    state.birds.push({
      x: baseX + i * (30 + Math.random() * 20) * (dir > 0 ? -1 : 1),
      baseY: flightY + i * 8,
      y: flightY,
      vx: speed,
      phase: phaseOffset + i * 0.4,
      wing: Math.random() * Math.PI * 2,
      hit: false,
      gone: false,
      flapSpeed: 0.25 + Math.random() * 0.1,
    });
  }
}

function updateBirds() {
  if (state.phase !== PHASE.FLY) return;
  state.birdSpawnT--;
  if (state.birdSpawnT <= 0 && state.tire) {
    spawnBirdFlock();
    state.birdSpawnT = 180 + Math.floor(Math.random() * 360); // 3-9s mellan flockar
  }
  const TS = state.timeScale || 1;
  const camLeft = state.cam.x - 200;
  const camRight = state.cam.x + W / (state.cam.zoom || 1) + 400;
  for (let i = state.birds.length - 1; i >= 0; i--) {
    const b = state.birds[i];
    if (b.gone) {
      // skadad fågel: faller och försvinner
      b.vy = (b.vy || 0) + 0.25 * TS;
      b.x += b.vx * TS;
      b.y += b.vy * TS;
      b.wing += 0.5 * TS;
      if (b.y > terrainAt(b.x) - 5) state.birds.splice(i, 1);
      continue;
    }
    b.x += b.vx * TS;
    b.wing += b.flapSpeed * TS;
    // Sinusvåg vertikalt
    b.y = b.baseY + Math.sin(state.time * 0.06 + b.phase) * 22;
    // Despawna när långt utanför vy
    if (b.x < camLeft || b.x > camRight + 600) {
      state.birds.splice(i, 1);
      continue;
    }
    // Kollision med hjulet
    if (state.tire && !b.hit) {
      const dx = state.tire.x - b.x;
      const dy = state.tire.y - b.y;
      if (Math.hypot(dx, dy) < TIRE_R + 14) {
        b.hit = true;
        b.gone = true;
        b.vx *= 0.4;
        b.vy = -2;
        // Liten knockback på hjulet
        const t = state.tire;
        t.vx += dx > 0 ? 1.2 : -1.2;
        t.vy -= 1.0;
        // Fjäder-partiklar
        for (let p = 0; p < 8; p++) {
          state.particles.push({
            x: b.x, y: b.y,
            vx: (Math.random() - 0.5) * 5,
            vy: -1 - Math.random() * 3,
            life: 60, max: 60,
            color: `rgba(255, 255, 255, ${0.7 + Math.random() * 0.3})`,
            size: 2 + Math.random() * 2,
            g: 0.05, shape: 'square',
          });
        }
        awardScore(10, '🪶 PUFF!', '#fef3c7');
        tone(620, 0.12, 'square', 0.08, 80);
        // Liten skada 5-10%
        damageTire(5, 10, '🐦 FÅGEL');
      }
    }
  }
}

function drawBirds() {
  for (const b of state.birds) {
    const [sx, sy] = worldToScreen(b.x, b.y);
    ctx.save();
    ctx.translate(sx, sy);
    if (b.gone) {
      ctx.rotate(Math.sin(b.wing) * 0.6);
      ctx.globalAlpha = 0.85;
    } else {
      // Liten flap-baserad lutning
      ctx.rotate(Math.sin(b.wing) * 0.12 + (b.vx < 0 ? 0 : 0));
    }
    // Spegelvänd om åker höger (så näbben pekar i färdriktning)
    if (b.vx > 0) ctx.scale(-1, 1);
    ctx.font = '20px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.fillText('🐦', 2, 3);
    ctx.fillStyle = '#fff';
    ctx.fillText('🐦', 0, 0);
    ctx.restore();
  }
}

// ====== PENGUINS 🐧 (isbiomen — markvarande "fågelflock") ======
function spawnPenguinFlock(forceX) {
  if (!state.tire) return;
  const baseX = forceX != null ? forceX
    : state.tire.x + 700 + Math.random() * 500;
  // Bara på isbiomen
  if (biomeAt(baseX) !== 3) return;
  const flockSize = 3 + Math.floor(Math.random() * 3); // 3-5 pingviner
  // Pingviner går alltid mot hjulet (motrörelse) — våglik vaggande gång
  const dir = state.tire.x < baseX ? -1 : 1;
  const speed = (0.6 + Math.random() * 0.5) * dir;
  for (let i = 0; i < flockSize; i++) {
    const px = baseX + i * (32 + Math.random() * 14) * (dir > 0 ? -1 : 1);
    state.penguins.push({
      x: px,
      vx: speed + (Math.random() - 0.5) * 0.2,
      waddle: Math.random() * Math.PI * 2,
      waddleSpeed: 0.18 + Math.random() * 0.06,
      hit: false,
      gone: false,
      vy: 0,
    });
  }
}

function updatePenguins() {
  if (state.phase !== PHASE.FLY) return;
  state.penguinSpawnT--;
  if (state.penguinSpawnT <= 0 && state.tire) {
    // Bara om hjulet är på isbiomen ELLER närmar sig den
    if (biomeAt(state.tire.x + 600) === 3) {
      spawnPenguinFlock();
    }
    state.penguinSpawnT = 240 + Math.floor(Math.random() * 360); // 4-10s
  }
  const TS = state.timeScale || 1;
  const camLeft = state.cam.x - 200;
  const camRight = state.cam.x + W / (state.cam.zoom || 1) + 400;
  const t = state.tire;
  for (let i = state.penguins.length - 1; i >= 0; i--) {
    const p = state.penguins[i];
    if (p.gone) {
      p.vy += 0.4 * TS;
      p.x += p.vx * TS;
      p.y = (p.y || terrainAt(p.x) - 18) + p.vy * TS;
      p.waddle += 0.3 * TS;
      const gy = terrainAt(p.x);
      if (p.y > gy - 4) state.penguins.splice(i, 1);
      continue;
    }
    p.x += p.vx * TS;
    p.waddle += p.waddleSpeed * TS;
    if (p.x < camLeft - 200 || p.x > camRight + 600) {
      state.penguins.splice(i, 1);
      continue;
    }
    // Kollision med hjulet — pingvinen står på marken, hjulet kan rulla över eller flyga in
    if (t && !p.hit) {
      const groundY = terrainAt(p.x);
      const px = p.x;
      const py = groundY - 18; // pingvinens "head"-höjd
      const dx = t.x - px;
      const dy = t.y - py;
      if (Math.hypot(dx, dy) < TIRE_R + 16) {
        p.hit = true;
        p.gone = true;
        p.y = py;
        p.vy = -3;
        p.vx *= 0.3;
        // Hjulet får en liten knockback + lite skada
        t.vx += dx > 0 ? 1.5 : -1.5;
        t.vy -= 1.4;
        addParticles(px, py, '#ffffff', 14, { up: 4, spread: 6, size: 3 });
        addParticles(px, py, '#0c4a6e', 10, { up: 3, spread: 5, size: 3 });
        awardScore(40, '🐧 BOWLING!', '#bae6fd');
        tone(540, 0.12, 'square', 0.1, 80);
        damageTire(3, 8, '🐧 PINGVIN');
      }
    }
  }
}

function drawPenguins() {
  for (const p of state.penguins) {
    const groundY = terrainAt(p.x);
    const baseY = p.gone && p.y != null ? p.y : groundY - 18;
    const [sx, sy] = worldToScreen(p.x, baseY);
    ctx.save();
    ctx.translate(sx, sy);
    if (p.gone) {
      ctx.rotate(Math.sin(p.waddle) * 0.7);
      ctx.globalAlpha = 0.85;
    } else {
      // Vaggande gång
      ctx.rotate(Math.sin(p.waddle) * 0.18);
    }
    if (p.vx > 0) ctx.scale(-1, 1);
    ctx.font = '24px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.fillText('🐧', 2, 3);
    ctx.fillStyle = '#fff';
    ctx.fillText('🐧', 0, 0);
    ctx.restore();
  }
}

// ====== FREEZING WIND ❄️ (isbiomen — periodisk bakåt-knuff) ======
function updateFreezeWind() {
  if (state.phase !== PHASE.FLY || !state.tire) return;
  // Bara på isbiomen
  if (biomeAt(state.tire.x) !== 3) {
    state.freezeWind = 0;
    state.freezeWindT = 0;
    return;
  }
  if (state.freezeWind > 0) {
    state.freezeWind--;
    state.freezeWindT++;
    // Bakåt-kraft + kall partikelström. Sköld blockar inte (det är ren fysik).
    const t = state.tire;
    const intensity = Math.min(1, state.freezeWindT / 30) * Math.min(1, state.freezeWind / 30);
    t.vx -= (0.45 + Math.random() * 0.15) * intensity * (state.timeScale || 1);
    t.vy += (Math.random() - 0.7) * 0.25 * intensity * (state.timeScale || 1);
    // Snöflingor som blåser från höger till vänster framför hjulet
    if (Math.random() < 0.6 * intensity) {
      const sx = t.x + 200 + Math.random() * 200;
      const sy = t.y - 80 + Math.random() * 200;
      state.particles.push({
        x: sx, y: sy,
        vx: -(7 + Math.random() * 4),
        vy: -1 + Math.random() * 2,
        life: 50, max: 50,
        color: `rgba(224, 242, 254, ${0.6 + Math.random() * 0.3})`,
        size: 2 + Math.random() * 2,
        g: 0.02, shape: 'square',
      });
    }
    if (state.freezeWind === 0) {
      state.freezeWindT = 0;
      state.freezeWindNextT = 480 + Math.floor(Math.random() * 480); // 8-16s tills nästa
    }
    return;
  }
  state.freezeWindNextT--;
  if (state.freezeWindNextT <= 0) {
    state.freezeWind = 180 + Math.floor(Math.random() * 120); // 3-5s aktiv
    state.freezeWindT = 0;
    flashToast('❄️ FRYSANDE VIND!', '#bae6fd');
    tone(180, 0.6, 'sawtooth', 0.08, -200);
  }
}

function drawFreezeWind() {
  if (state.freezeWind <= 0) return;
  const intensity = Math.min(1, state.freezeWindT / 30) * Math.min(1, state.freezeWind / 30);
  // Vit-blå tonad overlay i kanterna
  ctx.save();
  ctx.globalAlpha = 0.18 * intensity;
  const grad = ctx.createLinearGradient(W, 0, 0, 0);
  grad.addColorStop(0, 'rgba(186,230,253,0.9)');
  grad.addColorStop(0.4, 'rgba(186,230,253,0.25)');
  grad.addColorStop(1, 'rgba(186,230,253,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);
  ctx.globalAlpha = 1;
  ctx.restore();
}

// ====== FIREBALLS 🔥 (vulkanen — eldbollar regnar slumpmässigt) ======
function spawnFireball(forceX) {
  if (!state.tire) return;
  const t = state.tire;
  // Spawna framför hjulet, inte direkt ovanpå (ska kunna undvikas).
  const cx = forceX != null ? forceX
    : t.x + 250 + Math.random() * 600;
  // Bara om mål-x är på vulkanen
  if (biomeAt(cx) !== 4) return;
  const groundY = terrainAt(cx);
  // Spawn-höjd: högt upp så spelaren ser den falla. Lite vinkel.
  const startY = groundY - 700 - Math.random() * 200;
  const driftX = (Math.random() - 0.5) * 1.6;
  state.fireballs.push({
    x: cx + driftX * 30,
    y: startY,
    vx: driftX,
    vy: 7 + Math.random() * 3,
    r: 14 + Math.random() * 6,
    rot: Math.random() * Math.PI * 2,
    vrot: (Math.random() - 0.5) * 0.16,
    trailT: 0,
    targetX: cx,
    targetGroundY: groundY,
  });
  tone(220, 0.18, 'sawtooth', 0.08, -200);
}

function updateFireballs() {
  if (state.phase !== PHASE.FLY) return;
  const TS = state.timeScale || 1;
  // Spawna bara om hjulet är på vulkanen ELLER närmar sig den
  if (state.tire && (biomeAt(state.tire.x) === 4 || biomeAt(state.tire.x + 600) === 4)) {
    state.fireballSpawnT--;
    if (state.fireballSpawnT <= 0) {
      // 1-3 eldbollar per "regn" — slumpmässigt klustrade
      const r = Math.random();
      const count = r < 0.55 ? 1 : r < 0.85 ? 2 : 3;
      for (let i = 0; i < count; i++) {
        spawnFireball();
      }
      // Nästa regn om ~1.5-3.5s
      state.fireballSpawnT = 90 + Math.floor(Math.random() * 120);
    }
  }
  const t = state.tire;
  for (let i = state.fireballs.length - 1; i >= 0; i--) {
    const fb = state.fireballs[i];
    fb.vy += 0.18 * TS; // svag gravitation
    fb.x += fb.vx * TS;
    fb.y += fb.vy * TS;
    fb.rot += fb.vrot * TS;
    fb.trailT++;
    // Spawn-eld-svans
    if (state.particles.length < 380 && fb.trailT % 2 === 0) {
      state.particles.push({
        x: fb.x + (Math.random() - 0.5) * 6,
        y: fb.y + (Math.random() - 0.5) * 6,
        vx: -fb.vx * 0.3 + (Math.random() - 0.5) * 0.6,
        vy: -fb.vy * 0.2 + (Math.random() - 0.5) * 0.6,
        life: 22 + Math.floor(Math.random() * 14),
        max: 36,
        color: `rgba(${Math.random() < 0.5 ? '254,240,138' : '251,146,60'},${0.55 + Math.random() * 0.35})`,
        size: 2 + Math.random() * 2,
        g: 0.04, shape: 'square',
      });
    }
    // Kollision med hjulet
    if (t && state.phase === PHASE.FLY && !state.drowning) {
      const dx = t.x - fb.x;
      const dy = t.y - fb.y;
      if (Math.hypot(dx, dy) < TIRE_R + fb.r) {
        // Stark eldskada (sköld blockar)
        addParticles(fb.x, fb.y, '#fef3c7', 24, { up: 8, spread: 10, size: 4 });
        addParticles(fb.x, fb.y, '#fb923c', 18, { up: 6, spread: 8, size: 4 });
        addParticles(fb.x, fb.y, '#dc2626', 14, { up: 5, spread: 7, size: 3 });
        shake(14); state.hitstop = 3;
        tone(180, 0.25, 'sawtooth', 0.22, -300);
        const wasShielded = state.shieldT > 0;
        const died = damageTire(25, 50, '🔥 ELDBOLL');
        if (!died && !wasShielded) {
          state.deathCause = state.deathCause || 'fireball';
        }
        if (!died) {
          // Knuffa hjulet bort
          t.vx += dx > 0 ? 4 : -4;
          t.vy -= 2;
        }
        state.fireballs.splice(i, 1);
        continue;
      }
    }
    // Mark-impakt
    const groundY = terrainAt(fb.x);
    if (fb.y > groundY) {
      // Explosion-burst
      addParticles(fb.x, groundY - 4, '#fef3c7', 26, { up: 10, spread: 14, size: 4 });
      addParticles(fb.x, groundY - 4, '#fb923c', 22, { up: 8, spread: 12, size: 4 });
      addParticles(fb.x, groundY - 4, '#dc2626', 16, { up: 6, spread: 10, size: 3 });
      addParticles(fb.x, groundY - 4, '#1f2937', 10, { up: 4, spread: 8, size: 3 });
      shake(8);
      tone(110, 0.3, 'sawtooth', 0.18, -400);
      state.fireballs.splice(i, 1);
      continue;
    }
    // Cull om för långt borta
    if (state.tire) {
      const farX = state.cam.x + viewWidth() + 700;
      const nearX = state.cam.x - 700;
      if (fb.x < nearX || fb.x > farX) {
        state.fireballs.splice(i, 1);
        continue;
      }
    }
  }
}

function drawFireballs() {
  for (const fb of state.fireballs) {
    const [sx, sy] = worldToScreen(fb.x, fb.y);
    const z = state.zoom || 1;
    const r = fb.r * z;
    ctx.save();
    ctx.translate(sx, sy);
    // Yttre glow
    const glow = ctx.createRadialGradient(0, 0, r * 0.3, 0, 0, r * 2.4);
    glow.addColorStop(0, 'rgba(254,240,138,0.85)');
    glow.addColorStop(0.4, 'rgba(251,146,60,0.55)');
    glow.addColorStop(1, 'rgba(220,38,38,0)');
    ctx.fillStyle = glow;
    ctx.beginPath(); ctx.arc(0, 0, r * 2.4, 0, Math.PI * 2); ctx.fill();
    // Eld-kärna
    const core = ctx.createRadialGradient(-r * 0.2, -r * 0.2, r * 0.1, 0, 0, r);
    core.addColorStop(0, '#ffffff');
    core.addColorStop(0.4, '#fde047');
    core.addColorStop(0.75, '#f97316');
    core.addColorStop(1, '#7f1d1d');
    ctx.fillStyle = core;
    ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.fill();
    // Yttre lågor — flickering
    ctx.rotate(fb.rot);
    ctx.fillStyle = 'rgba(254,240,138,0.7)';
    for (let i = 0; i < 5; i++) {
      const ang = (i / 5) * Math.PI * 2;
      const flickR = r * (0.6 + Math.random() * 0.3);
      ctx.beginPath();
      ctx.moveTo(Math.cos(ang) * r * 0.8, Math.sin(ang) * r * 0.8);
      ctx.quadraticCurveTo(
        Math.cos(ang + 0.2) * flickR * 1.4, Math.sin(ang + 0.2) * flickR * 1.4,
        Math.cos(ang + 0.4) * r * 0.7, Math.sin(ang + 0.4) * r * 0.7
      );
      ctx.fill();
    }
    ctx.restore();
  }
}

// ====== ASH PARTICLES 💨 (vulkanen — driftande aska i bakgrunden) ======
function updateAshParticles() {
  if (state.phase !== PHASE.FLY || !state.tire) {
    state.ashParticles = [];
    return;
  }
  const onVolcano = biomeAt(state.tire.x) === 4 || biomeAt(state.tire.x + 600) === 4;
  if (!onVolcano) {
    // Fade out befintliga om vi lämnar vulkanen
    if (state.ashParticles.length > 0) {
      state.ashParticles = state.ashParticles.filter(a => --a.life > 0);
    }
    return;
  }
  const TS = state.timeScale || 1;
  // PERF: Sänkt från 80→40, swap-pop istället för splice (O(1) remove)
  const TARGET = 40;
  while (state.ashParticles.length < TARGET) {
    const t = state.tire;
    state.ashParticles.push({
      x: t.x + (Math.random() - 0.5) * 1200,
      y: terrainAt(t.x) - 100 - Math.random() * 600,
      vx: -0.4 - Math.random() * 0.6,
      vy: -0.1 - Math.random() * 0.3,
      r: 1.2 + Math.random() * 2.6,
      life: 600 + Math.floor(Math.random() * 600),
      shade: Math.random(),
    });
  }
  const arr = state.ashParticles;
  const cullX = state.tire.x - 800;
  for (let i = arr.length - 1; i >= 0; i--) {
    const a = arr[i];
    a.x += a.vx * TS;
    a.y += a.vy * TS + Math.sin((state.time + i) * 0.04) * 0.1 * TS;
    a.life--;
    if (a.life <= 0 || a.x < cullX) {
      // Swap-pop: byt med sista och pop:a
      const last = arr.length - 1;
      if (i !== last) arr[i] = arr[last];
      arr.pop();
    }
  }
}

function drawAshParticles() {
  if (!state.ashParticles || state.ashParticles.length === 0) return;
  for (const a of state.ashParticles) {
    const [sx, sy] = worldToScreen(a.x, a.y);
    if (sx < -20 || sx > W + 20 || sy < -20 || sy > H + 20) continue;
    const grey = a.shade < 0.5 ? '15,23,42' : (a.shade < 0.85 ? '60,40,40' : '120,80,60');
    const fade = Math.min(1, a.life / 60);
    ctx.fillStyle = `rgba(${grey},${0.35 + a.shade * 0.4 * fade})`;
    ctx.beginPath();
    ctx.arc(sx, sy, a.r * (state.zoom || 1), 0, Math.PI * 2);
    ctx.fill();
  }
}

// ====== STORMS ⛈️ ======
function spawnStorm(forceX) {
  if (!state.tire) return;
  const cx = forceX != null ? forceX
    : state.tire.x + 700 + Math.random() * 600;
  const groundY = terrainAt(cx);
  const cloudY = groundY - 380; // högt upp
  state.storms.push({
    x: cx,
    y: cloudY,
    w: 220 + Math.random() * 80,   // bredd på regn-kolumn
    drift: (Math.random() < 0.5 ? -1 : 1) * (0.2 + Math.random() * 0.4),
    phase: 'grow',
    phaseT: 0,
    growDur: 90,
    activeDur: 540 + Math.floor(Math.random() * 360), // 9-15s aktiv
    shrinkDur: 120,
    scale: 0.2,
    chargeT: 0,           // ackumulerad exponering — vid >= 90 frames slår blixten
    flickerT: 0,
    nextLightningWarn: 0,
    struck: false,
    rainSeed: Math.random() * 1000,
  });
  tone(110, 0.4, 'sawtooth', 0.05, -100);
}

function updateStorms() {
  if (state.phase !== PHASE.FLY) return;
  state.stormSpawnT--;
  if (state.stormSpawnT <= 0 && state.storms.length === 0 && state.tire) {
    if (Math.random() < 0.65) {
      // Vägd kluster-storlek: oftast 1-2, sällan 4-5
      const r = Math.random();
      const count = r < 0.45 ? 1 : r < 0.75 ? 2 : r < 0.90 ? 3 : r < 0.97 ? 4 : 5;
      const baseX = state.tire.x + 700 + Math.random() * 600;
      const spacing = 260 + Math.random() * 60;
      for (let i = 0; i < count; i++) {
        spawnStorm(baseX + i * spacing);
      }
      if (count >= 3) flashToast(`⛈️ ÅSKVÄDER (${count} moln)`, '#60a5fa');
    }
    state.stormSpawnT = 750 + Math.floor(Math.random() * 450); // 12-20s mellan rolls
  }
  const TS = state.timeScale || 1;
  for (let i = state.storms.length - 1; i >= 0; i--) {
    const st = state.storms[i];
    st.phaseT++;
    st.flickerT = Math.max(0, st.flickerT - 1);
    if (st.phase === 'grow') {
      st.scale = 0.2 + 0.8 * (st.phaseT / st.growDur);
      if (st.phaseT >= st.growDur) { st.phase = 'active'; st.phaseT = 0; st.scale = 1.0; }
    } else if (st.phase === 'active') {
      st.scale = 1.0;
      st.x += st.drift * TS;
      if (st.phaseT >= st.activeDur) { st.phase = 'shrink'; st.phaseT = 0; }
      // Spawna regn-droppar i kolumnen
      const groundY = terrainAt(st.x);
      const dropsPerFrame = 4;
      for (let d = 0; d < dropsPerFrame; d++) {
        const rx = st.x + (Math.random() - 0.5) * st.w;
        const ry = st.y + 30 + Math.random() * 20;
        state.particles.push({
          x: rx, y: ry,
          vx: -0.4 + Math.random() * 0.2,
          vy: 8 + Math.random() * 3,
          life: 28, max: 28,
          color: `rgba(147, 197, 253, ${0.55 + Math.random() * 0.25})`,
          size: 1.6 + Math.random() * 0.6,
          g: 0.05, shape: 'square',
        });
      }
      // Markera marken under stormen som blöt i 6s framåt
      const wetX1 = st.x - st.w * 0.5;
      const wetX2 = st.x + st.w * 0.5;
      // Slå ihop med befintlig wetGround om de överlappar — annars push ny
      let merged = false;
      for (const wg of state.wetGrounds) {
        if (wetX1 <= wg.x2 + 30 && wetX2 >= wg.x1 - 30) {
          wg.x1 = Math.min(wg.x1, wetX1);
          wg.x2 = Math.max(wg.x2, wetX2);
          wg.until = state.time + 360; // 6s extra varje frame
          merged = true;
          break;
        }
      }
      if (!merged) state.wetGrounds.push({ x1: wetX1, x2: wetX2, until: state.time + 360 });
    } else if (st.phase === 'shrink') {
      st.scale = Math.max(0, 1.0 - st.phaseT / st.shrinkDur);
      if (st.phaseT >= st.shrinkDur) {
        state.storms.splice(i, 1);
        continue;
      }
    }
    // Slumpmässig flicker (visuell varning för stormig aktivitet)
    if (Math.random() < 0.04) st.flickerT = 4;
  }
  // Rensa gamla wet-segment
  state.wetGrounds = state.wetGrounds.filter(wg => wg.until > state.time);
  // Blixt-overlay decay
  if (state.lightningFlashT > 0) state.lightningFlashT--;
}

function applyStormEffects() {
  if (state.phase !== PHASE.FLY || !state.tire || state.storms.length === 0) return;
  const t = state.tire;
  for (const st of state.storms) {
    if (st.phase === 'shrink' || st.scale < 0.6 || st.struck) continue;
    const dx = t.x - st.x;
    // Blixt-räckvidd är 2× molnets bredd — slår även lite utanför själva regnkolumnen.
    const inXBand = Math.abs(dx) < st.w;
    const inYBand = t.y > st.y + 30; // under molnet
    if (inXBand && inYBand) {
      st.chargeT++;
      // Varning vid 30 frames (0.5s)
      if (st.chargeT === 30) {
        flashToast('⚡ FARA — UR REGNET!', '#fde047');
        tone(420, 0.18, 'square', 0.12, 60);
      }
      // Blixt vid 45 frames (0.75s)
      if (st.chargeT >= 45) {
        // Sköld blockar blixten — konsumerar en del av skölden men hjulet överlever.
        if (state.shieldT > 0) {
          state.shieldT = Math.max(30, state.shieldT - 60); // -1s från skölden (blixt nu snabbare)
          state.lightningFlashT = 18;
          state.lightningFlashMax = 18;
          shake(20);
          tone(440, 0.18, 'square', 0.18, 200);
          flashToast('🛡️ SKÖLD BLOCKADE BLIXTEN!', '#22d3ee');
          // Cyan-burst kring hjulet
          for (let p = 0; p < 24; p++) {
            const ang = Math.random() * Math.PI * 2;
            state.particles.push({
              x: t.x + Math.cos(ang) * TIRE_R,
              y: t.y + Math.sin(ang) * TIRE_R,
              vx: Math.cos(ang) * 4,
              vy: Math.sin(ang) * 4 - 1,
              life: 28, max: 28,
              color: `rgba(103, 232, 249, ${0.7 + Math.random() * 0.3})`,
              size: 2 + Math.random() * 2,
              g: 0.05, shape: 'square',
            });
          }
          st.chargeT = 0;     // reset så det krävs ny exponering för ny blixt
          st.struck = true;   // detta moln har "skjutit" — laddar inte mer
        } else {
          triggerLightning(st, t);
          st.struck = true;
        }
      }
    } else {
      // Lämnar regn precis innan blixten — fire en "near miss" som slår ner där hjulet var.
      // Kräver att laddningen kommit en bit (≥ 25 frames, dvs varning hann fyras).
      if (st.chargeT >= 25 && !st.struck) {
        triggerNearMissLightning(st, t);
        st.struck = true;
      }
      // Snabb decay om vi inte triggrade near-miss
      st.chargeT = Math.max(0, st.chargeT - 4);
    }
  }
}

function triggerLightning(st, t) {
  state.lightningFlashT = 30;
  state.lightningFlashMax = 30;
  shake(28);
  tone(80, 0.4, 'sawtooth', 0.3, -300);
  setTimeout(() => tone(60, 0.6, 'sawtooth', 0.25, -500), 60);
  // Visuella partiklar längs blixt-banan
  for (let p = 0; p < 30; p++) {
    state.particles.push({
      x: st.x + (Math.random() - 0.5) * 30,
      y: st.y + 50 + Math.random() * 200,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      life: 25, max: 25,
      color: `rgba(254, 240, 138, ${0.8 + Math.random() * 0.2})`,
      size: 3 + Math.random() * 2,
      g: 0, shape: 'square',
    });
  }
  // Skada 10-30% — kan döda om HP är lågt, annars bara skadar.
  const died = damageTire(10, 30, '⚡ BLIXT');
  if (!died) {
    // Push hjulet lite åt sidan + uppåt så man inte fastnar i samma moln
    if (state.tire) {
      state.tire.vx += (Math.random() - 0.5) * 4;
      state.tire.vy -= 3;
    }
  }
}

// Near-miss: hjulet hann ut ur regnet i tid. Blixten slår ner där hjulet var
// (i molnets centrum) men träffar inte.
function triggerNearMissLightning(st, t) {
  state.lightningFlashT = 18;
  state.lightningFlashMax = 18;
  shake(16);
  tone(95, 0.3, 'sawtooth', 0.22, -250);
  // Visuella partiklar längs blixt-banan i molnets x-position (där hjulet skulle ha varit)
  for (let p = 0; p < 22; p++) {
    state.particles.push({
      x: st.x + (Math.random() - 0.5) * 24,
      y: st.y + 50 + Math.random() * 200,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      life: 22, max: 22,
      color: `rgba(254, 240, 138, ${0.8 + Math.random() * 0.2})`,
      size: 2.5 + Math.random() * 1.5,
      g: 0, shape: 'square',
    });
  }
  flashToast('⚡ KNAPPT UNDAN! +50p', '#22d3ee');
  awardScore(50, '', '#22d3ee');
}

function isWetAt(x) {
  for (const wg of state.wetGrounds) {
    if (x >= wg.x1 && x <= wg.x2) return true;
  }
  return false;
}

// Tilldela skada. Returnerar true om hjulet dog (HP nådde 0).
// minPct/maxPct är slumpintervall i procent (t.ex. 30..50 för blixt).
// Om hjulet redan är dött eller skölden aktiv → ingen skada.
function damageTire(minPct, maxPct, sourceLabel) {
  if (!state.tire || state.phase !== PHASE.FLY) return false;
  if (state.shieldT > 0) return false; // skölden absorberar all skada
  const dmg = minPct + Math.random() * (maxPct - minPct);
  state.health = Math.max(0, state.health - dmg);
  state.damageFlashT = 24; // ~400ms röd blink på hjulet
  if (sourceLabel) {
    flashToast(`💔 ${sourceLabel} −${Math.round(dmg)}%`, '#ef4444');
  }
  if (state.health <= 0) {
    flashToast('☠️ HJULET HAR INGEN HÄLSA KVAR!', '#ef4444');
    finishRun(false);
    return true;
  }
  return false;
}

function drawStorms() {
  for (const st of state.storms) {
    if (st.scale <= 0) continue;
    const fontPx = 90 * st.scale;
    const [sx, sy] = worldToScreen(st.x, st.y);
    // Flicker-glow runt molnet vid laddning eller slumpmässig flicker
    const glowAlpha = (st.flickerT > 0 ? 0.7 : 0) + Math.min(0.6, st.chargeT / 45 * 0.6);
    if (glowAlpha > 0.05) {
      const r = 90 * st.scale;
      const grad = ctx.createRadialGradient(sx, sy, r * 0.3, sx, sy, r * 1.6);
      grad.addColorStop(0, `rgba(254, 240, 138, ${glowAlpha})`);
      grad.addColorStop(1, 'rgba(254, 240, 138, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath(); ctx.arc(sx, sy, r * 1.6, 0, Math.PI * 2); ctx.fill();
    }
    // Stormmolnet
    ctx.save();
    ctx.translate(sx, sy);
    ctx.font = `${Math.max(40, Math.round(fontPx))}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(0,0,0,0.35)';
    ctx.fillText('⛈️', 4, 6);
    ctx.fillStyle = '#fff';
    ctx.fillText('⛈️', 0, 0);
    ctx.restore();
    // Charge-indikator (gul stapel under molnet) när hjulet är i regnet
    if (st.chargeT > 0 && !st.struck) {
      const pct = Math.min(1, st.chargeT / 45);
      const barW = 60;
      const barX = sx - barW / 2;
      const barY = sy + 50;
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fillRect(barX - 2, barY - 2, barW + 4, 8);
      ctx.fillStyle = pct > 0.66 ? '#ef4444' : pct > 0.33 ? '#fbbf24' : '#fde047';
      ctx.fillRect(barX, barY, barW * pct, 4);
    }
  }
}

function drawWetGroundOverlay() {
  if (state.wetGrounds.length === 0) return;
  for (const wg of state.wetGrounds) {
    const fade = Math.min(1, (wg.until - state.time) / 360);
    const [sx1] = worldToScreen(wg.x1, 0);
    const [sx2] = worldToScreen(wg.x2, 0);
    // Sample a few terrain points över zonen för att rita en blå skimrande remsa
    const steps = Math.max(8, Math.floor((wg.x2 - wg.x1) / 25));
    ctx.save();
    ctx.fillStyle = `rgba(96, 165, 250, ${0.32 * fade})`;
    ctx.beginPath();
    for (let i = 0; i <= steps; i++) {
      const wx = wg.x1 + (wg.x2 - wg.x1) * (i / steps);
      const wy = terrainAt(wx);
      const [px, py] = worldToScreen(wx, wy);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    // Stäng polygon nedåt
    for (let i = steps; i >= 0; i--) {
      const wx = wg.x1 + (wg.x2 - wg.x1) * (i / steps);
      const wy = terrainAt(wx) + 6;
      const [px, py] = worldToScreen(wx, wy);
      ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
    // Skimmer-highlights
    ctx.strokeStyle = `rgba(186, 230, 253, ${0.55 * fade})`;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (let i = 0; i <= steps; i++) {
      const wx = wg.x1 + (wg.x2 - wg.x1) * (i / steps);
      const wy = terrainAt(wx) - 0.5 + Math.sin(state.time * 0.2 + i) * 0.6;
      const [px, py] = worldToScreen(wx, wy);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
    ctx.restore();
  }
}

function drawLightningFlash() {
  if (state.lightningFlashT <= 0) return;
  // 30 frames = 500ms vid 60fps. Första ~10 frames full vit, sen fade ut.
  const total = state.lightningFlashMax || 30;
  const t = state.lightningFlashT;
  const a = t > total - 10 ? 1.0 : (t / (total - 10));
  ctx.save();
  // Reset till identity-transform med DPR-skala så hela canvasen täcks.
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  ctx.fillStyle = `rgba(255, 255, 255, ${a})`;
  ctx.fillRect(0, 0, W, H);
  ctx.restore();
}

// Wind indicator HUD — top right. Tap on panel toggles wind on/off (handled in pointerdown).
function drawWindIndicator() {
  const s = state.windDisabled ? 0 : state.wind.strength;
  const absS = Math.abs(s);
  const cx = W - 90, cy = 56;
  // Pulsande glöd när det blåser hårt — synkar med tonen i streaks.
  if (!state.windDisabled && absS > 0.4) {
    const pulse = (Math.sin(state.time * 0.18) * 0.5 + 0.5) * absS;
    const glowCol = s > 0 ? `rgba(34, 197, 94, ${0.15 + pulse * 0.25})`
                          : `rgba(239, 68, 68, ${0.15 + pulse * 0.25})`;
    ctx.fillStyle = glowCol;
    ctx.beginPath(); ctx.roundRect(cx - 80, cy - 28, 160, 56, 14); ctx.fill();
  }
  // Panel — gråtonad när disabled
  ctx.fillStyle = state.windDisabled ? 'rgba(30, 41, 59, 0.85)' : 'rgba(41, 16, 101, 0.75)';
  ctx.strokeStyle = state.windDisabled ? '#475569' : '#6b21a8'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.roundRect(cx - 74, cy - 22, 148, 44, 12); ctx.fill(); ctx.stroke();
  // Label
  ctx.fillStyle = '#fcd34d';
  ctx.font = 'bold 9px "Inter", sans-serif';
  ctx.textAlign = 'left'; ctx.textBaseline = 'top';
  ctx.fillText('VIND', cx - 68, cy - 18);
  // Arrow with flag trail
  const arrowLen = 18 + absS * 40;
  const dir = s >= 0 ? 1 : -1;
  const baseX = cx - dir * arrowLen / 2;
  const tipX = cx + dir * arrowLen / 2;
  // Color by strength
  const col = absS < 0.15 ? '#94a3b8'
            : absS < 0.5 ? (s > 0 ? '#10b981' : '#f97316')
            : (s > 0 ? '#22c55e' : '#ef4444');
  ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(baseX, cy + 4);
  ctx.lineTo(tipX, cy + 4);
  ctx.stroke();
  // Arrowhead
  ctx.fillStyle = col;
  ctx.beginPath();
  ctx.moveTo(tipX, cy + 4);
  ctx.lineTo(tipX - dir * 8, cy - 2);
  ctx.lineTo(tipX - dir * 8, cy + 10);
  ctx.closePath();
  ctx.fill();
  // Strength bars
  const bars = Math.min(5, Math.floor(absS * 6));
  for (let i = 0; i < 5; i++) {
    ctx.fillStyle = i < bars ? col : 'rgba(255,255,255,0.15)';
    ctx.fillRect(cx - 24 + i * 10, cy - 10, 7, 4);
  }
  // Text
  ctx.fillStyle = state.windDisabled ? '#94a3b8' : '#fef3c7';
  ctx.font = 'bold 10px "Courier New", monospace';
  ctx.textAlign = 'right';
  const label = state.windDisabled ? 'AV' : (absS < 0.15 ? 'STILLA' : (s > 0 ? 'MED' : 'MOT'));
  ctx.fillText(label, cx + 66, cy - 18);
  // Diagonal strikethrough när disabled
  if (state.windDisabled) {
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(cx - 70, cy - 18);
    ctx.lineTo(cx + 70, cy + 18);
    ctx.stroke();
  }
}

// Wind blowing dust particles — visas BARA där vinden faktiskt verkar:
//   - Aldrig under AIM (ingen flygande tire = inget blåser för spelaren)
//   - Aldrig nära mark (heightFactor är ~0 där, inget händer)
//   - Streaks spawnar bara ovanför taknivå (Y < terrainY - 80) i kameravyn
//   - Extra streaks runt tiren när den är högt i luften
function drawWindDust() {
  if (state.windDisabled) return;
  if (state.phase !== PHASE.FLY) return;
  const s = state.wind.strength;
  const absS = Math.abs(s);
  if (absS < 0.10) return;
  // Spawn-band: bara ovanför taknivå för terrängen i kameravyn.
  const _terrainCenterY = terrainAt(state.cam.x + W / 2);
  const _bandBottomWorldY = _terrainCenterY - 80;   // ~rooftop
  const _bandTopWorldY = state.cam.y - 40;          // top of camera
  if (_bandBottomWorldY <= _bandTopWorldY) return;  // ingen luft synlig
  if (state.time % 2 === 0) {
    const spawnCount = absS > 0.6 ? 3 : absS > 0.3 ? 2 : 1;
    for (let i = 0; i < spawnCount; i++) {
      if (Math.random() < absS * 1.2) {
        const yWorld = _bandTopWorldY + Math.random() * (_bandBottomWorldY - _bandTopWorldY);
        state.particles.push({
          x: state.cam.x + (s > 0 ? -20 : W + 20),
          y: yWorld,
          vx: s * (10 + absS * 6) + (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 1.2,
          life: 55, max: 55,
          color: `rgba(254, 243, 199, ${0.5 + absS * 0.3})`,
          size: 1.5 + Math.random() * 2,
          g: 0, shape: 'square', wind: true,
        });
      }
    }
  }
  // Extra streaks runt tiren när den är högt — bekräftar att vinden tar tag i just dig.
  if (state.tire) {
    const t = state.tire;
    const _gy = terrainAt(t.x);
    const _h = _gy - t.y;
    if (_h > 80 && state.time % 2 === 0) {
      const intensity = Math.min(1, _h / 350) * absS;
      const tireSpawn = intensity > 0.5 ? 3 : intensity > 0.2 ? 2 : 1;
      for (let i = 0; i < tireSpawn; i++) {
        if (Math.random() < intensity * 1.5) {
          state.particles.push({
            x: t.x - s * 80 + (Math.random() - 0.5) * 120,
            y: t.y + (Math.random() - 0.5) * 90,
            vx: s * (16 + intensity * 8) + (Math.random() - 0.5) * 3,
            vy: (Math.random() - 0.5) * 1.5,
            life: 32, max: 32,
            color: `rgba(224, 231, 255, ${0.55 + intensity * 0.35})`,
            size: 1.8 + Math.random() * 2.5,
            g: 0, shape: 'square', wind: true,
          });
        }
      }
    }
  }
}

function drawTire() {
  if (!state.tire) return;
  const t = state.tire;
  // Drunknings-fade: hjulet sjunker, fade-a ut + klipp bort delen under vattenytan
  if (state.drowning) {
    const d = state.drowning;
    const f = Math.min(1, d.t / d.max);
    const alpha = 1 - f * 0.85;  // 100% → 15% under animationen
    if (f >= 1) return;
    ctx.save();
    ctx.globalAlpha = alpha;
    const [x, y] = worldToScreen(t.x, t.y);
    const [, surfScreenY] = worldToScreen(0, d.surfaceY);
    // Clip: rita bara den del av hjulet som är OVANFÖR vattenytan
    ctx.beginPath();
    ctx.rect(-2000, -2000, 8000, surfScreenY + 4 + 2000);
    ctx.clip();
    ctx.translate(x, y);
    ctx.rotate(t.rot);
    drawTireShape(TIRE_R);
    ctx.restore();
    return;
  }
  const speed = Math.hypot(t.vx, t.vy);
  // Shield aura when active (cyan bubble)
  if (state.shieldT > 0) {
    const [tx, ty] = worldToScreen(t.x, t.y);
    const pulse = 1 + Math.sin(state.time * 0.28) * 0.08;
    const fade = state.shieldT < 30 ? (state.shieldT / 30) : 1;
    ctx.save();
    ctx.globalAlpha = 0.35 * fade + Math.sin(state.time * 0.35) * 0.06;
    const g = ctx.createRadialGradient(tx, ty, TIRE_R * 0.6, tx, ty, TIRE_R * 2.4 * pulse);
    g.addColorStop(0, 'rgba(34,211,238,0.0)');
    g.addColorStop(0.65, 'rgba(34,211,238,0.35)');
    g.addColorStop(1, 'rgba(34,211,238,0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(tx, ty, TIRE_R * 2.4 * pulse, 0, Math.PI * 2); ctx.fill();
    // Ring
    ctx.globalAlpha = 0.55 * fade;
    ctx.strokeStyle = '#67e8f9';
    ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.arc(tx, ty, TIRE_R * 1.9 * pulse, 0, Math.PI * 2); ctx.stroke();
    // Highlight arc
    ctx.globalAlpha = 0.7 * fade;
    ctx.strokeStyle = 'rgba(255,255,255,0.85)';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(tx, ty, TIRE_R * 1.9 * pulse, -Math.PI * 0.8, -Math.PI * 0.3); ctx.stroke();
    ctx.restore();
  }
  // Magnet aura when active
  if (state.magnetT > 0) {
    const [tx, ty] = worldToScreen(t.x, t.y);
    const pulse = 1 + Math.sin(state.time * 0.2) * 0.1;
    ctx.save();
    ctx.globalAlpha = 0.28 + Math.sin(state.time * 0.25) * 0.08;
    const g = ctx.createRadialGradient(tx, ty, TIRE_R, tx, ty, 120 * pulse);
    g.addColorStop(0, 'rgba(168,85,247,0.4)');
    g.addColorStop(1, 'rgba(168,85,247,0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(tx, ty, 120 * pulse, 0, Math.PI * 2); ctx.fill();
    // Concentric pulse rings
    ctx.globalAlpha = 0.35;
    ctx.strokeStyle = '#f0abfc';
    ctx.lineWidth = 2;
    for (let k = 0; k < 2; k++) {
      const rr = ((state.time + k * 30) % 60) / 60 * 100 + 20;
      ctx.globalAlpha = 0.3 * (1 - rr / 120);
      ctx.beginPath(); ctx.arc(tx, ty, rr, 0, Math.PI * 2); ctx.stroke();
    }
    ctx.restore();
  }
  // Speed streaks — long thin lines trailing opposite to velocity when fast
  if (speed > 8) {
    const [tx, ty] = worldToScreen(t.x, t.y);
    const ang = Math.atan2(t.vy, t.vx);
    const len = Math.min(120, speed * 6);
    ctx.save();
    ctx.translate(tx, ty);
    ctx.rotate(ang);
    for (let i = 0; i < 3; i++) {
      const off = (i - 1) * (TIRE_R * 0.55);
      const a = 0.18 + i * 0.05;
      const grad = ctx.createLinearGradient(0, off, -len, off);
      grad.addColorStop(0, `rgba(253, 224, 71, ${a})`);
      grad.addColorStop(1, 'rgba(253, 224, 71, 0)');
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-TIRE_R * 0.3, off);
      ctx.lineTo(-len, off);
      ctx.stroke();
    }
    ctx.restore();
  }
  // Motion trail (soft amber glow)
  t.trail.forEach(tr => {
    const [x, y] = worldToScreen(tr.x, tr.y);
    ctx.globalAlpha = tr.a * 0.35;
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath(); ctx.arc(x, y, TIRE_R * tr.a * 0.95, 0, Math.PI * 2); ctx.fill();
  });
  ctx.globalAlpha = 1;
  const [x, y] = worldToScreen(t.x, t.y);
  // Speed halo — soft radial glow around the tire when moving fast
  if (speed > 6) {
    const glowR = TIRE_R * (1.5 + Math.min(1.2, speed / 20));
    const ga = Math.min(0.55, (speed - 6) / 18);
    const gg = ctx.createRadialGradient(x, y, TIRE_R * 0.4, x, y, glowR);
    gg.addColorStop(0, `rgba(251, 191, 36, ${ga * 0.9})`);
    gg.addColorStop(0.5, `rgba(251, 113, 133, ${ga * 0.4})`);
    gg.addColorStop(1, 'rgba(251, 113, 133, 0)');
    ctx.fillStyle = gg;
    ctx.beginPath(); ctx.arc(x, y, glowR, 0, Math.PI * 2); ctx.fill();
  }
  // Tire body — bright YELLOW matching reference art
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(t.rot);
  drawTireShape(TIRE_R);
  ctx.restore();
  // Röd skadeblink — overlay ovanpå hjulet när damageFlashT > 0
  if (state.damageFlashT > 0) {
    const a = Math.min(1, state.damageFlashT / 24);
    ctx.save();
    ctx.globalAlpha = 0.7 * a;
    ctx.fillStyle = '#ef4444';
    ctx.beginPath(); ctx.arc(x, y, TIRE_R + 2, 0, Math.PI * 2); ctx.fill();
    // Pulserande röd ring runt
    ctx.globalAlpha = 0.55 * a;
    ctx.strokeStyle = '#fca5a5';
    ctx.lineWidth = 3;
    const ringR = TIRE_R + 6 + (1 - a) * 14;
    ctx.beginPath(); ctx.arc(x, y, ringR, 0, Math.PI * 2); ctx.stroke();
    ctx.restore();
  }
}

// Shared tire renderer — matches reference image (yellow w/ blocky black treads)
function drawTireShape(R) {
  // Outer black rim (tire casing)
  ctx.fillStyle = '#0f172a';
  ctx.beginPath(); ctx.arc(0, 0, R, 0, Math.PI * 2); ctx.fill();
  // Yellow body
  ctx.fillStyle = '#fbbf24';
  ctx.beginPath(); ctx.arc(0, 0, R - 2.5, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 1.5; ctx.stroke();
  // Chunky rectangular tread blocks around edge (8 big blocks)
  ctx.fillStyle = '#0f172a';
  const tw = Math.max(4, R * 0.22);   // tread width
  const th = Math.max(5, R * 0.28);   // tread height (depth)
  for (let a = 0; a < 8; a++) {
    ctx.save();
    ctx.rotate(a * Math.PI / 4);
    ctx.fillRect(-tw / 2, -R + 1, tw, th);
    ctx.restore();
  }
  // Inner amber ring (sidewall)
  ctx.fillStyle = '#f59e0b';
  ctx.beginPath(); ctx.arc(0, 0, R * 0.6, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 1.5; ctx.stroke();
  // Spokes (4 thick black)
  ctx.strokeStyle = '#0f172a'; ctx.lineWidth = Math.max(2.5, R * 0.13);
  ctx.lineCap = 'round';
  for (let a = 0; a < 4; a++) {
    ctx.save();
    ctx.rotate(a * Math.PI / 2);
    ctx.beginPath();
    ctx.moveTo(0, -R * 0.55);
    ctx.lineTo(0, -R * 0.18);
    ctx.stroke();
    ctx.restore();
  }
  ctx.lineCap = 'butt';
  // Hub (dark center)
  ctx.fillStyle = '#1f2937';
  ctx.beginPath(); ctx.arc(0, 0, R * 0.28, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.fillStyle = '#4b5563';
  ctx.beginPath(); ctx.arc(0, 0, R * 0.13, 0, Math.PI * 2); ctx.fill();
}

function drawParticles() {
  const vw = viewWidth();
  const vh = viewHeight();
  const minX = state.cam.x - 20;
  const maxX = state.cam.x + vw + 20;
  const minY = state.cam.y - 20;
  const maxY = state.cam.y + vh + 20;
  state.particles.forEach(pt => {
    if (pt.x < minX || pt.x > maxX || pt.y < minY || pt.y > maxY) return;
    const x = pt.x - state.cam.x;
    const y = pt.y - state.cam.y;
    ctx.globalAlpha = Math.min(1, pt.life / 40);
    ctx.fillStyle = pt.color;
    if (pt.shape === 'circle') {
      ctx.beginPath(); ctx.arc(x, y, pt.size, 0, Math.PI * 2); ctx.fill();
    } else {
      ctx.fillRect(x - pt.size / 2, y - pt.size / 2, pt.size, pt.size);
    }
  });
  ctx.globalAlpha = 1;
}

function drawPopups() {
  state.popups.forEach(pp => {
    const [x, y] = worldToScreen(pp.x, pp.y);
    const a = Math.min(1, pp.life / pp.max);
    const scale = 1 + (1 - pp.life / pp.max) * 0.4;
    ctx.globalAlpha = a;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.font = 'bold 18px "Impact", "Arial Black", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#0f172a';
    ctx.strokeText(pp.text, 0, 0);
    ctx.fillStyle = pp.color;
    ctx.fillText(pp.text, 0, 0);
    ctx.restore();
  });
  ctx.globalAlpha = 1;
}

function drawDistanceMarkers() {
  // every 500 world units, draw a post
  const startX = state.cam.x - 50;
  const endX = state.cam.x + viewWidth() + 50;
  const first = Math.ceil(startX / 500) * 500;
  for (let wx = first; wx < endX; wx += 500) {
    const gy = terrainAt(wx);
    const [x, y] = worldToScreen(wx, gy);
    ctx.fillStyle = '#fafafa';
    ctx.fillRect(x - 1, y - 30, 2, 30);
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 10px "Courier New", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`${Math.round(wx / 50)}m`, x, y - 34);
  }
}

function drawDailyPbFlag() {
  if (!dailyPB || dailyPB.distM <= 0) return;
  if (dailyPB.date !== todayStamp()) return;
  // distM är världsmeter från x=0, så flaggans världs-X = distM * 5 (ingen launchX-offset).
  const wx = dailyPB.distM * 5;
  const visL = state.cam.x - 80;
  const visR = state.cam.x + viewWidth() + 80;
  if (wx < visL || wx > visR) return;
  const gy = terrainAt(wx);
  const [x, y] = worldToScreen(wx, gy);
  const poleH = 90;
  const pulse = Math.sin((performance.now() / 200)) * 0.15 + 0.85;

  // pole
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(x - 1.5, y - poleH, 3, poleH);

  // flag body (waving)
  const wave = Math.sin(performance.now() / 180) * 3;
  ctx.save();
  ctx.globalAlpha = pulse;
  ctx.fillStyle = '#fde047';
  ctx.strokeStyle = '#ca8a04';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(x + 1, y - poleH);
  ctx.lineTo(x + 34 + wave, y - poleH + 8);
  ctx.lineTo(x + 1, y - poleH + 20);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  // label
  ctx.save();
  ctx.globalAlpha = 0.95;
  ctx.font = 'bold 9px -apple-system, "Segoe UI", system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#1a0a03';
  ctx.fillText('🚩', x + 14, y - poleH + 15);
  ctx.fillStyle = '#fde047';
  ctx.strokeStyle = 'rgba(0,0,0,0.75)';
  ctx.lineWidth = 3;
  ctx.strokeText(`DAGSREKORD ${dailyPB.distM}m`, x, y - poleH - 6);
  ctx.fillText(`DAGSREKORD ${dailyPB.distM}m`, x, y - poleH - 6);
  ctx.restore();
}

function render() {
  ctx.clearRect(0, 0, W, H);

  // Camera shake
  const sx = shakeAmt > 0 ? (Math.random() - 0.5) * shakeAmt : 0;
  const sy = shakeAmt > 0 ? (Math.random() - 0.5) * shakeAmt * 0.6 : 0;

  // --- Screen-space backdrop (not zoomed) ---
  ctx.save();
  ctx.translate(sx, sy);
  drawSky();
  drawClouds();
  drawMountains();
  drawAtmosphere();  // haze layer between mountains and world
  drawAshParticles();
  ctx.restore();

  // --- Zoomed world layer ---
  const z = state.cam.zoom;
  ctx.save();
  ctx.translate(sx, sy);
  ctx.scale(z, z);
  drawCacti();
  drawTerrain();
  drawWetGroundOverlay();
  drawDistanceMarkers();
  drawDailyPbFlag();
  drawBackWall();
  drawLauncher();
  drawObstacles();
  drawPickups();
  drawLadderMan();
  drawBirds();
  drawPenguins();
  drawTornados();
  drawStorms();
  drawFireballs();
  drawTireShadow();
  drawTire();
  drawParticles();
  drawPopups();
  ctx.restore();
  // Blixt-overlay (screen-space, efter zoom-restore)
  drawLightningFlash();
  // Frysande vind-overlay (screen-space)
  drawFreezeWind();

  // Slow-mo vignette
  if (state.slowMoT > 0) {
    const a = Math.min(0.45, state.slowMoT / 40 * 0.45);
    const grad = ctx.createRadialGradient(W/2, H/2, Math.min(W, H) * 0.15, W/2, H/2, Math.max(W, H) * 0.7);
    grad.addColorStop(0, 'rgba(0,0,0,0)');
    grad.addColorStop(1, `rgba(96, 165, 250, ${a})`);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);
  }

  // Cinematic vignette (always)
  drawVignette();

  // Screen-space overlays (no shake)
  drawWindIndicator();
  drawWindDust();
  drawRelaunchDrag();
}

// Visual aim arrow while the user is drag-charging a relaunch
function drawRelaunchDrag() {
  const d = state.relaunchDrag;
  if (!d || !d.active || !state.tire) return;
  const rect = canvas.getBoundingClientRect();
  const sx0 = d.startX - rect.left;
  const sy0 = d.startY - rect.top;
  const sx1 = d.curX - rect.left;
  const sy1 = d.curY - rect.top;
  const dx = sx1 - sx0;
  const dy = sy1 - sy0;
  const len = Math.hypot(dx, dy);
  if (len < 2) return;
  const p = Math.min(1, len / RELAUNCH_DRAG_MAX);
  // Anchor arrow at the tire (convert world to screen)
  const [wx, wy] = worldToScreen(state.tire.x, state.tire.y);
  const z = state.cam.zoom || 1;
  const tsx = wx * z;
  const tsy = wy * z;
  // Arrow length scaled to power
  const armLen = 30 + p * 120;
  const ax = tsx + (dx / len) * armLen;
  const ay = tsy + (dy / len) * armLen;
  // Color by power
  const col = p >= 0.95 ? '#22c55e' : p >= 0.6 ? '#fbbf24' : p >= 0.3 ? '#fb923c' : '#94a3b8';
  // Ring around tire
  ctx.save();
  ctx.strokeStyle = col;
  ctx.lineWidth = 4;
  ctx.globalAlpha = 0.85;
  ctx.beginPath();
  ctx.arc(tsx, tsy, 28, 0, Math.PI * 2);
  ctx.stroke();
  // Shaft
  ctx.lineCap = 'round';
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.moveTo(tsx, tsy);
  ctx.lineTo(ax, ay);
  ctx.stroke();
  // Arrowhead
  const ang = Math.atan2(dy, dx);
  const hl = 18;
  ctx.fillStyle = col;
  ctx.beginPath();
  ctx.moveTo(ax, ay);
  ctx.lineTo(ax - Math.cos(ang - 0.5) * hl, ay - Math.sin(ang - 0.5) * hl);
  ctx.lineTo(ax - Math.cos(ang + 0.5) * hl, ay - Math.sin(ang + 0.5) * hl);
  ctx.closePath();
  ctx.fill();
  // Power % label near cursor
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = col;
  ctx.lineWidth = 3;
  ctx.font = 'bold 18px "Inter", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const label = Math.round(p * 100) + '%';
  ctx.strokeText(label, sx1, sy1 - 24);
  ctx.fillStyle = '#fef3c7';
  ctx.fillText(label, sx1, sy1 - 24);
  ctx.restore();
}

// Atmospheric haze between background and world
function drawAtmosphere() {
  const [c0, c1, c2] = currentBiomeSky();
  const g = ctx.createLinearGradient(0, H * 0.55, 0, H);
  g.addColorStop(0, 'rgba(255,255,255,0)');
  g.addColorStop(0.5, hexToRgba(c2, 0.12));
  g.addColorStop(1, hexToRgba(c1, 0.18));
  ctx.fillStyle = g;
  ctx.fillRect(0, H * 0.55, W, H * 0.45);
}

// PERF: Memoization — drawTerrain m.fl. kallar med samma args 3+ ggr/frame.
const _hexToRgbaCache = new Map();
function hexToRgba(hex, a) {
  const key = hex + '|' + a;
  const cached = _hexToRgbaCache.get(key);
  if (cached !== undefined) return cached;
  const h = hex.replace('#', '');
  const r = parseInt(h.substr(0, 2), 16);
  const g = parseInt(h.substr(2, 2), 16);
  const b = parseInt(h.substr(4, 2), 16);
  const out = `rgba(${r},${g},${b},${a})`;
  if (_hexToRgbaCache.size < 256) _hexToRgbaCache.set(key, out);
  return out;
}

// Vignette dims the corners for a cinematic feel
function drawVignette() {
  const g = ctx.createRadialGradient(W/2, H*0.45, Math.min(W, H) * 0.3, W/2, H*0.45, Math.max(W, H) * 0.75);
  g.addColorStop(0, 'rgba(0,0,0,0)');
  g.addColorStop(1, 'rgba(0,0,0,0.45)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
}

// Shadow ellipse under tire (darkens where it lands)
function drawTireShadow() {
  if (!state.tire) return;
  const t = state.tire;
  const gy = terrainAt(t.x);
  const height = gy - (t.y + TIRE_R);
  const dropDist = Math.max(0, Math.min(300, height));
  const alpha = 0.45 * (1 - dropDist / 300);
  if (alpha < 0.03) return;
  const [sx, sy] = worldToScreen(t.x, gy);
  const rx = TIRE_R * (1 + dropDist / 200);
  const ry = Math.max(4, TIRE_R * 0.3 * (1 - dropDist / 400));
  ctx.save();
  ctx.translate(sx, sy);
  ctx.fillStyle = `rgba(0,0,0,${alpha})`;
  ctx.beginPath();
  ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

// ====== LOOP ======
function loop() {
  update();
  render();
  requestAnimationFrame(loop);
}

// ====== START ======
resize();
setTimeout(resize, 100);
buildLevel();
state.cam.x = LEVEL.launchX - W * 0.25;
state.cam.y = terrainAt(LEVEL.launchX) - H * 0.55;
state.wind.target = randomWind();
state.wind.nextChange = 300;
try { state.windDisabled = localStorage.getItem('chimney_windDisabled') === '1'; } catch {}
state.nitroCharges = 0;
state.airjumpCharges = 0;
state.magnetCharges = 0;
state.bombCharges = 0;
state.shieldCharges = 0;
state.shieldT = 0;
state.magnetT = 0;
updateHud();
updateNitroBadge();
updateAirjumpBadge();
updateMagnetBadge();
updateFireButton();
loop();
