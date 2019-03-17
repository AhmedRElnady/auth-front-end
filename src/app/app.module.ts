
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import 'rxjs/Rx';

import { AppComponent } from './app.component';
import { LoginComponent } from './home/login.component';
import { AboutComponent } from './home/about.component';
import { ProtectedHomeComponent } from "./home/protectedHome.component";
 
import { ToastrService } from './common/toastr.service';
import { AuthGuard } from "./user/auth-guard.service";


import { UserModule } from './user/user.module';
import { AdminModule } from "./shop-admin/admin.module";
import { ShopModule } from "./shop/shop.module";


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    UserModule,
    AdminModule,
    ShopModule,
    RouterModule.forRoot([
        { path: 'login', component: LoginComponent},
        { path: 'about', component: AboutComponent},
        { path: 'home',canActivate: [AuthGuard], component: ProtectedHomeComponent },
        { path: '', redirectTo: 'login', pathMatch: 'full' },
        { path: '**', redirectTo: 'login', pathMatch: 'full' }
    ])
  ],
  declarations: [ 
    AppComponent,
    LoginComponent,
    AboutComponent,
    ProtectedHomeComponent
  ],
  bootstrap: [AppComponent],
  providers: [ToastrService, AuthGuard]
})
export class AppModule { }
