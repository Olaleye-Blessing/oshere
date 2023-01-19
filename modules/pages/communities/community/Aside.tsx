import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { TMDB_IMAGE_BASE_URL } from "@/configs/paths";
import { getUserLiveData, getUserRef } from "@/lib/firebase/users";
import { useCommunityContext } from "@/hooks/useCommunityContext";
import { User } from "@/interfaces/user";
import LoadingIndicator from "@/components/LoadingIndicator";

const Aside = () => {
  const { data: userData, dispatch, communities } = useCommunityContext();

  useEffect(() => {
    dispatch({
      type: "FETCH",
      payload: {
        key: "communities",
      },
    });

    const userRef = getUserRef(userData!.user.id!);

    const unsubscribe = getUserLiveData(userRef, (data: User) => {
      dispatch({
        type: "FETCH_SUCCESS",
        payload: {
          key: "communities",
          data: data.communities,
        },
      });
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const closeAside = () => {
      document.querySelector(".community__aside")?.classList.remove("open");
    };

    document.addEventListener("click", closeAside);

    return () => {
      document.removeEventListener("click", closeAside);
    };
  }, []);

  return (
    <aside className="community__aside py-5">
      {communities.loading ? (
        <LoadingIndicator />
      ) : communities.error ? (
        <p className="error">{communities.error}</p>
      ) : (
        <ul className="flex items-center justify-center flex-col overflow-y-auto">
          {communities.data.map((group, index) => (
            <li key={index} className="max-w-max mx-auto px-2 mb-5">
              <Link href="/communities" className="block">
                <figure className="flex items-center justify-center rounded-[50%]">
                  <Image
                    src={`${TMDB_IMAGE_BASE_URL}/original${group.coverPhoto}`}
                    alt=""
                    width={500}
                    height={500}
                    className="w-[3rem] h-[3rem] rounded-[50%]"
                  />
                </figure>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};

export default Aside;
