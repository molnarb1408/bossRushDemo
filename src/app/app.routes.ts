import { Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
    {path: 'game', component: GameComponent},
    {path: 'about', component: AboutComponent},
];
