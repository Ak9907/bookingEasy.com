import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  url: any = 'https://user-angular-firebase-default-rtdb.firebaseio.com/reservation.json'
  constructor(
    private http:HttpClient
  ) { }


  getReservationData(){
    return this.http.get(this.url)
  }
}
