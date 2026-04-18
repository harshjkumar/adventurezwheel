"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronDown, MapPin, Clock, Mountain } from "lucide-react";
import { ItineraryDay } from "@/types/trip";

// Helper to extract and format route from description
const parseDescription = (description: string) => {
  const firstPeriodIndex = description.indexOf(".");
  if (firstPeriodIndex === -1) {
    return { route: description, rest: "" };
  }
  
  const routePart = description.substring(0, firstPeriodIndex).trim();
  const restPart = description.substring(firstPeriodIndex).trim();
  
  return { route: routePart, rest: restPart };
};

// Check if a sentence looks like a route line (place names separated by dashes)
const isRouteLine = (text: string): boolean => {
  // Route lines have multiple segments separated by – or - (e.g. "Leh – South Pullu – Khardung La")
  const dashSegments = text.split(/\s*[–\-]\s*/);
  return dashSegments.length >= 3;
};

// Parse description to separate the bold route line from the rest
const parseDescriptionWithRoute = (description: string): { routeLine: string | null; rest: string } => {
  const firstPeriodIndex = description.indexOf(".");
  if (firstPeriodIndex === -1) {
    return isRouteLine(description)
      ? { routeLine: description, rest: "" }
      : { routeLine: null, rest: description };
  }

  const firstSentence = description.substring(0, firstPeriodIndex).trim();
  const remaining = description.substring(firstPeriodIndex + 1).trim();

  if (isRouteLine(firstSentence)) {
    return { routeLine: firstSentence + ".", rest: remaining };
  }

  return { routeLine: null, rest: description };
};

const parseProTip = (text: string): { body: string; tip: string | null } => {
  const match = text.match(/💡\s*Pro\s*Tip\s*by\s*K2K\s*:\s*/i);
  if (!match || match.index === undefined) {
    return { body: text.trim(), tip: null };
  }

  const body = text.slice(0, match.index).trim();
  const tip = text.slice(match.index + match[0].length).trim();
  return { body, tip: tip || null };
};

const DayItem = ({ item, isFirst }: { item: ItineraryDay; isFirst: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isOpen, setIsOpen] = useState(isFirst && !item.isRoute); // Routes start collapsed

  useEffect(() => {
    if (isInView) {
      if (!item.isRoute) {
        setIsOpen(true);
      }
    }
  }, [isInView, item.isRoute]);

  // For route-only items, extract the route
  const { route, rest } = item.isRoute ? parseDescription(item.description) : { route: "", rest: "" };
  const routeTipParsed = parseProTip(rest);

  // Route items show only the bold route line in header, description in expanded
  if (item.isRoute) {
    return (
      <motion.div 
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        className="border border-charcoal/10 rounded-lg overflow-hidden bg-white shadow-sm"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-5 text-left hover:bg-charcoal/5 transition-colors"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 flex-1">
            <span className="font-nav text-sm font-bold uppercase tracking-widest text-accent whitespace-nowrap">
              Day {String(item.day).padStart(2, "0")}
            </span>
            <p className="text-charcoal font-bold text-base md:text-lg flex-1">{route}</p>
          </div>
          <ChevronDown 
            size={20} 
            className={`text-charcoal/50 transition-transform duration-300 flex-shrink-0 ${isOpen ? "rotate-180" : ""}`} 
          />
        </button>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-5 pt-0 text-charcoal/70 border-t border-charcoal/5 bg-charcoal/5 leading-relaxed text-sm md:text-base">
                <p className="mb-4 font-semibold text-charcoal">{item.title}</p>
                {routeTipParsed.body && <p className="mb-4">{routeTipParsed.body}</p>}
                {routeTipParsed.tip && (
                  <div className="mb-4 p-3 bg-accent/10 border-l-4 border-accent rounded">
                    <p className="text-charcoal/90">
                      <span className="font-semibold text-accent">Pro Tip by K2K:</span> {routeTipParsed.tip}
                    </p>
                  </div>
                )}
                
                <div className="flex flex-wrap gap-4 text-xs font-nav text-charcoal/60 mt-4">
                  {item.altitude && (
                    <div className="flex items-center gap-1">
                      <Mountain size={14} /> <span>Altitude: {item.altitude}</span>
                    </div>
                  )}
                  {item.distance && (
                    <div className="flex items-center gap-1">
                      <MapPin size={14} /> <span>Distance: {item.distance}</span>
                    </div>
                  )}
                  {item.overnight && (
                    <div className="flex items-center gap-1">
                      <Clock size={14} /> <span>Overnight: {item.overnight}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  // Regular itinerary items (non-route)
  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="border border-charcoal/10 rounded-lg overflow-hidden bg-white shadow-sm"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-charcoal/5 transition-colors"
      >
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
          <span className="font-nav text-sm font-bold uppercase tracking-widest text-accent whitespace-nowrap">
            Day {String(item.day).padStart(2, "0")}
          </span>
          <span className="text-charcoal font-medium font-serif text-xl md:text-2xl">{item.title}</span>
        </div>
        <ChevronDown 
          size={20} 
          className={`text-charcoal/50 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} 
        />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-5 pt-0 text-charcoal/70 border-t border-charcoal/5 bg-charcoal/5 leading-relaxed text-sm md:text-base">
              {(() => {
                const { routeLine, rest } = parseDescriptionWithRoute(item.description);
                const tipParsed = parseProTip(rest);
                return (
                  <div className="mb-4">
                    {routeLine && <p className="text-charcoal font-bold mb-2">{routeLine}</p>}
                    {tipParsed.body && <p>{tipParsed.body}</p>}
                    {tipParsed.tip && (
                      <div className="mt-3 p-3 bg-accent/10 border-l-4 border-accent rounded">
                        <p className="text-charcoal/90">
                          <span className="font-semibold text-accent">Pro Tip by K2K:</span> {tipParsed.tip}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })()}
              
              <div className="flex flex-wrap gap-4 text-xs font-nav text-charcoal/60 mt-4">
                {item.altitude && (
                  <div className="flex items-center gap-1">
                    <Mountain size={14} /> <span>Altitude: {item.altitude}</span>
                  </div>
                )}
                {item.distance && (
                  <div className="flex items-center gap-1">
                    <MapPin size={14} /> <span>Distance: {item.distance}</span>
                  </div>
                )}
                {item.overnight && (
                  <div className="flex items-center gap-1">
                    <Clock size={14} /> <span>Overnight: {item.overnight}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

interface TripItineraryProps {
  itinerary: ItineraryDay[];
}

export const TripItinerary = ({ itinerary }: TripItineraryProps) => {
  return (
    <div className="space-y-4">
      {itinerary.map((item, idx) => (
        <DayItem key={item.day} item={item} isFirst={idx === 0} />
      ))}
    </div>
  );
};
