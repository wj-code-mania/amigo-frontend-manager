import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../service/server';
import { Router } from '@angular/router';
import { AuthService } from '../../service/authservice';

import swal from 'sweetalert2';

declare var $;

@Component({
  selector: 'manager-emailers-send',
  templateUrl: './emailers-send.component.html',
  styleUrls: ['./emailers-send.component.scss']
})
export class EmailersSendComponent implements OnInit {

  constructor(
    public serverService: ServerService,
    public server: ServerService,
    public authService: AuthService,
    public router: Router) { }

  from = 'amigoschoolsdev@gmail.com';
  subject = '';
  content = '';

  ngOnInit() {
  }

  sendEmail(){
    this.serverService.post('send_email', {
      from: this.from,
      subject: this.subject,
      content: this.content
    }, true).subscribe(
      (resp) => {
        if (resp['code'] === 200) {
          if(resp['msg'] == 'Success'){
            swal({
              title: 'Success',
              text: 'Email sent successfully.',
              type: 'success',
              buttonsStyling: false,
              confirmButtonClass: 'btn btn-success',
              confirmButtonText: 'Ok'
            }).catch(swal.noop);
          }else{
            swal({
              title: 'Failed to submit',
              text: 'Duplicated information.',
              type: 'error',
              buttonsStyling: false,
              confirmButtonClass: 'btn btn-danger',
              confirmButtonText: 'Ok'
            }).catch(swal.noop);
          }
        } else {
          swal({
            title: 'Failed to submit',
            text: 'Service denied',
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
  }

}
