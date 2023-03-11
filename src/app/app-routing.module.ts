import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRegistrationComponent } from './create-registration/create-registration.component';
import { RegistrationListComponent } from './registration-list/registration-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

const routes: Routes = [{path:'', redirectTo:'register', pathMatch:'full'},
  {path:'register',  component:CreateRegistrationComponent},
  {path:'list', component:RegistrationListComponent},
  {path:'detail/:id', component:UserDetailComponent},
  {path:'update/:id', component: CreateRegistrationComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
