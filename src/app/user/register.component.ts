import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from '../common/toastr.service'
import { UserService } from './user.service';

function comparePassword(c: AbstractControl): { [key: string]: boolean } | null {
  let passwordControl = c.get('password');
  let confirmControl = c.get('retypepass');

  if (passwordControl.pristine || confirmControl.pristine) {
    return null;
  }

  if (passwordControl.value === confirmControl.value) {
    return null;
  }
  return { 'mismatchedPassword': true };
}

@Component({
  templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService) {
  }

  name = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]);
  email = new FormControl('', [Validators.email]);
  password = new FormControl('', [Validators.required]);
  retypepass = new FormControl('', [Validators.required]);
  role = new FormControl('CUSTOMER');


  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: this.name,
      email: this.email,
      password: this.password,
      passwordGroup: this.fb.group({ password: this.password, retypepass: this.retypepass, }, { validator: comparePassword }),
      role: this.role
    });
  }

  registerUser(formdata: any): void {
    if (this.registerForm.dirty && this.registerForm.valid) {
      let theForm = this.registerForm.value;

      const thePass = this.registerForm.value.passwordGroup.password;
      theForm.password = thePass;
      delete theForm.passwordGroup;

      this.userService.register(theForm)
        .subscribe(data => {
          if (data.success === false) {
            this.toastr.error(data.message);
          } else {
            this.toastr.success(data.message);
            this.router.navigate(['login']);
          }
          this.registerForm.reset();
        });
    }
  }
}
