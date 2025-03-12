import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-user-management',
  imports: [
    MatButton,
    CommonModule,
    MatTableModule,
    MatDialogModule,
    MatButton
  ],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export class UserManagementComponent {

  readonly dialog = inject(MatDialog);

  usersSubject = new BehaviorSubject<User[]>([])

  displayedColumns: string[] = ['userName','userEmail', 'userRole', 'actions']

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


  addUser(){
    const emptyUser: User = {
      id: crypto.randomUUID(), 
      userName:'', 
      userEmail:'', 
      userRole:'User', 
      userPassword:'pw',
      cart: []
    }
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '400px',
      data: emptyUser
    })

    dialogRef.afterClosed().subscribe((newUser: User) => {
      if(newUser) {

        newUser.userEmail = `${newUser.userName}@sviss.at`;
        this.userService.createUser(newUser).subscribe((createdUser) => {
          const usersArray = this.usersSubject.getValue();
          this.usersSubject.next([...usersArray, createdUser]);
        })
      }
    })

  }

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

  deleteUser(user: User){
    this.userService.deleteUser(user).subscribe(() => {
      let userArray = this.usersSubject.getValue(); 

      const index = userArray.findIndex(u => u.id ===user.id);
      if (index !== -1){
        userArray.splice(index, 1);
        this.usersSubject.next(userArray)
      }
    })
  }
}
