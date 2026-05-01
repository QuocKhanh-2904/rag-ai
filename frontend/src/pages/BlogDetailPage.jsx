import { ArrowLeft, ArrowUpRight, CalendarDays, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { getArticle } from "../api/articleApi";
import EmptyState from "../components/common/EmptyState";
import LoadingState from "../components/common/LoadingState";
import { formatDate, getTopicGradient } from "../lib/utils";

export default function BlogDetailPage() {
  const { articleId } = useParams();
  const location = useLocation();
  const [article, setArticle] = useState(location.state?.article || null);
  const [loading, setLoading] = useState(!location.state?.article);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");

    getArticle(articleId)
      .then((response) => {
        if (!active) return;
        setArticle(response.item || null);
      })
      .catch((nextError) => {
        if (!active) return;
        if (!location.state?.article) {
          setArticle(null);
        }
        setError(nextError.message || "Chi tiết bài viết sẽ được cập nhật.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [articleId, location.state?.article]);

  if (loading && !article) {
    return (
      <div className="page-shell py-10">
        <LoadingState title="Đang tải chi tiết bài viết" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="page-shell py-10 pb-16">
        <EmptyState
          title="Chi tiết bài viết sẽ được cập nhật"
          message={error || "Hiện chưa có dữ liệu chi tiết cho bài viết này."}
          action={
            <Link to="/blog" className="btn-primary">
              <ArrowLeft className="h-4 w-4" />
              Quay lại Blog
            </Link>
          }
        />
      </div>
    );
  }

  const topic = article.topic || article.tags?.[0] || "Tin tức";
  const author = article.author_name || article.source_name || "Nguồn y tế";

  return (
    <article className="pb-16">
      <div className="page-shell py-8">
        <Link to="/blog" className="btn-ghost">
          <ArrowLeft className="h-4 w-4" />
          Quay lại Blog
        </Link>
      </div>

      <header className="page-shell">
        <div className="overflow-hidden rounded-2xl border border-white/70 bg-white shadow-soft">
          <div className="relative min-h-[320px]">
            {article.image_url ? (
              <img
                src={article.image_url}
                alt={article.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div className={`absolute inset-0 bg-gradient-to-br ${getTopicGradient(topic)}`} />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/35 to-transparent" />
            <div className="relative flex min-h-[320px] flex-col justify-end p-6 text-white sm:p-10">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-brand-700">
                  {topic}
                </span>
                {(article.tags || []).slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <h1 className="mt-5 max-w-4xl font-display text-4xl font-bold leading-tight sm:text-5xl">
                {article.title}
              </h1>
              <div className="mt-5 flex flex-wrap gap-5 text-sm text-white/85">
                <span className="inline-flex items-center gap-2">
                  <UserRound className="h-4 w-4" />
                  {author}
                </span>
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  {formatDate(article.published_at || article.created_at)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="page-shell mt-8 grid gap-8 lg:grid-cols-[1fr_300px]">
        <div className="rounded-2xl border border-white/70 bg-white p-6 shadow-soft sm:p-8">
          {error ? (
            <div className="mb-6 rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              Chi tiết bài viết sẽ được cập nhật. Đang hiển thị dữ liệu đã có từ danh sách.
            </div>
          ) : null}
          <p className="text-lg font-semibold leading-8 text-slate-700">
            {article.excerpt || article.summary}
          </p>
          <div className="mt-8 whitespace-pre-wrap text-base leading-8 text-slate-600">
            {article.content || "Chi tiết bài viết sẽ được cập nhật."}
          </div>
        </div>

        <aside className="h-fit rounded-2xl border border-white/70 bg-white p-6 shadow-soft">
          <div className="text-sm font-bold uppercase tracking-[0.18em] text-brand-700">
            Nguồn tham khảo
          </div>
          <div className="mt-4 text-sm leading-7 text-slate-500">
            Bài viết chỉ có giá trị tham khảo, không thay thế tư vấn, chẩn đoán hoặc điều trị từ bác sĩ/chuyên gia y tế.
          </div>
          {article.source_url ? (
            <a
              href={article.source_url}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary mt-5 w-full"
            >
              Mở nguồn gốc
              <ArrowUpRight className="h-4 w-4" />
            </a>
          ) : null}
        </aside>
      </div>
    </article>
  );
}
