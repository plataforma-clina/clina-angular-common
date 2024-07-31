import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { RoomDto } from "src/app/modules/common/dtos/room.dto";

@Injectable({ providedIn: "root" })
export class RoomCardService {
  public room = new BehaviorSubject<RoomDto | undefined>(undefined);

  setRoom(room: RoomDto) {
    this.room.next(room);
  }
}
