import { LoginComponent } from './../../../../libs/users/src/lib/pages/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RegisterComponent } from '../../../../libs/users/src/lib/pages/register/register.component';
const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path:'user', loadChildren: () => import('../../../../libs/users/src/lib/user-profile/user-profile.module')
  .then(m => m.UserProfileModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
