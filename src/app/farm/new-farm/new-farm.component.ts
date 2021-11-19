import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { DrawAddon } from '@common/draw';
import GeoJSON from 'ol/format/GeoJSON';
import { GeoJsonFeatureAddon } from '@common/feature';
import { pointClickStyle, GeoJsonFeature } from '@common/geolib'
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { FarmService } from 'src/app/services/farm.service';
import { OwnerService } from 'src/app/services/owner.service';
import { Farm } from 'src/app/models/Farm';
import { ActivatedRoute, Router } from '@angular/router';
import { BasemapComponent } from 'src/app/basemap/basemap.component';
import { MapService } from 'src/app/map.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-new-farm',
  templateUrl: './new-farm.component.html',
  styleUrls: ['./new-farm.component.scss']
})
export class NewFarmComponent implements OnInit, OnDestroy {
  idOwner;
  nameFarm : FormControl;
  area = new FormControl('', [Validators.required]);
  form: FormGroup;
  geometry;
  idFarmEdit;
  actualFarm;
  centroid: FormArray
  private _map!: BasemapComponent
  private _geometries: GeoJsonFeature[] = []
  constructor(
    private _mapService: MapService,
    private fb: FormBuilder,
    private farmService: FarmService,
    private ownerService: OwnerService,
    private route: ActivatedRoute,
    public router: Router,
  ){
    this.form = this.fb.group({
      centroid: this.fb.array([new FormGroup({
        latitude: new FormControl ('', [Validators.required]),
        longitude: new FormControl('', [Validators.required]),
      })], [Validators.required]),
      nameFarm: ['', Validators.required],
      area: ['', [Validators.required]],

    });
    this.centroid = this.form.get('centroid') as FormArray;
    this.nameFarm = this.form.get('nameFarm') as FormControl;
    this.area = this.form.get('area') as FormControl;
    this.route.params.subscribe(params => {

      this.idFarmEdit = params['id']
      this.getActualFarm();
    });
  }
  ngOnInit(){
    this.getUser();
    this._map = this._mapService.map
  }

  getUser(){
    // normalmente o id do user é pego por algum metodo, como são dados mockados
    // defino hardedcoded para o unico user existente
    this.ownerService.list().pipe(
      map(({owners}) => (owners || [])[0]),
    ).subscribe(res => {
      this.idOwner = res.id;
    });
  }

  goToDashboard(){
    const state = {
    };
    this.router.navigate([`farm/details/${this.idFarmEdit}`], {state})
  }

  goToFarm(){
    const state = {
    };
    this.router.navigate(['farm'], {state})
  }

  getActualFarm(){
    if(this.idFarmEdit){
      this.farmService.read(this.idFarmEdit).subscribe( res => {
        this.actualFarm = res;
        this.nameFarm.setValue(this.actualFarm.name)
        this.centroid.setValue(this.actualFarm.centroid);
        this.area.setValue(this.actualFarm.area);
      }, (err) => {
        if(err.statusText === 'Not Found') {
          this.router.navigate([''])
        }
      })
    }
  }

  draw(type: 'Circle') {
    if(!this._map) return
    this._map.includeAddon(new DrawAddon({
      identifier: 'geometry_map',
      drawType: type,
      callback: geometry => {
          const geo = new GeoJSON().writeGeometryObject(geometry) as any
          this.handleNewGeometry(geo)
        }
      }))
  }

  geometrySeed: number = 1
  handleNewGeometry(geometry: any) {
    const identifier = this.geometrySeed++
    this._map.includeAddon(
      new GeoJsonFeatureAddon({
        identifier: `geometry::${identifier}`,
        feature: geometry,
        styleFunction: () => {
          return pointClickStyle({
            hover: false,
            strokeColor: '#1962D1',
          })
        },
      })
    )
    this._map.fitToAddons(this._map.listByPrefix('geometry'))
    console.log('New geometry', geometry)
    this._geometries.push(geometry)

  }


  ngOnDestroy() {
    this._map.removeByPrefix('geometry')
  }

  saveFarm(){
    if(this.idFarmEdit){
      const farm =   {
        id:2,
        name: this.nameFarm.value,
        geometry: this._geometries ,
        area: this.area.value,
        centroid: this.centroid.value,
        owner_id: this.idOwner
      }
      this.farmService.update(this.idFarmEdit, farm)
    } else {
      const farm =   {
        name: this.nameFarm.value,
        geometry: this._geometries ,
        area: this.area.value,
        centroid: this.centroid.value,
        owner_id: this.idOwner
      }
      this.farmService.create(farm)
    }


  }

}