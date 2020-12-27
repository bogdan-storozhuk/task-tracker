import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardPageComponent } from './board-page/board-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { SignupPageComponent } from './signup-page/signup-page.component';

const routes: Routes = [{
  path: '', component: MainLayoutComponent, children: [
    {path: '', redirectTo: '/', pathMatch:'full'},
    {path: '', component: BoardPageComponent},
    {path: 'register', component: RegisterPageComponent},
    {path: 'signup', component: SignupPageComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
