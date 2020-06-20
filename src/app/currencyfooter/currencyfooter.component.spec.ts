import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyfooterComponent } from './currencyfooter.component';

describe('CurrencyfooterComponent', () => {
  let component: CurrencyfooterComponent;
  let fixture: ComponentFixture<CurrencyfooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencyfooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
