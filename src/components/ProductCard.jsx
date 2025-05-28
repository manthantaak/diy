import React from 'react';
    import { Link } from 'react-router-dom';
    import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
    import { Button } from '@/components/ui/button';
    import { ShoppingCart, Eye, Sparkles } from 'lucide-react';
    import { useCart } from '@/contexts/CartContext';
    import { motion } from 'framer-motion';

    const ProductCard = ({ product }) => {
      const { addToCart } = useCart();

      if (!product) return null;

      const price = typeof product.price === 'number' ? product.price : parseFloat(product.price || 0);
      
      const placeholderImage = (category) => {
        if (category === 'men') {
          return "https://images.unsplash.com/photo-1587130317093-3b5588d0f10c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60"; // Placeholder for men's jewelry
        }
        return "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60"; // Placeholder for women's jewelry
      };

      const imageUrl = product.image_url || placeholderImage(product.category);

      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -5 }}
          className="h-full"
        >
          <Card className="overflow-hidden h-full flex flex-col bg-card/70 dark:bg-card/80 backdrop-blur-sm">
            <CardHeader className="p-0 relative">
              <Link to={`/product/${product.id}`}>
                <div className="aspect-square w-full overflow-hidden bg-muted">
                  <img  
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110" 
                    alt={product.name}
                    src={imageUrl} 
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = placeholderImage(product.category);
                    }}
                  />
                </div>
              </Link>
            </CardHeader>
            <CardContent className="pt-4 flex-grow">
              <Link to={`/product/${product.id}`}>
                <CardTitle className="text-lg font-semibold mb-1 hover:text-primary transition-colors truncate" title={product.name}>{product.name}</CardTitle>
              </Link>
              <p className="text-sm text-muted-foreground mb-2 h-10 overflow-hidden">
                {product.description ? `${product.description.substring(0, 60)}...` : 'A beautiful piece of jewelry.'}
              </p>
              <p className="text-xl font-bold text-primary">${price.toFixed(2)}</p>
              {product.stock_quantity !== null && product.stock_quantity <= 5 && product.stock_quantity > 0 && (
                <p className="text-sm text-destructive-foreground bg-destructive/80 px-2 py-1 rounded-md mt-2 inline-block">Low Stock!</p>
              )}
              {product.stock_quantity !== null && product.stock_quantity === 0 && (
                <p className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-md mt-2 inline-block">Out of Stock</p>
              )}
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-between gap-2 pt-0">
              <Button 
                variant="outline" 
                asChild 
                className="w-full sm:w-auto flex-grow sm:flex-grow-0"
              >
                <Link to={`/product/${product.id}`}>
                  <Eye className="mr-2 h-4 w-4" /> View
                </Link>
              </Button>
              <Button 
                onClick={() => addToCart(product)} 
                className="w-full sm:w-auto flex-grow sm:flex-grow-0 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground"
                disabled={product.stock_quantity === 0}
              >
                <ShoppingCart className="mr-2 h-4 w-4" /> {product.stock_quantity === 0 ? "Unavailable" : "Add to Cart"}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      );
    };

    export default ProductCard;