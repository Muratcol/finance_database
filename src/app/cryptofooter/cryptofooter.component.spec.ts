import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptofooterComponent } from './cryptofooter.component';

describe('CryptofooterComponent', () => {
  let component: CryptofooterComponent;
  let fixture: ComponentFixture<CryptofooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CryptofooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptofooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
