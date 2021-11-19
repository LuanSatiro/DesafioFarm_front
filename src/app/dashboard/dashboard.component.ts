import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NewFarmComponent } from '../farm/new-farm/new-farm.component';
import { FarmService } from '../services/farm.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit{
  allFarm;
  farmEdit
  constructor(
    private farmService: FarmService){
  }
  ngOnInit(){
    this.getAllFarms();
  }

  getAllFarms(){

    this.farmService.list().subscribe(res => {
      this.allFarm = res.farms;

    });
  }

}