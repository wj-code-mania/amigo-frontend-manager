import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../service/server';
import { AuthService } from '../../service/authservice';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/filter';

declare var $;

@Component({
  selector: 'manager-callback-stripe-auth',
  templateUrl: './callback-stripe-auth.component.html',
  styleUrls: ['./callback-stripe-auth.component.scss']
})
export class CallbackStripeAuthComponent implements OnInit {

  constructor(
    public serverService: ServerService,
    public authService: AuthService,
    private route: ActivatedRoute,
    public router: Router
  ) { }

  schoolId = this.authService.get('schoolId');
  secret = 'sk_test_1zL5lPq3rbbu1HxqInthWYlU';
  code = '';
  scope = '';

  ngOnInit() {

    this.route.queryParams
      .subscribe(params => {
        this.code = params.code;
        this.scope = params.scope;
        this.serverService.post('auth_stripe', {
          schoolId : this.schoolId,
          secret : this.secret,
          code : this.code,
          scope : this.scope
        }).subscribe(
          (res) => {
            this.router.navigate(['/auth/stripe']);
          }
        );        
      });
  }



  

}
