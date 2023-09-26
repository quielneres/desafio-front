import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TableModule } from 'primeng/table';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductTypeComponent } from './product-type/product-type.component';
import { ProductComponent } from './product/product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormProductComponent } from './product/form-product/form-product.component';
import {ToastModule} from "primeng/toast";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {RippleModule} from "primeng/ripple";
import {DropdownModule} from "primeng/dropdown";
import {InputNumberModule} from "primeng/inputnumber";
import { FormProductTypeComponent } from './product-type/form-product-type/form-product-type.component';
import {MessagesModule} from "primeng/messages";
import {CardModule} from "primeng/card";
import {MenubarModule} from "primeng/menubar";
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import {CarouselModule} from "primeng/carousel";
import {TagModule} from "primeng/tag";
import { PurchasingFormComponent } from './home/purchasing-form/purchasing-form.component';
import { LoginComponent } from './login/login.component';
import {MessageModule} from "primeng/message";
import { TokenInterceptor } from './services/interceptors/token.interceptor';
import { UserComponent } from './user/user.component';
import {PasswordModule} from "primeng/password";
import {SplitterModule} from "primeng/splitter";
import {FieldsetModule} from "primeng/fieldset";
import { UserListComponent } from './user/user-list/user-list.component';
import { SalesComponent } from './sales/sales.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductTypeComponent,
    ProductComponent,
    FormProductComponent,
    FormProductTypeComponent,
    LayoutComponent,
    HomeComponent,
    PurchasingFormComponent,
    LoginComponent,
    UserComponent,
    UserListComponent,
    SalesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    TableModule,
    ToastModule,
    ButtonModule,
    InputTextModule,
    RippleModule,
    DropdownModule,
    InputNumberModule,
    MessagesModule,
    CardModule,
    MenubarModule,
    CarouselModule,
    TagModule,
    ReactiveFormsModule,
    MessageModule,
    PasswordModule,
    SplitterModule,
    FieldsetModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule  {}
