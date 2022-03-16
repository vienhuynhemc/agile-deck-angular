import { HttpClient } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { AnswerModel } from '../game-page/shared/answer.model';
import { GameBoardModel } from '../game-page/shared/game-board.model';
import { QuestionModel } from '../game-page/shared/question.model';
import { PlayerModel } from './../game-page/shared/player.model';
import { AgileDeckModel } from './../game-page/shared/agile-deck.model';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  public answerObservable$: Observable<AnswerModel>;
  public answersObservable$: Observable<AnswerModel[]>;
  public answersWithPlayers$: Observable<AnswerModel[]>;
  public playersDisplay$: Observable<PlayerModel[]>;
  public playersObservable$: Observable<PlayerModel[]>;
  public playersHaveAnswered$: Observable<number[]>;
  public questionsObservable$: Observable<QuestionModel[]>;
  public questionIsPlaying$: Observable<QuestionModel>;
  public questionsPlayed$: Observable<QuestionModel[]>;
  public isFlipObservable$:Observable<boolean>;

  // public questionIsPlaying$: Observable<Question>;
  private answer = new BehaviorSubject<AnswerModel>({} as AnswerModel);
  private answers = new BehaviorSubject<AnswerModel[]>([]);
  private apiServerURL = environment.REST_API;
  private codeGameBoard?: string;
  private isFlipEven = new BehaviorSubject<boolean>(false);
  private myPlayerID?: number;
  private players = new BehaviorSubject<PlayerModel[]>([]);
  private questions = new BehaviorSubject<QuestionModel[]>([]);
  constructor(private http: HttpClient) {
    this.answerObservable$ = this.answer.asObservable();
    this.answersObservable$ = this.answers.asObservable();
    this.answersWithPlayers$ = this.answersObservable$.pipe(
      map((result) => {
        result.forEach((element: AnswerModel) => {
          if (!element.selectedPlayers) {
            element.selectedPlayers = [];
          }
          if (!element.selectedRatio) {
            element.selectedRatio = 0;
          }
        });
        return result;
      })
    );
    this.playersObservable$ = this.players.asObservable();
    this.playersDisplay$ = this.playersObservable$.pipe(
      map((result) => {
        let sortedResult: PlayerModel[] = [];
        result.forEach((element: PlayerModel) => {
          if (this.myPlayerID) {
            if (this.myPlayerID == element.id) {
              element.displayName = element.name + ' (Me)';
              sortedResult.unshift(element);
            } else {
              element.displayName = element.name;
              sortedResult.push(element);
            }
          }
          if (!element.isAnswer) {
            element.isAnswer = false;
          }
          if (!element.contentAnswer) {
            element.contentAnswer = '';
          }
        });
        return sortedResult;
      })
    );
    this.isFlipObservable$ = this.isFlipEven.asObservable();
    this.playersHaveAnswered$ = this.answersObservable$.pipe(
      map((result: AnswerModel[]) => {
        let listIdPlayers: number[] = [];
        result.forEach((element: AnswerModel) => {
          if (element.selectedPlayers && element.selectedPlayers.length != 0) {
            listIdPlayers = [...listIdPlayers, ...element.selectedPlayers];
          }
        });
        return listIdPlayers;
      })
    );
    this.questionsObservable$ = this.questions.asObservable();
    this.questionIsPlaying$ = this.questions.pipe(
      map((result: QuestionModel[]) => {
        for (let i = 0; i < result.length; i++) {
          if (result[i].isPlaying == true) {
            return result[i];
          }
        }

        return {} as QuestionModel;
      })
    );
    this.questionsPlayed$ = this.questionsObservable$.pipe(
      map((result) => {
        return result.filter((ele: QuestionModel) => ele.isPlayed == true);
      })
    );
    // this.questionIsPlaying$=
    //MOCK DATA
    const listAnswers: AnswerModel[] = [
      {
        content: '1',
        type: 'text',
        contentAsDescription: 'The core beliefs of Waterfall',
      },
      {
        content: '2',
        type: 'text',
        contentAsDescription: 'The core beliefs of Agile',
      },
      {
        content: '3',
        type: 'text',
        contentAsDescription: 'The core beliefs of Lean',
      },
      {
        content: '4',
        type: 'text',
        contentAsDescription: 'The core beliefs of Lean',
      },
      {
        content: '5',
        type: 'text',
        contentAsDescription: 'The core beliefs of Lean',
      },
      {
        content: '6',
        type: 'text',
        contentAsDescription: 'The core beliefs of Lean',
      },
      {
        content: '7',
        type: 'text',
        contentAsDescription: 'The core beliefs of Lean',
      },
      {
        content: '8',
        type: 'text',
        contentAsDescription: 'The core beliefs of Lean',
      },
      {
        content: '9',
        type: 'text',
        contentAsDescription: 'The core beliefs of Lean',
      },
      {
        content: '10',
        type: 'text',
        contentAsDescription: 'The core beliefs of Lean',
      },
      {
        content: '11',
        type: 'text',
        contentAsDescription: 'The core beliefs of Lean',
      },
      {
        content: '12',
        type: 'text',
        contentAsDescription: 'The core beliefs of Lean',
      },
      {
        content: '13',
        type: 'text',
        contentAsDescription: 'The core beliefs of Lean',
      },
      {
        content: '14',
        type: 'text',
        contentAsDescription: 'The core beliefs of Lean',
      },
      // {
      //   content: '15',
      //   type: 'text',
      //   contentAsDescription: 'The core beliefs of Lean',
      // },
    ];
    this.answers.next(listAnswers);
  }
  changeAnswer(answer: AnswerModel): Observable<any> {
    this.answer.next(answer);
    const currentAQDId = localStorage.getItem(this.codeGameBoard + '_aqd');
    return this.http.put(
      this.apiServerURL + '/answeredquestiondetails/' + currentAQDId,
      {
        content: answer.content,
        contentAsDescription: answer.contentAsDescription,
        contentAsImage: answer.contentAsImage,
      }
    );
  }

  createNewGame(idGameBoard: number): Observable<GameBoardModel> {
    return this.http.put<GameBoardModel>(
      this.apiServerURL + '/gameboards',
      {},
      { params: { game: idGameBoard } }
    );
  }

  checkAndUpdateAnswerOfPlayerOut(listIdPlayersOut: number[]): void {
    let oldAnswers = this.answers.value;

    //Check old selection
    for (let i = 0; i < oldAnswers.length; i++) {
      if (
        oldAnswers[i].selectedPlayers &&
        oldAnswers[i].selectedPlayers?.length != 0
      ) {
        oldAnswers[i].selectedPlayers = oldAnswers[i].selectedPlayers?.filter(
          (ele) => listIdPlayersOut.indexOf(ele) == -1
        );
      }
    }
    this.answers.next(oldAnswers);
  }
  joinGame(codeGame: string): Observable<AgileDeckModel> {
    return this.http.get<AgileDeckModel>(
      this.apiServerURL + '/gameboards/join/' + codeGame
    );
  }

  nextQuestion(codeGame: string): Observable<{ isLastOne: boolean }> {
    return this.http.get<{ isLastOne: boolean }>(
      this.apiServerURL + '/questions/' + codeGame
    );
  }
  updateIsFip(isFlip: boolean) {
    this.isFlipEven.next(isFlip);
  }
  updateQuestions(questions: QuestionModel[]): void {
    this.questions.next(questions);
  }
  updatePlayers(players: PlayerModel[]) {
    this.players.next(players);
  }
  updateSelectedAnswers(contentAnswer: string, idPlayer: number): void {
    let oldAnswers = this.answers.value;

    //Check old selection
    for (let i = 0; i < oldAnswers.length; i++) {
      if (
        oldAnswers[i].selectedPlayers &&
        oldAnswers[i].selectedPlayers?.length != 0
      ) {
        oldAnswers[i].selectedPlayers = oldAnswers[i].selectedPlayers?.filter(
          (ele) => ele != idPlayer
        );
      }
    }

    //add selection to new answer
    for (let i = 0; i < oldAnswers.length; i++) {
      if (oldAnswers[i].content == contentAnswer) {
        if (!oldAnswers[i].selectedPlayers) {
          oldAnswers[i].selectedPlayers = [];
        }
        oldAnswers[i].selectedPlayers?.push(idPlayer);
        break;
      }
    }
    this.answers.next(oldAnswers);
  }
  reJoinGame(codeGame: string, playerId: number): Observable<AgileDeckModel> {
    return this.http.get<AgileDeckModel>(
      this.apiServerURL + '/gameboards/rejoin/' + codeGame,
      {
        params: {
          playerId,
        },
      }
    );
  }

  getCodeGameBoard(): string {
    return this.codeGameBoard || '';
  }

  setCodeGameBoard(codeGameBoard: string): void {
    this.codeGameBoard = codeGameBoard;
  }

  getMyPlayerID(): number {
    return this.myPlayerID || 0;
  }
  setMyPlayerID(playerID: number): void {
    this.myPlayerID = playerID;
  }
}
