import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Character } from '../../../assets/interface/character.model';
import { GameService } from '../../services/game.service';
import { KatarinaService } from '../../services/katarina.service';
import { EnemyAnimationService } from '../../services/enemy-animation.service';

@Component({
  selector: 'app-katarina',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './katarina.component.html',
  styleUrl: './katarina.component.css'
})
export class KatarinaComponent {
  ////////// DEPENDENCIES ////////////
  public katarina!: Character;
  private isHeroTurnActive: boolean = false;
  private unsubscribe$ = new Subject<void>();

  ////////// CONSTRUCTOR ////////////
  constructor(
    public GS: GameService,
    private KS: KatarinaService,
    private AS: EnemyAnimationService,
  ) { }


  ngOnInit(): void {
    this.GS.isHeroTurnActive$.pipe(takeUntil(this.unsubscribe$)).subscribe((isActive: boolean) => {
      this.isHeroTurnActive = isActive;
      if (isActive) {
        this.enemyAction();
      }
    });

    this.katarina = this.KS.getKatarina();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////// AI ///////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////

  private enemyAction(): void {
    if (this.katarina.currentEnergy < 25) {
      this.rechargeEnergy();
    } else {
      let randomChoice = Math.random();
      if (randomChoice < 0.5) {
        this.attack();
      } else {
        if (this.katarina.currentEnergy < 50) {
          let randomChoice = Math.random();
          if (randomChoice < 0.5) {
            this.rechargeEnergy();
          } else {
            if (this.katarina.isDefending) {
              this.attack();
            } else {
              this.defend();
            }
          }
        } else {
          if (this.katarina.isDefending) {
            this.attack();
          } else {
            this.defend();
          }
        }
      }
    }
    setTimeout(() => { this.GS.endEnemyTurn(); }, this.AS.katarinaAA);
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////// SKILLS ///////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////

  private attack() {
    if (this.katarina.currentEnergy >= 25) {
      this.AS.katarinaAttackAnimation();
      setTimeout(() => {
        const damageMultiplier = Math.random() * (this.katarina.maxDamageMultiplier - this.katarina.minDamageMultiplier) + this.katarina.minDamageMultiplier;
        let damage = (damageMultiplier * this.katarina.baseDamage);
        if (this.katarina.currentTarget.isDefending) {
          damage *= (1 - this.katarina.currentTarget.defendMultiplier);
          this.katarina.currentTarget.isDefending = false;
        }
        
        this.GS.applyDamage(this.KS.getKatarina().currentTarget, Number(damage.toFixed(0)), 'FloatingCombatTextHero');

        this.katarina.currentTarget.currentHp = Math.max(0, this.katarina.currentTarget.currentHp); // Biztosítja, hogy HP ne legyen negatív
        this.katarina.currentEnergy -= 25;
        this.GS.logEvent(`${this.katarina.name} attacked ${this.katarina.currentTarget.name} for ${damage.toFixed(0)} damage.`);
      }, this.AS.katarinaAA);
    } else {
      this.rechargeEnergy();
    }
  }

  private defend(): void {
    if (this.katarina.currentEnergy >= 25) {
      this.AS.katarinaDeffendAnimation();
      setTimeout(() => {
        this.katarina.isDefending = true;
        this.katarina.currentEnergy -= 25;
        this.GS.logEvent(`${this.katarina.name} is defending this turn.`);
      }, this.AS.katarinaDA);
    } else {
      this.rechargeEnergy();
    }
  }

  private rechargeEnergy() {
    this.AS.katarinaEnergyRechargeAnimation();
    setTimeout(() => {
      this.katarina.currentEnergy = 100;
      this.GS.logEvent(`${this.katarina.name} recharged energy.`);
    }, this.AS.katarinaERA);
  }
}