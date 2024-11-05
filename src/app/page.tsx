import Navbar from "@/components/Navbar"
import Banner from "@/components/Banner"
import FeaturedArticles from "@/components/FeaturedArticles"
import Footer from "@/components/Footer"
import { ArticleModel, getArticles } from "@/db/models/article"

export default async function Home() {
  const article: ArticleModel[] = await getArticles()
  return (
    <div>
      <Navbar />
      <main>
        <Banner />
        <FeaturedArticles articles={article} />
      </main>
      <Footer />
    </div>
  );
}