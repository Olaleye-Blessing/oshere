interface Data<ResultType> {
  page: number;
  results: ResultType[];
  total_pages: number;
  total_results: number;
}

export interface State<DataType> {
  data: Data<DataType>;
  error: undefined | string;
  loading: "idle" | "init" | "more";
}

type Action<ResultType> =
  | { type: "FETCH_INIT" }
  | { type: "FETCH_MORE" }
  | { type: "FETCH_SUCCESS"; payload: Data<ResultType> }
  | { type: "FETCH_FAILURE"; payload: string }
  | { type: "RESET" };

export const initialState: State<any> = {
  data: {
    page: 1,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
  error: undefined,
  loading: "init",
};

export const TMDBPaginationReducer = <DataType,>(
  state: State<DataType>,
  action: Action<DataType>
): State<DataType> => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        loading: "init",
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: "idle",
        data: {
          ...action.payload,
          results: [...state.data.results, ...action.payload.results],
        },
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        loading: "idle",
        error: action.payload,
      };
    case "FETCH_MORE":
      return {
        ...state,
        loading: "more",
        data: {
          ...state.data,
          page: state.data.page + 1,
        },
      };
    case "RESET":
      return { ...initialState };

    default:
      throw new Error(`Unhandled action type`);
  }
};
