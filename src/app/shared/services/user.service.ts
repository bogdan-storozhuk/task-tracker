import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FbCreateResponse, UserDisplayData } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  create(user: UserDisplayData): Observable<UserDisplayData> {
    return this.http.post(`${environment.fbDbUrl}/users.json`, user).pipe(
      map((response: FbCreateResponse) => ({
        ...user,
        id: response.name,
      }))
    );
  }

  getAll(): Observable<UserDisplayData[]> {
    return this.http.get(`${environment.fbDbUrl}/users.json`).pipe(
      map((response: { [key: string]: any }) => {
        return Object.keys(response).map((key) => ({
          ...response[key],
          id: key,
        }));
      })
    );
  }
}
