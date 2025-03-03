import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mergeMap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Get64BaseStringFromFolderService {

  constructor(private http: HttpClient) { }
  getBase64Image(imagePath: string): Observable<string> {
    return this.http.get(imagePath, { responseType: 'blob' }).pipe(
      mergeMap(blob => {
        return new Observable<string>((observer) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            observer.next(reader.result as string);
            observer.complete();
          };
          reader.onerror = () => {
            observer.error('Failed to read file');
          };
          reader.readAsDataURL(blob);
        });
      })
    );
  }
}
