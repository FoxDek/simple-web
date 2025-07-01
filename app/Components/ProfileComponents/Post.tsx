'use client';
import { useState } from "react";
import { formatRelativeDate } from "@/utils/dateFormat.utils";

const samplePost = {
  author: "Иван Зубрадаев",
  content: "Получал сегодня в старинной в одном городе - прекрасные эмоции и ощущения! Всем рекомендую данный вид времяпровождения - активный отдых и настоящий мужской спорт, присоединяйтесь к нам!",
  date: "2025-06-26T12:00:00Z",
  likes: 68,
  comments: 3,
  reposts: 1,
};

export default function Post({ post = samplePost }) {
  const [tooltip, setTooltip] = useState(false);
  const { display, tooltip: tooltipDate } = formatRelativeDate(post.date);

  return (
    <article
      className="post bg-white rounded-lg border border-gray-200 p-4 transition-all duration-200 ease-in-out"
      onMouseEnter={() => setTooltip(true)}
      onMouseLeave={() => setTooltip(false)}
    >
      <div className="postHeader flex items-center gap-2 mb-2">
        <span className="postAuthor font-semibold text-sm text-gray-800">{post.author}</span>
      </div>
      <p className="postContent text-sm text-gray-700">{post.content}</p>

      <div className="postFooter flex justify-between items-center mt-2">
        <div className="postInteractions flex gap-4 text-xs text-gray-500 user-select-none">
          <span>👍 {post.likes}</span>
          <span>💬 {post.comments}</span>
          <span>🔄 {post.reposts}</span>
        </div>
        <div
          className="postDate text-xs text-gray-500"
          title={tooltip ? tooltipDate : ""}
        >
          {display}
        </div>
      </div>
    </article>
  );
}