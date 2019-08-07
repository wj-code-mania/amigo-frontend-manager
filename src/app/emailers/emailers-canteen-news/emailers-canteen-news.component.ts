import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ServerService } from '../../service/server';
import { Router } from '@angular/router';
import { AuthService } from '../../service/authservice';
import {ModalDirective} from 'ngx-bootstrap/modal';

import swal from 'sweetalert2';

declare var $;

@Component({
  selector: 'manager-emailers-canteen-news',
  templateUrl: './emailers-canteen-news.component.html',
  styleUrls: ['./emailers-canteen-news.component.scss']
})
export class EmailersCanteenNewsComponent implements OnInit {

  @ViewChild('primaryModal') public primaryModal: ModalDirective;

  modal_title = "+ Add New News";
  request_type = "add";

  id = "";
  schoolId = this.authService.get('schoolId');
  subject = '';
  content = '';
  status = 'enabled';

  tblNews: any;
  base_url = this.server.baseUrl;

  constructor(
    public serverService: ServerService,
    public server: ServerService,
    public authService: AuthService,
    public router: Router) { }

  ngOnInit() {
    
  }

  formatModal(){
    this.modal_title = "+ Add New News";
    this.request_type = "add";
    this.id = "";
    this.subject = '';
    this.content = '';
    this.status = 'enabled';
  }

  refreshTable() {
    this.tblNews.draw(false);
  }

  submit() {
    this.serverService.post(this.request_type + '_news', {
      id: this.id,
      subject: this.subject,
      content: this.content,
      status: this.status
    }, true).subscribe(
      (resp) => {
        if (resp['code'] === 200) {
          if(resp['msg'] == 'Success'){
            swal({
              title: 'Success',
              text: 'News ' +this.request_type+ ' successfully done.',
              type: 'success',
              buttonsStyling: false,
              confirmButtonClass: 'btn btn-success',
              confirmButtonText: 'Ok'
            }).catch(swal.noop);
            this.primaryModal.hide();
            this.tblNews.ajax.reload(null, false);
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

  ngAfterViewInit(): void {
    const authSvc = this.authService;
    const routerPt = this.router;
    $('#newsTable').DataTable({
      pagingType: 'full_numbers',
      lengthMenu: [[10, 25, 50, -1], [10, 25, 50, 'Show All']],
      responsive: true,
      processing: true,
      serverSide: true,
      aaSorting : [[1, 'desc']],
      ajax: {
        url: this.server.baseUrl + 'get_news',
        type: 'POST',
        headers: {'Authorization': this.authService.getToken()},
        dataSrc: 'data',
        error: function(jqXhr, textStatus, errorThrown) {
          if (errorThrown === 'Unauthorized' || jqXhr.responseText === 'jwt expired') {
            authSvc.destroy();
            routerPt.navigate(['/login']);
          }
        }
      },
      columns: [{
        data: 'id',
        name: 'id',
        title: 'Id',
      },{
        data: 'subject',
        name: 'subject',
        title: 'Subject'
      },{
        data: 'status',
        name: 'status',
        title: 'Status',
        render: function(data, type, row) {
          const status = {
            enabled: {title: 'Enabled', class: 'btn-success'},
            disabled: {title: 'Disabled', class: 'btn-danger'}
          };
          return '<button mat-raised-button class="btn ' + status[row.status].class + ' btn-sm">' + status[row.status].title + '</button>';
        }
      }, {
        width: 200,
        title: 'Actions',
        sortable: false,
        render: function (data, type, row) {
          let template = '\
          <button mat-raised-button mat-min-fab class="btn btn-sm btn-primary btn-just-icon btn-round edit" title="Edit">\
            <i class="fa fa-edit"> Edit</i>\
          </button>';

          template += '\
          <button mat-raised-button mat-min-fab class="btn btn-sm btn-danger btn-just-icon btn-round remove" title="Delete">\
            <i class="fa fa-remove"> Delete</i>\
          </button>';

          return template;
        }
      }]
    });

    const table = $('#newsTable').DataTable();
    this.tblNews = table;
    
    var thisObj = this;

    table.on('click', '.edit', function (e: any) {
      $("#modal_open").click();
      e.preventDefault();
      const $tr = $(this).closest('tr');
      const data = table.row($tr).data();
      thisObj.request_type = "edit";
      thisObj.id = data.id;
      thisObj.subject = data.subject;
      thisObj.content = data.content;
      thisObj.status = data.status;
      thisObj.modal_title = 'Edit News';
      $("id").val(data.id);
      $("name").val(data.name);
      $("status").val(data.status);
    });

    table.on('click', '.remove', function (e: any) {
      swal({
        title: 'Delete',
        text: 'Are you sure?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        buttonsStyling: false
      }).then( (rest) => {
        if (rest.value === undefined) {
          return;
        }

        const $tr = $(this).closest('tr');
        const data = table.row($tr).data();
        thisObj.server.delete('delete_news/' + data.id, true).subscribe(
          (resp) => {
            thisObj.refreshTable();
            swal({
              title: 'Success',
              text: 'Deleted!',
              type: 'success',
              buttonsStyling: false,
              confirmButtonClass: 'btn btn-success',
              confirmButtonText: 'OK'
            }).catch(swal.noop);
          }, (err) => {
            swal({
              title: 'Failed to operate',
              text: err.error,
              type: 'error',
              buttonsStyling: false,
              confirmButtonClass: 'btn btn-danger',
              confirmButtonText: 'Confirm'
            }).catch(swal.noop);
          }
        );

      }).catch(swal.noop);

      e.preventDefault();
    });
  }
}
