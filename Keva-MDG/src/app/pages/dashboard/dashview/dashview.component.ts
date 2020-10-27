import { Component, OnInit } from '@angular/core';
import { ComponentLoaderService } from 'src/app/shared/component-loader.service';
import { DOCUMENT } from '@angular/common';
import { Inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DashviewService } from './dashview.service';
import { LoginService } from '../../auth/login/login.service';
@Component({
  selector: 'app-dashview',
  templateUrl: './dashview.component.html',
  styleUrls: ['./dashview.component.css']
})
export class DashviewComponent implements OnInit {

  countList: any[];
  masterList: any[];
  href: string;
  mdg: boolean;
  username: any;
  password: any;



  constructor(@Inject(DOCUMENT) private document: Document,
    private componentLoaderService: ComponentLoaderService,
    private dashviewService: DashviewService,
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit() {
    debugger
    let val = Number(window.localStorage.getItem("logout"))
    console.log(val)
    if (val != 1) {
      this.loginService.login().subscribe(
        data => {
          let resp = JSON.parse(data['_body']);
           debugger
          console.log("response", resp);
          if (resp.responseCode == 200) {
            this.username = resp.succesObject.username;
            this.password = resp.succesObject.password;
            this.loginService.postlogin(this.username, this.password).subscribe(data => {
              let loginRes = JSON.parse(data['_body']);



              // For the kiosk routing
              window.open('/kiosk', "_self");

              localStorage.setItem('kiosk_access_token', loginRes.access_token);
              // localStorage.setItem('logout', "1");
              localStorage.setItem('userId', loginRes.userDetails.userId);
              sessionStorage.setItem('kiosk_access_token', loginRes.access_token);
              sessionStorage.setItem('userId', loginRes.userDetails.userId)
              window.localStorage.removeItem("logout")
              if (loginRes.status === 401) {
                window.localStorage.removeItem("logout")
                this.router.navigate(['/login']);

              }

            }, error => {
              if (error.status === 500) {

                window.localStorage.removeItem("kiosk_access_token");
                sessionStorage.removeItem("kiosk_access_token");
                window.localStorage.clear();
                window.localStorage.removeItem("logout")
                this.router.navigate(['/login']);

              }
            })

          } else {
            window.localStorage.removeItem("logout")
            window.localStorage.removeItem("kiosk_access_token");
            sessionStorage.removeItem("kiosk_access_token");
            window.localStorage.clear();
            this.router.navigate(['/login']);

          }
        })
    } else {
      window.localStorage.removeItem("logout")

      this.router.navigate(['/login'])
     
    }

    // // // /** local login code pls dont commit */
    // if (localStorage.getItem('kiosk_access_token') == null) {
    //   this.router.navigate(['/login']);
    // } /** local login code ends **/


    // if (localStorage.getItem('kiosk_access_token') != null) {
    //   console.log("inside")
    //   window.open('/kiosk', "_self");
    // }
    // let url = window.location.href;
    // console.log("Windows url",url);
    // //this.href = url.split('/kdesk/')[0];
  }


  login() {
    console.log("login method");
    this.loginService.login().subscribe(
      data => {
        let resp = JSON.parse(data['_body']);
        console.log("response", resp);
      })
  }


  route(data) {
    console.log(data);
    if (data.moduleId == 3) {
      this.mdg = false
      window.open(this.href + '/kiosk', "_self");
    }
    else if (data.moduleId == 2) {
      this.mdg = false
      window.open(this.href + '/commonmaster', "_self");
    }
    else if (data.moduleId == 1) {

      this.mdg = false
      window.open(this.href + '/materialmaster', "_self");


      // this.dashviewService.mdgrights ().subscribe(data => {
      //   let response = JSON.parse(data['_body']);
      //   console.log("response",response);
      //   if(response.responseCode == 200){
      //     this.masterList = response.succesObject;
      //     this.mdg = true
      //   }    

      // })
    }
  }

  moduleRights() {
    this.dashviewService.rights().subscribe(data => {
      let response = JSON.parse(data['_body']);
      console.log("response", response);
      this.countList = response.succesObject;

    })
  }
  // MasterRoute(data){
  //   if(data.moduleId == 1){
  //     this.mdg = false
  //     window.open(this.href+'/materialmaster',"_self");
  //   }
  //   // else if(data.moduleId == 2){
  //   //   this.mdg = false
  //   //   window.open(this.href+'/commonmaster',"_self");
  //   // }
  // }

}

