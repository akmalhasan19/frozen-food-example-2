import { Order } from '@/types';
import { safeStorage } from '@/lib/storage';

const ORDERS_STORAGE_KEY = 'ff_orders_v1';
const LAST_ORDER_KEY = 'ff_last_order_v1';

// Karena tidak pakai Zustand di requirement awal, kita buat simple store/utility saja.
// Sesuai requirement: "CRUD produk simulasi via product-store.ts" (nanti di tahap admin)
// Untuk orders, kita manage via utility hooks/functions saja untuk konsistensi dengan cart-context,
// Atau array global sederhana + localStorage sync karena ini Next.js Client Component.

// Mari kita buat utility function standar tanpa store external, di load saat komponen render.

export const orderStore = {
    getOrders: (): Order[] => {
        return safeStorage.get<Order[]>(ORDERS_STORAGE_KEY) || [];
    },

    saveOrder: (order: Order): void => {
        const currentList = orderStore.getOrders();
        currentList.push(order);
        safeStorage.set(ORDERS_STORAGE_KEY, currentList);
        // Simpan order terakhir untuk halaman sukses
        safeStorage.set(LAST_ORDER_KEY, order);
    },

    getLastOrder: (): Order | null => {
        return safeStorage.get<Order>(LAST_ORDER_KEY);
    },

    updateOrderStatus: (orderId: string, newStatus: Order['status']): void => {
        const currentList = orderStore.getOrders();
        const idx = currentList.findIndex(o => o.id === orderId);
        if (idx >= 0) {
            currentList[idx].status = newStatus;
            safeStorage.set(ORDERS_STORAGE_KEY, currentList);
        }
    }
};
