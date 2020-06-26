import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommodityfooterComponent } from './commodityfooter.component';

describe('CommodityfooterComponent', () => {
  let component: CommodityfooterComponent;
  let fixture: ComponentFixture<CommodityfooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommodityfooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommodityfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
