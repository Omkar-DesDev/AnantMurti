import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="space-y-6">
          <h2 className="text-2xl font-serif font-bold text-saffron">AnantMurti</h2>
          <p className="text-sm leading-relaxed">
            Divinity crafted with devotion. We bring you the finest handcrafted Hindu god idols, 
            made with traditional techniques and pure devotion.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-saffron transition-colors"><Facebook size={20} /></a>
            <a href="#" className="hover:text-saffron transition-colors"><Instagram size={20} /></a>
            <a href="#" className="hover:text-saffron transition-colors"><Twitter size={20} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-serif font-semibold text-white mb-6">Quick Links</h3>
          <ul className="space-y-4 text-sm">
            <li><Link to="/" className="hover:text-saffron transition-colors">Home</Link></li>
            <li><Link to="/shop" className="hover:text-saffron transition-colors">Shop All</Link></li>
            <li><Link to="/about" className="hover:text-saffron transition-colors">Our Story</Link></li>
            <li><Link to="/contact" className="hover:text-saffron transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-serif font-semibold text-white mb-6">Categories</h3>
          <ul className="space-y-4 text-sm">
            <li><Link to="/shop?category=Ganesha Idols" className="hover:text-saffron transition-colors">Ganesha Idols</Link></li>
            <li><Link to="/shop?category=Swami Idols" className="hover:text-saffron transition-colors">Swami Idols</Link></li>
            <li><Link to="/shop?category=Shivaji Maharaj Idols" className="hover:text-saffron transition-colors">Shivaji Maharaj</Link></li>
            <li><Link to="/shop?category=Custom Murti" className="hover:text-saffron transition-colors">Custom Murti</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-serif font-semibold text-white mb-6">Contact Info</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start space-x-3">
              <MapPin size={18} className="text-saffron shrink-0" />
              <span>123 Spiritual Lane, Pune, Maharashtra, India</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone size={18} className="text-saffron shrink-0" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail size={18} className="text-saffron shrink-0" />
              <span>devotion@anantmurti.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-800 text-center text-xs">
        <p>&copy; {new Date().getFullYear()} AnantMurti. All Rights Reserved. Crafted with Devotion.</p>
      </div>
    </footer>
  );
};

export default Footer;
