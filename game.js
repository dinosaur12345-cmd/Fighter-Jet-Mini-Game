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
  SHARE_URL: 'https://dinosaur12345-cmd.github.io/Fighter-Jet-Mini-Game/',
  BACKGROUND: {
    GRADIENT_TOP: '#08082a',
    GRADIENT_MID: '#050515',
    GRADIENT_BOTTOM: '#010105',
    STAR_FAR_COUNT: 80,
    STAR_MID_COUNT: 50,
    STAR_NEAR_COUNT: 25,
    NEBULA_COUNT: 4,
    SHOOTING_STAR_INTERVAL: 4000,
    ROCK_COUNT: 6,
    DUST_COUNT: 35,
    VIGNETTE_STRENGTH: 0.6,
    AMBIENT_COLOR: 'rgba(60, 140, 255, 0.04)',
    NEBULA_COLORS: [
      'rgba(150, 110, 220, 0.10)',
      'rgba(90, 190, 220, 0.07)',
      'rgba(120, 140, 210, 0.09)',
      'rgba(170, 100, 200, 0.06)'
    ]
  }
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

const DIFFICULTY_PRESETS = {
  easy: { id: 'easy', name: '简单', enemyHpMultiplier: 0.7, enemyDamageMultiplier: 0.7, scoreMultiplier: 0.8 },
  normal: { id: 'normal', name: '普通', enemyHpMultiplier: 1.0, enemyDamageMultiplier: 1.0, scoreMultiplier: 1.0 },
  hard: { id: 'hard', name: '困难', enemyHpMultiplier: 1.5, enemyDamageMultiplier: 1.5, scoreMultiplier: 1.5 }
}

const PLANE_CONFIGS = [
  { id: 'basic', name: '初级战机', icon: '✈️', hp: 100, damage: 10, speed: 6, cost: 0, description: '标准战机，均衡属性' },
  { id: 'fast', name: '闪电战机', icon: '⚡', hp: 70, damage: 8, speed: 9, cost: 500, description: '高速机动，闪避敌人' },
  { id: 'heavy', name: '重型战机', icon: '🛡️', hp: 150, damage: 15, speed: 4, cost: 800, description: '高血量，重装上阵' },
  { id: 'sniper', name: '狙击战机', icon: '🎯', hp: 80, damage: 25, speed: 5, cost: 1200, description: '高伤害，一击必杀' },
  { id: 'legendary', name: '雷霆战机', icon: '🌩️', hp: 200, damage: 30, speed: 7, cost: 3000, description: '传说战机，无敌之选' }
]

const ENEMY_CONFIGS = {
  scout: { type: 'scout', baseHp: 20, damage: 5, speed: 5, score: 100, color: '#4ade80', shadowColor: '#6b21a8', glowColor: '#22ff66', trailColor: '#66ff99', shape: 'scout', size: 20 },
  fighter: { type: 'fighter', baseHp: 40, damage: 10, speed: 3, score: 200, color: '#f59e0b', shadowColor: '#7c3aed', glowColor: '#ffbb33', trailColor: '#ffcc66', shape: 'fighter', size: 25, shootInterval: 2000 },
  bomber: { type: 'bomber', baseHp: 80, damage: 15, speed: 2, score: 500, color: '#ef4444', shadowColor: '#6b21a8', glowColor: '#ff4466', trailColor: '#ff6688', shape: 'bomber', size: 35, shootInterval: 1500 },
  elite: { type: 'elite', baseHp: 120, damage: 20, speed: 4, score: 1000, color: '#a855f7', shadowColor: '#4c1d95', glowColor: '#cc66ff', trailColor: '#bb88ff', shape: 'elite', size: 30, shootInterval: 1000 },
  boss1: { type: 'boss1', baseHp: 500, damage: 12, speed: 1, score: 5000, color: '#dc2626', shadowColor: '#7f1d1d', glowColor: '#ff4444', trailColor: '#ff6644', shape: 'boss', size: 80, phases: 3, shootInterval: 1400 },
  boss2: { type: 'boss2', baseHp: 800, damage: 15, speed: 1.2, score: 8000, color: '#9333ea', shadowColor: '#3b0764', glowColor: '#cc66ff', trailColor: '#aa88ff', shape: 'boss', size: 85, phases: 3, shootInterval: 1200 },
  boss3: { type: 'boss3', baseHp: 1200, damage: 18, speed: 1.5, score: 12000, color: '#0891b2', shadowColor: '#164e63', glowColor: '#44ffff', trailColor: '#66ddff', shape: 'boss', size: 95, phases: 3, shootInterval: 1000 },
  boss4: { type: 'boss4', baseHp: 1600, damage: 22, speed: 1.8, score: 16000, color: '#f97316', shadowColor: '#7c2d12', glowColor: '#ff8844', trailColor: '#ffaa66', shape: 'boss', size: 90, phases: 3, shootInterval: 900 },
  boss5: { type: 'boss5', baseHp: 2000, damage: 26, speed: 2, score: 20000, color: '#14b8a6', shadowColor: '#115e59', glowColor: '#44ffcc', trailColor: '#66ffdd', shape: 'boss', size: 100, phases: 4, shootInterval: 800 },
  boss6: { type: 'boss6', baseHp: 2500, damage: 30, speed: 1.5, score: 25000, color: '#e11d48', shadowColor: '#881337', glowColor: '#ff3366', trailColor: '#ff6688', shape: 'boss', size: 110, phases: 4, shootInterval: 700 }
}

const POWERUP_CONFIGS = [
  { type: 'health', icon: '💛', color: '#ffd700', effect: 'restoreHealth', value: 30 },
  { type: 'energy', icon: '⚡', color: '#00d4ff', effect: 'restoreEnergy', value: 50 },
  { type: 'weapon', icon: '🔫', color: '#6366f1', effect: 'upgradeWeapon', value: 1 },
  { type: 'shield', icon: '🛡️', color: '#22c55e', effect: 'activateShield', value: 30 },
  { type: 'coins', icon: '💰', color: '#ffd700', effect: 'addCoins', value: 100 },
  { type: 'slow', icon: '⏱️', color: '#8b5cf6', effect: 'slowTime', value: 5000 }
]

const LEVEL_CONFIGS = [
  { level: 1, name: '星际边境', waves: 3, enemies: ['scout', 'fighter'], boss: 'boss1' },
  { level: 2, name: '深空探索', waves: 3, enemies: ['scout', 'fighter', 'bomber'], boss: 'boss2' },
  { level: 3, name: '暗影突袭', waves: 4, enemies: ['fighter', 'bomber'], boss: 'boss3' },
  { level: 4, name: '敌方防线', waves: 4, enemies: ['fighter', 'bomber', 'elite'], boss: 'boss4' },
  { level: 5, name: '要塞突破', waves: 5, enemies: ['bomber', 'elite'], boss: 'boss1' },
  { level: 6, name: '虚空裂缝', waves: 5, enemies: ['scout', 'elite'], boss: 'boss5' },
  { level: 7, name: '死亡星区', waves: 6, enemies: ['fighter', 'bomber', 'elite'], boss: 'boss2' },
  { level: 8, name: '能量风暴', waves: 6, enemies: ['bomber', 'elite'], boss: 'boss6' },
  { level: 9, name: '最终防线', waves: 7, enemies: ['scout', 'fighter', 'bomber', 'elite'], boss: 'boss3' },
  { level: 10, name: '终极决战', waves: 7, enemies: ['elite', 'bomber'], boss: 'boss4' }
]

