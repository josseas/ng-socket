import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Usuario } from 'src/app/models/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styles: []
})
export class MensajesComponent implements OnInit
{
    public constructor(public socket: WebsocketService, private router: Router)
    {

    }

    public ngOnInit()
    {

    }

    public Logout()
    {
        this.socket.Logout();
    }
}
