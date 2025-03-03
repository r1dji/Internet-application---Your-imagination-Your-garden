import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import * as lflt from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

  constructor(private http: HttpClient) { }

  @Output() addresChanged = new EventEmitter<string>();
  map: lflt.Map | null = null;
  marker: lflt.Marker | null = null;
  address: string = 'Enter an address';
  inputAddress: string = '';

  ngOnInit(): void {

    lflt.Icon.Default.mergeOptions({
      iconRetinaUrl: 'assets/images/leaflet/marker-icon-2x.png',
      iconUrl: 'assets/images/leaflet/marker-icon.png',
      shadowUrl: 'assets/images/leaflet/marker-shadow.png'
    })

    this.loadMap();
  }

  private readonly initLat = 44.816138;
  private readonly initLon = 20.460488;

  loadMap(): void {

    const initialPosition = lflt.latLng(this.initLat, this.initLon); //Beograd, Terazije

    this.map = lflt.map('map').setView(initialPosition, 12);

    lflt.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: ''
    }).addTo(this.map);

    this.marker = lflt.marker(initialPosition).addTo(this.map).bindPopup('Belgrade').openPopup();

    this.getAddress(this.initLat, this.initLon);

    this.map.on('click', (e: lflt.LeafletMouseEvent) => {
      const clickedPosition = e.latlng;
      console.log(clickedPosition);
      this.marker?.setLatLng(clickedPosition)

      this.getAddress(clickedPosition.lat, clickedPosition.lng);
    })
  }

  getAddress(lat: number, lon: number): void {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`;
    this.http.get<any>(url).subscribe(
      response => {
        if (response && response.address) {
          const address = response.display_name;
          this.address = address;
          const ulica = response.address.road || response.address.suburb;
          const broj = response.address.house_number || response.address.street_number || '';
          const grad = response.address.city;
          const drzava = response.address.country;
          const postanskiBr = response.address.postcode;
          const adresaRet: string = ulica + ' ' + broj + ', ' + grad + ' ' + postanskiBr + ', ' + drzava;
          console.log(adresaRet);
          console.log(address);
          this.addresChanged.emit(adresaRet);
        }
      }
    )
  }

 /*  findAddress(): void {
    if (!this.inputAddress) return;

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${this.inputAddress}`;

    // Fetch coordinates for the entered address
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const { lat, lon, display_name } = data[0];

          // Update the map view and marker position
          const newLatLng = L.latLng(lat, lon);
          this.map.setView(newLatLng, 12);
          this.marker.setLatLng(newLatLng).bindPopup(display_name).openPopup();

          // Update the address field
          this.address = display_name;
        } else {
          this.address = 'Address not found';
        }
      })
      .catch(error => {
        console.error('Error fetching the address:', error);
        this.address = 'Error fetching the address';
      });
  } */

}
