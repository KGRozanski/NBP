import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, catchError, map, of, startWith } from 'rxjs';
import { CurrencyCodes } from 'src/app/core/enums/currency_codes__ISO4217.enum';
import { NPBService } from 'src/app/core/services/nbp.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
})
export class ConverterComponent implements OnInit {
  ratesA: string[] = Object.values(CurrencyCodes);
  ratesB: string[] = Object.values(CurrencyCodes);
  codeACtrl = new FormControl(null);
  codeBCtrl = new FormControl(null);
  amountA = new FormControl<any>(null);
  amountB = new FormControl<any>(null);
  filteredOptionsA: Observable<string[]> | undefined;
  filteredOptionsB: Observable<string[]> | undefined;
  rateA: number = 0;
  rateB: number = 0;
  outcome: number = 0;

  constructor(private nbp: NPBService) {}

  ngOnInit() {
    this.filteredOptionsA = this.codeACtrl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterA(value || ''))
    );

    this.filteredOptionsB = this.codeBCtrl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterB(value || ''))
    );
  }

  private _filterA(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.ratesA.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private _filterB(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.ratesB.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  onCurrencyASelect(event: MatAutocompleteSelectedEvent) {
    if (event.option.value === 'PLN') {
      this.rateA = 1;
      this.calcB();
      return;
    }
    this.getMid(event.option.value).subscribe((mid) => {
      this.rateA = mid;
      this.calcB();
    });
  }

  onCurrencyBSelect(event: MatAutocompleteSelectedEvent) {
    if (event.option.value === 'PLN') {
      this.rateB = 1;
      this.calcB();
      return;
    }
    this.getMid(event.option.value)
      .subscribe((mid) => {
        this.rateB = mid;
        this.calcB();
      });
  }

  getMid(code: CurrencyCodes): Observable<number> {
    return new Observable((observer) => {
      this.nbp.getCurrency(code).subscribe((data) => {
        observer.next(data.rates[0].mid);
      });
    });
  }

  calcA(): void {
    if (!this.amountA.value && !this.amountB.value) return;
    if (this.amountA.value && !this.codeBCtrl.value) return;
    this.amountA.setValue(((this.amountB.value! * this.rateB) / this.rateA).toFixed(2), {
      emitEvent: false,
      onlySelf: true,
    });
  }

  calcB(): void {
    if (!this.amountA.value && !this.amountB.value) return;
    if (this.amountB.value && !this.codeACtrl.value) return;
    this.amountB.setValue(((this.amountA.value! * this.rateA) / this.rateB).toFixed(2), {
      emitEvent: false,
      onlySelf: true,
    });
  }
}
