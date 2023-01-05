import MediaNav from "@/components/navigation/media/Index";
import GenresNav from "@/components/navigation/genres/Index";
import MainMedias from "@/components/medias/Main";
import Aside from "modules/pages/home/Aside";

const items = [
  {
    src: "https://image.tmdb.org/t/p/w500/hoVuI69nygLQBJ4FqgRKnukDeKt.jpg",
    title: "The Shawshank Redemption",
    overview:
      "Two imprisoned actors bond over a number of years, finding solace and eventual redemption through acts of common decency.",
  },
  {
    src: "https://image.tmdb.org/t/p/w500/hoVuI69nygLQBJ4FqgRKnukDeKt.jpg",
    title: "Merlin",
    overview:
      "The adventures of Merlin, king Arthur and his knights of the round table.",
  },
];

export default function Home() {
  return (
    <>
      <main data-cy="homepage" className="overflow-x-hidden md:pt-4">
        <header>
          <MediaNav />
          <GenresNav />
        </header>
        <section className="">
          <MainMedias
            medias={[
              ...items,
              ...items,
              ...items,
              ...items,
              ...items,
              ...items,
            ]}
          />
        </section>
      </main>
      <Aside />
    </>
  );
}
