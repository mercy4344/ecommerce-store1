import { Category } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const URL = API_URL ? `${API_URL}/categories` : null;

const getCategories = async (): Promise<Category[]> => {
  if (!URL) {
    console.warn("getCategories: NEXT_PUBLIC_API_URL missing; returning empty list");
    return [];
  }

  try {
    const res = await fetch(URL, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!res.ok) {
      console.error("Failed to fetch categories:", res.status);
      return [];
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export default getCategories;