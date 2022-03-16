import { SocketService } from './../../core/socket.service';
import { QuestionModel } from './../shared/question.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

import { GameService } from './../../core/game.service';
import { AnswerModel } from './../shared/answer.model';

@Component({
  selector: 'gpage-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss'],
  animations: [
    trigger('selectDiv', [
      state(
        'unselected',
        style({
          backgroundColor: 'transparent',
        })
      ),
      state(
        'selected',
        style({
          backgroundColor: '#4BE08F',
        })
      ),
      transition('selected=>unselected', [animate('0.2s')]),
      transition('unselected=>selected', [animate('0.1s')]),
    ]),
  ],
})
export class AnswersComponent implements OnInit, OnDestroy {
  public answers: AnswerModel[] = [];
  public currentQuestion?: QuestionModel;
  public indexSelected?: number;
  public isEditing = false;
  // public currentQuestion?: Question;

  private readonly destroy$ = new Subject<boolean>();
  constructor(
    private gameService: GameService,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    this.gameService.answersWithPlayers$
      .pipe(takeUntil(this.destroy$))
      .subscribe((answers) => {
        this.answers = answers;
      });

    this.gameService.questionIsPlaying$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.currentQuestion = data;
      });
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public onDeleteAnswer(index: number): void {
    // if (this.answers && this.answers.length != 0) {
    //   this.answers = [
    //     ...this.answers.slice(0, index),
    //     ...this.answers.slice(index + 1),
    //   ];
    // }
  }
  onSelectAnswer(index: number): void {
    if (this.answers && this.answers.length != 0) {
      this.indexSelected = index;
      this.gameService
        .changeAnswer(this.answers[index])
        .pipe(takeUntil(this.destroy$))
        .subscribe((data) => {
          console.log(data);
          this.socketService.changeAnswer(data.answer);
        });
    }
  }
}
