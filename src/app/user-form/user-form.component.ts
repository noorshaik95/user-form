import { Component, Inject } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {DialogRef, DIALOG_DATA} from '@angular/cdk/dialog';
import { IUser } from '../user-list/user-list.component';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';

export interface IDialog {
  user: IUser,
  index?: Number
}
@Component({
  standalone: true,
  imports: [MatInputModule, ReactiveFormsModule, MatButtonModule, CommonModule],
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  profileForm = new FormGroup({
    firstName: new FormControl('Noorullah'),
    lastName: new FormControl('Shaik'),
    age: new FormControl(18),
    licenseNumber: new FormControl(''),
    email: new FormControl('', Validators.email),
  });

  constructor(public dialogRef: DialogRef<IDialog>, @Inject(DIALOG_DATA) public data: IDialog) {}

  ngOnInit() {
    this.profileForm.controls.age.valueChanges.subscribe((value) => {
      if(value && value < 18 || !value) {
        this.profileForm.controls.licenseNumber.setValue('');
        this.profileForm.controls.licenseNumber.disable();
      } else {
        this.profileForm.controls.licenseNumber.enable();
      }
    });
    if(this.data.user)
    this.profileForm.setValue(this.data.user);
  }

  onSubmit() {
    if(this.profileForm.invalid) {
      return;
    }
    this.dialogRef.close({user: this.profileForm.value as IUser, index: this.data?.index});
  }
}
