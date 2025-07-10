import { createClient } from "@libsql/client";

// Asegúrate de tener estas variables de entorno en tu .env
const client = createClient({
  url: import.meta.env.DATABASE_URL!,
  authToken: import.meta.env.DATABASE_AUTH_TOKEN!,
});

export async function getCategories() {
  try {
    const result = await client.execute("SELECT * FROM category");
    return result.rows;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function getSubcategories() {
  try {
    const result = await client.execute("SELECT * FROM subcategory");
    return result.rows;
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    return [];
  }
}

// Exporta el cliente si necesitas hacer queries personalizados en otras partes
export { client };

