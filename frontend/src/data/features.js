export const stats = [
  { value: "1K+", label: "tài liệu y tế" },
  { value: "24/7", label: "cập nhật tri thức" },
  { value: "100+", label: "chủ đề bệnh học" },
  { value: "Đa nguồn", label: "học thuật & tin tức" },
];

export const featureCards = [
  {
    id: "semantic-search",
    title: "Tìm kiếm ngữ nghĩa",
    description: "Tra cứu theo ý nghĩa câu hỏi, triệu chứng hoặc chủ đề sức khỏe thay vì chỉ khớp từ khóa thô.",
    icon: "Search",
  },
  {
    id: "multi-source",
    title: "Tri thức đa nguồn",
    description: "Kết nối tài liệu bệnh học, bài viết học thuật, tin tức y tế và báo cáo chuyên ngành trong một lớp truy xuất thống nhất.",
    icon: "Network",
  },
  {
    id: "auto-update",
    title: "Cập nhật tự động",
    description: "Pipeline ingest và quản trị giúp kho dữ liệu được làm mới liên tục theo nguồn và trạng thái.",
    icon: "RefreshCw",
  },
  {
    id: "source-reference",
    title: "Có nguồn tham khảo",
    description: "Kết quả ưu tiên hiển thị nguồn, domain, visibility, snippet và thông tin cập nhật để người dùng tự đối chiếu.",
    icon: "FileBadge",
  },
  {
    id: "rag-support",
    title: "Hỗ trợ RAG/AI",
    description: "Lớp hỏi đáp AI vận hành trên nền tài liệu đã truy xuất thay vì trả lời trôi nổi ngoài ngữ cảnh.",
    icon: "MessageSquareText",
  },
  {
    id: "governance",
    title: "Quản trị tri thức",
    description: "Admin có thể quản lý nguồn, phê duyệt tài liệu, theo dõi pipeline jobs và điều phối ingest.",
    icon: "ShieldCheck",
  },
];

export const workflowSteps = [
  {
    title: "Thu thập dữ liệu",
    description: "Tiếp nhận PDF, web, news feed và nguồn học thuật theo topic, domain và mức ưu tiên.",
  },
  {
    title: "Chuẩn hóa & phân loại",
    description: "Tài liệu được gắn metadata, kiểm tra trạng thái, phân loại nguồn và chuẩn bị cho các bước truy xuất.",
  },
  {
    title: "Lưu trữ tri thức",
    description: "Nội dung được lưu ở lớp document, version, chunk và log pipeline để dễ tra cứu, kiểm thử và governance.",
  },
  {
    title: "Tra cứu & hỏi đáp",
    description: "Người dùng tìm kiếm tài liệu trước, sau đó mới dùng AI để tóm lược hoặc hỏi tiếp trên context phù hợp.",
  },
];

export const hotTopics = [
  "Cúm mùa",
  "Sốt xuất huyết",
  "Tiểu đường",
  "Tim mạch",
  "Hô hấp",
  "Dinh dưỡng",
];
