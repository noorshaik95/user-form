import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { IDialog, UserFormComponent } from '../user-form/user-form.component';
import {Dialog, DialogRef, DIALOG_DATA} from '@angular/cdk/dialog';
import {MatButtonModule} from '@angular/material/button';


export interface IUser {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  licenseNumber: string;
}

@Component({
  standalone: true,
  imports: [MatTableModule, ReactiveFormsModule, MatToolbarModule, MatIconModule, MatButtonModule],
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  profileForm = new FormGroup({
    firstName: new FormControl('Noorullah'),
    lastName: new FormControl('Shaik'),
    age: new FormControl(18),
    licenseNumber: new FormControl(''),
  });
  displayedColumns: string[] = ['firstName', 'lastName', 'age', 'license', 'email', 'actions'];

  dataSource: Array<IUser> = [];
  addedUser: string | undefined;
  selectedUser: IUser | undefined;
  selectedUserIndex: any;

  constructor(public dialog: Dialog) {}

  ngOnInit() {
    this.profileForm.controls.age.valueChanges.subscribe((value) => {
      if(value && value < 18 || !value) {
        this.profileForm.controls.licenseNumber.setValue('');
        this.profileForm.controls.licenseNumber.disable();
      } else {
        this.profileForm.controls.licenseNumber.enable();
      }
    });
  }

  onDelete(index: any) {
    this.dataSource = this.dataSource.filter((_, i) => i !== index);
  }
  openDialog(mode = 'Add', index: any): void {
    const dialogRef = this.dialog.open<IDialog>(UserFormComponent, {
      width: '500px',
      data: {
        user: this.dataSource[index],
        index: mode === 'Add' ? -1 : index
      }
    });

    dialogRef.closed.subscribe((result) => {
      console.log(result)
      if(result?.index === -1) {
        this.dataSource = [...this.dataSource, result.user];
      } else if (result && result?.index !== undefined && result?.index > -1){
        console.log('here')
        this.dataSource = this.dataSource.map((data, i) => {
          if(i === result?.index) {
            return result.user;
          } else {
            return data;
          }
        });
      }
      console.log(this.dataSource)
    });
  }
}
