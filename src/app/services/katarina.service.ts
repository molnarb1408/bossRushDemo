import { Injectable } from '@angular/core';
import { Character } from '../../assets/interface/character.model';
import { HeroService } from './hero.service';


@Injectable({
  providedIn: 'root'
})
export class KatarinaService {
  ////////// DEPENDENCIES ////////////
  private katarina: Character;

  ////////// OBJECT ////////////
  constructor(
    private heroService: HeroService,
  ) {
    this.katarina = {
      name: 'Katarina',
      maxHp: 8000,
      currentHp: 8000,
      maxEnergy: 100,
      currentEnergy: 100,
      energyRecharge: 5,
      baseDamage: 680,
      minDamageMultiplier: 1.0,
      maxDamageMultiplier: 3.7,
      defendMultiplier: 0.6,
      isDefending: false,
      isTurnActive: false,
      currentTarget: this.heroService.getHero(),
      getHpPercentage: function () {
        return (this.currentHp / this.maxHp) * 100;
      },
      getEnergyPercentage: function () {
        return (this.currentEnergy / this.maxEnergy) * 100;
      },
    };
    this.setHeroTarget();
  }
  private setHeroTarget(): void {
    this.heroService.setTarget(this.katarina);
  }

  getKatarina(): Character {
    return this.katarina;
  }

  updateKatarina(updatedKatarina: Character): void {
    this.katarina = updatedKatarina;
  }
}
