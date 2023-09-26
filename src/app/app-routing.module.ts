import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductComponent} from './product/product.component';
import {ProductTypeComponent} from './product-type/product-type.component';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {unauthenticatedUserGuard} from "./services/guards/unauthenticated-user.guard";
import {authenticatedUserGuard} from "./services/guards/authenticated-user.guard";
import {UserComponent} from "./user/user.component";
import {UserListComponent} from "./user/user-list/user-list.component";
import {SalesComponent} from "./sales/sales.component";


const routes: Routes = [
  {
    path: 'users',
    component: UserListComponent,
    canActivate: [authenticatedUserGuard]
  },
  {
    path: 'user/new',
    component: UserComponent
  },
  {
    path: 'sales',
    component: SalesComponent,
    canActivate: [authenticatedUserGuard]
  },
  {
    path: 'product',
    component: ProductComponent,
    canActivate: [authenticatedUserGuard]
  },
  {
    path: 'product-types',
    component: ProductTypeComponent,
    data: {pageTitle: 'Tipos de Produtos'}
  },
  {
    path: 'home',
    component: HomeComponent,
    data: {pageTitle: 'Home'}
  },
  { path: 'login',
    component: LoginComponent
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
