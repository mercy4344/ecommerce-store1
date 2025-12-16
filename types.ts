export interface Billboard {
    id: string;
    label: string;
    imageUrl: string;
}

export interface Category {
    id: string;
    name: string;
    billboard: Billboard;
    icon: {
        imageUrl: string;
    };
}

export interface Product {
    id: string;
    name: string;
    price: number;
    sizes: string[];
    colors: string[];
    colorImages: Record<string, string>;
    category?: Category;
    // Legacy fields kept for backward compatibility
    priceString?: string;
    isFeatured?: boolean;
    size?: Size;
    color?: Color;
    images?: Image[];
}


export interface Image {
    id: string;
    url: string;
}

export interface Size {
    id: string;
    name: string;
    value: string;
}

export interface Color {
    id: string;
    name: string;
    value: string;
}