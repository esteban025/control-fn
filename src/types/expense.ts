export interface Expense {
  id: string;
  amount: number;
  description: string;
  date: Date;
  category_id: string;
  // subcategory_id: number;
}