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
import { CardsComponent } from './cards/cards.component';
import { CurrencyTableComponent } from './currency-table/currency-table.component';
import { CurrencyfooterComponent } from './currencyfooter/currencyfooter.component';
import { CurrencyService } from './services/currency.service';
import { SmfooterComponent } from './smfooter/smfooter.component';
import { CommoditieMainComponent } from './commodity-main/commoditie-main.component';
import { CommodityfooterComponent } from './commodityfooter/commodityfooter.component';
import { CryptofooterComponent } from './cryptofooter/cryptofooter.component';
import { CryptoMainComponent } from './crypto-main/crypto-main.component';
import { SharesTableComponent } from './shares-table/shares-table.component';
import { HoverDirective } from './events/hover/hover.directive';
import { CryptoCardComponent } from './crypto-card/crypto-card.component';
import { AlertCenterComponent } from './alert-center/alert-center.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { AlertService } from './services/alert.service';





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
    LineChartComponent,
    CardsComponent,
    CurrencyTableComponent,
    CurrencyfooterComponent,
    SmfooterComponent,
    CommoditieMainComponent,
    CommodityfooterComponent,
    CryptofooterComponent,
    CryptoMainComponent,
    SharesTableComponent,
    HoverDirective,
    CryptoCardComponent,
    AlertCenterComponent,
    ChatWindowComponent,
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
  providers: [AlertifyService, UserService, LoginGuard, CurrencyService, AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
