import { Component, AfterViewInit  } from '@angular/core';

import * as L from 'leaflet';
import { latLng, Map, Control, LocationEvent } from 'leaflet';

import { TravelPlanService } from 'src/app/services/travel-plan.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit  {

  constructor(private travelService: TravelPlanService) { }

  ngAfterViewInit (): void {
    this.initMap();
  }

  public map:Map;

  public locateOptions:  Control.LocateOptions = {
    flyTo: false,
    keepCurrentZoomLevel: true,
    locateOptions: {
                 enableHighAccuracy: true,
               },
    icon: 'leaflet-control-locate-location-arrow',
    clickBehavior: {inView: 'stop',
                    outOfView: 'setView',
                    inViewNotFollowing: 'setView'}
  };

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 39.8282, -98.5795 ],
      zoom: 3
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  onNewLocation(e: LocationEvent){
    console.log(e.latlng);
  }

}
