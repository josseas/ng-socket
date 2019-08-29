import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService
{
    public usuario: Usuario;
    public status: boolean;

    public constructor(private socket: Socket, private router: Router)
    {
        this.GetFromLocalStorage();
        this.CheckStatus();
    }

    public CheckStatus()
    {
        this.socket.on
        (
            'connect', () =>
            {
                this.status = true;
                this.GetFromLocalStorage();
                console.log('Conectado al servidor', this.status);
            }
        );

        this.socket.on
        (
            'disconnect', () =>
            {
                this.status = false;
                console.log('Desconectado del servidor', this.status);
            }
        );
    }

    public Emit(event: string, payload?: any, callback?: Function) : void
    {
        this.socket.emit(event, payload, callback);
    }

    public Listen(event: string) : Observable<any>
    {
        console.log('_____event', event)
        return this.socket.fromEvent(event);
    }

    public Login(nombre: string)
    {
        return new Promise
        (
            (resolve, reject) =>
            {
                this.socket.emit
                (
                    'CONFIGURAR-USUARIO', { nombre }, (resp) =>
                    {
                        this.usuario = new Usuario(nombre);
                        this.SaveInLocalStorage();
                        resolve();
                    }
                );
            }
        );
    }

    public Logout()
    {
        this.usuario = null;
        localStorage.removeItem('usuario');

        this.socket.emit
        (
            'CONFIGURAR-USUARIO', { nombre: '<sin-nombre>' }, (algo) => 
            {
                console.log('algo', algo);
            }
        );
        this.router.navigateByUrl('');
    }

    public SaveInLocalStorage()
    {
        localStorage.setItem('usuario', JSON.stringify(this.usuario));
    }

    public GetFromLocalStorage()
    {
        if (localStorage.getItem('usuario'))
        {
            this.usuario = JSON.parse(localStorage.getItem('usuario'));
            this.Login(this.usuario.nombre);
        }
    }

    public GetUser() : Usuario
    {
        return this.usuario;
    }
}
