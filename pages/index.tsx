import MediaNav from "@/components/navigation/media/Index";
import GenresNav from "@/components/navigation/genres/Index";
import MainMedias from "@/components/medias/Main";
import PeopleMedias from "@/components/medias/People";

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

const person = {
  src: "https://image.tmdb.org/t/p/w500/hoVuI69nygLQBJ4FqgRKnukDeKt.jpg",
  title: "The Shawshank Redemption",
  department: "Acting",
  popularity: 2_000,
};

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
      <aside className="overflow-x-hidden px-2 mt-4 md:pl-4 xl:bg-black-2 xl:mt-0 xl:h-screen xl:sticky xl:top-0 xl:right-0">
        <PeopleMedias people={Array.from({ length: 50 }, (_, i) => person)} />
      </aside>
    </>
  );
}
