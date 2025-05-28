import React, { useState, useEffect } from 'react';
    import { useParams, Link } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import { useCart } from '@/contexts/CartContext';
    import { ShoppingCart, ChevronLeft, Star, Tag, Info, Loader2, Sparkles } from 'lucide-react';
    import ProductCard from '@/components/ProductCard';
    import { motion } from 'framer-motion';
    import { supabase } from '@/lib/supabaseClient';
    import { useToast } from '@/components/ui/use-toast';

    const ProductDetailPage = () => {
      const { productId } = useParams();
      const [product, setProduct] = useState(null);
      const [loading, setLoading] = useState(true);
      const [quantity, setQuantity] = useState(1);
      const [relatedProducts, setRelatedProducts] = useState([]);
      const { addToCart } = useCart();
      const { toast } = useToast();

      useEffect(() => {
        const fetchProductDetails = async () => {
          setLoading(true);
          // Fetch main product
          const { data: productData, error: productError } = await supabase
            .from('products')
            .select('*')
            .eq('id', productId)
            .single();

          if (productError || !productData) {
            console.error('Error fetching product:', productError);
            toast({
              title: "Product not found",
              description: "We couldn't find the sparkle you were looking for.",
              variant: "destructive",
            });
            setProduct(null);
          } else {
            setProduct(productData);
            // Fetch related products
            if (productData.category) {
              const { data: relatedData, error: relatedError } = await supabase
                .from('products')
                .select('*')
                .eq('category', productData.category)
                .neq('id', productData.id) // Exclude the current product
                .limit(4);
              
              if (relatedError) {
                console.error('Error fetching related products:', relatedError);
                setRelatedProducts([]);
              } else {
                setRelatedProducts(relatedData);
              }
            }
          }
          setLoading(false);
          window.scrollTo(0, 0); 
        };

        if (productId) {
          fetchProductDetails();
        }
      }, [productId, toast]);

      if (loading) {
        return (
          <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
            <p className="ml-4 text-xl text-muted-foreground">Polishing the details...</p>
          </div>
        );
      }

      if (!product) {
        return (
          <div className="text-center py-10">
            <h1 className="text-3xl font-bold text-destructive mb-4">Oops! Product Not Found</h1>
            <p className="text-muted-foreground mb-6">This sparkle might have wandered off. Try exploring other collections!</p>
            <Button asChild>
              <Link to="/">Back to Homepage</Link>
            </Button>
          </div>
        );
      }

      const handleQuantityChange = (amount) => {
        setQuantity(prev => Math.max(1, prev + amount));
      };

      return (
        <div className="space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button variant="outline" asChild className="mb-6 group">
              <Link to={product.category === 'men' ? '/men' : '/women'}>
                <ChevronLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to {product.category.charAt(0).toUpperCase() + product.category.slice(1)}'s
              </Link>
            </Button>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 gap-8 items-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <motion.div 
              className="rounded-xl overflow-hidden shadow-2xl aspect-square bg-muted"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              {product.image_url ? (
                <img  
                  className="w-full h-full object-cover" 
                  alt={product.name}
                  src={product.image_url} />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <Sparkles className="w-16 h-16 text-gray-400" />
                </div>
              )}
            </motion.div>

            <div className="space-y-6 p-4 rounded-lg bg-card/80 dark:bg-card/90 shadow-lg backdrop-blur-sm">
              <motion.h1 
                className="text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {product.name}
              </motion.h1>
              
              <div className="flex items-center space-x-2">
                {Array(5).fill(0).map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                ))}
                <span className="text-sm text-muted-foreground">(125 reviews)</span> {/* Placeholder reviews */}
              </div>

              <motion.p 
                className="text-3xl font-bold text-primary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                ${parseFloat(product.price).toFixed(2)}
              </motion.p>

              <div className="space-y-3 text-foreground/90">
                <p className="flex items-start"><Info size={20} className="text-accent mr-2 mt-1 shrink-0" /> {product.description || "No description available."}</p>
                {product.material && <p className="flex items-start"><Tag size={20} className="text-accent mr-2 mt-1 shrink-0" /> Material: <span className="font-semibold ml-1">{product.material}</span></p>}
                <p className="flex items-start"><Tag size={20} className="text-accent mr-2 mt-1 shrink-0" /> Category: <span className="font-semibold ml-1">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span></p>
                {product.stock_quantity !== null && product.stock_quantity > 0 && <p className="flex items-start"><Info size={20} className="text-green-500 mr-2 mt-1 shrink-0" /> In Stock: <span className="font-semibold ml-1">{product.stock_quantity} available</span></p>}
                {product.stock_quantity !== null && product.stock_quantity === 0 && <p className="flex items-start"><Info size={20} className="text-red-500 mr-2 mt-1 shrink-0" /> <span className="font-semibold ml-1 text-red-500">Out of Stock</span></p>}

              </div>
              
              <div className="flex items-center space-x-4 pt-4">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center border rounded-md">
                  <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(-1)} className="h-10 w-10 rounded-r-none" disabled={product.stock_quantity === 0}>
                    -
                  </Button>
                  <span className="px-4 w-12 text-center">{product.stock_quantity === 0 ? 0 : quantity}</span>
                  <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(1)} className="h-10 w-10 rounded-l-none" disabled={product.stock_quantity === 0 || quantity >= product.stock_quantity}>
                    +
                  </Button>
                </div>
              </div>

              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Button 
                  size="lg" 
                  onClick={() => addToCart(product, quantity)} 
                  className="w-full mt-4 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-lg transform hover:scale-105 transition-transform"
                  disabled={product.stock_quantity === 0}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" /> {product.stock_quantity === 0 ? "Out of Stock" : "Add to Cart"}
                </Button>
              </motion.div>
            </div>
          </motion.div>
          
          {relatedProducts.length > 0 && (
            <section className="pt-12 border-t border-border">
              <h2 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">You Might Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedProducts.map((relatedProduct, index) => (
                   <motion.div
                    key={relatedProduct.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  >
                    <ProductCard product={relatedProduct} />
                  </motion.div>
                ))}
              </div>
            </section>
          )}
        </div>
      );
    };

    export default ProductDetailPage;