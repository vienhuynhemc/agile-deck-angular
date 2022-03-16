export interface QuestionModel {
  isPlayed: boolean;
  isPlaying: boolean;
  question: {
    content: {
      content: string;
    };
    game: object;
    id: number;
  };
}
