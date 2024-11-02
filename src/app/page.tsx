import Navbar from "@/components/Navbar"
import Banner from "@/components/Banner"
import FeaturedArticles from "@/components/FeaturedArticles"
import Footer from "@/components/Footer"

export default async function Home() {
  return (
    <div>
      <Navbar />
      <main>
        <Banner />
        <FeaturedArticles />
      </main>
      <Footer />
    </div>
  );
}