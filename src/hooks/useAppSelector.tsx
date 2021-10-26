import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../redux/store';

// https://redux.js.org/usage/usage-with-typescript#define-typed-hooks
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
