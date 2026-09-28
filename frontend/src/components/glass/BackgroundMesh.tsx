import React from 'react';

export const BackgroundMesh: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-[#F7F8F9]">
      {/* Mesh Blob 1: Soft Teal (Top Left / Center) */}
      <div
        className="absolute -top-[10%] -left-[10%] w-[55vw] h-[55vw] max-w-[850px] max-h-[850px] rounded-full bg-[#0E7C7B]/5 blur-[140px] animate-blob-drift-1"
        style={{ willChange: 'transform' }}
      />

      {/* Mesh Blob 2: Soft Emerald / Cyan (Top Right / Center) */}
      <div
        className="absolute top-[15%] -right-[15%] w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] rounded-full bg-[#17B890]/5 blur-[150px] animate-blob-drift-2"
        style={{ willChange: 'transform' }}
      />

      {/* Mesh Blob 3: Warm Subtle Amber/Slate (Bottom Left) */}
      <div
        className="absolute -bottom-[20%] left-[20%] w-[50vw] h-[50vw] max-w-[750px] max-h-[750px] rounded-full bg-[#F59E0B]/4 blur-[130px] animate-blob-drift-3"
        style={{ willChange: 'transform' }}
      />

      {/* Subtle Film Grain Noise Texture */}
      <div className="absolute inset-0 film-grain-overlay opacity-30" />
    </div>
  );
};
