import { Injectable } from '@angular/core';
import { User } from "../users-list/users-list.component";
import { Router } from "@angular/router";

const INITIAL_USERS: User[] = [
  { id: 1, name: 'Taras', surname: 'Dukh', email: 'test@gmail.com', phone: +380631753653 },
  { id: 2, name: 'Dasha', surname: 'Dukh', email: 'test@gmail.com', phone: +380637583653 }
]


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: User[] = [];
  editedUser: any;
  nextId: number = 0;

  constructor(private router: Router) {
    let users = this.getUsers();

    if (users.length === 0) {
      this.nextId = 0;
    } else {
      let maxId = users[users.length - 1].id;
      this.nextId = maxId + 1;
    }
  }

  addUser(user: any): void {
    let users = this.getUsers();
    users.push({ id: this.nextId, ...user});
    this.users = [...this.users, users];
    this.setLocalStorageUsers(users);
    this.nextId++;
  }

  getUsers(): any {
    const users = localStorage.getItem('users')
      ? localStorage.getItem('users')
      : JSON.stringify(INITIAL_USERS);
    let localStorageUsers = JSON.parse(users || '');
    return localStorageUsers === null ? [] : localStorageUsers;
  }

  setLocalStorageUsers(users: any): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  deleteUser(id: number): void {
    let users = this.getUsers();
    users = users.filter((user: any) => user.id != id);
    this.setLocalStorageUsers(users);
  }

  getUser(id: number): void {
    const users = this.getUsers();
    this.editedUser = users.filter((user: any) => user.id === id);
  }

  getEditedUser(): User {
    return this.editedUser[0];
  }

  updateUser(updatedUser: User): void {
    const users = this.getUsers();
    users.forEach((user: any, index: number, users: User[]) => {

      if(user.id === updatedUser.id) {
        users[index] = updatedUser
      }
    })
    this.setLocalStorageUsers(users);
    this.router.navigate(['']);
  }
}
