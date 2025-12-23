import { useState } from "react";
import { Link } from "react-router-dom";
// import moment from "moment";
import { newsData, NewsItem } from "@/data/newsData";

export default function NewsList() {

  const [posts] = useState<NewsItem[]>(newsData);

  return (
    <div className="flex flex-col items-center mt-24 mb-20">
      <div className="w-full bg-stone-700 py-4 flex justify-center">
        <span className="text-5xl text-white font-title-bold">
          Bitácora
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-9/12 px-4 mt-8">
        {posts.map((post) => (
          <Link
            key={post.id}
            to={`/news/newsDetail/${post.id}`}
            state={post}
            className="block bg-white rounded-3xl border border-stone-200 hover:border-stone-500 hover:shadow-md overflow-hidden"
          >
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-2xl font-title-bold mb-2">
                {post.title}
              </h3>
              {/* <p className="text-sm text-stone-500">
                {moment.utc(post.created_at).format("DD/MM/YYYY")}
              </p> */}
              <p className="text-sm text-stone-600">
                {post.body.replace(/<[^>]+>/g, "").slice(0, 100)}...
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}