import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'projectHotelsF';



  buscar():void{

    var iframe = document.createElement('iframe');
    iframe.src = 'https://my.atlistmaps.com/map/1fc716ac-6e9a-4f13-af42-c4c759dfb163?share=true;charset=utf-8,';

    document.body.appendChild(iframe);

  }










}
