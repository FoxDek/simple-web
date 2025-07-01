export function formatRelativeDate(dateStr: string | Date): { display: string; tooltip: string } {
  const now = new Date();
  const postDate = new Date(dateStr);
  const diffMs = now.getTime() - postDate.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return { 
    display: "сегодня", 
    tooltip: postDate.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric" }).replace(/(\d+)\.(\d+)\.(\d+)/, "$1.$2.$3") 
  };
  
  if (diffDays === 1) return { 
    display: "1 день назад", 
    tooltip: postDate.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric" }).replace(/(\d+)\.(\d+)\.(\d+)/, "$1.$2.$3") 
  };
  
  if (diffDays < 7) return { 
    display: `${diffDays} дней назад`, 
    tooltip: postDate.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric" }).replace(/(\d+)\.(\d+)\.(\d+)/, "$1.$2.$3") 
  };
  
  const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long" };
  return { 
    display: postDate.toLocaleDateString("ru-RU", options), 
    tooltip: postDate.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric" }).replace(/(\d+)\.(\d+)\.(\d+)/, "$1.$2.$3") 
  };
};