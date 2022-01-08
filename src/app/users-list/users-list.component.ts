import {Component, OnInit} from '@angular/core';
import {UsersService} from "../services/users.service";

export interface User {
  id: number,
  name: string,
  surname: string,
  email: string,
  phone: number
}

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'surname', 'email', 'phone', 'actions']
  dataSource: any;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    const newUsers = this.usersService.getUsers()
    this.dataSource = newUsers || [{
      id: null,
      name: '',
      surname: '',
      email: '',
      phone: null
    }];
  }

  onEditButtonClick(id: number): void {
    this.usersService.getUser(id);
  }

  onDeleteButtonClick(id: any): void {
    this.usersService.deleteUser(id);
    this.dataSource = this.usersService.getUsers();
  }
}
