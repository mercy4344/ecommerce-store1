import { Billboard } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;

const getBillboard = async (id: string): Promise<Billboard | null> => {
    try {
        const res = await fetch(`${URL}/${id}`, {
            cache: 'no-store'
        });
        
        if (!res.ok) {
            console.error(`Failed to fetch billboard ${id}:`, res.status);
            return null;
        }
        
        return res.json();
    } catch (error) {
        console.error(`Error fetching billboard ${id}:`, error);
        return null;
    }
};

export default getBillboard;