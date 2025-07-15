// CREATE TABLE expense (
// 	id CHAR(36) PRIMARY KEY DEFAULT(uuid()),
//     amount  DECIMAL(10,2) NOT NULL DEFAULT 0, 
//     description TEXT,
//     date DATE NOT NULL,
//     category_id VARCHAR(50) NOT NULL,
//     subcategory_id INT NOT NULL,
    
//     FOREIGN KEY (category_id) REFERENCES category(id),
//     FOREIGN KEY (subcategory_id) REFERENCES subcategory(id)
// );
export interface Expense {
  id: string;
  amount: number;
  description: string;
  date: Date;
  category_id: string;
  subcategory_id: number;
}