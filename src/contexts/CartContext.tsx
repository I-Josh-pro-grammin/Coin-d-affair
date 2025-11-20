import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

export interface CartItem {
    productId: number | string;
    name: string;
    price: number;
    qty: number;
    image: string;
}

interface CartContextType {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (productId: number | string) => void;
    updateQty: (productId: number | string, qty: number) => void;
    clearCart: () => void;
    totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([]);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (e) {
                console.error('Failed to parse cart from local storage', e);
            }
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items));
    }, [items]);

    const addItem = (newItem: CartItem) => {
        setItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.productId === newItem.productId);
            if (existingItem) {
                return prevItems.map((item) =>
                    item.productId === newItem.productId
                        ? { ...item, qty: item.qty + newItem.qty }
                        : item
                );
            }
            return [...prevItems, newItem];
        });
        toast({
            title: "Ajouté au panier",
            description: `${newItem.name} a été ajouté à votre panier.`,
        });
    };

    const removeItem = (productId: number | string) => {
        setItems((prevItems) => prevItems.filter((item) => item.productId !== productId));
    };

    const updateQty = (productId: number | string, qty: number) => {
        if (qty <= 0) {
            removeItem(productId);
            return;
        }
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.productId === productId ? { ...item, qty } : item
            )
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const totalItems = items.reduce((acc, item) => acc + item.qty, 0);

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, totalItems }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
