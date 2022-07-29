import { AxiosPromise, AxiosError } from 'axios';
import { useEffect, useState } from "react";
import Response from 'interfaces/response'

interface ResponseStatus {
  isLoading: boolean
  isError: boolean
}

interface BaseProviderParams<T> {
  action: () => AxiosPromise<Response<T>>
  dependencies: any[]
  condition?: boolean
  cb?: (data: T) => void
  errCb?: (err: AxiosError<T>) => void
}

interface BaseProviderReturn<T> extends ResponseStatus {
  data: T
  error?: AxiosError<T>
  setData: (value: T) => void
}

const useBaseProvider = <T>({ action, dependencies, condition = true, cb, errCb }: BaseProviderParams<T>): BaseProviderReturn<T> => {
  const [data, setData] = useState<T>({} as T);
  const [error, setError] = useState<AxiosError<T> | undefined>();
  const [responseStatus, setResponseStatus] = useState<ResponseStatus>({
    isLoading: true,
    isError: false
  });

  useEffect(() => {
    if (condition) {
      setData({} as T);
      setError(undefined);
      setResponseStatus({
        isLoading: true,
        isError: false
      })
      action().then(res => {
        setData(res.data.data);
        setError(undefined);
        setResponseStatus({
          isLoading: false,
          isError: false
        });
        if (cb) cb(res.data.data);
      }).catch((err: AxiosError<T>) => {
        console.log(err);
        setData({} as T);
        setError(err);
        setResponseStatus({
          isLoading: false,
          isError: true
        });
        if (errCb) errCb(err);
      })
    }
  }, [...dependencies, condition]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    data,
    error,
    setData,
    ...responseStatus
  };
}

export default useBaseProvider;