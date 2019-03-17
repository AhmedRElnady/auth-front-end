import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ShopComponent } from "./shop.component";
import { ListShopsComponent } from "./listshops.component";

import { AuthGuard } from "../user/auth-guard.service";
import { AuthService } from "../user/auth.service";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            { path: 'api/shops', canActivate: [AuthGuard], component: ShopComponent},
            { path: 'api/shops/:id', canActivate: [AuthGuard], component: ShopComponent},
            { path: 'api/shops/report', canActivate: [AuthGuard], component: ListShopsComponent }
        ])
    ],
    declarations: [
        ShopComponent,
        ListShopsComponent
    ],
    providers: [
        AuthService,
        AuthGuard
    ]

})
export class ShopModule {}