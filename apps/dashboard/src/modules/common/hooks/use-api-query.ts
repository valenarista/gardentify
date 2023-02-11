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

  useEffect(() => {
    if (data) setResponse({ data });
  }, [data]);

  useEffect(() => {
    if (error) setResponse({ error });
  }, [error]);

  return { response, loading };
};

export default useApiQuery;
