import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router, NavigationEnd } from '@angular/router';
import { HeaderService } from '../../shared/layout/app-layout/header/header.service';
import { environment} from '../../../environments/environment';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.css']
})
export class LeftNavComponent implements OnInit {
 
  fullurl = environment.API_HOST;
  url: string = this.fullurl.substring(0, this.fullurl.length - 3);
  // loginstatus:boolean;
  userDetails: any;
  mailDetails: any;
  appcount: any;
  notificationcount: any;
  approvallist: any = [];
  masterlist: any = [];
  configlist: any = [];
  transactionlist: any = [];
  

  constructor(private router: Router,
    private dialog: MatDialog, 
    private headerService: HeaderService,
    // private chatTriggerService: ChatTriggerService,
    ) {
  }




  IsHidden = true;
  IsIsHidden = true;
  IsIsIsHidden = true;

  onSelect1(){
    this.IsHidden= !this.IsHidden;
  }

  onSelect2(){
    this.IsIsHidden= !this.IsIsHidden;
  }

  onSelect3(){
    this.IsIsIsHidden= !this.IsIsIsHidden;
  }

  sidenavWidth = 50;
  // increase() {
  //   this.sidenavWidth = 213;
  // }
  // decrease() {
  //   this.sidenavWidth = 50;
  // }  
  isActive : boolean = true;

  increase(): void {
    if(this.isActive) {
      this.sidenavWidth = 213;
      this.isActive = !this.isActive 
    }
    else {
      this.sidenavWidth = 50;
      this.isActive = !this.isActive 
    }
  }





  
  ngOnInit() {
    let acc = localStorage.getItem('kiosk_access_token');
    let url = window.location.href;
    console.log("Windows url",url);
    this.href = url.split('/common/')[0];
    this.userProfileDetails();
    
  }
 

  userProfileDetails() {
    let userDetails = this.headerService.headerDetails().subscribe(
      data => {
        let resp =  JSON.parse(data['_body']) ;
        this.userDetails = resp.succesObject;
        //this.headerService.changeMessage(this.userDetails.screenVoList);
        //this.masterlist = this.userDetails.screenVoList.filter(s => s.screenTypeFlag.includes('M'));
        //this.transactionlist = this.userDetails.screenVoList.filter(s => s.screenTypeFlag.includes('T'));
        //this.configlist = this.userDetails.screenVoList.filter(s => s.screenTypeFlag.includes('C'));
        //localStorage.setItem('userId', resp.succesObject.userId);
      },
      error => {
        if (error.status === 401) {
          alert('Error');
        }
      }
    );
  }


  
 
  logout() {


    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false,
      panelClass: 'btnCenter',
      width: 'auto',
      data: {
        title: 'Confirmation',
        message: 'logout',
        btnYes: 'Yes',
        btnNo: 'No'
      }
      
    });
    dialogRef.afterClosed().subscribe(data => {
      if(data == true){
      window.localStorage.removeItem("kiosk_access_token");
      window.localStorage.clear();
      sessionStorage.clear();
      window.open(this.href+'/common/',"_self","", true)
      // this.chatTriggerService.changeStatus('close');
      }
    });
  }

  routerUrlCofig(path){
    this.router.navigate([path]);
  }
  
  windowurl: string;
  href: string;
  dashboard(){
    this.windowurl = window.location.host;
    this.href = this.windowurl.split('/commonmaster/')[0];
    console.log('path',this.href+'/common');
    window.open('/common',"_self");

  }
  
  tray(path){
    alert(this.href+'/common')
    this.router.navigateByUrl(this.href+'/common')
  }

}
