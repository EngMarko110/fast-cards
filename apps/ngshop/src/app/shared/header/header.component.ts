import { AuthService, UsersService } from '@bluebits/users';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'ngshop-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']

})
export class HeaderComponent implements OnInit {
  username: any;
  constructor(private router: Router, private userServ: UsersService, private authServ: AuthService) {
    this.getUserName();
    this.userServ.getUsernameListner().subscribe((data) => {
      this.username = data;
      console.log('username', this.username);

    })
  }
  ngOnInit(): void {
    $(document).ready(function() {
      $('.openbtn').on('click',function(){
        document.getElementById("mySidepanel").style.width = "250px";
      });
      $('.closebtn,.item').on('click',function(){
        document.getElementById("mySidepanel").style.width = "0px";
      });
    });
  
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
  logOut() {
    this.authServ.logout();
    localStorage.removeItem('userId');
    this.userServ.setUsernameListener('')
  }
}
