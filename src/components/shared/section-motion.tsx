'use client';

import type { HTMLAttributes, ReactNode } from 'react';
import { motion, type MotionProps } from 'framer-motion';

type SectionMotionProps = HTMLAttributes<HTMLDivElement> &
  MotionProps & {
    children: ReactNode;
  };

export function SectionMotion({ children, className = '', ...props }: SectionMotionProps) {
  return (
    <motion.div {...props} className={className}>
      {children}
    </motion.div>
  );
}