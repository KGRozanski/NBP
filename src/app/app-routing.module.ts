import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NBPResolver } from './core/resolver/nbp.resolver';
import { TableComponent } from './components/table/table.component';
import { ConverterComponent } from './components/converter/converter.component';

const routes: Routes = [
  {path: 'home', component: TableComponent, resolve: {defaultTable: NBPResolver}},
  {path: 'converter', component: ConverterComponent},
  {path: '**', redirectTo: '/home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
