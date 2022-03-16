import { GameService } from './../core/game.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePageComponent } from './game-page.component';

describe('GamePageComponent', () => {
  let component: GamePageComponent;
  let fixture: ComponentFixture<GamePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GamePageComponent],
      imports: [RouterTestingModule.withRoutes([]), HttpClientModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should store in local storage', () => {
    const codeGameBoard = component.codeGameBoard;
    const playerId: number = Number(
      localStorage.getItem(codeGameBoard + '_player')
    );

    expect(playerId).toEqual(component.myPlayerId);
  });

  it('Should display correctlly the name of game', () => {
    let inputHTML = fixture.debugElement.nativeElement.querySelector('input');
    expect(inputHTML.value).toContain(component.gameName);
  });
});
