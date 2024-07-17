import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { CLINIC_LOCATIONS_QUERY } from '../queries/clinic-locations.query';
import { ClinicLocationDto } from '../dtos/clinic-locations.dto';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClinicLocationsGetService {
  constructor(private readonly apollo: Apollo) {}

  handle(): Observable<ClinicLocationDto[]> {
    return this.apollo
      .use('v2')
      .query({
        query: CLINIC_LOCATIONS_QUERY,
      })
      .pipe(map((res: any) => res.data.clinicLocations));
  }
}
