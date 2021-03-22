import { Action, createReducer, on } from "@ngrx/store";
import * as actions from './filtro.actions';

export const initialState = "todos";

const _filtroReducer = createReducer(
    initialState,
    on(actions.setFiltro, (state, { filtro }) => filtro)
);

export function filtroReducer(state: any, action: Action){
    return _filtroReducer(state, action);
}