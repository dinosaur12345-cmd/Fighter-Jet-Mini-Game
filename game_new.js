const CONFIG = {
  CANVAS_WIDTH: 800,
  CANVAS_HEIGHT: 600,
  PLAYER_SPEED: 6,
  BULLET_SPEED: 10,
  ENEMY_BULLET_SPEED: 5,
  AUTO_FIRE_INTERVAL: 150,
  SECONDARY_COOLDOWN: 3000,
  ULTIMATE_COOLDOWN: 10000,
  ULTIMATE_CHARGE_TIME: 5000,
  SOUND_ENABLED: true,
  MASTER_VOLUME: 0.5,
  SFX_VOLUME: 0.7,
  UI_VOLUME: 0.5
}

const SOUND_CONFIGS = {
  UI: {
    click: { type: 'click', volume: 0.6 },
    hover: { type: 'hover', volume: 0.3 },
    menuOpen: { type: 'menuOpen', volume: 0.7 },
    menuClose: { type: 'menuClose', volume: 0.5 },
    success: { type: 'success', volume: 0.8 },
    error: { type: 'error', volume: 0.6 },
    countdown: { type: 'countdown', volume: 0.7 },
    countdownEnd: { type: 'countdownEnd', volume: 0.9 }
  },
  PLAYER: {
    shoot: { type: 'shoot', volume: 0.4, cooldown: 50 },
    secondary: { type: 'secondary', volume: 0.6, cooldown: 300 },
    ultimate: { type: 'ultimate', volume: 0.9, cooldown: 0 },
    hit: { type: 'hit', volume: 0.5 },
    death: { type: 'death', volume: 0.8 },
    shield: { type: 'shield', volume: 0.6 },
    powerup: { type: 'powerup', volume: 0.7 },
    levelUp: { type: 'levelUp', volume: 0.8 }
  },
  ENEMY: {
    shoot: { type: 'enemyShoot', volume: 0.3 },
    hit: { type: 'enemyHit', volume: 0.4 },
    death: { type: 'enemyDeath', volume: 0.6 },
    bossDeath: { type: 'bossDeath', volume: 0.9 },
    bossSpawn: { type: 'bossSpawn', volume: 0.8 }
  },
  ENVIRONMENT: {
    background: { type: 'background', volume: 0.2, loop: true },
    wave: { type: 'wave', volume: 0.5 },
    levelStart: { type: 'levelStart', volume: 0.7 },
    gameOver: { type: 'gameOver', volume: 0.9 },
    victory: { type: 'victory', volume: 0.9 }
  },
  SPECIAL: {
    achievement: { type: 'achievement', volume: 0.9 },
    coinCollect: { type: 'coinCollect', volume: 0.5 },
    newPlane: { type: 'newPlane', volume: 0.8 },
    warning: { type: 'warning', volume: 0.7 },
    slowTime: { type: 'slowTime', volume: 0.6 }
  }
}

class SoundManager {
  constructor() {
    this.audioContext = null;
    this.masterGain = null;
    this.sfxGain = null;
    this.uiGain = null;
    this.enabled = CONFIG.SOUND_ENABLED;
    this.masterVolume = CONFIG.MASTER_VOLUME;
    this.sfxVolume = CONFIG.SFX_VOLUME;
    this.uiVolume = CONFIG.UI_VOLUME;
    this.lastPlayed = {};
    this.activeSounds = new Map();
    this.backgroundOscillator = null;
    
    this.init();
  }
  
  init() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      this.masterGain = this.audioContext.createGain();
      this.masterGain.gain.value = this.masterVolume;
      this.masterGain.connect(this.audioContext.destination);
      
      this.sfxGain = this.audioContext.createGain();
      this.sfxGain.gain.value = this.sfxVolume;
      this.sfxGain.connect(this.masterGain);
      
      this.uiGain = this.audioContext.createGain();
      this.uiGain.gain.value = this.uiVolume;
      this.uiGain.connect(this.masterGain);
      