const ACHIEVEMENT_CONFIGS = [
  { id: 'first_game', name: '初次升空', icon: '🎮', description: '完成第一次游戏', reward: 100, condition: (s) => s.totalGames >= 1 },
  { id: 'first_win', name: '初战告捷', icon: '🏆', description: '通关第一关', reward: 200, condition: (s) => s.maxLevel >= 1 },
  { id: 'score_1000', name: '千分达人', icon: '⭐', description: '单局达到1000分', reward: 300, condition: (s) => s.maxScore >= 1000 },
  { id: 'score_5000', name: '王牌飞行员', icon: '👑', description: '单局达到5000分', reward: 500, condition: (s) => s.maxScore >= 5000 },
  { id: 'kill_100', name: '杀敌百数', icon: '💀', description: '累计击杀100敌机', reward: 200, condition: (s) => s.totalKills >= 100 },
  { id: 'kill_500', name: '空中死神', icon: '☠️', description: '累计击杀500敌机', reward: 500, condition: (s) => s.totalKills >= 500 },
  { id: 'boss_killer', name: 'Boss杀手', icon: '👾', description: '击败Boss', reward: 300, condition: (s) => s.bossKills >= 1 },
  { id: 'perfect_level', name: '完美通关', icon: '💎', description: '满血通关', reward: 400, condition: (s) => s.perfectLevels >= 1 },
  { id: 'collect_100', name: '收集达人', icon: '🎁', description: '收集100个道具', reward: 200, condition: (s) => s.totalPowerups >= 100 },
  { id: 'unlock_all', name: '战机收藏家', icon: '🚀', description: '解锁所有战机', reward: 1000, condition: (s) => s.unlockedPlanes >= PLANE_CONFIGS.length }
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

class EngineParticle {
  constructor(x, y) {
    this.x = x + (Math.random() - 0.5) * 6;
    this.y = y;
    this.size = 2 + Math.random() * 3;
    this.life = 1;
    this.decay = 0.015 + Math.random() * 0.025;
    this.speedY = 1.5 + Math.random() * 2;
    this.speedX = (Math.random() - 0.5) * 0.6;
  }
  
  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    this.life -= this.decay;
    this.size *= 0.97;
  }
  
  draw(ctx) {
    if (this.life <= 0) return;
    const t = this.life;
    let r, g, b;
    if (t > 0.6) {
      const s = (t - 0.6) / 0.4;
      r = 255; g = 255; b = 200 + 55 * s;
    } else if (t > 0.3) {
      const s = (t - 0.3) / 0.3;
      r = 200 - 80 * s; g = 230 - 30 * s; b = 255;
    } else {
      const s = t / 0.3;
      r = 120 * s; g = 180 * s; b = 200 + 55 * s;
    }
    
    ctx.save();
    ctx.globalAlpha = this.life * 0.6;
    ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.8)`;
    ctx.shadowBlur = 8;
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

class Player {
  constructor(planeConfig) {
    this.KILL_THRESHOLDS = [0, 5, 15, 30];
    this.config = planeConfig;
    this.reset();
  }
  
  reset() {
    this.position = new Vector2(CONFIG.CANVAS_WIDTH / 2, CONFIG.CANVAS_HEIGHT - 100);
    this.hp = this.config.hp;
    this.maxHp = this.config.hp;
    this.maxEnergy = 100;
    this.weaponLevel = 1;
    this.killCount = 0;
    this.shieldHp = 100;
    this.shieldTarget = 100;
    this.maxShield = 100;
    this.shieldRestoreSpeed = 3;
    this.shieldBreakParticles = [];
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
    this.exhaustParticles = [];
    this.breathPhase = 0;
    this.touchTarget = null;
  }
  
  update(dt, input, currentTime, canvasWidth, canvasHeight) {
    this.handleMovement(input, dt, canvasWidth, canvasHeight);
    const bullets = this.handleFiring(currentTime);
    this.handleCooldowns(dt);
    this.handleStatusEffects(dt);
    this.updateExhaust(dt);
    this.breathPhase += 0.03;
    return bullets;
  }
  
  handleMovement(input, dt, canvasWidth, canvasHeight) {
    const speed = this.config.speed * (dt / 16.67);
    const halfSize = 30;
    
    if (input.touchTarget) {
      this.position.x = input.touchTarget.x;
      this.position.y = input.touchTarget.y;
    } else {
      if (input.up) this.position.y -= speed;
      if (input.down) this.position.y += speed;
      if (input.left) this.position.x -= speed;
      if (input.right) this.position.x += speed;
    }
    
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
    const damage = this.config.damage * (1 + (level - 1) * 0.25) * (this.ultimateActive ? 3 : 1);
    
    if (level === 1) {
      const b = new Bullet(this.position.x, this.position.y - 20, 0, -CONFIG.BULLET_SPEED, damage, '#66ddff', level);
      b.innerGlow = '#44aaff';
      bullets.push(b);
    } else if (level === 2) {
      const gap = 14;
      const b1 = new Bullet(this.position.x - gap, this.position.y - 20, 0, -CONFIG.BULLET_SPEED, damage, '#44ddff', level);
      const b2 = new Bullet(this.position.x + gap, this.position.y - 20, 0, -CONFIG.BULLET_SPEED, damage, '#44ddff', level);
      b1.innerGlow = '#2299ff'; b2.innerGlow = '#2299ff';
      bullets.push(b1, b2);
    } else if (level === 3) {
      const b1 = new Bullet(this.position.x, this.position.y - 28, 0, -CONFIG.BULLET_SPEED * 1.3, damage * 1.6, '#00ff88', level);
      const b2 = new Bullet(this.position.x - 20, this.position.y - 20, -1.5, -CONFIG.BULLET_SPEED, damage * 1.2, '#44ddff', level);
      const b3 = new Bullet(this.position.x + 20, this.position.y - 20, 1.5, -CONFIG.BULLET_SPEED, damage * 1.2, '#44ddff', level);
      b1.innerGlow = '#00cc66'; b2.innerGlow = '#2299ff'; b3.innerGlow = '#2299ff';
      b1.trailInterval = 1;
      bullets.push(b1, b2, b3);
    } else {
      const b1 = new Bullet(this.position.x, this.position.y - 32, 0, -CONFIG.BULLET_SPEED * 1.6, damage * 2.2, '#ffd700', level);
      const b2 = new Bullet(this.position.x - 24, this.position.y - 24, -1.8, -CONFIG.BULLET_SPEED * 1.2, damage * 1.6, '#00ff88', level);
      const b3 = new Bullet(this.position.x + 24, this.position.y - 24, 1.8, -CONFIG.BULLET_SPEED * 1.2, damage * 1.6, '#00ff88', level);
      const b4 = new Bullet(this.position.x - 42, this.position.y - 18, -3.0, -CONFIG.BULLET_SPEED, damage, '#44ddff', level);
      const b5 = new Bullet(this.position.x + 42, this.position.y - 18, 3.0, -CONFIG.BULLET_SPEED, damage, '#44ddff', level);
      b1.innerGlow = '#ff8800'; b1.isGolden = true;
      b2.innerGlow = '#00cc66'; b3.innerGlow = '#00cc66';
      b4.innerGlow = '#2299ff'; b5.innerGlow = '#2299ff';
      b1.trailInterval = 1;
      b2.trailInterval = 1;
      b3.trailInterval = 1;
      bullets.push(b1, b2, b3, b4, b5);
    }
    
    return bullets;
  }
  
  fireSecondary() {
    if (!this.secondaryReady) return null;
    this.secondaryReady = false;
    this.secondaryTimer = CONFIG.SECONDARY_COOLDOWN;
    
    const bullets = [];
    for (let i = -3; i <= 3; i++) {
      bullets.push(new Bullet(this.position.x, this.position.y - 20, i * 0.5, -CONFIG.BULLET_SPEED * 0.8, this.config.damage * 2, '#6366f1', 2));
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
      this.ultimateCharge += dt * (this.maxEnergy / 7000);
      if (this.ultimateCharge >= this.maxEnergy) this.ultimateReady = true;
    }
    
    if (this.ultimateActive) {
      this.ultimateTimer -= dt;
      if (this.ultimateTimer <= 0) this.ultimateActive = false;
    }
  }
  
  handleStatusEffects(dt) {
    if (this.shieldHp < this.shieldTarget) {
      this.shieldHp = Math.min(this.shieldTarget, this.shieldHp + this.shieldRestoreSpeed);
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
  
  updateExhaust(dt) {
    for (let i = this.exhaustParticles.length - 1; i >= 0; i--) {
      this.exhaustParticles[i].update();
      if (this.exhaustParticles[i].life <= 0) {
        this.exhaustParticles.splice(i, 1);
      }
    }
      
    // 主引擎尾焰（机尾中心）
    this.exhaustParticles.push(new EngineParticle(0, 32));
    // 两侧引擎舱尾焰
    this.exhaustParticles.push(new EngineParticle(-46, 14));
    this.exhaustParticles.push(new EngineParticle(46, 14));
  }
  
  takeDamage(damage) {
    if (this.invincible || this.ultimateActive) return;
    
    if (this.shieldHp > 0) {
      const prevShield = this.shieldHp;
      this.shieldHp -= damage;
      this.shieldTarget = Math.max(0, this.shieldTarget - damage);
      if (this.shieldHp < 0) {
        this.hp += this.shieldHp;
        this.shieldHp = 0;
      }
      if (this.shieldHp === 0 && prevShield > 0) {
        this.spawnShieldBreak();
      }
      return;
    }
    
    this.hp -= damage;
    this.invincible = true;
    this.invincibleTimer = 2000;
    
    if (this.hp <= 0) {
      this.hp = 0;
    }
  }
  
  addKill(count) {
    this.killCount += count;
    let leveledUp = false;
    while (this.weaponLevel < 4 && this.killCount >= this.KILL_THRESHOLDS[this.weaponLevel]) {
      this.weaponLevel++;
      leveledUp = true;
    }
    return leveledUp;
  }
  
  spawnShieldBreak() {
    for (let i = 0; i < 12; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 3;
      this.shieldBreakParticles.push({
        x: this.position.x, y: this.position.y,
        vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
        life: 1, decay: 0.02 + Math.random() * 0.03,
        size: 2 + Math.random() * 3
      });
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
        this.addKill(5);
        return 0;
        break;
      case 'activateShield':
        this.shieldTarget = Math.min(this.maxShield, this.shieldTarget + powerup.value);
        return powerup.value;
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
    const now = Date.now();
    
    ctx.save();
    
    if (this.invincible && Math.floor(now / 100) % 2 === 0) {
      ctx.globalAlpha = 0.5;
    }
    
    ctx.translate(this.position.x, this.position.y);
    
    for (const p of this.exhaustParticles) {
      p.draw(ctx);
    }
    
    this.drawEngineFlame(ctx, now);
    this.drawFuselage(ctx, now);
    
    if (this.shieldHp > 0) {
      const ratio = this.shieldHp / this.maxShield;
      ctx.save();
      ctx.beginPath();
      ctx.arc(0, 0, 40 + 5 * ratio, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(34, 197, 94, ${0.3 + 0.4 * ratio})`;
      ctx.lineWidth = 2 + ratio;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.restore();
    }
    
    if (this.ultimateActive) {
      ctx.save();
      const pulse = 1 + Math.sin(now / 100) * 0.15;
      const r = 55 * pulse;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 215, 0, ${0.4 + Math.sin(now / 120) * 0.3})`;
      ctx.lineWidth = 3;
      ctx.setLineDash([6, 6]);
      ctx.stroke();
      ctx.restore();
    }
    
    ctx.restore();
  }
  
  drawEngineFlame(ctx, now) {
    const flicker = 0.85 + Math.random() * 0.15;
    const len = 18 + Math.random() * 10;
    ctx.save();
    const colors = ['#44aaff', '#66ccff', '#88ddff', '#aaaaff'];
    
    // 主引擎尾焰（机尾中心）
    for (let i = 3; i >= 0; i--) {
      const w = (6 - i * 1.2) * flicker;
      const h = (len - i * 3) * flicker;
      ctx.fillStyle = colors[i];
      ctx.globalAlpha = 0.5 - i * 0.1;
      ctx.fillRect(-w / 2, 32, w, h);
    }
    
    // 左侧引擎舱尾焰
    const sideLen = 8 + Math.random() * 4;
    for (let i = 3; i >= 0; i--) {
      const w = (4 - i * 0.8) * flicker;
      const h = (sideLen - i * 1.5) * flicker;
      ctx.fillStyle = colors[i];
      ctx.globalAlpha = 0.4 - i * 0.08;
      ctx.fillRect(-46 - w / 2, 14, w, h);
    }
    
    // 右侧引擎舱尾焰
    for (let i = 3; i >= 0; i--) {
      const w = (4 - i * 0.8) * flicker;
      const h = (sideLen - i * 1.5) * flicker;
      ctx.fillStyle = colors[i];
      ctx.globalAlpha = 0.4 - i * 0.08;
      ctx.fillRect(46 - w / 2, 14, w, h);
    }
    
    ctx.restore();
  }
  
  drawFuselage(ctx, now) {
    ctx.save();
    
    const colors = {
      body: '#e0e0e0',
      bodyDark: '#a0a0a0',
      bodyLight: '#f5f5f5',
      accent: '#e53935',
      accentLight: '#ff6b6b',
      cockpit: '#4fc3f7',
      cockpitGlow: '#81d4fa',
      engine: '#616161',
      engineGlow: '#4fc3f7',
      wing: '#bdbdbd',
      wingDark: '#9e9e9e',
    };
    
    const pulse = Math.sin(now / 300) * 0.05;
    
    // 1. 绘制机翼（带圆形引擎舱）
    // 左侧机翼
    ctx.beginPath();
    ctx.moveTo(-28, -3);
    ctx.quadraticCurveTo(-40, -8, -48, 5);
    ctx.quadraticCurveTo(-45, 18, -32, 12);
    ctx.quadraticCurveTo(-26, 8, -28, -3);
    const wingGradient = ctx.createLinearGradient(-48, 0, -25, 0);
    wingGradient.addColorStop(0, colors.wingDark);
    wingGradient.addColorStop(0.5, colors.wing);
    wingGradient.addColorStop(1, colors.bodyLight);
    ctx.fillStyle = wingGradient;
    ctx.fill();
    ctx.strokeStyle = colors.bodyDark;
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // 右侧机翼
    ctx.beginPath();
    ctx.moveTo(28, -3);
    ctx.quadraticCurveTo(40, -8, 48, 5);
    ctx.quadraticCurveTo(45, 18, 32, 12);
    ctx.quadraticCurveTo(26, 8, 28, -3);
    ctx.fillStyle = wingGradient;
    ctx.fill();
    ctx.strokeStyle = colors.bodyDark;
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // 左侧引擎舱（圆形）
    ctx.beginPath();
    ctx.arc(-46, 6, 7, 0, Math.PI * 2);
    ctx.fillStyle = colors.engine;
    ctx.fill();
    ctx.strokeStyle = colors.bodyDark;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    
    // 引擎发光效果
    ctx.beginPath();
    ctx.arc(-46, 6, 4 + pulse * 2, 0, Math.PI * 2);
    const engineGlow = ctx.createRadialGradient(-46, 6, 0, -46, 6, 6);
    engineGlow.addColorStop(0, colors.engineGlow);
    engineGlow.addColorStop(0.5, 'rgba(79, 195, 247, 0.5)');
    engineGlow.addColorStop(1, 'rgba(79, 195, 247, 0)');
    ctx.fillStyle = engineGlow;
    ctx.fill();
    
    // 引擎中心
    ctx.beginPath();
    ctx.arc(-46, 6, 2, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    
    // 右侧引擎舱（圆形）
    ctx.beginPath();
    ctx.arc(46, 6, 7, 0, Math.PI * 2);
    ctx.fillStyle = colors.engine;
    ctx.fill();
    ctx.strokeStyle = colors.bodyDark;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    
    // 引擎发光效果
    ctx.beginPath();
    ctx.arc(46, 6, 4 + pulse * 2, 0, Math.PI * 2);
    ctx.fillStyle = engineGlow;
    ctx.fill();
    
    // 引擎中心
    ctx.beginPath();
    ctx.arc(46, 6, 2, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    
    // 2. 绘制机身主体
    // 上半部分
    ctx.beginPath();
    ctx.moveTo(-16, -20);
    ctx.quadraticCurveTo(-12, -28, 0, -26);
    ctx.quadraticCurveTo(12, -28, 16, -20);
    ctx.quadraticCurveTo(18, -10, 16, -3);
    ctx.lineTo(-16, -3);
    ctx.closePath();
    const bodyTopGradient = ctx.createLinearGradient(0, -28, 0, 0);
    bodyTopGradient.addColorStop(0, colors.bodyLight);
    bodyTopGradient.addColorStop(0.7, colors.body);
    bodyTopGradient.addColorStop(1, colors.bodyDark);
    ctx.fillStyle = bodyTopGradient;
    ctx.fill();
    ctx.strokeStyle = colors.bodyDark;
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // 下半部分
    ctx.beginPath();
    ctx.moveTo(-14, -3);
    ctx.quadraticCurveTo(-22, 8, -24, 16);
    ctx.quadraticCurveTo(-18, 24, -8, 20);
    ctx.lineTo(-6, 28);
    ctx.lineTo(6, 28);
    ctx.lineTo(8, 20);
    ctx.quadraticCurveTo(18, 24, 24, 16);
    ctx.quadraticCurveTo(22, 8, 14, -3);
    ctx.closePath();
    const bodyBottomGradient = ctx.createLinearGradient(0, -3, 0, 28);
    bodyBottomGradient.addColorStop(0, colors.body);
    bodyBottomGradient.addColorStop(0.5, colors.bodyDark);
    bodyBottomGradient.addColorStop(1, '#616161');
    ctx.fillStyle = bodyBottomGradient;
    ctx.fill();
    ctx.strokeStyle = '#424242';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // 机尾
    ctx.beginPath();
    ctx.moveTo(-6, 25);
    ctx.lineTo(-5, 32);
    ctx.lineTo(0, 28);
    ctx.lineTo(5, 32);
    ctx.lineTo(6, 25);
    ctx.closePath();
    ctx.fillStyle = '#616161';
    ctx.fill();
    ctx.strokeStyle = '#424242';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // 3. 绘制红色装饰线条
    // 顶部红色条纹
    ctx.beginPath();
    ctx.moveTo(-14, -16);
    ctx.lineTo(-7, -23);
    ctx.lineTo(0, -22);
    ctx.lineTo(7, -23);
    ctx.lineTo(14, -16);
    ctx.strokeStyle = colors.accent;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.stroke();
    
    // 机身红色条纹
    ctx.beginPath();
    ctx.moveTo(-16, -3);
    ctx.lineTo(-20, 8);
    ctx.lineTo(-24, 15);
    ctx.strokeStyle = colors.accent;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(16, -3);
    ctx.lineTo(20, 8);
    ctx.lineTo(24, 15);
    ctx.strokeStyle = colors.accent;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    
    // 机翼红色装饰
    ctx.beginPath();
    ctx.moveTo(-38, -3);
    ctx.lineTo(-46, 6);
    ctx.lineTo(-40, 14);
    ctx.strokeStyle = colors.accent;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(38, -3);
    ctx.lineTo(46, 6);
    ctx.lineTo(40, 14);
    ctx.strokeStyle = colors.accent;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    
    // 4. 绘制驾驶舱
    // 驾驶舱外框
    ctx.beginPath();
    ctx.moveTo(-6, -12);
    ctx.quadraticCurveTo(-7, -20, 0, -20);
    ctx.quadraticCurveTo(7, -20, 6, -12);
    ctx.quadraticCurveTo(5, -7, 0, -6);
    ctx.quadraticCurveTo(-5, -7, -6, -12);
    ctx.closePath();
    ctx.fillStyle = colors.cockpit;
    ctx.fill();
    ctx.strokeStyle = '#1976d2';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    
    // 驾驶舱内部高光
    ctx.beginPath();
    ctx.moveTo(-4, -13);
    ctx.quadraticCurveTo(-2, -17, 0, -16);
    ctx.lineTo(0, -8);
    ctx.quadraticCurveTo(-2, -7, -4, -13);
    ctx.fillStyle = colors.cockpitGlow;
    ctx.globalAlpha = 0.6;
    ctx.fill();
    ctx.globalAlpha = 1;
    
    // 驾驶舱边框装饰
    ctx.beginPath();
    ctx.moveTo(-7, -11);
    ctx.lineTo(-9, -19);
    ctx.lineTo(-4, -20);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 0.8;
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(7, -11);
    ctx.lineTo(9, -19);
    ctx.lineTo(4, -20);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 0.8;
    ctx.stroke();
    
    // 5. 绘制机身细节
    // 机身条纹
    ctx.beginPath();
    ctx.moveTo(-10, 3);
    ctx.lineTo(10, 3);
    ctx.strokeStyle = colors.bodyLight;
    ctx.lineWidth = 0.8;
    ctx.globalAlpha = 0.5;
    ctx.stroke();
    ctx.globalAlpha = 1;
    
    ctx.beginPath();
    ctx.moveTo(-8, 10);
    ctx.lineTo(8, 10);
    ctx.strokeStyle = colors.bodyLight;
    ctx.lineWidth = 0.8;
    ctx.globalAlpha = 0.3;
    ctx.stroke();
    ctx.globalAlpha = 1;
    
    // 6. 绘制顶部尾翼装饰
    // 左尾翼
    ctx.beginPath();
    ctx.moveTo(-9, -14);
    ctx.lineTo(-14, -26);
    ctx.lineTo(-7, -23);
    ctx.closePath();
    ctx.fillStyle = colors.accent;
    ctx.fill();
    ctx.strokeStyle = colors.accentLight;
    ctx.lineWidth = 0.8;
    ctx.stroke();
    
    // 右尾翼
    ctx.beginPath();
    ctx.moveTo(9, -14);
    ctx.lineTo(14, -26);
    ctx.lineTo(7, -23);
    ctx.closePath();
    ctx.fillStyle = colors.accent;
    ctx.fill();
    ctx.strokeStyle = colors.accentLight;
    ctx.lineWidth = 0.8;
    ctx.stroke();
    
    // 7. 绘制武器等级指示器
    const levelSpacing = 4;
    const levelY = 6;
    for (let i = 0; i < 4; i++) {
      const isActive = i < this.weaponLevel;
      ctx.beginPath();
      ctx.moveTo(-9 + i * levelSpacing, levelY);
      ctx.lineTo(-7 + i * levelSpacing, levelY - 2);
      ctx.lineTo(-5 + i * levelSpacing, levelY);
      ctx.closePath();
      ctx.fillStyle = isActive ? '#2196F3' : 'rgba(150, 150, 150, 0.3)';
      ctx.fill();
      
      ctx.beginPath();
      ctx.moveTo(5 + i * levelSpacing, levelY);
      ctx.lineTo(7 + i * levelSpacing, levelY - 2);
      ctx.lineTo(9 + i * levelSpacing, levelY);
      ctx.closePath();
      ctx.fillStyle = isActive ? '#2196F3' : 'rgba(150, 150, 150, 0.3)';
      ctx.fill();
    }
    
    ctx.restore();
  }
}

class Bullet {
  constructor(x, y, dx, dy, damage, color, level = 1) {
    this.position = new Vector2(x, y);
    this.velocity = new Vector2(dx, dy);
    this.damage = damage;
    this.color = color;
    this.innerGlow = '#44aaff';
    this.isGolden = false;
    this.trailInterval = 2;
    this.active = true;
    this.level = level;
    this.trail = [];
    this.trailTimer = 0;
    this.bladeLength = 12 + level * 2;
    this.bladeWidth = 3 + level;
    this.glowIntensity = 12 + level * 3;
    this.size = 4 + level;
  }
  
  update() {
    this.position = this.position.add(this.velocity);
    
    this.trailTimer++;
    if (this.trailTimer % this.trailInterval === 0) {
      this.trail.push({
        x: this.position.x + (Math.random() - 0.5) * 3,
        y: this.position.y + 4,
        size: 1.5 + Math.random() * 2,
        life: 1,
        decay: 0.06 + Math.random() * 0.04
      });
    }
    
    for (let i = this.trail.length - 1; i >= 0; i--) {
      const t = this.trail[i];
      t.y += 1.5;
      t.life -= t.decay;
      t.size *= 0.94;
      if (t.life <= 0) this.trail.splice(i, 1);
    }
    
    if (this.position.y < -10 || this.position.y > CONFIG.CANVAS_HEIGHT + 10 ||
        this.position.x < -10 || this.position.x > CONFIG.CANVAS_WIDTH + 10) {
      this.active = false;
    }
  }
  
  draw(ctx) {
    ctx.save();
    
    for (const t of this.trail) {
      ctx.globalAlpha = t.life * 0.35;
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 4;
      ctx.beginPath();
      ctx.arc(t.x, t.y, t.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
    
    const tipY = this.position.y - this.bladeLength;
    const bw = this.bladeWidth;
    const r = bw / 2;
    
    ctx.shadowColor = this.innerGlow;
    ctx.shadowBlur = this.glowIntensity;
    
    const grad = ctx.createLinearGradient(
      this.position.x, tipY,
      this.position.x, this.position.y
    );
    grad.addColorStop(0, this.color);
    grad.addColorStop(0.5, this.innerGlow);
    grad.addColorStop(1, '#ffffff');
    ctx.fillStyle = grad;
    
    ctx.beginPath();
    ctx.arc(this.position.x, tipY + r, r, Math.PI, 0);
    ctx.lineTo(this.position.x + r, this.position.y);
    ctx.arc(this.position.x, this.position.y - r, r, 0, Math.PI);
    ctx.closePath();
    ctx.fill();
    
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
    const iw = bw * 0.35;
    ctx.beginPath();
    ctx.arc(this.position.x, tipY + iw / 2 + 2, iw / 2, Math.PI, 0);
    ctx.lineTo(this.position.x + iw / 2, this.position.y - 2);
    ctx.arc(this.position.x, this.position.y - iw / 2 - 2, iw / 2, 0, Math.PI);
    ctx.closePath();
    ctx.fill();
    
    if (this.isGolden) {
      ctx.shadowColor = '#ffd700';
      ctx.shadowBlur = 15;
      ctx.fillStyle = '#ffd700';
      ctx.beginPath();
      ctx.arc(this.position.x, this.position.y - this.bladeLength * 0.4, bw * 0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fff8dc';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(this.position.x, this.position.y - this.bladeLength * 0.4, bw * 0.2, 0, Math.PI * 2);
      ctx.fill();
    }
    
    ctx.restore();
  }
}

class TrailParticle {
  constructor(x, y, color) {
    this.x = x + (Math.random() - 0.5) * 4;
    this.y = y;
    this.size = 2 + Math.random() * 2;
    this.life = 1;
    this.decay = 0.025 + Math.random() * 0.03;
    this.speedY = 1 + Math.random() * 1.5;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.color = color;
  }
  
  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    this.life -= this.decay;
    this.size *= 0.96;
  }
  
  draw(ctx) {
    if (this.life <= 0) return;
    ctx.save();
    ctx.globalAlpha = this.life * 0.5;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 5;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

class StarBurstParticle {
  constructor(x, y) {
    this.x = x + (Math.random() - 0.5) * 6;
    this.y = y + (Math.random() - 0.5) * 6;
    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 4;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.life = 1;
    this.decay = 0.015 + Math.random() * 0.02;
    this.size = 2 + Math.random() * 4;
    this.active = true;
    this.isStar = Math.random() > 0.4;
    const hue = Math.random() > 0.5 ? (40 + Math.random() * 20) : (150 + Math.random() * 60);
    this.color = `hsl(${hue}, 100%, ${70 + Math.random() * 30}%)`;
    this.trail = [];
  }
  
  update() {
    this.trail.push({ x: this.x, y: this.y });
    if (this.trail.length > 3) this.trail.shift();
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.05;
    this.vx *= 0.98;
    this.life -= this.decay;
    this.size *= 0.98;
    if (this.life <= 0) this.active = false;
  }
  
  draw(ctx) {
    if (this.life <= 0) return;
    ctx.save();
    ctx.globalAlpha = this.life;
    
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 8;
    ctx.fillStyle = this.color;
    
    if (this.isStar) {
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        const a = (i / 4) * Math.PI * 2 - Math.PI / 2;
        const inner = this.size * 0.4;
        ctx.lineTo(this.x + Math.cos(a) * this.size, this.y + Math.sin(a) * this.size);
        ctx.lineTo(this.x + Math.cos(a + 0.4) * inner, this.y + Math.sin(a + 0.4) * inner);
      }
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
    
    ctx.shadowBlur = 0;
    for (let i = 0; i < this.trail.length; i++) {
      const t = i / this.trail.length;
      ctx.globalAlpha = this.life * t * 0.3;
      ctx.beginPath();
      ctx.arc(this.trail[i].x, this.trail[i].y, this.size * t * 0.5, 0, Math.PI * 2);
      ctx.fill();
    }
    
    ctx.restore();
  }
}

class Enemy {
  constructor(config, difficultyMultiplier, level = 1) {
    this.config = config;
    this.difficultyMultiplier = difficultyMultiplier;
    
    this.position = new Vector2(
      Math.random() * (CONFIG.CANVAS_WIDTH - 100) + 50,
      -50
    );
    
    this.isBoss = config.type.startsWith('boss');
    
    const levelScale = 1 + (level - 1) * 0.2;
    const bossScale = this.isBoss ? 1 + (level - 1) * 0.25 : levelScale;
    this.hp = (config.baseHp || config.hp) * difficultyMultiplier.enemyHpMultiplier * bossScale;
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
    this.currentPhase = 1;
    
    this.trail = [];
    this.trailTimer = 0;
    this.destroyParticles = [];
    this.glowPhase = Math.random() * Math.PI * 2;
    this.hitFlash = 0;
    
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
  
  update(dt, currentTime, playerPos) {
    this.handleMovement(dt);
    
    this.updateTrail(dt);
    this.updateDestroyParticles(dt);
    this.glowPhase += 0.04;
    if (this.hitFlash > 0) this.hitFlash -= dt / 200;
    
    if (this.shootInterval > 0 && currentTime - this.lastShootTime > this.shootInterval) {
      this.lastShootTime = currentTime;
      return this.shoot(playerPos);
    }
    
    if (this.position.y > CONFIG.CANVAS_HEIGHT + 100) {
      this.active = false;
    }
    
    return null;
  }
  
  updateTrail(dt) {
    this.trailTimer += dt;
    if (this.trailTimer > 80) {
      this.trailTimer = 0;
      this.trail.push(new TrailParticle(this.position.x, this.position.y + this.size / 2, this.config.trailColor));
    }
    for (let i = this.trail.length - 1; i >= 0; i--) {
      this.trail[i].update();
      if (this.trail[i].life <= 0) this.trail.splice(i, 1);
    }
  }
  
  updateDestroyParticles(dt) {
    for (let i = this.destroyParticles.length - 1; i >= 0; i--) {
      this.destroyParticles[i].update();
      if (this.destroyParticles[i].life <= 0) this.destroyParticles.splice(i, 1);
    }
  }
  
  spawnDestroyEffect() {
    const count = 16 + Math.floor(Math.random() * 10);
    for (let i = 0; i < count; i++) {
      this.destroyParticles.push(new StarBurstParticle(this.position.x, this.position.y));
    }
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
    const cx = CONFIG.CANVAS_WIDTH / 2;
    const cy = 80;
    
    switch (this.config.type) {
      case 'boss1':
        this.position.x = cx + Math.sin(time * 1.8) * 180;
        this.position.y = cy + Math.sin(time * 2.5 + 1) * 20;
        break;
      case 'boss2':
        this.position.x = cx + Math.sin(time * 0.8) * 250 + Math.sin(time * 4) * 30;
        this.position.y = cy + Math.cos(time * 1.2) * 40;
        break;
      case 'boss3':
        this.position.x = cx + Math.cos(time * 0.6) * 300 * (0.5 + 0.5 * Math.sin(time * 0.3));
        this.position.y = cy + Math.sin(time * 2) * 50;
        break;
      case 'boss4':
        if (this.currentPhase >= 2 || this.hp < this.maxHp * 0.6) {
          const targetX = cx + Math.sin(time * this.currentPhase) * 150;
          this.position.x += (targetX - this.position.x) * 0.05 * speedMultiplier;
          this.position.y = cy + Math.sin(time * 1.5) * 15;
        } else {
          this.position.x = cx + Math.sin(time * 2.2 + this.patternTimer / 1000) * 200;
          this.position.y = cy + Math.sin(time * 3) * 10;
        }
        break;
      case 'boss5':
        const bx = cx + Math.cos(time * 1.5) * 250;
        const by = cy + Math.sin(time * 2) * 60;
        this.position.x += (bx - this.position.x) * 0.03 * speedMultiplier;
        this.position.y += (by - this.position.y) * 0.03 * speedMultiplier;
        break;
      case 'boss6':
        this.position.x = cx + Math.sin(time * 1.2 + Math.sin(time * 0.5) * 2) * 220;
        this.position.y = cy + Math.sin(time * 1.8 + Math.cos(time * 0.7)) * 45;
        break;
      default:
        this.position.x = cx + Math.sin(time * 2) * 200;
        this.position.y = cy + Math.sin(time * 3) * 30;
    }
    
    this.position.x = Math.max(40, Math.min(CONFIG.CANVAS_WIDTH - 40, this.position.x));
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
    const baseSpeed = CONFIG.ENEMY_BULLET_SPEED;
    
    switch (this.config.type) {
      case 'boss1':
        this.bossShoot_boss1(bullets, playerPos, time, baseSpeed);
        break;
      case 'boss2':
        this.bossShoot_boss2(bullets, playerPos, time, baseSpeed);
        break;
      case 'boss3':
        this.bossShoot_boss3(bullets, playerPos, time, baseSpeed);
        break;
      case 'boss4':
        this.bossShoot_boss4(bullets, playerPos, time, baseSpeed);
        break;
      case 'boss5':
        this.bossShoot_boss5(bullets, playerPos, time, baseSpeed);
        break;
      case 'boss6':
        this.bossShoot_boss6(bullets, playerPos, time, baseSpeed);
        break;
      default:
        this.bossShoot_boss1(bullets, playerPos, time, baseSpeed);
    }
    
    return bullets;
  }
  
  addBossBullet(bullets, x, y, dx, dy, damage, color) {
    bullets.push(new Bullet(x, y, dx, dy, damage, color));
  }
  
  bossShoot_boss1(bullets, playerPos, time, baseSpeed) {
    const aim = Math.atan2(playerPos.y - this.position.y, playerPos.x - this.position.x);
    const cx = this.position.x;
    const cy = this.position.y + this.size / 4;
    
    switch (this.currentPhase) {
      case 1:
        for (let i = -2; i <= 2; i++) {
          const angle = aim + i * 0.25;
          this.addBossBullet(bullets, cx, cy, Math.cos(angle) * baseSpeed, Math.sin(angle) * baseSpeed, this.damage, '#ff4444');
        }
        break;
      case 2:
        for (let i = -3; i <= 3; i++) {
          const angle = aim + i * 0.18;
          this.addBossBullet(bullets, cx, cy, Math.cos(angle) * baseSpeed * 0.9, Math.sin(angle) * baseSpeed * 0.9, this.damage * 0.8, '#ff6644');
        }
        {
          const sideCount = 6;
          for (let i = 0; i < sideCount; i++) {
            const a = (time / 600) + (i * Math.PI * 2 / sideCount);
            this.addBossBullet(bullets, cx + Math.cos(a) * 30, cy + Math.sin(a) * 30, Math.cos(a) * baseSpeed * 0.6, Math.sin(a) * baseSpeed * 0.6, this.damage * 0.5, '#ffaa44');
          }
        }
        break;
      case 3:
        for (let i = -5; i <= 5; i++) {
          const angle = aim + i * 0.12;
          this.addBossBullet(bullets, cx, cy, Math.cos(angle) * baseSpeed * 0.85, Math.sin(angle) * baseSpeed * 0.85, this.damage * 0.6, '#ff3333');
        }
        break;
    }
  }
  
  bossShoot_boss2(bullets, playerPos, time, baseSpeed) {
    const aim = Math.atan2(playerPos.y - this.position.y, playerPos.x - this.position.x);
    const cx = this.position.x;
    const cy = this.position.y + this.size / 4;
    
    switch (this.currentPhase) {
      case 1:
        for (let i = 0; i < 6; i++) {
          const a = (time / 600) + (i * Math.PI * 2 / 6);
          this.addBossBullet(bullets, cx, cy, Math.cos(a) * baseSpeed * 0.7, Math.sin(a) * baseSpeed * 0.7, this.damage * 0.7, '#cc66ff');
        }
        break;
      case 2:
        for (let i = 0; i < 10; i++) {
          const a = (time / 400) + (i * Math.PI * 2 / 10);
          this.addBossBullet(bullets, cx + Math.cos(a) * 20, cy + Math.sin(a) * 20, Math.cos(a) * baseSpeed * 0.6, Math.sin(a) * baseSpeed * 0.6, this.damage * 0.6, '#aa88ff');
        }
        {
          const aimBullet = new Bullet(cx, cy, Math.cos(aim) * baseSpeed * 1.2, Math.sin(aim) * baseSpeed * 1.2, this.damage, '#ff44ff');
          bullets.push(aimBullet);
        }
        break;
      case 3:
        for (let i = 0; i < 14; i++) {
          const a = (time / 300) + (i * Math.PI * 2 / 14);
          const speed = baseSpeed * (0.4 + 0.4 * Math.sin(i));
          this.addBossBullet(bullets, cx, cy, Math.cos(a) * speed, Math.sin(a) * speed, this.damage * 0.5, '#dd88ff');
        }
        break;
    }
  }
  
  bossShoot_boss3(bullets, playerPos, time, baseSpeed) {
    const aim = Math.atan2(playerPos.y - this.position.y, playerPos.x - this.position.x);
    const cx = this.position.x;
    const cy = this.position.y + this.size / 4;
    
    switch (this.currentPhase) {
      case 1:
        this.addBossBullet(bullets, cx, cy, Math.cos(aim) * baseSpeed * 1.3, Math.sin(aim) * baseSpeed * 1.3, this.damage * 1.2, '#44ffff');
        for (let i = 0; i < 6; i++) {
          const a = (time / 500) + (i * Math.PI * 2 / 6);
          this.addBossBullet(bullets, cx, cy, Math.cos(a) * baseSpeed * 0.5, Math.sin(a) * baseSpeed * 0.5, this.damage * 0.4, '#66ddff');
        }
        break;
      case 2:
        for (let i = 0; i < 12; i++) {
          const a = (time / 400) + (i * Math.PI * 2 / 12);
          const r = 40 + 20 * Math.sin(time / 200);
          this.addBossBullet(bullets, cx + Math.cos(a) * r * 0.3, cy + Math.sin(a) * r * 0.3, Math.cos(a) * baseSpeed * 0.55, Math.sin(a) * baseSpeed * 0.55, this.damage * 0.5, '#22ddff');
        }
        break;
      case 3:
        for (let wave = 0; wave < 3; wave++) {
          const offset = wave * Math.PI * 2 / 3;
          for (let i = 0; i < 8; i++) {
            const a = (time / 300 + offset) + (i * Math.PI * 2 / 8);
            this.addBossBullet(bullets, cx, cy, Math.cos(a) * baseSpeed * 0.5, Math.sin(a) * baseSpeed * 0.5, this.damage * 0.4, '#44ddff');
          }
        }
        break;
    }
  }
  
  bossShoot_boss4(bullets, playerPos, time, baseSpeed) {
    const aim = Math.atan2(playerPos.y - this.position.y, playerPos.x - this.position.x);
    const cx = this.position.x;
    const cy = this.position.y + this.size / 4;
    
    switch (this.currentPhase) {
      case 1:
        for (let i = -2; i <= 2; i++) {
          const angle = aim + i * 0.3;
          this.addBossBullet(bullets, cx, cy, Math.cos(angle) * baseSpeed, Math.sin(angle) * baseSpeed, this.damage, '#ff8844');
        }
        break;
      case 2:
        for (let i = 0; i < 8; i++) {
          const a = (time / 500) + (i * Math.PI * 2 / 8);
          this.addBossBullet(bullets, cx, cy, Math.cos(a) * baseSpeed * 0.7, Math.sin(a) * baseSpeed * 0.7, this.damage * 0.6, '#ffaa44');
        }
        {
          const sideCount = 4;
          for (let i = 0; i < sideCount; i++) {
            const a = aim + (i - (sideCount - 1) / 2) * 0.15;
            this.addBossBullet(bullets, cx + Math.cos(a + Math.PI / 2) * 25, cy + Math.sin(a + Math.PI / 2) * 25, Math.cos(a) * baseSpeed * 1.1, Math.sin(a) * baseSpeed * 1.1, this.damage * 1.1, '#ff6633');
          }
        }
        break;
      case 3:
        for (let i = 0; i < 16; i++) {
          const a = (time / 350) + (i * Math.PI * 2 / 16);
          const speed = baseSpeed * (0.5 + 0.3 * Math.sin(i * 2));
          this.addBossBullet(bullets, cx, cy, Math.cos(a) * speed, Math.sin(a) * speed, this.damage * 0.45, '#ff8844');
        }
        break;
    }
  }
  
  bossShoot_boss5(bullets, playerPos, time, baseSpeed) {
    const aim = Math.atan2(playerPos.y - this.position.y, playerPos.x - this.position.x);
    const cx = this.position.x;
    const cy = this.position.y + this.size / 4;
    
    switch (this.currentPhase) {
      case 1:
        for (let i = -3; i <= 3; i++) {
          const angle = aim + i * 0.2;
          this.addBossBullet(bullets, cx, cy, Math.cos(angle) * baseSpeed, Math.sin(angle) * baseSpeed, this.damage, '#44ffcc');
        }
        break;
      case 2:
        for (let ring = 0; ring < 2; ring++) {
          const count = 8 + ring * 4;
          for (let i = 0; i < count; i++) {
            const a = (time / (500 - ring * 100)) + (i * Math.PI * 2 / count);
            const speed = baseSpeed * (0.5 + ring * 0.15);
            this.addBossBullet(bullets, cx, cy, Math.cos(a) * speed, Math.sin(a) * speed, this.damage * (0.5 - ring * 0.1), ring === 0 ? '#44ffcc' : '#22ddaa');
          }
        }
        break;
      case 3:
        for (let i = 0; i < 20; i++) {
          const a = (time / 200) + (i * Math.PI * 2 / 20);
          this.addBossBullet(bullets, cx, cy, Math.cos(a) * baseSpeed * 0.4, Math.sin(a) * baseSpeed * 0.4, this.damage * 0.35, '#66ffdd');
        }
        break;
      case 4:
        for (let i = 0; i < 12; i++) {
          const a = (time / 300) + (i * Math.PI * 2 / 12);
          this.addBossBullet(bullets, cx, cy, Math.cos(a) * baseSpeed * 0.6, Math.sin(a) * baseSpeed * 0.6, this.damage * 0.5, '#44ffcc');
        }
        {
          this.addBossBullet(bullets, cx, cy, Math.cos(aim) * baseSpeed * 1.5, Math.sin(aim) * baseSpeed * 1.5, this.damage * 1.5, '#ffdd44');
        }
        break;
    }
  }
  
  bossShoot_boss6(bullets, playerPos, time, baseSpeed) {
    const aim = Math.atan2(playerPos.y - this.position.y, playerPos.x - this.position.x);
    const cx = this.position.x;
    const cy = this.position.y + this.size / 4;
    
    switch (this.currentPhase) {
      case 1:
        for (let i = 0; i < 10; i++) {
          const a = (time / 450) + (i * Math.PI * 2 / 10);
          this.addBossBullet(bullets, cx, cy, Math.cos(a) * baseSpeed * 0.6, Math.sin(a) * baseSpeed * 0.6, this.damage * 0.5, '#ff3366');
        }
        for (let i = -2; i <= 2; i++) {
          const angle = aim + i * 0.2;
          this.addBossBullet(bullets, cx, cy, Math.cos(angle) * baseSpeed * 0.9, Math.sin(angle) * baseSpeed * 0.9, this.damage * 0.7, '#ff6688');
        }
        break;
      case 2:
        for (let ring = 0; ring < 3; ring++) {
          const count = 6 + ring * 4;
          for (let i = 0; i < count; i++) {
            const a = (time / (400 - ring * 80)) + (i * Math.PI * 2 / count) + ring * 0.5;
            const speed = baseSpeed * (0.4 + ring * 0.15);
            this.addBossBullet(bullets, cx, cy, Math.cos(a) * speed, Math.sin(a) * speed, this.damage * (0.4 - ring * 0.05), ring === 0 ? '#ff3366' : ring === 1 ? '#ff5588' : '#ff77aa');
          }
        }
        break;
      case 3:
        for (let wave = 0; wave < 4; wave++) {
          const offset = wave * Math.PI * 2 / 4;
          for (let i = 0; i < 6; i++) {
            const a = (time / 250 + offset) + (i * Math.PI * 2 / 6);
            this.addBossBullet(bullets, cx, cy, Math.cos(a) * baseSpeed * 0.45, Math.sin(a) * baseSpeed * 0.45, this.damage * 0.3, '#ff99bb');
          }
        }
        break;
      case 4:
        for (let i = -4; i <= 4; i++) {
          const angle = aim + i * 0.15;
          this.addBossBullet(bullets, cx, cy, Math.cos(angle) * baseSpeed, Math.sin(angle) * baseSpeed, this.damage, '#ff0033');
        }
        for (let i = 0; i < 12; i++) {
          const a = (time / 200) + (i * Math.PI * 2 / 12);
          this.addBossBullet(bullets, cx + Math.cos(a) * 40, cy + Math.sin(a) * 40, Math.cos(a) * baseSpeed * 0.5, Math.sin(a) * baseSpeed * 0.5, this.damage * 0.4, '#ff3366');
        }
        break;
    }
  }
  
  takeDamage(damage) {
    this.hp -= damage;
    this.hitFlash = 1;
    
    if (this.isBoss) {
      const numPhases = this.config.phases || 3;
      const ratio = this.hp / this.maxHp;
      for (let phase = numPhases; phase >= 1; phase--) {
        const threshold = (phase - 1) / numPhases;
        if (ratio <= threshold && this.currentPhase < numPhases) {
          this.enterPhase(phase);
          break;
        }
      }
    }
    
    if (this.hp <= 0) {
      this.active = false;
      this.spawnDestroyEffect();
      return true;
    }
    return false;
  }
  
  draw(ctx) {
    ctx.save();
    ctx.translate(this.position.x, this.position.y);
    
    for (const p of this.trail) p.draw(ctx);
    
    this.drawGlow(ctx);
    
    if (this.isBoss) {
      this.drawBoss(ctx);
    } else {
      this.drawEnemyByType(ctx);
    }
    
    for (const p of this.destroyParticles) p.draw(ctx);
    
    if (this.hp < this.maxHp) {
      const hpWidth = this.size * 2;
      const hpHeight = 4;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(-hpWidth / 2, -this.size / 2 - 15, hpWidth, hpHeight);
      ctx.fillStyle = this.hp > this.maxHp * 0.3 ? this.config.glowColor : '#ef4444';
      ctx.fillRect(-hpWidth / 2, -this.size / 2 - 15, hpWidth * (this.hp / this.maxHp), hpHeight);
    }
    
    ctx.restore();
  }
  
  drawGlow(ctx) {
    const glowAlpha = 0.2 + 0.15 * Math.sin(this.glowPhase);
    ctx.save();
    ctx.globalAlpha = glowAlpha;
    ctx.shadowColor = this.config.glowColor;
    ctx.shadowBlur = 25;
    const grad = ctx.createRadialGradient(0, 0, 2, 0, 0, this.size * 1.2);
    grad.addColorStop(0, this.config.glowColor);
    grad.addColorStop(0.5, this.config.glowColor);
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(0, 0, this.size * 1.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  
  drawEnemyByType(ctx) {
    const s = this.size;
    const cfg = this.config;
    const flash = this.hitFlash > 0;
    
    ctx.save();
    
    ctx.shadowColor = cfg.glowColor;
    ctx.shadowBlur = 8;
    
    switch (cfg.shape) {
      case 'scout': {
        ctx.fillStyle = cfg.shadowColor;
        ctx.beginPath();
        ctx.moveTo(0, s * 0.5);
        ctx.quadraticCurveTo(-s * 0.6, 0, -s * 0.4, -s * 0.5);
        ctx.quadraticCurveTo(0, -s * 0.35, s * 0.4, -s * 0.5);
        ctx.quadraticCurveTo(s * 0.6, 0, 0, s * 0.5);
        ctx.closePath();
        ctx.fill();
        
        ctx.fillStyle = flash ? '#fff' : cfg.color;
        ctx.beginPath();
        ctx.moveTo(0, s * 0.4);
        ctx.quadraticCurveTo(-s * 0.5, 0, -s * 0.3, -s * 0.4);
        ctx.quadraticCurveTo(0, -s * 0.25, s * 0.3, -s * 0.4);
        ctx.quadraticCurveTo(s * 0.5, 0, 0, s * 0.4);
        ctx.closePath();
        ctx.fill();
        
        ctx.shadowBlur = 0;
        ctx.fillStyle = flash ? '#fff' : 'rgba(180, 255, 200, 0.6)';
        ctx.beginPath();
        ctx.arc(0, -s * 0.1, s * 0.15, 0, Math.PI * 2);
        ctx.fill();
        break;
      }
      case 'fighter': {
        ctx.fillStyle = cfg.shadowColor;
        ctx.beginPath();
        ctx.moveTo(-s * 0.1, s * 0.4);
        ctx.lineTo(-s * 0.55, -s * 0.1);
        ctx.quadraticCurveTo(-s * 0.5, -s * 0.3, -s * 0.3, -s * 0.4);
        ctx.lineTo(-s * 0.1, -s * 0.2);
        ctx.lineTo(s * 0.1, -s * 0.2);
        ctx.lineTo(s * 0.3, -s * 0.4);
        ctx.quadraticCurveTo(s * 0.5, -s * 0.3, s * 0.55, -s * 0.1);
        ctx.lineTo(s * 0.1, s * 0.4);
        ctx.closePath();
        ctx.fill();
        
        ctx.fillStyle = flash ? '#fff' : cfg.color;
        ctx.beginPath();
        ctx.moveTo(-s * 0.08, s * 0.35);
        ctx.lineTo(-s * 0.45, -s * 0.05);
        ctx.quadraticCurveTo(-s * 0.4, -s * 0.22, -s * 0.25, -s * 0.3);
        ctx.lineTo(-s * 0.08, -s * 0.15);
        ctx.lineTo(s * 0.08, -s * 0.15);
        ctx.lineTo(s * 0.25, -s * 0.3);
        ctx.quadraticCurveTo(s * 0.4, -s * 0.22, s * 0.45, -s * 0.05);
        ctx.lineTo(s * 0.08, s * 0.35);
        ctx.closePath();
        ctx.fill();
        
        ctx.shadowBlur = 0;
        ctx.fillStyle = flash ? '#fff' : 'rgba(255, 220, 150, 0.7)';
        ctx.beginPath();
        ctx.arc(-s * 0.1, s * 0.15, s * 0.08, 0, Math.PI * 2);
        ctx.arc(s * 0.1, s * 0.15, s * 0.08, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = cfg.glowColor;
        ctx.shadowColor = cfg.glowColor;
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.arc(s * 0.08, s * 0.38, 2, 0, Math.PI * 2);
        ctx.arc(-s * 0.08, s * 0.38, 2, 0, Math.PI * 2);
        ctx.fill();
        break;
      }
      case 'bomber': {
        ctx.fillStyle = cfg.shadowColor;
        ctx.beginPath();
        ctx.moveTo(-s * 0.5, s * 0.3);
        ctx.quadraticCurveTo(-s * 0.55, 0, -s * 0.5, -s * 0.4);
        ctx.lineTo(s * 0.5, -s * 0.4);
        ctx.quadraticCurveTo(s * 0.55, 0, s * 0.5, s * 0.3);
        ctx.closePath();
        ctx.fill();
        
        ctx.fillStyle = flash ? '#fff' : cfg.color;
        ctx.beginPath();
        ctx.moveTo(-s * 0.4, s * 0.25);
        ctx.quadraticCurveTo(-s * 0.45, 0, -s * 0.4, -s * 0.3);
        ctx.lineTo(s * 0.4, -s * 0.3);
        ctx.quadraticCurveTo(s * 0.45, 0, s * 0.4, s * 0.25);
        ctx.closePath();
        ctx.fill();
        
        ctx.shadowBlur = 0;
        ctx.fillStyle = flash ? '#fff' : 'rgba(255, 200, 200, 0.6)';
        ctx.beginPath();
        ctx.arc(-s * 0.15, -s * 0.05, s * 0.1, 0, Math.PI * 2);
        ctx.arc(s * 0.15, -s * 0.05, s * 0.1, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(-s * 0.3, s * 0.05);
        ctx.lineTo(s * 0.3, s * 0.05);
        ctx.moveTo(-s * 0.35, s * 0.15);
        ctx.lineTo(s * 0.35, s * 0.15);
        ctx.stroke();
        break;
      }
      case 'elite': {
        const r = s * 0.45;
        ctx.fillStyle = cfg.shadowColor;
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
          const rad = i % 2 === 0 ? r : r * 0.5;
          ctx.lineTo(Math.cos(a) * rad, Math.sin(a) * rad);
        }
        ctx.closePath();
        ctx.fill();
        
        ctx.fillStyle = flash ? '#fff' : cfg.color;
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
          const rad = i % 2 === 0 ? r * 0.85 : r * 0.4;
          ctx.lineTo(Math.cos(a) * rad, Math.sin(a) * rad);
        }
        ctx.closePath();
        ctx.fill();
        
        ctx.shadowBlur = 0;
        ctx.fillStyle = flash ? '#fff' : 'rgba(200, 180, 255, 0.7)';
        ctx.beginPath();
        ctx.arc(0, 0, s * 0.12, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 0.8;
        for (let i = 0; i < 3; i++) {
          const a = (i / 3) * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(Math.cos(a) * r * 0.3, Math.sin(a) * r * 0.3);
          ctx.lineTo(Math.cos(a) * r * 0.7, Math.sin(a) * r * 0.7);
          ctx.stroke();
        }
        break;
      }
    }
    
    ctx.restore();
  }
  
  drawBoss(ctx) {
    const s = this.size;
    const cfg = this.config;
    const flash = this.hitFlash > 0;
    
    ctx.save();
    
    ctx.shadowColor = cfg.glowColor;
    ctx.shadowBlur = 15 + 5 * Math.sin(this.glowPhase);
    
    switch (cfg.type) {
      case 'boss1':
        this.drawBoss_boss1(ctx, s, cfg, flash);
        break;
      case 'boss2':
        this.drawBoss_boss2(ctx, s, cfg, flash);
        break;
      case 'boss3':
        this.drawBoss_boss3(ctx, s, cfg, flash);
        break;
      case 'boss4':
        this.drawBoss_boss4(ctx, s, cfg, flash);
        break;
      case 'boss5':
        this.drawBoss_boss5(ctx, s, cfg, flash);
        break;
      case 'boss6':
        this.drawBoss_boss6(ctx, s, cfg, flash);
        break;
      default:
        this.drawBoss_boss1(ctx, s, cfg, flash);
    }
    
    ctx.restore();
  }
  
  drawBoss_boss1(ctx, s, cfg, flash) {
    ctx.shadowBlur = 15 + 5 * Math.sin(this.glowPhase);
    ctx.fillStyle = cfg.shadowColor;
    ctx.beginPath();
    ctx.moveTo(0, s * 0.5);
    ctx.lineTo(-s * 0.5, s * 0.1);
    ctx.lineTo(-s * 0.35, -s * 0.15);
    ctx.lineTo(-s * 0.5, -s * 0.45);
    ctx.lineTo(s * 0.5, -s * 0.45);
    ctx.lineTo(s * 0.35, -s * 0.15);
    ctx.lineTo(s * 0.5, s * 0.1);
    ctx.closePath();
    ctx.fill();
    
    const bodyGrad = ctx.createLinearGradient(-s * 0.4, 0, s * 0.4, 0);
    bodyGrad.addColorStop(0, flash ? '#fff' : cfg.shadowColor);
    bodyGrad.addColorStop(0.3, flash ? '#fff' : cfg.color);
    bodyGrad.addColorStop(0.5, flash ? '#fff' : '#fff');
    bodyGrad.addColorStop(0.7, flash ? '#fff' : cfg.color);
    bodyGrad.addColorStop(1, flash ? '#fff' : cfg.shadowColor);
    ctx.fillStyle = bodyGrad;
    ctx.beginPath();
    ctx.moveTo(0, s * 0.4);
    ctx.lineTo(-s * 0.4, s * 0.08);
    ctx.lineTo(-s * 0.28, -s * 0.1);
    ctx.lineTo(-s * 0.4, -s * 0.35);
    ctx.lineTo(s * 0.4, -s * 0.35);
    ctx.lineTo(s * 0.28, -s * 0.1);
    ctx.lineTo(s * 0.4, s * 0.08);
    ctx.closePath();
    ctx.fill();
    
    ctx.shadowBlur = 0;
    ctx.fillStyle = flash ? '#fff' : 'rgba(255, 255, 255, 0.7)';
    ctx.beginPath();
    ctx.arc(-s * 0.15, -s * 0.12, s * 0.06, 0, Math.PI * 2);
    ctx.arc(s * 0.15, -s * 0.12, s * 0.06, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = flash ? '#fff' : '#ffd700';
    ctx.shadowColor = '#ffd700';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(0, s * 0.2, s * 0.08, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.shadowBlur = 4;
    ctx.strokeStyle = cfg.glowColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-s * 0.4, 0);
    ctx.lineTo(-s * 0.28, s * 0.15);
    ctx.moveTo(s * 0.4, 0);
    ctx.lineTo(s * 0.28, s * 0.15);
    ctx.stroke();
  }
  
  drawBoss_boss2(ctx, s, cfg, flash) {
    ctx.shadowBlur = 15 + 5 * Math.sin(this.glowPhase);
    ctx.fillStyle = cfg.shadowColor;
    ctx.beginPath();
    ctx.moveTo(0, -s * 0.45);
    ctx.lineTo(-s * 0.45, -s * 0.05);
    ctx.lineTo(-s * 0.4, s * 0.15);
    ctx.lineTo(-s * 0.5, s * 0.35);
    ctx.lineTo(-s * 0.3, s * 0.5);
    ctx.lineTo(s * 0.3, s * 0.5);
    ctx.lineTo(s * 0.5, s * 0.35);
    ctx.lineTo(s * 0.4, s * 0.15);
    ctx.lineTo(s * 0.45, -s * 0.05);
    ctx.closePath();
    ctx.fill();
    
    const g = ctx.createLinearGradient(-s * 0.4, 0, s * 0.4, 0);
    g.addColorStop(0, flash ? '#fff' : cfg.color);
    g.addColorStop(0.4, flash ? '#fff' : '#d8b4fe');
    g.addColorStop(0.6, flash ? '#fff' : '#d8b4fe');
    g.addColorStop(1, flash ? '#fff' : cfg.color);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(0, -s * 0.35);
    ctx.lineTo(-s * 0.35, -s * 0.02);
    ctx.lineTo(-s * 0.3, s * 0.1);
    ctx.lineTo(-s * 0.4, s * 0.28);
    ctx.lineTo(-s * 0.25, s * 0.4);
    ctx.lineTo(s * 0.25, s * 0.4);
    ctx.lineTo(s * 0.4, s * 0.28);
    ctx.lineTo(s * 0.3, s * 0.1);
    ctx.lineTo(s * 0.35, -s * 0.02);
    ctx.closePath();
    ctx.fill();
    
    ctx.shadowBlur = 0;
    ctx.fillStyle = flash ? '#fff' : '#e9d5ff';
    ctx.beginPath();
    ctx.arc(-s * 0.12, s * 0.05, s * 0.07, 0, Math.PI * 2);
    ctx.arc(s * 0.12, s * 0.05, s * 0.07, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = flash ? '#fff' : cfg.glowColor;
    ctx.shadowColor = cfg.glowColor;
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(0, s * 0.32, s * 0.07, 0, Math.PI * 2);
    ctx.fill();
    
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * Math.PI * 2 - Math.PI / 2;
      ctx.shadowBlur = 4;
      ctx.strokeStyle = cfg.glowColor;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(Math.cos(a) * s * 0.15, Math.sin(a) * s * 0.15);
      ctx.lineTo(Math.cos(a) * s * 0.45, Math.sin(a) * s * 0.45);
      ctx.stroke();
    }
  }
  
  drawBoss_boss3(ctx, s, cfg, flash) {
    ctx.shadowBlur = 15 + 5 * Math.sin(this.glowPhase);
    ctx.fillStyle = cfg.shadowColor;
    ctx.beginPath();
    ctx.arc(0, 0, s * 0.5, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = flash ? '#fff' : cfg.color;
    ctx.beginPath();
    ctx.arc(0, 0, s * 0.38, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.shadowBlur = 0;
    ctx.fillStyle = flash ? '#fff' : '#155e75';
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      ctx.beginPath();
      ctx.arc(Math.cos(a) * s * 0.3, Math.sin(a) * s * 0.3, s * 0.06, 0, Math.PI * 2);
      ctx.fill();
    }
    
    ctx.fillStyle = flash ? '#fff' : cfg.glowColor;
    ctx.shadowColor = cfg.glowColor;
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(0, 0, s * 0.1, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.shadowBlur = 0;
    ctx.fillStyle = flash ? '#fff' : 'rgba(255, 255, 255, 0.4)';
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
      ctx.beginPath();
      ctx.arc(Math.cos(a) * s * 0.18, Math.sin(a) * s * 0.18, s * 0.04, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  drawBoss_boss4(ctx, s, cfg, flash) {
    ctx.shadowBlur = 15 + 5 * Math.sin(this.glowPhase);
    ctx.fillStyle = cfg.shadowColor;
    ctx.beginPath();
    ctx.moveTo(0, -s * 0.5);
    ctx.lineTo(-s * 0.5, -s * 0.2);
    ctx.lineTo(-s * 0.3, s * 0.4);
    ctx.lineTo(s * 0.3, s * 0.4);
    ctx.lineTo(s * 0.5, -s * 0.2);
    ctx.closePath();
    ctx.fill();
    
    const g = ctx.createLinearGradient(0, -s * 0.4, 0, s * 0.35);
    g.addColorStop(0, flash ? '#fff' : cfg.color);
    g.addColorStop(0.5, flash ? '#fff' : '#fdba74');
    g.addColorStop(1, flash ? '#fff' : cfg.shadowColor);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(0, -s * 0.4);
    ctx.lineTo(-s * 0.4, -s * 0.15);
    ctx.lineTo(-s * 0.22, s * 0.32);
    ctx.lineTo(s * 0.22, s * 0.32);
    ctx.lineTo(s * 0.4, -s * 0.15);
    ctx.closePath();
    ctx.fill();
    
    ctx.shadowBlur = 0;
    ctx.fillStyle = flash ? '#fff' : '#ffedd5';
    for (let i = 0; i < 2; i++) {
      const sx = (i === 0 ? -1 : 1) * s * 0.12;
      ctx.beginPath();
      ctx.arc(sx, -s * 0.12, s * 0.05, 0, Math.PI * 2);
      ctx.fill();
    }
    
    ctx.fillStyle = flash ? '#fff' : cfg.glowColor;
    ctx.shadowColor = cfg.glowColor;
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(0, s * 0.15, s * 0.08, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.shadowBlur = 3;
    ctx.strokeStyle = cfg.glowColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-s * 0.35, 0.05);
    ctx.lineTo(-s * 0.45, 0.2);
    ctx.moveTo(s * 0.35, 0.05);
    ctx.lineTo(s * 0.45, 0.2);
    ctx.stroke();
  }
  
  drawBoss_boss5(ctx, s, cfg, flash) {
    ctx.shadowBlur = 15 + 5 * Math.sin(this.glowPhase);
    ctx.fillStyle = cfg.shadowColor;
    ctx.beginPath();
    const pts = 6;
    for (let i = 0; i < pts; i++) {
      const a = (i / pts) * Math.PI * 2 - Math.PI / 2;
      const r = i % 2 === 0 ? s * 0.5 : s * 0.25;
      ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    }
    ctx.closePath();
    ctx.fill();
    
    ctx.fillStyle = flash ? '#fff' : cfg.color;
    ctx.beginPath();
    for (let i = 0; i < pts; i++) {
      const a = (i / pts) * Math.PI * 2 - Math.PI / 2;
      const r = i % 2 === 0 ? s * 0.38 : s * 0.18;
      ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    }
    ctx.closePath();
    ctx.fill();
    
    ctx.shadowBlur = 0;
    ctx.fillStyle = flash ? '#fff' : '#ccfbf1';
    ctx.beginPath();
    ctx.arc(0, 0, s * 0.12, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = flash ? '#fff' : '#5eead4';
    ctx.shadowColor = cfg.glowColor;
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(0, 0, s * 0.06, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.shadowBlur = 2;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 0.8;
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(a) * s * 0.4, Math.sin(a) * s * 0.4);
      ctx.stroke();
    }
  }
  
  drawBoss_boss6(ctx, s, cfg, flash) {
    ctx.shadowBlur = 20 + 8 * Math.sin(this.glowPhase);
    ctx.fillStyle = cfg.shadowColor;
    ctx.beginPath();
    ctx.moveTo(-s * 0.08, -s * 0.5);
    ctx.lineTo(s * 0.08, -s * 0.5);
    ctx.lineTo(s * 0.35, -s * 0.2);
    ctx.lineTo(s * 0.5, -s * 0.05);
    ctx.lineTo(s * 0.4, s * 0.2);
    ctx.lineTo(s * 0.15, s * 0.4);
    ctx.lineTo(s * 0.08, s * 0.5);
    ctx.lineTo(-s * 0.08, s * 0.5);
    ctx.lineTo(-s * 0.15, s * 0.4);
    ctx.lineTo(-s * 0.4, s * 0.2);
    ctx.lineTo(-s * 0.5, -s * 0.05);
    ctx.lineTo(-s * 0.35, -s * 0.2);
    ctx.closePath();
    ctx.fill();
    
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, s * 0.5);
    g.addColorStop(0, flash ? '#fff' : '#fda4af');
    g.addColorStop(0.5, flash ? '#fff' : cfg.color);
    g.addColorStop(1, flash ? '#fff' : cfg.shadowColor);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(-s * 0.05, -s * 0.4);
    ctx.lineTo(s * 0.05, -s * 0.4);
    ctx.lineTo(s * 0.28, -s * 0.15);
    ctx.lineTo(s * 0.4, -s * 0.02);
    ctx.lineTo(s * 0.3, s * 0.15);
    ctx.lineTo(s * 0.1, s * 0.3);
    ctx.lineTo(s * 0.05, s * 0.4);
    ctx.lineTo(-s * 0.05, s * 0.4);
    ctx.lineTo(-s * 0.1, s * 0.3);
    ctx.lineTo(-s * 0.3, s * 0.15);
    ctx.lineTo(-s * 0.4, -s * 0.02);
    ctx.lineTo(-s * 0.28, -s * 0.15);
    ctx.closePath();
    ctx.fill();
    
    ctx.shadowBlur = 0;
    ctx.fillStyle = flash ? '#fff' : '#ffe4e6';
    ctx.beginPath();
    ctx.arc(-s * 0.12, -s * 0.1, s * 0.05, 0, Math.PI * 2);
    ctx.arc(s * 0.12, -s * 0.1, s * 0.05, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = flash ? '#fff' : cfg.glowColor;
    ctx.shadowColor = cfg.glowColor;
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.arc(0, s * 0.05, s * 0.08, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.shadowBlur = 4;
    ctx.strokeStyle = cfg.glowColor;
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(Math.cos(a) * s * 0.18, Math.sin(a) * s * 0.18);
      ctx.lineTo(Math.cos(a) * s * 0.35, Math.sin(a) * s * 0.35);
      ctx.stroke();
    }
    
    ctx.fillStyle = flash ? '#fff' : 'rgba(255, 255, 255, 0.3)';
    ctx.shadowBlur = 0;
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
      ctx.beginPath();
      ctx.arc(Math.cos(a) * s * 0.25, Math.sin(a) * s * 0.25, s * 0.03, 0, Math.PI * 2);
      ctx.fill();
    }
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
    this.rotation = 0;
    this.rotSpeed = 0.02 + Math.random() * 0.02;
    this.orbitPhase = Math.random() * Math.PI * 2;
    this.attractSpeed = 6;
  }
  
  static weightedTypes() {
    const pool = [];
    POWERUP_CONFIGS.forEach(p => {
      const weight = (p.type === 'health' || p.type === 'energy') ? 3 : 1;
      for (let i = 0; i < weight; i++) pool.push(p.type);
    });
    return pool;
  }

  static random(x, y) {
    const pool = Powerup.weightedTypes();
    const type = pool[Math.floor(Math.random() * pool.length)];
    return new Powerup(x, y, type);
  }
  
  update(playerPos) {
    this.position.y += this.speed;
    this.bobOffset += 0.05;
    this.rotation += this.rotSpeed;
    
    if (playerPos && this.position.distanceTo(playerPos) < 150 && this.position.y < CONFIG.CANVAS_HEIGHT + 50) {
      const dx = playerPos.x - this.position.x;
      const dy = playerPos.y - this.position.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 1) {
        this.position.x += (dx / dist) * this.attractSpeed;
        this.position.y += (dy / dist) * this.attractSpeed;
      }
    }
    
    if (this.position.y > CONFIG.CANVAS_HEIGHT + 50) {
      this.active = false;
    }
  }
  
  draw(ctx) {
    ctx.save();
    ctx.translate(this.position.x, this.position.y + Math.sin(this.bobOffset) * 5);
    
    const s = this.size;
    const c = this.config.color;
    const now = Date.now();
    const pulse = Math.sin(now / 200) * 0.1 + 1;
    
    ctx.shadowColor = c;
    ctx.shadowBlur = 25;
    
    ctx.beginPath();
    ctx.arc(0, 0, s + 10 * pulse, 0, Math.PI * 2);
    ctx.strokeStyle = c;
    ctx.globalAlpha = 0.3 + 0.15 * Math.sin(this.bobOffset * 2);
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.globalAlpha = 1;
    
    ctx.beginPath();
    ctx.arc(0, 0, s + 5, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    ctx.shadowBlur = 15;
    
    switch (this.type) {
      case 'coins': {
        ctx.rotate(this.rotation);
        ctx.beginPath();
        ctx.ellipse(0, 2, s * 0.7, s * 0.6, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fill();
        const coinGradient = ctx.createRadialGradient(-s * 0.2, -s * 0.2, 0, 0, 0, s * 0.75);
        coinGradient.addColorStop(0, '#fff7a0');
        coinGradient.addColorStop(0.3, '#ffd700');
        coinGradient.addColorStop(0.7, '#d4a000');
        coinGradient.addColorStop(1, '#b8860b');
        ctx.beginPath();
        ctx.arc(0, 0, s * 0.75, 0, Math.PI * 2);
        ctx.fillStyle = coinGradient;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(0, 0, s * 0.75, 0, Math.PI * 2);
        ctx.strokeStyle = '#b8860b';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 0, s * 0.5, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 215, 0, 0.5)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.fillStyle = '#b8860b';
        ctx.font = `bold ${s * 0.6}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('$', 0, 0);
        ctx.beginPath();
        ctx.ellipse(-s * 0.25, -s * 0.25, s * 0.2, s * 0.15, -Math.PI / 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.fill();
        break;
      }
      case 'weapon': {
        ctx.rotate(this.rotation);
        const wg = ctx.createLinearGradient(-s * 0.5, -s, s * 0.5, s);
        wg.addColorStop(0, '#8b5cf6');
        wg.addColorStop(0.3, '#7c3aed');
        wg.addColorStop(0.5, '#6366f1');
        wg.addColorStop(0.7, '#4f46e5');
        wg.addColorStop(1, '#3730a3');
        ctx.beginPath();
        ctx.moveTo(-s * 0.35, -s * 0.8);
        ctx.lineTo(s * 0.35, -s * 0.8);
        ctx.lineTo(s * 0.45, s * 0.6);
        ctx.lineTo(-s * 0.45, s * 0.6);
        ctx.closePath();
        ctx.fillStyle = wg;
        ctx.fill();
        ctx.strokeStyle = '#3730a3';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-s * 0.25, -s * 0.9);
        ctx.lineTo(s * 0.25, -s * 0.9);
        ctx.lineTo(s * 0.35, -s * 0.8);
        ctx.lineTo(-s * 0.35, -s * 0.8);
        ctx.closePath();
        ctx.fillStyle = '#a78bfa';
        ctx.fill();
        for (let i = 0; i < 3; i++) {
          const slotY = -s * 0.5 + i * s * 0.35;
          ctx.beginPath();
          ctx.roundRect(-s * 0.25, slotY, s * 0.5, s * 0.2, 2);
          ctx.fillStyle = i < 2 ? '#c4b5fd' : 'rgba(196,181,253,0.4)';
          ctx.fill();
          ctx.strokeStyle = 'rgba(255,255,255,0.3)';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(0, s * 0.35, s * 0.15, 0, Math.PI * 2);
        const gg = ctx.createRadialGradient(0, s * 0.35, 0, 0, s * 0.35, s * 0.2);
        gg.addColorStop(0, '#ffffff');
        gg.addColorStop(0.5, '#a78bfa');
        gg.addColorStop(1, 'rgba(167,139,250,0)');
        ctx.fillStyle = gg;
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = `bold ${s * 0.4}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('+', 0, -s * 0.15);
        break;
      }
      case 'shield': {
        const sg = ctx.createRadialGradient(0, 0, 0, 0, 0, s);
        sg.addColorStop(0, '#86efac');
        sg.addColorStop(0.4, '#22c55e');
        sg.addColorStop(0.7, '#16a34a');
        sg.addColorStop(1, '#15803d');
        ctx.globalAlpha = 0.4 + 0.1 * Math.sin(now / 150);
        ctx.beginPath();
        ctx.arc(0, 0, s * 0.95, 0, Math.PI * 2);
        ctx.fillStyle = sg;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.moveTo(0, -s * 0.85);
        ctx.quadraticCurveTo(s * 0.7, -s * 0.6, s * 0.8, 0);
        ctx.quadraticCurveTo(s * 0.7, s * 0.7, 0, s * 0.85);
        ctx.quadraticCurveTo(-s * 0.7, s * 0.7, -s * 0.8, 0);
        ctx.quadraticCurveTo(-s * 0.7, -s * 0.6, 0, -s * 0.85);
        ctx.fillStyle = sg;
        ctx.fill();
        ctx.strokeStyle = '#15803d';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, -s * 0.5);
        ctx.quadraticCurveTo(s * 0.4, -s * 0.35, s * 0.45, 0);
        ctx.quadraticCurveTo(s * 0.4, s * 0.4, 0, s * 0.5);
        ctx.quadraticCurveTo(-s * 0.4, s * 0.4, -s * 0.45, 0);
        ctx.quadraticCurveTo(-s * 0.4, -s * 0.35, 0, -s * 0.5);
        ctx.fillStyle = 'rgba(134,239,172,0.5)';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(0, 0, s * 0.25, 0, Math.PI * 2);
        const bg = ctx.createRadialGradient(0, 0, 0, 0, 0, s * 0.3);
        bg.addColorStop(0, '#ffffff');
        bg.addColorStop(0.5, '#86efac');
        bg.addColorStop(1, '#22c55e');
        ctx.fillStyle = bg;
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.4)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(-s * 0.3, -s * 0.2);
        ctx.lineTo(-s * 0.5, s * 0.1);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(s * 0.3, -s * 0.2);
        ctx.lineTo(s * 0.5, s * 0.1);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, -s * 0.6, s * 0.1, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = 0.6;
        ctx.fill();
        ctx.globalAlpha = 1;
        break;
      }
      case 'energy': {
        ctx.rotate(this.rotation);
        ctx.globalAlpha = 0.3;
        ctx.beginPath();
        ctx.arc(0, 0, s * 0.9, 0, Math.PI * 2);
        const ef = ctx.createRadialGradient(0, 0, 0, 0, 0, s);
        ef.addColorStop(0, '#00d4ff');
        ef.addColorStop(0.5, 'rgba(0,212,255,0.3)');
        ef.addColorStop(1, 'rgba(0,212,255,0)');
        ctx.fillStyle = ef;
        ctx.fill();
        ctx.globalAlpha = 1;
        const eg = ctx.createLinearGradient(0, -s, 0, s);
        eg.addColorStop(0, '#00ffff');
        eg.addColorStop(0.3, '#00d4ff');
        eg.addColorStop(0.5, '#00b4d8');
        eg.addColorStop(0.7, '#0096c7');
        eg.addColorStop(1, '#0077b6');
        ctx.beginPath();
        ctx.moveTo(0, -s * 0.9);
        ctx.lineTo(s * 0.3, -s * 0.5);
        ctx.lineTo(s * 0.15, -s * 0.45);
        ctx.lineTo(s * 0.4, -s * 0.1);
        ctx.lineTo(s * 0.1, -s * 0.05);
        ctx.lineTo(s * 0.35, s * 0.35);
        ctx.lineTo(0, s * 0.15);
        ctx.lineTo(-s * 0.2, s * 0.5);
        ctx.lineTo(-s * 0.05, s * 0.3);
        ctx.lineTo(-s * 0.3, s * 0.05);
        ctx.lineTo(-s * 0.1, 0);
        ctx.lineTo(-s * 0.25, -s * 0.35);
        ctx.lineTo(-s * 0.05, -s * 0.3);
        ctx.lineTo(0, -s * 0.9);
        ctx.closePath();
        ctx.fillStyle = eg;
        ctx.fill();
        ctx.strokeStyle = '#0077b6';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, -s * 0.7);
        ctx.lineTo(s * 0.15, -s * 0.35);
        ctx.lineTo(0, -s * 0.2);
        ctx.lineTo(-s * 0.1, -s * 0.4);
        ctx.closePath();
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        ctx.fill();
        const pp = [{x:0,y:-s*0.8},{x:s*0.25,y:-s*0.15},{x:0,y:s*0.3},{x:-s*0.15,y:0}];
        pp.forEach(p => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, s * 0.08 * pulse, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255,255,255,0.8)';
          ctx.fill();
        });
        ctx.strokeStyle = 'rgba(0,255,255,0.5)';
        ctx.lineWidth = 0.5;
        for (let i = 0; i < 3; i++) {
          const offset = (now / 100 + i * 30) % 60;
          ctx.beginPath();
          ctx.arc(0, 0, s * 0.6 + offset * 0.1, i * 0.5, i * 0.5 + 0.3);
          ctx.stroke();
        }
        break;
      }
      case 'health': {
        ctx.rotate(this.rotation * 0.3);
        ctx.globalAlpha = 0.25;
        ctx.beginPath();
        ctx.arc(0, 0, s * 1.1, 0, Math.PI * 2);
        const hg = ctx.createRadialGradient(0, 0, 0, 0, 0, s * 1.1);
        hg.addColorStop(0, '#ffd700');
        hg.addColorStop(0.5, 'rgba(255,215,0,0.3)');
        hg.addColorStop(1, 'rgba(255,215,0,0)');
        ctx.fillStyle = hg;
        ctx.fill();
        ctx.globalAlpha = 1;
        const hr = ctx.createLinearGradient(-s * 0.5, -s, s * 0.5, s);
        hr.addColorStop(0, '#ffec99');
        hr.addColorStop(0.2, '#ffd700');
        hr.addColorStop(0.4, '#ffcc00');
        hr.addColorStop(0.6, '#ffc000');
        hr.addColorStop(0.8, '#ff9500');
        hr.addColorStop(1, '#ff8c00');
        ctx.beginPath();
        ctx.moveTo(0, s * 0.3);
        ctx.bezierCurveTo(-s * 0.1, s * 0.1, -s * 0.5, -s * 0.1, -s * 0.5, -s * 0.4);
        ctx.bezierCurveTo(-s * 0.5, -s * 0.7, -s * 0.2, -s * 0.8, 0, -s * 0.55);
        ctx.bezierCurveTo(s * 0.2, -s * 0.8, s * 0.5, -s * 0.7, s * 0.5, -s * 0.4);
        ctx.bezierCurveTo(s * 0.5, -s * 0.1, s * 0.1, s * 0.1, 0, s * 0.3);
        ctx.fillStyle = hr;
        ctx.fill();
        ctx.strokeStyle = '#ff8c00';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-s * 0.35, -s * 0.35);
        ctx.bezierCurveTo(-s * 0.35, -s * 0.55, -s * 0.15, -s * 0.65, -s * 0.05, -s * 0.5);
        ctx.bezierCurveTo(-s * 0.15, -s * 0.35, -s * 0.25, -s * 0.25, -s * 0.35, -s * 0.35);
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(0, s * 0.05, s * 0.25, s * 0.2, 0, 0, Math.PI * 2);
        const cg = ctx.createRadialGradient(0, s * 0.05, 0, 0, s * 0.05, s * 0.25);
        cg.addColorStop(0, 'rgba(255,236,153,0.8)');
        cg.addColorStop(1, 'rgba(255,215,0,0.2)');
        ctx.fillStyle = cg;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(-s * 0.3, -s * 0.5, s * 0.08, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(s * 0.25, -s * 0.45, s * 0.06, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.fill();
        break;
      }
      case 'slow': {
        ctx.rotate(this.rotation * 0.2);
        ctx.globalAlpha = 0.2 + 0.1 * Math.sin(now / 100);
        ctx.beginPath();
        ctx.arc(0, 0, s * 1.2, 0, Math.PI * 2);
        const tg = ctx.createRadialGradient(0, 0, 0, 0, 0, s * 1.2);
        tg.addColorStop(0, '#8b5cf6');
        tg.addColorStop(0.5, 'rgba(139,92,246,0.3)');
        tg.addColorStop(1, 'rgba(139,92,246,0)');
        ctx.fillStyle = tg;
        ctx.fill();
        ctx.globalAlpha = 1;
        const fg = ctx.createLinearGradient(-s * 0.5, -s, s * 0.5, s);
        fg.addColorStop(0, '#a78bfa');
        fg.addColorStop(0.5, '#8b5cf6');
        fg.addColorStop(1, '#7c3aed');
        ctx.fillStyle = fg;
        ctx.strokeStyle = '#6d28d9';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(-s * 0.5, -s * 0.95, s, s * 0.15, 3);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.roundRect(-s * 0.5, s * 0.8, s, s * 0.15, 3);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-s * 0.4, -s * 0.8);
        ctx.quadraticCurveTo(-s * 0.45, -s * 0.3, 0, 0);
        ctx.quadraticCurveTo(s * 0.45, -s * 0.3, s * 0.4, -s * 0.8);
        ctx.lineTo(-s * 0.4, -s * 0.8);
        ctx.closePath();
        ctx.fillStyle = 'rgba(196,181,253,0.3)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(167,139,250,0.6)';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-s * 0.4, s * 0.8);
        ctx.quadraticCurveTo(-s * 0.45, s * 0.3, 0, 0);
        ctx.quadraticCurveTo(s * 0.45, s * 0.3, s * 0.4, s * 0.8);
        ctx.lineTo(-s * 0.4, s * 0.8);
        ctx.closePath();
        ctx.fillStyle = 'rgba(196,181,253,0.3)';
        ctx.fill();
        ctx.stroke();
        const sandTop = Math.max(0, 0.7 - (now % 3000) / 3000 * 0.4);
        if (sandTop > 0) {
          ctx.beginPath();
          ctx.moveTo(-s * 0.35 * sandTop, -s * 0.75);
          ctx.quadraticCurveTo(-s * 0.4 * sandTop, -s * 0.4, 0, -s * 0.15 * sandTop);
          ctx.quadraticCurveTo(s * 0.4 * sandTop, -s * 0.4, s * 0.35 * sandTop, -s * 0.75);
          ctx.closePath();
          ctx.fillStyle = '#c4b5fd';
          ctx.fill();
        }
        const sandBottom = Math.min(0.7, (now % 3000) / 3000 * 0.4);
        if (sandBottom > 0) {
          ctx.beginPath();
          ctx.moveTo(-s * 0.35 * sandBottom, s * 0.75);
          ctx.quadraticCurveTo(-s * 0.4 * sandBottom, s * 0.4, 0, s * 0.15 * sandBottom);
          ctx.quadraticCurveTo(s * 0.4 * sandBottom, s * 0.4, s * 0.35 * sandBottom, s * 0.75);
          ctx.closePath();
          ctx.fillStyle = '#c4b5fd';
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(0, 0, s * 0.08, 0, Math.PI * 2);
        ctx.fillStyle = '#7c3aed';
        ctx.fill();
        ctx.strokeStyle = '#a78bfa';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        ctx.font = `bold ${s * 0.35}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('⏱', 0, -s * 0.5);
        ctx.fillStyle = 'rgba(196,181,253,0.8)';
        for (let i = 0; i < 3; i++) {
          const grainY = -s * 0.1 + (now / 50 + i * 20) % s * 0.2;
          ctx.beginPath();
          ctx.arc(0, grainY, s * 0.02, 0, Math.PI * 2);
          ctx.fill();
        }
        break;
      }
    }
    
    ctx.restore();
  }
}

