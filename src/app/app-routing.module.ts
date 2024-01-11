import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './app.component';
import { AboutUsComponent } from './html/aboutus';
import { RegisterComponent } from './html/registration';

import { LoginComponent } from './html/login';
import { OrderComponent } from './html/order.component';
import { PasswordComponent } from './html/password';
import { AlgVoorwaardenComponent } from './html/algvoorwaarden';
import { ShopcartComponent } from './html/shop-cart';


const routes: Routes = [{ path: '',   redirectTo: '/home', pathMatch: 'full' }, {path: 'home', component: HomeComponent},{path: 'about', component: AboutUsComponent},
{path: 'register', component: RegisterComponent},{path: 'login', component: LoginComponent}, {path: 'check/:groupid/order/:id', component: OrderComponent}, {path: 'passwordChange', component: PasswordComponent}, {path: 'policy', component: AlgVoorwaardenComponent}, {path: 'shopCart', component: ShopcartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],

})
export class AppRoutingModule { }
