import { PlaceTypeEnum } from '../enums/place-type.enum';

export interface PlaceDto {
  type: PlaceTypeEnum;
  label: string;
  placeId?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  lat?: number;
  lng?: number;
  radius?: number;
}
