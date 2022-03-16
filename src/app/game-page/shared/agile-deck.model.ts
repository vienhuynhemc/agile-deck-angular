import { QuestionModel } from './question.model';
import { GameBoardModel } from './game-board.model';
export interface AgileDeckModel {
  answeredQuestionDetail: {
    player: {
      gameBoard: GameBoardModel;
      id: number;
      name: string;
    };
    id: number;
  };

  isLastOne: boolean;
  questions: QuestionModel[];
  skipSocket?: boolean;
}
