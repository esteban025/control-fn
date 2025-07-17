import type { Category } from "@/types/category";
import type { Subcategory } from "@/types/subcategory";
import { createClient } from "@libsql/client";

// Función para obtener las variables de entorno de manera segura
function getEnvVar(name: string): string {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env[name] || '';
  }
  // Fallback para entornos donde import.meta no está disponible
  if (typeof process !== 'undefined' && process.env) {
    return process.env[name] || '';
  }
  return '';
}

// Asegúrate de tener estas variables de entorno en tu .env
const client = createClient({
  url: getEnvVar('DATABASE_URL') || 'libsql://control-fn-esteban025.aws-ap-northeast-1.turso.io',
  authToken: getEnvVar('DATABASE_AUTH_TOKEN') || 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NTIxNTQzMzUsImlkIjoiN2U4ZGNhNDQtYzdjZS00ZTg1LWEzMmItMjFhOGU5N2Y1ODRjIiwicmlkIjoiMzQ2Yzc5ZWMtZTVhOC00ODM5LWFkOWEtYWYwNzRhYzYzZTA0In0.FwkwLoPCNGENVDFYAPUU4QuNGF5TJm9r23RBB_xXB4KWDYsCam0tHjRAdmNmyirZGk7GfJzuFTNB87-47nIoBg',
});

export async function getCategories() {
  try {
    const result = await client.execute("SELECT * FROM category");
    return result.rows as unknown as Category[];
  } catch (error) {
    console.error("❌ Error fetching categories:", error);
    return [];
  }
}

export async function getSubcategories() {
  try {
    const result = await client.execute("SELECT * FROM subcategory");
    return result.rows as unknown as Subcategory[];
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    return [];
  }
}

export async function getSubcategoriesById(categoryId: string) {
  try {
    const result = await client.execute("SELECT * FROM subcategory WHERE category_id = ?", [categoryId]);
    return result.rows;
  } catch (error) {
    console.error("Error fetching subcategories by category ID:", error);
    return [];
  }
}

// Exporta el cliente si necesitas hacer queries personalizados en otras partes
export { client };

