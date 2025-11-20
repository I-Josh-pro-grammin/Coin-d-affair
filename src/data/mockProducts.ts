export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    subcategory?: string;
    condition: 'Neuf' | 'Comme neuf' | 'Bon état' | 'Acceptable';
    location: string;
    description: string;
    seller: {
        id: number;
        name: string;
        rating: number;
        totalSales: number;
    };
    badge?: 'Nouveau' | 'Promo';
    rating: number;
    reviews: number;
    stock: number;
}

export const trendingProducts: Product[] = [
    {
        id: 1,
        name: 'iPhone 13 Pro 256GB',
        price: 850000,
        image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=500',
        category: 'Électronique',
        subcategory: 'Smartphones',
        condition: 'Comme neuf',
        location: 'Kigali, Rwanda',
        description: 'iPhone 13 Pro en excellent état, 256GB de stockage. Batterie à 95%. Aucune rayure.',
        seller: {
            id: 1,
            name: 'Tech Store Rwanda',
            rating: 4.8,
            totalSales: 234
        },
        badge: 'Promo',
        rating: 4.9,
        reviews: 45,
        stock: 5
    },
    {
        id: 2,
        name: 'MacBook Pro 14" M1 Pro',
        price: 1500000,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
        category: 'Électronique',
        subcategory: 'Ordinateurs',
        condition: 'Neuf',
        location: 'Kigali, Rwanda',
        description: 'MacBook Pro 14 pouces avec puce M1 Pro. 16GB RAM, 512GB SSD. Neuf dans sa boîte.',
        seller: {
            id: 2,
            name: 'Apple Store RW',
            rating: 5.0,
            totalSales: 156
        },
        badge: 'Nouveau',
        rating: 5.0,
        reviews: 28,
        stock: 3
    },
    {
        id: 3,
        name: 'Samsung Galaxy S23 Ultra',
        price: 950000,
        image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500',
        category: 'Électronique',
        subcategory: 'Smartphones',
        condition: 'Neuf',
        location: 'Kigali, Rwanda',
        description: 'Samsung Galaxy S23 Ultra neuf. 256GB, couleur noir fantôme.',
        seller: {
            id: 3,
            name: 'Mobile Hub',
            rating: 4.7,
            totalSales: 189
        },
        rating: 4.8,
        reviews: 67,
        stock: 8
    },
    {
        id: 4,
        name: 'AirPods Pro 2ème génération',
        price: 180000,
        image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=500',
        category: 'Électronique',
        subcategory: 'Audio',
        condition: 'Neuf',
        location: 'Kigali, Rwanda',
        description: 'AirPods Pro 2ème génération avec réduction de bruit active.',
        seller: {
            id: 1,
            name: 'Tech Store Rwanda',
            rating: 4.8,
            totalSales: 234
        },
        rating: 4.9,
        reviews: 123,
        stock: 15
    },
    {
        id: 5,
        name: 'Sony WH-1000XM5',
        price: 280000,
        image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500',
        category: 'Électronique',
        subcategory: 'Audio',
        condition: 'Neuf',
        location: 'Kigali, Rwanda',
        description: 'Casque Sony WH-1000XM5 avec réduction de bruit leader du marché.',
        seller: {
            id: 4,
            name: 'Audio Pro',
            rating: 4.9,
            totalSales: 98
        },
        badge: 'Promo',
        rating: 4.9,
        reviews: 89,
        stock: 6
    }
];

