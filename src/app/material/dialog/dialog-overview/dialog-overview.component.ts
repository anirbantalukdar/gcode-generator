import { ChangeDetectionStrategy, Component, inject, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface DialogData {
  animal: string;
  name: string;
};

@Component({
  selector: 'app-dialog-overview',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './dialog-overview-example.html',
  styleUrl: './dialog-overview.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogOverviewComponent {
  readonly animal = signal(' ');
  readonly name = model('');
  readonly dialog = inject(MatDialog);

  openDialog(): void{
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {name: this.name(), animal: this.animal()}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result !== undefined){
        this.animal.set(result);
      }
    })
  }
}

@Component({
  selector: 'dialog-example-overview-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose
  ],
  standalone: true
})
export class DialogOverviewExampleDialog{
  readonly dialogRef = inject(MatDialogRef<DialogOverviewExampleDialog>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly animal = model(this.data.animal);

  onNoClick(): void {
    this.dialogRef.close();
  }
}