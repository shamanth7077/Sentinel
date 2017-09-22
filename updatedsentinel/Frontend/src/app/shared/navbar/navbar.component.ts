import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import {Router} from "@angular/router";
import {DividendService} from "../services/dividend.service";
declare var $: any;

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  public user: string;
  public COAF: string;


    constructor(private users: UserService,
                private divService: DividendService,
                private router: Router) {
      this.user = '' + this.users.getUser();
      this.users.userObs.subscribe(
          res => {
              this.user = '' + res;
              this.router.navigate(['/home']);
          },
          err => console.log('Error fetching changed user')
      );

      this.COAF = this.divService.getCOAF();
      this.divService.coafObs.subscribe(
          res => {
            this.COAF = res;
          }
      );
  }

  switchUser() {
    this.users.setUser(+this.user);
  }

  clearCOAF() {
    this.divService.setCOAF(undefined);
    this.router.navigate(['/home']);
  }

  ngOnInit() {
    $('.ui.dropdown')
      .dropdown();
  }
}
