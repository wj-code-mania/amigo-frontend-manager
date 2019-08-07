import { Component, OnInit, AfterViewInit } from '@angular/core';
import {formatDate} from '@angular/common';
import { ServerService } from '../service/server';
import { Router } from '@angular/router';
import { AuthService } from '../service/authservice';

@Component({
  selector: 'manager-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    public serverService: ServerService,
    public server: ServerService,
    public authService: AuthService,
    public router: Router
  ) { }

  curDateTime = '';
  srchDateTime = '';
  orderCnt = 0;
  totalSales = 0;

  updateInfo(dateTime){

    this.serverService.post('get_dashboard_info', {
      dateTime: dateTime
    }, true).subscribe(
      (resp) => {
        if (resp['code'] === 200) {
          var data = resp['data'];
          this.orderCnt = data.orderCnt;
          this.totalSales = data.totalSales;        
          this.curDateTime = this.srchDateTime;  
        }
      }
    );
  }

  ngOnInit() {
    this.curDateTime = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.srchDateTime = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.updateInfo(this.curDateTime);
  }

  srchByDate(){
    this.updateInfo(this.srchDateTime);
  }

}
