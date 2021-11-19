import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FarmService } from 'src/app/services/farm.service';
import { NewFarmComponent } from '../new-farm/new-farm.component';


@Component({
  selector: 'app-details-farm',
  templateUrl: './details-farm.component.html',
})
export class DetailsFarmComponent implements OnInit{
  actualFarm;
  idFarm;
  constructor(
    private farmService: FarmService,
    private route: ActivatedRoute,
    public router: Router,
  ){
    this.route.params.subscribe(params => {
      this.idFarm = params['id']
      this.getActualFarm();
    });

  }
  ngOnInit(){
    this.getActualFarm();
  }

  getActualFarm(){
    this.farmService.read(this.idFarm).subscribe( res => {
      this.actualFarm = res;
    }, (err) => {
      if(err.statusText === 'Not Found') {
        this.router.navigate([''])
      }
    })
  }


  removeFarm(index){
    this.farmService.delete(index)
  }
}