import React, { useState, useEffect } from 'react';
    import { Link } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import ProductCard from '@/components/ProductCard';
    import { motion } from 'framer-motion';
    import { Sparkles, Users, Leaf, Loader2 } from 'lucide-react';
    import { supabase } from '@/lib/supabaseClient';
    import { useToast } from '@/components/ui/use-toast';

    const HomePage = () => {
      const [featuredProducts, setFeaturedProducts] = useState([]);
      const [loading, setLoading] = useState(true);
      const { toast } = useToast();

      useEffect(() => {
        const fetchFeaturedProducts = async () => {
          setLoading(true);
          const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('featured', true)
            .limit(4);

          if (error) {
            console.error('Error fetching featured products:', error);
            toast({
              title: "Error fetching products",
              description: "Could not load featured products. Please try again later.",
              variant: "destructive",
            });
            setFeaturedProducts([]);
          } else {
            setFeaturedProducts(data);
          }
          setLoading(false);
        };

        fetchFeaturedProducts();
      }, [toast]);

      return (
        <div className="space-y-16">
          {/* Hero Section */}
          <motion.section 
            className="relative text-center py-16 md:py-20 px-6 rounded-xl overflow-hidden bg-gradient-to-br from-primary/80 via-accent/70 to-purple-600/70 shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-black/30 z-0"></div>
            <div className="relative z-10">
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg mb-6"
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Discover Your Sparkle with Ahaana Creatives
              </motion.h1>
              <motion.p 
                className="text-lg sm:text-xl md:text-2xl text-primary-foreground mb-10 max-w-2xl mx-auto drop-shadow-md"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Handcrafted jewelry designed to tell your unique story. Ethically sourced, beautifully made.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Button 
                  size="lg" 
                  asChild 
                  className="w-full sm:w-auto bg-pink-500 hover:bg-pink-600 text-white shadow-lg transform hover:scale-105 transition-transform"
                >
                  <Link to="/women">Shop Women's</Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  asChild 
                  className="w-full sm:w-auto border-teal-300 text-teal-300 hover:bg-teal-300/20 hover:text-white shadow-lg transform hover:scale-105 transition-transform"
                >
                  <Link to="/men">Shop Men's</Link>
                </Button>
              </motion.div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-background to-transparent z-0"></div>
          </motion.section>

          {/* Featured Products Section */}
          <section>
            <h2 className="text-4xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Featured Collection</h2>
            {loading ? (
              <div className="flex justify-center items-center min-h-[200px]">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="ml-4 text-lg text-muted-foreground">Loading sparkles...</p>
              </div>
            ) : featuredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {featuredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground text-xl">No featured products available at the moment. Check back soon!</p>
            )}
          </section>

          {/* Why Choose Us Section */}
          <section className="py-12 bg-muted/50 dark:bg-muted/20 rounded-xl shadow-lg">
            <h2 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Why Ahaana Creatives?</h2>
            <div className="container mx-auto grid md:grid-cols-3 gap-10 text-center">
              <motion.div className="p-6" initial={{ opacity:0, x: -30 }} whileInView={{ opacity:1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
                <Sparkles className="mx-auto h-16 w-16 text-primary mb-4" />
                <h3 className="text-2xl font-semibold mb-2 text-foreground">Unique Designs</h3>
                <p className="text-muted-foreground">Every piece is thoughtfully designed to be as unique as you are, blending modern trends with timeless elegance.</p>
              </motion.div>
              <motion.div className="p-6" initial={{ opacity:0, y: 30 }} whileInView={{ opacity:1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
                <Leaf className="mx-auto h-16 w-16 text-green-500 mb-4" />
                <h3 className="text-2xl font-semibold mb-2 text-foreground">Ethically Sourced</h3>
                <p className="text-muted-foreground">We believe in beauty that doesn't cost the Earth. Our materials are sourced responsibly.</p>
              </motion.div>
              <motion.div className="p-6" initial={{ opacity:0, x: 30 }} whileInView={{ opacity:1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
                <Users className="mx-auto h-16 w-16 text-accent mb-4" />
                <h3 className="text-2xl font-semibold mb-2 text-foreground">For Everyone</h3>
                <p className="text-muted-foreground">Stylish collections for all genders, because everyone deserves to shine.</p>
              </motion.div>
            </div>
          </section>
          
          {/* Call to Action Banner */}
          <motion.section 
            className="py-16 bg-gradient-to-r from-accent to-purple-600 text-center rounded-xl shadow-xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Find Your Next Favorite Piece?</h2>
            <p className="text-xl text-primary-foreground mb-8">Explore our full collection and let your style sparkle.</p>
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90 transform hover:scale-105 transition-transform shadow-lg" asChild>
              <Link to="/women">Explore All Jewelry</Link>
            </Button>
          </motion.section>
        </div>
      );
    };

    export default HomePage;