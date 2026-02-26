"use client";

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Product } from '@/types';
import { safeStorage } from '@/lib/storage';

interface FavoriteState {
    items: Product[];
    isHydrated: boolean;
}

type FavoriteAction =
    | { type: 'ADD_ITEM'; payload: Product }
    | { type: 'REMOVE_ITEM'; payload: string }
    | { type: 'CLEAR_FAVORITES' }
    | { type: 'INIT_STATE'; payload: Omit<FavoriteState, 'isHydrated'> };

const FAVORITE_STORAGE_KEY = 'ff_fav_v1';

const initialState: FavoriteState = {
    items: [],
    isHydrated: false,
};

function favoriteReducer(state: FavoriteState, action: FavoriteAction): FavoriteState {
    switch (action.type) {
        case 'INIT_STATE':
            return { ...state, ...action.payload, isHydrated: true };
        case 'ADD_ITEM': {
            const exists = state.items.find((i) => i.id === action.payload.id);
            if (exists) return state; // Already favorite
            return { ...state, items: [...state.items, action.payload] };
        }
        case 'REMOVE_ITEM':
            return {
                ...state,
                items: state.items.filter((i) => i.id !== action.payload),
            };
        case 'CLEAR_FAVORITES':
            return { ...initialState, isHydrated: true };
        default:
            return state;
    }
}

interface FavoriteContextProps extends FavoriteState {
    addFavorite: (product: Product) => void;
    removeFavorite: (productId: string) => void;
    isFavorite: (productId: string) => boolean;
    clearFavorites: () => void;
}

const FavoriteContext = createContext<FavoriteContextProps | undefined>(undefined);

export function FavoriteProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(favoriteReducer, initialState);

    // Hydration
    useEffect(() => {
        const saved = safeStorage.get<Omit<FavoriteState, 'isHydrated'>>(FAVORITE_STORAGE_KEY);
        if (saved) {
            dispatch({ type: 'INIT_STATE', payload: saved });
        } else {
            dispatch({ type: 'INIT_STATE', payload: { items: [] } });
        }
    }, []);

    // Sync to localStorage
    useEffect(() => {
        if (state.isHydrated) {
            safeStorage.set(FAVORITE_STORAGE_KEY, { items: state.items });
        }
    }, [state]);

    const addFavorite = (product: Product) => dispatch({ type: 'ADD_ITEM', payload: product });
    const removeFavorite = (productId: string) => dispatch({ type: 'REMOVE_ITEM', payload: productId });
    const clearFavorites = () => dispatch({ type: 'CLEAR_FAVORITES' });
    const isFavorite = (productId: string) => state.items.some((i) => i.id === productId);

    return (
        <FavoriteContext.Provider
            value={{
                ...state,
                addFavorite,
                removeFavorite,
                isFavorite,
                clearFavorites,
            }}
        >
            {children}
        </FavoriteContext.Provider>
    );
}

export function useFavorite() {
    const context = useContext(FavoriteContext);
    if (context === undefined) {
        throw new Error('useFavorite must be used within a FavoriteProvider');
    }
    return context;
}
