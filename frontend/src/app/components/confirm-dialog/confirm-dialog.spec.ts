import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ConfirmDialog } from './confirm-dialog';

describe('ConfirmDialog', () => {
  let component: ConfirmDialog;
  let fixture: ComponentFixture<ConfirmDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmDialog],
      providers: [
        { provide: MatDialogRef, useValue: { close: vi.fn() } },
        { provide: MAT_DIALOG_DATA, useValue: { title: 'Test', message: 'Test message' } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close with confirmation result', () => {
    const dialogRef = TestBed.inject(MatDialogRef);

    component.onConfirm();
    component.onDismiss();

    expect(dialogRef.close).toHaveBeenNthCalledWith(1, true);
    expect(dialogRef.close).toHaveBeenNthCalledWith(2, false);
  });
});
