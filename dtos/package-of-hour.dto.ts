export enum RoomPackageOfHoursTypeEnum {
  CONSECUTIVE_HOURS = 'CONSECUTIVE_HOURS',
  NON_CONSECUTIVE_HOURS = 'NON_CONSECUTIVE_HOURS',
}

export interface PackageOfHourDto {
  packageOfHoursId: string;
  type: RoomPackageOfHoursTypeEnum;
  amountOfHours: number;
  discountInPercent?: number;
  roomId?: string;
}
