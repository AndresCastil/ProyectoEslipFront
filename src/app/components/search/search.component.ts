import { Component, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnDestroy {

  searchForm!: FormGroup;
  cities: any;
  hotels: any
  iframe: any;
  url = null;
  name: any;

  center: google.maps.LatLngLiteral;
  zoom = 12;
  markerOptions: google.maps.MarkerOptions = {
    draggable: false
  };
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;
  markerPositions: google.maps.LatLngLiteral[] = [];


  ngOnInit(): void {

    this.getCities();
    this.searchForm = this.fb.group({
      city: [null, [Validators.required]],
    });

    this.buscar();
    const data = {
      city: this.activatedroute.snapshot.params['name']
    }
    console.log(data)

    console.log(this.searchForm)
  }

  constructor(
    private fb: FormBuilder,
    private activatedroute: ActivatedRoute,
    private authService: AuthService,
  ) { }


  getCities() {
    this.authService.getCities().subscribe(res => {
      console.log(res);
      this.cities = res;
      this.searchForm.get('city').setValue(this.activatedroute.snapshot.params['name']);
      this.searchForm.updateValueAndValidity();
      this.getHotels();
    });
  }

  openInfoWindow(marker) {
    console.log(marker);
    if (this.infoWindow != undefined) {
      console.log(marker.getPosition())
      this.name = marker._position?.name;
      this.infoWindow.open(marker);
    }
  }

  getHotels() {
    this.authService.getHotels(this.searchForm.get('city').value).subscribe(res => {
      console.log(res);
      this.hotels = res;

      this.center = {
        lat: this.hotels[0].latitud,
        lng: this.hotels[0].longitud
      };
      this.hotels.forEach(hotel => {
        const data = { lat: hotel.latitud, lng: hotel.longitud, name: hotel.nombre }
        this.markerPositions.push(data);
      });
    })
  }


  buscar(): void {
    this.markerPositions = [];
    this.getHotels();


  }



  ngOnDestroy(): void {

  }

}
