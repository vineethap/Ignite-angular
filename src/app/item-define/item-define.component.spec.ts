import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDefineComponent } from './item-define.component';

describe('ItemDefineComponent', () => {
  let component: ItemDefineComponent;
  let fixture: ComponentFixture<ItemDefineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemDefineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDefineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
