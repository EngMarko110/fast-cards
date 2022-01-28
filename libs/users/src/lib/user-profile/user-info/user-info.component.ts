import { User } from './../../models/user';
import { UsersService } from '@bluebits/users';
import { Component, OnInit } from '@angular/core';
import { IUser } from '../../models/user.class';

@Component({
  selector: 'users-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
userInfo:User={name:'',email:'',phone:'',country:''};
loading:boolean=false;
constructor(private userServ:UsersService) { 
  this.getUserInfo();
}

ngOnInit(): void {
}

  getUserInfo() {
    let userId = localStorage.getItem('userId');
    if (userId != null) {
      this.userServ.getUser(userId).subscribe((response)=>{
        this.userInfo=response;
        this.loading=true;
        console.log({response});       
      })
    }
  }
}