class RingParticle {
  constructor(x, y, color, maxRadius, duration) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.maxRadius = maxRadius;
    this.life = 1;
    this.active = true;
    this.decay = 1000 / duration;
  }
  
  update(dt) {
    this.life -= this.decay * (dt / 16.67);
    if (this.life <= 0) {
      this.life = 0;
      this.active = false;
    }
  }
  
  draw(ctx) {
    if (this.life <= 0) return;
    const radius = this.maxRadius * (1 - this.life);
    ctx.save();
    ctx.globalAlpha = this.life * 0.6;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 15;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }
}

class SmokeParticle {
  constructor(x, y) {
    this.x = x + (Math.random() - 0.5) * 20;
    this.y = y + (Math.random() - 0.5) * 20;
    this.size = 15 + Math.random() * 25;
    this.life = 1;
    this.active = true;
    this.decay = 0.004 + Math.random() * 0.006;
    this.vx = (Math.random() - 0.5) * 0.2;
    this.vy = -(0.3 + Math.random() * 0.5);
  }
  
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.size += 0.3;
    this.life -= this.decay;
    if (this.life <= 0) {
      this.life = 0;
      this.active = false;
    }
  }
  
  draw(ctx) {
    if (this.life <= 0) return;
    ctx.save();
    ctx.globalAlpha = this.life * 0.2;
    ctx.fillStyle = 'rgba(150, 200, 220, 0.3)';
    ctx.shadowColor = 'rgba(150, 200, 220, 0.1)';
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

class Particle {
  constructor(x, y, color, speed, lifetime) {
    this.position = new Vector2(x, y);
    this.velocity = new Vector2((Math.random() - 0.5) * speed, (Math.random() - 0.5) * speed);
    this.color = color;
    this.lifetime = lifetime;
    this.maxLifetime = lifetime;
    this.size = Math.random() * 4 + 2;
    this.active = true;
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
    ctx.fillStyle = this.color;
    
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  }
}

class FloatingText {
  constructor(x, y, text, color, size) {
    this.position = new Vector2(x, y);
    this.velocity = new Vector2((Math.random() - 0.5) * 1, -2 - Math.random() * 1.5);
    this.text = text;
    this.color = color;
    this.size = size || 18;
    this.lifetime = 800;
    this.maxLifetime = 800;
    this.active = true;
  }
  
  update(dt) {
    this.position = this.position.add(this.velocity);
    this.lifetime -= dt;
    if (this.lifetime <= 0) {
      this.active = false;
    }
  }
  
  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.lifetime / this.maxLifetime);
    ctx.fillStyle = this.color;
    ctx.font = `bold ${this.size}px Arial`;
    ctx.textAlign = 'center';
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 8;
    ctx.fillText(this.text, this.position.x, this.position.y);
    ctx.restore();
  }
}

