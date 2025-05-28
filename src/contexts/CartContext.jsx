
    import React, { createContext, useContext, useState, useEffect } from 'react';
    import { useToast } from '@/components/ui/use-toast';

    const CartContext = createContext();

    export const useCart = () => useContext(CartContext);

    export const CartProvider = ({ children }) => {
      const [cart, setCart] = useState([]);
      const { toast } = useToast();

      useEffect(() => {
        const storedCart = localStorage.getItem('sparkleCraftCart');
        if (storedCart) {
          setCart(JSON.parse(storedCart));
        }
      }, []);

      useEffect(() => {
        localStorage.setItem('sparkleCraftCart', JSON.stringify(cart));
      }, [cart]);

      const addToCart = (product, quantity = 1) => {
        setCart(prevCart => {
          const existingItem = prevCart.find(item => item.id === product.id);
          if (existingItem) {
            return prevCart.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          }
          return [...prevCart, { ...product, quantity }];
        });
        toast({
          title: "Added to Cart! ✨",
          description: `${product.name} is now in your sparkling cart.`,
          duration: 3000,
        });
      };

      const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
        toast({
          title: "Item Removed 🗑️",
          description: `The item has been removed from your cart.`,
          variant: "destructive",
          duration: 3000,
        });
      };

      const updateQuantity = (productId, quantity) => {
        setCart(prevCart =>
          prevCart.map(item =>
            item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
          )
        );
      };

      const clearCart = () => {
        setCart([]);
        toast({
          title: "Cart Cleared! 💨",
          description: `Your cart is now empty. Time to find new treasures!`,
          duration: 3000,
        });
      };

      const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

      return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal }}>
          {children}
        </CartContext.Provider>
      );
    };
  