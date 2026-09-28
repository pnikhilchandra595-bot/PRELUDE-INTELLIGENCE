import React from 'react';

export interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hasLiquidEdge?: boolean;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  className = '',
  hasLiquidEdge = false,
  ...props
}) => {
  return (
    <div
      className={`glass-panel rounded-3xl ${
        hasLiquidEdge ? 'liquid-refract-subtle' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
