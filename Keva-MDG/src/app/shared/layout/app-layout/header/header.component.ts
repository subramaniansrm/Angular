import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HeaderService } from './header.service';
import { ConfirmationDialogComponent } from '../../../../shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges {
  
  constructor(
    private router: Router,
    public headerService: HeaderService,
    private dialog: MatDialog) {
     // this.routeEvent(this.router);
   
  }
  ngOnChanges() {
  }
  ngOnInit() {
    this.routeEvent(this.router);
    // debugger
    // let acc = localStorage.getItem('kiosk_access_token');
    
    // if (acc !== null) {
   
    //   this.callnotification();
    //   let today = new Date();
    //   console.log(today);
    // }    
  }



  // callnotification() {
  //   this.headerService.mailDetails().subscribe(
  //     data => {

  //       debugger
  //       let resp = JSON.parse(data['_body']);
  //       console.log(resp);
  //       this.headerService.mailDetails1 = resp.succesObject;
  //       if (resp.succesObject != null) {
  //         this.headerService.notificationcount = resp.succesObject.length;
  //       }
  //       console.log(this.headerService.mailDetails1);
  //       this.headerService.notificationcount = this.headerService.mailDetails1.length;
  //       console.log(this.headerService.notificationcount);

  //     });
  // }
  

  routeEvent(router: Router) {
    console.log("print router url 1:" , this.router.url)
    console.log(router)
    router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        if(e.url != '/'){
        // this.call();
       // this.callnotification();
        let today = new Date();
       
      }
      console.log("print router url 2:" , this.router.url)
        // let acc = localStorage.getItem('kiosk_access_token');
        // if (acc === null && this.router.url ==='/home') {
        //   this.router.navigate(['/home']);
        // }
        // else if(acc === null && this.router.url !=='/normal')
        // {
        //   this.router.navigate(['/']);
        // }else if(sessionStorage.getItem('kiosk_access_token') === null){
        //   localStorage.clear();
        //   sessionStorage.clear();
        //   this.router.navigate(['/home']);
        // }
      }
    });
  }
  
  
  logout() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false,
      width: 'auto',
      data: {
        title: 'Confirmation',
        message: 'logout',
        btnYes: 'Yes',
        btnNo: 'No'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        window.localStorage.removeItem("kiosk_access_token");
        sessionStorage.removeItem("kiosk_access_token");
        localStorage.setItem("logout","1")
        let val= Number(localStorage.getItem("logout"))
        if(val==1){
          this.router.navigateByUrl('/login');
        }else{
          this.router.navigateByUrl('/');
        }
       
      }
    });
  }

}
