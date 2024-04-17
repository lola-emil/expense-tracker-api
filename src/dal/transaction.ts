

export interface Transaction {
    trans_id: string;
    user_id: string;
    amount: number;
    description: string;
    trans_type: string;
    category_id: string;
    
    event_date: string;
}

export interface Category {
    cat_id: string;
    title: string;
}