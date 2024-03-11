import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import * as L from 'leaflet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage {


  map: any;

  constructor(private callNumber: CallNumber,private router: Router) { }

    hacerLlamada(){
      this.callNumber.callNumber("677527637", true)
       .then(res => console.log('Llamada realizada', res))
       .catch(err => console.log('Error en la llamada', err));
  
    }

    ionViewDidEnter(){
      this.loadMap();
    }
  
    loadMap() {
      let latitud = 36.6797047;
      let longitud = -5.4470656;
      let zoom = 17;
      this.map = L.map("mapId").setView([latitud, longitud], zoom);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
          .addTo(this.map);
    }

    clicBotonHome(){
      this.router.navigate(['home']);
    }
}
