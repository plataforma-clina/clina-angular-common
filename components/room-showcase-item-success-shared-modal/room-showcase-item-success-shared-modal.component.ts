import { Component, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";
import { AnalyticsService } from "src/app/modules/analytics/analytics.service";
import { EventAnalyticsEnum } from "src/app/modules/analytics/enums/ecommerce.enum";
import { NotifyType } from "src/app/modules/notify/enums/notify-type.enum";
import { NotifyService } from "src/app/modules/notify/notify.service";
import { BsModalRef } from "ngx-bootstrap/modal";
import { RoomDto } from "src/app/modules/common/dtos/room.dto";
import { RoomCardService } from "../../services/room-card.service";

@Component({
  selector: "clina-room-showcase-item-success-shared-modal",
  templateUrl: "./room-showcase-item-success-shared-modal.component.html",
  styleUrls: ["./room-showcase-item-success-shared-modal.component.scss"],
})
export class RoomShowcaseItemSuccessSharedModalComponent implements OnInit {
  room?: RoomDto;

  title?: string;
  subtitle?: string;
  s3name = environment.s3nameFiles;
  copied = false;

  constructor(
    private readonly notifyService: NotifyService,
    private readonly roomCardService: RoomCardService,
    public readonly bsModalRef: BsModalRef
  ) {}

  ngOnInit() {
    /*  Get room */
    this.roomCardService.room.subscribe((room) => {
      this.room = room;
    });
  }

  copyToClipBoard() {
    const url = environment.psUrl;

    navigator.clipboard
      .writeText(url + "/api/share/" + `${this.room?.roomId}`)
      .then(() => {
        this.copied = true;
      })
      .catch((err) => {
        this.copied = false;
        this.notifyService.sendMessage({
          message: "Ocorreu um erro ao copiar ! ",
          type: NotifyType.error,
        });
      });

    AnalyticsService.trackEvent({
      name: EventAnalyticsEnum.SHARE_ROOM,
      data: this.room,
    });
  }
}
