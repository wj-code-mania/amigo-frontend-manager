import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ServerService } from '../service/server';
import { Router } from '@angular/router';
import { AuthService } from '../service/authservice';
import { formatDate } from '@angular/common';
import { ModalDirective } from 'ngx-bootstrap/modal';
import swal from 'sweetalert2';

declare var $;

@Component({
  selector: 'manager-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  @ViewChild('classModal') public classModal: ModalDirective;
  @ViewChild('classTypeModal') public classTypeModal: ModalDirective;
  @ViewChild('holidayModal') public holidayModal: ModalDirective;
  @ViewChild('mealModal') public mealModal: ModalDirective;

  base_url = this.server.baseUrl;
  
  //school
  schoolId = this.authService.get('schoolId');
  schoolName = '';
  schoolAddress = '';
  schoolImg = '';
  schoolOnDays = '';
  onDaysMon = true;
  onDaysTue = true;
  onDaysWed = true;
  onDaysThu = true;
  onDaysFri = true;
  onDaysSat = false;
  onDaysSun = false;
  holidayCnt = 0;
  mealCnt = 0;
  classCnt = 0;

  class_type_list = [];

  uploadedFiles: Array < File > ;

  fileChange(element) {
    this.uploadedFiles = element.target.files;
  }

  uploadLogo() {
    var thisObj = this;
    let formData = new FormData();
    for (var i = 0; i < this.uploadedFiles.length; i++) {
        formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
    }
    this.serverService.post('upload_school_logo', formData, true).subscribe(
      (resp) => {
        swal({
          title: 'Success',
          text: 'School logo succeessfully changed.',
          type: 'success',
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-success',
          confirmButtonText: 'Ok'
        }).catch(swal.noop);
        thisObj.schoolImg = resp['data'];
      }
    );
  }

  getClassTypes() {
    this.server.get('get_class_type_list', true).subscribe(resp => {
      if (resp['code'] === 200) {
        this.class_type_list = resp['class_type_list'];
      } else {
        this.class_type_list = [];
      }
    });
  }

  public schoolInfo: any;

  //class type
  classTypeModalTitle = '+ Add New Class Type';
  classTypeRequestType = 'add';
  classTypeId = '';
  classTypeName = '';
  classTypeStatus = 'enabled';

  //class
  classModalTitle = '+ Add New Class';
  classRequestType = 'add';
  classId = '';
  className = '';
  classType = '';
  classStatus = 'enabled';
  
  //holiday
  holidayModalTitle = '+ Add New Holiday';
  holidayRequestType = 'add';
  holidayId = '';
  holidayName = '';
  holidayStartDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  holidayEndDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  holidayStatus = 'enabled';
  
  //meal
  mealModalTitle = '+ Add New Meal';
  mealRequestType = 'add';
  mealId = '';
  mealName = '';
  mealStatus = 'enabled';

  //class

  tblClassTypes: any;
  tblClasses: any;
  tblHolidays: any;
  tblMeals: any;

  constructor(
    public serverService: ServerService,
    public server: ServerService,
    public authService: AuthService,
    public router: Router
  ) {
    
  }

  ngOnInit() {
    this.getSchoolInfo();
    this.getClassTypes();
  }

  schoolSubmit() {
    
    this.schoolOnDays= '';
    if($("input[name=onDaysMon]").is(':checked')){
      this.onDaysMon =  true;
      this.schoolOnDays+= 'Y';
    }else{
      this.onDaysMon =  false;
      this.schoolOnDays+= 'N';
    }
    if($("input[name=onDaysTue]").is(':checked')){
      this.onDaysTue =  true;
      this.schoolOnDays+= 'Y';
    }else{
      this.onDaysTue =  false;
      this.schoolOnDays+= 'N';
    }
    if($("input[name=onDaysWed]").is(':checked')){
      this.onDaysWed =  true;
      this.schoolOnDays+= 'Y';
    }else{
      this.onDaysWed =  false;
      this.schoolOnDays+= 'N';
    }
    if($("input[name=onDaysThu]").is(':checked')){
      this.onDaysThu =  true;
      this.schoolOnDays+= 'Y';
    }else{
      this.onDaysThu =  false;
      this.schoolOnDays+= 'N';
    }
    if($("input[name=onDaysFri]").is(':checked')){
      this.onDaysFri =  true;
      this.schoolOnDays+= 'Y';
    }else{
      this.onDaysFri =  false;
      this.schoolOnDays+= 'N';
    }
    if($("input[name=onDaysSat]").is(':checked')){
      this.onDaysSat =  true;
      this.schoolOnDays+= 'Y';
    }else{
      this.onDaysSat =  false;
      this.schoolOnDays+= 'N';
    }
    if($("input[name=onDaysSun]").is(':checked')){
      this.onDaysSun =  true;
      this.schoolOnDays+= 'Y';
    }else{
      this.onDaysSun =  false;
      this.schoolOnDays+= 'N';
    }

    this.serverService.post('edit_school', {
      name: this.schoolName,
      address: this.schoolAddress,
      onDays: this.schoolOnDays
    }, true).subscribe(
      (resp) => {
        if (resp['code'] === 200) {
          if(resp['msg'] == 'Success'){
            swal({
              title: 'Submit succeed',
              text: 'Sumit succeessfully done.',
              type: 'success',
              buttonsStyling: false,
              confirmButtonClass: 'btn btn-success',
              confirmButtonText: 'Ok'
            }).catch(swal.noop);
          }else{
            swal({
              title: 'Failed to submit',
              text: 'Service denied',
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

  refreshClassTypesTable() {
    this.tblClassTypes.draw(false);
  }

  refreshClassesTable() {
    this.tblClasses.draw(false);
  }

  refreshHolidaysTable() {
    this.tblHolidays.draw(false);
  }

  refreshMealsTable() {
    this.tblMeals.draw(false);
  }

  formatClassTypeModal(){
    this.classTypeModalTitle = '+ Add New Class Type';
    this.classTypeRequestType = 'add';
    this.classTypeId = '';
    this.classTypeName = '';
    this.classTypeStatus = 'enabled';
  }

  formatClassModal(){
    this.classModalTitle = '+ Add New Class';
    this.classRequestType = 'add';
    this.classId = '';
    this.className = '';
    this.classType = '';
    this.classStatus = 'enabled';
  }
  
  formatHolidayModal(){
    this.holidayModalTitle = '+ Add New Holiday';
    this.holidayRequestType = 'add';
    this.holidayId = '';
    this.holidayName = '';
    this.holidayStartDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.holidayEndDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.holidayStatus = 'enabled';
  }
  
  formatMealModal(){
    this.mealModalTitle = '+ Add New Meal';
    this.mealRequestType = 'add';
    this.mealId = '';
    this.mealName = '';
    this.mealStatus = 'enabled';
  }

  classTypeSubmit() {
    this.serverService.post(this.classTypeRequestType + '_class_type', {
      id: this.classTypeId,
      name: this.classTypeName,
      status: this.classTypeStatus
    }, true).subscribe(
      (resp) => {
        if (resp['code'] === 200) {
          if(resp['msg'] == 'Success'){
            swal({
              title: 'Success',
              text: 'Class ' +this.classTypeRequestType+ ' successfully done.',
              type: 'success',
              buttonsStyling: false,
              confirmButtonClass: 'btn btn-success',
              confirmButtonText: 'Ok'
            }).catch(swal.noop);
            this.classTypeModal.hide();
            this.tblClassTypes.ajax.reload(null, false);
            this.getClassTypes();
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

  classSubmit() {
    this.serverService.post(this.classRequestType + '_class', {
      id: this.classId,
      name: this.className,
      type: this.classType,
      status: this.classStatus
    }, true).subscribe(
      (resp) => {
        if (resp['code'] === 200) {
          if(resp['msg'] == 'Success'){
            swal({
              title: 'Success',
              text: 'Class ' +this.classRequestType+ ' successfully done.',
              type: 'success',
              buttonsStyling: false,
              confirmButtonClass: 'btn btn-success',
              confirmButtonText: 'Ok'
            }).catch(swal.noop);
            this.classModal.hide();
            this.tblClasses.ajax.reload(null, false);
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

  holidaySubmit() {
    this.serverService.post(this.holidayRequestType + '_holiday', {
      id: this.holidayId,
      name: this.holidayName,
      startDate: this.holidayStartDate,
      endDate: this.holidayEndDate,
      status: this.holidayStatus
    }, true).subscribe(
      (resp) => {
        if (resp['code'] === 200) {
          if(resp['msg'] == 'Success'){
            swal({
              title: 'Success',
              text: 'Holiday ' +this.holidayRequestType+ ' successfully done.',
              type: 'success',
              buttonsStyling: false,
              confirmButtonClass: 'btn btn-success',
              confirmButtonText: 'Ok'
            }).catch(swal.noop);
            this.holidayModal.hide();
            this.tblHolidays.ajax.reload(null, false);
          }else{
            swal({
              title: 'Failed to submit',
              text: 'Service denied',
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

  mealSubmit() {
    this.serverService.post(this.mealRequestType + '_meal', {
      id: this.mealId,
      name: this.mealName,
      status: this.mealStatus
    }, true).subscribe(
      (resp) => {
        if (resp['code'] === 200) {
          if(resp['msg'] == 'Success'){
            swal({
              title: 'Success',
              text: 'Meal ' +this.mealRequestType+ ' successfully done.',
              type: 'success',
              buttonsStyling: false,
              confirmButtonClass: 'btn btn-success',
              confirmButtonText: 'Ok'
            }).catch(swal.noop);
            this.mealModal.hide();
            this.tblMeals.ajax.reload(null, false);
          }else{
            swal({
              title: 'Failed to submit',
              text: 'Service denied',
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
    
    var thisObj = this;

    $('#classTypesTable').DataTable({
      pagingType: 'full_numbers',
      lengthMenu: [[10, 25, 50, -1], [10, 25, 50, 'Show All']],
      responsive: true,
      processing: true,
      serverSide: true,
      aaSorting : [[1, 'desc']],
      ajax: {
        url: this.server.baseUrl + 'get_class_types',
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
        title: 'ID'
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

    const classTypesTable = $('#classTypesTable').DataTable();
    this.tblClassTypes = classTypesTable;

    classTypesTable.on('click', '.edit', function (e: any) {
      $("#class_type_modal_open").click();
      e.preventDefault();
      const $tr = $(this).closest('tr');
      const data = classTypesTable.row($tr).data();
      thisObj.classTypeRequestType = "edit";
      thisObj.classTypeId = data.id;
      thisObj.classTypeName = data.name;
      thisObj.classTypeStatus = data.status;
      thisObj.classModalTitle = 'Edit Class Type';
      $("classTypeId").val(data.id);
      $("classTypeName").val(data.name);
      $("classTypeStatus").val(data.status);
    });

    classTypesTable.on('click', '.remove', function (e: any) {
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
        const data = classTypesTable.row($tr).data();

        thisObj.server.delete('delete_class_type/' + data.id, true).subscribe(
          (resp) => {
            thisObj.refreshClassTypesTable();
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

    $('#classesTable').DataTable({
      pagingType: 'full_numbers',
      lengthMenu: [[10, 25, 50, -1], [10, 25, 50, 'Show All']],
      responsive: true,
      processing: true,
      serverSide: true,
      aaSorting : [[1, 'desc']],
      ajax: {
        url: this.server.baseUrl + 'get_classes',
        type: 'POST',
        headers: {'Authorization': this.authService.getToken()},
        dataSrc: function(res){
          thisObj.classCnt = res.data.length;
          return res.data;
        },
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
        title: 'ID'
      },{
        data: 'name',
        name: 'name',
        title: 'Name'
      },{
        data: 'type',
        name: 'type',
        title: 'Type'
      }, {
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

    const classesTable = $('#classesTable').DataTable();
    this.tblClasses = classesTable;

    classesTable.on('click', '.edit', function (e: any) {
      $("#class_modal_open").click();
      e.preventDefault();
      const $tr = $(this).closest('tr');
      const data = classesTable.row($tr).data();
      thisObj.classRequestType = "edit";
      thisObj.classId = data.id;
      thisObj.className = data.name;
      thisObj.classType = data.type;
      thisObj.classStatus = data.status;
      thisObj.classModalTitle = 'Edit Class';
      $("classId").val(data.id);
      $("className").val(data.name);
      $("classType").val(data.type);
      $("classStatus").val(data.status);
    });

    classesTable.on('click', '.remove', function (e: any) {
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
        const data = classesTable.row($tr).data();
        thisObj.server.delete('delete_class/' + data.id, true).subscribe(
          (resp) => {
            thisObj.refreshClassesTable();
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

    $('#holidaysTable').DataTable({
      pagingType: 'full_numbers',
      lengthMenu: [[10, 25, 50, -1], [10, 25, 50, 'Show All']],
      responsive: true,
      processing: true,
      serverSide: true,
      aaSorting : [[1, 'desc']],
      ajax: {
        url: this.server.baseUrl + 'get_holidays',
        type: 'POST',
        headers: {'Authorization': this.authService.getToken()},
        dataSrc: function(res){
          thisObj.holidayCnt = res.data.length;
          return res.data;
        },
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
        title: 'ID'
      },{
        data: 'name',
        name: 'name',
        title: 'Name'
      },{
        data: 'startDate',
        name: 'startDate',
        title: 'Start Date'
      }, {
        data: 'endDate',
        name: 'endDate',
        title: 'End Date'
      }, {
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

    const holidaysTable = $('#holidaysTable').DataTable();
    this.tblHolidays = holidaysTable;

    holidaysTable.on('click', '.edit', function (e: any) {
      $("#holiday_modal_open").click();
      e.preventDefault();
      const $tr = $(this).closest('tr');
      const data = holidaysTable.row($tr).data();
      thisObj.holidayRequestType = "edit";
      thisObj.holidayId = data.id;
      thisObj.holidayName = data.name;
      thisObj.holidayStartDate = data.startDate;
      thisObj.holidayEndDate = data.endDate;
      thisObj.holidayStatus = data.status;
      thisObj.holidayModalTitle = 'Edit Holiday';
      $("holidayId").val(data.id);
      $("holidayName").val(data.name);
      $("holidayStartDate").val(data.startDate);
      $("holidayEndDate").val(data.endDate);
      $("classStatus").val(data.status);
    });

    holidaysTable.on('click', '.remove', function (e: any) {
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
        const data = holidaysTable.row($tr).data();
        thisObj.server.delete('delete_holiday/' + data.id, true).subscribe(
          (resp) => {
            thisObj.refreshHolidaysTable();
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

    $('#mealsTable').DataTable({
      pagingType: 'full_numbers',
      lengthMenu: [[10, 25, 50, -1], [10, 25, 50, 'Show All']],
      responsive: true,
      processing: true,
      serverSide: true,
      aaSorting : [[1, 'desc']],
      ajax: {
        url: this.server.baseUrl + 'get_meals',
        type: 'POST',
        headers: {'Authorization': this.authService.getToken()},
        dataSrc: function(res){
          thisObj.mealCnt = res.data.length;
          return res.data;
        },
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
        title: 'ID'
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

    const mealsTable = $('#mealsTable').DataTable();
    this.tblMeals = mealsTable;

    mealsTable.on('click', '.edit', function (e: any) {
      $("#meal_modal_open").click();
      e.preventDefault();
      const $tr = $(this).closest('tr');
      const data = mealsTable.row($tr).data();
      thisObj.mealRequestType = "edit";
      thisObj.mealId = data.id;
      thisObj.mealName = data.name;
      thisObj.mealStatus = data.status;
      thisObj.mealModalTitle = 'Edit Meal';
      $("mealId").val(data.id);
      $("mealName").val(data.name);
      $("mealStatus").val(data.status);
    });

    mealsTable.on('click', '.remove', function (e: any) {
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
        const data = mealsTable.row($tr).data();
        thisObj.server.delete('delete_meal/' + data.id, true).subscribe(
          (resp) => {
            thisObj.refreshMealsTable();
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

  getSchoolInfo() {
    this.server.get('get_school_info', true).subscribe(resp => {
      if (resp['code'] === 200) {
        var thisSchoolInfo = resp['school_info'];
        this.schoolInfo = thisSchoolInfo;
        this.schoolName = thisSchoolInfo.name;
        this.schoolAddress = thisSchoolInfo.address;
        this.schoolImg = thisSchoolInfo.img;
        this.schoolOnDays = thisSchoolInfo.onDays;
        var onDaysValue = thisSchoolInfo.onDays;
        if(onDaysValue.substr(0,1) == 'Y'){
          this.onDaysMon = true;
          $("input[name=onDaysMon]").attr('checked', true);
        }else{
          this.onDaysMon = false;
          $("input[name=onDaysMon]").attr('checked', false);
        }
        if(onDaysValue.substr(1,1) == 'Y'){
          this.onDaysTue = true;
          $("input[name=onDaysTue]").attr('checked', true);
        }else{
          this.onDaysTue = false;
          $("input[name=onDaysTue]").attr('checked', false);
        }
        if(onDaysValue.substr(2,1) == 'Y'){
          this.onDaysWed = true;
          $("input[name=onDaysWed]").attr('checked', true);
        }else{
          this.onDaysWed = false;
          $("input[name=onDaysWed]").attr('checked', false);
        }
        if(onDaysValue.substr(3,1) == 'Y'){
          this.onDaysThu = true;
          $("input[name=onDaysThu]").attr('checked', true);
        }else{
          this.onDaysThu = false;
          $("input[name=onDaysThu]").attr('checked', false);
        }
        if(onDaysValue.substr(4,1) == 'Y'){
          this.onDaysFri = true;
          $("input[name=onDaysFri]").attr('checked', true);
        }else{
          this.onDaysFri = false;
          $("input[name=onDaysFri]").attr('checked', false);
        }
        if(onDaysValue.substr(5,1) == 'Y'){
          this.onDaysSat = true;
          $("input[name=onDaysSat]").attr('checked', true);
        }else{
          this.onDaysSat = false;
          $("input[name=onDaysSat]").attr('checked', false);
        }
        if(onDaysValue.substr(6,1) == 'Y'){
          this.onDaysSun = true;
          $("input[name=onDaysSun]").attr('checked', true);
        }else{
          this.onDaysSun = false;
          $("input[name=onDaysSun]").attr('checked', false);
        }
      }
    });
  }

}
