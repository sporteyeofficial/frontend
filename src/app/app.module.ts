import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './app.component';
import { AboutUsComponent } from './html/aboutus';
import { Window1Component } from './modelwindow1';
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
import { VeranderWachtwoordComponent } from './veranderWachtwoordModal';
import { PasswordComponent } from './html/password';
import { AlgVoorwaardenComponent } from './html/algvoorwaarden';
import { ChatBotComponent } from './chatbotwindow';
import { CommonModule} from '@angular/common';
import { ShopcartComponent } from './html/shop-cart';

@NgModule({
  declarations: [
    AppComponent,
    AboutUsComponent,
    HomeComponent,
    Window1Component,
    Window2Component,
    Window3Component,
    ShopcartComponent,
    OrderComponent,
    WijzigProfielComponent,
    VeranderWachtwoordComponent,
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
    BrowserAnimationsModule,
    NgxPaginationModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
