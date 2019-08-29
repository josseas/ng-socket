import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GraficoService 
{
    public api: string;

    public constructor(private http: HttpClient)
    {
        this.api = `${environment.ws}/api`;
    }

    public SendVenta(venta: any)
    {
        this.http.post(`${this.api}/grafica`, venta).subscribe
        (
            success =>
            {
                console.log('success', success);
            },
            error =>
            {
                console.error('error', error);
            }
        );
    }
}
