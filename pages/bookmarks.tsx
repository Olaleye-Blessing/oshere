import { useEffect, useState } from "react";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import LoadingIndicator from "@/components/LoadingIndicator";
import { Fetching } from "@/interfaces/fetch";
import { getUserLiveData, getUserRef } from "@/lib/firebase/users";
import { User } from "@/interfaces/user";
import { Bookmark, Movie, TvShow } from "@/interfaces/common";
import Media from "@/components/medias/Media";
import Link from "next/link";

const Bookmarks: NextPage = () => {
  const { data, status } = useSession();
  const [bookmarks, setBookmarks] = useState<Fetching<Bookmark[]>>({
    loading: true,
    data: [],
    error: null,
  });

  useEffect(() => {
    if (!data) return;

    const userRef = getUserRef(data.user.id!);

    const unsubscribe = getUserLiveData(userRef, ({ bookmarks }: User) => {
      setBookmarks({
        loading: false,
        data: bookmarks || [],
        error: null,
      });
    });

    return unsubscribe;
  }, [data]);

  if (status === "loading") return <LoadingIndicator />;

  if (status === "unauthenticated")
    return <p className="error">You must be logged in to view this page.</p>;

  return (
    <>
      <div className="px-2 md:pl-4 xl:pt-4">
        <header className="">
          <h1 className="mb-6 pt-4">Bookmarks</h1>
        </header>
        <main className="px-0">
          {bookmarks.loading ? (
            <LoadingIndicator />
          ) : bookmarks.error ? (
            <p className="error">{bookmarks.error}</p>
          ) : (
            <>
              {bookmarks.data.length === 0 ? (
                <p>
                  You do not have any bookmarks yet.{" "}
                  <Link
                    className="text-red-primary hover:text-opacity-70"
                    href="/?category=movies"
                  >
                    Go to movies
                  </Link>{" "}
                  and{" "}
                  <Link
                    className="text-red-primary hover:text-opacity-70"
                    href="/?category=tvshows"
                  >
                    tv shows
                  </Link>{" "}
                  to add some.
                </p>
              ) : (
                <ul className="grid gap-y-8 gap-x-4 grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] justify-items-start sm:mx-0">
                  {bookmarks.data.map((bookmark) => {
                    return (
                      <Media
                        key={bookmark.id}
                        category={bookmark.category}
                        media={bookmark}
                        className="sm:mx-0"
                      />
                    );
                  })}
                </ul>
              )}
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default Bookmarks;
