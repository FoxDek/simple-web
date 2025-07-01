import { UserPreview } from "@/models/User";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";

interface FetchUsersParams {
  endpoint: string;
  userId?: string | null; // userId опционален
  searchValue: string;
  page: number;
  limit: number;
  setUsers: Dispatch<SetStateAction<UserPreview[]>>;
  setTotalPages: Dispatch<SetStateAction<number>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  responseUsersKey?: "users" | "friends";
  errorMessage?: string;
  requiresUserId?: boolean; // Новый параметр для указания, нужен ли userId
}

export async function fetchFriendsLists({
  endpoint,
  userId,
  searchValue,
  page,
  limit,
  setUsers,
  setTotalPages,
  setIsLoading,
  responseUsersKey = "users",
  errorMessage = "Ошибка при получении данных",
  requiresUserId = true, // По умолчанию требуется userId
}: FetchUsersParams): Promise<void> {
  if (requiresUserId && (userId === null || userId === undefined)) return; // Проверка только если требуется userId

  setIsLoading(true);
  try {
    const params: Record<string, string | number> = { search: searchValue, page, limit };
    if (userId && requiresUserId) {
      params.userId = userId;
    }

    const res = await axios.get(endpoint, { params });
    setUsers(res.data[responseUsersKey] || []);
    setTotalPages(res.data.total || 1);
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      console.error("Ошибка от сервера:", err.response.data);
    } else {
      console.error(errorMessage, err);
    }
  } finally {
    setIsLoading(false);
  }
}