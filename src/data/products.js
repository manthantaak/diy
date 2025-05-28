// This file is no longer the primary source of truth for products.
    // Product data is now fetched from Supabase.
    // This file can be kept for reference or removed if not needed.

    const localProductsFallback = [
      {
        id: 'local-1',
        name: 'Fallback Celestial Dreams Necklace',
        description: 'A stunning silver necklace with moon and star charms, perfect for dreamers.',
        price: 49.99,
        category: 'women',
        material: 'Sterling Silver',
        image_url: 'https://images.unsplash.com/photo-1611652022419-a741c5e7139e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        tags: ['necklace', 'silver', 'celestial', 'stars', 'moon'],
        featured: true,
        stock_quantity: 5
      },
      {
        id: 'local-2',
        name: 'Fallback Urban Voyager Bracelet',
        description: 'Rugged leather bracelet with a minimalist stainless steel clasp.',
        price: 39.99,
        category: 'men',
        material: 'Leather & Stainless Steel',
        image_url: 'https://images.unsplash.com/photo-1620601354019-933ac389be2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        tags: ['bracelet', 'leather', 'steel', 'minimalist', 'urban'],
        featured: true,
        stock_quantity: 8
      }
    ];
    
    // These functions might be used as a fallback or for local development if Supabase is unavailable.
    export const getProducts = (category) => {
      console.warn("Fetching products from local fallback. Supabase should be used in production.");
      if (!category) return localProductsFallback;
      return localProductsFallback.filter(product => product.category.toLowerCase() === category.toLowerCase());
    };

    export const getProductById = (id) => {
      console.warn("Fetching product by ID from local fallback. Supabase should be used in production.");
      return localProductsFallback.find(product => product.id === id);
    };

    export default localProductsFallback;