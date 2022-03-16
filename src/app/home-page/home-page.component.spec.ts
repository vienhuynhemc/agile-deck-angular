import { AppRoutingModule } from './../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';

import { HomePageComponent } from './home-page.component';
import { By } from '@angular/platform-browser';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, AppRoutingModule],
      declarations: [HomePageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // it('should navigate to game page when click creating game default button', async () => {
  //   const location: Location = TestBed.inject(Location);
  //   fixture = TestBed.createComponent(HomePageComponent);
  //   component = fixture.componentInstance;

  //   fixture.detectChanges();
  //   let compiled = fixture.debugElement;
  //   let createNewGameButton = compiled.query(
  //     By.css('#create-default-game')
  //   ).nativeElement;
  //   createNewGameButton.click();
  //   fixture.detectChanges();
  //   fixture.whenStable().then(() => {
  //     console.log(location.path(), '!!');
  //   });
  // });
});
