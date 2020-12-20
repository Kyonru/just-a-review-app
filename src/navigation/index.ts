import * as React from 'react';
import { SCREEN_NAMES } from './constants';

export const navigationRef = React.createRef<any>();

export function navigate(name: SCREEN_NAMES, params: any) {
  navigationRef.current?.navigate(name, params);
}
