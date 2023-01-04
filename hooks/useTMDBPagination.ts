import { useEffect, useReducer } from "react";
import { TMDBPaginationReducer, initialState } from "@/reducers/TMDBPagination";
import { useTMDB } from "@/hooks/useTMDB";

export const useTMDBPagination = <DataType>(url: string) => {
  const [state, dispatch] = useReducer(
    TMDBPaginationReducer<DataType>,
    initialState
  );

  // create a function that increments the page number
  const fetchMore = () => dispatch({ type: "FETCH_MORE" });

  const { data, error } = useTMDB<DataType>(url, state.data.page);

  useEffect(() => {
    dispatch({ type: "FETCH_INIT" });
  }, []);

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

  useEffect(() => {
    dispatch({ type: "RESET" });
  }, [url]);

  return { ...state, fetchMore };
};
