import { PrivacyPolicyComponent } from './shared/privacy-policy/privacy-policy.component';
import { AboutComponent } from './shared/about/about.component';
import { ContactsComponent } from './shared/contacts/contacts.component';
import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { FaqPageComponent } from './shared/faq-page/faq-page.component';
const routes: Routes = [
  { path: '', component: HomePageComponent },
  {path:'contacts',component:ContactsComponent},
  {path:'about',component:AboutComponent},
  {path:'privacy-ploicy',component:PrivacyPolicyComponent},
  {path:'FAQ',component:FaqPageComponent},
  {
    path: 'user', loadChildren: () => import('./../../../../libs/users/src/lib/user-profile/user-profile.module')
      .then(m => m.UserProfileModule),
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
