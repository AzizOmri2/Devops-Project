import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherProjectComponent } from './afficher-project.component';

describe('AfficherProjectComponent', () => {
  let component: AfficherProjectComponent;
  let fixture: ComponentFixture<AfficherProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfficherProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
