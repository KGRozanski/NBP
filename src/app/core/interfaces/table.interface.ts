import { Rate } from "./rate.interface";

export interface Table {
    table: 'a'|'b'|'c';
    no: string;
    effectiveDate: string;
    rates: Rate[]; 
}
