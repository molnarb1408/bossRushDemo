import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class JsonService {
  public heroImages: any = {};
  public katarinaImages: any = {};
  public lucyImages: any = {};
  public backgroundImages: any = {};
  public effectImages: any = {};

  constructor() {
    this.loadConfig();
  }

  loadConfig(): void {
    this.getConfig().subscribe(config => {
      // Background
      this.backgroundImages = config.backgroundImages[0];

      // Effects
      this.effectImages = config.effectImages[0];

      // Hero
      this.heroImages = config.heroImages[0];

      // Katarina
      this.katarinaImages = config.katarinaImages[0];

      // Lucy
      this.lucyImages = config.lucyImages[0];
    });
  }

  getConfig(): Observable<any> {
    return of(require('../../assets/json/path.json'));
  }
}