      this.loadSettings();
    } catch (e) {
      console.warn('Web Audio API not supported:', e);
      this.enabled = false;
    }
  }
  
  loadSettings() {
    const savedEnabled = localStorage.getItem('sound_enabled');
    const savedMaster = localStorage.getItem('sound_master');
    const savedSfx = localStorage.getItem('sound_sfx');
    
    if (savedEnabled !== null) this.enabled = savedEnabled === 'true';
    if (savedMaster !== null) this.setMasterVolume(parseFloat(savedMaster));
    if (savedSfx !== null) this.setSfxVolume(parseFloat(savedSfx));
  }
  
  saveSettings() {
    localStorage.setItem('sound_enabled', this.enabled);
    localStorage.setItem('sound_master', this.masterVolume);
    localStorage.setItem('sound_sfx', this.sfxVolume);
  }
  
  resumeContext() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }
  
  setEnabled(enabled) {
    this.enabled = enabled;
    if (this.masterGain) {
      this.masterGain.gain.value = enabled ? this.masterVolume : 0;
    }
    this.saveSettings();
  }
  
  toggle() {
    this.setEnabled(!this.enabled);
    return this.enabled;
  }
  
  setMasterVolume(volume) {
    this.masterVolume = Math.max(0, Math.min(1, volume));
    if (this.masterGain) {
      this.masterGain.gain.value = this.enabled ? this.masterVolume : 0;
    }
    this.saveSettings();
  }
  
  setSfxVolume(volume) {
    this.sfxVolume = Math.max(0, Math.min(1, volume));
    if (this.sfxGain) {
      this.sfxGain.gain.value = this.sfxVolume;
    }
    this.saveSettings();
  }
  
  setUiVolume(volume) {
    this.uiVolume = Math.max(0, Math.min(1, volume));
    if (this.uiGain) {
      this.uiGain.gain.value = this.uiVolume;
    }
  }
  
  canPlay(soundType, cooldown = 0) {
    if (!this.enabled || !this.audioContext) return false;
    
    const now = Date.now();
    const lastTime = this.lastPlayed[soundType] || 0;
    
    if (now - lastTime < cooldown) return false;
    
    this.lastPlayed[soundType] = now;
    return true;
  }
  
  play(soundType, config = {}) {
    if (!this.canPlay(soundType, config.cooldown || 0)) return;
    
    this.resumeContext();
    
    const gain = config.isUI ? this.uiGain : this.sfxGain;
    const volume = (config.volume || 0.5) * (config.isUI ? this.uiVolume : this.sfxVolume);
    
    switch (soundType) {
      case 'click': this.playClick(gain, volume); break;
      case 'hover': this.playHover(gain, volume); break;
      case 'menuOpen': this.playMenuOpen(gain, volume); break;
      case 'menuClose': this.playMenuClose(gain, volume); break;
      case 'success': this.playSuccess(gain, volume); break;
      case 'error': this.playError(gain, volume); break;
      case 'countdown': this.playCountdown(gain, volume); break;
      case 'countdownEnd': this.playCountdownEnd(gain, volume); break;
      
      case 'shoot': this.playShoot(gain, volume); break;
      case 'secondary': this.playSecondary(gain, volume); break;
      case 'ultimate': this.playUltimate(gain, volume); break;
      case 'hit': this.playHit(gain, volume); break;
      case 'death': this.playDeath(gain, volume); break;
      case 'shield': this.playShield(gain, volume); break;
      case 'powerup': this.playPowerup(gain, volume); break;
      case 'levelUp': this.playLevelUp(gain, volume); break;
      
      case 'enemyShoot': this.playEnemyShoot(gain, volume); break;
      case 'enemyHit': this.playEnemyHit(gain, volume); break;
      case 'enemyDeath': this.playEnemyDeath(gain, volume); break;
      case 'bossDeath': this.playBossDeath(gain, volume); break;
      case 'bossSpawn': this.playBossSpawn(gain, volume); break;
      
      case 'wave': this.playWave(gain, volume); break;
      case 'levelStart': this.playLevelStart(gain, volume); break;
      case 'gameOver': this.playGameOver(gain, volume); break;
      case 'victory': this.playVictory(gain, volume); break;
      
      case 'achievement': this.playAchievement(gain, volume); break;
      case 'coinCollect': this.playCoinCollect(gain, volume); break;
      case 'newPlane': this.playNewPlane(gain, volume); break;
      case 'warning': this.playWarning(gain, volume); break;
      case 'slowTime': this.playSlowTime(gain, volume); break;
      
      default: this.playGeneric(gain, volume, soundType); break;
    }
  }
  
  playClick(gain, volume) {
    const osc = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, this.audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, this.audioContext.currentTime + 0.05);
    
    gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.05);
    
    osc.connect(gainNode);
    gainNode.connect(gain);
    
    osc.start();
    osc.stop(this.audioContext.currentTime + 0.05);
  }
  
  playHover(gain, volume) {
    const osc = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, this.audioContext.currentTime);
    
    gainNode.gain.setValueAtTime(volume * 0.3, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.02);
    
    osc.connect(gainNode);
    gainNode.connect(gain);
    
    osc.start();
    osc.stop(this.audioContext.currentTime + 0.02);
  }
  
  playMenuOpen(gain, volume) {
    const time = this.audioContext.currentTime;
    
    for (let i = 0; i < 3; i++) {
      const osc = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400 + i * 200, time + i * 0.05);
      
      gainNode.gain.setValueAtTime(0.001, time + i * 0.05);
      gainNode.gain.linearRampToValueAtTime(volume, time + i * 0.05 + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, time + i * 0.05 + 0.08);
      
      osc.connect(gainNode);
      gainNode.connect(gain);
      
      osc.start(time + i * 0.05);
      osc.stop(time + i * 0.05 + 0.08);
    }
  }
  
  playMenuClose(gain, volume) {
    const time = this.audioContext.currentTime;
    
    for (let i = 0; i < 3; i++) {
      const osc = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800 - i * 200, time + i * 0.05);
      
      gainNode.gain.setValueAtTime(0.001, time + i * 0.05);
      gainNode.gain.linearRampToValueAtTime(volume, time + i * 0.05 + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, time + i * 0.05 + 0.08);
      
      osc.connect(gainNode);
      gainNode.connect(gain);
      
      osc.start(time + i * 0.05);
      osc.stop(time + i * 0.05 + 0.08);
    }
  }
  
  playSuccess(gain, volume) {
    const time = this.audioContext.currentTime;
    const notes = [523, 659, 784];
    
    notes.forEach((freq, i) => {
      const osc = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time + i * 0.1);
      
      gainNode.gain.setValueAtTime(0.001, time + i * 0.1);
      gainNode.gain.linearRampToValueAtTime(volume, time + i * 0.1 + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, time + i * 0.1 + 0.2);
      
      osc.connect(gainNode);
      gainNode.connect(gain);
      
      osc.start(time + i * 0.1);
      osc.stop(time + i * 0.1 + 0.2);
    });
  }
  
  playError(gain, volume) {
    const osc = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    osc.type = 'square';
    osc.frequency.setValueAtTime(150, this.audioContext.currentTime);
    osc.frequency.setValueAtTime(100, this.audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
    gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.2);
    
    osc.connect(gainNode);
    gainNode.connect(gain);
    
    osc.start();
    osc.stop(this.audioContext.currentTime + 0.2);
  }
  
  playCountdown(gain, volume) {
    const osc = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, this.audioContext.currentTime);
    
    gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.1);
    
    osc.connect(gainNode);
    gainNode.connect(gain);
    
    osc.start();
    osc.stop(this.audioContext.currentTime + 0.1);
  }
  
  playCountdownEnd(gain, volume) {
    const osc = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, this.audioContext.currentTime);
    
    gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.3);
    
    osc.connect(gainNode);
    gainNode.connect(gain);
    
    osc.start();
    osc.stop(this.audioContext.currentTime + 0.3);
  }
  
  playShoot(gain, volume) {
    const osc = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    const noise = this.createNoiseBuffer();
    const noiseSource = this.audioContext.createBufferSource();
    const noiseGain = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();
    
    osc.type = 'square';
    osc.frequency.setValueAtTime(1200, this.audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, this.audioContext.currentTime + 0.05);
    
    gainNode.gain.setValueAtTime(volume * 0.5, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.05);
    
    osc.connect(gainNode);
    gainNode.connect(gain);
    
    noiseSource.buffer = noise;
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(3000, this.audioContext.currentTime);
    filter.frequency.exponentialRampToValueAtTime(500, this.audioContext.currentTime + 0.05);
    
    noiseGain.gain.setValueAtTime(volume * 0.3, this.audioContext.currentTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.05);
    
    noiseSource.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(gain);
    
    osc.start();
    osc.stop(this.audioContext.currentTime + 0.05);
    noiseSource.start();
    noiseSource.stop(this.audioContext.currentTime + 0.05);
  }
  
  playSecondary(gain, volume) {
    const time = this.audioContext.currentTime;
    
    for (let i = 0; i < 5; i++) {
      const osc = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(300 + i * 100, time + i * 0.02);
      osc.frequency.exponentialRampToValueAtTime(100, time + i * 0.02 + 0.08);
      
      gainNode.gain.setValueAtTime(volume * 0.3, time + i * 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, time + i * 0.02 + 0.08);
      
      osc.connect(gainNode);
      gainNode.connect(gain);
      
      osc.start(time + i * 0.02);
      osc.stop(time + i * 0.02 + 0.08);
    }
  }
  
  playUltimate(gain, volume) {
    const time = this.audioContext.currentTime;
    
    const osc1 = this.audioContext.createOscillator();
    const osc2 = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(200, time);
    osc1.frequency.exponentialRampToValueAtTime(800, time + 0.3);
    
    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(100, time);
    osc2.frequency.exponentialRampToValueAtTime(400, time + 0.3);
    
    gainNode.gain.setValueAtTime(volume, time);
    gainNode.gain.setValueAtTime(volume, time + 0.3);
    gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.5);
    
    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(gain);
    
    osc1.start();
    osc1.stop(time + 0.5);
    osc2.start();
    osc2.stop(time + 0.5);
  }
  
  playHit(gain, volume) {
    const osc = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    osc.type = 'square';
    osc.frequency.setValueAtTime(200, this.audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, this.audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.1);
    
    osc.connect(gainNode);
    gainNode.connect(gain);
    
    osc.start();
    osc.stop(this.audioContext.currentTime + 0.1);
  }
  
  playDeath(gain, volume) {
    const time = this.audioContext.currentTime;
    const noise = this.createNoiseBuffer();
    const noiseSource = this.audioContext.createBufferSource();
    const noiseGain = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();
    const osc = this.audioContext.createOscillator();
    const oscGain = this.audioContext.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(400, time);
    osc.frequency.exponentialRampToValueAtTime(50, time + 0.5);
    
    oscGain.gain.setValueAtTime(volume * 0.5, time);
    oscGain.gain.exponentialRampToValueAtTime(0.001, time + 0.5);
    
    osc.connect(oscGain);
    oscGain.connect(gain);
    
    noiseSource.buffer = noise;
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1000, time);
    filter.frequency.exponentialRampToValueAtTime(100, time + 0.5);
    
    noiseGain.gain.setValueAtTime(volume * 0.3, time);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, time + 0.5);
    
    noiseSource.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(gain);
    
    osc.start();
    osc.stop(time + 0.5);
    noiseSource.start();
    noiseSource.stop(time + 0.5);
  }
  
  playShield(gain, volume) {
    const time = this.audioContext.currentTime;
    
    const osc = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, time);
    osc.frequency.setValueAtTime(1000, time + 0.1);
    osc.frequency.setValueAtTime(1200, time + 0.2);
    
    gainNode.gain.setValueAtTime(volume * 0.3, time);
    gainNode.gain.setValueAtTime(volume * 0.5, time + 0.1);
    gainNode.gain.setValueAtTime(volume * 0.3, time + 0.2);
    gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.3);
    
    osc.connect(gainNode);
    gainNode.connect(gain);
    
    osc.start();
    osc.stop(time + 0.3);
  }
  
  playPowerup(gain, volume) {
    const time = this.audioContext.currentTime;
    const notes = [400, 500, 600, 800];
    
    notes.forEach((freq, i) => {
      const osc = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time + i * 0.05);
      
      gainNode.gain.setValueAtTime(0.001, time + i * 0.05);
      gainNode.gain.linearRampToValueAtTime(volume * 0.5, time + i * 0.05 + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, time + i * 0.05 + 0.15);
      
      osc.connect(gainNode);
      gainNode.connect(gain);
      
      osc.start(time + i * 0.05);
      osc.stop(time + i * 0.05 + 0.15);
    });
  }
  
  playLevelUp(gain, volume) {
    const time = this.audioContext.currentTime;
    const notes = [523, 659, 784, 1047];
    
    notes.forEach((freq, i) => {
      const osc = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, time + i * 0.1);
      
      gainNode.gain.setValueAtTime(0.001, time + i * 0.1);
      gainNode.gain.linearRampToValueAtTime(volume, time + i * 0.1 + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, time + i * 0.1 + 0.3);
      
      osc.connect(gainNode);
      gainNode.connect(gain);
      
      osc.start(time + i * 0.1);
      osc.stop(time + i * 0.1 + 0.3);
    });
  }
  
  playEnemyShoot(gain, volume) {
    const osc = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    osc.type = 'square';
    osc.frequency.setValueAtTime(400, this.audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, this.audioContext.currentTime + 0.03);
    
    gainNode.gain.setValueAtTime(volume * 0.4, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.03);
    
    osc.connect(gainNode);
    gainNode.connect(gain);
    
    osc.start();
    osc.stop(this.audioContext.currentTime + 0.03);
  }
  
  playEnemyHit(gain, volume) {
    const osc = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    osc.type = 'square';
    osc.frequency.setValueAtTime(150, this.audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, this.audioContext.currentTime + 0.08);
    
    gainNode.gain.setValueAtTime(volume * 0.6, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.08);
    
    osc.connect(gainNode);
    gainNode.connect(gain);
    
    osc.start();
    osc.stop(this.audioContext.currentTime + 0.08);
  }
  
  playEnemyDeath(gain, volume) {
    const time = this.audioContext.currentTime;
    const noise = this.createNoiseBuffer();
    const noiseSource = this.audioContext.createBufferSource();
    const noiseGain = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();
    
    noiseSource.buffer = noise;
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2000, time);
    filter.frequency.exponentialRampToValueAtTime(200, time + 0.2);
    
    noiseGain.gain.setValueAtTime(volume * 0.4, time);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, time + 0.2);
    
    noiseSource.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(gain);
    
    noiseSource.start();
    noiseSource.stop(time + 0.2);
  }
  
  playBossDeath(gain, volume) {
    const time = this.audioContext.currentTime;
    
    for (let i = 0; i < 8; i++) {
      const osc = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(100 + i * 50, time + i * 0.1);
      osc.frequency.exponentialRampToValueAtTime(30, time + i * 0.1 + 0.3);
      
      gainNode.gain.setValueAtTime(volume * (1 - i * 0.1), time + i * 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.001, time + i * 0.1 + 0.3);
      
      osc.connect(gainNode);
      gainNode.connect(gain);
      
      osc.start(time + i * 0.1);
      osc.stop(time + i * 0.1 + 0.3);
    }
  }
  
  playBossSpawn(gain, volume) {
    const time = this.audioContext.currentTime;
    
    for (let i = 0; i < 5; i++) {
      const osc = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(200 + i * 100, time + i * 0.15);
      
      gainNode.gain.setValueAtTime(0.001, time + i * 0.15);
      gainNode.gain.linearRampToValueAtTime(volume * 0.8, time + i * 0.15 + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.001, time + i * 0.15 + 0.2);
      
      osc.connect(gainNode);
      gainNode.connect(gain);
      
      osc.start(time + i * 0.15);
      osc.stop(time + i * 0.15 + 0.2);
    }
  }
  
  playWave(gain, volume) {
    const time = this.audioContext.currentTime;
    const notes = [400, 500, 600];
    
    notes.forEach((freq, i) => {
      const osc = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time + i * 0.1);
      
      gainNode.gain.setValueAtTime(0.001, time + i * 0.1);
      gainNode.gain.linearRampToValueAtTime(volume * 0.5, time + i * 0.1 + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, time + i * 0.1 + 0.2);
      
      osc.connect(gainNode);
      gainNode.connect(gain);
      
      osc.start(time + i * 0.1);
      osc.stop(time + i * 0.1 + 0.2);
    });
  }
  
  playLevelStart(gain, volume) {
    const time = this.audioContext.currentTime;
    const notes = [523, 659, 784, 1047];
    
    notes.forEach((freq, i) => {
      const osc = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, time + i * 0.08);
      
      gainNode.gain.setValueAtTime(0.001, time + i * 0.08);
      gainNode.gain.linearRampToValueAtTime(volume * 0.6, time + i * 0.08 + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, time + i * 0.08 + 0.25);
      
      osc.connect(gainNode);
      gainNode.connect(gain);
      
      osc.start(time + i * 0.08);
      osc.stop(time + i * 0.08 + 0.25);
    });
  }
  
  playGameOver(gain, volume) {
    const time = this.audioContext.currentTime;
    const notes = [400, 350, 300, 200];
    
    notes.forEach((freq, i) => {
      const osc = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, time + i * 0.2);
      
      gainNode.gain.setValueAtTime(0.001, time + i * 0.2);
      gainNode.gain.linearRampToValueAtTime(volume * (1 - i * 0.15), time + i * 0.2 + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.001, time + i * 0.2 + 0.4);
      
      osc.connect(gainNode);
      gainNode.connect(gain);
      
      osc.start(time + i * 0.2);
      osc.stop(time + i * 0.2 + 0.4);
    });
  }
  
  playVictory(gain, volume) {
    const time = this.audioContext.currentTime;
    const notes = [523, 659, 784, 1047, 1319];
    
    notes.forEach((freq, i) => {
      const osc = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time + i * 0.12);
      
      gainNode.gain.setValueAtTime(0.001, time + i * 0.12);
      gainNode.gain.linearRampToValueAtTime(volume, time + i * 0.12 + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, time + i * 0.12 + 0.4);
      
      osc.connect(gainNode);
      gainNode.connect(gain);
      
      osc.start(time + i * 0.12);
      osc.stop(time + i * 0.12 + 0.4);
    });
  }
  
  playAchievement(gain, volume) {
    const time = this.audioContext.currentTime;
    const notes = [523, 659, 784, 1047, 1175, 1319];
    
    notes.forEach((freq, i) => {
      const osc = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, time + i * 0.08);
      
      gainNode.gain.setValueAtTime(0.001, time + i * 0.08);
      gainNode.gain.linearRampToValueAtTime(volume * 0.8, time + i * 0.08 + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, time + i * 0.08 + 0.25);
      
      osc.connect(gainNode);
      gainNode.connect(gain);
      
      osc.start(time + i * 0.08);
      osc.stop(time + i * 0.08 + 0.25);
    });
  }
  
  playCoinCollect(gain, volume) {
    const time = this.audioContext.currentTime;
    const notes = [1200, 1400];
    
    notes.forEach((freq, i) => {
      const osc = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time + i * 0.05);
      
      gainNode.gain.setValueAtTime(volume * 0.5, time + i * 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.001, time + i * 0.05 + 0.1);
      
      osc.connect(gainNode);
      gainNode.connect(gain);
      
      osc.start(time + i * 0.05);
      osc.stop(time + i * 0.05 + 0.1);
    });
  }
  
  playNewPlane(gain, volume) {
    const time = this.audioContext.currentTime;
    const notes = [600, 800, 1000, 1200];
    
    notes.forEach((freq, i) => {
      const osc = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time + i * 0.1);
      
      gainNode.gain.setValueAtTime(0.001, time + i * 0.1);
      gainNode.gain.linearRampToValueAtTime(volume * 0.7, time + i * 0.1 + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, time + i * 0.1 + 0.2);
      
      osc.connect(gainNode);
      gainNode.connect(gain);
      
      osc.start(time + i * 0.1);
      osc.stop(time + i * 0.1 + 0.2);
    });
  }
  
  playWarning(gain, volume) {
    const time = this.audioContext.currentTime;
    
    for (let i = 0; i < 3; i++) {
      const osc = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      osc.type = 'square';
      osc.frequency.setValueAtTime(600, time + i * 0.15);
      osc.frequency.setValueAtTime(400, time + i * 0.15 + 0.07);
      
      gainNode.gain.setValueAtTime(volume * 0.7, time + i * 0.15);
      gainNode.gain.setValueAtTime(volume * 0.7, time + i * 0.15 + 0.07);
      gainNode.gain.exponentialRampToValueAtTime(0.001, time + i * 0.15 + 0.14);
      
      osc.connect(gainNode);
      gainNode.connect(gain);
      
      osc.start(time + i * 0.15);
      osc.stop(time + i * 0.15 + 0.14);
    }
  }
  
  playSlowTime(gain, volume) {
    const osc = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, this.audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, this.audioContext.currentTime + 0.3);
    
    gainNode.gain.setValueAtTime(volume * 0.4, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.3);
    
    osc.connect(gainNode);
    gainNode.connect(gain);
    
    osc.start();
    osc.stop(this.audioContext.currentTime + 0.3);
  }
  
  playGeneric(gain, volume, soundType) {
    const osc = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(500, this.audioContext.currentTime);
    
    gainNode.gain.setValueAtTime(volume * 0.5, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.1);
    
    osc.connect(gainNode);
    gainNode.connect(gain);
    
    osc.start();
    osc.stop(this.audioContext.currentTime + 0.1);
  }
  
  createNoiseBuffer() {
    if (this.activeSounds.has('noise')) {
      return this.activeSounds.get('noise');
    }
    
    const bufferSize = this.audioContext.sampleRate * 0.5;
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const output = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    
    this.activeSounds.set('noise', buffer);
    return buffer;
  }
  
  startBackgroundSound() {
    if (!this.enabled || !this.audioContext || this.backgroundOscillator) return;
    
    this.resumeContext();
    
    this.backgroundOscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();
    
    this.backgroundOscillator.type = 'sine';
    this.backgroundOscillator.frequency.setValueAtTime(60, this.audioContext.currentTime);
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(100, this.audioContext.currentTime);
    
    gainNode.gain.setValueAtTime(0.05 * this.sfxVolume, this.audioContext.currentTime);
    
    this.backgroundOscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.sfxGain);
    
    this.backgroundOscillator.start();
    
    this.activeSounds.set('background', { oscillator: this.backgroundOscillator, gain: gainNode });
  }
  
  stopBackgroundSound() {
    if (this.backgroundOscillator) {
      this.backgroundOscillator.stop();
      this.backgroundOscillator = null;
      this.activeSounds.delete('background');
    }
  }
  
  stopAll() {
    this.stopBackgroundSound();
    this.activeSounds.forEach((sound, key) => {
      if (key !== 'noise' && sound.oscillator) {
        sound.oscillator.stop();
      }
    });
    this.activeSounds.clear();
  }
}

