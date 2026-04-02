import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { motion } from 'motion/react';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="group bg-white rounded-xl overflow-hidden premium-shadow transition-all duration-300"
    >
      <Link to={`/product/${product.id}`} className="block relative aspect-[3/4] overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
          <button 
            onClick={handleAddToCart}
            className="bg-white text-saffron p-3 rounded-full hover:bg-saffron hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300"
          >
            <ShoppingCart size={20} />
          </button>
          <div className="bg-white text-gray-800 p-3 rounded-full hover:bg-gray-800 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75">
            <Eye size={20} />
          </div>
        </div>
      </Link>
      
      <div className="p-5 text-center">
        <p className="text-xs text-saffron font-medium uppercase tracking-widest mb-1">{product.category}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-serif font-semibold text-gray-800 hover:text-saffron transition-colors mb-2">
            {product.name}
          </h3>
        </Link>
        <p className="text-xl font-bold text-gray-900">₹{product.price.toLocaleString()}</p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
