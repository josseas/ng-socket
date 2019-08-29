import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService 
{
    public api: string;

    public constructor(private http: HttpClient)
    {
        this.api = `${environment.ws}/api`;
    }

    public SendEncuesta(encuesta: any)
    {
        this.http.post(`${this.api}/encuesta`, encuesta).subscribe
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
