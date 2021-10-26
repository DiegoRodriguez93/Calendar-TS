import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';

// https://redux.js.org/usage/usage-with-typescript#define-typed-hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
