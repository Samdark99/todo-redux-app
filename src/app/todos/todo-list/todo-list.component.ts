import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Todo } from '../models/todo.model';
import { AppState } from 'src/app/app.reducer';
import { filtrosValidos } from 'src/app/filtro/filtro.actions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos: Todo[] = [];
  filtroActual!: filtrosValidos; 

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    // this.store.select('todos')
    //   .subscribe(todos => this.todos = todos);
    //Cuando no especificas el nodo, te devuelve todos los nodos disponibles en el store
    this.store.subscribe( ({ todos, filtro }) => {
      this.todos = todos;
      this.filtroActual = filtro; 
    });
  }

  
}
