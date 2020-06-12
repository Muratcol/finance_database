import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AlertifyService } from './services/alertify.service';
import { CurrencyComponent } from './currency/currency.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserService } from './services/user.service';
import { LoginGuard } from './services/login.guard';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserComponent } from './user/user.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { FinanceMainComponent } from './finance-main/finance-main.component';
import { ContactComponent } from './contact/contact.component';
import { ChartsModule } from 'ng2-charts';
import { LineChartComponent } from './line-chart/line-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    CurrencyComponent,
    SideBarComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    FinanceMainComponent,
    ContactComponent,
    LineChartComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ChartsModule
  ],
  providers: [AlertifyService, UserService, LoginGuard], //Alertify service a global service !
  bootstrap: [AppComponent]
})
export class AppModule { }