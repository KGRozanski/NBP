import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { NPBService } from '../services/nbp.service';
import * as moment from 'moment';
import { Table } from '../interfaces/table.interface';
import { Observable, catchError, of } from 'rxjs';

export const NBPResolver: ResolveFn<Table[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(NPBService)
    .getTable('a', moment())
    .pipe(
      catchError((err) => {
        return of([]);
      })
    );
};
