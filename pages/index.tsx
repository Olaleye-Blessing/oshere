import MediaNav from "@/components/navigation/media/Index";
import GenresNav from "@/components/navigation/genres/Index";

export default function Home() {
  return (
    <main data-cy="homepage" className="overflow-x-hidden md:pt-4">
      <header>
        <MediaNav />
        <GenresNav />
      </header>
    </main>
  );
}
