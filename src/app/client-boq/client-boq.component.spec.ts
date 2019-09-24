import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientBoqComponent } from './client-boq.component';

describe('ClientBoqComponent', () => {
  let component: ClientBoqComponent;
  let fixture: ComponentFixture<ClientBoqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientBoqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientBoqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
