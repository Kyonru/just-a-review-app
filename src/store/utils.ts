import { StoreReducerAction } from 'src/@types/store';

export function createReduxAction<S>(type: string, payload?: any): S {
  return ({
    payload,
    type,
  } as any) as S;
}

export class ReducerActionMapper<T> {
  actions: StoreReducerAction<T> = {};

  add = (key: string, reducer: (state: T, payload?: any) => T) => {
    this.actions[key] = reducer;
  };

  mapAction = (type: string, state: T, payload?: any) => {
    if (!this.actions[type]) {
      return state;
    }
    return this.actions[type](state, payload);
  };
}
