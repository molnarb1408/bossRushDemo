import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Character } from '../../assets/interface/character.model';
import { JsonService } from './json.service';
import { HeroService } from './hero.service';


@Injectable({
  providedIn: 'root'
})
export class GameService {
  ////////// DEPENDENCIES ////////////
  private isHeroTurnActiveSubject: Subject<boolean> = new Subject<boolean>();
  public isHeroTurnActive$ = this.isHeroTurnActiveSubject.asObservable();
  public hero = this.heroService.getHero();
  private previousHp: number;
  public previousEnemyHp: number = 0;

  constructor(
    private heroService: HeroService,
    public jsonService: JsonService,
  ) {
    this.previousHp = this.hero.currentHp;
  }

  ////////// LOG-EVENT ////////////

  public logEvent(event: string): void {
    const eventLog = document.getElementById('eventLog') as HTMLInputElement;
    const newEvent = document.createElement('p');
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    const timestamp = `[${hours}:${minutes}]`;
    newEvent.textContent = `${timestamp} ${event}`;
    eventLog.appendChild(newEvent);

    eventLog.scrollTop = eventLog.scrollHeight;    // Görgetés az eventLog aljára
  }

  ////////// GAME-PROGRESSING ////////////

  public endEnemyTurn() {
    if (this.hero.currentHp != 0) {
      this.hero.currentTarget.isTurnActive = false;
      this.hero.isTurnActive = true;
      this.automaticEnergyRechargePerTurn(this.hero);
    } else {
      this.loseGame();
    }
  }

  public endHeroTurn() {
    if (this.hero.currentTarget.currentHp != 0) {
      this.hero.currentTarget.isTurnActive = true;
      this.automaticEnergyRechargePerTurn(this.hero.currentTarget);
      this.isHeroTurnActiveSubject.next(true);
    } else {
      this.winGame();
    }
  }
  public winGame(): void {
    this.logEvent('Game Over, You win!');
    const enemyName = this.heroService.getHero().currentTarget.name.toLowerCase();
    const enemyDefeatedImagePath = this.jsonService[`${enemyName}Images` as keyof JsonService][`${enemyName}DefeatedImagePath`];
    let enemyImg = document.getElementById('enemyImg') as HTMLImageElement;
    enemyImg.style.transition = '';
    enemyImg.style.margin = '28% -26%';
    enemyImg.src = enemyDefeatedImagePath;
    let charImg = document.getElementById('charImg') as HTMLImageElement;
    charImg.style.transition = '';
    charImg.src = this.jsonService.heroImages['heroWinsImagePath'];
    charImg.style.margin = '-5% -35%';
    setTimeout(() => {
      charImg.src = this.jsonService.heroImages['heroWinsExtendImagePath'];
    }, 1200);
  }

  public loseGame(): void {
    this.logEvent('Game Over, You lose!');
    const enemyName = this.heroService.getHero().currentTarget.name.toLowerCase();
    const enemyWinsImagePath = this.jsonService[`${enemyName}Images` as keyof JsonService][`${enemyName}WinsImagePath`];
    const enemyWinsExtendImagePath = this.jsonService[`${enemyName}Images` as keyof JsonService][`${enemyName}WinsExtendImagePath`];
    let enemyImg = document.getElementById('enemyImg') as HTMLImageElement;
    enemyImg.style.transition = '';
    enemyImg.src = enemyWinsImagePath;
    setTimeout(() => {
      enemyImg.src = enemyWinsExtendImagePath;
    }, 1200);
    let charImg = document.getElementById('charImg') as HTMLImageElement;
    charImg.style.transition = '';
    charImg.src = this.jsonService.heroImages['heroWinsImagePath'];
    charImg.style.margin = '-5% -35%';
    charImg.classList.add('move-down');
    setTimeout(() => {
      charImg.src = this.jsonService.heroImages['heroWinsExtendImagePath'];
    }, 1200);
  }

  public resetGame(): void {
    location.reload();
  }

  //// DAMAGE-FLOATING TEXT AND DMG APPLICATION ////////////

  public applyDamage(character: Character, damage: number, textElementId: string): void {
    const currentHp = character.currentHp;
    const actualDamage = Math.min(damage, currentHp);  
    character.currentHp -= actualDamage;              
    this.displayDamageFloat(actualDamage, textElementId);
  }
  

  public displayDamageFloat(damage: number, textElementId: string): void {
    const floatingText = document.getElementById(textElementId) as HTMLElement;
    floatingText.innerText = `-${damage}`;
    floatingText.classList.add('animate');
    setTimeout(() => {
      floatingText.classList.remove('animate');
      floatingText.innerText = '';
    }, 1000); // ANIMATION TIME
  }

  public damageFloat(character: Character, previousHp: number, textElementId: string): void {
    const currentHp = character.currentHp;
    if (currentHp < previousHp) {
      const damage = previousHp - currentHp;
      this.displayDamageFloat(damage, textElementId);
    }
    previousHp = currentHp;  // Update previousHp after the calculation
  }

  // energyRecharge

  public automaticEnergyRechargePerTurn(focusedCharacter: Character) {
    if (focusedCharacter.currentEnergy < 100) {
      focusedCharacter.currentEnergy += focusedCharacter.energyRecharge;
      if (focusedCharacter.currentEnergy > 100) {
        focusedCharacter.currentEnergy = 100;
      }
    }
  }
}