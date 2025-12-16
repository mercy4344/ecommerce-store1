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
    category: Category;
    name: string;
    price: string;
    isFeatured: boolean;
    sizes: Size[];
    colors: Color[];
    images: Image[];
    selectedColorId?: string | null;
    selectedSizeId?: string | null;
    selectedColor?: Color | null;
    selectedSize?: Size | null;
}


export interface Image {
    id: string;
    url: string;
    colorId?: string | null;
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