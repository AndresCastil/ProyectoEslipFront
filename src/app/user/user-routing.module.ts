import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthGuard } from '../guards/userAuth/user-auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserComponent } from './user.component';

const routes: Routes = [{ path: 'dashboard', component: DashboardComponent , canActivate: [UserAuthGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
