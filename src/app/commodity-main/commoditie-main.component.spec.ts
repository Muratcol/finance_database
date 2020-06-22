import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommoditieMainComponent } from './commoditie-main.component';

describe('CommoditieMainComponent', () => {
  let component: CommoditieMainComponent;
  let fixture: ComponentFixture<CommoditieMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommoditieMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommoditieMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
