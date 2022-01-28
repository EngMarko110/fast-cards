import { AuthService, UsersService } from '@bluebits/users';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'ngshop-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']

})
export class HeaderComponent {
  username: any;
  constructor(private router: Router, private userServ: UsersService,private authServ:AuthService) {
    this.getUserName();
    this.userServ.getUsernameListner().subscribe((data)=>{
      this.username=data;
      console.log('username',this.username);
      
    })
  }
  navigateToAuth(url: string) {
    this.router.navigate([`/${url}`]);
    console.log({ url });

  }

  getUserName() {
    let userId = localStorage.getItem('userId')
    this.userServ.getUser(userId).subscribe((response) => {
     this.userServ.setUsernameListener(response.name);
    })
  }
  logOut(){
    this.authServ.logout();
    localStorage.removeItem('userId');
    this.userServ.setUsernameListener('')
  }
}
