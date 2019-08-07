import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ServerService } from '../service/server';
import { Router } from '@angular/router';
import { AuthService } from '../service/authservice';
import swal from 'sweetalert2';

declare var $;

@Component({
  selector: 'manager-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent implements OnInit {
 
  constructor(
    public serverService: ServerService,
    public server: ServerService,
    public authService: AuthService,
    public router: Router
  ) {
    
  }

  curPwd = '';
  newPwd = '';
  cfmPwd = '';

  ngOnInit() {
  }

  changePwd() {
    if(this.newPwd == this.cfmPwd){
      this.serverService.post('changePwd', {
        curPwd: this.curPwd,
        newPwd: this.newPwd
      }, true).subscribe(
        (resp) => {
          if (resp['code'] === 200) {
            if(resp['msg'] === 'Success'){
              swal({
                title: 'Change password',
                text: 'Change password succeed',
                type: 'success',
                buttonsStyling: false,
                confirmButtonClass: 'btn btn-success',
                confirmButtonText: 'Ok'
              }).catch(swal.noop);
            }else{
              swal({
                title: 'Failed to submit',
                text: 'Wrong current password',
                type: 'error',
                buttonsStyling: false,
                confirmButtonClass: 'btn btn-danger',
                confirmButtonText: 'Ok'
              }).catch(swal.noop);
            }
          } else {
            swal({
              title: 'Failed to submit',
              text: 'Wrong current password',
              type: 'error',
              buttonsStyling: false,
              confirmButtonClass: 'btn btn-danger',
              confirmButtonText: 'Ok'
            }).catch(swal.noop);
          }
        },
        err => {
          swal({
            title: 'Failed to submit',
            text: 'Service denied',
            type: 'error',
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-danger',
            confirmButtonText: 'Ok'
          }).catch(swal.noop);
        }
      );
    }else{
      swal({
        title: 'Failed to submit',
        text: 'Wrong confirm password',
        type: 'error',
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-danger',
        confirmButtonText: 'Ok'
      }).catch(swal.noop);
    }
  }

}
