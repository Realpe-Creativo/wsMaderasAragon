import { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

export interface NewsItem {
  id: string;
  title: string;
  created_at: string;
  imageUrl: string;
  body: string;
  images: string[];
}

export default function NewsList() {
  // JSON interno con body e imágenes de apoyo
  const newsData: NewsItem[] = [
    {
      id: "1",
      title: "Lanzamiento de nuevo producto",
      created_at: "2025-05-01",
      imageUrl: "/img/news/news.png",
      body: `<p>Hoy hemos presentado nuestro producto estrella con funcionalidades de última generación.</p>
             <p>Entre otras novedades, incluye integración con IA y mejoras de rendimiento.</p>`,
      images: [
        "/img/news/news.png",
        "/img/news/news.png",
        "/img/news/news.png"
      ]
    },
    {
      id: "2",
      title: "Actualización de seguridad",
      created_at: "2025-04-28",
      imageUrl: "/img/news/news.png",
      body: `<p>Hemos parcheado varias vulnerabilidades críticas en nuestra plataforma.</p>
             <ul><li>CVE-2025-1234</li><li>CVE-2025-5678</li></ul>`,
      images: ["/images/sec1.jpg", "/images/sec2.jpg"]
    },
    {
      id: "3",
      title: "Actualización de seguridad",
      created_at: "2025-04-28",
      imageUrl: "/img/news/news.png",
      body: `<p>Hemos parcheado varias vulnerabilidades críticas en nuestra plataforma.</p>
             <ul><li>CVE-2025-1234</li><li>CVE-2025-5678</li></ul>`,
      images: ["/images/sec1.jpg", "/images/sec2.jpg"]
    },
    {
      id: "4",
      title: "Actualización de seguridad",
      created_at: "2025-04-28",
      imageUrl: "/img/news/news.png",
      body: `<p>Hemos parcheado varias vulnerabilidades críticas en nuestra plataforma.</p>
             <ul><li>CVE-2025-1234</li><li>CVE-2025-5678</li></ul>`,
      images: ["/images/sec1.jpg", "/images/sec2.jpg"]
    },
    {
      id: "5",
      title: "Actualización de seguridad",
      created_at: "2025-04-28",
      imageUrl: "/img/news/news.png",
      body: `<p>Hemos parcheado varias vulnerabilidades críticas en nuestra plataforma.</p>
             <ul><li>CVE-2025-1234</li><li>CVE-2025-5678</li></ul>`,
      images: ["/images/sec1.jpg", "/images/sec2.jpg"]
    },
  ];

  const [posts] = useState<NewsItem[]>(newsData);

  return (
    <div className="flex flex-col items-center mt-32 mb-20">
      <div className="w-full bg-stone-700 py-4 flex justify-center">
        <span className="text-5xl text-white font-title-bold">
          Noticias y Anuncios
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-9/12 px-4 mt-8">
        {posts.map((post) => (
          <Link
            key={post.id}
            to={`/news/newsDetail/${post.id}`}
            state={{
              title: post.title,
              created_at: post.created_at,
              body: post.body,
              images: post.images
            }}
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
              <p className="text-sm text-stone-500">
                {moment.utc(post.created_at).format("DD/MM/YYYY")}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
