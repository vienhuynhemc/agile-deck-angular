import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {takeUntil, Subject} from 'rxjs';

import {GameService} from './../../core/game.service';
import {PlayerModel} from './../shared/player.model';
import {SocketService} from './../../core/socket.service';

@Component({
  selector: 'gpage-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss'],
})
export class PlayersComponent implements OnInit, OnDestroy {
  public players: PlayerModel[] = [];
  public playersHaveAnswerd?: number[];
  public isLastestQuestion: boolean = false;
  public isFlip: boolean = false;

  private readonly destroy$ = new Subject<boolean>();

  constructor(
    private gameService: GameService,
    private socketService: SocketService
  ) {
  }

  ngOnInit(): void {
    this.gameService.playersDisplay$
      .pipe(takeUntil(this.destroy$))
      .subscribe((players) => {
        this.players = players;
      });
    this.gameService.playersHaveAnswered$
      .pipe(takeUntil(this.destroy$))
      .subscribe((listIdPlayers) => {
        this.playersHaveAnswerd = listIdPlayers;
      });
    this.gameService.isFlipObservable$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isFlip) => {
        this.isFlip = isFlip;
      });
    this.socketService.isLastestQuestionObservable$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isLastestQuestion) => {
        this.isLastestQuestion = isLastestQuestion;
      });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  onNextQuestion(): void {
    const codeGameBoard = this.gameService.getCodeGameBoard();
    console.log('!', this.isLastestQuestion);
    if (!this.isLastestQuestion && codeGameBoard) {
      this.gameService
        .nextQuestion(codeGameBoard)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data) => {
          const isLastOne: boolean = data.isLastOne;
          this.socketService.nextQuestion(isLastOne);
        });
    }
  }

  flipCard(): void {
    this.socketService.flipCard();
  }

}
