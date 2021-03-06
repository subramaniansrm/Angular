import { Component, OnInit, Inject } from '@angular/core';
import { Router } from "@angular/router";
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { LoginService } from "./login.service";
import { DOCUMENT } from '@angular/common';
import { debounceTime } from 'rxjs/operators';
import { Observable, Subject, Subscription } from 'rxjs';
import { ComponentLoaderService } from 'src/app/shared/component-loader.service';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;

  isHidden = true;
  _success = new Subject<string>();
  successMessage: string;

  constructor(private componentLoader: ComponentLoaderService
    , @Inject(DOCUMENT) private document: Document,
    private dialog: MatDialog,
    private router: Router,
    private loginService: LoginService) { }


  forgotPasswordShowDiv(divName: string) {

    if (divName === 'forgotpw') {
      this.isHidden = !this.isHidden;


    }
  }


  cancelShowDiv(divName: string, event) {
    if (divName === 'cancelBtn') {
      this.isHidden = !this.isHidden;
      this.username = '';
      this.password = '';

    }
  }


  href: string;

  ngOnInit() {
    // this.document.body.classList.add('loginonly');
    let url = window.location.href;
    // let url = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');

    console.log(localStorage.getItem('kiosk_access_token'))
    // if (localStorage.getItem('kiosk_access_token') != null) {
    //   window.localStorage.removeItem("logout")
    //   window.open(url + 'dashboard', "_self")
    // }
    this.componentLoader.display(false);
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(70000)
    ).subscribe(() => this.successMessage = null);

  }




  username: string = '';
  password: string = '';

  // login(ev) {
  //   if (this.username == '' && this.password == '') {
  //     this._success.next('Username/Password is Required');
  //   }
  //   else if (this.username != '' && this.password == '') {
  //     this._success.next('Enter your password');
  //   }
  //   else if (this.username == '' && this.password != '') {
  //     this._success.next('Enter your username');
  //   }
  //   else if (this.username != '' && this.password != '') {
  //     this.loginService.postlogin(this.username, this.password).subscribe(data => {
  //       let loginRes = JSON.parse(data['_body']);
  //       // if (loginRes.res ponseCode == '200') {
  //       localStorage.setItem('kiosk_access_token', loginRes.access_token);


  //       // IF only material master uncommand line 95 for build
  //       //  this.router.navigate(['/dashboard']);

  //       //For the kiosk routing
  //       window.open('/kiosk', "_self");
  //       console.log("kiosk")
  //       sessionStorage.setItem('kiosk_access_token', loginRes.access_token);
  //       localStorage.setItem('userId', loginRes.userDetails.userId);
  //       sessionStorage.setItem('userId', loginRes.userDetails.userId)


  //       localStorage.setItem('userName', loginRes.userDetails.firstName + " " + loginRes.userDetails.lastName);
  //       sessionStorage.setItem('userName', loginRes.userDetails.firstName + " " + loginRes.userDetails.lastName)
  //       if(loginRes.status===500){

  //         this._success.next('Unauthorized Username and Password');
  //       }
  //     }, error => {
  //       if (error.status === 401) {
  //         this._success.next('Unauthorized Username and Password');
  //       }
  //     })
  //   }
  // }


  login(ev) {
    if (this.username == '' && this.password == '') {
      this._success.next('Username/Password is Required');
    }
    else if (this.username != '' && this.password == '') {
      this._success.next('Enter your password');
    }
    else if (this.username == '' && this.password != '') {
      this._success.next('Enter your username');
    }
    else if (this.username != '' && this.password != '') {
      this.loginService.postlogin(this.username, this.password).subscribe(data => {
        let loginRes = JSON.parse(data['_body']);



        // For the kiosk routing
        window.open('/kiosk', "_self");
        localStorage.setItem('kiosk_access_token', loginRes.access_token);
        localStorage.setItem('userId', loginRes.userDetails.userId);
        sessionStorage.setItem('kiosk_access_token', loginRes.access_token);
        sessionStorage.setItem('userId', loginRes.userDetails.userId)
        if (loginRes.status === 500) {

          this._success.next('Unauthorized Username and Password');
        }

      }, error => {
        if (error.status === 500) {
          this._success.next('Unauthorized Username and Password');
        }
      })
    }
  }






  forgotpassword(ev): void {

    console.log("Forget Event", ev);
    if (ev.target[0].value !== "") {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        disableClose: false,
        width: 'auto',
        data: {
          title: 'Confirmation',
          message: 'temppassword',
          btnYes: 'Yes',
          btnNo: 'No',
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result == true) {
          this.loginService.postforgotpw(this.username).subscribe(data => {
            let forgotPasswordRes = JSON.parse(data['_body']);
            if (forgotPasswordRes.responseCode == 200) {
              this._success.next(forgotPasswordRes.responseMessage);
              setTimeout(() => {
                this.isHidden = !this.isHidden;
              }, 2000);
            } else {
              this._success.next(forgotPasswordRes.responseMessage);
              setTimeout(() => {
                this.isHidden = !this.isHidden;
              }, 2000);
            }
          }, error => {
            if (error.status === 401) {
              alert(error);
            }
          })
        }
        else {
          this.isHidden = !this.isHidden;
        }
      })
    }
    else {
      this.successMessage = "Please enter the valid user name";
    }
  }

  userId(event) {
    console.log("user id event", event.srcElement.value);
    let username = event.srcElement.value;
    if (username !== "") {
      this.successMessage = "";
    } else {
      this.successMessage = "Please enter the valid user name";
    }
  }
}

