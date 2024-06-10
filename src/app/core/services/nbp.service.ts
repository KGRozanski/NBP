import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Table } from '../interfaces/table.interface';
import { CurrencyCodes, TableACodes, TableBCodes } from '../enums/_index';

@Injectable({providedIn: 'root'})
export class NPBService {
    constructor(private http: HttpClient) { }
    
    getTable(type: 'a'|'b'|'c', date: moment.Moment): Observable<Table[]> {
        return this.http.get<Table[]>(`http://api.nbp.pl/api/exchangerates/tables/${type}/${date.format('YYYY-MM-DD')}`);
    }

    getCurrency(code: CurrencyCodes): Observable<Table> {
        return this.http.get<Table>(`http://api.nbp.pl/api/exchangerates/rates/${this.checkTable(code)}/${code}`)
    }

    checkTable(code: CurrencyCodes): 'a'|'b' {
        if (Object.values(TableACodes).includes(code as any)) return 'a';
        if (Object.values(TableBCodes).includes(code as any)) return 'b';
        return 'a';
    }
}