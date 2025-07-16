import { client } from "./turso";

export async function getIncomes() {
  try {
    const result = await client.execute("SELECT * FROM income");
    return result.rows;
  } catch (error) {
    console.error("Error fetching incomes:", error);
    return [];
  }
}