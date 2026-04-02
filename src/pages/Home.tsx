import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Star, ShieldCheck, Truck, CreditCard, ShoppingCart, User } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const Home: React.FC = () => {
  const { addToCart } = useCart();
  const [user, setUser] = useState<any>(null);
  const featuredProducts = products.filter(p => p.featured).slice(0, 6);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const categories = [
    { name: 'Ganesh', image: 'ganesh.png' },
    { name: 'Swami Samarth', image: 'swami.png' },
    { name: 'Shivaji Maharaj', image: 'shivaji.png' },
    { name: 'Goddess', image: 'goddess.png' },
    { name: 'Wall Mural', image: 'mural.png' },
    { name: 'Custom', image: 'custom.png' },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/hero_murti/1920/1080" 
            alt="Hero Banner"
            className="w-full h-full object-cover brightness-50"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="relative z-10 text-center text-white px-6 max-w-4xl">
          {user && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center mb-6 space-x-3 bg-white/10 backdrop-blur-sm py-2 px-4 rounded-full w-fit mx-auto border border-white/20"
            >
              <div className="w-8 h-8 rounded-full bg-saffron flex items-center justify-center overflow-hidden">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="" className="w-full h-full object-cover" />
                ) : (
                  <User size={16} className="text-white" />
                )}
              </div>
              <span className="text-sm font-medium">Welcome, {user.displayName?.split(' ')[0] || 'Devotee'}</span>
            </motion.div>
          )}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-saffron font-medium uppercase tracking-[0.3em] mb-4"
          >
            Divine Handcrafted Art
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight"
          >
            Divinity Crafted <br /> with Devotion
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6"
          >
            <Link to="/shop" className="bg-saffron hover:bg-gold text-white px-10 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
              Shop Now
            </Link>
            <Link to="/shop" className="border-2 border-white hover:bg-white hover:text-gray-900 text-white px-10 py-4 rounded-full font-semibold transition-all duration-300">
              Explore Collection
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Shop By Collection Section */}
      <section id="categories" className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 uppercase tracking-tight">Shop By Collection</h2>
            <Link to="/shop" className="text-sm font-bold text-gray-900 flex items-center hover:text-saffron transition-colors uppercase">
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-8">
            {categories.map((cat, idx) => (
              <Link 
                key={idx} 
                to={`/shop?category=${cat.name}`}
                className="group flex flex-col items-center text-center space-y-3"
              >
                <div className="relative w-full aspect-square overflow-hidden rounded-full border border-gray-100 bg-gray-50 premium-shadow transition-transform duration-300 group-hover:scale-105">
                  <img 
                    src={cat.image} 
                    alt={cat.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="text-[10px] md:text-xs font-medium text-gray-600 uppercase tracking-wide group-hover:text-saffron transition-colors">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-16 px-6 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h2 className="text-4xl font-serif font-bold text-gray-400">Best Sellers</h2>
          </div>
          
          <div className="relative">
            <div className="flex overflow-x-auto no-scrollbar gap-4 pb-4 snap-x">
              {featuredProducts.map(product => (
                <div key={product.id} className="min-w-[280px] sm:min-w-[320px] snap-start">
                  <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
                    <Link to={`/product/${product.id}`} className="block relative aspect-[4/5] overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      {/* New Arrival Badge */}
                      <div className="absolute top-4 left-4 bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        New Arrival
                      </div>
                      {/* Cart Icon Overlay */}
                      <div className="absolute bottom-4 left-4">
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            addToCart(product);
                            toast.success(`${product.name} added to cart!`);
                          }}
                          className="bg-black/70 text-white p-3 rounded-md hover:bg-saffron transition-colors"
                        >
                          <ShoppingCart size={18} />
                        </button>
                      </div>
                    </Link>
                    <div className="p-4 bg-gray-50">
                      <Link to={`/product/${product.id}`}>
                        <h3 className="text-sm font-medium text-gray-800 mb-1 truncate">{product.name}</h3>
                      </Link>
                      <p className="text-lg font-bold text-gray-900">₹{product.price.toLocaleString()}.00</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Scroll Indicator Arrow */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden md:block">
              <button className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg text-gray-800 hover:bg-white transition-all">
                <ArrowRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-cream">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img 
              src="https://picsum.photos/seed/craftsman/800/1000" 
              alt="Craftsmanship"
              className="rounded-3xl premium-shadow"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-8 -right-8 bg-saffron text-white p-10 rounded-2xl hidden md:block">
              <p className="text-4xl font-serif font-bold">25+</p>
              <p className="text-sm uppercase tracking-widest">Years of Artistry</p>
            </div>
          </div>
          
          <div className="space-y-8">
            <p className="text-saffron font-bold uppercase tracking-widest">Our Story</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 leading-tight">
              Preserving Tradition <br /> Through Sacred Art
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              At AnantMurti, we believe that every idol is more than just a statue; it's a vessel of devotion. 
              Our journey began with a simple passion for preserving the ancient art of murti-making.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Each piece in our collection is meticulously handcrafted by master artisans who have inherited 
              their skills through generations. We use traditional techniques combined with premium materials 
              to ensure that every creation radiates divinity and peace.
            </p>
            <ul className="space-y-4">
              {['Authentic Traditional Designs', 'Eco-Friendly Materials', 'Customized to Your Devotion'].map((item, idx) => (
                <li key={idx} className="flex items-center space-x-3">
                  <div className="w-5 h-5 rounded-full bg-saffron/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-saffron"></div>
                  </div>
                  <span className="font-medium text-gray-800">{item}</span>
                </li>
              ))}
            </ul>
            <Link to="/contact" className="inline-block bg-gray-900 text-white px-10 py-4 rounded-full font-semibold hover:bg-saffron transition-all duration-300">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Devotee Experiences</h2>
            <div className="w-24 h-1 bg-saffron mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Rahul Sharma', text: 'The Ganesha idol I received is absolutely stunning. The details are far better than what I saw in the pictures.', photo: 'https://i.pravatar.cc/150?u=rahul' },
              { name: 'Priya Deshmukh', text: 'Bought a Swami Samarth murti for my parents. They were moved to tears by its serene expression.', photo: 'https://i.pravatar.cc/150?u=priya' },
              { name: 'Amit Patil', text: 'Excellent quality and very safe packaging. Highly recommend AnantMurti for authentic handcrafted idols.', photo: 'https://i.pravatar.cc/150?u=amit' },
            ].map((t, idx) => (
              <div key={idx} className="bg-cream p-10 rounded-3xl premium-shadow space-y-6">
                <div className="flex text-gold">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-gray-700 italic leading-relaxed">"{t.text}"</p>
                <div className="flex items-center space-x-4">
                  <img src={t.photo} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-500">Verified Customer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
