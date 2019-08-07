import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ServerService } from '../../service/server';
import { ActivatedRoute } from '@angular/router';
import { Parent } from '../../manager.model';
import { Router } from '@angular/router';
import { AuthService } from '../../service/authservice';
import {ModalDirective} from 'ngx-bootstrap/modal';
import swal from 'sweetalert2';
import { ManagerConfig } from '../../config/manager.config';

declare var $;

@Component({
  selector: 'manager-parent-info',
  templateUrl: './parent-info.component.html',
  styleUrls: ['./parent-info.component.scss']
})
export class ParentInfoComponent implements OnInit {

  @ViewChild('primaryModal') public primaryModal: ModalDirective;

  public parentId: number;
  public orders_count: number;
  public students_count: number;
  public parent_info: Parent;
  public status: string;
  public email: string;

  tblStudents: any;
  tblOrders: any;
  base_url = this.server.baseUrl;
  appManagerUrl = ManagerConfig.endPoints.manager;

  public orderId: number;
  public studentName: string;
  public schoolName: string;
  public className: string;
  public createdAt: string;
  public changedAt: string;
  public products: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private server: ServerService,
    public serverService: ServerService,
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.parentId = params['id'];
      this.getParentById(this.parentId);
      this.getParentOrdersCountById(this.parentId);
      this.getParentStudentsCountById(this.parentId);
    });
  }

  formatModal(){
    
  }

  refreshTable() {
    this.tblStudents.draw(false);
    this.tblOrders.draw(false);
  }

  getParentById(parentId) {
    this.server.post('get_parent', {parentId: parentId}, true).subscribe(resp => {
      if (resp['code'] === 200) {
        this.parent_info = resp['parent_info'];
        
      } else {
        this.parent_info = null;
      }
    });
  }

  getParentOrdersCountById(parentId) {
    this.server.post('get_orders_count', {parentId: parentId}, true).subscribe(resp => {
      if (resp['code'] === 200) {
        this.orders_count = resp['orders_count'];
        
      } else {
        this.orders_count = null;
      }
    });
  }

  getParentStudentsCountById(parentId) {
    this.server.post('get_students_count', {parentId: parentId}, true).subscribe(resp => {
      if (resp['code'] === 200) {
        this.students_count = resp['students_count'];
        
      } else {
        this.students_count = null;
      }
    });
  }

  ngAfterViewInit(): void {

    const authSvc = this.authService;
    const routerPt = this.router;

    $('#studentsTable').DataTable({
      pagingType: 'full_numbers',
      lengthMenu: [[10, 25, 50, -1], [10, 25, 50, 'Show All']],
      responsive: true,
      processing: true,
      serverSide: true,
      aaSorting : [[1, 'desc']],
      ajax: {
        url: this.server.baseUrl + 'get_students/'+this.parentId,
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
        data: '',
        name: 'className',
        title: 'Class',
        render: function(data, type, row) {classInfo
          var classInfo = row.classInfo;
          return classInfo[0].name;
        }
      },{
        data: 'name',
        name: 'name',
        title: 'Name'
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
      }]
    });

    $('#ordersTable').DataTable({
      pagingType: 'full_numbers',
      lengthMenu: [[10, 25, 50, -1], [10, 25, 50, 'Show All']],
      responsive: true,
      processing: true,
      serverSide: true,
      aaSorting : [[1, 'desc']],
      ajax: {
        url: this.server.baseUrl + 'get_orders/'+this.parentId,
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
          <button mat-raised-button mat-min-fab class="btn btn-sm btn-success btn-just-icon btn-round more" title="View More">\
            <i class="fa fa-eye-slash"> View Detail</i>\
          </button>';

          return template;
        }
      }]
    });

    const studentsTable = $('#studentsTable').DataTable();
    this.tblStudents = studentsTable;

    const ordersTable = $('#ordersTable').DataTable();
    this.tblOrders = ordersTable;
    
    var thisObj = this;
    
    ordersTable.on('click', '.more', function (e: any) {

      const $tr = $(this).closest('tr');
      const data = ordersTable.row($tr).data();
      
      thisObj.server.post('get_order_detail', {orderId: data.id}, true).subscribe(resp => {
        if (resp['code'] === 200) {
          var orderData = resp['data'];
          
          thisObj.schoolName = orderData.schoolInfo[0].name;
          thisObj.className = orderData.classInfo[0].name;
          thisObj.studentName = orderData.studentInfo[0].name;
          thisObj.orderId = data.id;
          thisObj.createdAt = orderData.createdAt;
          thisObj.changedAt = orderData.changedAt;
          thisObj.products = orderData.products;

          $("#modal_open").click();
        }
      });
      e.preventDefault();
    });
  }
}
