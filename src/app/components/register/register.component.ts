import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  
  loginForm!: FormGroup;
  showError = false;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userStorageService: UserStorageService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required]],
      dni: [null, [Validators.required]],
      apellidos: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  signup(){
    if(this.loginForm.valid){
    this.authService.registerUser(this.loginForm.value).subscribe(res=>{
      console.log(res);
      if(res.id != null){
        this.router.navigate([`login`], { queryParams: { signupSuccess: 'true' } });
      }
    })
  }
  }

}
