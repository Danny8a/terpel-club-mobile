import {useEffect, useState} from 'react';
import type {UseApiCallState} from '../types/hooks';

export function useApiCall<T>(
  asyncFn: () => Promise<T>,
  dependencies: React.DependencyList = [],
): UseApiCallState<T> {
  const [state, setState] = useState<UseApiCallState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setState(prev => ({...prev, loading: true, error: null}));
        const result = await asyncFn();
        if (mounted) {
          setState({data: result, loading: false, error: null});
        }
      } catch (err: any) {
        if (mounted) {
          setState({
            data: null,
            loading: false,
            error: err,
          });
        }
      }
    })();

    return () => {
      mounted = false;
    };
  }, dependencies);

  return state;
}
