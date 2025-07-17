import { getSubcategoriesById } from '@/lib/turso';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params, request, url }) => {
  try {
    const categoryId = url.searchParams.get('categoryId');
    
    if (!categoryId) {
      return new Response(JSON.stringify({ error: 'categoryId is required' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const subcategories = await getSubcategoriesById(categoryId);
    
    return new Response(JSON.stringify(subcategories), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('❌ API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch subcategories' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
