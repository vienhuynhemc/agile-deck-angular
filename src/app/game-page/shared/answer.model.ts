export interface AnswerModel {
  content: string;
  type: string;
  contentAsDescription?: string;
  contentAsImage?: string;

  selectedPlayers?: number[];
  selectedRatio?: number;
}
