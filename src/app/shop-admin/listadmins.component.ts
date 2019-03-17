import { OnInit, Component } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ToastrService } from '../common/toastr.service';
import { AdminService } from "./admin.service";
import { AuthService } from '../user/auth.service';

@Component({
    templateUrl: './listadmins.component.html'
})

export class ListAdminsComponent implements OnInit {
    
    reportForm: FormGroup
    userObj: any;
    reportTitle: string;
    
    admins;
    totalrows: number;
    pgCounter: number;

    qreport: string;
    qpage: number;


    constructor(private fb: FormBuilder,
        private authService: AuthService,
        private adminService: AdminService,
        private route: ActivatedRoute,
        private router: Router,
        private toastr: ToastrService,
        ) {}

    report = new FormControl('ALL_APPROVED');

    ngOnInit(){
        this.userObj = this.authService.currentUser; 

        this.reportForm = this.fb.group({
            report: this.report
        })

        this.route.queryParams.forEach((params: Params)=> {
            this.qreport = params['report'] || '';
            this.qpage = params['page'] || '';

            if (this.qreport !== '') {
                let payload: any = {};
                payload.report = this.qreport;
                payload.page = this.qpage;
                // to maintain state
                this._fetchReport(payload);
                
                this.reportForm.patchValue({report: this.qreport});
            }
        });
    }

    getReport():void {
        if (this.reportForm.valid) { 
            const formValues = this.reportForm.value;
            this._fetchReport(formValues)
        }
    }

    _fetchReport(formValues) {
        this.adminService.getAdmins(formValues)
            .subscribe(data => {
                if (data.success === false) {
                    if (data.errcode){
                        this.authService.logout();
                        this.router.navigate(['login']);
                      }
                      this.toastr.error(data.message);
                } else {
                    
                    this.admins = data.data.data.docs; // LOL refactor
                    this.totalrows = +data.data.data.total;          
                    this.pgCounter = Math.floor((this.totalrows + 10 - 1) / 10); 
                }
            })

    }

    showAdmin(adminId): void {

    }

    editAdminPrivileges(adminId): void {

    }

    cofirmAdminDel(adminId, idx) {

    }

    createPager(pgCounter) {
        const pagesNumbers = [];
        for (let i =0; i<pgCounter; i++) {
            pagesNumbers.push(i);
        }
        return pagesNumbers;
    }

    setPage(page) {
        this.router.navigate(['api/shop-admins/'], {
            queryParams: {
                report: this.qreport,
                page: this.qpage || 1
            }
        })
    }

}
