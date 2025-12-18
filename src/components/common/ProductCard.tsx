import { Heart, ShoppingCart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { currencyFmt } from '@/lib/utils';

export interface Media {
    media_id: string | number
    order: number | string
    type: "image" | "video"
    url: string
}
export interface Product {
    listings_id?: string | number;
    id?: string | number;
    title?: string;
    name?: string;
    price: number;
    image_url?: string;
    media?: Array<Media>;
    cover_image?: string;
    category?: string;
    category_name?: string;
    subcategory?: string;
    badge?: string;
    location?: string;
    description?: string;
    rating?: number;
    reviews_count?: number;
}

interface ProductCardProps {
    product: Product;
    onClick?: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
    const { addToCart } = useCart();
    const navigate = useNavigate();
    // Normalize data
    const rawId = product?.listings_id || product.id;
    const id = rawId ? String(rawId) : undefined;
    const title = product?.title || product?.name;

    // Resolve image URL from various possible shapes: media array, cover_image, image_url, or fallback
    let imageUrl: string = '/placeholder.svg';
    try {
        if (Array.isArray(product?.media) && product.media.length) {
            // media items may be objects with a `url` property or strings
            const first = product.media[0];
            if (first && typeof first === 'object' && 'url' in first && first.url) {
                imageUrl = String((first as any).url);
            } else if (typeof first === 'string') {
                imageUrl = first;
            }
        } else if (product?.cover_image) {
            imageUrl = String(product.cover_image);
        } else if (product?.image_url) {
            imageUrl = String(product.image_url);
        }
    } catch (e) {
        // keep fallback
    }
    const image = imageUrl;
    const category = product?.category_name || product?.category;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
            if (id && title) {
            addToCart({
                id: id,
                name: title,
                price: product?.price,
                quantity: 1,
                image: image, // pass resolved image URL string
                seller: 'Coin d\'affaire' // Default or fetch from product if available
            });
        }
    };

    const handleBuyNow = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        navigate(`/acheter/${id}`);
    };

    return (
        <Link
            to={`/produit/${id}`}
            onClick={onClick}
            className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden cursor-pointer border-2 border-transparent hover:border-[#000435]"
        >
            {/* Image Container */}
            <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
                {/* Product Image */}
                <img
                    src={image}
                    alt={title || 'Produit'}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500';
                    }}
                />

                {/* Overlay gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Badge - Top Right */}
                {product.badge && (
                    <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium shadow-sm ${product.badge === 'Nouveau'
                        ? 'bg-blue-500 text-white'
                        : 'bg-red-500 text-white'
                        }`}>
                        {product.badge}
                    </span>
                )}

                {/* Category Badge - Top Left */}
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700 shadow-sm">
                    {product.subcategory || category}
                </span>

                {/* Wishlist Heart Icon */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // TODO: Add to favorites
                    }}
                    className="absolute bottom-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
                    aria-label="Ajouter aux favoris"
                >
                    <Heart className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors" />
                </button>
            </div>

            {/* Card Content */}
            <div className="p-5">
                {/* Product Title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#000435] transition-colors">
                    {title}
                </h3>

                {/* Location */}
                {product.location && (
                    <p className="text-sm text-gray-500 mb-3">{product.location}</p>
                )}

                {/* Price */}
                <div className="mb-4">
                    <p className="text-2xl font-bold text-[#000435]">{currencyFmt(product.price)}</p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-2">
                    {/* Add to Cart - Ghost/Outline Button */}
                    <button
                        onClick={handleAddToCart}
                        className="w-full py-2.5 px-4 border-2 border-[#000435] text-[#000435] font-medium rounded-full hover:bg-[#000435] hover:text-white transition-all duration-300 bg-transparent flex items-center justify-center gap-2"
                        aria-label="Ajouter au panier"
                    >
                        <ShoppingCart size={18} />
                        Ajouter au panier
                    </button>

                    {/* Buy Now - Solid Button */}
                    <button
                        onClick={handleBuyNow}
                        className="w-full py-2.5 px-4 bg-[#000435] text-white font-medium rounded-full hover:bg-[#000435]/90 transition-all duration-300"
                    >
                        Acheter maintenant
                    </button>
                </div>
            </div>
        </Link>
    );
}
