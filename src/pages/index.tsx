import SearchBar from "@/components/Static/SearchBar";
import { NextSeo } from "next-seo";

/**
 * The Home component serves as the main entry point for the application.
 * It sets up the SEO metadata for the page using the NextSeo component.
 *
 * @returns {JSX.Element} The rendered Home component.
 */
export default function Home() {
  return (
    <>
      <NextSeo
        title={`Sol's RNG inventory value calculator`}
        description={`Description`}
      />
      <div className="w-full flex items-center justify-center flex-col max-w-screen-xl mx-auto px-4">
        <SearchBar />
        <main className="flex w-full h-[2200px]">page content</main>
      </div>
    </>
  );
}
