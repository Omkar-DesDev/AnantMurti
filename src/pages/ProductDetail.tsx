import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { motion } from 'motion/react';
import { ShoppingCart, ArrowLeft, ShieldCheck, Truck, RotateCcw, Star } from 'lucide-react';
import { toast } from 'sonner';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="pt-40 text-center">
        <h2 className="text-3xl font-serif font-bold">Product not found</h2>
        <button onClick={() => navigate('/shop')} className="mt-4 text-saffron font-bold">Back to Shop</button>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`${quantity} ${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    addToCart(product);
    navigate('/cart');
  };

  return (
    <div className="pt-32 pb-24 px-6 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-saffron mb-12 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="aspect-[3/4] rounded-3xl overflow-hidden premium-shadow bg-white">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square rounded-xl overflow-hidden border-2 border-transparent hover:border-saffron cursor-pointer transition-all">
                  <img src={product.image} alt="" className="w-full h-full object-cover opacity-60 hover:opacity-100" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Details */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <p className="text-saffron font-bold uppercase tracking-widest mb-2">{product.category}</p>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex text-gold">
                  {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                </div>
                <span className="text-gray-500 text-sm">(48 Reviews)</span>
              </div>
              <p className="text-3xl font-bold text-gray-900">₹{product.price.toLocaleString()}</p>
            </div>

            <p className="text-gray-600 leading-relaxed text-lg">
              {product.description}
            </p>

            <div className="grid grid-cols-2 gap-6 py-8 border-y border-gray-200">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Material</p>
                <p className="font-bold text-gray-800">{product.material}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Size</p>
                <p className="font-bold text-gray-800">{product.size}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <div className="flex items-center border border-gray-200 rounded-full px-4 py-2 bg-white">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 text-gray-500 hover:text-saffron">-</button>
                <span className="px-6 font-bold">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-2 text-gray-500 hover:text-saffron">+</button>
              </div>
              <button 
                onClick={handleAddToCart}
                className="w-full sm:flex-1 bg-gray-900 text-white px-8 py-4 rounded-full font-bold flex items-center justify-center hover:bg-saffron transition-all duration-300"
              >
                <ShoppingCart size={20} className="mr-2" /> Add to Cart
              </button>
              <button 
                onClick={handleBuyNow}
                className="w-full sm:flex-1 bg-saffron text-white px-8 py-4 rounded-full font-bold hover:bg-gold transition-all duration-300"
              >
                Buy Now
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="text-center space-y-2">
                <ShieldCheck className="mx-auto text-saffron" size={24} />
                <p className="text-[10px] uppercase font-bold tracking-widest">100% Authentic</p>
              </div>
              <div className="text-center space-y-2">
                <Truck className="mx-auto text-saffron" size={24} />
                <p className="text-[10px] uppercase font-bold tracking-widest">Safe Delivery</p>
              </div>
              <div className="text-center space-y-2">
                <RotateCcw className="mx-auto text-saffron" size={24} />
                <p className="text-[10px] uppercase font-bold tracking-widest">Easy Returns</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
