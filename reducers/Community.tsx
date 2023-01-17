import { CommunityMetadata } from "@/interfaces/community";

export interface CommunityState {
  info: {
    data: CommunityMetadata | null;
    error: string | null;
    loading: boolean;
    ref: any;
  };
}

export const initialCommunityState: CommunityState = {
  info: {
    data: null,
    error: null,
    loading: true,
    ref: null,
  },
};

type SetRef = {
  type: "SET_REF";
  payload: {
    key: "info";
    ref: any;
  };
};

type Fetch = {
  type: "FETCH";
  payload: {
    key: "info";
  };
};

type FetchInit = {
  type: "FETCH_INIT";
};

type FetchSuccess = {
  type: "FETCH_SUCCESS";
  payload: {
    key: "info";
    data: any;
  };
};

type FetchFailure = {
  type: "FETCH_FAILURE";
  payload: {
    key: "info";
    error: string;
  };
};

type Action = SetRef | Fetch | FetchInit | FetchSuccess | FetchFailure;

export const CommunityReducer = (
  state: CommunityState,
  action: Action
): any => {
  let currentState = { ...state };

  switch (action.type) {
    case "SET_REF":
      currentState[action.payload.key].ref = action.payload.ref;
      break;
    case "FETCH":
      currentState[action.payload.key].loading = true;
      break;
    case "FETCH_INIT":
      currentState = {
        ...initialCommunityState,
        info: {
          ...initialCommunityState.info,
          ref: currentState.info.ref,
        },
      };
      break;
    case "FETCH_SUCCESS":
      currentState[action.payload.key].loading = false;
      currentState[action.payload.key].data = action.payload.data;
      break;
    case "FETCH_FAILURE":
      currentState[action.payload.key].loading = false;
      currentState[action.payload.key].error = action.payload.error;
      break;
  }

  return currentState;
};
