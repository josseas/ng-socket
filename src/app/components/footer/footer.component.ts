import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: []
})
export class FooterComponent implements OnInit
{
    public year: number;

    public constructor(public socket: WebsocketService)
    {
        this.year = new Date().getFullYear();
    }

    public ngOnInit()
    {
        
    }
}