class StarLayer {
  constructor(count, minSize, maxSize, speed, color, glowSize) {
    this.stars = [];
    this.minSize = minSize;
    this.maxSize = maxSize;
    this.speed = speed;
    this.color = color;
    this.glowSize = glowSize;
    for (let i = 0; i < count; i++) {
      this.stars.push(this.createStar());
    }
  }
  
  createStar() {
    return {
      x: Math.random() * CONFIG.CANVAS_WIDTH,
      y: Math.random() * CONFIG.CANVAS_HEIGHT,
      size: this.minSize + Math.random() * (this.maxSize - this.minSize),
      brightness: 0.3 + Math.random() * 0.7,
      twinkleSpeed: 0.005 + Math.random() * 0.02,
      twinklePhase: Math.random() * Math.PI * 2
    };
  }
  
  update() {
    const bg = CONFIG.BACKGROUND;
    for (const star of this.stars) {
      star.y += this.speed;
      star.brightness = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(star.twinklePhase));
      star.twinklePhase += star.twinkleSpeed;
      if (star.y > CONFIG.CANVAS_HEIGHT) {
        star.x = Math.random() * CONFIG.CANVAS_WIDTH;
        star.y = -star.size;
      }
    }
  }
  
  draw(ctx) {
    for (const star of this.stars) {
      ctx.save();
      ctx.globalAlpha = star.brightness;
      ctx.fillStyle = this.color;
      
      if (this.glowSize > 0) {
        ctx.shadowColor = this.color;
        ctx.shadowBlur = this.glowSize;
      }
      
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    }
  }
}

