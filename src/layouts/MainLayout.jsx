
    import React from 'react';
    import Navbar from '@/components/Navbar';
    import Footer from '@/components/Footer';
    import { motion } from 'framer-motion';

    const MainLayout = ({ children }) => {
      return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
          <Navbar />
          <motion.main 
            className="flex-grow container mx-auto px-4 py-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.main>
          <Footer />
        </div>
      );
    };

    export default MainLayout;
  