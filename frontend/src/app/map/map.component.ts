import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

declare var H: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @ViewChild("map")
  public mapElement: ElementRef;

  public appId: any;

  public appCode: any;
  @Input()
  public lat: any;
  @Input()
  public lng: any;

  @Input()
  public width: any;

  @Input()
  public height: any;

  private platform: any;
  private map: any;
  private ui: any;
  private search: any;
  public query: string;

  public constructor() {
    this.query = "dominos"
  }

  public ngOnInit() {
    this.platform = new H.service.Platform({
      "app_id": "e3ZueVfkts3fMvfuzfci",
      "app_code": "4QetlXKDC-mZ9evvDlgAIg",
    });
    this.search = new H.places.Search(this.platform.getPlacesService());
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position => {
       this.lng = position.coords.longitude;
       this.lat = position.coords.latitude;
      });
    } else {
      console.error("The browser currently not supporting geolocation")
    }
  }

  public ngAfterViewInit() {
    let defaultLayers = this.platform.createDefaultLayers();
    this.map = new H.Map(
      this.mapElement.nativeElement,
      defaultLayers.normal.map,
      {
        zoom: 10,
        center: { lat: this.lat, lng: this.lng }
      }
    );
  }

  public places(query: string) {
    this.map.removeObjects(this.map.getObjects());
    this.search.request({ "q": query, "at": this.lat + "," + this.lng }, {}, data => {
      for(let i = 0; i < data.results.items.length; i++) {
        this.dropMarker({ "lat": data.results.items[i].position[0], "lng": data.results.items[i].position[1] }, data.results.items[i]);
      }
    }, error => {
      console.error(error);
    });
  }

  private dropMarker(coordinates: any, data: any) {
    let marker = new H.map.Marker(coordinates);
    marker.setData("<p>" + data.title + "<br>" + data.vicinity + "</p>");
    marker.addEventListener('tap', event => {
      let bubble =  new H.ui.InfoBubble(event.target.getPosition(), {
        content: event.target.getData()
      });
      this.ui.addBubble(bubble);
    }, false);
    this.map.addObject(marker);
  }

}
