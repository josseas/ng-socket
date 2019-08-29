import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { WebsocketService } from '../services/websocket.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanActivate
{
    public constructor(private socket: WebsocketService, private router: Router)
    {

    }

    public canActivate()
    {
        if (this.socket.GetUser())
            return true;
        else
        {
            this.router.navigateByUrl('/login');
            return false;
        }
    }
}
