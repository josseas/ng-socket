import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit
{
    public nombre : string = '';

    public constructor(private socket: WebsocketService, private router: Router)
    {

    }

    public ngOnInit()
    {

    }

    public Login() : void 
    {
        this.socket.Login(this.nombre)
            .then(() => this.router.navigateByUrl('/mensajes'))
            .catch((err) => console.error(err));
    }
}
