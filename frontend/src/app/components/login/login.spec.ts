import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthConfig, provideOAuthClient } from 'angular-oauth2-oidc';
import { authConfig } from '../../app.auth';
import { Login } from './login';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [provideOAuthClient(), { provide: AuthConfig, useValue: authConfig }],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
