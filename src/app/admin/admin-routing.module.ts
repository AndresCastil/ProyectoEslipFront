import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuard } from '../guards/adminAuth/admin-auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [{ path: 'dashboard', component: DashboardComponent , canActivate: [AdminAuthGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
