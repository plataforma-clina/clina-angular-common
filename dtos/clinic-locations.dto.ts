export interface ClinicLocationDto {
  state: string;
  cities: ClinicLocationCityDto[];
}

export interface ClinicLocationCityDto {
  city: string;
  neighborhoods: string[];
}
