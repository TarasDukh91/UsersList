import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { UsersService } from "../services/users.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  constructor(private fb: FormBuilder, private usersService: UsersService, private router: Router) { }

  userForm = this.fb.group({
    name: ['', Validators.required],
    surname: [''],
    email: ['', [Validators.email, Validators.required]],
    phone: ['', Validators.pattern(/^-?(0|[1-9]\d*)?$/)]
  })

  ngOnInit(): void {

  }

  onSubmit(): void {
    if (this.userForm.invalid) return;
    this.router.navigate(['']);
    this.usersService.addUser(this.userForm.value);
  }
}
