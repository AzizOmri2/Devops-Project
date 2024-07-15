import { Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

  constructor(){}

  ngOnInit(): void {
    const map = L.map('map').setView([36.898958, 10.189975], 17);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Add other map elements and interactions here
    // Example: markers, circles, popups, etc.

    // Example:
    const circle = L.circle([36.898958, 10.189975], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 110 
    }).addTo(map);

    map.on('click', (e: any) => {
      alert("You clicked the map at " + e.latlng);
    });
    

    /*BLOCs*/

    var markerBlocE = L.marker([36.899276, 10.190206]).addTo(map);
    markerBlocE.bindPopup("<b>Bloc E</b>").openPopup();

    var markerBlocH = L.marker([36.898011, 10.189648]).addTo(map);
    markerBlocH.bindPopup("<b>Bloc H</b>").openPopup();

    var markerBlocABC = L.marker([36.898852, 10.189905]).addTo(map);
    markerBlocABC.bindPopup("<b>Bloc A,B,C</b>").openPopup();

    var markerBlocG = L.marker([36.898603, 10.188864]).addTo(map);
    markerBlocG.bindPopup("<b>Bloc G</b>").openPopup();

    var markerBlocD = L.marker([36.898681, 10.190088]).addTo(map);
    markerBlocD.bindPopup("<b>Bloc D</b>").openPopup();

    var markerBlocIJK = L.marker([36.899513, 10.189294]).addTo(map);
    markerBlocIJK.bindPopup("<b>Bloc I,J,K</b>").openPopup();

  }
}
