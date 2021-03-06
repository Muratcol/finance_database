import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrencyComponent } from './currency/currency.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginGuard } from './services/login.guard';
import { UserComponent } from './user/user.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { FinanceMainComponent } from './finance-main/finance-main.component';
import { ContactComponent } from './contact/contact.component';
import { CardsComponent } from './cards/cards.component';
import { CommoditieMainComponent } from './commodity-main/commoditie-main.component';
import { AlertCenterComponent } from './alert-center/alert-center.component';
import { CryptoMainComponent } from './crypto-main/crypto-main.component';


const routes: Routes = [
  {
    path: '',
    component: FinanceMainComponent,
  },
  {
    path: 'currencies/forex',
    component: CurrencyComponent,
  },
  {
    path: 'user/login',
    component: LoginComponent,
  },
  {
    path: 'cards',
    component: CardsComponent,
  },
  {
    path: 'user/register',
    component: RegisterComponent,
  },
  {
    path: 'user/panel',
    component: UserComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'user/forgotPassword',
    component: ForgotPasswordComponent,
  },
  {
    path: 'user/resetPassword/:resetPasswordToken',
    component: ResetPasswordComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'currencies/commodities',
    component: CommoditieMainComponent,
  },
  {
    path: 'alert-center',
    component: AlertCenterComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'currencies/cryptos',
    component: CryptoMainComponent
  },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
