import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc, collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { motion } from 'motion/react';
import { 
  User, Package, MapPin, Heart, 
  Camera, MoreVertical, Edit2, LogOut, ChevronRight,
  Mail, Phone, Calendar, ShoppingBag, ExternalLink
} from 'lucide-react';
import { cn } from '../lib/utils';
import { toast } from 'sonner';

const Profile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('My Account');
  const [orders, setOrders] = useState<any[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Ensure user doc exists in Firestore
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (!userDoc.exists()) {
          await setDoc(userDocRef, {
            name: currentUser.displayName,
            email: currentUser.email,
            photoURL: currentUser.photoURL,
            role: 'client',
            joinDate: new Date().toISOString(),
          });
        }
        fetchOrders(currentUser.uid);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const fetchOrders = async (uid: string) => {
    setOrdersLoading(true);
    try {
      const q = query(
        collection(db, 'orders'), 
        where('userId', '==', uid),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const fetchedOrders = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrders(fetchedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setOrdersLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success("Logged in successfully!");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Failed to login.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
      navigate('/');
    } catch (error) {
      toast.error("Failed to logout.");
    }
  };

  if (loading) return <div className="pt-40 text-center">Loading...</div>;

  if (!user) {
    return (
      <div className="pt-40 pb-24 px-6 text-center min-h-screen bg-cream">
        <div className="max-w-md mx-auto space-y-8 bg-white p-10 rounded-3xl premium-shadow">
          <div className="w-20 h-20 bg-saffron/10 rounded-full flex items-center justify-center mx-auto">
            <User size={40} className="text-saffron" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-600">Please login to access your account, orders, and wishlist.</p>
          <button 
            onClick={handleLogin}
            className="w-full bg-gray-900 text-white py-4 rounded-full font-bold hover:bg-saffron transition-all flex items-center justify-center"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5 mr-3" alt="" />
            Login with Google
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { name: 'My Account', icon: <User size={18} /> },
    { name: 'My Orders', icon: <Package size={18} /> },
    { name: 'My Addresses', icon: <MapPin size={18} /> },
    { name: 'My Wishlist', icon: <Heart size={18} /> },
  ];

  return (
    <div className="pt-20 pb-24 bg-gray-50 min-h-screen">
      {/* Profile Header */}
      <div className="bg-[#1976D2] h-64 relative">
        <div className="max-w-7xl mx-auto px-6 h-full relative">
          <button className="absolute top-6 left-6 text-white/80 hover:text-white">
            <Camera size={20} />
          </button>
          
          <div className="absolute bottom-0 left-6 flex items-end space-x-6">
            <div className="w-32 h-32 rounded-full border-4 border-white bg-[#4E342E] flex items-center justify-center text-white text-5xl font-bold overflow-hidden shadow-lg transform translate-y-1/2">
              {user.photoURL ? (
                <img src={user.photoURL} alt="" className="w-full h-full object-cover" />
              ) : (
                user.displayName?.charAt(0) || 'O'
              )}
            </div>
            <div className="pb-6 text-white">
              <h1 className="text-3xl font-bold mb-1">{user.displayName || 'Customer'}</h1>
              <p className="text-sm text-white/90">AnantMurti Devotee</p>
            </div>
          </div>

          <button className="absolute bottom-4 right-6 text-white/80 hover:text-white">
            <MoreVertical size={24} />
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 mt-16 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto px-6 flex items-center">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={cn(
                "px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-all flex items-center space-x-2",
                activeTab === tab.name 
                  ? "border-saffron text-saffron" 
                  : "border-transparent text-gray-500 hover:text-gray-700"
              )}
            >
              {tab.icon}
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white rounded-xl shadow-sm p-8">
          {activeTab === 'My Account' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Account Information</h2>
                <button className="text-saffron font-bold flex items-center hover:underline">
                  <Edit2 size={16} className="mr-2" /> Edit
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <User size={20} className="text-saffron" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Full Name</p>
                      <p className="text-gray-800 font-medium">{user.displayName}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <Mail size={20} className="text-saffron" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Email Address</p>
                      <p className="text-gray-800 font-medium">{user.email}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <Phone size={20} className="text-saffron" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Phone Number</p>
                      <p className="text-gray-800 font-medium">+91 98765 43210</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <Calendar size={20} className="text-saffron" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Member Since</p>
                      <p className="text-gray-800 font-medium">{new Date(user.metadata.creationTime).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-8 border-t border-gray-100">
                <button 
                  onClick={handleLogout}
                  className="flex items-center text-red-500 font-bold hover:text-red-600 transition-colors"
                >
                  <LogOut size={20} className="mr-2" /> Logout from Account
                </button>
              </div>
            </div>
          )}

          {activeTab === 'My Orders' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-gray-800">Order History</h2>
              {ordersLoading ? (
                <div className="py-12 text-center text-gray-500">Loading your orders...</div>
              ) : orders.length === 0 ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                    <ShoppingBag size={32} className="text-gray-400" />
                  </div>
                  <p className="text-gray-500">You haven't placed any orders yet.</p>
                  <button onClick={() => navigate('/shop')} className="text-saffron font-bold hover:underline">Start Shopping</button>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
                      <div className="flex flex-wrap justify-between items-start mb-4 gap-4">
                        <div>
                          <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Order ID</p>
                          <p className="text-gray-800 font-mono font-medium">#{order.id.slice(-8).toUpperCase()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Date</p>
                          <p className="text-gray-800 font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Status</p>
                          <span className={cn(
                            "text-[10px] uppercase font-bold px-3 py-1 rounded-full",
                            order.status?.includes('Paid') ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                          )}>
                            {order.status || 'Processing'}
                          </span>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Total</p>
                          <p className="text-saffron font-bold">₹{order.total.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                        <p className="text-sm text-gray-600">{order.items.length} items purchased</p>
                        <button className="text-xs font-bold text-gray-900 flex items-center hover:text-saffron transition-colors">
                          View Details <ExternalLink size={14} className="ml-1" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'My Addresses' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Saved Addresses</h2>
                <button className="bg-gray-900 text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-saffron transition-colors">
                  Add New
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-2 border-saffron bg-saffron/5 rounded-2xl p-6 relative">
                  <div className="absolute top-4 right-4 bg-saffron text-white text-[10px] font-bold px-2 py-1 rounded">DEFAULT</div>
                  <h3 className="font-bold text-gray-800 mb-2">Home</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    123, Spiritual Residency,<br />
                    Near Ganesh Temple, Kothrud,<br />
                    Pune, Maharashtra - 411038
                  </p>
                  <div className="mt-4 pt-4 border-t border-saffron/10 flex space-x-4">
                    <button className="text-xs font-bold text-saffron hover:underline">Edit</button>
                    <button className="text-xs font-bold text-gray-400 hover:text-red-500">Remove</button>
                  </div>
                </div>
                <div className="border border-gray-100 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-4 border-dashed">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center">
                    <MapPin size={24} className="text-gray-300" />
                  </div>
                  <p className="text-sm text-gray-400">Add another address for faster checkout</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'My Wishlist' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-gray-800">My Wishlist</h2>
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                  <Heart size={32} className="text-gray-400" />
                </div>
                <p className="text-gray-500">Your wishlist is empty.</p>
                <button onClick={() => navigate('/shop')} className="bg-saffron text-white px-8 py-3 rounded-full font-bold hover:bg-gold transition-colors">
                  Explore Products
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
