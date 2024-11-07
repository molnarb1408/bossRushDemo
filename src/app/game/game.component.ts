import { Component} from '@angular/core';
import { MapsComponent } from '../maps/maps.component';
import { HeroComponent } from '../characters/hero/hero.component';
import { KatarinaComponent } from '../characters/katarina/katarina.component';
import { LucyComponent } from '../characters/lucy/lucy.component';

@Component({
  selector: 'app-game',
  standalone: true,
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
  imports: [HeroComponent, KatarinaComponent, LucyComponent, MapsComponent]
})

export class GameComponent {}