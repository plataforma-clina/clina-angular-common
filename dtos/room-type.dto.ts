import { RoomTypeEnum } from '../enums/room-type.enum';

export interface RoomTypeDto {
  img: [string, string];
  title: string;
  description: string;
  selected: boolean;
  value: RoomTypeEnum;
}
