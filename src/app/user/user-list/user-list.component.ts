import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {User} from "../../services/user/IUser";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent  implements OnInit {
  users:  User[] = [];
  constructor(
    private userService: UserService
  ) {
  }
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(response => {
      this.users = response.data;
    });
  }
}
