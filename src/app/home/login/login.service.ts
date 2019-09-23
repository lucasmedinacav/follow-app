import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericResponse } from '../../generic-response.';

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    constructor(private http: HttpClient) { }
    configUrl = 'http://localhost:3000/user';

    login(userName: string, password: string): Observable<GenericResponse> {
        return this.http.get<GenericResponse>(
            `${this.configUrl}/login?login=${userName}&password=${password}`);
    }
}
