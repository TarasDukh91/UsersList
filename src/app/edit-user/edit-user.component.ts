import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { UsersService } from "../services/users.service";
import { User } from "../users-list/users-list.component";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit  {
  editUserForm: any

  public user: User = {
    id: 0,
    name: '',
    surname: '',
    email: '',
    phone: 0
  };

  constructor(private fb: FormBuilder, private usersService: UsersService) { }

  ngOnInit(): void {
    this.user = this.usersService.getEditedUser();

    this.editUserForm = this.fb.group({
      name: [this.user.name, Validators.required],
      surname: [this.user.surname],
      email: [this.user.email, [Validators.required, Validators.email]],
      phone: [this.user.phone, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]
    })
  }

  onUserUpdate() {
    if (this.editUserForm.invalid) return;
    const updatedUserData = {id: this.user.id, ...this.editUserForm.value};
    this.usersService.updateUser(updatedUserData);
  }

}
