import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AuthConfig, provideOAuthClient } from 'angular-oauth2-oidc';
import { authConfig } from '../../app.auth';

import { MediaCard } from './media-card';
import { Media } from '../../data/media';

describe('MediaCard', () => {
  let component: MediaCard;
  let fixture: ComponentFixture<MediaCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaCard],
      providers: [
        provideRouter([]),
        provideOAuthClient(),
        { provide: AuthConfig, useValue: authConfig },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MediaCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('item', new Media());
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
