import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderconstructionPageComponent } from './underconstruction-page.component';

describe('UnderconstructionPageComponent', () => {
  let component: UnderconstructionPageComponent;
  let fixture: ComponentFixture<UnderconstructionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnderconstructionPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderconstructionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
