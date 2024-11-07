import { Injectable } from '@angular/core';
import { Character } from '../../assets/interface/character.model';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  ////////// DEPENDENCIES ////////////
  private hero: Character;
  private target!: Character;

  ////////// OBJECT ////////////
  constructor() {
    this.hero = {
      name: 'Hero',
      maxHp: 8000,
      currentHp: 8000,
      maxEnergy: 100,
      currentEnergy: 100,
      energyRecharge: 9,
      baseDamage: 980,
      minDamageMultiplier: 1.0,
      maxDamageMultiplier: 2.3,
      defendMultiplier: 0.6,
      isDefending: false,
      isTurnActive: true,
      currentTarget: this.target,
      getHpPercentage(): number {
        return (this.currentHp / this.maxHp) * 100;
      },
      getEnergyPercentage(): number {
        return (this.currentEnergy / this.maxEnergy) * 100;
      }
    };
  }

  getHero(): Character {
    return this.hero;
  }

  setTarget(target: Character): void {
    this.hero.currentTarget = target;
  }

  updateHero(updatedHero: Character): void {
    this.hero = updatedHero;
  }
}
