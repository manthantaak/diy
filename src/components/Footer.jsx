import React from 'react';
    import { Gem, Instagram, Facebook, Twitter } from 'lucide-react';

    const Footer = () => {
      return (
        <footer className="py-8 text-center text-muted-foreground" style={{
          backgroundColor: 'hsla(var(--background) / 0.5)',
          borderTop: '1px solid hsla(var(--border) / 0.2)'
        }}>
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center mb-4">
              <Gem size={28} className="text-primary mb-2" />
              <p className="text-lg font-semibold text-foreground">Ahaana Creatives</p>
              <p className="text-sm">Handcrafted Jewelry Since 2025</p>
            </div>
            <div className="flex justify-center space-x-6 mb-4">
              <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={24} />
              </a>
            </div>
            <p className="text-xs">
              &copy; {new Date().getFullYear()} Ahaana Creatives. All rights reserved. 
              Built with <span className="text-primary">♥</span> by Hostinger Horizons.
            </p>
          </div>
        </footer>
      );
    };

    export default Footer;