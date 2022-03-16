import { Component, Input, OnInit } from '@angular/core';

import { PlayerModel } from './../../shared/player.model';

@Component({
  selector: '[gpagePlayerCard]',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss'],
})
export class PlayerCardComponent implements OnInit {
  @Input() isAnswered?: boolean;
  @Input() player?: PlayerModel;

  public isFlip: boolean = false;
  public myPlayerId?: number;

  constructor() {}

  ngOnInit(): void {}
}
