'use client';

import React from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import type { ItineraryDay } from '@/data/trips';

export function TripItinerary({ itinerary, coverImage }: { itinerary: ItineraryDay[], coverImage?: string }) {
  return (
    <div className="flex flex-col lg:flex-row gap-10 relative">
      {/* Left side fixed image container */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="sticky top-24 h-[calc(100vh-8rem)] w-full overflow-hidden rounded-sm shadow-md">
          {coverImage ? (
            <Image
              src={coverImage}
              alt="Itinerary Route"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          ) : (
            <div className="w-full h-full bg-[#122822]/10" />
          )}
        </div>
      </div>

      {/* Right side scrolling text */}
      <div className="w-full lg:w-1/2 relative">
        {/* Vertical dashed line connecting the days */}
        <div className="absolute left-[23px] top-4 bottom-4 w-px border-l border-dashed border-[#122822]/30 hidden md:block" />

        <div className="space-y-12 pb-8">
          {itinerary.map((item) => (
            <ItineraryDayItem key={item.day} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ItineraryDayItem({ item }: { item: ItineraryDay }) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div className="relative z-10 md:pl-16">
      {/* Number badge */}
      <div className="hidden md:flex absolute left-0 top-0 w-12 bg-[#faf7f2] justify-center py-2">
        <div className="w-12 h-16 border border-[#122822]/20 flex flex-col items-center justify-center bg-white text-[#122822]">
          <span className="text-3xl font-bold leading-none" style={{ fontFamily: '"vaccine", serif' }}>{item.day}</span>
        </div>
      </div>

      <div 
        className={`bg-white md:bg-transparent w-full rounded-2xl md:rounded-none border border-[#122822]/10 md:border-none transition-all overflow-hidden md:overflow-visible ${isExpanded ? 'shadow-md md:shadow-none' : 'shadow-sm md:shadow-none'}`}
      >
        <div
          className="flex justify-between items-center cursor-pointer p-4 sm:p-6 md:p-0 group"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-4 md:gap-0">
            <span className="text-xl font-bold text-[#122822]/40 w-10 text-center md:hidden" style={{ fontFamily: '"vaccine", serif' }}>
              {String(item.day).padStart(2, '0')}
            </span>
            <h3 className="text-xl sm:text-2xl font-normal text-[#122822] uppercase tracking-wide md:mb-4 transition-colors group-hover:text-[#122822]/70" style={{ fontFamily: '"vaccine", serif' }}>
              {item.title}
            </h3>
          </div>
          <div className={`text-[#122822]/40 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
            <ChevronDown size={24} />
          </div>
        </div>

        <div className={`px-4 sm:px-6 md:px-0 pb-6 md:pb-0 text-lg leading-relaxed text-[#122822]/80 space-y-4 font-medium transition-all ${!isExpanded ? 'hidden' : 'block border-t border-[#122822]/5 pt-4 mt-2 md:border-none md:pt-0 md:mt-0'}`} style={{ fontFamily: '"vaccine", serif' }}>
          <p className={`whitespace-pre-line ${!isExpanded ? 'line-clamp-2' : ''}`}>{item.description}</p>
          
          {!isExpanded && (
            <button 
              onClick={() => setIsExpanded(true)}
              className="text-[#122822] text-[12px] font-bold uppercase tracking-widest underline underline-offset-4"
            >
              Read More
            </button>
          )}

          {isExpanded && (
            <>
              {item.highlights && item.highlights.length > 0 && (
                <div className="mt-4 pt-4 md:border-none border-t border-[#122822]/5">
                  <ul className="space-y-2">
                    {item.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-[#122822]/90 text-lg font-medium">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#122822]" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Meta info */}
              <div className="mt-6 pt-4 flex flex-wrap gap-4 text-sm font-bold tracking-widest text-[#122822]/60 uppercase md:border-none border-t border-[#122822]/5" style={{ fontFamily: '"vaccine", serif' }}>
                {item.altitude && (
                  <div className="flex items-center gap-1">
                    <span>Altitude: {item.altitude}</span>
                  </div>
                )}
                {item.distance && (
                  <div className="flex items-center gap-1">
                    <span className="mx-2 hidden md:inline">|</span>
                    <span>Distance: {item.distance}</span>
                  </div>
                )}
                {item.duration && (
                  <div className="flex items-center gap-1">
                    <span className="mx-2 hidden md:inline">|</span>
                    <span>Duration: {item.duration}</span>
                  </div>
                )}
              </div>

              <button 
                onClick={() => setIsExpanded(false)}
                className="mt-6 text-[#122822] text-[12px] font-bold uppercase tracking-widest underline underline-offset-4"
              >
                Read Less
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