class NebulaCloud {
  constructor() {
    this.reset();
  }
  
  reset() {
    const colors = CONFIG.BACKGROUND.NEBULA_COLORS;
    this.x = Math.random() * CONFIG.CANVAS_WIDTH;
    this.y = Math.random() * CONFIG.CANVAS_HEIGHT * 0.8;
    this.radius = 80 + Math.random() * 120;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.driftX = (Math.random() - 0.5) * 0.15;
    this.driftY = 0.05 + Math.random() * 0.1;
    this.opacity = 0.5 + Math.random() * 0.5;
  }
  
  update() {
    this.x += this.driftX;
    this.y += this.driftY;
    if (this.x > CONFIG.CANVAS_WIDTH + this.radius) this.x = -this.radius;
    if (this.x < -this.radius) this.x = CONFIG.CANVAS_WIDTH + this.radius;
    if (this.y > CONFIG.CANVAS_HEIGHT + this.radius) this.y = -this.radius;
  }
  
  draw(ctx) {
    const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
    grad.addColorStop(0, this.color);
    grad.addColorStop(0.4, this.color);
    grad.addColorStop(1, 'transparent');
    
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = grad;
    ctx.fillRect(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
    ctx.restore();
  }
}

class ShootingStar {
  constructor() {
    this.active = false;
    this.reset();
  }
  
