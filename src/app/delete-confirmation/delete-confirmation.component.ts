import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'inez-delete-confirmation',
  styleUrls: ['./delete-confirmation.component.scss'],
  templateUrl: './delete-confirmation.component.html'
})
export class DeleteConfirmationComponent {

  constructor(private dialogRef: MatDialogRef<DeleteConfirmationComponent>) { }

  public onCancelClick() {
    this.dialogRef.close(false);
  }

  public onOkClick() {
    this.dialogRef.close(true);
  }
}
