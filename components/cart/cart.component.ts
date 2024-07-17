import { Component, OnInit } from '@angular/core';
import { CartAppointmentBucketDto } from 'app/modules/maleta/dtos/cart-appointment-bucket.dto';
import { CartValidatedDto } from 'app/modules/maleta/dtos/cart-validated.dto';
import { MaletaService } from 'app/modules/maleta/maleta.service';
import { ScheduleDto } from 'app/modules/room/dtos/schedule.dto';

@Component({
  selector: 'clina-navbar-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class NavbarCartComponent implements OnInit {
  schedules: ScheduleDto[] = [];
  cartAppointmentBuckets: CartAppointmentBucketDto[] = [];
  cartSubscriptions: any[] = [];

  public get count(): number {
    return this.cartAppointmentBuckets.length + this.cartSubscriptions.length;
  }

  constructor(private readonly maletaService: MaletaService) {}

  ngOnInit(): void {
    this.maletaService.$cart.subscribe({
      next: (cart: CartValidatedDto) => {
        this.cartAppointmentBuckets = cart?.appointmentBuckets || [];
      },
    });
  }
}
