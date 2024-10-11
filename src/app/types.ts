interface QueryResult<T> {
  status: 'initial' | 'loading' | 'success' | 'error';
  error?: string;
  result?: T;
}

export type { QueryResult };
