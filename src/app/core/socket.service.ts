import {AnswerModel} from './../game-page/shared/answer.model';
import {Injectable} from '@angular/core';
import {BehaviorSubject, first, firstValueFrom, Observable} from 'rxjs';
import {webSocket} from 'rxjs/webSocket';
import {environment} from 'src/environments/environment';

import {PlayerModel} from './../game-page/shared/player.model';
import {GameService} from './game.service';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  public evenObservable$: Observable<string>;
  public isLastestQuestionObservable$: Observable<boolean>;

  private event = new BehaviorSubject<string>('');
  private isLastestQuestionEven = new BehaviorSubject<boolean>(false);
  private socket: any;

  constructor(private gameService: GameService) {
    this.evenObservable$ = this.event.asObservable();
    this.isLastestQuestionObservable$ = this.isLastestQuestionEven.asObservable();
  }

  changeAnswer(data: AnswerModel): void {
    const form = {
      action: 'selected-card',
      playerId: String(this.gameService.getMyPlayerID()),
      content: data.content,
      contentAsDescription: data.contentAsDescription,
      contentAsImage: data.contentAsImage || '',
    };

    this.socket.next(form);
  }

  createSocket(gameBoardCode: string): void {
    this.socket = webSocket(environment.SOCKET + gameBoardCode);
    this.socket.subscribe(
      async (msg: any) => {
        console.log('message received: ');
        console.log(msg);

        if (msg) {
          if (msg.action != null) {
            switch (msg.action) {
              case 'join-game':
                let players: PlayerModel[] = [];
                if (msg.data.length > 0 && msg.data.length <= 50) {
                  let oldListIdPlayersHaveAnswered = await firstValueFrom(
                    this.gameService.playersHaveAnswered$
                  );

                  for (let i = 0; i < msg.data.length; i++) {
                    const data = JSON.parse(msg.data[i]);
                    oldListIdPlayersHaveAnswered =
                      oldListIdPlayersHaveAnswered.filter(
                        (ele) => ele != data.player.id
                      );
                    if (data.content && data.content != '') {
                      this.gameService.updateSelectedAnswers(
                        data.content,
                        data.player.id
                      );
                    }

                    const newPlayer: PlayerModel = {
                      name: data.player.name,
                      id: data.player.id,
                    };

                    players.push(newPlayer);
                  }

                  this.gameService.checkAndUpdateAnswerOfPlayerOut(
                    oldListIdPlayersHaveAnswered
                  );
                  this.gameService.updatePlayers(players);
                } else {
                  console.log('FULL ROOM');
                }
                break;
              case 'selected-card':
                const data = JSON.parse(msg.data);
                this.gameService.updateSelectedAnswers(
                  data.content,
                  data.player.id
                );
                break;
              case 'flip-card':
                this.gameService.updateIsFip(true);
                break;
              // case 'init-data':
              //   this.gameService.updateIsFip(msg.isFlip);
              //   this.isLastestQuestion.next(msg.isLastOne);
              //   break;
              // case 'reset-answer':
              //   this.isReset = !this.isReset;
              //   break;
              case 'next-question':
                this.isLastestQuestionEven.next(msg.isLastOne);
                this.event.next('next-question');
                break;
              // case 'update-player':
              //   this.gameService.updateNamePlayer(msg.playerName, msg.playerId);
              //   break;
              // case 'update-question':
              //   this.rejoin();
              //   break;
            }
          }
        }
      }, // Called whenever there is a message from the server.
      (err: any) => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      () => console.log('complete') // Called when connection is closed (for whatever reason).
    );
  }

  nextQuestion(isLastOne: boolean): void {
    const form = {
      action: 'next-question',
      isLastOne: isLastOne,
    };
    this.socket.next(form);
  }

  onJoinGame(player: object, isLastestQuestion: boolean): void {
    const form = {
      action: 'join-game',
      info: {
        player: player,
        isLatestQuestion: isLastestQuestion,
      },
    };

    this.socket.next(form);
  }

  setLastestQuestion(isLastestQuestion: boolean): void {
    this.isLastestQuestionEven.next(isLastestQuestion);
  };

  flipCard(): void {
    const form = {
      action: 'flip-card',
    };
    this.socket.next(form);
  }

}
