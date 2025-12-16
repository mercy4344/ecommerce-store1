import { Category } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

const getCategory = async (id: string): Promise<Category> => {
    const res = await fetch(`${URL}/${id}`);

    return res.json(); // Ensure API returns a single object, not an array
};

export default getCategory;
