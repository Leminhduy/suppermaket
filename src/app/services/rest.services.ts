import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {catchError, tap} from 'rxjs/operators';
import {baseUrl} from '../config/config';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const BaseUrl = baseUrl + 'api/';
const BaseUrl_ = baseUrl;

@Injectable()
export class RestServices {
  constructor(private http: HttpClient) {
  }

  httpHeadersToken(token) {
    const bearerToken = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(token)}`
      })
    };
    return bearerToken;
  }

  httpHeadersTokenCookie(token) {
    const cookieToken = {
      headers: new HttpHeaders({Cookie: `token=${JSON.parse(token)}`})
    };
    return cookieToken;
  }

  // HTTP POST
  http_post(Path, bodyResource: any, tokenResource = null): Observable<object> {
    return this.http.post<any>(BaseUrl + Path, bodyResource, (tokenResource) ? this.httpHeadersToken(tokenResource) : httpOptions).pipe(
      tap( // Log the result or error
        (response: Response) => {
          return response;
        },
        error => this.logError(error)
      )
    );
  }

  // HTTP PUT
  http_put(Path, bodyResource: any, tokenResource = null): Observable<object> {
    return this.http.put<any>(BaseUrl + Path, bodyResource, (tokenResource) ? this.httpHeadersToken(tokenResource) : httpOptions).pipe(
      tap( // Log the result or error
        (response: Response) => {
          return response;
        },
        error => this.logError(error)
      )
    );
  }

  // HTTP GET
  http_get(Path, tokenResource, keyToken = null): Observable<object> {
    switch (keyToken) {
      case 'getTokenCookie':
        return this.http.get(BaseUrl_ + Path, this.httpHeadersTokenCookie(tokenResource)).pipe(
          tap( // Log the result or error
            (response: Response) => {
              return response;
            },
            error => this.logError(error)
          )
        );
      default:
        return this.http.get(BaseUrl_ + Path, (tokenResource) ? this.httpHeadersToken(tokenResource) : httpOptions).pipe(
          tap( // Log the result or error
            (response: Response) => {
              return response;
            },
            error => this.logError(error)
          )
        );
    }
  }

  // HTTP DELETE
  http_delete(Path: string, id: number): Observable<{}> {
    const url = `${BaseUrl + Path}/${id}`; // DELETE api/heroes/42
    return this.http.delete(url, httpOptions);
  }

  http_get_csv(url): Observable<object> {
    return this.http.get(url, {responseType: 'text'}).pipe(
      catchError((error: any) => Observable.throw(error))
    );
  }

  postFile(Path: string, fileToUpload: File, tokenUpload): Observable<object> {
    const httpOptionsUpload = {
      headers: new HttpHeaders({'Authorization': `Bearer ${JSON.parse(tokenUpload)}`})
    };
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.post(BaseUrl + Path, formData, httpOptionsUpload).pipe(
      tap( // Log the result or error
        (response: Response) => {
          return response;
        },
        error => this.logError(error)
      )
    );
  }

  private logError(error: any) {
    return error.error.responseCode;
  }
}