const soundManager = new SoundManager();

const DIFFICULTY_PRESETS = {
  easy: { id: 'easy', name: '简�?, enemyHpMultiplier: 0.7, enemyDamageMultiplier: 0.7, scoreMultiplier: 0.8 },
  normal: { id: 'normal', name: '普�?, enemyHpMultiplier: 1.0, enemyDamageMultiplier: 1.0, scoreMultiplier: 1.0 },
  hard: { id: 'hard', name: '困难', enemyHpMultiplier: 1.5, enemyDamageMultiplier: 1.5, scoreMultiplier: 1.5 }
}

const PLANE_CONFIGS = [
  { id: 'basic', name: '初级战机', icon: '✈️', hp: 100, damage: 10, speed: 6, cost: 0, description: '标准战机，均衡属�? },
  { id: 'fast', name: '闪电战机', icon: '�?, hp: 70, damage: 8, speed: 9, cost: 500, description: '高速机动，闪避敌人' },
  { id: 'heavy', name: '重型战机', icon: '🛡�?, hp: 150, damage: 15, speed: 4, cost: 800, description: '高血量，重装上阵' },
  { id: 'sniper', name: '狙击战机', icon: '🎯', hp: 80, damage: 25, speed: 5, cost: 1200, description: '高伤害，一击必杀' },
  { id: 'legendary', name: '雷霆战机', icon: '🌩�?, hp: 200, damage: 30, speed: 7, cost: 3000, description: '传说战机，无敌之�? }
]

const ENEMY_CONFIGS = {
  scout: { type: 'scout', hp: 20, damage: 5, speed: 5, score: 100, color: '#718096', size: 20 },
  fighter: { type: 'fighter', hp: 40, damage: 10, speed: 3, score: 200, color: '#4a5568', size: 25, shootInterval: 2000 },
  bomber: { type: 'bomber', hp: 80, damage: 15, speed: 2, score: 500, color: '#2d3748', size: 35, shootInterval: 1500 },
  elite: { type: 'elite', hp: 120, damage: 20, speed: 4, score: 1000, color: '#1a202c', size: 30, shootInterval: 1000 },
  boss1: { type: 'boss1', hp: 500, damage: 30, speed: 1, score: 5000, color: '#1a202c', size: 80, phases: 2 },
  boss2: { type: 'boss2', hp: 800, damage: 40, speed: 1.5, score: 10000, color: '#1a202c', size: 90, phases: 3 },
  boss3: { type: 'boss3', hp: 1200, damage: 50, speed: 2, score: 15000, color: '#1a202c', size: 100, phases: 3 }
}

const POWERUP_CONFIGS = [
  { type: 'health', icon: '💛', color: '#ffd700', effect: 'restoreHealth', value: 30 },
  { type: 'energy', icon: '�?, color: '#00d4ff', effect: 'restoreEnergy', value: 50 },
  { type: 'weapon', icon: '🔫', color: '#6366f1', effect: 'upgradeWeapon', value: 1 },
  { type: 'shield', icon: '🛡�?, color: '#22c55e', effect: 'activateShield', value: 0 },
  { type: 'coins', icon: '💰', color: '#ffd700', effect: 'addCoins', value: 100 },
  { type: 'slow', icon: '⏱️', color: '#8b5cf6', effect: 'slowTime', value: 5000 }
]

const LEVEL_CONFIGS = [
  { level: 1, name: '星际边境', waves: 3, enemies: ['scout', 'fighter'], boss: 'boss1' },
  { level: 2, name: '深空探索', waves: 4, enemies: ['scout', 'fighter', 'bomber'], boss: 'boss1' },
  { level: 3, name: '敌方防线', waves: 5, enemies: ['fighter', 'bomber', 'elite'], boss: 'boss2' },
  { level: 4, name: '要塞突破', waves: 6, enemies: ['bomber', 'elite'], boss: 'boss2' },
  { level: 5, name: '最终决�?, waves: 7, enemies: ['elite'], boss: 'boss3' }
]

const ACHIEVEMENT_CONFIGS = [
  { id: 'first_game', name: '初次升空', icon: '🎮', description: '完成第一次游�?, reward: 100, condition: (s) => s.totalGames >= 1 },
  { id: 'first_win', name: '初战告捷', icon: '🏆', description: '通关第一�?, reward: 200, condition: (s) => s.maxLevel >= 1 },
  { id: 'score_1000', name: '千分达人', icon: '�?, description: '单局达到1000�?, reward: 300, condition: (s) => s.maxScore >= 1000 },
  { id: 'score_5000', name: '王牌飞行�?, icon: '👑', description: '单局达到5000�?, reward: 500, condition: (s) => s.maxScore >= 5000 },
  { id: 'kill_100', name: '杀敌百�?, icon: '💀', description: '累计击杀100敌机', reward: 200, condition: (s) => s.totalKills >= 100 },
  { id: 'kill_500', name: '空中死神', icon: '☠️', description: '累计击杀500敌机', reward: 500, condition: (s) => s.totalKills >= 500 },
  { id: 'boss_killer', name: 'Boss杀�?, icon: '👾', description: '击败Boss', reward: 300, condition: (s) => s.bossKills >= 1 },
  { id: 'perfect_level', name: '完美通关', icon: '💎', description: '满血通关', reward: 400, condition: (s) => s.perfectLevels >= 1 },
  { id: 'collect_100', name: '收集达人', icon: '🎁', description: '收集100个道�?, reward: 200, condition: (s) => s.totalPowerups >= 100 },
  { id: 'unlock_all', name: '战机收藏�?, icon: '🚀', description: '解锁所有战�?, reward: 1000, condition: (s) => s.unlockedPlanes >= PLANE_CONFIGS.length }
]

class Vector2 {
  constructor(x, y) { this.x = x; this.y = y; }
  add(v) { return new Vector2(this.x + v.x, this.y + v.y); }
  sub(v) { return new Vector2(this.x - v.x, this.y - v.y); }
  scale(s) { return new Vector2(this.x * s, this.y * s); }
  length() { return Math.sqrt(this.x * this.x + this.y * this.y); }
  normalize() { const len = this.length(); return len > 0 ? this.scale(1 / len) : new Vector2(0, 0); }
  distanceTo(v) { return this.sub(v).length(); }
}

class SketchStyle {
  static wobble = 2;
  
  static sketchLine(ctx, x1, y1, x2, y2, wobbleAmount = this.wobble) {
    const segments = 4;
    ctx.beginPath();
    ctx.moveTo(x1 + (Math.random() - 0.5) * wobbleAmount, y1 + (Math.random() - 0.5) * wobbleAmount);
    
    for (let i = 1; i <= segments; i++) {
      const t = i / segments;
      const x = x1 + (x2 - x1) * t + (Math.random() - 0.5) * wobbleAmount;
      const y = y1 + (y2 - y1) * t + (Math.random() - 0.5) * wobbleAmount;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  
  static sketchCircle(ctx, x, y, radius, wobbleAmount = this.wobble) {
    const segments = 12;
    ctx.beginPath();
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const r = radius + (Math.random() - 0.5) * wobbleAmount;
      const px = x + Math.cos(angle) * r;
      const py = y + Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
  }
  
  static sketchArc(ctx, x, y, radius, startAngle, endAngle, wobbleAmount = this.wobble) {
    const segments = 16;
    ctx.beginPath();
    for (let i = 0; i <= segments; i++) {
      const angle = startAngle + (endAngle - startAngle) * (i / segments);
      const r = radius + (Math.random() - 0.5) * wobbleAmount;
      const px = x + Math.cos(angle) * r;
      const py = y + Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
  }
  
  static drawSketchyPlane(ctx, size = 30, color = '#4a5568', accentColor = '#2d3748') {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.lineTo(-size * 0.8, size * 0.3);
    ctx.lineTo(-size * 0.3, size * 0.1);
    ctx.lineTo(0, size * 0.3);
    ctx.lineTo(size * 0.3, size * 0.1);
    ctx.lineTo(size * 0.8, size * 0.3);
    ctx.closePath();
    ctx.stroke();
    
    ctx.fillStyle = accentColor;
    ctx.globalAlpha = 0.3;
    ctx.fill();
    ctx.globalAlpha = 1;
    
    ctx.beginPath();
    ctx.moveTo(0, -size * 0.6);
    ctx.lineTo(-size * 0.15, size * 0.1);
    ctx.lineTo(size * 0.15, size * 0.1);
    ctx.closePath();
    ctx.stroke();
    
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(-size * 0.25, -size * 0.1, size * 0.08, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(size * 0.25, -size * 0.1, size * 0.08, 0, Math.PI * 2);
    ctx.fill();
  }
  
  static drawSketchyEnemy(ctx, size = 25, color = '#718096') {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    
    ctx.beginPath();
    ctx.moveTo(0, size * 0.6);
    ctx.lineTo(-size * 0.7, -size * 0.3);
    ctx.lineTo(-size * 0.2, -size * 0.1);
    ctx.lineTo(0, -size * 0.4);
    ctx.lineTo(size * 0.2, -size * 0.1);
    ctx.lineTo(size * 0.7, -size * 0.3);
    ctx.closePath();
    ctx.stroke();
    
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.2;
    ctx.fill();
    ctx.globalAlpha = 1;
    
    ctx.fillStyle = '#1a202c';
    ctx.beginPath();
    ctx.arc(-size * 0.15, 0, size * 0.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(size * 0.15, 0, size * 0.1, 0, Math.PI * 2);
    ctx.fill();
  }
  
  static drawSketchyBullet(ctx, size = 6, color = '#4a5568') {
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    
    ctx.beginPath();
    ctx.arc(0, 0, size, 0, Math.PI * 2);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(-size * 0.3, -size * 0.3, size * 0.4, 0, Math.PI * 2);
    ctx.stroke();
  }
  
  static drawSketchyPowerup(ctx, size = 12, color = '#718096') {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    
    this.sketchCircle(ctx, 0, 0, size, 1.5);
    ctx.stroke();
  }
  
  static drawSketchyExplosion(ctx, x, y, size, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const innerR = size * 0.3;
      const outerR = size * (0.6 + Math.random() * 0.4);
      this.sketchLine(ctx, 
        x + Math.cos(angle) * innerR, 
        y + Math.sin(angle) * innerR,
        x + Math.cos(angle) * outerR,
        y + Math.sin(angle) * outerR,
        1
      );
    }
  }
}

class Player {
  constructor(planeConfig) {
    this.config = planeConfig;
    this.reset();
  }
  
  reset() {
    this.position = new Vector2(CONFIG.CANVAS_WIDTH / 2, CONFIG.CANVAS_HEIGHT - 100);
    this.hp = this.config.hp;
    this.maxHp = this.config.hp;
    this.energy = 0;
    this.maxEnergy = 100;
    this.weaponLevel = 1;
    this.shieldActive = false;
    this.shieldTimer = 0;
    this.invincible = false;
    this.invincibleTimer = 0;
    this.lastFireTime = 0;
    this.secondaryReady = true;
    this.secondaryTimer = 0;
    this.ultimateReady = false;
    this.ultimateCharge = 0;
    this.ultimateActive = false;
    this.ultimateTimer = 0;
    this.slowTimeActive = false;
    this.slowTimeTimer = 0;
  }
  
  update(dt, input, currentTime, canvasWidth, canvasHeight) {
    this.handleMovement(input, dt, canvasWidth, canvasHeight);
    this.handleFiring(currentTime);
    this.handleCooldowns(dt);
    this.handleStatusEffects(dt);
  }
  
  handleMovement(input, dt, canvasWidth, canvasHeight) {
    const speed = this.config.speed * (dt / 16.67);
    const halfSize = 30;
    
    if (input.up) this.position.y -= speed;
    if (input.down) this.position.y += speed;
    if (input.left) this.position.x -= speed;
    if (input.right) this.position.x += speed;
    
    this.position.x = Math.max(halfSize, Math.min(canvasWidth - halfSize, this.position.x));
    this.position.y = Math.max(halfSize, Math.min(canvasHeight - halfSize, this.position.y));
  }
  
  handleFiring(currentTime) {
    if (currentTime - this.lastFireTime > CONFIG.AUTO_FIRE_INTERVAL) {
      this.lastFireTime = currentTime;
      return this.firePrimary();
    }
    return null;
  }
  
  firePrimary() {
    const bullets = [];
    const level = this.weaponLevel;
    const damage = this.config.damage * (1 + (level - 1) * 0.2);
    
    if (level === 1) {
      bullets.push(new Bullet(this.position.x, this.position.y - 20, 0, -CONFIG.BULLET_SPEED, damage, '#00d4ff'));
    } else if (level === 2) {
      bullets.push(new Bullet(this.position.x - 10, this.position.y - 20, 0, -CONFIG.BULLET_SPEED, damage, '#00d4ff'));
      bullets.push(new Bullet(this.position.x + 10, this.position.y - 20, 0, -CONFIG.BULLET_SPEED, damage, '#00d4ff'));
    } else if (level === 3) {
      bullets.push(new Bullet(this.position.x, this.position.y - 25, 0, -CONFIG.BULLET_SPEED * 1.2, damage * 1.5, '#00ff88'));
      bullets.push(new Bullet(this.position.x - 15, this.position.y - 20, -1, -CONFIG.BULLET_SPEED, damage, '#00d4ff'));
      bullets.push(new Bullet(this.position.x + 15, this.position.y - 20, 1, -CONFIG.BULLET_SPEED, damage, '#00d4ff'));
    } else {
      bullets.push(new Bullet(this.position.x, this.position.y - 30, 0, -CONFIG.BULLET_SPEED * 1.5, damage * 2, '#ffd700'));
      bullets.push(new Bullet(this.position.x - 20, this.position.y - 20, -1.5, -CONFIG.BULLET_SPEED * 1.1, damage * 1.5, '#00ff88'));
      bullets.push(new Bullet(this.position.x + 20, this.position.y - 20, 1.5, -CONFIG.BULLET_SPEED * 1.1, damage * 1.5, '#00ff88'));
      bullets.push(new Bullet(this.position.x - 35, this.position.y - 15, -2, -CONFIG.BULLET_SPEED, damage, '#00d4ff'));
      bullets.push(new Bullet(this.position.x + 35, this.position.y - 15, 2, -CONFIG.BULLET_SPEED, damage, '#00d4ff'));
    }
    
    return bullets;
  }
  
  fireSecondary() {
    if (!this.secondaryReady) return null;
    this.secondaryReady = false;
    this.secondaryTimer = CONFIG.SECONDARY_COOLDOWN;
    
    const bullets = [];
    for (let i = -3; i <= 3; i++) {
      bullets.push(new Bullet(this.position.x, this.position.y - 20, i * 0.5, -CONFIG.BULLET_SPEED * 0.8, this.config.damage * 2, '#6366f1'));
    }
    return bullets;
  }
  
  activateUltimate() {
    if (!this.ultimateReady) return false;
    this.ultimateReady = false;
    this.ultimateCharge = 0;
    this.ultimateActive = true;
    this.ultimateTimer = 3000;
    return true;
  }
  
  handleCooldowns(dt) {
    if (!this.secondaryReady) {
      this.secondaryTimer -= dt;
      if (this.secondaryTimer <= 0) this.secondaryReady = true;
    }
    
    if (!this.ultimateReady && this.ultimateCharge < this.maxEnergy) {
      this.ultimateCharge += dt * 0.02;
      if (this.ultimateCharge >= this.maxEnergy) this.ultimateReady = true;
    }
    
    if (this.ultimateActive) {
      this.ultimateTimer -= dt;
      if (this.ultimateTimer <= 0) this.ultimateActive = false;
    }
  }
  
  handleStatusEffects(dt) {
    if (this.shieldActive) {
      this.shieldTimer -= dt;
      if (this.shieldTimer <= 0) this.shieldActive = false;
    }
    
    if (this.invincible) {
      this.invincibleTimer -= dt;
      if (this.invincibleTimer <= 0) this.invincible = false;
    }
    
    if (this.slowTimeActive) {
      this.slowTimeTimer -= dt;
      if (this.slowTimeTimer <= 0) this.slowTimeActive = false;
    }
  }
  
  takeDamage(damage) {
    if (this.invincible) return;
    
    if (this.shieldActive) {
      this.shieldActive = false;
      return;
    }
    
    this.hp -= damage;
    this.invincible = true;
    this.invincibleTimer = 2000;
    
    if (this.hp <= 0) {
      this.hp = 0;
    }
  }
  
  applyPowerup(powerup) {
    switch (powerup.effect) {
      case 'restoreHealth':
        this.hp = Math.min(this.maxHp, this.hp + powerup.value);
        break;
      case 'restoreEnergy':
        this.ultimateCharge = Math.min(this.maxEnergy, this.ultimateCharge + powerup.value);
        break;
      case 'upgradeWeapon':
        this.weaponLevel = Math.min(4, this.weaponLevel + powerup.value);
        break;
      case 'activateShield':
        this.shieldActive = true;
        this.shieldTimer = 5000;
        break;
      case 'addCoins':
        return powerup.value;
      case 'slowTime':
        this.slowTimeActive = true;
        this.slowTimeTimer = powerup.value;
        break;
    }
    return 0;
  }
  
  draw(ctx) {
    ctx.save();
    
    if (this.invincible && Math.floor(Date.now() / 100) % 2 === 0) {
      ctx.globalAlpha = 0.5;
    }
    
    ctx.translate(this.position.x, this.position.y);
    
    if (this.shieldActive) {
      ctx.strokeStyle = 'rgba(34, 197, 94, 0.8)';
      ctx.lineWidth = 2;
      SketchStyle.sketchCircle(ctx, 0, 0, 45 + Math.sin(Date.now() / 200) * 3, 2);
      ctx.stroke();
    }
    
    if (this.ultimateActive) {
      ctx.strokeStyle = 'rgba(255, 215, 0, 0.8)';
      ctx.lineWidth = 3;
      SketchStyle.sketchCircle(ctx, 0, 0, 55, 2.5);
      ctx.stroke();
    }
    
    SketchStyle.drawSketchyPlane(ctx, 30, '#4a5568', '#2d3748');
    
    ctx.fillStyle = '#4a5568';
    ctx.strokeStyle = '#4a5568';
    ctx.lineWidth = 1.5;
    for (let i = 0; i < this.weaponLevel; i++) {
      ctx.beginPath();
      ctx.arc(-18 + i * 12, 25, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
    
    ctx.restore();
  }
}

class Bullet {
  constructor(x, y, dx, dy, damage, color) {
    this.position = new Vector2(x, y);
    this.velocity = new Vector2(dx, dy);
    this.damage = damage;
    this.color = color;
    this.size = 6;
    this.active = true;
  }
  
  update() {
    this.position = this.position.add(this.velocity);
    
    if (this.position.y < -10 || this.position.y > CONFIG.CANVAS_HEIGHT + 10 ||
        this.position.x < -10 || this.position.x > CONFIG.CANVAS_WIDTH + 10) {
      this.active = false;
    }
  }
  
  draw(ctx) {
    ctx.save();
    ctx.translate(this.position.x, this.position.y);
    
    SketchStyle.drawSketchyBullet(ctx, this.size, '#4a5568');
    
    ctx.restore();
  }
}

class Enemy {
  constructor(config, difficultyMultiplier) {
    this.config = config;
    this.difficultyMultiplier = difficultyMultiplier;
    
    this.position = new Vector2(
      Math.random() * (CONFIG.CANVAS_WIDTH - 100) + 50,
      -50
    );
    
    this.hp = config.hp * difficultyMultiplier.enemyHpMultiplier;
    this.maxHp = this.hp;
    this.damage = config.damage * difficultyMultiplier.enemyDamageMultiplier;
    this.score = Math.floor(config.score * difficultyMultiplier.scoreMultiplier);
    
    this.speed = config.speed;
    this.size = config.size;
    this.color = config.color;
    
    this.movementPattern = this.getRandomPattern();
    this.patternTimer = 0;
    this.patternDuration = 2000 + Math.random() * 2000;
    
    this.lastShootTime = 0;
    this.shootInterval = config.shootInterval || 0;
    
    this.active = true;
    this.isBoss = config.type.startsWith('boss');
    this.currentPhase = 1;
    
    if (this.isBoss) {
      this.position = new Vector2(CONFIG.CANVAS_WIDTH / 2, -this.size);
      this.enterPhase(1);
    }
  }
  
  getRandomPattern() {
    const patterns = ['straight', 'zigzag', 'circle', 'dive'];
    return patterns[Math.floor(Math.random() * patterns.length)];
  }
  
  enterPhase(phase) {
    this.currentPhase = phase;
    this.movementPattern = this.isBoss ? 'boss' : this.getRandomPattern();
    this.patternTimer = 0;
  }
  
  update(dt, currentTime, playerPos, canvasWidth, canvasHeight) {
    this.handleMovement(dt);
    
    const margin = 100;
    if (this.position.y > canvasHeight + margin ||
        this.position.y < -this.size - margin ||
        this.position.x < -this.size - margin ||
        this.position.x > canvasWidth + this.size + margin) {
      this.active = false;
      return null;
    }
    
    if (this.position.y > -this.size && this.position.y < canvasHeight) {
      if (this.shootInterval > 0 && currentTime - this.lastShootTime > this.shootInterval) {
        this.lastShootTime = currentTime;
        return this.shoot(playerPos);
      }
    }
    
    return null;
  }
  
  handleMovement(dt) {
    this.patternTimer += dt;
    const speedMultiplier = dt / 16.67;
    
    if (this.isBoss) {
      this.handleBossMovement(dt);
      return;
    }
    
    switch (this.movementPattern) {
      case 'straight':
        this.position.y += this.speed * speedMultiplier;
        break;
      case 'zigzag':
        this.position.y += this.speed * speedMultiplier;
        this.position.x += Math.sin(this.patternTimer / 500) * 2 * speedMultiplier;
        break;
      case 'circle':
        const angle = this.patternTimer / 300;
        this.position.y += this.speed * 0.5 * speedMultiplier;
        this.position.x += Math.cos(angle) * 2 * speedMultiplier;
        break;
      case 'dive':
        if (this.position.y < 150) {
          this.position.y += this.speed * speedMultiplier;
        } else {
          this.position.y += this.speed * 2 * speedMultiplier;
          this.position.x += (Math.random() - 0.5) * 3 * speedMultiplier;
        }
        break;
    }
    
    this.position.x = Math.max(20, Math.min(CONFIG.CANVAS_WIDTH - 20, this.position.x));
  }
  
  handleBossMovement(dt) {
    const speedMultiplier = dt / 16.67;
    
    if (this.position.y < 100) {
      this.position.y += this.speed * speedMultiplier;
      return;
    }
    
    const time = Date.now() / 1000;
    this.position.x = CONFIG.CANVAS_WIDTH / 2 + Math.sin(time * 2) * 200;
    
    if (this.currentPhase >= 2 && this.hp < this.maxHp * 0.5) {
      this.position.y = 80 + Math.sin(time * 3) * 30;
    }
  }
  
  shoot(playerPos) {
    if (!playerPos) return null;
    
    const bullets = [];
    
    if (this.isBoss) {
      return this.bossShoot(playerPos);
    }
    
    const angle = Math.atan2(playerPos.y - this.position.y, playerPos.x - this.position.x);
    bullets.push(new Bullet(
      this.position.x,
      this.position.y + this.size / 2,
      Math.cos(angle) * CONFIG.ENEMY_BULLET_SPEED,
      Math.sin(angle) * CONFIG.ENEMY_BULLET_SPEED,
      this.damage,
      '#ff4444'
    ));
    
    return bullets;
  }
  
  bossShoot(playerPos) {
    const bullets = [];
    const time = Date.now();
    
    switch (this.currentPhase) {
      case 1:
        for (let i = -2; i <= 2; i++) {
          const angle = Math.atan2(playerPos.y - this.position.y, playerPos.x - this.position.x) + i * 0.3;
          bullets.push(new Bullet(
            this.position.x,
            this.position.y + this.size / 2,
            Math.cos(angle) * CONFIG.ENEMY_BULLET_SPEED,
            Math.sin(angle) * CONFIG.ENEMY_BULLET_SPEED,
            this.damage,
            '#ff4444'
          ));
        }
        break;
      case 2:
        for (let i = 0; i < 8; i++) {
          const angle = (time / 500) + (i * Math.PI * 2 / 8);
          bullets.push(new Bullet(
            this.position.x,
            this.position.y + this.size / 2,
            Math.cos(angle) * CONFIG.ENEMY_BULLET_SPEED * 0.8,
            Math.sin(angle) * CONFIG.ENEMY_BULLET_SPEED * 0.8,
            this.damage * 0.8,
            '#ff8800'
          ));
        }
        break;
      case 3:
        const angle = Math.atan2(playerPos.y - this.position.y, playerPos.x - this.position.x);
        bullets.push(new Bullet(
          this.position.x,
          this.position.y + this.size / 2,
          Math.cos(angle) * CONFIG.ENEMY_BULLET_SPEED * 1.5,
          Math.sin(angle) * CONFIG.ENEMY_BULLET_SPEED * 1.5,
          this.damage * 2,
          '#ff0000'
        ));
        for (let i = 0; i < 12; i++) {
          const spreadAngle = (time / 300) + (i * Math.PI * 2 / 12);
          bullets.push(new Bullet(
            this.position.x,
            this.position.y + this.size / 2,
            Math.cos(spreadAngle) * CONFIG.ENEMY_BULLET_SPEED * 0.5,
            Math.sin(spreadAngle) * CONFIG.ENEMY_BULLET_SPEED * 0.5,
            this.damage * 0.5,
            '#ff6666'
          ));
        }
        break;
    }
    
    return bullets;
  }
  
  takeDamage(damage) {
    this.hp -= damage;
    
    if (this.isBoss) {
      const phaseThresholds = [1, 0.66, 0.33];
      for (let i = phaseThresholds.length - 1; i >= 0; i--) {
        if (this.hp / this.maxHp <= phaseThresholds[i] && this.currentPhase < this.config.phases) {
          this.enterPhase(i + 1);
          break;
        }
      }
    }
    
    if (this.hp <= 0) {
      this.active = false;
      return true;
    }
    return false;
  }
  
  draw(ctx) {
    ctx.save();
    ctx.translate(this.position.x, this.position.y);
    
    if (this.isBoss) {
      this.drawBoss(ctx);
    } else {
      this.drawEnemy(ctx);
    }
    
    if (this.hp < this.maxHp) {
      const hpWidth = this.size * 2;
      const hpHeight = 4;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.fillRect(-hpWidth / 2, -this.size / 2 - 12, hpWidth, hpHeight);
      ctx.strokeStyle = '#2d3748';
      ctx.lineWidth = 1;
      ctx.strokeRect(-hpWidth / 2, -this.size / 2 - 12, hpWidth, hpHeight);
      ctx.fillStyle = this.hp > this.maxHp * 0.3 ? '#48bb78' : '#f56565';
      ctx.fillRect(-hpWidth / 2, -this.size / 2 - 12, hpWidth * (this.hp / this.maxHp), hpHeight);
    }
    
    ctx.restore();
  }
  
  drawEnemy(ctx) {
    SketchStyle.drawSketchyEnemy(ctx, this.size, '#4a5568');
  }
  
  drawBoss(ctx) {
    ctx.strokeStyle = '#4a5568';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.beginPath();
    ctx.moveTo(0, this.size * 0.5);
    ctx.lineTo(-this.size * 0.5, this.size * 0.1);
    ctx.lineTo(-this.size * 0.35, -this.size * 0.15);
    ctx.lineTo(-this.size * 0.5, -this.size * 0.4);
    ctx.lineTo(this.size * 0.5, -this.size * 0.4);
    ctx.lineTo(this.size * 0.35, -this.size * 0.15);
    ctx.lineTo(this.size * 0.5, this.size * 0.1);
    ctx.closePath();
    ctx.stroke();
    
    ctx.fillStyle = '#4a5568';
    ctx.globalAlpha = 0.2;
    ctx.fill();
    ctx.globalAlpha = 1;
    
    ctx.fillStyle = '#1a202c';
    ctx.beginPath();
    ctx.arc(-this.size * 0.18, -this.size * 0.1, this.size * 0.08, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(this.size * 0.18, -this.size * 0.1, this.size * 0.08, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.strokeStyle = '#4a5568';
    ctx.lineWidth = 2;
    SketchStyle.sketchLine(ctx, -this.size * 0.4, this.size * 0.05, -this.size * 0.25, this.size * 0.25);
    SketchStyle.sketchLine(ctx, this.size * 0.4, this.size * 0.05, this.size * 0.25, this.size * 0.25);
  }
}

class Powerup {
  constructor(x, y, type) {
    const config = POWERUP_CONFIGS.find(p => p.type === type) || POWERUP_CONFIGS[0];
    this.position = new Vector2(x, y);
    this.type = type;
    this.config = config;
    this.size = 25;
    this.speed = 2;
    this.active = true;
    this.bobOffset = Math.random() * Math.PI * 2;
  }
  
  static random(x, y) {
    const types = POWERUP_CONFIGS.map(p => p.type);
    const type = types[Math.floor(Math.random() * types.length)];
    return new Powerup(x, y, type);
  }
  
  update() {
    this.position.y += this.speed;
    this.bobOffset += 0.05;
    
    if (this.position.y > CONFIG.CANVAS_HEIGHT + 50) {
      this.active = false;
    }
  }
  
  draw(ctx) {
    ctx.save();
    ctx.translate(this.position.x, this.position.y + Math.sin(this.bobOffset) * 5);
    
    ctx.strokeStyle = '#4a5568';
    ctx.lineWidth = 2;
    SketchStyle.sketchCircle(ctx, 0, 0, this.size, 2);
    ctx.stroke();
    
    ctx.fillStyle = '#2d3748';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.config.icon, 0, 0);
    
    ctx.restore();
  }
}

class Particle {
  constructor(x, y, color, speed, lifetime, isExplosion = false) {
    this.position = new Vector2(x, y);
    this.velocity = new Vector2((Math.random() - 0.5) * speed, (Math.random() - 0.5) * speed);
    this.color = color;
    this.lifetime = lifetime;
    this.maxLifetime = lifetime;
    this.size = isExplosion ? Math.random() * 6 + 4 : Math.random() * 4 + 2;
    this.active = true;
    this.isExplosion = isExplosion;
  }
  
  update(dt) {
    this.position = this.position.add(this.velocity);
    this.lifetime -= dt;
    this.size *= 0.98;
    
    if (this.lifetime <= 0) {
      this.active = false;
    }
  }
  
  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.lifetime / this.maxLifetime;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 1.5;
    
    if (this.isExplosion) {
      SketchStyle.drawSketchyExplosion(ctx, this.position.x, this.position.y, this.size * 2, this.color);
    } else {
      SketchStyle.sketchCircle(ctx, this.position.x, this.position.y, this.size, 1);
      ctx.stroke();
    }
    
    ctx.restore();
  }
}

class Star {
  constructor() {
    this.reset();
  }
  
  reset() {
    this.x = Math.random() * CONFIG.CANVAS_WIDTH;
    this.y = Math.random() * CONFIG.CANVAS_HEIGHT;
    this.size = Math.random() * 2 + 0.5;
    this.speed = Math.random() * 2 + 0.5;
    this.brightness = Math.random();
    this.brightnessDir = Math.random() > 0.5 ? 1 : -1;
  }
  
  update() {
    this.y += this.speed;
    this.brightness += 0.02 * this.brightnessDir;
    
    if (this.brightness <= 0.2 || this.brightness >= 1) {
      this.brightnessDir *= -1;
    }
    
    if (this.y > CONFIG.CANVAS_HEIGHT) {
      this.reset();
      this.y = -5;
    }
  }
  
  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.brightness * 0.6;
    ctx.strokeStyle = '#4a5568';
    ctx.lineWidth = 1;
    
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size + (Math.random() - 0.5) * 0.5, 0, Math.PI * 2);
    ctx.stroke();
    
    ctx.restore();
  }
}

class GameState {
  constructor() {
    this.status = 'MENU';
    this.score = 0;
    this.coins = 0;
    this.highScore = parseInt(localStorage.getItem('thunder_highScore') || '0');
    this.level = 1;
    this.wave = 1;
    this.waveEnemies = [];
    this.waveIndex = 0;
    this.enemies = [];
    this.playerBullets = [];
    this.enemyBullets = [];
    this.powerups = [];
    this.particles = [];
    this.stars = [];
    
    for (let i = 0; i < 100; i++) {
      this.stars.push(new Star());
    }
    
    this.currentPlaneId = localStorage.getItem('thunder_currentPlane') || 'basic';
    this.unlockedPlanes = JSON.parse(localStorage.getItem('thunder_unlockedPlanes') || '["basic"]');
    this.totalCoins = parseInt(localStorage.getItem('thunder_coins') || '0');
    
    this.stats = JSON.parse(localStorage.getItem('thunder_stats') || JSON.stringify({
      totalGames: 0, totalKills: 0, totalCoins: 0, maxScore: 0,
      maxLevel: 0, bossKills: 0, perfectLevels: 0, totalPowerups: 0, unlockedPlanes: 1
    }));
    
    this.completedAchievements = JSON.parse(localStorage.getItem('thunder_achievements') || '[]');
    this.difficulty = 'normal';
    
    this.player = null;
    this.bossActive = false;
    
    this.lastSpawnTime = 0;
    this.spawnInterval = 2000;
    
    this.input = { up: false, down: false, left: false, right: false, secondary: false, ultimate: false };
    this.lastInputTime = { secondary: 0, ultimate: 0 };
  }
  
  startGame() {
    const planeConfig = PLANE_CONFIGS.find(p => p.id === this.currentPlaneId) || PLANE_CONFIGS[0];
    this.player = new Player(planeConfig);
    
    this.status = 'PLAYING';
    this.score = 0;
    this.coins = 0;
    this.level = 1;
    this.wave = 1;
    this.enemies = [];
    this.playerBullets = [];
    this.enemyBullets = [];
    this.powerups = [];
    this.particles = [];
    this.bossActive = false;
    
    soundManager.play('levelStart', SOUND_CONFIGS.ENVIRONMENT.levelStart);
    soundManager.startBackgroundSound();
    
    this.startWave();
  }
  
  startWave() {
    const levelConfig = LEVEL_CONFIGS[Math.min(this.level - 1, LEVEL_CONFIGS.length - 1)];
    const enemyTypes = levelConfig.enemies;
    
    this.waveEnemies = [];
    const enemyCount = 3 + this.wave * 2;
    
    for (let i = 0; i < enemyCount; i++) {
      const type = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
      this.waveEnemies.push(type);
    }
    
    this.waveIndex = 0;
    this.lastSpawnTime = 0;
    
    soundManager.play('wave', SOUND_CONFIGS.ENVIRONMENT.wave);
  }
  
  spawnEnemy() {
    if (this.waveIndex >= this.waveEnemies.length) return;
    
    const type = this.waveEnemies[this.waveIndex];
    const config = ENEMY_CONFIGS[type];
    if (config) {
      this.enemies.push(new Enemy(config, DIFFICULTY_PRESETS[this.difficulty]));
    }
    this.waveIndex++;
  }
  
  spawnBoss() {
    const levelConfig = LEVEL_CONFIGS[Math.min(this.level - 1, LEVEL_CONFIGS.length - 1)];
    const config = ENEMY_CONFIGS[levelConfig.boss];
    if (config) {
      this.enemies.push(new Enemy(config, DIFFICULTY_PRESETS[this.difficulty]));
      this.bossActive = true;
      soundManager.play('bossSpawn', SOUND_CONFIGS.ENEMY.bossSpawn);
    }
  }
  
  update(dt, currentTime, canvasWidth, canvasHeight) {
    if (this.status !== 'PLAYING') return;
    
    this.updateStars();
    this.handleSpawning(currentTime);
    this.updatePlayer(dt, currentTime, canvasWidth, canvasHeight);
    this.updateEnemies(dt, currentTime, canvasWidth, canvasHeight);
    this.updateBullets();
    this.updatePowerups();
    this.updateParticles(dt);
    this.checkCollisions();
    this.checkWaveComplete();
  }
  
  updateStars() {
    this.stars.forEach(star => star.update());
  }
  
  handleSpawning(currentTime) {
    if (!this.bossActive && !this.player.slowTimeActive) {
      if (currentTime - this.lastSpawnTime > this.spawnInterval) {
        this.spawnEnemy();
        this.lastSpawnTime = currentTime;
      }
    }
  }
  
  updatePlayer(dt, currentTime, canvasWidth, canvasHeight) {
    if (!this.player) return;
    
    const adjustedDt = this.player.slowTimeActive ? dt * 0.5 : dt;
    const bullets = this.player.update(adjustedDt, this.input, currentTime, canvasWidth, canvasHeight);
    
    if (bullets && bullets.length > 0) {
      this.playerBullets.push(...bullets);
      soundManager.play('shoot', SOUND_CONFIGS.PLAYER.shoot);
    }
    
    if (this.input.secondary && currentTime - this.lastInputTime.secondary > 200) {
      const secondaryBullets = this.player.fireSecondary();
      if (secondaryBullets) {
        this.playerBullets.push(...secondaryBullets);
        this.lastInputTime.secondary = currentTime;
        soundManager.play('secondary', SOUND_CONFIGS.PLAYER.secondary);
      }
    }
    
    if (this.input.ultimate && currentTime - this.lastInputTime.ultimate > 500) {
      if (this.player.activateUltimate()) {
        this.createExplosion(this.player.position.x, this.player.position.y, '#ffd700', 30);
        this.lastInputTime.ultimate = currentTime;
        soundManager.play('ultimate', SOUND_CONFIGS.PLAYER.ultimate);
      }
    }
    
    if (this.player.hp <= 0) {
      this.gameOver();
    }
  }
  
  updateEnemies(dt, currentTime, canvasWidth, canvasHeight) {
    const adjustedDt = this.player?.slowTimeActive ? dt * 0.5 : dt;
    
    this.enemies.forEach(enemy => {
      const bullets = enemy.update(adjustedDt, currentTime, this.player?.position, canvasWidth, canvasHeight);
      if (bullets && bullets.length > 0) {
        this.enemyBullets.push(...bullets);
        if (enemy.config.type.startsWith('boss')) {
          soundManager.play('bossSpawn', SOUND_CONFIGS.ENEMY.bossSpawn);
        } else {
          soundManager.play('enemyShoot', SOUND_CONFIGS.ENEMY.shoot);
        }
      }
    });
    
    this.enemies = this.enemies.filter(e => e.active);
  }
  
  updateBullets() {
    this.playerBullets.forEach(bullet => {
      bullet.update();
    });
    this.playerBullets = this.playerBullets.filter(b => b.active);
    
    this.enemyBullets.forEach(bullet => {
      bullet.update();
    });
    this.enemyBullets = this.enemyBullets.filter(b => b.active);
  }
  
  updatePowerups() {
    this.powerups.forEach(p => p.update());
    this.powerups = this.powerups.filter(p => p.active);
  }
  
  updateParticles(dt) {
    this.particles.forEach(p => p.update(dt));
    this.particles = this.particles.filter(p => p.active);
  }
  
  checkCollisions() {
    if (!this.player) return;
    
    this.playerBullets.forEach(bullet => {
      this.enemies.forEach(enemy => {
        if (bullet.position.distanceTo(enemy.position) < enemy.size / 2 + bullet.size) {
          bullet.active = false;
          const killed = enemy.takeDamage(bullet.damage);
          
          soundManager.play('enemyHit', SOUND_CONFIGS.ENEMY.hit);
          
          if (killed) {
            this.createExplosion(enemy.position.x, enemy.position.y, enemy.color, 15);
            this.score += enemy.score;
            this.coins += Math.floor(enemy.score / 10);
            this.stats.totalKills++;
            
            if (enemy.isBoss) {
              this.stats.bossKills++;
              this.bossActive = false;
              soundManager.play('bossDeath', SOUND_CONFIGS.ENEMY.bossDeath);
            } else {
              soundManager.play('enemyDeath', SOUND_CONFIGS.ENEMY.death);
            }
            
            if (Math.random() < 0.2) {
              this.powerups.push(Powerup.random(enemy.position.x, enemy.position.y));
            }
          }
        }
      });
    });
    
    this.enemyBullets.forEach(bullet => {
      if (bullet.position.distanceTo(this.player.position) < 25 + bullet.size) {
        bullet.active = false;
        this.player.takeDamage(bullet.damage);
        this.createExplosion(this.player.position.x, this.player.position.y, '#ff4444', 10);
        soundManager.play('hit', SOUND_CONFIGS.PLAYER.hit);
      }
    });
    
    this.enemies.forEach(enemy => {
      if (enemy.position.distanceTo(this.player.position) < enemy.size / 2 + 25) {
        this.player.takeDamage(enemy.damage);
        this.createExplosion(this.player.position.x, this.player.position.y, '#ff4444', 15);
        soundManager.play('hit', SOUND_CONFIGS.PLAYER.hit);
        
        if (!enemy.isBoss) {
          enemy.active = false;
        }
      }
    });
    
    this.powerups.forEach(powerup => {
      if (powerup.position.distanceTo(this.player.position) < powerup.size + 25) {
        powerup.active = false;
        const coins = this.player.applyPowerup(powerup);
        if (coins > 0) {
          this.coins += coins;
          soundManager.play('coinCollect', SOUND_CONFIGS.SPECIAL.coinCollect);
        } else {
          soundManager.play('powerup', SOUND_CONFIGS.PLAYER.powerup);
        }
        this.stats.totalPowerups++;
        this.createExplosion(powerup.position.x, powerup.position.y, powerup.config.color, 8);
      }
    });
  }
  
  checkWaveComplete() {
    const levelConfig = LEVEL_CONFIGS[Math.min(this.level - 1, LEVEL_CONFIGS.length - 1)];
    
    if (!this.bossActive && this.waveIndex >= this.waveEnemies.length && this.enemies.length === 0) {
      this.wave++;
      
      if (this.wave > levelConfig.waves) {
        this.spawnBoss();
      } else {
        this.startWave();
      }
    }
    
    if (this.bossActive && this.enemies.length === 0) {
      this.levelComplete();
    }
  }
  
  levelComplete() {
    if (this.player.hp === this.player.maxHp) {
      this.stats.perfectLevels++;
    }
    
    this.level++;
    this.stats.maxLevel = Math.max(this.stats.maxLevel, this.level - 1);
    
    soundManager.play('levelUp', SOUND_CONFIGS.PLAYER.levelUp);
    
    if (this.level > LEVEL_CONFIGS.length) {
      this.gameOver(true);
    } else {
      this.wave = 1;
      this.bossActive = false;
      this.startWave();
    }
  }
  
  gameOver(completed = false) {
    this.status = 'GAME_OVER';
    this.stats.totalGames++;
    this.stats.totalCoins += this.coins;
    this.stats.maxScore = Math.max(this.stats.maxScore, this.score);
    
    soundManager.stopBackgroundSound();
    
    if (completed) {
      soundManager.play('victory', SOUND_CONFIGS.ENVIRONMENT.victory);
    } else {
      soundManager.play('gameOver', SOUND_CONFIGS.ENVIRONMENT.gameOver);
      soundManager.play('death', SOUND_CONFIGS.PLAYER.death);
    }
    
    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem('thunder_highScore', this.highScore.toString());
    }
    
    this.totalCoins += this.coins;
    localStorage.setItem('thunder_coins', this.totalCoins.toString());
    
    this.stats.unlockedPlanes = this.unlockedPlanes.length;
    localStorage.setItem('thunder_stats', JSON.stringify(this.stats));
    
    this.checkAchievements();
  }
  
  createExplosion(x, y, color, count) {
    for (let i = 0; i < count; i++) {
      this.particles.push(new Particle(x, y, color, 4, 500));
    }
  }
  
  checkAchievements() {
    const newAchievements = [];
    
    ACHIEVEMENT_CONFIGS.forEach(achievement => {
      if (!this.completedAchievements.includes(achievement.id)) {
        if (achievement.condition(this.stats)) {
          this.completedAchievements.push(achievement.id);
          this.totalCoins += achievement.reward;
          newAchievements.push(achievement);
          soundManager.play('achievement', SOUND_CONFIGS.SPECIAL.achievement);
        }
      }
    });
    
    if (newAchievements.length > 0) {
      localStorage.setItem('thunder_achievements', JSON.stringify(this.completedAchievements));
      localStorage.setItem('thunder_coins', this.totalCoins.toString());
    }
    
    return newAchievements;
  }
  
  unlockPlane(planeId) {
    const plane = PLANE_CONFIGS.find(p => p.id === planeId);
    if (!plane || this.unlockedPlanes.includes(planeId)) return false;
    
    if (this.totalCoins >= plane.cost) {
      soundManager.play('newPlane', SOUND_CONFIGS.SPECIAL.newPlane);
      this.totalCoins -= plane.cost;
      this.unlockedPlanes.push(planeId);
      localStorage.setItem('thunder_unlockedPlanes', JSON.stringify(this.unlockedPlanes));
      localStorage.setItem('thunder_coins', this.totalCoins.toString());
      return true;
    }
    return false;
  }
  
  selectPlane(planeId) {
    if (this.unlockedPlanes.includes(planeId)) {
      this.currentPlaneId = planeId;
      localStorage.setItem('thunder_currentPlane', planeId);
      return true;
    }
    return false;
  }
  
  draw(ctx) {
    ctx.fillStyle = '#f7fafc';
    ctx.fillRect(0, 0, CONFIG.CANVAS_WIDTH, CONFIG.CANVAS_HEIGHT);
    
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    for (let x = 0; x < CONFIG.CANVAS_WIDTH; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, CONFIG.CANVAS_HEIGHT);
      ctx.stroke();
    }
    for (let y = 0; y < CONFIG.CANVAS_HEIGHT; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(CONFIG.CANVAS_WIDTH, y);
      ctx.stroke();
    }
    
    this.stars.forEach(star => star.draw(ctx));
    
    if (this.player?.slowTimeActive) {
      ctx.fillStyle = 'rgba(139, 92, 246, 0.15)';
      ctx.fillRect(0, 0, CONFIG.CANVAS_WIDTH, CONFIG.CANVAS_HEIGHT);
    }
    
    this.powerups.forEach(p => p.draw(ctx));
    this.playerBullets.forEach(b => b.draw(ctx));
    this.enemyBullets.forEach(b => b.draw(ctx));
    this.enemies.forEach(e => e.draw(ctx));
    
    if (this.player) {
      this.player.draw(ctx);
    }
    
    this.particles.forEach(p => p.draw(ctx));
  }
}

class InputHandler {
  constructor(gameState) {
    this.gameState = gameState;
    
    this.setupKeyboard();
    this.setupMouse();
    this.setupTouch();
  }
  
  setupKeyboard() {
    document.addEventListener('keydown', (e) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          this.gameState.input.up = true;
          break;
        case 'KeyS':
        case 'ArrowDown':
          this.gameState.input.down = true;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          this.gameState.input.left = true;
          break;
        case 'KeyD':
        case 'ArrowRight':
          this.gameState.input.right = true;
          break;
        case 'Space':
          e.preventDefault();
          this.gameState.input.secondary = true;
          break;
        case 'KeyE':
          this.gameState.input.ultimate = true;
          break;
      }
    });
    
    document.addEventListener('keyup', (e) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          this.gameState.input.up = false;
          break;
        case 'KeyS':
        case 'ArrowDown':
          this.gameState.input.down = false;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          this.gameState.input.left = false;
          break;
        case 'KeyD':
        case 'ArrowRight':
          this.gameState.input.right = false;
          break;
        case 'Space':
          this.gameState.input.secondary = false;
          break;
        case 'KeyE':
          this.gameState.input.ultimate = false;
          break;
      }
    });
  }
  
  setupMouse() {
    const canvas = document.getElementById('gameCanvas');
    let isDragging = false;
    
    canvas.addEventListener('mousedown', (e) => {
      isDragging = true;
    });
    
    canvas.addEventListener('mousemove', (e) => {
      if (!isDragging || !this.gameState.player) return;
      
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const dx = x - this.gameState.player.position.x;
      const dy = y - this.gameState.player.position.y;
      
      this.gameState.input.left = dx < -10;
      this.gameState.input.right = dx > 10;
      this.gameState.input.up = dy < -10;
      this.gameState.input.down = dy > 10;
    });
    
    canvas.addEventListener('mouseup', () => {
      isDragging = false;
      this.gameState.input.left = false;
      this.gameState.input.right = false;
      this.gameState.input.up = false;
      this.gameState.input.down = false;
    });
    
    canvas.addEventListener('mouseleave', () => {
      isDragging = false;
      this.gameState.input.left = false;
      this.gameState.input.right = false;
      this.gameState.input.up = false;
      this.gameState.input.down = false;
    });
  }
  
  setupTouch() {
    const canvas = document.getElementById('gameCanvas');
    let isTouching = false;
    
    canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      isTouching = true;
    }, { passive: false });
    
    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if (!isTouching || !this.gameState.player) return;
      
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      
      const dx = x - this.gameState.player.position.x;
      const dy = y - this.gameState.player.position.y;
      
      this.gameState.input.left = dx < -15;
      this.gameState.input.right = dx > 15;
      this.gameState.input.up = dy < -15;
      this.gameState.input.down = dy > 15;
    }, { passive: false });
    
    canvas.addEventListener('touchend', () => {
      isTouching = false;
      this.gameState.input.left = false;
      this.gameState.input.right = false;
      this.gameState.input.up = false;
      this.gameState.input.down = false;
    });
    
    document.getElementById('mobileSecondary')?.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.gameState.input.secondary = true;
    });
    
    document.getElementById('mobileSecondary')?.addEventListener('touchend', (e) => {
      e.preventDefault();
      this.gameState.input.secondary = false;
    });
    
    document.getElementById('mobileUltimate')?.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.gameState.input.ultimate = true;
    });
    
    document.getElementById('mobileUltimate')?.addEventListener('touchend', (e) => {
      e.preventDefault();
      this.gameState.input.ultimate = false;
    });
    
    const dPadButtons = ['dUp', 'dDown', 'dLeft', 'dRight'];
    dPadButtons.forEach(id => {
      const btn = document.getElementById(id);
      if (!btn) return;
      
      const inputMap = { dUp: 'up', dDown: 'down', dLeft: 'left', dRight: 'right' };
      
      btn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.gameState.input[inputMap[id]] = true;
        btn.classList.add('active');
      });
      
      btn.addEventListener('touchend', (e) => {
        e.preventDefault();
        this.gameState.input[inputMap[id]] = false;
        btn.classList.remove('active');
      });
      
      btn.addEventListener('mousedown', () => {
        this.gameState.input[inputMap[id]] = true;
        btn.classList.add('active');
      });
      
      btn.addEventListener('mouseup', () => {
        this.gameState.input[inputMap[id]] = false;
        btn.classList.remove('active');
      });
    });
  }
}

class UIManager {
  constructor(gameState) {
    this.gameState = gameState;
    this.soundEnabled = localStorage.getItem('thunder_sound') !== 'false';
    this.init();
  }
  
  init() {
    this.setupMenu();
    this.setupGame();
    this.setupShop();
    this.setupAchievements();
    this.setupSound();
    this.updateMenuCoins();
  }
  
  setupMenu() {
    document.getElementById('startBtn').addEventListener('click', () => {
      soundManager.play('click', { ...SOUND_CONFIGS.UI.click, isUI: true });
      this.gameState.startGame();
      this.showScreen('gameScreen');
      this.updateHUD();
    });
    
    document.getElementById('shopBtn').addEventListener('click', () => {
      soundManager.play('click', { ...SOUND_CONFIGS.UI.click, isUI: true });
      this.updateShopUI();
      this.showModal('shopModal');
      soundManager.play('menuOpen', { ...SOUND_CONFIGS.UI.menuOpen, isUI: true });
    });
    
    document.getElementById('achievementsBtn').addEventListener('click', () => {
      soundManager.play('click', { ...SOUND_CONFIGS.UI.click, isUI: true });
      this.updateAchievementsUI();
      this.showModal('achievementModal');
      soundManager.play('menuOpen', { ...SOUND_CONFIGS.UI.menuOpen, isUI: true });
    });
    
    document.querySelectorAll('.difficulty-option').forEach(option => {
      option.addEventListener('click', () => {
        soundManager.play('click', { ...SOUND_CONFIGS.UI.click, isUI: true });
        document.querySelectorAll('.difficulty-option').forEach(o => o.classList.remove('selected'));
        option.classList.add('selected');
        this.gameState.difficulty = option.dataset.difficultyId;
      });
    });
  }
  
  setupGame() {
    document.getElementById('pauseBtn').addEventListener('click', () => {
      soundManager.play('click', { ...SOUND_CONFIGS.UI.click, isUI: true });
      if (this.gameState.status === 'PLAYING') {
        this.gameState.status = 'PAUSED';
        soundManager.stopBackgroundSound();
      } else if (this.gameState.status === 'PAUSED') {
        this.gameState.status = 'PLAYING';
        soundManager.startBackgroundSound();
      }
    });
    
    document.getElementById('restartBtn').addEventListener('click', () => {
      soundManager.play('click', { ...SOUND_CONFIGS.UI.click, isUI: true });
      this.gameState.startGame();
      this.updateHUD();
    });
    
    document.getElementById('backToMenuBtn').addEventListener('click', () => {
      soundManager.play('click', { ...SOUND_CONFIGS.UI.click, isUI: true });
      this.gameState.status = 'MENU';
      this.showScreen('menuScreen');
      soundManager.stopBackgroundSound();
    });
    
    document.getElementById('resumeBtn').addEventListener('click', () => {
      soundManager.play('click', { ...SOUND_CONFIGS.UI.click, isUI: true });
      this.gameState.startGame();
      this.showScreen('gameScreen');
      this.updateHUD();
    });
    
    document.getElementById('backToMenuFromGameOverBtn').addEventListener('click', () => {
      soundManager.play('click', { ...SOUND_CONFIGS.UI.click, isUI: true });
      this.gameState.status = 'MENU';
      this.showScreen('menuScreen');
      this.updateMenuCoins();
    });
  }
  
  setupShop() {
    document.getElementById('closeShopBtn').addEventListener('click', () => {
      soundManager.play('menuClose', { ...SOUND_CONFIGS.UI.menuClose, isUI: true });
      this.hideModal('shopModal');
    });
    
    document.getElementById('closeShopBtn2').addEventListener('click', () => {
      soundManager.play('menuClose', { ...SOUND_CONFIGS.UI.menuClose, isUI: true });
      this.hideModal('shopModal');
    });
  }
  
  setupAchievements() {
    document.getElementById('closeAchievementBtn').addEventListener('click', () => {
      soundManager.play('menuClose', { ...SOUND_CONFIGS.UI.menuClose, isUI: true });
      this.hideModal('achievementModal');
    });
    
    document.getElementById('closeAchievementBtn2').addEventListener('click', () => {
      soundManager.play('menuClose', { ...SOUND_CONFIGS.UI.menuClose, isUI: true });
      this.hideModal('achievementModal');
    });
  }
  
  setupSound() {
    const btn = document.getElementById('soundToggle');
    const panel = document.getElementById('volumePanel');
    btn.textContent = soundManager.enabled ? '🔊' : '🔇';
    
    // 初始化音量滑块�?    document.getElementById('masterVolume').value = Math.round(soundManager.masterVolume * 100);
    document.getElementById('masterVolumeValue').textContent = Math.round(soundManager.masterVolume * 100) + '%';
    document.getElementById('sfxVolume').value = Math.round(soundManager.sfxVolume * 100);
    document.getElementById('sfxVolumeValue').textContent = Math.round(soundManager.sfxVolume * 100) + '%';
    document.getElementById('uiVolume').value = Math.round(soundManager.uiVolume * 100);
    document.getElementById('uiVolumeValue').textContent = Math.round(soundManager.uiVolume * 100) + '%';
    
    btn.addEventListener('click', () => {
      soundManager.toggle();
      btn.textContent = soundManager.enabled ? '🔊' : '🔇';
      soundManager.play('click', { ...SOUND_CONFIGS.UI.click, isUI: true });
      
      // 切换音量面板显示
      if (panel.style.display === 'none') {
        panel.style.display = 'block';
      } else {
        panel.style.display = 'none';
      }
    });
    
    // 音量滑块事件
    document.getElementById('masterVolume').addEventListener('input', (e) => {
      const value = e.target.value / 100;
      soundManager.setMasterVolume(value);
      document.getElementById('masterVolumeValue').textContent = e.target.value + '%';
    });
    
    document.getElementById('sfxVolume').addEventListener('input', (e) => {
      const value = e.target.value / 100;
      soundManager.setSfxVolume(value);
      document.getElementById('sfxVolumeValue').textContent = e.target.value + '%';
    });
    
    document.getElementById('uiVolume').addEventListener('input', (e) => {
      const value = e.target.value / 100;
      soundManager.setUiVolume(value);
      document.getElementById('uiVolumeValue').textContent = e.target.value + '%';
    });
    
    // 点击面板外部关闭
    document.addEventListener('click', (e) => {
      if (!btn.contains(e.target) && !panel.contains(e.target)) {
        panel.style.display = 'none';
      }
    });
  }
  
  showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.style.display = 'none');
    document.getElementById(screenId).style.display = 'flex';
  }
  
  showModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
  }
  
  hideModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
  }
  
  updateHUD() {
    document.getElementById('score').textContent = this.gameState.score;
    document.getElementById('level').textContent = `�?{this.gameState.level}关`;
    document.getElementById('wave').textContent = `${this.gameState.wave}/${LEVEL_CONFIGS[Math.min(this.gameState.level - 1, LEVEL_CONFIGS.length - 1)]?.waves || 5}`;
    document.getElementById('coins').textContent = this.gameState.coins;
    document.getElementById('highScore').textContent = this.gameState.highScore;
    
    if (this.gameState.player) {
      const hpPercent = (this.gameState.player.hp / this.gameState.player.maxHp) * 100;
      const energyPercent = (this.gameState.player.ultimateCharge / this.gameState.player.maxEnergy) * 100;
      
      document.getElementById('healthBar').style.width = `${hpPercent}%`;
      document.getElementById('energyBar').style.width = `${energyPercent}%`;
      document.getElementById('weaponLevel').textContent = `Lv.${this.gameState.player.weaponLevel}`;
    }
  }
  
  updateMenuCoins() {
    document.getElementById('menuCoins').textContent = this.gameState.totalCoins;
  }
  
  updateShopUI() {
    document.getElementById('shopCoins').textContent = this.gameState.totalCoins;
    
    const grid = document.getElementById('planesGrid');
    grid.innerHTML = '';
    
    PLANE_CONFIGS.forEach(plane => {
      const isUnlocked = this.gameState.unlockedPlanes.includes(plane.id);
      const isCurrent = this.gameState.currentPlaneId === plane.id;
      
      const card = document.createElement('div');
      card.className = `plane-card ${isUnlocked ? 'unlocked' : 'locked'} ${isCurrent ? 'current' : ''}`;
      card.innerHTML = `
        <div class="plane-icon">${plane.icon}</div>
        <div class="plane-name">${plane.name}</div>
        <div class="plane-desc">${plane.description}</div>
        <div class="plane-cost">💰 ${plane.cost}</div>
      `;
      
      card.addEventListener('click', () => {
        soundManager.play('click', { ...SOUND_CONFIGS.UI.click, isUI: true });
        if (isUnlocked) {
          this.gameState.selectPlane(plane.id);
          this.showToast(`已选择 ${plane.name}`);
          this.updateShopUI();
        } else {
          if (this.gameState.totalCoins >= plane.cost) {
            this.gameState.unlockPlane(plane.id);
            this.gameState.selectPlane(plane.id);
            this.showToast(`解锁成功�?{plane.name}`);
            this.updateShopUI();
            this.updateMenuCoins();
            soundManager.play('newPlane', SOUND_CONFIGS.SPECIAL.newPlane);
          } else {
            this.showToast('金币不足�?);
            soundManager.play('error', { ...SOUND_CONFIGS.UI.error, isUI: true });
          }
        }
      });
      
      grid.appendChild(card);
    });
  }
  
  updateAchievementsUI() {
    const body = document.getElementById('achievementBody');
    body.innerHTML = '';
    
    ACHIEVEMENT_CONFIGS.forEach(achievement => {
      const isCompleted = this.gameState.completedAchievements.includes(achievement.id);
      
      const item = document.createElement('div');
      item.className = `achievement-item ${isCompleted ? 'completed' : ''}`;
      item.innerHTML = `
        <div class="achievement-icon">${isCompleted ? achievement.icon : '🔒'}</div>
        <div class="achievement-info">
          <div class="achievement-name">${achievement.name}</div>
          <div class="achievement-desc">${achievement.description}</div>
        </div>
        <div class="achievement-reward">💰 ${achievement.reward}</div>
      `;
      
      body.appendChild(item);
    });
  }
  
  showToast(message) {
    const toast = document.getElementById('notificationToast');
    const msg = document.getElementById('toastMessage');
    
    msg.textContent = message;
    toast.style.display = 'block';
    
    setTimeout(() => {
      toast.style.display = 'none';
    }, 2000);
  }
}

