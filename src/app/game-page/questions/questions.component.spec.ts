import { GameService } from './../../core/game.service';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsComponent } from './questions.component';
import { By } from '@angular/platform-browser';

describe('QuestionsComponent', () => {
  let component: QuestionsComponent;
  let fixture: ComponentFixture<QuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionsComponent],
      imports: [HttpClientModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should get list questions from game QuestionsComponent', () => {
    let gameSerice = fixture.debugElement.injector.get(GameService);
    fixture.detectChanges();
    gameSerice.questionsObservable$.subscribe((data) => {
      expect(data).toEqual(component.questions);
    });
  });
  it('should get len of questions which have played from game QuestionsComponent', () => {
    let gameService = fixture.debugElement.injector.get(GameService);
    fixture.detectChanges();
    gameService.questionsPlayed$.subscribe((data) => {
      expect(data.length).toEqual(component.numberOfQuestionPlayed);
    });
  });

  it('should highlight current question', () => {
    const current = component.currentIndexQuestion;
    if (current != -1) {
      let currentQuestionHTML = fixture.debugElement.query(
        By.css('#id-question-' + current)
      ).nativeElement;

      expect(currentQuestionHTML).toHaveClass('li-playing');
    }
  });
});
