import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit
{

    public constructor(public socket: WebsocketService)
    {

    }

    public ngOnInit() 
    {

    }

    public Logout()
    {
        this.socket.Logout();
    }

    public IsAuth() : boolean
    {
        if (this.socket.GetUser())
            return true;
        else
            return false;
    }
}