class GameEngine {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.gameState = new GameState();
    this.inputHandler = new InputHandler(this.gameState);
    this.uiManager = new UIManager(this.gameState);
    
    this.lastTime = 0;
    this.animationId = null;
    
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }
  
  resize() {
    const container = document.getElementById('gameContainer');
    const rect = container.getBoundingClientRect();
    
    let width = Math.min(rect.width - 40, CONFIG.CANVAS_WIDTH);
    let height = Math.min(rect.height - 200, CONFIG.CANVAS_HEIGHT);
    
    if (window.innerWidth < 768) {
      width = Math.min(window.innerWidth - 20, 480);
      height = Math.min(window.innerHeight - 200, 360);
    }
    
    this.canvas.width = width;
    this.canvas.height = height;
  }
  
  start() {
    this.lastTime = performance.now();
    this.gameLoop();
  }
  
  gameLoop() {
    const currentTime = performance.now();
    const dt = currentTime - this.lastTime;
    this.lastTime = currentTime;
    
    if (this.gameState.status === 'PLAYING') {
      this.gameState.update(dt, currentTime, this.canvas.width, this.canvas.height);
      
      if (this.gameState.status === 'GAME_OVER') {
        this.showGameOver();
      }
    }
    
    this.uiManager.updateHUD();
    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    if (this.gameState.status === 'PLAYING' || this.gameState.status === 'PAUSED') {
      this.gameState.draw(this.ctx);
      
      if (this.gameState.status === 'PAUSED') {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = '#fff';
        this.ctx.font = 'bold 36px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('游戏暂停', this.canvas.width / 2, this.canvas.height / 2);
        this.ctx.font = '18px Arial';
        this.ctx.fillText('点击继续按钮恢复游戏', this.canvas.width / 2, this.canvas.height / 2 + 40);
      }
    }
    
    this.animationId = requestAnimationFrame(() => this.gameLoop());
  }
  
  showGameOver() {
    document.getElementById('finalScore').textContent = `最终得�? ${this.gameState.score}`;
    document.getElementById('coinsEarned').textContent = `获得金币: ${this.gameState.coins}`;
    this.uiManager.showScreen('gameOverScreen');
  }
}

const gameEngine = new GameEngine();
gameEngine.start();
