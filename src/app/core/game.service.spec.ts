import { GameBoardModel } from './../game-page/shared/game-board.model';
import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { GameService } from './game.service';

describe('GameService', () => {
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
    });

    service = TestBed.inject(GameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create successfully a new game from server ', () => {
    const expectedData: GameBoardModel = {
      code: '1',
      game: {
        description:
          'A workshop game to encourage people to think about alternative approaches for tackling projects. - by Scrum & Kanban',
        gameAsImage: 'iib_home.png',
        gameBoardConfig: {
          additionalPossibility: false,
          answerTitle: 'Pick an approach',
          editable: false,
          imageBackside: 'iib_backside.png',
          imagePlayerStart: 'iib_playerstart.png',
          playerTitle: 'Players',
          questionTitle: 'Select a scenario',
          randomWhenNext: true,
        },
        id: 1,
        name: 'Iterative - Incremental - Big Bang',
      },
      id: 1,
    };

    service.createNewGame(1).subscribe((data) => {
      data.code = '1';
      data.id = 1;

      expect(data).toEqual(expectedData, 'expected a new game');
    });
  });
  it('should create unsuccessfully a new game from server with  id game board does not exist ', () => {
    service.createNewGame(0).subscribe(
      (data) => {},
      (error) => {
        expect(error.status).toEqual(400, 'expected a status 400');
      }
    );
  });

  it('should store codeGameBoard in game service', () => {
    const codeGameBoard = '123';
    service.setCodeGameBoard(codeGameBoard);
    expect(service.getCodeGameBoard()).toEqual(codeGameBoard);
  });

  it('should join successfully a game with valid codeGameBoard ', () => {
    //NOT YET WORK
    service.createNewGame(1).subscribe((data) => {
      const code: string = data.code;
      service.joinGame(code).subscribe((game) => {
        expect(game).toBeDefined();
      });
    });
  });

  it('should rejoin successfully a game with valid codeGameBoard ', () => {
    //NOT YET WORK
    service.createNewGame(1).subscribe((data) => {
      const code: string = data.code;
      service.joinGame(code).subscribe((game) => {
        expect(game).toBeDefined();
      });
    });
  });

  it('Should get current playing question', () => {
    service.questionIsPlaying$.subscribe((data) => {
      console.log(data);
      if (data && data.isPlaying) {
        expect(data.isPlaying).toBeTrue();
      }
    });
  });

  it('Should next question successfully', () => {
    service.nextQuestion(service.getCodeGameBoard()).subscribe((data) => {
      expect(data.isLastOne).toBeDefined();
    });
  });
});
