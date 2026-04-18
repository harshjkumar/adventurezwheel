'use client';

import type { ReactNode } from 'react';

type SectionHeadingProps = {
  title: string;
  titleClassName?: string;
  actions?: ReactNode;
};

export function SectionHeading({ title, titleClassName = '', actions }: SectionHeadingProps) {
  return (
    <div className="mb-10 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
      <h2 className={titleClassName}>{title}</h2>
      {actions ? <div className="flex items-center gap-4 self-end">{actions}</div> : null}
    </div>
  );
}