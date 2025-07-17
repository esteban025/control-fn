import type { Category } from "@/types/category";
import type { Subcategory } from "@/types/subcategory";
import { useEffect, useState } from "react";

export const SelectForm = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categorySelect, setCategorySelect] = useState<string>("");
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Cargar categorías al montar el componente
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const fetchedCategories = await response.json();
        setCategories(fetchedCategories);
        setError("");
      } catch (error) {
        console.error("❌ Error loading categories:", error);
        setError("Error al cargar las categorías");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = async (categoryId: string) => {
    setCategorySelect(categoryId);
    if (categoryId) {
      try {
        const response = await fetch(`/api/subcategories?categoryId=${categoryId}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const fetchedSubcategories = await response.json();
        setSubcategories(fetchedSubcategories);
      } catch (error) {
        console.error("❌ Error loading subcategories:", error);
        setSubcategories([]);
      }
    } else {
      setSubcategories([]);
    }
  };

  return (
    <>
      {error && (
        <div className="error-message text-red-500 text-sm mb-2">
          {error}
        </div>
      )}
      <div className="category">
        <label htmlFor="category">Category</label>
        <select 
          id="category" 
          value={categorySelect} 
          onChange={(e) => handleCategoryChange(e.target.value)}
          disabled={loading}
        >
          <option value="">
            {loading ? "Loading categories..." : "Select a category"}
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="subcategory">
        <label htmlFor="subcategory">Subcategory</label>
        <select id="subcategory" disabled={!categorySelect}>
          <option value="">Select a subcategory</option>
          {
            subcategories.map((subcategory) => (
              <option key={subcategory.id} value={subcategory.id}>
                {subcategory.name}
              </option>
            ))
          }
        </select>
      </div>
    </>
  )
}