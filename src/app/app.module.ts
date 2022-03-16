import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomePageComponent } from './home-page/home-page.component';
import { FooterComponent } from './component/footer/footer.component';
import { GamePageComponent } from './game-page/game-page.component';
import { AnswersComponent } from './game-page/answers/answers.component';
import { AnswerCardComponent } from './game-page/answers/answer-card/answer-card.component';
import { PlayersComponent } from './game-page/players/players.component';
import { PlayerCardComponent } from './game-page/players/player-card/player-card.component';
import { QuestionsComponent } from './game-page/questions/questions.component';
import { UnderconstructionPageComponent } from './underconstruction-page/underconstruction-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    FooterComponent,
    GamePageComponent,
    AnswersComponent,
    AnswerCardComponent,
    PlayersComponent,
    PlayerCardComponent,
    QuestionsComponent,
    UnderconstructionPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
