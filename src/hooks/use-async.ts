import { useCallback, useReducer, useRef } from "react";

type OperationStatus = "idle" | "pending" | "resolved" | "rejected";

type AsyncOperationState<T> = {
  data: T | undefined;
  status: OperationStatus;
  error: Error | null;
  queried: boolean;
};

const defaultState = {
  data: undefined,
  error: null,
  status: "idle" as OperationStatus,
  queried: false,
};

type AsyncReducerState<T> = (
  state: AsyncOperationState<T>,
  action: Partial<AsyncOperationState<T>>
) => AsyncOperationState<T>;

function useAsync<T>() {
  const initialStateRef = useRef(defaultState);
  const [{ status, data, error, queried }, setState] = useReducer<
    AsyncReducerState<T>
  >((state, action) => ({ ...state, ...action }), initialStateRef.current);

  const setData = useCallback(
    (data: T) => setState({ data, status: "resolved" }),
    []
  );

  const setError = useCallback(
    (error: Error) => setState({ error, status: "rejected" }),
    []
  );

  const reset = useCallback(() => setState(initialStateRef.current), []);

  const run = useCallback(
    (promise: Promise<T>) => {
      if (!promise || !promise.then) {
        throw new Error(
          `The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?`
        );
      }

      setState({ status: "pending", queried: true });

      promise.then(
        (data: T) => {
          setData(data);
          return data;
        },
        (error: Error) => {
          setError(error);
          return Promise.reject(error);
        }
      );
    },
    [setData, setError]
  );

  return {
    status,
    data,
    error,
    setData,

    reset,
    run,

    isIdle: status == "idle",
    isError: status == "rejected",
    isLoading: status == "pending",
    isSuccess: status == "resolved",
    isQueried: queried == true,
  };
}

export { useAsync };
