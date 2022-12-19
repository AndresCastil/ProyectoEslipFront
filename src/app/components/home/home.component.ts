import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  searchForm!: FormGroup;
  municipios:any

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      city: [null, [Validators.required]],
    });
    this.getCities();
  }

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
  ) { }

  getCities(){
    this.authService.getCities().subscribe(res=>{
      console.log(res);
      this.municipios = res;
    })
  }
  
  buscar():void{

    var iframe = document.createElement('iframe');
    iframe.src = 'https://my.atlistmaps.com/map/1fc716ac-6e9a-4f13-af42-c4c759dfb163?share=true;charset=utf-8,';

    document.body.appendChild(iframe);

  }

  routeToSearch(){
    if(UserStorageService.hasToken()){
        console.log(this.searchForm.get(['city'])!.value)
        if(this.searchForm.get(['city'])!.value == null){
          this.router.navigateByUrl(`search/${this.municipios[0]}`)
        }else{
          this.router.navigateByUrl(`search/${this.searchForm.get(['city'])!.value}`)
        }
      }else{
        this.router.navigate([`login`], { queryParams: { loginRequired: 'true' } });
      }
     
  }

}
