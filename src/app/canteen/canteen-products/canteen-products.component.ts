import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ServerService } from '../../service/server';
import { Router } from '@angular/router';
import { AuthService } from '../../service/authservice';
import {ModalDirective} from 'ngx-bootstrap/modal';
import { ManagerConfig } from '../../config/manager.config';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

import swal from 'sweetalert2';

declare var $;

@Component({
  selector: 'manager-canteen-products',
  templateUrl: './canteen-products.component.html',
  styleUrls: ['./canteen-products.component.scss']
})

export class CanteenProductsComponent implements OnInit {

  @ViewChild('primaryModal') public primaryModal: ModalDirective;
  @ViewChild('imageModal') public imageModal: ModalDirective;
  @ViewChild('optionModal') public optionModal: ModalDirective;

  modal_title = "+ Add New Product";
  request_type = "add";

  id = "";
  schoolId = this.authService.get('schoolId');
  categoryId = '1';
  name = '';
  currency = '';
  price = '';
  maxQty = '';
  description = '';
  availableMeals = [];
  availableClasses = [];
  onDays = '';
  onDaysMon = true;
  onDaysTue = true;
  onDaysWed = true;
  onDaysThu = true;
  onDaysFri = true;
  onDaysSat = false;
  onDaysSun = false;

  options = [];
  status = 'enabled';

  imgList = [];
  selectedImg = '';
  selectedProductId = '';

  constructor(
    public serverService: ServerService,
    public server: ServerService,
    public authService: AuthService,
    public router: Router,
    private fb: FormBuilder
  ) { }

  optionGroup: FormGroup;

  category_list = [];
  meal_type_list = [];
  class_type_list = [];

  ngOnInit() {
    
    this.getCategories();
    this.getClassTypes();
    this.getMealTypes();

    this.optionGroup = this.fb.group({
      options: this.fb.array([this.fb.group({name:'', price:'', status:'true'})])
    })

  }

  uploadedFiles: Array < File > ;

  fileChange(element) {
    this.uploadedFiles = element.target.files;
  }

  selectImg(thisImg){
    this.selectedImg = thisImg;
  }

  deleteImg(thisImg){
    var thisObj = this;
    this.serverService.post('delete_product_img/', {
      id : this.selectedProductId,
      imgUrl : thisImg
    }, true).subscribe(
      (resp) => {
        swal({
          title: 'Submit succeed',
          text: 'Sumit succeessfully done.',
          type: 'success',
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-success',
          confirmButtonText: 'Ok'
        }).catch(swal.noop);
        
        var thisObjImgList = thisObj.imgList;
        var index = thisObjImgList.indexOf(thisImg);     
        if (index > -1) {
          thisObjImgList.splice(index, 1);
        }
        thisObj.imgList = thisObjImgList;
        this.tblProducts.ajax.reload(null, false);
      }
    );
  }

  uploadNewImages() {  
    var thisObj = this;
    let formData = new FormData();
    for (var i = 0; i < this.uploadedFiles.length; i++) {
        formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
    } 
    this.serverService.post('upload_product_img/'+this.selectedProductId, formData, true).subscribe(
      (resp) => {
        swal({
          title: 'Submit succeed',
          text: 'Sumit succeessfully done.',
          type: 'success',
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-success',
          confirmButtonText: 'Ok'
        }).catch(swal.noop);
        thisObj.imgList = resp['data'];
        this.imageModal.hide();
        this.tblProducts.ajax.reload(null, false);
      }
    );
  }

  get optionValues() {
    return this.optionGroup.get('options') as FormArray;
  }

  addOptionValue() {
    this.optionValues.push(this.fb.group({name:'', price:'', status:'true'}));
  }

  deleteOptionValue(index) {
    this.optionValues.removeAt(index);
  }

  getCategories() {
    this.server.get('get_category_list', true).subscribe(resp => {
      if (resp['code'] === 200) {
        this.category_list = resp['category_list'];
      } else {
        this.category_list = [];
      }
    });
  }

  getClassTypes() {
    this.server.get('get_class_list', true).subscribe(resp => {
      if (resp['code'] === 200) {
        this.class_type_list = resp['class_list'];
      } else {
        this.class_type_list = [];
      }
    });
  }

  getMealTypes() {
    this.server.get('get_meal_list', true).subscribe(resp => {
      if (resp['code'] === 200) {
        this.meal_type_list = resp['meal_list'];
      } else {
        this.meal_type_list = [];
      }
    });
  }

