import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './app.component';
import { AboutUsComponent } from './html/aboutus';
import { WindowerrorComponent } from './errorwindow';
import { PaymentWindowComponent } from './paymentwindow';
import { Window1Component } from './modelwindow1';
import { WindowInfoComponent } from './modelinfo';
import { Window2Component } from './modelwindow2';
import { Window3Component } from './modelwindow3';
import { AppComponent } from './root';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './html/login';
import { RegisterComponent } from './html/registration';
import { httpInterceptorProviders } from './_helpers/HttpRequestInterceptor';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderComponent } from './html/order.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { WijzigProfielComponent } from './wijzigProfielModal';
import { WindowBetusernameComponent } from './betusernamewindow';
import { WindowEKPosterComponent } from './ekposterwindow';
import { VeranderWachtwoordComponent } from './veranderWachtwoordModal';
import { PasswordComponent } from './html/password';
import { BetScreenComponent } from './html/betscreen';
import { EkVoorspellingComponent } from './html/ekvoorspelling';
import { AlgVoorwaardenComponent } from './html/algvoorwaarden';
import { ChatBotComponent } from './chatbotwindow';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ShopcartComponent } from './html/shop-cart';
import { ToastrModule } from 'ngx-toastr';
import {NgcCookieConsentModule, NgcCookieConsentConfig} from 'ngx-cookieconsent';
import { domain } from "src/environments";

const cookieConfig:NgcCookieConsentConfig = {
  cookie: {
    domain: domain.url // or 'your.domain.com' // it is mandatory to set a domain, for cookies to work properly (see https://goo.gl/S2Hy2A)
  },
  palette: {
    popup: {
      background: '#000'
    },
    button: {
      background: '#f1d600'
    }
  },
  theme: 'edgeless',
  type: 'opt-out'
};

@NgModule({
  declarations: [
    AppComponent,
    AboutUsComponent,
    HomeComponent,
    Window1Component,
    Window2Component,
    Window3Component,
    WindowInfoComponent,
    PaymentWindowComponent,
    WindowerrorComponent,
    ShopcartComponent,
    OrderComponent,
    WijzigProfielComponent,
    WindowBetusernameComponent,
    WindowEKPosterComponent,
    VeranderWachtwoordComponent,
    BetScreenComponent,
    EkVoorspellingComponent,
    PasswordComponent,
    AlgVoorwaardenComponent,
    ChatBotComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    ToastrModule.forRoot({
      timeOut: 7500,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
  }),
    NgcCookieConsentModule.forRoot(cookieConfig),
    BrowserAnimationsModule,
    NgxPaginationModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
