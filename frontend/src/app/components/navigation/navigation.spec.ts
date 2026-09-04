import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Navigation } from './navigation';
import { AppAuthService } from '../../service/app.auth.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('Navigation', () => {
  let component: Navigation;
  let fixture: ComponentFixture<Navigation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navigation],
      providers: [
        { provide: AppAuthService, useValue: { getRoles: () => of([]) } },
        { provide: ActivatedRoute, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Navigation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
