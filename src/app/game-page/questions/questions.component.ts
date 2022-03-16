import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil, Subject } from 'rxjs';
import { QuestionModel } from '../shared/question.model';

import { GameService } from './../../core/game.service';
@Component({
  selector: 'gpage-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit, OnDestroy {
  public currentIndexQuestion: number = -1;
  public isHoverOnListQuestion: boolean = false;
  public numberOfQuestionPlayed: number = 0;
  public questions: QuestionModel[] = [];

  private readonly destroy$ = new Subject<boolean>();

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.questionsObservable$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.questions = data;
        for (let i = 0; i < this.questions.length; i++) {
          if (this.questions[i].isPlaying) {
            this.currentIndexQuestion = i;
            break;
          }
        }

        setTimeout(() => {
          if (this.currentIndexQuestion != -1) {
            const questionLiHTML = document.getElementById(
              'id-question-' + this.currentIndexQuestion
            );

            const scrollQuestion = document.getElementById(
              'question-area-content-parent-ul'
            );
            if (questionLiHTML != null && scrollQuestion != null) {
              if (questionLiHTML.offsetTop > scrollQuestion.offsetHeight) {
                scrollQuestion.scrollTop =
                  questionLiHTML.offsetTop - questionLiHTML.offsetHeight * 3;
              }
            }
          }
        }, 0);
      });
    this.gameService.questionsPlayed$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.numberOfQuestionPlayed = data.length;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