  formatModal(){
    this.modal_title = "+ Add New Product";
    this.request_type = "add";
    this.id = "";
    this.categoryId = '1';
    this.name = '';
    this.currency = '';
    this.price = '';
    this.maxQty = '';
    this.description = '';
    this.availableMeals = [];
    this.availableClasses = [];
    this.onDays = '';
    this.onDaysMon = true;
    this.onDaysTue = true;
    this.onDaysWed = true;
    this.onDaysThu = true;
    this.onDaysFri = true;
    this.onDaysSat = false;
    this.onDaysSun = false;
    this.optionGroup = this.fb.group({
      options: this.fb.array([this.fb.group({name:'', price:'', status:'true'})])
    })
    this.status = 'enabled';
  }

  tblProducts: any;
  base_url = this.server.baseUrl;
  appManagerUrl = ManagerConfig.endPoints.manager;

  refreshTable() {
    this.tblProducts.draw(false);
  }

  submit() {
    
    this.onDays = '';
    if($("input[name=onDaysMon]").is(':checked')){
      this.onDaysMon =  true;
      this.onDays += 'Y';
    }else{
      this.onDaysMon =  false;
      this.onDays += 'N';
    }
    if($("input[name=onDaysTue]").is(':checked')){
      this.onDaysTue =  true;
      this.onDays += 'Y';
    }else{
      this.onDaysTue =  false;
      this.onDays += 'N';
    }
    if($("input[name=onDaysWed]").is(':checked')){
      this.onDaysWed =  true;
      this.onDays += 'Y';
    }else{
      this.onDaysWed =  false;
      this.onDays += 'N';
    }
    if($("input[name=onDaysThu]").is(':checked')){
      this.onDaysThu =  true;
      this.onDays += 'Y';
    }else{
      this.onDaysThu =  false;
      this.onDays += 'N';
    }
    if($("input[name=onDaysFri]").is(':checked')){
      this.onDaysFri =  true;
      this.onDays += 'Y';
    }else{
      this.onDaysFri =  false;
      this.onDays += 'N';
    }
    if($("input[name=onDaysSat]").is(':checked')){
      this.onDaysSat =  true;
      this.onDays += 'Y';
    }else{
      this.onDaysSat =  false;
      this.onDays += 'N';
    }
    if($("input[name=onDaysSun]").is(':checked')){
      this.onDaysSun =  true;
      this.onDays += 'Y';
    }else{
      this.onDaysSun =  false;
      this.onDays += 'N';
    }

    var tempAvailableMeals = [];
    var temp = this.meal_type_list;
    temp.forEach(function(value){
      if($("input[name=meal_type_"+value.id+"]").is(':checked')){
        tempAvailableMeals.push(value.name);
      }
    })
    this.availableMeals = tempAvailableMeals;

    var tempAvailableClasses = [];
    var temp = this.class_type_list;
    temp.forEach(function(value){
      if($("input[name=class_type_"+value.id+"]").is(':checked')){
        tempAvailableClasses.push(value.name);
      }
    })
    this.availableClasses = tempAvailableClasses;

    this.serverService.post(this.request_type + '_product', {
      id: this.id,
      categoryId: this.categoryId,
      name: this.name,
      currency: this.currency,
      price: this.price,
      maxQty: this.maxQty,
      description: this.description,
      availableMeals: this.availableMeals,
      availableClasses: this.availableClasses,
      onDays: this.onDays,
      status: this.status
    }, true).subscribe(
      (resp) => {
        if (resp['code'] === 200) {
          if(resp['msg'] == 'Success'){
            swal({
              title: 'Success',
              text: 'Product ' +this.request_type+ ' successfully done.',
              type: 'success',
              buttonsStyling: false,
              confirmButtonClass: 'btn btn-success',
              confirmButtonText: 'Ok'
            }).catch(swal.noop);
            this.primaryModal.hide();
            this.tblProducts.ajax.reload(null, false);
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

  submitOption() {
    this.serverService.post('update_product_option', {
      id: this.id,
      options: this.optionGroup.value,
    }, true).subscribe(
      (resp) => {
        if (resp['code'] === 200) {
          if(resp['msg'] == 'Success'){
            swal({
              title: 'Success',
              text: 'Product option edit successfully done.',
              type: 'success',
              buttonsStyling: false,
              confirmButtonClass: 'btn btn-success',
              confirmButtonText: 'Ok'
            }).catch(swal.noop);
            this.optionModal.hide();
            this.tblProducts.ajax.reload(null, false);
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
    
    var thisObj = this;

    const authSvc = this.authService;
    const routerPt = this.router;
    $('#productsTable').DataTable({
      pagingType: 'full_numbers',
      lengthMenu: [[10, 25, 50, -1], [10, 25, 50, 'Show All']],
      responsive: true,
      processing: true,
      serverSide: true,
      aaSorting : [[1, 'desc']],
      ajax: {
        url: this.server.baseUrl + 'get_products',
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
        name: 'category_name',
        title: 'Category',
        render: function(data, type, row) {
          var category_info = row.categoryInfo;
          return category_info[0].name;
        }
      },{
        data: '',
        name: 'image',
        title: 'Image',
        render: function(data, type, row) {
          var image_url = row.img;
          if(image_url.length > 0){
            return '<img src="'+ thisObj.server.baseUrl + image_url[0]+'" style="width:64px;height:64px;">';
          }else{
            return '';
          }
        }
      },{
        data: 'name',
        name: 'name',
        title: 'Name'
      },{
        data: 'currency',
        name: 'currency',
        title: 'Currency'
      },{
        data: 'price',
        name: 'price',
        title: 'Price'
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
      },{
        data: 'createdAt',
        name: 'createdAt',
        title: 'Created Date'
      },{
        data: 'changedAt',
        name: 'changedAt',
        title: 'Changed Date'
      }, {
        width: 400,
        title: 'Actions',
        sortable: false,
        render: function (data, type, row) {
          let template = '\
          <button mat-raised-button mat-min-fab class="btn btn-sm btn-primary btn-just-icon btn-round edit" title="Edit / View More">\
            <i class="fa fa-edit"> Edit / View More</i>\
          </button>';

          template += '\
          <button mat-raised-button mat-min-fab class="btn btn-sm btn-success btn-just-icon btn-round editImage" title="Edit Image">\
            <i class="fa fa-edit"> Edit Image</i>\
          </button>';

          template += '\
          <button mat-raised-button mat-min-fab class="btn btn-sm btn-success btn-just-icon btn-round editOption" title="Edit Option">\
            <i class="fa fa-edit"> Edit Option</i>\
          </button>';

          template += '\
          <button mat-raised-button mat-min-fab class="btn btn-sm btn-danger btn-just-icon btn-round remove" title="Delete">\
            <i class="fa fa-remove"> Delete</i>\
          </button>';

          return template;
        }
      }]
    });

    const table = $('#productsTable').DataTable();
    this.tblProducts = table;
    
    var thisObj = this;

    table.on('click', '.edit', function (e: any) {
      $("#modal_open").click();
      e.preventDefault();
      const $tr = $(this).closest('tr');
      const data = table.row($tr).data();
      thisObj.request_type = "edit";
      thisObj.id = data.id;
      thisObj.categoryId = data.categoryId;
      thisObj.name = data.name;
      thisObj.currency = data.currency;
      thisObj.price = data.price;
      thisObj.maxQty = data.maxQty;
      thisObj.description = data.description;
      var onDaysValue = data.onDays;
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

      var tempAvailableMeals = data.availableMeals;
      var tempMealType = thisObj.meal_type_list;
      tempMealType.forEach(function(value){
        $("input[name=meal_type_"+value.id+"]").attr('checked', false);
        tempAvailableMeals.forEach(function(vvalue){
          if(vvalue == value.name){
            $("input[name=meal_type_"+value.id+"]").attr('checked', true);
          }
        })
      })   

      var tempAvailableClasses = data.availableClasses;
      var tempClassType = thisObj.class_type_list;
      tempClassType.forEach(function(value){
        $("input[name=class_type_"+value.id+"]").attr('checked', false);
        tempAvailableClasses.forEach(function(vvalue){
          if(vvalue == value.name){
            $("input[name=class_type_"+value.id+"]").attr('checked', true);
          }
        })
      })  

      thisObj.status = data.status;
      thisObj.modal_title = 'Edit Product';
      $("id").val(data.id);
      $("categoryId").val(data.categoryId);
      $("name").val(data.name);
      $("currency").val(data.currency);
      $("price").val(data.price);
      $("maxQty").val(data.maxQty);
      $("description").val(data.description);
      $("status").val(data.status);      
    });

    table.on('click', '.editImage', function (e: any) {
      const $tr = $(this).closest('tr');
      const data = table.row($tr).data();
      thisObj.selectedProductId = data.id;
      var thisImgList = data.img;
      thisObj.imgList = thisImgList;
      thisObj.selectedImg = thisImgList[0];
      thisObj.imageModal.show();
    });

    table.on('click', '.editOption', function (e: any) {
      const $tr = $(this).closest('tr');
      const data = table.row($tr).data();
      thisObj.id = data.id;
      var options = data.options;
      while (thisObj.optionValues.length !== 0) {
        thisObj.optionValues.removeAt(0)
      }
      options.forEach(option => {
        thisObj.optionValues.push(thisObj.fb.group({name:option.name, price:option.price, status:option.status}));
      });
      thisObj.optionModal.show();
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
        thisObj.server.delete('delete_product/' + data.id, true).subscribe(
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
