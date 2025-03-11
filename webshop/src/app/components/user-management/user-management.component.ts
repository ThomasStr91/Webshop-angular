import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { MatList, MatListItem } from '@angular/material/list';
import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,} from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';

@Component({
  selector: 'app-user-management',
  imports: [ MatList,
    MatButton,
    CommonModule,
    MatListItem,
    MatTableModule,
    MatDialogModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle
 
  ],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export class UserManagementComponent {

    readonly dialog = inject(MatDialog);
  
    openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
      this.dialog.open(UserDialogComponent, {
        width: '250px',
        enterAnimationDuration,
        exitAnimationDuration,
      });
    }
  

  users: User[] = []
  displayedColumns: string [] = ['userName', 'userRole', 'actions']

  constructor(private userService: UserService) {
    userService.getAllUsers().subscribe((data: User[]) => {
      this.users = data;
    })
  }

  editUser(){
  }

}
