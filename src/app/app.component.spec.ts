import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FooterComponent } from './component/footer/footer.component';
import { PlayerCardComponent } from './game-page/players/player-card/player-card.component';
import { AnswerCardComponent } from './game-page/answers/answer-card/answer-card.component';
import { AnswersComponent } from './game-page/answers/answers.component';
import { QuestionsComponent } from './game-page/questions/questions.component';
import { UnderconstructionPageComponent } from './underconstruction-page/underconstruction-page.component';
import { HomePageComponent } from './home-page/home-page.component';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        AppComponent,
        HomePageComponent,
        UnderconstructionPageComponent,
        QuestionsComponent,
        AnswersComponent,
        AnswerCardComponent,
        PlayerCardComponent,
        FooterComponent,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // it(`should have as title 'agile-deck-angular'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('agile-deck-angular');
  // });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.content span')?.textContent).toContain('agile-deck-angular app is running!');
  // });
});
