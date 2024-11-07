import { Component } from '@angular/core';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [],
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.css'
})
export class MapsComponent {
   ////////// DEPENDENCIES ////////////
   backgroundImagePath: string = '';

   constructor(public gameService: GameService,) { }
 
   ngOnInit(): void {
     // image-load
     this.gameService.jsonService.loadConfig();
     this.backgroundImagePath = this.gameService.jsonService.backgroundImages['backgroundImagePath'];
   }

}
