import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { NoAuthGuard } from './guards/noAuth/no-auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { UserAuthGuard } from './guards/userAuth/user-auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent , canActivate: [NoAuthGuard]},
  { path: 'signup', component: RegisterComponent , canActivate: [NoAuthGuard]},
  { path: 'search/:name', component: SearchComponent , canActivate: [UserAuthGuard]},
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
