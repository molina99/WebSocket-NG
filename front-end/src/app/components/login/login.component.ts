import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../services/login.service';
import {DataRx} from '../../models/data-rx';
import {PermissionsService} from '../../services/permissions.service';
import {Router} from '@angular/router';

export interface DataLogin {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  dataLogin: DataLogin;

  constructor(
    private loginService: LoginService,
    private permissionsService: PermissionsService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.dataLogin = {
      email: '',
      password: ''
    };
  }

  login() {
    const data = {
      user: {
        email: this.dataLogin.email,
        password: this.dataLogin.password
      }
    };
    this.loginService.login(data).subscribe((res: DataRx) => {
      console.log(res.token);
      // if (res.transaction) {
      if (this.permissionsService.decodeToken(res.token)) {
        console.log(5);
        this.router.navigate(['/cards']);
        // console.log(this.permissionsService.obtainUserLogin());
      }
      // } else {
      //   this.dataLogin.email = '';
      //   this.dataLogin.password = '';
      //   alert(res.sms);
      // }
    }, error => {
      this.dataLogin.email = '';
      this.dataLogin.password = '';
      console.error(error);
    });
  }

}
