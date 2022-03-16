import { GameService } from './../core/game.service';
import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  private readonly destroy$ = new Subject();

  constructor(private gameService: GameService, private router: Router) {}

  onClickNewGameDefault(): void {
    this.gameService
      .createNewGame(1)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (data) {
          const codeGame = data.code;
          if (codeGame) {
            this.router.navigate(['/' + codeGame]);
          }
        }
      });
  }

  ngOnInit(): void {}
}
