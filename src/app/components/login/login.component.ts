import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;
  showError = false;
  signupSuccess = false;
  loginRequired = false;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userStorageService: UserStorageService,
    private activatedroute: ActivatedRoute,) { 
      this.activatedroute.queryParams.subscribe(params => {
        console.log(params);
        this.signupSuccess = params['signupSuccess'];
        this.loginRequired = params['loginRequired'];
    });
     
    }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
    console.log(this.activatedroute.snapshot.params);
    // this.signupSuccess = this.activatedroute.snapshot.params['signupSucess'];
    console.log(this.signupSuccess);
  }

  login(){
    console.log(this.loginForm.value);

    this.authService.login(this.loginForm.get(['userName'])!.value, this.loginForm.get(['password'])!.value).subscribe(res => {
          this.authService.getUserByUsername(this.loginForm.get(['userName'])!.value).subscribe(res=>{
            const data = {
              id : res.id,
              username : res.username,
              role : res.role,
            }
            this.userStorageService.saveUser(data);

            if (UserStorageService.isAdminLoggedIn()) {
              this.router.navigateByUrl('admin/dashboard');
            } else if (UserStorageService.isUserLoggedIn()) {
              this.router.navigateByUrl('/');
            }
          })

      console.log("res", res);
    }, error => {
      console.log("errorr", error);
      if (error.status == 403) {
        this.showError = true;
      }

    })
  }

}
