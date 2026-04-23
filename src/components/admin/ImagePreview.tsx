'use client';

import { useState } from 'react';

interface ImagePreviewProps {
  url: string;
  maxWidth?: number;
  maxHeight?: number;
  className?: string;
}

export function ImagePreview({ url, maxWidth = 300, maxHeight = 200, className = '' }: ImagePreviewProps) {
  const [error, setError] = useState(false);

  if (!url || error) return null;

  return (
    <div className={`mt-2 ${className}`}>
      <img
        src={url}
        alt="Preview"
        onError={() => setError(true)}
        onLoad={() => setError(false)}
        style={{ maxWidth, maxHeight, objectFit: 'cover' }}
        className="rounded-lg border border-gray-200 shadow-sm"
      />
    </div>
  );
}
