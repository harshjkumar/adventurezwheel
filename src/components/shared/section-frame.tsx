'use client';

import type { HTMLAttributes, ReactNode } from 'react';
import type { MotionProps } from 'framer-motion';
import { motion } from 'framer-motion';

type SectionFrameProps = HTMLAttributes<HTMLElement> &
  MotionProps & {
    children: ReactNode;
    innerClassName?: string;
  };

export function SectionFrame({ children, className = '', innerClassName = '', ...props }: SectionFrameProps) {
  return (
    <motion.section {...props} className={className}>
      <div className={`mx-auto max-w-[1440px] ${innerClassName}`.trim()}>{children}</div>
    </motion.section>
  );
}