import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ServerService } from '../service/server';
import { Router } from '@angular/router';
import { AuthService } from '../service/authservice';
import swal from 'sweetalert2';

declare var $;

@Component({
  selector: 'manager-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  tblOrderHistory: any;
  base_url = this.server.baseUrl;

  constructor(
    public server: ServerService,
    public authService: AuthService,
    public router: Router) { }

  ngOnInit() {
  }

  refreshTable() {
    this.tblOrderHistory.draw(false);
  }

  ngAfterViewInit(): void {
    const authSvc = this.authService;
    const routerPt = this.router;
    $('#orderHistoryTable').DataTable({
      pagingType: 'full_numbers',
      lengthMenu: [[10, 25, 50, -1], [10, 25, 50, 'Show All']],
      responsive: true,
      processing: true,
      serverSide: true,
      aaSorting : [[1, 'desc']],
      ajax: {
        url: this.server.baseUrl + 'get_order_history',
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
        Name: 'id',
        title: 'Order Id',
      },{
        data: '',
        name: 'class_name',
        title: 'Class',
        render: function(data, type, row) {
          var class_info = row.classInfo;
          return class_info[0].name;
        }
      },{
        data: '',
        name: 'parent_name',
        title: 'Parent',
        render: function(data, type, row) {
          var parent_info = row.parentInfo;
          return parent_info[0].name;
        }
      },{
        data: '',
        name: 'student_name',
        title: 'Student',
        render: function(data, type, row) {
          var student_info = row.studentInfo;
          return student_info[0].name;
        }
      },{
        data: '',
        name: 'products',
        title: 'Products',
        render: function(data, type, row) {
          var products = row.products;
          return products.length;
        }
      },{
        data: 'orderPrice',
        Name: 'orderPrice',
        title: 'Order Price'
      },{
        data: '',
        name: 'status',
        title: 'Status',
        render: function(data, type, row) {
          const status = {
            waiting: {title: 'Waiting For Payment', class: 'btn-primary'},
            placed: {title: 'Placed', class: 'btn-primary'},
            cancelledByParent: {title: 'Cancelled By Parent', class: 'btn-danger'},
            cancelledByManager: {title: 'Cancelled By Manager', class: 'btn-danger'},
            delivered: {title: 'Delivered', class: 'btn-success'},
          };
          return '<button mat-raised-button class="btn ' + status[row.status].class + ' btn-sm">' + status[row.status].title + '</button>';
        }
      },{
        data: '',
        name: 'isCompleted',
        title: 'Is Completed',
        render: function(data, type, row) {
          const status = {
            completed: {title: 'Completed', class: 'btn-success'},
            incompleted: {title: 'Incompleted', class: 'btn-danger'}
          };
          return '<button mat-raised-button class="btn ' + status[row.isCompleted].class + ' btn-sm">' + status[row.isCompleted].title + '</button>';
        }
      },{
        data: 'createdAt',
        Name: 'createdAt',
        title: 'Ordered Date'
      },{
        data: 'changedAt',
        Name: 'changedAt',
        title: 'Deliverd Date'
      }, {
        width: 200,
        title: 'Actions',
        sortable: false,
        render: function (data, type, row) {

          let template = '\
          <button mat-raised-button mat-min-fab class="btn btn-sm btn-danger btn-just-icon btn-round cancel" title="Cancel">\
            <i class="fa fa-remove"> Cancel</i>\
          </button>';

          return template;
        }
      }]
    });

    const table = $('#orderHistoryTable').DataTable();
    this.tblOrderHistory = table;
    
    var thisObj = this;

    table.on('click', '.cancel', function (e: any) {
      swal({
        title: 'Cancel',
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

        if(data.status == "delivered"){
          swal({
            title: 'Failed to submit',
            text: 'Already Delivered',
            type: 'error',
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-danger',
            confirmButtonText: 'Ok'
          }).catch(swal.noop);
        }else if(data.status == "cancelledByParent" || data.status == "cancelledByManager"){
          swal({
            title: 'Failed to submit',
            text: 'Already Cancelled',
            type: 'error',
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-danger',
            confirmButtonText: 'Ok'
          }).catch(swal.noop);
        }else{
          thisObj.server.post('cancel_order', {id: data.id}, true).subscribe(
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
        }
      }).catch(swal.noop);

      e.preventDefault();
    });
  }
}
