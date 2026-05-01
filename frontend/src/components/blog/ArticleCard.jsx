import { ArrowUpRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import SafeImage from "../common/SafeImage";
import { formatDate, truncate } from "../../lib/utils";

function getExcerpt(article) {
  return article.summary || article.excerpt || article.description || article.content || "";
}

function getImageUrl(article) {
  return article.image_url || article.thumbnail_url || article.cover_image || article.image || "";
}

function isCommunityArticle(article) {
  return (
    article.source_type === "community" ||
    article.topic === "Cộng đồng" ||
    article.source_name === "Cộng đồng" ||
    Boolean(article.author_id)
  );
}

function getStatusLabel(status) {
  const labels = {
    pending: "Chờ duyệt",
    published: "Đã đăng",
    approved: "Đã duyệt",
    active: "Đã đăng",
    rejected: "Từ chối",
    hidden: "Đã ẩn",
  };
  return labels[status] || status;
}

function getStatusClass(status) {
  if (status === "pending") return "bg-amber-50 text-amber-700 ring-amber-100";
  if (status === "rejected") return "bg-rose-50 text-rose-700 ring-rose-100";
  if (status === "hidden") return "bg-slate-100 text-slate-600 ring-slate-200";
  return "bg-emerald-50 text-emerald-700 ring-emerald-100";
}

export default function ArticleCard({ article, showStatus = false }) {
  const topic = article.topic || article.tags?.[0] || "Tin tức";
  const author = article.author_name || article.source_name || "Nguồn y tế";
  const imageUrl = getImageUrl(article);

  return (
    <article className="group overflow-hidden rounded-2xl border border-white/70 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-float">
      <div className="relative h-56 w-full overflow-hidden rounded-t-2xl bg-slate-100">
        <SafeImage
          src={imageUrl}
          alt={article.title || topic}
          fallbackType="article"
          fallbackLabel={topic}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-brand-700 shadow-sm">
            {topic}
          </span>
          {isCommunityArticle(article) ? (
            <span className="rounded-full bg-mint-600 px-3 py-1 text-xs font-bold text-white shadow-sm">
              Cộng đồng
            </span>
          ) : null}
          {showStatus && article.status ? (
            <span
              className={`rounded-full px-3 py-1 text-xs font-bold shadow-sm ring-1 ${getStatusClass(article.status)}`}
            >
              {getStatusLabel(article.status)}
            </span>
          ) : null}
        </div>
      </div>

      <div className="p-5">
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500">
          <span>{formatDate(article.published_at || article.created_at)}</span>
          <span>{author}</span>
        </div>

        <h3 className="mt-4 min-h-[56px] font-display text-xl font-bold leading-7 text-ink">
          {truncate(article.title, 96)}
        </h3>
        <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-500">
          {truncate(getExcerpt(article), 150)}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Link to={`/blog/${article.id}`} state={{ article }} className="btn-secondary px-4 py-2">
            <BookOpen className="h-4 w-4" />
            Đọc thêm
          </Link>
          {article.source_url ? (
            <a
              href={article.source_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700"
            >
              Nguồn gốc
              <ArrowUpRight className="h-4 w-4" />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
