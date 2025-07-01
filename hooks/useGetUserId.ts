import { getCurrentUser } from "@/lib/auth";
import { useEffect, useState } from "react";

export default function useGetUserId(): string | null {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const getUserId = async () => {
      try {
        const payload = await getCurrentUser();
        const userId = (payload as { userId: string })?.userId;
        if (userId) {
          setUserId(userId);
        } else {
          console.error("User ID not found");
          setUserId(null); // Явно устанавливаем null, если ID не найден
        }
      } catch (err) {
        console.error("Ошибка при получении userId:", err);
        setUserId(null);
      }
    };

    getUserId();
  }, []);

  return userId;
}