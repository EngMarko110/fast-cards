import { UsersService } from '../../..';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../..';

@Component({
  selector: 'users-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {
  registerFormGroup:FormGroup;
  formBuilder: any;
  constructor(private authServ:AuthService,
     private router:Router,
     private usersServ:UsersService
    ) {

    this._initRegisterForm();
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
  }
  private _initRegisterForm() {
    this.registerFormGroup = new FormGroup({
      name:new FormControl('', Validators.required),
      email:new FormControl('', [Validators.required, Validators.email]),
      password:new FormControl('', Validators.required) ,
      phone:new FormControl ('')
    });
    // this.registerFormGroup.valueChanges.subscribe((changes)=>{
    //   console.log(changes);
      
    // })
  }
  onSubmit(user:any){
    this.authServ.signUp(user).subscribe((response)=>{      
      console.log('Register: ',response);
      this.usersServ.setUsernameListener(response.name)
      localStorage.setItem('userId',response?.id)
      this.router.navigate(['/']);
    },
    err=>{
      console.log({err});
      
    })    
  }
}
