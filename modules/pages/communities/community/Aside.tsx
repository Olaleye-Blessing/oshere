import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { TMDB_IMAGE_BASE_URL } from "@/configs/paths";

const group = {
  name: "MY group 1",
  coverPhoto: "/9PFonBhy4cQy7Jz20NpMygczOkv.jpg",
};

const Aside = () => {
  const [groups, _] = React.useState({
    loading: false,
    error: null,
    data: Array(30).fill(group),
  });

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
    <aside className="community__aside flex flex-col">
      <h5 className="text-center my-5">Users group</h5>
      <ul className="flex items-center justify-center flex-col overflow-y-auto">
        {groups.data.map((group, index) => (
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
    </aside>
  );
};

export default Aside;