  reset() {
    this.x = Math.random() * CONFIG.CANVAS_WIDTH * 1.5 - CONFIG.CANVAS_WIDTH * 0.25;
    this.y = Math.random() * CONFIG.CANVAS_HEIGHT * 0.4;
    this.length = 60 + Math.random() * 80;
    this.speed = 6 + Math.random() * 4;
    this.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.3;
    this.life = 1;
    this.fadeSpeed = 0.02 + Math.random() * 0.015;
    this.active = true;
    this.trail = [];
    this.tailLength = 12;
  }
  
  update() {
    if (!this.active) return;
    
    const dx = Math.cos(this.angle) * this.speed;
    const dy = Math.sin(this.angle) * this.speed;
    
    this.trail.push({ x: this.x, y: this.y });
    if (this.trail.length > this.tailLength) {
      this.trail.shift();
    }
    
    this.x += dx;
    this.y += dy;
    this.life -= this.fadeSpeed;
    
    if (this.life <= 0 || this.y > CONFIG.CANVAS_HEIGHT || this.x > CONFIG.CANVAS_WIDTH + 50 || this.x < -50) {
      this.active = false;
    }
  }
  
  draw(ctx) {
    if (!this.active || this.trail.length < 2) return;
    
    ctx.save();
    
    for (let i = 1; i < this.trail.length; i++) {
      const t = i / this.trail.length;
      const alpha = t * this.life * 0.7;
      const width = t * 2;
      
      const grad = ctx.createLinearGradient(
        this.trail[i - 1].x, this.trail[i - 1].y,
        this.trail[i].x, this.trail[i].y
      );
      grad.addColorStop(0, `rgba(180, 220, 255, ${alpha * 0.1})`);
      grad.addColorStop(0.5, `rgba(180, 220, 255, ${alpha * 0.5})`);
      grad.addColorStop(1, `rgba(200, 235, 255, ${alpha})`);
      
      ctx.strokeStyle = grad;
      ctx.lineWidth = width + 1;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(this.trail[i - 1].x, this.trail[i - 1].y);
      ctx.lineTo(this.trail[i].x, this.trail[i].y);
      ctx.stroke();
    }
    
    const headAlpha = this.life;
    ctx.shadowColor = '#b0e0ff';
    ctx.shadowBlur = 15;
    ctx.fillStyle = `rgba(200, 235, 255, ${headAlpha})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  }
}

class SpaceRock {
  constructor() {
    this.reset();
  }
  
  reset() {
    this.x = Math.random() * CONFIG.CANVAS_WIDTH;
    this.y = Math.random() * CONFIG.CANVAS_HEIGHT;
    this.size = 4 + Math.random() * 8;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotSpeed = (Math.random() - 0.5) * 0.02;
    this.speed = 0.1 + Math.random() * 0.2;
    this.driftX = (Math.random() - 0.5) * 0.3;
    this.opacity = 0.2 + Math.random() * 0.25;
    this.vertices = this.generateVertices();
  }
  
  generateVertices() {
    const verts = [];
    const count = 5 + Math.floor(Math.random() * 4);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const r = this.size * (0.6 + Math.random() * 0.4);
      verts.push({ x: Math.cos(angle) * r, y: Math.sin(angle) * r });
    }
    return verts;
  }
  
  update() {
    this.y += this.speed;
    this.x += this.driftX;
    this.rotation += this.rotSpeed;
    if (this.y > CONFIG.CANVAS_HEIGHT + this.size) {
      this.y = -this.size;
      this.x = Math.random() * CONFIG.CANVAS_WIDTH;
    }
  }
  
  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.globalAlpha = this.opacity;
    ctx.strokeStyle = 'rgba(150, 170, 200, 0.4)';
    ctx.fillStyle = 'rgba(80, 90, 110, 0.3)';
    ctx.lineWidth = 1;
    
    ctx.beginPath();
    ctx.moveTo(this.vertices[0].x, this.vertices[0].y);
    for (let i = 1; i < this.vertices.length; i++) {
      ctx.lineTo(this.vertices[i].x, this.vertices[i].y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
}

class StarDust {
  constructor() {
    this.reset();
  }
  
  reset() {
    this.x = Math.random() * CONFIG.CANVAS_WIDTH;
    this.y = Math.random() * CONFIG.CANVAS_HEIGHT;
    this.size = 0.5 + Math.random() * 1.5;
    this.speedX = (Math.random() - 0.5) * 0.15;
    this.speedY = 0.05 + Math.random() * 0.1;
    this.opacity = 0.2 + Math.random() * 0.4;
    const hue = 200 + Math.random() * 60;
    this.color = `hsla(${hue}, 60%, 70%, ${this.opacity})`;
  }
  
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.y > CONFIG.CANVAS_HEIGHT) { this.y = -2; this.x = Math.random() * CONFIG.CANVAS_WIDTH; }
    if (this.x < 0) this.x = CONFIG.CANVAS_WIDTH;
    if (this.x > CONFIG.CANVAS_WIDTH) this.x = 0;
  }
  
  draw(ctx) {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

class BackgroundManager {
  constructor() {
    this.bg = CONFIG.BACKGROUND;
    this.starFar = new StarLayer(this.bg.STAR_FAR_COUNT, 0.3, 1.2, 0.2, 'rgba(200, 220, 255, 0.8)', 0);
    this.starMid = new StarLayer(this.bg.STAR_MID_COUNT, 1.0, 2.5, 0.5, 'rgba(180, 210, 255, 0.9)', 3);
    this.starNear = new StarLayer(this.bg.STAR_NEAR_COUNT, 2.0, 4.0, 1.0, 'rgba(200, 230, 255, 1)', 8);
    
    this.nebulas = [];
    for (let i = 0; i < this.bg.NEBULA_COUNT; i++) {
      this.nebulas.push(new NebulaCloud());
    }
    
    this.rocks = [];
    for (let i = 0; i < this.bg.ROCK_COUNT; i++) {
      this.rocks.push(new SpaceRock());
    }
    
    this.dusts = [];
    for (let i = 0; i < this.bg.DUST_COUNT; i++) {
      this.dusts.push(new StarDust());
    }
    
    this.shootingStar = new ShootingStar();
    this.shootingStar.active = false;
    this.nextShootingStar = 2000 + Math.random() * 2000;
    this.shootingStarTimer = 0;
    
    this.vignetteCache = null;
    this.noiseCache = null;
    this.vignetteWidth = 0;
    this.vignetteHeight = 0;
    this.noiseWidth = 0;
    this.noiseHeight = 0;
  }
  
  update(dt, currentTime) {
    this.starFar.update();
    this.starMid.update();
    this.starNear.update();
    
    for (const n of this.nebulas) n.update();
    for (const r of this.rocks) r.update();
    for (const d of this.dusts) d.update();
    
    if (this.shootingStar.active) {
      this.shootingStar.update();
    } else {
      this.shootingStarTimer += dt;
      if (this.shootingStarTimer > this.nextShootingStar) {
        this.shootingStar = new ShootingStar();
        this.nextShootingStar = 3000 + Math.random() * 4000;
        this.shootingStarTimer = 0;
      }
    }
  }
  
  draw(ctx, width, height) {
    ctx.save();
    
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, this.bg.GRADIENT_TOP);
    grad.addColorStop(0.5, this.bg.GRADIENT_MID);
    grad.addColorStop(1, this.bg.GRADIENT_BOTTOM);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
    
    for (const n of this.nebulas) n.draw(ctx);
    
    this.starFar.draw(ctx);
    this.starMid.draw(ctx);
    this.starNear.draw(ctx);
    
    for (const r of this.rocks) r.draw(ctx);
    for (const d of this.dusts) d.draw(ctx);
    
    if (this.shootingStar.active) {
      this.shootingStar.draw(ctx);
    }
    
    this.drawVignette(ctx, width, height);
    this.drawAmbientGlow(ctx, width, height);
    this.drawNoise(ctx, width, height);
    
    ctx.restore();
  }
  
  drawVignette(ctx, width, height) {
    if (this.vignetteCache && this.vignetteWidth === width && this.vignetteHeight === height) {
      ctx.drawImage(this.vignetteCache, 0, 0);
      return;
    }
    
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const vCtx = canvas.getContext('2d');
    
    const grad = vCtx.createRadialGradient(width / 2, height / 2, height * 0.2, width / 2, height / 2, height * 0.75);
    grad.addColorStop(0, 'transparent');
    grad.addColorStop(0.6, 'transparent');
    grad.addColorStop(1, `rgba(0, 0, 0, ${this.bg.VIGNETTE_STRENGTH})`);
    vCtx.fillStyle = grad;
    vCtx.fillRect(0, 0, width, height);
    
    this.vignetteCache = canvas;
    this.vignetteWidth = width;
    this.vignetteHeight = height;
    ctx.drawImage(canvas, 0, 0);
  }
  
  drawAmbientGlow(ctx, width, height) {
    ctx.fillStyle = this.bg.AMBIENT_COLOR;
    ctx.fillRect(0, 0, width, height);
  }
  
  drawNoise(ctx, width, height) {
    if (this.noiseCache && this.noiseWidth === width && this.noiseHeight === height) {
      ctx.drawImage(this.noiseCache, 0, 0);
      return;
    }
    
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const nCtx = canvas.getContext('2d');
    
    const imageData = nCtx.createImageData(width, height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const v = Math.random() * 255;
      data[i] = v;
      data[i + 1] = v;
      data[i + 2] = v;
      data[i + 3] = 10;
    }
    nCtx.putImageData(imageData, 0, 0);
    
    this.noiseCache = canvas;
    this.noiseWidth = width;
    this.noiseHeight = height;
    ctx.drawImage(canvas, 0, 0);
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
    this.floatingTexts = [];
    this.shakeIntensity = 0;
    this.shakeDuration = 0;
    this.hitStop = 0;
    this.screenOverlay = null;
    this.bossWarningTimer = 0;
    this.backgroundManager = new BackgroundManager();
    
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
    this.powerupDropTimer = 8000 + Math.random() * 4000;
    
    this.input = { up: false, down: false, left: false, right: false, secondary: false, touchTarget: null };
    this.lastInputTime = { secondary: 0 };
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
    this.floatingTexts = [];
    this.shakeIntensity = 0;
    this.shakeDuration = 0;
    this.hitStop = 0;
    this.screenOverlay = null;
    this.bossWarningTimer = 0;
    this.bossActive = false;
    this.powerupDropTimer = 8000 + Math.random() * 4000;
    
    soundManager.play('levelStart', SOUND_CONFIGS.ENVIRONMENT.levelStart);
    soundManager.startBackgroundSound();
    
    this.startWave();
  }
  
  triggerShake(intensity, duration) {
    this.shakeIntensity = intensity;
    this.shakeDuration = duration;
  }
  
  triggerHitStop(duration) {
    this.hitStop = duration;
  }
  
  getLevelConfig(level) {
    if (level <= LEVEL_CONFIGS.length) {
      return LEVEL_CONFIGS[level - 1];
    }
    const bossList = ['boss1', 'boss2', 'boss3', 'boss4', 'boss5', 'boss6'];
    const allEnemies = ['scout', 'fighter', 'bomber', 'elite'];
    const idx = (level - 1) % bossList.length;
    const cycleNum = Math.floor((level - 1) / bossList.length);
    return {
      level: level,
      name: `无尽深空·${level - LEVEL_CONFIGS.length}`,
      waves: 3 + Math.floor(level / 3),
      enemies: allEnemies,
      boss: bossList[idx]
    };
  }

  startWave() {
    const levelConfig = this.getLevelConfig(this.level);
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
      this.enemies.push(new Enemy(config, DIFFICULTY_PRESETS[this.difficulty], this.level));
    }
    this.waveIndex++;
  }
  
  spawnBoss() {
    const levelConfig = this.getLevelConfig(this.level);
    const config = ENEMY_CONFIGS[levelConfig.boss];
    if (config) {
      this.enemies.push(new Enemy(config, DIFFICULTY_PRESETS[this.difficulty], this.level));
      this.bossActive = true;
      this.bossWarningTimer = 1500;
      soundManager.play('bossSpawn', SOUND_CONFIGS.ENEMY.bossSpawn);
    }
  }
  
  update(dt, currentTime, canvasWidth, canvasHeight) {
    if (this.status !== 'PLAYING') return;
    
    if (this.hitStop > 0) {
      this.hitStop -= dt;
      return;
    }
    
    if (this.shakeDuration > 0) {
      this.shakeDuration -= dt;
      if (this.shakeDuration < 0) this.shakeDuration = 0;
    }
    
    if (this.screenOverlay) {
      this.screenOverlay.alpha -= this.screenOverlay.fadeOut * dt;
      if (this.screenOverlay.alpha <= 0) this.screenOverlay = null;
    }
    
    this.floatingTexts = this.floatingTexts.filter(t => t.active);
    this.floatingTexts.forEach(t => t.update(dt));
    
    this.backgroundManager.update(dt, currentTime);
    this.handleSpawning(currentTime);
    this.handlePowerupDrop(currentTime);
    this.updatePlayer(dt, currentTime, canvasWidth, canvasHeight);
    this.updateEnemies(dt, currentTime);
    this.updateBullets();
    this.updatePowerups();
    this.updateShieldBreakParticles(dt);
    this.updateParticles(dt);
    this.checkCollisions();
    this.checkWaveComplete();
  }
  
  handleSpawning(currentTime) {
    if (!this.bossActive && !this.player.slowTimeActive) {
      const diffMulti = { easy: 1.3, normal: 1.0, hard: 0.7 };
      const waveMulti = Math.max(0.5, 1 - (this.wave - 1) * 0.08);
      const interval = this.spawnInterval * (diffMulti[this.difficulty] || 1) * waveMulti;
      if (currentTime - this.lastSpawnTime > interval) {
        this.spawnEnemy();
        this.lastSpawnTime = currentTime;
      }
    }
  }
  
  handlePowerupDrop(currentTime) {
    this.powerupDropTimer -= 16.67;
    if (this.powerupDropTimer <= 0) {
      this.powerupDropTimer = 8000 + Math.random() * 4000;
      const x = 50 + Math.random() * (CONFIG.CANVAS_WIDTH - 100);
      const types = POWERUP_CONFIGS.map(p => p.type);
      const type = types[Math.floor(Math.random() * types.length)];
      this.powerups.push(new Powerup(x, -30, type));
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
    
    if (this.player.ultimateReady) {
      if (this.player.activateUltimate()) {
        this.enemyBullets = [];
        this.createExplosion(this.player.position.x, this.player.position.y, '#ffd700', 40);
        this.particles.push(new RingParticle(this.player.position.x, this.player.position.y, '#ffd700', 300, 600));
        this.particles.push(new RingParticle(this.player.position.x, this.player.position.y, '#fff8dc', 200, 400));
        this.screenOverlay = { alpha: 0.6, fadeOut: 0.004 };
        this.floatingTexts.push(new FloatingText(this.player.position.x, this.player.position.y - 80, '⚡ 必杀发动! ⚡', '#ffd700', 30));
      }
    }
    
    if (this.player.hp <= 0) {
      this.gameOver();
    }
  }
  
  updateEnemies(dt, currentTime) {
    const adjustedDt = this.player?.slowTimeActive ? dt * 0.5 : dt;
    
    this.enemies.forEach(enemy => {
      const bullets = enemy.update(adjustedDt, currentTime, this.player?.position);
      if (bullets && bullets.length > 0) {
        this.enemyBullets.push(...bullets);
        if (enemy.isBoss) {
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
    this.powerups.forEach(p => p.update(this.player?.position));
    this.powerups = this.powerups.filter(p => p.active);
  }
  
  updateParticles(dt) {
    this.particles.forEach(p => p.update(dt));
    this.particles = this.particles.filter(p => p.active);
  }
  
  updateShieldBreakParticles(dt) {
    if (!this.player) return;
    const parts = this.player.shieldBreakParticles;
    for (let i = parts.length - 1; i >= 0; i--) {
      const p = parts[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.05;
      p.life -= p.decay;
      if (p.life <= 0) parts.splice(i, 1);
    }
  }
  
  checkCollisions() {
    if (!this.player) return;
    
    this.playerBullets.forEach(bullet => {
      this.enemies.forEach(enemy => {
        if (bullet.position.distanceTo(enemy.position) < enemy.size / 2 + bullet.size) {
          bullet.active = false;
          for (let i = 0; i < 6; i++) {
            this.particles.push(new Particle(bullet.position.x, bullet.position.y, '#66ddff', 3, 250));
          }
          const killed = enemy.takeDamage(bullet.damage);
          
          this.floatingTexts.push(new FloatingText(enemy.position.x, enemy.position.y - 10, `-${bullet.damage}`, '#ff6b6b', 16));
          soundManager.play('enemyHit', SOUND_CONFIGS.ENEMY.hit);
          this.triggerHitStop(30);
          this.triggerShake(enemy.isBoss ? 4 : 2, enemy.isBoss ? 150 : 80);
          
          if (killed) {
            this.particles.push(...enemy.destroyParticles);
            enemy.destroyParticles = [];
            this.createExplosion(enemy.position.x, enemy.position.y, enemy.color, 12, enemy.isBoss, enemy.size > 30);
            this.score += enemy.score;
            this.coins += Math.floor(enemy.score / 10);
            this.stats.totalKills++;
            const leveledUp = this.player.addKill(enemy.isBoss ? 5 : 1);
            this.triggerShake(enemy.isBoss ? 12 : 5, enemy.isBoss ? 300 : 150);
            
            if (leveledUp) {
              this.floatingTexts.push(new FloatingText(this.player.position.x, this.player.position.y - 60, '⚡ LEVEL UP! ⚡', '#ffd700', 28));
              this.triggerShake(3, 200);
            }
            
            if (enemy.isBoss) {
              this.stats.bossKills++;
              soundManager.play('bossDeath', SOUND_CONFIGS.ENEMY.bossDeath);
            } else {
              soundManager.play('enemyDeath', SOUND_CONFIGS.ENEMY.death);
            }
            
            if (Math.random() < 0.35) {
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
        this.triggerShake(6, 200);
        this.triggerHitStop(60);
        this.floatingTexts.push(new FloatingText(this.player.position.x, this.player.position.y - 30, `-${bullet.damage}`, '#ff4444', 22));
        soundManager.play('hit', SOUND_CONFIGS.PLAYER.hit);
      }
    });
    
    this.enemies.forEach(enemy => {
      if (enemy.position.distanceTo(this.player.position) < enemy.size / 2 + 25) {
        this.player.takeDamage(enemy.damage);
        this.createExplosion(this.player.position.x, this.player.position.y, '#ff4444', 15, false, true);
        this.triggerShake(8, 250);
        this.triggerHitStop(80);
        this.floatingTexts.push(new FloatingText(this.player.position.x, this.player.position.y - 30, `-${enemy.damage}`, '#ff4444', 22));
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
        const px = powerup.position.x;
        const py = powerup.position.y;
        
        switch (powerup.config.effect) {
          case 'restoreHealth':
            this.floatingTexts.push(new FloatingText(px, py - 20, '+30 HP', '#22ff66', 20));
            soundManager.play('powerup', SOUND_CONFIGS.PLAYER.powerup);
            break;
          case 'restoreEnergy':
            this.floatingTexts.push(new FloatingText(px, py - 20, '+50 Energy', '#44ddff', 20));
            soundManager.play('powerup', SOUND_CONFIGS.PLAYER.powerup);
            break;
          case 'upgradeWeapon':
            this.floatingTexts.push(new FloatingText(px, py - 20, '+5 KILLS', '#a855f7', 20));
            soundManager.play('powerup', SOUND_CONFIGS.PLAYER.powerup);
            break;
          case 'activateShield':
            this.floatingTexts.push(new FloatingText(px, py - 20, `🛡 +${powerup.config.value}`, '#22c55e', 20));
            soundManager.play('powerup', SOUND_CONFIGS.PLAYER.powerup);
            break;
          case 'addCoins':
            this.coins += coins;
            this.floatingTexts.push(new FloatingText(px, py - 20, `+${coins}`, '#ffd700', 20));
            soundManager.play('coinCollect', SOUND_CONFIGS.SPECIAL.coinCollect);
            break;
          case 'slowTime':
            this.floatingTexts.push(new FloatingText(px, py - 20, '⏱ SLOW TIME!', '#8b5cf6', 20));
            soundManager.play('powerup', SOUND_CONFIGS.PLAYER.powerup);
            break;
          default:
            soundManager.play('powerup', SOUND_CONFIGS.PLAYER.powerup);
        }
        
        this.stats.totalPowerups++;
        this.createExplosion(powerup.position.x, powerup.position.y, powerup.config.color, 8);
      }
    });
  }
  
  checkWaveComplete() {
    const levelConfig = this.getLevelConfig(this.level);
    
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
    
    this.player.hp = this.player.maxHp;
    
    this.level++;
    this.stats.maxLevel = Math.max(this.stats.maxLevel, this.level - 1);
    
    soundManager.play('levelUp', SOUND_CONFIGS.PLAYER.levelUp);
    
    this.wave = 1;
    this.bossActive = false;
    this.startWave();
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
  
  createExplosion(x, y, color, count, isBoss = false, isLarge = false) {
    for (let i = 0; i < count; i++) {
      this.particles.push(new Particle(x + (Math.random() - 0.5) * 8, y + (Math.random() - 0.5) * 8, color, 3 + Math.random() * 2, 300 + Math.random() * 200));
    }
    
    if (isLarge || count > 12) {
      for (let i = 0; i < 8; i++) {
        const c = Math.random() > 0.5 ? '#66ddff' : '#66ffaa';
        this.particles.push(new Particle(x, y, c, 5, 500));
      }
      this.particles.push(new RingParticle(x, y, '#66ddff', 100, 600));
      this.particles.push(new RingParticle(x, y, '#66ffaa', 80, 500));
    }
    
    if (isBoss) {
      this.particles.push(new RingParticle(x, y, '#ffffff', 150, 800));
      this.particles.push(new RingParticle(x, y, '#44ddff', 130, 700));
      for (let i = 0; i < 5; i++) {
        const c = Math.random() > 0.5 ? '#66ddff' : '#66ffaa';
        this.particles.push(new Particle(x, y, c, 6, 600));
      }
    }
    
    if (isLarge || isBoss) {
      for (let i = 0; i < (isBoss ? 5 : 3); i++) {
        this.particles.push(new SmokeParticle(x, y));
      }
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
      this.totalCoins -= plane.cost;
      this.unlockedPlanes.push(planeId);
      localStorage.setItem('thunder_unlockedPlanes', JSON.stringify(this.unlockedPlanes));
      localStorage.setItem('thunder_coins', this.totalCoins.toString());
      soundManager.play('newPlane', SOUND_CONFIGS.SPECIAL.newPlane);
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
  
  draw(ctx, canvasWidth, canvasHeight) {
    this.backgroundManager.draw(ctx, canvasWidth, canvasHeight);
    
    if (this.player?.slowTimeActive) {
      ctx.fillStyle = 'rgba(139, 92, 246, 0.2)';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    }
    
    if (this.screenOverlay) {
      ctx.fillStyle = `rgba(255, 215, 0, ${this.screenOverlay.alpha * 0.15})`;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    }
    
    this.powerups.forEach(p => p.draw(ctx));
    this.playerBullets.forEach(b => b.draw(ctx));
    
    this.enemyBullets.forEach(b => {
      const speed = Math.sqrt(b.velocity.x * b.velocity.x + b.velocity.y * b.velocity.y);
      if (speed > 0 && b.position.y < canvasHeight * 0.8) {
        ctx.save();
        const len = 30 + speed * 2;
        const nx = b.velocity.x / speed;
        const ny = b.velocity.y / speed;
        ctx.globalAlpha = 0.15;
        ctx.strokeStyle = '#ff3333';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 6]);
        ctx.beginPath();
        ctx.moveTo(b.position.x, b.position.y);
        ctx.lineTo(b.position.x + nx * len, b.position.y + ny * len);
        ctx.stroke();
        ctx.restore();
      }
      b.draw(ctx);
    });
    
    this.enemies.forEach(e => e.draw(ctx));
    
    if (this.player) {
      this.player.draw(ctx);
    }
    
    this.particles.forEach(p => p.draw(ctx));
    if (this.player) {
      for (const p of this.player.shieldBreakParticles) {
        ctx.save();
        ctx.globalAlpha = p.life;
        ctx.shadowColor = '#22c55e';
        ctx.shadowBlur = 6;
        ctx.fillStyle = '#22c55e';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }
    this.floatingTexts.forEach(t => t.draw(ctx));
    
    if (this.bossActive) {
      const boss = this.enemies.find(e => e.isBoss);
      if (boss) {
        const barWidth = Math.min(canvasWidth * 0.6, 400);
        const barHeight = 12;
        const barX = (canvasWidth - barWidth) / 2;
        const barY = 10;
        
        ctx.save();
        ctx.shadowColor = '#ff4444';
        ctx.shadowBlur = 10;
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.roundRect(barX - 2, barY - 2, barWidth + 4, barHeight + 4, 4);
        ctx.fill();
        ctx.shadowBlur = 0;
        
        const hpRatio = Math.max(0, boss.hp / boss.maxHp);
        ctx.fillStyle = '#ff4444';
        ctx.roundRect(barX, barY, barWidth * hpRatio, barHeight, 3);
        ctx.fill();
        
        ctx.strokeStyle = 'rgba(255,68,68,0.6)';
        ctx.lineWidth = 1;
        ctx.roundRect(barX, barY, barWidth, barHeight, 3);
        ctx.stroke();
        
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 11px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`BOSS  ${boss.config.name || ''}`, canvasWidth / 2, barY - 4);
        
        ctx.restore();
      }
    }
    
    if (this.bossWarningTimer > 0) {
      ctx.save();
      const alpha = Math.min(1, this.bossWarningTimer / 500) * (0.5 + 0.5 * Math.sin(Date.now() / 100));
      ctx.globalAlpha = alpha;
      ctx.fillStyle = '#ff2222';
      ctx.font = 'bold 48px Arial';
      ctx.textAlign = 'center';
      ctx.shadowColor = '#ff0000';
      ctx.shadowBlur = 30;
      ctx.fillText('⚠ WARNING ⚠', canvasWidth / 2, canvasHeight / 2 - 50);
      ctx.shadowBlur = 20;
      ctx.font = 'bold 24px Arial';
      ctx.fillStyle = '#ff6666';
      ctx.fillText('BOSS  approaching', canvasWidth / 2, canvasHeight / 2);
      ctx.restore();
    }
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
      
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      const scaleX = CONFIG.CANVAS_WIDTH / rect.width;
      const scaleY = CONFIG.CANVAS_HEIGHT / rect.height;
      const x = (touch.clientX - rect.left) * scaleX;
      const y = (touch.clientY - rect.top) * scaleY;
      
      this.gameState.input.touchTarget = { x, y };
    }, { passive: false });
    
    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if (!isTouching) return;
      
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      const scaleX = CONFIG.CANVAS_WIDTH / rect.width;
      const scaleY = CONFIG.CANVAS_HEIGHT / rect.height;
      const x = (touch.clientX - rect.left) * scaleX;
      const y = (touch.clientY - rect.top) * scaleY;
      
      this.gameState.input.touchTarget = { x, y };
    }, { passive: false });
    
    canvas.addEventListener('touchend', () => {
      isTouching = false;
      this.gameState.input.touchTarget = null;
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
    this._lastHp = 100;
    this._hpFlashTimer = null;
    this.init();
  }
  
  init() {
    this.injectHudCSS();
    this.setupMenu();
    this.setupGame();
    this.setupShop();
    this.setupAchievements();
    this.setupQrCode();
    this.setupSound();
    this.updateMenuCoins();
  }
  
  injectHudCSS() {
    const style = document.createElement('style');
    style.textContent = `
      .hud-status {
        display: flex; align-items: center; gap: 6px;
        padding: 3px 10px; border-radius: 6px; font-size: 11px;
        font-weight: 700; letter-spacing: 1px;
        background: rgba(34, 197, 94, 0.15);
        border: 1px solid rgba(34, 197, 94, 0.4);
        color: #22c55e;
        text-shadow: 0 0 8px rgba(34, 197, 94, 0.3);
        animation: statusPulse 1.2s ease-in-out infinite;
      }
      .hud-status.slow {
        background: rgba(139, 92, 246, 0.15);
        border-color: rgba(139, 92, 246, 0.4);
        color: #8b5cf6;
        text-shadow: 0 0 8px rgba(139, 92, 246, 0.3);
      }
      .shield-bar .bar-fill {
        background: linear-gradient(90deg, #22c55e, #16a34a);
        box-shadow: 0 0 12px rgba(34, 197, 94, 0.5);
      }
      .energy-bar.active .bar-fill {
        background: linear-gradient(90deg, #ffd700, #ff8c00) !important;
        box-shadow: 0 0 20px rgba(255, 215, 0, 0.8) !important;
        animation: energyPulse 0.6s ease-in-out infinite alternate;
      }
      @keyframes energyPulse {
        0% { box-shadow: 0 0 12px rgba(255, 215, 0, 0.5); }
        100% { box-shadow: 0 0 30px rgba(255, 215, 0, 0.9); }
      }
      @keyframes statusPulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.6; }
      }
    `;
    document.head.appendChild(style);
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
    
    document.getElementById('qrCodeBtn')?.addEventListener('click', () => {
      soundManager.play('click', { ...SOUND_CONFIGS.UI.click, isUI: true });
      this.generateQrCode();
      this.showModal('qrCodeModal');
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
  
  setupQrCode() {
    document.getElementById('closeQrBtn')?.addEventListener('click', () => {
      soundManager.play('menuClose', { ...SOUND_CONFIGS.UI.menuClose, isUI: true });
      this.hideModal('qrCodeModal');
    });
    
    document.getElementById('closeQrBtn2')?.addEventListener('click', () => {
      soundManager.play('menuClose', { ...SOUND_CONFIGS.UI.menuClose, isUI: true });
      this.hideModal('qrCodeModal');
    });
    
    document.getElementById('downloadQrBtn')?.addEventListener('click', () => {
      soundManager.play('click', { ...SOUND_CONFIGS.UI.click, isUI: true });
      this.downloadQrCode();
    });
    
    document.getElementById('copyUrlBtn')?.addEventListener('click', () => {
      soundManager.play('click', { ...SOUND_CONFIGS.UI.click, isUI: true });
      this.copyGameUrl();
    });
  }
  
  generateQrCode() {
    const canvas = document.getElementById('qrCanvas');
    if (!canvas) return;
    
    if (typeof QRCode === 'undefined') {
      this.showToast('二维码库加载中，请稍后重试');
      console.error('QRCode library not loaded');
      this.loadQRCodeLibrary(() => {
        this.generateQrCode();
      });
      return;
    }
    
    let gameUrl;
    if (CONFIG.SHARE_URL) {
      gameUrl = CONFIG.SHARE_URL;
    } else {
      const isFileProtocol = window.location.protocol === 'file:';
      if (isFileProtocol) {
        gameUrl = window.location.href;
      } else {
        gameUrl = window.location.origin + window.location.pathname + window.location.search + window.location.hash;
      }
    }
    
    const urlDisplay = document.getElementById('qrUrlDisplay');
    if (urlDisplay) urlDisplay.textContent = gameUrl;
    
    try {
      QRCode.toCanvas(canvas, gameUrl, {
        width: 200,
        margin: 2,
        color: {
          dark: '#0a0a1a',
          light: '#ffffff'
        },
        errorCorrectionLevel: 'H'
      }, (error) => {
        if (error) {
          console.error('QR Code generation error:', error);
          this.showToast('二维码生成失败');
        }
      });
    } catch (e) {
      console.error('QR Code generation exception:', e);
      this.showToast('二维码生成失败');
    }
  }

  loadQRCodeLibrary(callback) {
    if (typeof QRCode !== 'undefined') {
      if (callback) callback();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/qrcode@1.5.0/build/qrcode.min.js';
    script.onload = () => {
      if (callback) callback();
    };
    script.onerror = () => {
      this.showToast('二维码库加载失败，请检查网络连接');
    };
    document.head.appendChild(script);
  }
  
  downloadQrCode() {
    const canvas = document.getElementById('qrCanvas');
    if (!canvas) return;
    
    const link = document.createElement('a');
    link.download = '雷霆战机-扫码分享.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    
    this.showToast('二维码已保存');
  }
  
  copyGameUrl() {
    const urlDisplay = document.getElementById('qrUrlDisplay');
    const url = urlDisplay ? urlDisplay.textContent : window.location.href;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        this.showToast('链接已复制到剪贴板');
      }).catch(() => {
        this.fallbackCopy(url);
      });
    } else {
      this.fallbackCopy(url);
    }
  }
  
  fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    this.showToast('链接已复制');
  }
  
  setupSound() {
    const btn = document.getElementById('soundToggle');
    btn.textContent = soundManager.enabled ? '🔊' : '🔇';
    btn.addEventListener('click', () => {
      soundManager.toggle();
      btn.textContent = soundManager.enabled ? '🔊' : '🔇';
      soundManager.play('click', { ...SOUND_CONFIGS.UI.click, isUI: true });
    });
  }
  
  showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.style.display = 'none');
    document.getElementById(screenId).style.display = 'flex';
  }
  
  showModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
    document.body.style.touchAction = 'auto';
  }
  
  hideModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    const openModals = document.querySelectorAll('.modal[style*="flex"]');
    if (openModals.length === 0) {
      document.body.style.touchAction = '';
    }
  }
  
  updateHUD() {
    document.getElementById('score').textContent = this.gameState.score;
    document.getElementById('level').textContent = `第${this.gameState.level}关`;
    document.getElementById('wave').textContent = `${this.gameState.wave}/${LEVEL_CONFIGS[Math.min(this.gameState.level - 1, LEVEL_CONFIGS.length - 1)]?.waves || 5}`;
    document.getElementById('coins').textContent = this.gameState.coins;
    document.getElementById('highScore').textContent = this.gameState.highScore;
    
    if (this.gameState.player) {
      const hpPercent = (this.gameState.player.hp / this.gameState.player.maxHp) * 100;
      const energyPercent = (this.gameState.player.ultimateCharge / this.gameState.player.maxEnergy) * 100;
      
      document.getElementById('healthBar').style.width = `${hpPercent}%`;
      document.getElementById('energyBar').style.width = `${energyPercent}%`;
      const player = this.gameState.player;
      const level = player.weaponLevel;
      const killCount = player.killCount;
      const thresholds = player.KILL_THRESHOLDS;
      
      const el = document.getElementById('weaponLevel');
      if (level < 4) {
        const prev = thresholds[level - 1];
        const next = thresholds[level];
        const progress = Math.min(1, (killCount - prev) / (next - prev));
        const filled = Math.round(progress * 10);
        const empty = 10 - filled;
        el.textContent = `Lv.${level} ${'█'.repeat(filled)}${'░'.repeat(empty)}`;
      } else {
        el.textContent = 'Lv.MAX ★★★★★';
      }
      
      if (document.getElementById('healthOverlay')) {
        document.getElementById('healthOverlay').style.width = `${100 - hpPercent}%`;
      }
      
      if (hpPercent < (this._lastHp || 100)) {
        const healthTrack = document.getElementById('healthBar')?.parentElement;
        if (healthTrack) {
          healthTrack.classList.add('damaging');
          clearTimeout(this._hpFlashTimer);
          this._hpFlashTimer = setTimeout(() => {
            healthTrack.classList.remove('damaging');
          }, 400);
        }
      }
      this._lastHp = hpPercent;
      
      const energyTrack = document.getElementById('energyBar')?.parentElement;
      if (energyTrack) {
        if (player.ultimateReady) {
          energyTrack.classList.add('full');
        } else {
          energyTrack.classList.remove('full');
        }
        if (player.ultimateActive) {
          energyTrack.classList.add('active');
        } else {
          energyTrack.classList.remove('active');
        }
      }
      
      let shieldContainer = document.getElementById('shieldContainer');
      if (!shieldContainer) {
        const div = document.createElement('div');
        div.id = 'shieldContainer';
        div.className = 'hud-bar shield-bar';
        div.innerHTML = '<span class="bar-label">护盾</span><div class="bar-track"><div class="bar-fill" id="shieldBar"></div></div>';
        const weaponEl = document.getElementById('weaponLevel')?.parentElement;
        if (weaponEl) {
          document.getElementById('hud').insertBefore(div, weaponEl);
        } else {
          document.getElementById('hud').appendChild(div);
        }
        shieldContainer = div;
      }
      shieldContainer.style.display = 'flex';
      const shieldPercent = (player.shieldHp / player.maxShield) * 100;
      document.getElementById('shieldBar').style.width = `${shieldPercent}%`;
      
      let slowEl = document.getElementById('slowIndicator');
      if (!slowEl) {
        slowEl = document.createElement('div');
        slowEl.id = 'slowIndicator';
        slowEl.className = 'hud-status slow';
        slowEl.textContent = '⏱ SLOW';
        document.getElementById('hud').appendChild(slowEl);
      }
      slowEl.style.display = player.slowTimeActive ? 'flex' : 'none';
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
            this.showToast(`解锁成功！${plane.name}`);
            this.updateShopUI();
            this.updateMenuCoins();
            soundManager.play('newPlane', SOUND_CONFIGS.SPECIAL.newPlane);
          } else {
            this.showToast('金币不足！');
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
      const gameInfo = document.getElementById('gameInfo');
      const infoHeight = gameInfo ? gameInfo.offsetHeight + 20 : 80;
      const controlsArea = window.innerWidth < 768 && window.matchMedia('(pointer: coarse)').matches ? 220 : 40;
      const hudHeight = 50;
      height = Math.min(window.innerHeight - infoHeight - controlsArea - hudHeight, 360);
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
      if (this.gameState.bossWarningTimer > 0) {
        this.gameState.bossWarningTimer -= dt;
      }
      this.gameState.update(dt, currentTime, this.canvas.width, this.canvas.height);
      
      if (this.gameState.status === 'GAME_OVER') {
        this.showGameOver();
      }
    }
    
    this.uiManager.updateHUD();
    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    if (this.gameState.status === 'PLAYING' || this.gameState.status === 'PAUSED') {
      this.ctx.save();
      
      if (this.gameState.shakeDuration > 0) {
        const intensity = this.gameState.shakeIntensity * (this.gameState.shakeDuration / 300);
        const sx = (Math.random() - 0.5) * intensity * 2;
        const sy = (Math.random() - 0.5) * intensity * 2;
        this.ctx.translate(sx, sy);
      }
      
      this.gameState.draw(this.ctx, this.canvas.width, this.canvas.height);
      
      this.ctx.restore();
      
      if (this.gameState.status === 'PAUSED') {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.save();
        this.ctx.shadowColor = '#66ddff';
        this.ctx.shadowBlur = 20;
        this.ctx.fillStyle = '#66ddff';
        this.ctx.font = 'bold 42px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('∥  PAUSED  ∥', this.canvas.width / 2, this.canvas.height / 2 - 50);
        this.ctx.restore();
        
        this.ctx.fillStyle = 'rgba(255,255,255,0.7)';
        this.ctx.font = '16px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('点击继续按钮恢复游戏  |  ESC/返回键回到主菜单', this.canvas.width / 2, this.canvas.height / 2 + 20);
      }
    }
    
    this.animationId = requestAnimationFrame(() => this.gameLoop());
  }
  
  showGameOver() {
    document.getElementById('finalScore').textContent = `最终得分: ${this.gameState.score}`;
    document.getElementById('coinsEarned').textContent = `获得金币: ${this.gameState.coins}`;
    this.uiManager.showScreen('gameOverScreen');
  }
}

class SoundManager {
  constructor() {
    this.audioContext = null;
    this.masterGain = null;
    this.sfxGain = null;
    this.uiGain = null;
    this.enabled = true;
    this.masterVolume = 0.5;
    this.sfxVolume = 0.7;
    this.uiVolume = 0.5;
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

const gameEngine = new GameEngine();
gameEngine.start();