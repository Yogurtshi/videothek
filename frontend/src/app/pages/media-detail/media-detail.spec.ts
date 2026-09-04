import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthConfig, provideOAuthClient } from 'angular-oauth2-oidc';
import { provideRouter } from '@angular/router';
import { MediaDetail } from './media-detail';
import { authConfig } from '../../app.auth';

describe('MediaDetail', () => {
  let component: MediaDetail;
  let fixture: ComponentFixture<MediaDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaDetail],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideOAuthClient(),
        provideRouter([]),
        { provide: AuthConfig, useValue: authConfig },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MediaDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
