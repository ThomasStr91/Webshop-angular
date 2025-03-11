import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { MatList, MatListItem } from '@angular/material/list';
import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-user-management',
  imports: [MatList,
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

  usersSubject = new BehaviorSubject<User[]>([])

  displayedColumns: string[] = ['userName', 'userRole', 'actions']

  constructor(private userService: UserService) {

    userService.getAllUsers().subscribe((data: User[]) => {
      this.usersSubject.next(data);
    })
  }

  openDialog(user: User): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '400px',
      data: { ...user }
    });

    dialogRef.afterClosed().subscribe((updatedUser: User) => {
      if (updatedUser) {
        this.updateUser(updatedUser);
      }
    });
  }
  ;

  updateUser(updatedUser: User) {
    this.userService.updateUser(updatedUser).subscribe(() => {
      let usersArray = this.usersSubject.getValue()
      const index = usersArray.findIndex(u => u.id === updatedUser.id);
      if (index !== -1) {
        usersArray[index] = updatedUser; 
        this.usersSubject.next(usersArray)
      }
    });
  }

}
