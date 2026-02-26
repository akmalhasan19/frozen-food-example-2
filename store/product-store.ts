import { Product } from '@/types';
import { safeStorage } from '@/lib/storage';
import { initialProducts } from '@/data/products';

const PRODUCTS_STORAGE_KEY = 'ff_products_v1';

// Seed fallback + localStorage override
export const productStore = {
    getProducts: (): Product[] => {
        const stored = safeStorage.get<Product[]>(PRODUCTS_STORAGE_KEY);
        // Jika belum ada di local storage, pakai seed data
        return stored && stored.length > 0 ? stored : initialProducts;
    },

    saveProducts: (products: Product[]): void => {
        safeStorage.set(PRODUCTS_STORAGE_KEY, products);
    },

    addProduct: (product: Omit<Product, 'id' | 'createdAt'>): void => {
        const current = productStore.getProducts();
        const newProduct: Product = {
            ...product,
            id: `prod-${Date.now()}`,
            createdAt: new Date().toISOString()
        };
        const updated = [...current, newProduct];
        productStore.saveProducts(updated);
    },

    updateProduct: (id: string, updates: Partial<Product>): void => {
        const current = productStore.getProducts();
        const idx = current.findIndex(p => p.id === id);
        if (idx >= 0) {
            current[idx] = { ...current[idx], ...updates };
            productStore.saveProducts(current);
        }
    },

    deleteProduct: (id: string): void => {
        const current = productStore.getProducts();
        const updated = current.filter(p => p.id !== id);
        productStore.saveProducts(updated);
    }
};
