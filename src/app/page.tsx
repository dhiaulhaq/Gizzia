import Banner from "@/components/Banner";
import FeaturedArticles from "@/components/FeaturedArticles";

export default async function Home() {
  return (
    <div>
      <main>
        <Banner />
        <FeaturedArticles />
      </main>
    </div>
  );
}
