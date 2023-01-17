import {
  FC,
  PropsWithChildren,
  createContext,
  useEffect,
  useReducer,
} from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import LoadingIndicator from "@/components/LoadingIndicator";
import { CommunityState } from "@/reducers/Community";
import { CommunityReducer, initialCommunityState } from "@/reducers/Community";
import { getCommunity, getCommunityRef } from "@/lib/firebase/communities";

interface Context extends CommunityState {}

export const CommunityContext = createContext<Context | undefined>(undefined);

export const CommunityProvider: FC<PropsWithChildren> = ({ children }) => {
  const { status, data } = useSession();
  const router = useRouter();
  let { category, id } = router.query;

  const [state, dispatch] = useReducer(CommunityReducer, initialCommunityState);

  useEffect(() => {
    if (!category && !id) return;

    const communityId = `${category}-${id}`;

    dispatch({
      type: "SET_REF",
      payload: {
        key: "info",
        ref: getCommunityRef(communityId),
      },
    });
  }, [category, id]);

  useEffect(() => {
    if (!state.info.ref) return;

    const getInfo = async () => {
      dispatch({ type: "FETCH_INIT" });

      const community = await getCommunity(state.info.ref);

      if (!community) {
        dispatch({
          type: "FETCH_FAILURE",
          payload: {
            key: "info",
            error: "No such document!",
          },
        });

        return;
      }

      dispatch({
        type: "FETCH_SUCCESS",
        payload: {
          key: "info",
          data: {
            id: community.id,
            ...(community as any).data,
          },
        },
      });
    };

    getInfo();
  }, [state.info.ref]);

  if (status === "loading") return <LoadingIndicator />;

  if (status === "unauthenticated")
    return <p className="error">You must be logged in to enter to chat</p>;

  return (
    <CommunityContext.Provider value={{ ...state, data }}>
      {children}
    </CommunityContext.Provider>
  );
};
