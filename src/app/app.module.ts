import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { TaskListsWrapperComponent } from './task-lists-wrapper/task-lists-wrapper.component';
import { BoardPageComponent } from './board-page/board-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskComponent } from './task/task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BoardControlsComponent } from './board-controls/board-controls.component';
import { AuthInterceptor } from './shared/auth.interceptor';
import { CreateTaskPageComponent } from './create-task-page/create-task-page.component';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor,
};

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    TaskListsWrapperComponent,
    BoardPageComponent,
    RegisterPageComponent,
    SignupPageComponent,
    TaskListComponent,
    TaskComponent,
    BoardControlsComponent,
    CreateTaskPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent],
})
export class AppModule {}
