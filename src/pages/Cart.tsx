import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus } from 'lucide-react';
import { motion } from 'motion/react';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, total } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="pt-40 pb-24 px-6 text-center min-h-screen bg-cream">
        <div className="max-w-md mx-auto space-y-8">
          <div className="w-24 h-24 bg-saffron/10 rounded-full flex items-center justify-center mx-auto">
            <ShoppingBag size={48} className="text-saffron" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-gray-900">Your cart is empty</h2>
          <p className="text-gray-600">Looks like you haven't added any divine creations to your cart yet.</p>
          <Link to="/shop" className="inline-block bg-saffron text-white px-10 py-4 rounded-full font-bold hover:bg-gold transition-all">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-12">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map(item => (
              <motion.div 
                layout
                key={item.id} 
                className="bg-white p-6 rounded-2xl premium-shadow flex flex-col sm:flex-row items-center gap-6"
              >
                <div className="w-24 h-32 rounded-xl overflow-hidden shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-lg font-serif font-bold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-saffron mb-2">{item.category}</p>
                  <p className="text-lg font-bold">₹{item.price.toLocaleString()}</p>
                </div>

                <div className="flex items-center border border-gray-100 rounded-full px-3 py-1 bg-cream">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 text-gray-500 hover:text-saffron"><Minus size={16} /></button>
                  <span className="px-4 font-bold">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 text-gray-500 hover:text-saffron"><Plus size={16} /></button>
                </div>

                <div className="text-right hidden sm:block">
                  <p className="text-lg font-bold">₹{(item.price * item.quantity).toLocaleString()}</p>
                </div>

                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-3xl premium-shadow sticky top-32 space-y-8">
              <h3 className="text-2xl font-serif font-bold text-gray-900">Order Summary</h3>
              
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-bold">₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span className="text-green-600 font-bold">FREE</span>
                </div>
                <div className="pt-4 border-t border-gray-100 flex justify-between text-xl">
                  <span className="font-serif font-bold">Total</span>
                  <span className="font-bold text-saffron">₹{total.toLocaleString()}</span>
                </div>
              </div>

              <button 
                onClick={() => navigate('/checkout')}
                className="w-full bg-gray-900 text-white py-4 rounded-full font-bold flex items-center justify-center hover:bg-saffron transition-all group"
              >
                Proceed to Checkout <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="pt-4 text-center">
                <p className="text-xs text-gray-400">Secure checkout powered by Razorpay</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
