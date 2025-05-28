import React from 'react';
    import { Link } from 'react-router-dom';
    import { Gem, ShoppingCart, User, Moon, Sun } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { motion } from 'framer-motion';
    import { useCart } from '@/contexts/CartContext';

    const Navbar = () => {
      const { cart } = useCart();
      const [darkMode, setDarkMode] = React.useState(() => {
        const storedTheme = localStorage.getItem('ahaanaCreativesTheme');
        return storedTheme === 'dark';
      });
      const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

      React.useEffect(() => {
        if (darkMode) {
          document.documentElement.classList.add('dark');
          localStorage.setItem('ahaanaCreativesTheme', 'dark');
        } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('ahaanaCreativesTheme', 'light');
        }
      }, [darkMode]);

      const toggleDarkMode = () => setDarkMode(!darkMode);
      const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

      const navItemVariants = {
        hover: { scale: 1.1, color: 'hsl(var(--primary))' },
        tap: { scale: 0.95 }
      };

      return (
        <motion.nav 
          className="sticky top-0 z-50 shadow-lg"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          style={{
            backdropFilter: 'blur(12px) saturate(150%)',
            WebkitBackdropFilter: 'blur(12px) saturate(150%)',
            backgroundColor: 'hsla(var(--background) / 0.8)',
          }}
        >
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-primary hover:text-primary/80 transition-colors">
              <Gem size={32} className="transform rotate-12" />
              <span>Ahaana Creatives</span>
            </Link>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <motion.div variants={navItemVariants} whileHover="hover" whileTap="tap">
                <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium">Home</Link>
              </motion.div>
              <motion.div variants={navItemVariants} whileHover="hover" whileTap="tap">
                <Link to="/men" className="text-foreground hover:text-primary transition-colors font-medium">Men</Link>
              </motion.div>
              <motion.div variants={navItemVariants} whileHover="hover" whileTap="tap">
                <Link to="/women" className="text-foreground hover:text-primary transition-colors font-medium">Women</Link>
              </motion.div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button variant="ghost" size="icon" onClick={toggleDarkMode} aria-label="Toggle dark mode">
                {darkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-gray-600" />}
              </Button>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link to="/cart" className="relative">
                  <Button variant="ghost" size="icon" aria-label="Shopping cart">
                    <ShoppingCart className="h-6 w-6 text-primary" />
                    {cart.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cart.reduce((total, item) => total + item.quantity, 0)}
                      </span>
                    )}
                  </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="hidden sm:block">
                 <Button variant="ghost" size="icon" aria-label="User account">
                    <User className="h-6 w-6 text-primary" />
                  </Button>
              </motion.div>
              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <Button variant="ghost" size="icon" onClick={toggleMobileMenu} aria-label="Toggle mobile menu">
                  {isMobileMenuOpen ? <User className="h-6 w-6 text-primary" /> : <User className="h-6 w-6 text-primary" />} 
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <motion.div 
              className="md:hidden absolute top-full left-0 right-0 bg-background/95 shadow-lg py-4 px-4 border-t border-border"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Link to="/" className="block py-2 px-3 text-foreground hover:text-primary transition-colors font-medium" onClick={toggleMobileMenu}>Home</Link>
              <Link to="/men" className="block py-2 px-3 text-foreground hover:text-primary transition-colors font-medium" onClick={toggleMobileMenu}>Men</Link>
              <Link to="/women" className="block py-2 px-3 text-foreground hover:text-primary transition-colors font-medium" onClick={toggleMobileMenu}>Women</Link>
              <Link to="/cart" className="block py-2 px-3 text-foreground hover:text-primary transition-colors font-medium" onClick={toggleMobileMenu}>Cart</Link>
              <Button variant="ghost" size="icon" aria-label="User account" className="mt-2 block py-2 px-3 text-foreground hover:text-primary">
                <User className="h-6 w-6 text-primary inline-block mr-2" /> Account
              </Button>
            </motion.div>
          )}
        </motion.nav>
      );
    };

    export default Navbar;