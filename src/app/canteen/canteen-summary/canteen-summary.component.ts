import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ServerService } from '../../service/server';
import { Router } from '@angular/router';
import { AuthService } from '../../service/authservice';
import {ModalDirective} from 'ngx-bootstrap/modal';

import swal from 'sweetalert2';

declare var $;

@Component({
  selector: 'manager-canteen-summary',
  templateUrl: './canteen-summary.component.html',
  styleUrls: ['./canteen-summary.component.scss']
})

export class CanteenSummaryComponent implements OnInit {

  constructor(
    public serverService: ServerService,
    public server: ServerService,
    public authService: AuthService,
    public router: Router) { }

  categoriesCnt = 0;
  product_list: any;
  totalProductsCnt = 0;
  mealTypeData = [];

  ngOnInit() {
    this.getCategoriesCnt();
    this.getTotalProductsCnt();
  }

  getCategoriesCnt() {
    this.server.get('get_categories_cnt', true).subscribe(resp => {
      if (resp['code'] === 200) {
        this.categoriesCnt = resp['categories_cnt'];
      } else {
        this.categoriesCnt = 0;
      }
    });
  }

  viewCategories(){
    const routerPt = this.router;
    routerPt.navigate(['/canteen/categories']);
  }

  viewProducts(){
    const routerPt = this.router;
    routerPt.navigate(['/canteen/products']);
  }

  getTotalProductsCnt() {

    var thisObj = this;

    this.server.get('get_all_products', true).subscribe(resp => {
      if (resp['code'] === 200) {
        var product_list_data = resp['product_list'];
        this.product_list = product_list_data;
        this.totalProductsCnt = product_list_data.length;

        var mealTypeList = [];
        product_list_data.forEach(function(product){
          var thisProductMealType = product.availableMeals;
          var thisProductMealTypeStr = '';
          if(thisProductMealType.length > 0){
            thisProductMealTypeStr += thisProductMealType[0];
          }
          if(thisProductMealType.length > 1){
            thisProductMealType.forEach(element => {
              thisProductMealTypeStr += ", " + element;
            });
          }
          if(thisProductMealTypeStr != '' && mealTypeList.indexOf(thisProductMealTypeStr) == -1){
            mealTypeList.push(thisProductMealTypeStr);
          }
        });

        mealTypeList.forEach(function(mealType){
          var tempName = mealType;
          var tempCount = 0;
          product_list_data.forEach(function(product){
            var thisProductMealType = product.availableMeals;
            var thisProductMealTypeStr = '';
            if(thisProductMealType.length > 0){
              thisProductMealTypeStr += thisProductMealType[0];
            }
            if(thisProductMealType.length > 1){
              thisProductMealType.forEach(element => {
                thisProductMealTypeStr += ", " + element;
              });
            }
            if(mealType == thisProductMealTypeStr){
              tempCount++;
            }
          })
          var pushData = {
            name : tempName,
            count : tempCount
          }
          thisObj.mealTypeData.push(pushData);
        })
      }
    });
  }
}
