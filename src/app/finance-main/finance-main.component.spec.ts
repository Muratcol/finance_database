import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceMainComponent } from './finance-main.component';

describe('FinanceMainComponent', () => {
  let component: FinanceMainComponent;
  let fixture: ComponentFixture<FinanceMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanceMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
