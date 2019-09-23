
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericResponse } from '../generic-response.';
import { User } from '../home/user';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private http: HttpClient) { }
    configUrl = 'http://localhost:3000/user';

    search(name: string, idUser: string): Observable<User[]> {
        return this.http.get<User[]>
            (`${this.configUrl}/findByName?name=${name}&idUser=${idUser}`);
    }

    getAllFollowers(idUser: string): Observable<User[]> {
        return this.http.get<User[]>
            (`${this.configUrl}/followers?idFollowed=${idUser}`);
    }

    getWhoUserFollows(idUser: string): Observable<User[]> {
        return this.http.get<User[]>
            (`${this.configUrl}/following?idFollower=${idUser}`);
    }

    follow(idLogged: string, idUser: string): Observable<GenericResponse> {
        const body = { idFollower: idLogged, idFollowed: idUser };
        return this.http.post<GenericResponse>
            (`${this.configUrl}/follow`, body);
    }

    unfollow(idLogged: string, idUser: string): Observable<GenericResponse> {
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            body: {
                idUnfollower: idLogged, idUnfollowed: idUser
            },
        };

        return this.http.delete<GenericResponse>
            (`${this.configUrl}/unfollow`, options);
    }
}
