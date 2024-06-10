import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { NPBService } from 'src/app/core/services/nbp.service';
import * as moment from 'moment';
import { ActivatedRoute, Data } from '@angular/router';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  dataSource: any = [];
  columnsToDisplay = ['currency', 'code', 'mid'];
  types: any = [
    {
      value: 'a',
      viewValue: 'Tabela kursów średnich'
    },
    {
      value: 'b',
      viewValue: 'Tabela kursów średnich dla mniej płynnych walut'
    },
    {
      value: 'c',
      viewValue: 'Tabela kursów kupna i sprzedaży'
    }
  ];
  date =  new FormControl(moment());
  @ViewChild("type", {
    read: MatSelect
  })
  type: MatSelect = this.types[0];

  constructor(private nbp: NPBService, private route: ActivatedRoute) {
    this.route.data.subscribe((data: Data) => {
      this.dataSource = data?.['defaultTable']?.[0]?.rates || [];
    });
  }


  getTable() {
    this.nbp.getTable(this.type.value, this.date.value!).pipe(catchError((err) => of([]))).subscribe((data) => {
      this.dataSource = data[0]?.rates || [];
    });
  }

  onTableTypeChange(event: MatSelectChange) {
    this.getTable();
    this.displayColumnsFor(event);
  }

  displayColumnsFor(e: MatSelectChange): void {
    if (e.value === 'c') {
      this.columnsToDisplay = ['currency', 'code', 'bid', 'ask'];
    } else {
      this.columnsToDisplay = ['currency', 'code', 'mid'];
    }
  }
}
