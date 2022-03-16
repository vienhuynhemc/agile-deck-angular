import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GamePageComponent } from './game-page/game-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { UnderconstructionPageComponent } from './underconstruction-page/underconstruction-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'home-page', pathMatch: 'full' },
  { path: 'home-page', component: HomePageComponent },

  { path: 'underconstruction-page', component: UnderconstructionPageComponent },
  { path: ':gameBoardCode', component: GamePageComponent },
  { path: '**', component: UnderconstructionPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
