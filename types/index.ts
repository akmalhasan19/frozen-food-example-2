export type Category = 'Nugget' | 'Sosis' | 'Seafood' | 'Dimsum';

export interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    stock: number;
    category: Category;
    image: string;
    isActive: boolean;
    createdAt: string;
}

export interface CartItem {
    product: Product;
    quantity: number;
}

export type OrderStatus = 'DIPROSES' | 'DIKIRIM' | 'SELESAI' | 'BATAL';
export type ShippingType = 'REGULER' | 'INSTAN';
export type PaymentMethod = 'TRANSFER' | 'COD';

export interface OrderItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    subtotal: number;
}

export interface Order {
    id: string; // ORD-YYYYMMDD-XXXX
    customerName: string;
    customerPhone: string;
    customerAddress: string;
    customerNotes?: string;
    items: OrderItem[];
    subtotal: number;
    shippingFee: number;
    discount: number;
    total: number;
    status: OrderStatus;
    shippingType: ShippingType;
    paymentMethod: PaymentMethod;
    couponCode?: string;
    createdAt: string;
}
