import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Character } from '../../../assets/interface/character.model';
import { HeroService } from '../../services/hero.service';
import { HeroAnimationService } from '../../services/hero-animation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements OnInit {
  ////////// DEPENDENCIES ////////////
  public hero!: Character;

  constructor(
    public GS: GameService,
    public HS: HeroService,
    public AS: HeroAnimationService,
  ) { }

  ngOnInit(): void {
    this.hero = this.HS.getHero();
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////// SKILLS ///////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////
  public attack(): void {
    const target: Character = this.hero.currentTarget;

    if (this.hero.currentEnergy >= 25) {
      this.hero.isTurnActive = false;

      this.AS.charAttackAnimation();

      setTimeout(() => {
        const damageMultiplier = Math.random() * (this.hero.maxDamageMultiplier - this.hero.minDamageMultiplier) + this.hero.minDamageMultiplier;
        let damage = damageMultiplier * this.hero.baseDamage;

        if (target.isDefending) {
          damage *= (1 - target.defendMultiplier);
          target.isDefending = false;
        }
        const actualDamage = Math.round(damage);
        this.GS.applyDamage(target, actualDamage, 'FloatingCombatTextEnemy');
        this.hero.currentEnergy -= 25;

        this.GS.logEvent(`${this.hero.name} attacked ${target.name} for ${actualDamage} damage.`);
      }, this.AS.attackAnimation);

      setTimeout(() => {
        this.GS.endHeroTurn();
      }, 1000 + this.AS.attackAnimation);

    } else {
      this.GS.logEvent(`${this.hero.name} cannot attack this turn.`);
    }
  }


  public defend(): void {
    if (this.hero.currentEnergy >= 25) {
      this.hero.isTurnActive = false;

      const defendBtn = document.getElementById('defendBtn') as HTMLButtonElement;
      if (defendBtn) {
        defendBtn.disabled = true;
      }

      this.AS.charDefendAnimation();

      setTimeout(() => {
        this.hero.isDefending = true;
        this.hero.currentEnergy -= 25;

        this.GS.logEvent(`${this.hero.name} is defending this turn.`);
        this.GS.endHeroTurn();
      }, this.AS.defAnimation);
    } else {
      this.GS.logEvent(`${this.hero.name} cannot defend this turn.`);
    }
  }

  public rechargeEnergy(): void {
    this.hero.isTurnActive = false;
    this.AS.charEnergyRechargeAnimation();

    setTimeout(() => {
      this.hero.currentEnergy = 100;
      this.GS.logEvent(`${this.hero.name} recharged energy.`);
      this.GS.endHeroTurn();
    }, this.AS.energyReAnimation);
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////// SKILLS - TOOLTIP ////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////

  private toggleTooltipDisplay(tooltipId: string, display: string) {
    const tooltipElement = document.getElementById(tooltipId);
    if (tooltipElement) {
      tooltipElement.style.display = display;
    }
  }

  /////////// Attack tooltip ///////////////////////////////////////////////////////////////////////////////
  public tooltipAttackBtnHide() {
    this.toggleTooltipDisplay('tooltipAttack', 'none');
  }

  public tooltipAttackBtn() {
    const { baseDamage, minDamageMultiplier, maxDamageMultiplier, currentTarget } = this.hero;
    const tooltipForAttack = document.getElementById('tooltipAttack') as HTMLElement;

    const minDamage = Math.round(baseDamage * minDamageMultiplier);
    const maxDamage = Math.round(baseDamage * maxDamageMultiplier);
    const minDamageDefend = Math.round(minDamage * (1 - currentTarget.defendMultiplier));
    const maxDamageDefend = Math.round(maxDamage * (1 - currentTarget.defendMultiplier));

    tooltipForAttack.innerHTML = `Launch a devastating attack!<br><br>Deals: ${minDamage} - ${maxDamage} Damage<br>Deals: ${minDamageDefend} - ${maxDamageDefend} Damage blocked<br>`;
    this.toggleTooltipDisplay('tooltipAttack', 'block');
  }

  /////////// Defend ///////////////////////////////////////////////////////////////////////////////

  public tooltipDefendBtnHide() {
    this.toggleTooltipDisplay('tooltipDefend', 'none');
  }

  public tooltipDefendBtn() {
    const tooltipForDefend = document.getElementById('tooltipDefend') as HTMLElement;
    const defPercent = Math.round(100 * this.hero.defendMultiplier);

    tooltipForDefend.innerHTML = `Defend yourself!<br><br>Reduce incoming damage by: ${defPercent} %<br>`;
    this.toggleTooltipDisplay('tooltipDefend', 'block');
  }

  /////////// Energy ///////////////////////////////////////////////////////////////////////////////

  public tooltipEnergyBtnHide() {
    this.toggleTooltipDisplay('tooltipEnergy', 'none');
  }

  public tooltipEnergyBtn() {
    const tooltipForEnergy = document.getElementById('tooltipEnergy') as HTMLElement;
    const restoreEnergy = this.hero.maxEnergy;

    tooltipForEnergy.innerHTML = `Restore energy!<br><br>Restoration: ${restoreEnergy} %<br>`;
    this.toggleTooltipDisplay('tooltipEnergy', 'block');
  }
}
