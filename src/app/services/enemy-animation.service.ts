import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { JsonService } from './json.service';


@Injectable({
  providedIn: 'root'
})
export class EnemyAnimationService {
  ////////// LOAD-PATH.json ////////////
  constructor(private jsonService: JsonService) {  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////// KATARINA ANIMATIONS ///////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  ////////// DEPENDENCIES ////////////
  private katarinaImagePath: string = '';
  private katarinaDefImagePath: string = '';
  private katarinaEnergyImagePath: string = '';
  private katarinaAttackImagePath: string = '';

  ////////// ANIMATION-SPEED ////////////
  public katarinaAA: number = 900;
  public katarinaDA: number = 1000;
  public katarinaERA: number = 1600;

  ////////// ATTACK ////////////
  public katarinaAttackAnimation() {
    let enemyImg = document.getElementById('enemyImg') as HTMLImageElement;
    enemyImg.style.transition = '';
    enemyImg.src = this.jsonService.katarinaImages['katarinaAttackImagePath'];
    enemyImg.classList.add('attack-animation');

    setTimeout(() => {
      enemyImg.classList.remove('attack-animation');
      enemyImg.src = this.jsonService.katarinaImages['katarinaImagePath'];
    }, this.katarinaAA);
    enemyImg.style.transition = '';
  }

  ////////// DEFFEND ////////////
  public katarinaDeffendAnimation() {
    let enemyImg = document.getElementById('enemyImg') as HTMLImageElement;
    enemyImg.style.transition = '';
    enemyImg.src = this.jsonService.katarinaImages['katarinaDefImagePath'];
    enemyImg.classList.add('defend-animation');

    setTimeout(() => {
      enemyImg.classList.remove('defend-animation');
      enemyImg.src = this.jsonService.katarinaImages['katarinaImagePath'];
    }, this.katarinaDA);
    enemyImg.style.transition = '';
  }

  ////////// ENERGY-RE ////////////
  public katarinaEnergyRechargeAnimation() {
    let enemyImg = document.getElementById('enemyImg') as HTMLImageElement;
    enemyImg.style.transition = '';
    enemyImg.src = this.jsonService.katarinaImages['katarinaEnergyImagePath'];
    enemyImg.classList.add('energy-recharge-animation');

    setTimeout(() => {
      enemyImg.classList.remove('energy-recharge-animation');
      enemyImg.src = this.jsonService.katarinaImages['katarinaImagePath'];
    }, this.katarinaERA);
    enemyImg.style.transition = '';
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////// LUCY ANIMATIONS ///////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  ////////// DEPENDENCIES ////////////
  private lucyImagePath: string = '';
  private lucyDefImagePath: string = '';
  private lucyEnergyImagePath: string = '';
  private lucyAttackImagePath: string = '';

  ////////// ANIMATION-SPEED ////////////
  public lucyAA: number = 1900;
  public lucyDA: number = 900;
  public lucyERA: number = 1000;

  ////////// ATTACK ////////////
  public lucyAttackAnimation() {
    let enemyImg = document.getElementById('enemyImg') as HTMLImageElement;
    enemyImg.style.transition = '';
    enemyImg.src = this.jsonService.lucyImages['lucyAttackImagePath'];
    enemyImg.classList.add('attack-animation');

    setTimeout(() => {
      enemyImg.classList.remove('attack-animation');
      enemyImg.src = this.jsonService.lucyImages['lucyImagePath'];
    }, this.lucyAA);
    enemyImg.style.transition = '';
  }

  ////////// DEFFEND ////////////
  public lucyDeffendAnimation() {
    let enemyImg = document.getElementById('enemyImg') as HTMLImageElement;
    enemyImg.style.transition = '';
    enemyImg.src = this.jsonService.lucyImages['lucyDefImagePath'];
    enemyImg.classList.add('defend-animation');

    setTimeout(() => {
      enemyImg.classList.remove('defend-animation');
      enemyImg.src = this.jsonService.lucyImages['lucyImagePath'];
    }, this.lucyDA);
    enemyImg.style.transition = '';
  }

  ////////// ENERGY-RE ////////////
  public lucyEnergyRechargeAnimation() {
    let enemyImg = document.getElementById('enemyImg') as HTMLImageElement;
    enemyImg.style.transition = '';
    enemyImg.src = this.jsonService.lucyImages['lucyEnergyImagePath'];
    enemyImg.classList.add('energy-recharge-animation');

    setTimeout(() => {
      enemyImg.classList.remove('energy-recharge-animation');
      enemyImg.src = this.jsonService.lucyImages['lucyImagePath'];
    }, this.lucyERA);
    enemyImg.style.transition = '';
  }


}
