import { createReducer, on, Action } from '@ngrx/store';
import { Todo } from './models/todo.model';
import * as actions from './todo.actions';

export const estadoInicial: Todo[] = [
  new Todo('Salvar al mundo'),
  new Todo('Vencer a Thanos'),
  new Todo('Comprar traje de Iron Man'),
  new Todo('Robar escudo del Capitán América'),
];

const _todoReducer = createReducer(
  estadoInicial,
  //Retornas un nuevo arreglo, con ..state lo desestructuras, osea separas cada uno de los arreglos
  //que se tenga y pasas las propiedades, mientras que creas una nueva instancia Todo y lo agregas al final
  on(actions.crear, (state, { texto }) => [...state, new Todo(texto)]),
  on(actions.borrar, (state, { id }) => state.filter((todo) => todo.id !== id)),
  on(actions.borrarAll, (state) => state.filter(todo => !todo.completado)),
  on(actions.toggle, (state, { id }) => {
    return state.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo, //Regreso todas las demás propiedades iguales
          completado: !todo.completado, //Al ser objeto, este hace que la propiedad cambie especificamente ahi
        };
      } else {
        return todo;
      }
    });
  }),
  on(actions.editar, (state, { id, texto }) => {
    return state.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          texto,
        };
      } else {
        return todo;
      }
    });
  }),
  on(actions.toggleAll, (state, { completado }) => {
    return state.map((todo) => {
      return {
        ...todo,
        completado,
      };
    });
  })
);
export function todoReducer(state: Todo[] | undefined, action: Action) {
  return _todoReducer(state, action);
}
