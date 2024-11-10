import {Routes} from '@angular/router';
import {AppLayoutComponent} from "./components/layouts/app-layout/app-layout.component";
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {ProductsPageComponent} from "./pages/products-page/products-page.component";
import {CheckoutPageComponent} from "./pages/checkout-page/checkout-page.component";
import {ProductDetailsPageComponent} from "./pages/product-details-page/product-details-page.component";
import {LoginPageComponent} from "./pages/auth/login-page/login-page.component";
import {RegisterPageComponent} from "./pages/auth/register-page/register-page.component";
import {authGuard} from "./guards/auth.guard";
import {ProfilePageComponent} from "./pages/profile-page/profile-page.component";

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'app',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
      },
      {
        path: 'products',
        component: ProductsPageComponent
      },
      {
        path: 'product/:id',
        component: ProductDetailsPageComponent
      },
      {
        path: 'checkout',
        component: CheckoutPageComponent,
        canActivate: [authGuard]
      },
      {
        path: 'auth/login',
        component: LoginPageComponent
      },
      {
        path: 'auth/register',
        component: RegisterPageComponent
      },
      {
        path: 'profile',
        component: ProfilePageComponent,
        canActivate: [authGuard]
      }
    ]
  }];
