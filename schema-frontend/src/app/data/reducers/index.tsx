import { EnthusiasmAction } from "../actions";
import { DECREMENT_ENTHUSIASM, INCREMENT_ENTHUSIASM } from "../constants/index";
import { IStoreState } from "../types/index";
/*
	Reducers are just functions that generate changes by creating modified copies of our application's state, 
	but that have no side effects. 
	In other words, they're what we call pure functions.

	Its function will be to ensure that increments raise the enthusiasm level by 1, 
	and that decrements reduce the enthusiasm level by 1, 
	but that the level never falls below 1.
*/

export function enthusiasm(
  state: IStoreState,
  action: EnthusiasmAction
): IStoreState {
  switch (action.type) {
    case INCREMENT_ENTHUSIASM:
      return { ...state, enthusiasmLevel: state.enthusiasmLevel + 1 };
    case DECREMENT_ENTHUSIASM:
      return { ...state, enthusiasmLevel: state.enthusiasmLevel - 1 };
  }
  return state;
}
