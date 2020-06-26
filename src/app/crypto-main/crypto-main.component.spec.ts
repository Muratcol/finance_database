import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoMainComponent } from './crypto-main.component';

describe('CryptoMainComponent', () => {
  let component: CryptoMainComponent;
  let fixture: ComponentFixture<CryptoMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CryptoMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
