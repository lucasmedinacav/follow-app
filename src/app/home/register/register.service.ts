import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericResponse } from '../../generic-response.';
import { User } from '../user';

@Injectable({
    providedIn: 'root',
})
export class RegisterService {
    constructor(private http: HttpClient) { }
    configUrl = 'http://localhost:3000/user';

    register(user: User): Observable<GenericResponse> {
        return this.http.post<GenericResponse>(this.configUrl, user);
    }
}
