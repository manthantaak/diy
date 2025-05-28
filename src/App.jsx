
    import React from 'react';
    import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
    import MainLayout from '@/layouts/MainLayout';
    import HomePage from '@/pages/HomePage';
    import ProductsPage from '@/pages/ProductsPage';
    import ProductDetailPage from '@/pages/ProductDetailPage';
    import CartPage from '@/pages/CartPage';
    import { Toaster } from '@/components/ui/toaster';
    import { CartProvider } from '@/contexts/CartContext';
    import { motion, AnimatePresence } from 'framer-motion';

    function App() {
      return (
        <CartProvider>
          <Router>
            <MainLayout>
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={
                    <motion.div key="home" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                      <HomePage />
                    </motion.div>
                  } />
                  <Route path="/men" element={
                    <motion.div key="men" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                      <ProductsPage category="men" />
                    </motion.div>
                  } />
                  <Route path="/women" element={
                    <motion.div key="women" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                      <ProductsPage category="women" />
                    </motion.div>
                  } />
                  <Route path="/product/:productId" element={
                    <motion.div key="product-detail" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                      <ProductDetailPage />
                    </motion.div>
                  } />
                  <Route path="/cart" element={
                    <motion.div key="cart" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                      <CartPage />
                    </motion.div>
                  } />
                </Routes>
              </AnimatePresence>
            </MainLayout>
            <Toaster />
          </Router>
        </CartProvider>
      );
    }

    export default App;
  