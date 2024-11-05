import { Facebook, Twitter } from "lucide-react";
import { ArticleModel } from "@/db/models/article";
import { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

type idType = {
  id: string;
};

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  try {
    const response = await fetch(`${BASE_URL}/api/articles/${params.id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data }: { data: ArticleModel } = await response.json();
    if (!data) {
      throw new Error("No data found for the article");
    }

    return {
      title: data.title,
      description: data.content,
      icons: {
        icon: "/favicon.ico",
      },
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return {
      title: "Article not found",
      description: "The requested article could not be found.",
      icons: {
        icon: "/favicon.ico",
      },
    };
  }
}

const ArticleDetail = async ({ params }: { params: idType }) => {
  const response = await fetch(`${BASE_URL}/api/articles/${params.id}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const { data }: { data: ArticleModel } = await response.json();
  // console.log(data);

  return (
    <>
      <section className="w-full bg-white px-4 py-6">
        <div className="container mx-auto max-w-6xl px-4 py-8">
          <div className="mb-8 flex items-center gap-2">
            <h2 className="text-xl font-medium text-blue-500">
              {data?.category} Articles
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="relative">
              <img
                alt={data?.title}
                className="rounded-lg object-cover w-full h-auto"
                src={data?.imageUrl}
              />
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                {data?.title}
              </h1>

              <p className="text-gray-600 whitespace-pre-line">
                {data?.content}
              </p>

              <div className="flex flex-wrap gap-2">
                {data?.tags.map((tags, index) => (
                  <span
                    key={index}
                    className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
                  >
                    {tags}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">
                  Share with
                </span>
                <button className="rounded-full bg-gray-100 p-2 hover:bg-gray-200">
                  <Facebook className="h-5 w-5 text-gray-600" />
                </button>
                <button className="rounded-full bg-gray-100 p-2 hover:bg-gray-200">
                  <Twitter className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ArticleDetail;