export const latestProducts: Product[] = [
    {
        id: 6,
        name: 'iPad Air 5ème génération',
        price: 650000,
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500',
        category: 'Électronique',
        subcategory: 'Tablettes',
        condition: 'Neuf',
        location: 'Kigali, Rwanda',
        description: 'iPad Air 5 avec puce M1. 64GB, Wi-Fi. Couleur gris sidéral.',
        seller: {
            id: 2,
            name: 'Apple Store RW',
            rating: 5.0,
            totalSales: 156
        },
        badge: 'Nouveau',
        rating: 4.8,
        reviews: 34,
        stock: 7
    },
    {
        id: 7,
        name: 'Dell XPS 15',
        price: 1200000,
        image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500',
        category: 'Électronique',
        subcategory: 'Ordinateurs',
        condition: 'Neuf',
        location: 'Kigali, Rwanda',
        description: 'Dell XPS 15 avec Intel i7, 16GB RAM, 512GB SSD, écran 4K.',
        seller: {
            id: 5,
            name: 'Computer World',
            rating: 4.6,
            totalSales: 145
        },
        badge: 'Nouveau',
        rating: 4.7,
        reviews: 23,
        stock: 4
    },
    {
        id: 8,
        name: 'Canon EOS R6',
        price: 1800000,
        image: 'https://images.unsplash.com/photo-1606980707986-7b6c3a2f0e5e?w=500',
        category: 'Électronique',
        subcategory: 'Appareils photo',
        condition: 'Comme neuf',
        location: 'Kigali, Rwanda',
        description: 'Canon EOS R6 en excellent état. Utilisé 3 mois seulement.',
        seller: {
            id: 6,
            name: 'Photo Pro',
            rating: 4.9,
            totalSales: 67
        },
        badge: 'Nouveau',
        rating: 5.0,
        reviews: 12,
        stock: 2
    },
    {
        id: 9,
        name: 'Nintendo Switch OLED',
        price: 320000,
        image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=500',
        category: 'Électronique',
        subcategory: 'Jeux vidéo',
        condition: 'Neuf',
        location: 'Kigali, Rwanda',
        description: 'Nintendo Switch modèle OLED avec écran amélioré.',
        seller: {
            id: 7,
            name: 'Gaming Zone',
            rating: 4.8,
            totalSales: 234
        },
        badge: 'Nouveau',
        rating: 4.9,
        reviews: 56,
        stock: 10
    },
    {
        id: 10,
        name: 'Apple Watch Series 8',
        price: 380000,
        image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500',
        category: 'Électronique',
        subcategory: 'Montres connectées',
        condition: 'Neuf',
        location: 'Kigali, Rwanda',
        description: 'Apple Watch Series 8, 45mm, GPS + Cellular.',
        seller: {
            id: 1,
            name: 'Tech Store Rwanda',
            rating: 4.8,
            totalSales: 234
        },
        badge: 'Nouveau',
        rating: 4.8,
        reviews: 78,
        stock: 12
    }
];

export const recentSearchProducts: Product[] = [
    {
        id: 11,
        name: 'Samsung Galaxy Buds2 Pro',
        price: 150000,
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500',
        category: 'Électronique',
        subcategory: 'Audio',
        condition: 'Neuf',
        location: 'Kigali, Rwanda',
        description: 'Écouteurs Samsung Galaxy Buds2 Pro avec réduction de bruit.',
        seller: {
            id: 3,
            name: 'Mobile Hub',
            rating: 4.7,
            totalSales: 189
        },
        rating: 4.6,
        reviews: 45,
        stock: 20
    },
    {
        id: 12,
        name: 'LG OLED TV 55"',
        price: 1400000,
        image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500',
        category: 'Électronique',
        subcategory: 'TV & Audio',
        condition: 'Neuf',
        location: 'Kigali, Rwanda',
        description: 'TV LG OLED 55 pouces, 4K, HDR10, Dolby Vision.',
        seller: {
            id: 8,
            name: 'Electronics Plus',
            rating: 4.7,
            totalSales: 112
        },
        rating: 4.9,
        reviews: 34,
        stock: 5
    },
    {
        id: 13,
        name: 'DJI Mini 3 Pro',
        price: 750000,
        image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500',
        category: 'Électronique',
        subcategory: 'Drones',
        condition: 'Neuf',
        location: 'Kigali, Rwanda',
        description: 'Drone DJI Mini 3 Pro avec caméra 4K.',
        seller: {
            id: 6,
            name: 'Photo Pro',
            rating: 4.9,
            totalSales: 67
        },
        rating: 5.0,
        reviews: 23,
        stock: 3
    },
    {
        id: 14,
        name: 'Logitech MX Master 3S',
        price: 85000,
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500',
        category: 'Électronique',
        subcategory: 'Accessoires',
        condition: 'Neuf',
        location: 'Kigali, Rwanda',
        description: 'Souris sans fil Logitech MX Master 3S.',
        seller: {
            id: 5,
            name: 'Computer World',
            rating: 4.6,
            totalSales: 145
        },
        rating: 4.8,
        reviews: 67,
        stock: 15
    },
    {
        id: 15,
        name: 'GoPro Hero 11 Black',
        price: 420000,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500',
        category: 'Électronique',
        subcategory: 'Appareils photo',
        condition: 'Neuf',
        location: 'Kigali, Rwanda',
        description: 'GoPro Hero 11 Black avec stabilisation HyperSmooth 5.0.',
        seller: {
            id: 6,
            name: 'Photo Pro',
            rating: 4.9,
            totalSales: 67
        },
        rating: 4.9,
        reviews: 89,
        stock: 8
    }
];

export const allProducts = [...trendingProducts, ...latestProducts, ...recentSearchProducts];

export const getProductById = (id: number | string): Product | undefined => {
    const numId = typeof id === 'string' ? parseInt(id, 10) : id;
    return allProducts.find(p => p.id === numId);
};

export const getSimilarProducts = (productId: number, limit: number = 4): Product[] => {
    const product = getProductById(productId);
    if (!product) return [];

    return allProducts
        .filter(p => p.id !== productId && p.category === product.category)
        .slice(0, limit);
};
