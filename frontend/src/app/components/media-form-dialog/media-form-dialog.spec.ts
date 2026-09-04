import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { MediaFormDialog } from './media-form-dialog';

describe('MediaFormDialog', () => {
  let component: MediaFormDialog;
  let fixture: ComponentFixture<MediaFormDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaFormDialog],
      providers: [
        { provide: MatDialogRef, useValue: { close: vi.fn() } },
        { provide: MAT_DIALOG_DATA, useValue: null }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MediaFormDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
