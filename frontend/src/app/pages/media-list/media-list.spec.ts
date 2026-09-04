import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthConfig, provideOAuthClient } from 'angular-oauth2-oidc';
import { authConfig } from '../../app.auth';
import { MediaList } from './media-list';

describe('MediaList', () => {
  let component: MediaList;
  let fixture: ComponentFixture<MediaList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaList],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideOAuthClient(),
        { provide: AuthConfig, useValue: authConfig },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MediaList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
