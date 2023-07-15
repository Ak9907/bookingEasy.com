import { Component } from '@angular/core';
import { Database, update, ref, set } from '@angular/fire/database';
import { ReservationService } from './reservation.service';
import { fromEvent, filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'booking.com';
  seatData: any;
  totalSeats: number = 0;
  btnDisable: boolean = true;
  availableSeats: any;
  updateSeats: any;
  bookedSeates:any;
  seatNumbers:boolean = false;
  url: any = 'https://user-angular-firebase-default-rtdb.firebaseio.com/users'


  constructor(
    private database: Database,
    private reservationService: ReservationService
  ) {

  }

  ngOnInit(): void {
    this.seatNumbers = false;
    this.bookedSeates = [];
    this.updateSeats = [];
    this.reservationService.getReservationData().subscribe((res: any) => {
      this.seatData = res;
      console.log(this.seatData)
    })
  }

  validateSeats(seatCount: number) {
    if (seatCount > 7 || seatCount <= 0 || seatCount == null) {
      this.btnDisable = true;
    }
    else {
      this.totalSeats = seatCount;
      this.btnDisable = false;
    }
  }

  bookNow() {
    console.log("total seats",this.totalSeats);
    this.availableSeats = this.seatData.filter((item: any) => item.booked === false)
    this.updateSeats = (this.availableSeats).slice(0, this.totalSeats)
    this.updateSeats.map((avSeats: any) => {
    
   
      update(ref(this.database, "reservation/" + avSeats.id), {
        booked: true
      })
      this.bookedSeates.push(avSeats.seatNo)
      console.log(this.bookedSeates);
      this.seatNumbers = true;
    })

  }
  update() {
    for (let i = 0; i <= 80; i++) {
      set(ref(this.database, "reservation/" + i), {
        id: i,
        seatNo: i + 1,
        booked: false
      })
    }
  }
}
