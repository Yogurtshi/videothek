import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { MediaFormDialog } from './media-form-dialog';

describe('MediaFormDialog', () => {
  let component: MediaFormDialog;
  let fixture: ComponentFixture<MediaFormDialog>;
  let closeDialog: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    closeDialog = vi.fn();
    await TestBed.configureTestingModule({
      imports: [MediaFormDialog],
      providers: [
        { provide: MatDialogRef, useValue: { close: closeDialog } },
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

  it('does not submit an invalid form', () => {
    component.mediaForm.controls.title.setValue('');

    component.submit();

    expect(closeDialog).not.toHaveBeenCalled();
    expect(component.mediaForm.controls.title.touched).toBe(true);
  });

  it('submits a trimmed valid medium', () => {
    component.mediaForm.patchValue({
      title: '  Inception  ',
      description: '  A dream thriller  ',
      director: '  Christopher Nolan  ',
      releaseYear: 2010,
      length: 148
    });

    component.submit();

    expect(closeDialog).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Inception',
      description: 'A dream thriller',
      director: 'Christopher Nolan',
      releaseYear: 2010,
      length: 148
    }));
  });
});
