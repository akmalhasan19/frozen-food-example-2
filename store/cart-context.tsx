"use client";

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Product, CartItem } from '@/types';
import { safeStorage } from '@/lib/storage';
import { calculateCoupon } from '@/lib/coupon';

interface CartState {
    items: CartItem[];
    subtotal: number;
    discount: number;
    couponCode: string | null;
    total: number;
    isHydrated: boolean;
}

type CartAction =
    | { type: 'ADD_ITEM'; payload: Product }
    | { type: 'REMOVE_ITEM'; payload: string }
    | { type: 'INCREMENT_QTY'; payload: string }
    | { type: 'DECREMENT_QTY'; payload: string }
    | { type: 'SET_QTY'; payload: { productId: string; quantity: number } }
    | { type: 'CLEAR_CART' }
    | { type: 'APPLY_COUPON'; payload: string }
    | { type: 'INIT_STATE'; payload: Omit<CartState, 'isHydrated'> };

const CART_STORAGE_KEY = 'ff_cart_v1';

const initialState: CartState = {
    items: [],
    subtotal: 0,
    discount: 0,
    couponCode: null,
    total: 0,
    isHydrated: false,
};

function calculateTotals(items: CartItem[], couponCode: string | null) {
    const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const { discount, appliedCode } = calculateCoupon(subtotal, couponCode || undefined);
    const total = subtotal - discount; // Ongkir akan dihitung terpisah di halaman checkout
    return { subtotal, discount, couponCode: appliedCode, total };
}

function cartReducer(state: CartState, action: CartAction): CartState {
    let newItems = [...state.items];

    switch (action.type) {
        case 'INIT_STATE':
            return { ...state, ...action.payload, isHydrated: true };

        case 'ADD_ITEM': {
            const existingItemIndex = newItems.findIndex(i => i.product.id === action.payload.id);
            if (existingItemIndex >= 0) {
                const item = newItems[existingItemIndex];
                const newQuantity = Math.min(item.quantity + 1, item.product.stock);
                newItems[existingItemIndex] = { ...item, quantity: newQuantity };
            } else {
                newItems.push({ product: action.payload, quantity: 1 });
            }
            break;
        }

        case 'REMOVE_ITEM':
            newItems = newItems.filter(i => i.product.id !== action.payload);
            break;

        case 'INCREMENT_QTY': {
            const idx = newItems.findIndex(i => i.product.id === action.payload);
            if (idx >= 0) {
                const item = newItems[idx];
                const newQuantity = Math.min(item.quantity + 1, item.product.stock);
                newItems[idx] = { ...item, quantity: newQuantity };
            }
            break;
        }

        case 'DECREMENT_QTY': {
            const idx = newItems.findIndex(i => i.product.id === action.payload);
            if (idx >= 0) {
                const item = newItems[idx];
                if (item.quantity > 1) {
                    newItems[idx] = { ...item, quantity: item.quantity - 1 };
                } else {
                    newItems = newItems.filter(i => i.product.id !== action.payload);
                }
            }
            break;
        }

        case 'SET_QTY': {
            const idx = newItems.findIndex(i => i.product.id === action.payload.productId);
            if (idx >= 0) {
                const item = newItems[idx];
                const newQuantity = Math.max(1, Math.min(action.payload.quantity, item.product.stock));
                newItems[idx] = { ...item, quantity: newQuantity };
            }
            break;
        }

        case 'CLEAR_CART':
            return { ...initialState, isHydrated: true };

        case 'APPLY_COUPON': {
            const totals = calculateTotals(state.items, action.payload);
            return { ...state, ...totals };
        }

        default:
            return state;
    }

    const totals = calculateTotals(newItems, state.couponCode);
    return { ...state, items: newItems, ...totals };
}

interface CartContextProps extends CartState {
    addItem: (product: Product) => void;
    removeItem: (productId: string) => void;
    incrementQty: (productId: string) => void;
    decrementQty: (productId: string) => void;
    setQty: (productId: string, quantity: number) => void;
    clearCart: () => void;
    applyCoupon: (code: string) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    // Hydration
    useEffect(() => {
        const saved = safeStorage.get<Omit<CartState, 'isHydrated'>>(CART_STORAGE_KEY);
        if (saved) {
            dispatch({ type: 'INIT_STATE', payload: saved });
        } else {
            dispatch({
                type: 'INIT_STATE',
                payload: { items: [], subtotal: 0, discount: 0, couponCode: null, total: 0 }
            });
        }
    }, []);

    // Sync to localStorage
    useEffect(() => {
        if (state.isHydrated) {
            const stateToSave = {
                items: state.items,
                subtotal: state.subtotal,
                discount: state.discount,
                couponCode: state.couponCode,
                total: state.total
            };
            safeStorage.set(CART_STORAGE_KEY, stateToSave);
        }
    }, [state]);

    const addItem = (product: Product) => dispatch({ type: 'ADD_ITEM', payload: product });
    const removeItem = (productId: string) => dispatch({ type: 'REMOVE_ITEM', payload: productId });
    const incrementQty = (productId: string) => dispatch({ type: 'INCREMENT_QTY', payload: productId });
    const decrementQty = (productId: string) => dispatch({ type: 'DECREMENT_QTY', payload: productId });
    const setQty = (productId: string, quantity: number) => dispatch({ type: 'SET_QTY', payload: { productId, quantity } });
    const clearCart = () => dispatch({ type: 'CLEAR_CART' });
    const applyCoupon = (code: string) => dispatch({ type: 'APPLY_COUPON', payload: code });

    return (
        <CartContext.Provider
            value={{
                ...state,
                addItem,
                removeItem,
                incrementQty,
                decrementQty,
                setQty,
                clearCart,
                applyCoupon,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
