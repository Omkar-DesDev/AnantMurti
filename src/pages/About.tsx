import React from 'react';
import { motion } from 'motion/react';
import { Star, Heart, ShieldCheck, Truck, Users, Award } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-6 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-saffron font-bold uppercase tracking-[0.3em] mb-4"
          >
            Our Sacred Journey
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-8"
          >
            About AnantMurti
          </motion.h1>
          <div className="w-24 h-1 bg-saffron mx-auto"></div>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-serif font-bold text-gray-900 leading-tight">
              Crafting Divinity with <br /> Generations of Artistry
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              AnantMurti was founded with a singular vision: to bring the sacred presence of divinity into every home through the finest handcrafted murtis. Our name, "AnantMurti," signifies the infinite forms of the divine that we strive to capture in our art.
            </p>
            <p className="text-gray-600 leading-relaxed">
              What started as a small workshop in the heart of Maharashtra has now grown into a sanctuary for master artisans. We specialize in creating idols of Lord Ganesha, Swami Samarth, Chhatrapati Shivaji Maharaj, and custom orders that reflect the unique devotion of our clients.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-4">
              <div>
                <p className="text-3xl font-serif font-bold text-saffron">2500+</p>
                <p className="text-sm text-gray-500 uppercase tracking-widest">Idols Crafted</p>
              </div>
              <div>
                <p className="text-3xl font-serif font-bold text-saffron">15000+</p>
                <p className="text-sm text-gray-500 uppercase tracking-widest">Happy Devotees</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img 
              src="https://picsum.photos/seed/about-craft/800/1000" 
              alt="Artisan at work"
              className="rounded-3xl premium-shadow w-full object-cover h-[600px]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-2xl premium-shadow hidden md:block max-w-xs">
              <Star className="text-gold mb-4" size={32} />
              <p className="text-gray-800 font-medium italic">"Every stroke is a prayer, every detail is a tribute to the divine."</p>
            </div>
          </motion.div>
        </div>

        {/* Values Section */}
        <div className="bg-white rounded-[3rem] p-12 md:p-20 premium-shadow mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-gray-500">The pillars that sustain our devotion and craftsmanship.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <Heart className="text-saffron" size={40} />, title: 'Pure Devotion', desc: 'We believe that a murti is only as divine as the devotion with which it is made.' },
              { icon: <Award className="text-saffron" size={40} />, title: 'Authenticity', desc: 'We strictly follow traditional iconographic principles to ensure spiritual accuracy.' },
              { icon: <Users className="text-saffron" size={40} />, title: 'Artisan Welfare', desc: 'We empower local artisans by providing them with a platform to showcase their heritage.' },
            ].map((value, idx) => (
              <div key={idx} className="text-center space-y-6 p-6 rounded-2xl hover:bg-cream transition-colors duration-300">
                <div className="flex justify-center">{value.icon}</div>
                <h3 className="text-2xl font-serif font-bold text-gray-900">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Craftsmanship Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <img 
              src="https://picsum.photos/seed/about-detail/800/600" 
              alt="Intricate details"
              className="rounded-3xl premium-shadow w-full object-cover h-[400px]"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          
          <div className="space-y-8 order-1 lg:order-2">
            <h2 className="text-4xl font-serif font-bold text-gray-900 leading-tight">
              The Art of Perfection
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Our process begins with the selection of the finest materials—be it eco-friendly Shadu clay, marble dust, or polyresin. Each idol undergoes multiple stages of refinement, from the initial sculpting to the final delicate painting of the eyes, known as "Netra-daan," which is considered the most sacred step.
            </p>
            <div className="space-y-4">
              {[
                { icon: <ShieldCheck size={20} className="text-saffron" />, text: 'Quality checks at every stage of production' },
                { icon: <Truck size={20} className="text-saffron" />, text: 'Specialized shock-proof packaging for safe transit' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-3">
                  {item.icon}
                  <span className="font-medium text-gray-800">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
