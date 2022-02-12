import { UsersService } from "../../..";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { AuthService } from "../../..";
import { LocalstorageService } from "../../services/localstorage.service";

@Component({
  selector: "users-register",
  templateUrl: "./register.component.html",
  styles: [],
})
export class RegisterComponent implements OnInit {
  duplicateErr: boolean = false;
  registerationForm: FormGroup;
  formBuilder: any;
  constructor(
    private authServ: AuthService,
    private router: Router,
    private usersServ: UsersService,
    private localstorageService: LocalstorageService
  ) {
    this._initRegisterForm();
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void { }
  private _initRegisterForm() {
    this.registerationForm = new FormGroup({
      name: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")]),
      password: new FormControl("", [Validators.required, Validators.pattern("(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$")]),
      phone: new FormControl(""),
    });
  }
  onSubmit(user: any) {
    this.authServ.signUp(user).subscribe(
      (response) => {
        // console.log("Register: ", response.token);
        this.localstorageService.setToken(response.token); //
        this.usersServ.setUsernameListener(response.name);
        localStorage.setItem("userId", response?.id);
        this.router.navigate(["/"]);
      },
      (error) => {
        this.duplicateErr = true;
      }
    );
  }
  isValidInput(fieldName): boolean {
    return this.registerationForm.controls[fieldName].invalid &&
      (this.registerationForm.controls[fieldName].dirty || this.registerationForm.controls[fieldName].touched);
  }
  validateRequired(fieldName) {
    return this.registerationForm.controls[fieldName].errors.required;
  }
  validatePattern(fieldName) {
    return this.registerationForm.controls[fieldName].errors.pattern;
  }
  validateLength(fieldName) {
    return this.registerationForm.controls[fieldName].errors.minLength;
  }
}
