import { AnswerCardComponent } from './answer-card/answer-card.component';
import { GameService } from './../../core/game.service';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AnswersComponent } from './answers.component';

describe('AnswersComponent', () => {
  let component: AnswersComponent;
  let fixture: ComponentFixture<AnswersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnswersComponent, AnswerCardComponent],
      imports: [HttpClientModule, BrowserAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get list answers from game service', () => {
    fixture = TestBed.createComponent(AnswersComponent);
    component = fixture.componentInstance;
    let gameSerice = fixture.debugElement.injector.get(GameService);
    fixture.detectChanges();
    gameSerice.answersWithPlayers$.subscribe((data) => {
      expect(data).toEqual(component.answers);
    });
  });

  it('should remove a answer when call deleteAnswer function', () => {
    fixture = TestBed.createComponent(AnswersComponent);
    component = fixture.componentInstance;

    let answers = component.answers;
    if (answers.length != 0) {
      let randIndex = Math.floor(Math.random() * answers.length);
      answers = [
        ...answers.slice(0, randIndex),
        ...answers.slice(randIndex + 1),
      ];
      component.onDeleteAnswer(randIndex);
      expect(answers).toEqual(component.answers);
    }
  });
});
