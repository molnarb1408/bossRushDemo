import { Injectable } from '@angular/core';
import { Character } from '../../assets/interface/character.model';
import { HeroService } from './hero.service';

@Injectable({
  providedIn: 'root'
})
export class LucyService {
 ////////// DEPENDENCIES ////////////
 private lucy: Character;

 ////////// OBJECT ////////////
 constructor(
   private heroService: HeroService,
 ) {
   this.lucy = {
     name: 'Lucy',
     maxHp: 12000,
     currentHp: 12000,
     maxEnergy: 100,
     currentEnergy: 100,
     energyRecharge: 5,
     baseDamage: 880,
     minDamageMultiplier: 1.0,
     maxDamageMultiplier: 2.4,
     defendMultiplier: 0.4,
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
   this.heroService.setTarget(this.lucy);
 }

 getLucy(): Character {
   return this.lucy;
 }

 updateLucy(updatedLucy: Character): void {
   this.lucy = updatedLucy;
 }
}
