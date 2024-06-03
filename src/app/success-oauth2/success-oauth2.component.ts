import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-success-oauth2',
  templateUrl: './success-oauth2.component.html',
  styleUrls: ['./success-oauth2.component.scss'],
  standalone: true
})
export class SuccessOauth2Component implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    console.log('successful oauth2 login');
    this.userService.setOAuth2Flag('true');
    this.router.navigate((['']));
  }

}
