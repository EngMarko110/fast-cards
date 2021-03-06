import { User } from './../../models/user';
import { UsersService, AuthService } from '@bluebits/users';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'users-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  userInfo: User = { name: '', email: '', phone: '', walletBalance: 0 };
  loading: boolean = false;
  constructor(private userServ: UsersService, private authServ: AuthService) {
    this.getUserInfo();
  }

  ngOnInit(): void {
  }

  getUserInfo() {
    let userId = localStorage.getItem('userId');
    if (userId != null) {
      this.userServ.getUser(userId).subscribe((response) => {
        this.userInfo = response;
        this.loading = true;
        console.log({ response });
      })
    }
  }
  logout() {
    this.authServ.logout();
    this.userServ.setUsernameListener('')
  }
}
