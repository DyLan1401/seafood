export interface Order {
    id: string;
    customer_name: string;
    phone: string;
    address: string;
    note: string;
    total: number;
    status: string;
    created_at: string;
}


export interface OrderItem {
    product_id: number;
    product_name: string;
    price: number;
    qty: number;
}

export interface OrderInfo {
    id: number;
    customer_name: string;
    phone: string;
    address: string;
    note: string;
    total: number;
    status: string;
    created_at: string;
}

export interface OrderDetailData {
    order: OrderInfo;
    items: OrderItem[];
}



//sản phẩm trong đơn hàng
export interface OrderItem {
    productId: string | number;
    qty: number;
}

//tạo đơn hàng
export interface CreateOrderPayload {
    userId: string | number;
    customerName: string;
    phone: string;
    address: string;
    note?: string;
    items: OrderItem[];
}
//Chẹckout
export interface CheckoutFormData {
    customerName: string;
    phone: string;
    address: string;
    note?: string;
}