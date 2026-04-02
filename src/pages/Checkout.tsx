import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { motion } from 'motion/react';
import { CheckCircle2, CreditCard, Truck, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '../lib/utils';

const Checkout: React.FC = () => {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    pincode: '',
    paymentMethod: 'COD' as 'COD' | 'Online'
  });

  const shippingCharge = total > 5000 ? 0 : 150;
  const grandTotal = total + shippingCharge;

  if (cart.length === 0 && !orderSuccess) {
    navigate('/shop');
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      if (formData.paymentMethod === 'Online') {
        // Simulate online payment for demo purposes
        setTimeout(async () => {
          await saveOrder('demo_payment_id_' + Date.now());
        }, 1500);
      } else {
        await saveOrder();
      }
    } catch (error) {
      console.error("Order error:", error);
      toast.error("Something went wrong. Please try again.");
      setIsProcessing(false);
    }
  };

  const saveOrder = async (paymentId?: string) => {
    const orderData = {
      customerName: formData.name,
      phone: formData.phone,
      address: formData.address,
      pincode: formData.pincode,
      items: cart,
      subtotal: total,
      shipping: shippingCharge,
      total: grandTotal,
      paymentMethod: formData.paymentMethod,
      paymentId: paymentId || null,
      status: formData.paymentMethod === 'COD' ? 'COD - Pending' : 'Paid - Processing',
      createdAt: new Date().toISOString()
    };

    await addDoc(collection(db, 'orders'), orderData);
    setOrderSuccess(true);
    clearCart();
    setIsProcessing(false);
    toast.success("Order placed successfully!");
  };

  if (orderSuccess) {
    return (
      <div className="pt-40 pb-24 px-6 text-center min-h-screen bg-cream">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md mx-auto space-y-8"
        >
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 size={48} className="text-green-600" />
          </div>
          <h2 className="text-4xl font-serif font-bold text-gray-900">Order Successful!</h2>
          <p className="text-gray-600">
            Thank you for choosing AnantMurti. Your divine creation will be on its way soon.
            We've sent a confirmation to your phone.
          </p>
          <div className="bg-white p-6 rounded-2xl premium-shadow text-left space-y-2">
            <p className="text-sm text-gray-500">Order Details:</p>
            <p className="font-bold">Name: {formData.name}</p>
            <p className="font-bold">Method: {formData.paymentMethod}</p>
            <p className="font-bold text-saffron">Total: ₹{grandTotal.toLocaleString()}</p>
          </div>
          <Link to="/" className="inline-block bg-gray-900 text-white px-10 py-4 rounded-full font-bold hover:bg-saffron transition-all">
            Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-12">Checkout</h1>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Customer Details */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl premium-shadow space-y-6">
              <h3 className="text-2xl font-serif font-bold text-gray-900 flex items-center">
                <Truck className="mr-3 text-saffron" size={24} /> Shipping Details
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input 
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-saffron"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input 
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-saffron"
                    placeholder="Enter 10-digit number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Address</label>
                  <textarea 
                    required
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-saffron"
                    placeholder="Street, Landmark, City"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                  <input 
                    required
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-saffron"
                    placeholder="6-digit pincode"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl premium-shadow space-y-6">
              <h3 className="text-2xl font-serif font-bold text-gray-900 flex items-center">
                <CreditCard className="mr-3 text-saffron" size={24} /> Payment Method
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <button 
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'COD' }))}
                  className={cn(
                    "p-4 rounded-2xl border-2 transition-all flex flex-col items-center space-y-2",
                    formData.paymentMethod === 'COD' ? "border-saffron bg-saffron/5" : "border-gray-100 hover:border-gray-200"
                  )}
                >
                  <span className="font-bold">Cash on Delivery</span>
                  <span className="text-[10px] text-gray-500 uppercase">Pay at your doorstep</span>
                </button>
                <button 
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'Online' }))}
                  className={cn(
                    "p-4 rounded-2xl border-2 transition-all flex flex-col items-center space-y-2",
                    formData.paymentMethod === 'Online' ? "border-saffron bg-saffron/5" : "border-gray-100 hover:border-gray-200"
                  )}
                >
                  <span className="font-bold">Online Payment</span>
                  <span className="text-[10px] text-gray-500 uppercase">Secure via Razorpay</span>
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl premium-shadow space-y-8">
              <h3 className="text-2xl font-serif font-bold text-gray-900">Order Summary</h3>
              
              <div className="max-h-60 overflow-y-auto space-y-4 pr-2">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-16 rounded-lg overflow-hidden shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-800">{item.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="text-sm font-bold">₹{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-gray-100 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-bold">₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Delivery</span>
                  <span className={cn("font-bold", shippingCharge === 0 ? "text-green-600" : "text-gray-900")}>
                    {shippingCharge === 0 ? "FREE" : `₹${shippingCharge}`}
                  </span>
                </div>
                <div className="pt-4 border-t border-gray-100 flex justify-between text-2xl">
                  <span className="font-serif font-bold">Total</span>
                  <span className="font-bold text-saffron">₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isProcessing}
                className="w-full bg-gray-900 text-white py-5 rounded-full font-bold hover:bg-saffron transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? "Processing..." : formData.paymentMethod === 'COD' ? "Place Order (COD)" : "Pay & Place Order"}
              </button>

              <div className="flex items-center justify-center space-x-2 text-gray-400">
                <ShieldCheck size={16} />
                <span className="text-xs">Secure SSL Encrypted Checkout</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
