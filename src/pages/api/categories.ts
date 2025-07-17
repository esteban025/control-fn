import { getCategories } from '@/lib/turso';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params, request }) => {
  try {
    const categories = await getCategories();
    
    return new Response(JSON.stringify(categories), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('❌ API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch categories' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
