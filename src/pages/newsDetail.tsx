import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

interface LocationState {
  title: string;
  created_at: string;
  body: string;
  images: string[];
}

export default function NewsDetail() {
  const navigate = useNavigate();
  const { title, created_at, body, images } =
    useLocation().state as LocationState;

  return (
    <div className="flex flex-col items-center mt-32 mb-20 px-4">
      <button
        onClick={() => navigate(-1)}
        className="self-start mb-6 text-stone-700 hover:text-stone-500 flex items-center"
      >
        ← Volver
      </button>

      <h1 className="text-4xl font-title-bold mb-2">{title}</h1>
      <p className="text-sm text-stone-500 mb-6">
        {moment.utc(created_at).format("DD/MM/YYYY")}
      </p>

      <article
        className="prose max-w-none mb-8"
        dangerouslySetInnerHTML={{ __html: body }}
      />

      {images.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {images.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`Imagen de apoyo ${idx + 1}`}
              className="w-full h-64 object-cover rounded-lg"
            />
          ))}
        </div>
      )}
    </div>
  );
}
