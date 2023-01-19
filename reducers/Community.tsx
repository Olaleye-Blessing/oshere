import { CommunityMessage, CommunityMetadata } from "@/interfaces/community";
import { User } from "@/interfaces/user";

export interface CommunityState {
  info: {
    data: CommunityMetadata | null;
    error: string | null;
    loading: boolean;
    ref: any;
  };
  messages: {
    data: CommunityMessage[];
    error: string | null;
    loading: boolean;
    ref: any;
  };
  communities: {
    data: User["communities"];
    error: string | null;
    loading: boolean;
  };
}

export const initialCommunityState: CommunityState = {
  info: {
    data: null,
    error: null,
    loading: true,
    ref: null,
  },
  messages: {
    data: [],
    error: null,
    loading: true,
    ref: null,
  },
  communities: {
    data: [],
    error: null,
    loading: true,
  },
};

type SetRef = {
  type: "SET_REF";
  payload: {
    key: "info" | "messages";
    ref: any;
  };
};

type Fetch = {
  type: "FETCH";
  payload: {
    key: "info" | "messages" | "communities";
  };
};

type FetchInit = {
  type: "FETCH_INIT";
};

type FetchSuccess = {
  type: "FETCH_SUCCESS";
  payload: {
    key: "info" | "messages" | "communities";
    data: any;
  };
};

type FetchFailure = {
  type: "FETCH_FAILURE";
  payload: {
    key: "info" | "messages" | "communities";
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
