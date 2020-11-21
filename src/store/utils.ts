export function createReduxAction<S>(type: string, payload?: any): S {
  return ({
    payload,
    type,
  } as any) as S;
}
