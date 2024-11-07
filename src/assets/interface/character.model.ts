export interface Character {
    name: string;
    maxHp: number;
    currentHp: number;
    maxEnergy: number;
    currentEnergy: number;
    energyRecharge: number;
    baseDamage: number;
    minDamageMultiplier: number;
    maxDamageMultiplier: number;
    defendMultiplier: number;
    isDefending: boolean;
    isTurnActive: boolean;
    currentTarget: Character;
  
    getHpPercentage(): number;
    getEnergyPercentage(): number;
  }
  