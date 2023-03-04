import { ApolloError, DocumentNode, OperationVariables, QueryHookOptions, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

type ApiQueryResponse<TData, TError> = {
  data?: TData;
  error?: TError;
};

const useApiQuery = <TData, TVariables extends OperationVariables>(
  queryDocument: DocumentNode,
  options?: QueryHookOptions<TData, TVariables>
) => {
  const { data, error, loading } = useQuery<TData, TVariables>(queryDocument, options);
  const [response, setResponse] = useState<ApiQueryResponse<TData, ApolloError>>();
  const [responseLoading, setResponseLoading] = useState<boolean>(true);

  useEffect(() => {
    setResponse({ data });
  }, [data]);

  useEffect(() => {
    setResponseLoading(loading);
  }, [loading]);

  useEffect(() => {
    setResponse({ error });
  }, [error]);

  return { response, loading: responseLoading };
};

export default useApiQuery;
