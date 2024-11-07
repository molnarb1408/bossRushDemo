import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { JsonService } from './json.service';

@Injectable({
  providedIn: 'root'
})
export class HeroAnimationService {
  ////////// DEPENDENCIES ////////////
  public heroImagePath: string = '';
  public heroDefImagePath: string = '';
  public heroEnergyImagePath: string = '';
  public heroAttackImagePath: string = '';
  public defendImagePath: string = '';

  ////////// ANIMATION-SPEED ////////////
  public attackAnimation: number = 2000;
  public defAnimation: number = 1200;
  public energyReAnimation: number = 1900;

  constructor(private jsonService: JsonService) {}

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////// SKILLS - ANIMATION //////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////

  /////////// Attack anim ///////////////////////////////////////////////////////////////////////////////
  public charAttackAnimation(): void {
    let charImg = document.getElementById('charImg') as HTMLImageElement;
    charImg.classList.add('attack-animation');
    charImg.src = this.jsonService.heroImages['heroAttackImagePath'];

    setTimeout(() => {
      charImg.classList.remove('attack-animation');
      charImg.src = this.jsonService.heroImages['heroImagePath'];
    }, this.attackAnimation);
  }

  public charDefendAnimation(): void {
    let charImg = document.getElementById('charImg') as HTMLImageElement;
    charImg.classList.add('defend-animation');
    charImg.src = this.jsonService.heroImages['heroDefImagePath'];

    setTimeout(() => {
      charImg.classList.remove('defend-animation');
      charImg.src = this.jsonService.heroImages['heroImagePath'];
    }, this.defAnimation);
  }

  public charEnergyRechargeAnimation(): void {
    let charImg = document.getElementById('charImg') as HTMLImageElement;
    charImg.classList.add('energy-recharge-animation');
    charImg.src =this.jsonService.heroImages['heroEnergyImagePath'];

    setTimeout(() => {
      charImg.classList.remove('energy-recharge-animation');
      charImg.src =this.jsonService.heroImages['heroImagePath'];
    }, this.energyReAnimation);
  }

}
