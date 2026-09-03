import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMedia } from './add-media';

describe('AddMedia', () => {
  let component: AddMedia;
  let fixture: ComponentFixture<AddMedia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMedia],
    }).compileComponents();

    fixture = TestBed.createComponent(AddMedia);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
