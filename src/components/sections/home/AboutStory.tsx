'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function AboutStory() {
  return (
    <section className="relative w-full bg-[#f4f5f6] py-24 sm:py-32 overflow-visible">
      <div className="mx-auto flex max-w-[1440px] flex-col px-6 lg:flex-row lg:items-start lg:gap-20 lg:px-12">
        
        {/* Left Side: Sticky Image */}
        <div className="relative w-full lg:sticky lg:top-32 lg:h-[70vh] lg:w-5/12 mb-12 lg:mb-0">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[50vh] w-full overflow-hidden rounded-[2rem] shadow-2xl lg:h-full"
          >
            <Image
              src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop"
              alt="Adventures Wheel Journey"
              fill
              className="object-cover transition-transform duration-[10s] hover:scale-110"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#122822]/60 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 text-white">
              <p className="text-xs font-normal uppercase tracking-[0.3em] opacity-80" style={{ fontFamily: '"vaccine", serif' }}>Established</p>
              <p className="mt-1 text-4xl font-normal" style={{ fontFamily: '"vaccine", serif' }}>2021</p>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Scrolling Text */}
        <div className="flex w-full flex-col lg:w-7/12 lg:pb-[20vh] lg:pt-[10vh]">
          
          {/* Story Section */}
          <div className="flex min-h-[60vh] flex-col justify-center pb-24">
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-sm font-bold uppercase tracking-[0.25em] text-[#122822] mb-6"
            >
              Our Story
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-[56px] font-normal leading-[1.15] text-[#122822] tracking-tight mb-8"
              style={{ fontFamily: '"vaccine", serif' }}
            >
              Launched in <span className="font-bold text-[#122822]">2021</span>, we set out to make the world's most breathtaking landscapes accessible.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl sm:text-2xl text-slate-500 font-light leading-relaxed max-w-2xl"
            >
              We believe travel isn't just about seeing new places, but about the profound transformations and memories that happen along the way. Every journey is crafted to leave an indelible mark on your soul.
            </motion.p>
          </div>

          {/* Values Section - Highlighted and scrolling up */}
          <div className="flex flex-col justify-center pt-24 lg:pt-32">
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-sm font-bold uppercase tracking-[0.25em] text-[#122822] mb-12"
            >
              Our Core Values
            </motion.p>
            
            <div className="space-y-8 lg:space-y-12">
              {[
                { word: 'Authenticity', color: '#122822' },
                { word: 'Sustainability', color: '#122822' },
                { word: 'Curiosity', color: '#122822' },
                { word: 'Transformation', color: '#122822' }
              ].map((val, idx) => (
                <motion.div
                  key={val.word}
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h3 className="text-[clamp(2rem,6vw,72px)] font-normal text-[#122822]/10 leading-[0.9] tracking-tight uppercase transition-all duration-700 hover:text-[#122822] cursor-default" style={{ fontFamily: '"vaccine", serif' }}>
                    {val.word}.
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
