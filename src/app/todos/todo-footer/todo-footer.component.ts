import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

import * as filtrosActions from '../../filtro/filtro.actions';
import * as actions from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css'],
})
export class TodoFooterComponent implements OnInit {
  filtroActual: filtrosActions.filtrosValidos = 'todos';
  filtros: filtrosActions.filtrosValidos[] = ['todos', 'pendientes', 'completados'];
  pendientes: number = 0;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    // this.store
    //   .select('filtro')
    //   .subscribe((filtro) => (this.filtroActual = filtro));
    this.store.subscribe(state => {
      this.filtroActual = state.filtro;
      this.pendientes = state.todos.filter(todo => !todo.completado).length;
    });
  }

  cambiarFiltro(filtro: filtrosActions.filtrosValidos){
    this.store.dispatch(filtrosActions.setFiltro({filtro}));
  }

  borrarTodos(){
    this.store.dispatch(actions.borrarAll());
  }
}
