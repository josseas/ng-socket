import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Usuario } from 'src/app/models/usuario';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styles: []
})
export class ListaUsuariosComponent implements OnInit, OnDestroy
{
    public usuarios: Array<Usuario>;
    public listen: Subscription;
    
    public constructor(public socket: WebsocketService)
    {
        this.usuarios = new Array<Usuario>();
        this.listen = new Subscription();
    }

    public ngOnInit()
    {
        this.listen = this.socket.Listen('USUARIOS_ACTIVOS').subscribe
        (
            payload => this.usuarios = payload.usuarios
        );

        this.socket.Emit('GET_ACTIVE_USERS');
    }

    public ngOnDestroy()
    {
        this.listen.unsubscribe();
    }
}
