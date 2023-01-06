import { useEffect, useReducer } from "react";
import { TMDBPaginationReducer, initialState } from "@/reducers/TMDBPagination";
import { useTMDB } from "@/hooks/useTMDB";
import { TMDBResponse } from "@/interfaces/fetch";

export const useTMDBPagination = <DataType>(url: string) => {
  const [state, dispatch] = useReducer(
    TMDBPaginationReducer<DataType>,
    initialState
  );

  const fetchMore = () => dispatch({ type: "FETCH_MORE" });

  const { data, error } = useTMDB<TMDBResponse<DataType>>(url, state.data.page);

  useEffect(() => {
    dispatch({ type: "FETCH_INIT" });
  }, []);

  useEffect(() => {
    dispatch({ type: "RESET" });
  }, [url]);

  useEffect(() => {
    if (data) {
      dispatch({ type: "FETCH_SUCCESS", payload: data });
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      dispatch({ type: "FETCH_FAILURE", payload: error });
    }
  }, [error]);

  return { ...state, fetchMore };
};
