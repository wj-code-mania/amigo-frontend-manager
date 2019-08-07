import { Component, OnInit } from '@angular/core';
import { ServerService } from '../service/server';
import { Router } from '@angular/router';
import { AuthService } from '../service/authservice';

import swal from 'sweetalert2';

declare var $;

@Component({
  selector: 'manager-stripe',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.scss']
})
export class StripeComponent implements OnInit {

  constructor(
    public serverService: ServerService,
    public server: ServerService,
    public authService: AuthService,
    public router: Router) { }

  schoolId = this.authService.get('schoolId');
  clientID = "ca_AkcWuztRxWkzvR7W8wvjhgSk1uhhx423";
  schoolInfo = [];
  authorized = false;
  stripeUserId = '';

  ngOnInit() {
    this.server.get('get_school_info', true).subscribe(resp => {
      if (resp['code'] === 200) {
        var school_info = resp['school_info'];
        this.schoolInfo = school_info;
        this.authorized = school_info.authorized;
        this.stripeUserId = school_info.stripe_user_id;
      } else {
        this.schoolInfo = [];
      }
    });
  }
  


}
