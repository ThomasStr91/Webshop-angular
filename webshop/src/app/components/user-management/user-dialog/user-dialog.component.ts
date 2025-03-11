import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormField, MatInput, MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-user-dialog',
  imports: [MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatInputModule,
    MatInput,
    MatFormField],
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.scss'
})
export class UserDialogComponent {
  readonly dialogRef = inject(MatDialogRef<UserDialogComponent>);

  updateUser(){
    
  }
}
