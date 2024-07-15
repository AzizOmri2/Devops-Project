import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherUsersComponent } from './afficher-users.component';

describe('AfficherUsersComponent', () => {
  let component: AfficherUsersComponent;
  let fixture: ComponentFixture<AfficherUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfficherUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
