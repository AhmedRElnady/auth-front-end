import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { ListAdminsComponent } from "./listadmins.component";
import { EditPrivilegeComponent } from "./editprivilege.component";
import { ListRequestComponent } from "./listrequests.component";

import { AuthGuard } from "../user/auth-guard.service";
import { AuthService } from "../user/auth.service";
import { AdminService } from "./admin.service";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            { path: 'api/shop-admins', component: ListAdminsComponent },
            { path: 'api/shop-admins/:id', component: EditPrivilegeComponent},
            { path: 'api/shop-admins/requests', component: ListRequestComponent }
        ])
    ],
    declarations: [
        ListAdminsComponent,
        EditPrivilegeComponent,
        ListRequestComponent
    ],
    providers: [
        AuthService,
        AuthGuard,
        AdminService
    ]
})
export class AdminModule {}