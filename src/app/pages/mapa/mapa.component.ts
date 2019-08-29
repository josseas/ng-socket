import { Component, OnInit, ViewChild, ElementRef, ɵConsole, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Marcador } from 'src/app/models/marcador';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styles: []
})
export class MapaComponent implements OnInit, OnDestroy
{
    public latitude: number = -12.0291328;
    public longitude: number = -77.0211839;
    public zoom: number = 12;
    public mapType: string = 'roadmap';

    public urlSvg: string = './assets/1.svg';
    
    public markers: Array<Marcador>;

    public action: string = 'ADD';
    public type: string = 'TREE';
    public drag: boolean = false;
    public nombreMarker: string = '';

    public listenAdd: Subscription = new Subscription();
    public listenMove: Subscription = new Subscription();
    public listenRemove: Subscription = new Subscription();

    public constructor(private http: HttpClient, private socket: WebsocketService)
    {
        this.markers = new Array<Marcador>();
        this.LoadMarcadores();
    }

    public ngOnInit()
    {
        this.ListenSockets();
    }

    public ngOnDestroy()
    {
        this.listenAdd.unsubscribe();
    }

    public ListenSockets()
    {
        // LISTEN_ADD
        this.listenAdd = this.socket.Listen('SEND_ADD_MARKER').subscribe
        (
            (data: Marcador) => this.markers.push(data)
        );

        // LISTEN_MOVE
        this.listenMove = this.socket.Listen('SEND_MOVE_MARKER').subscribe
        (
            (data: Marcador) => 
            {
                this.markers.forEach
                (
                    marcador =>
                    {
                        if (marcador.id === data.id)
                        {
                            marcador.lat = data.lat;
                            marcador.lng = data.lng;
                        }
                    }
                );
            }
        );

        // LISTEN_REMOVE
        this.listenRemove = this.socket.Listen('SEND_REMOVE_MARKER').subscribe
        (
            (data: string) => this.markers = this.markers.filter(m => m.id !== data)
        );
    }

    public LoadMarcadores()
    {
        this.http.get('http://localhost:69/api/mapa').subscribe
        (
            (data: Array<Marcador>) => this.markers = data
        );
    }

    public AddMarker(lat: number, lng: number)
    {
        if (this.action === 'ADD')
        {
            if (this.nombreMarker.trim() === '')
            {
                alert('Ingrese un NOMBRE de marcador.');
                return;
            }

            let marker: Marcador = 
            { 
                id: this.GenerateID(), name: this.nombreMarker.trim(), lat, lng, alpha: 1, url: this.urlSvg, visible: false 
            };

            this.markers.push(marker);

            this.socket.Emit('ADD_MARKER', marker);
        }
    }    

    public GenerateID() : string
    {
        let dt: number = new Date().getTime();
        let uuid : string = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace
        (
            /[xy]/g, c =>
            {
                let r: number = (dt + Math.random()*16)%16 | 0;
                dt = Math.floor(dt/16);
                return (c == 'x' ? r : (r&0x3|0x8)).toString(16);
            }
        );

        return uuid;
    }

    public MarkerDrag($event: any, marker: Marcador) 
    {        
        marker.lat = Number($event.coords.lat);
        marker.lng = Number($event.coords.lng);

        this.socket.Emit('MOVE_MARKER', marker);
    }

    public MouseOver(marker: Marcador)
    {
        marker.visible = true;
    }

    public MouseOut(marker: Marcador)
    {
        marker.visible = false;
    }

    public ClickMarcador(marker: Marcador)
    {
        if (this.action !== 'REMOVE')
            return;

        this.markers = this.markers.filter(m => m.id !== marker.id);

        this.socket.Emit('REMOVE_MARKER', marker.id);
    }

    public ChangeOptionActions()
    {
        switch(this.action)
        {
            case 'ADD':
                this.drag = false;
                break;
            case 'MOVE':
                this.drag = true;
                break;
            case 'REMOVE':
                this.drag = false;
                break;
        }
    }    

    public ChangeOptionTypes()
    {
        switch(this.type)
        {
            case 'TREE':
                this.urlSvg = './assets/1.svg';
                break;
            case 'PERSON':
                this.urlSvg = './assets/2.svg';
                break;
        }
    }
}
