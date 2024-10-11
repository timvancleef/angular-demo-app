import { QueryResult } from '../types';

const initialResult = <T>(): QueryResult<T> => {
  return {
    status: 'initial',
  };
};

const loadingResult = <T>(): QueryResult<T> => {
  return {
    status: 'loading',
  };
};

const successResult = <T>(result: T): QueryResult<T> => {
  return {
    status: 'success',
    result,
  };
};

const errorResult = <T>(error: string): QueryResult<T> => {
  return {
    status: 'error',
    error,
  };
};

export { initialResult, loadingResult, successResult, errorResult };
