import { LockKeyhole } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createArticle, uploadArticleImage } from "../api/articleApi";
import ArticleForm from "../components/blog/ArticleForm";
import { useAuth } from "../providers/AuthProvider";

export default function CreateBlogPage() {
  const navigate = useNavigate();
  const { profile, getToken } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  const submitArticle = async (form) => {
    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess("");

    try {
      const token = await getToken();
      const imageUrl = await uploadArticleImage(form.imageFile);
      await createArticle(
        {
          title: form.title,
          excerpt: form.excerpt,
          content: form.content,
          topic: form.topic,
          tags: form.tags,
          image_url: imageUrl,
          source_url: form.source_url,
          author_id: profile.uid,
          author_name: profile.email || profile.displayName,
          status: "pending",
        },
        token
      );

      setSubmitSuccess(
        "Bài viết đã được gửi và đang chờ admin duyệt."
      );

      window.setTimeout(() => {
        navigate("/blog?tab=mine&submitted=1");
      }, 900);
    } catch (error) {
      setSubmitError(
        error.message ||
          "Backend chưa hỗ trợ tạo bài viết hoặc định dạng dữ liệu chưa khớp."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!profile) {
    return (
      <div className="page-shell py-10 pb-16">
        <div className="mx-auto max-w-xl rounded-2xl border border-white/70 bg-white p-8 text-center shadow-soft">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
            <LockKeyhole className="h-6 w-6" />
          </div>
          <h1 className="mt-5 font-display text-2xl font-bold text-ink">
            Cần đăng nhập để viết bài
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-500">
            Bạn cần tài khoản Firebase hợp lệ để gửi bài viết tham khảo lên hệ thống.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link to="/login?redirect=/blog/new" className="btn-primary">
              Đăng nhập
            </Link>
            <Link to="/blog" className="btn-secondary">
              Quay lại Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell py-10 pb-16">
      <div className="mb-8 flex flex-col gap-3">
        <span className="section-kicker">BLOG</span>
        <h1 className="font-display text-4xl font-bold tracking-tight text-ink">
          Viết bài chia sẻ thông tin sức khỏe
        </h1>
        <p className="max-w-3xl text-sm leading-7 text-slate-500">
          Chia sẻ bài viết tham khảo, nguồn tin y tế hoặc kinh nghiệm đọc tài liệu sức khỏe
          với cộng đồng.
        </p>
      </div>

      <ArticleForm
        currentUser={profile}
        isSubmitting={isSubmitting}
        submitError={submitError}
        submitSuccess={submitSuccess}
        onSubmit={submitArticle}
        onCancel={() => navigate("/blog")}
      />
    </div>
  );
}
