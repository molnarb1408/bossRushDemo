import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Character } from '../../../assets/interface/character.model';
import { GameService } from '../../services/game.service';
import { LucyService } from '../../services/lucy.service';
import { EnemyAnimationService } from '../../services/enemy-animation.service';

@Component({
  selector: 'app-lucy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lucy.component.html',
  styleUrl: './lucy.component.css'
})
export class LucyComponent {
  ////////// DEPENDENCIES ////////////
  public lucy!: Character;
  private isHeroTurnActive: boolean = false;
  private unsubscribe$ = new Subject<void>();

  ////////// CONSTRUCTOR ////////////
  constructor(
    public GS: GameService,
    private LS: LucyService,
    private AS: EnemyAnimationService,
  ) { }


  ngOnInit(): void {
    this.GS.isHeroTurnActive$.pipe(takeUntil(this.unsubscribe$)).subscribe((isActive: boolean) => {
      this.isHeroTurnActive = isActive;
      if (isActive) {
        this.enemyAction();
      }
    });

    this.lucy = this.LS.getLucy();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////// AI ///////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////

  private enemyAction(): void {
    if (this.lucy.currentEnergy < 25) {
      this.rechargeEnergy();
    } else {
      let randomChoice = Math.random();
      if (randomChoice < 0.5) {
        this.attack();
      } else {
        if (this.lucy.currentEnergy < 50) {
          let randomChoice = Math.random();
          if (randomChoice < 0.5) {
            this.rechargeEnergy();
          } else {
            if (this.lucy.isDefending) {
              this.attack();
            } else {
              this.defend();
            }
          }
        } else {
          if (this.lucy.isDefending) {
            this.attack();
          } else {
            this.defend();
          }
        }
      }
    }
    setTimeout(() => { this.GS.endEnemyTurn(); }, this.AS.lucyAA);
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////// SKILLS ///////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////

  private attack() {
    if (this.lucy.currentEnergy >= 25) {
      this.AS.lucyAttackAnimation();
      setTimeout(() => {
        const damageMultiplier = Math.random() * (this.lucy.maxDamageMultiplier - this.lucy.minDamageMultiplier) + this.lucy.minDamageMultiplier;
        let damage = (damageMultiplier * this.lucy.baseDamage);
        if (this.lucy.currentTarget.isDefending) {
          damage *= (1 - this.lucy.currentTarget.defendMultiplier);
          this.lucy.currentTarget.isDefending = false;
        }

        this.GS.applyDamage(this.LS.getLucy().currentTarget, Number(damage.toFixed(0)), 'FloatingCombatTextHero');

        this.lucy.currentTarget.currentHp = Math.max(0, this.lucy.currentTarget.currentHp); // Biztosítja, hogy HP ne legyen negatív
        this.lucy.currentEnergy -= 25;
        this.GS.logEvent(`${this.lucy.name} attacked ${this.lucy.currentTarget.name} for ${damage.toFixed(0)} damage.`);
      }, this.AS.lucyAA);
    } else {
      this.rechargeEnergy();
    }
  }

  private defend(): void {
    if (this.lucy.currentEnergy >= 25) {
      this.AS.lucyDeffendAnimation();
      setTimeout(() => {
        this.lucy.isDefending = true;
        this.lucy.currentEnergy -= 25;
        this.GS.logEvent(`${this.lucy.name} is defending this turn.`);
      }, this.AS.lucyDA);
    } else {
      this.rechargeEnergy();
    }
  }

  private rechargeEnergy() {
    this.AS.lucyEnergyRechargeAnimation();
    setTimeout(() => {
      this.lucy.currentEnergy = 100;
      this.GS.logEvent(`${this.lucy.name} recharged energy.`);
    }, this.AS.lucyERA);
  }
}
