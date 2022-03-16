import { SocketService } from './../core/socket.service';
import { AgileDeckModel } from './shared/agile-deck.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, Subject } from 'rxjs';

import { GameService } from './../core/game.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss'],
})
export class GamePageComponent implements OnInit, OnDestroy {
  public codeGameBoard: string;
  public gameName: string = 'Iterative - Incremental - Big Bang';
  public myPlayerId: number = 0;

  private readonly destroy$ = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private socketService: SocketService
  ) {
    this.codeGameBoard =
      this.route.snapshot.paramMap.get('gameBoardCode') || '';
    this.gameService.setCodeGameBoard(this.codeGameBoard);
  }

  ngOnInit(): void {
    // const playerId: number = Number(
    //   localStorage.getItem(this.codeGameBoard + '_player')
    // );
    const playerId: number = Number(
      sessionStorage.getItem(this.codeGameBoard + '_player')
    );

    if (!playerId) {
      this.gameService
        .joinGame(this.codeGameBoard)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data) => {
          this.initData(data);
        });
    } else {
      this.gameService
        .reJoinGame(this.codeGameBoard, playerId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data) => {
          this.initData(data);
        });
    }

    this.socketService.evenObservable$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        switch (data) {
          case 'next-question':
            this.gameService
              .reJoinGame(
                this.codeGameBoard,
                this.gameService.getMyPlayerID() || 0
              )
              .pipe(takeUntil(this.destroy$))
              .subscribe((data) => {
                this.initData({ ...data, skipSocket: true });
              });
            break;
        }
      });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  initData(data: AgileDeckModel): void {
    const { isLastOne, questions, answeredQuestionDetail } = data;
    if (questions) {
      this.gameService.updateQuestions(questions);
    }
    if (answeredQuestionDetail) {
      this.myPlayerId = answeredQuestionDetail.player.id;
      this.gameService.setMyPlayerID(answeredQuestionDetail.player.id);

      //LOCAL STORAGE
      // localStorage.setItem(
      //   this.codeGameBoard + '_player',
      //   String(answeredQuestionDetail.player.id)
      // );
      sessionStorage.setItem(
        this.codeGameBoard + '_player',
        String(answeredQuestionDetail.player.id)
      );
      localStorage.setItem(
        this.codeGameBoard + '_aqd',
        String(answeredQuestionDetail.id)
      );
      // localStorage.setItem(
      //   this.codeGameBoard + '_currentQuestion',
      //   answeredQuestionDetail.answeredQuestion.id
      // );

      //GAME

      this.monitorGameBoard(isLastOne);

      // SOCKET;
      if (data.skipSocket == null) {
        this.socketService.createSocket(this.codeGameBoard);
        this.socketService.onJoinGame(answeredQuestionDetail.player, isLastOne);
      }
    }
  }

  monitorGameBoard(isLastOne: boolean): void {
    this.socketService.setLastestQuestion(isLastOne);
  }
}
