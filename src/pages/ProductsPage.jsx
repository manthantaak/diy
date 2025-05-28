import React, { useState, useEffect } from 'react';
    import ProductCard from '@/components/ProductCard';
    import { motion } from 'framer-motion';
    import { Filter, ChevronDown, Loader2 } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import {
      DropdownMenu,
      DropdownMenuContent,
      DropdownMenuItem,
      DropdownMenuTrigger,
    } from "@/components/ui/dropdown-menu";
    import { supabase } from '@/lib/supabaseClient';
    import { useToast } from '@/components/ui/use-toast';

    const ProductsPage = ({ category }) => {
      const [products, setProducts] = useState([]);
      const [loading, setLoading] = useState(true);
      const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price-asc', 'price-desc', 'name-asc', 'name-desc'
      const { toast } = useToast();

      useEffect(() => {
        const fetchProducts = async () => {
          setLoading(true);
          let query = supabase.from('products').select('*');

          if (category) {
            query = query.eq('category', category);
          }

          if (sortBy === 'price-asc') {
            query = query.order('price', { ascending: true });
          } else if (sortBy === 'price-desc') {
            query = query.order('price', { ascending: false });
          } else if (sortBy === 'name-asc') {
            query = query.order('name', { ascending: true });
          } else if (sortBy === 'name-desc') {
            query = query.order('name', { ascending: false });
          } else if (sortBy === 'featured') {
            query = query.order('featured', { ascending: false }).order('created_at', { ascending: false });
          } else {
             query = query.order('created_at', { ascending: false });
          }


          const { data, error } = await query;

          if (error) {
            console.error('Error fetching products:', error);
             toast({
              title: "Error fetching products",
              description: "Could not load products for this category. Please try again later.",
              variant: "destructive",
            });
            setProducts([]);
          } else {
            setProducts(data);
          }
          setLoading(false);
        };

        fetchProducts();
      }, [category, sortBy, toast]);

      const pageTitle = category ? `${category.charAt(0).toUpperCase() + category.slice(1)}'s Collection` : 'All Products';

      return (
        <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row justify-between items-center mb-8 pb-4 border-b border-border"
          >
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-4 sm:mb-0">
              {pageTitle}
            </h1>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" /> Sort By <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSortBy('featured')}>Featured</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('price-asc')}>Price: Low to High</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('price-desc')}>Price: High to Low</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('name-asc')}>Name: A to Z</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('name-desc')}>Name: Z to A</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>

          {loading ? (
             <div className="flex justify-center items-center min-h-[300px]">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="ml-4 text-lg text-muted-foreground">Loading collection...</p>
              </div>
          ) : products.length === 0 ? (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-center text-muted-foreground text-xl py-10"
            >
              No products found in this category yet. Stay tuned for new arrivals!
            </motion.p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      );
    };

    export default ProductsPage;