
    import React from 'react';
    import { Link } from 'react-router-dom';
    import { useCart } from '@/contexts/CartContext';
    import { Button } from '@/components/ui/button';
    import { Trash2, Plus, Minus, ShoppingBag, CreditCard } from 'lucide-react';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

    const CartPage = () => {
      const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();

      const itemVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: (i) => ({ 
          opacity: 1, 
          x: 0,
          transition: { delay: i * 0.1, duration: 0.3 }
        }),
        exit: { opacity: 0, x: 50, transition: { duration: 0.2 } }
      };

      return (
        <div className="space-y-8">
          <motion.h1 
            className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Your Sparkling Cart <ShoppingBag className="inline-block ml-2 h-10 w-10" />
          </motion.h1>

          {cart.length === 0 ? (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img  
                alt="Empty shopping cart illustration" 
                className="mx-auto mb-6 w-48 h-48 text-muted-foreground"
               src="https://images.unsplash.com/photo-1559622988-b2c66e3f591c" />
              <p className="text-2xl font-semibold text-muted-foreground mb-4">Your cart is currently empty.</p>
              <p className="text-lg text-muted-foreground mb-6">Looks like you haven't added any sparkles yet!</p>
              <Button size="lg" asChild className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-lg transform hover:scale-105 transition-transform">
                <Link to="/">Continue Shopping</Link>
              </Button>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-2 space-y-6">
                <AnimatePresence>
                  {cart.map((item, index) => (
                    <motion.div
                      key={item.id}
                      custom={index}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout
                    >
                      <Card className="overflow-hidden flex flex-col sm:flex-row items-center shadow-lg">
                        <div className="w-full sm:w-32 h-32 sm:h-auto aspect-square flex-shrink-0">
                          <img  
                            src={item.imageUrl} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                           src="https://images.unsplash.com/photo-1613243555978-636c48dc653c" />
                        </div>
                        <CardContent className="p-4 flex-grow w-full">
                          <Link to={`/product/${item.id}`} className="hover:text-primary transition-colors">
                            <h3 className="text-lg font-semibold">{item.name}</h3>
                          </Link>
                          <p className="text-sm text-muted-foreground">{item.material}</p>
                          <p className="text-lg font-bold text-primary mt-1">${item.price.toFixed(2)}</p>
                          <div className="flex items-center space-x-2 mt-3">
                            <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-8 w-8">
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span>{item.quantity}</span>
                            <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-8 w-8">
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                        <CardFooter className="p-4 flex-shrink-0">
                          <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)} className="text-destructive hover:text-destructive/80">
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
                 <motion.div 
                  className="mt-6 text-right"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: cart.length * 0.1 + 0.2 }}
                >
                  <Button variant="outline" onClick={clearCart} className="text-destructive border-destructive hover:bg-destructive/10">
                    <Trash2 className="mr-2 h-4 w-4" /> Clear Cart
                  </Button>
                </motion.div>
              </div>

              <motion.div 
                className="lg:col-span-1 sticky top-24"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Card className="shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>FREE</span>
                    </div>
                    <div className="flex justify-between border-t pt-3 mt-3 font-bold text-xl">
                      <span>Total</span>
                      <span className="text-primary">${cartTotal.toFixed(2)}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button size="lg" className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-lg transform hover:scale-105 transition-transform">
                      <CreditCard className="mr-2 h-5 w-5" /> Proceed to Checkout
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </div>
          )}
        </div>
      );
    };

    export default CartPage;
  