
import React from 'react';
import { useImageEditor } from '../hooks/useImageEditor';
import ControlPanel from './ControlPanel';

interface EditorProps {
  imageFile: File;
}

const Editor: React.FC<EditorProps> = ({ imageFile }) => {
  const { 
    canvasRef, 
    isProcessing,
    filters,
    transforms,
    updateFilter,
    updateTransform,
    reset,
    downloadImage,
   } = useImageEditor(imageFile);

  return (
    <div className="w-full h-full flex flex-col lg:flex-row gap-8 pt-16">
      <div className="flex-grow flex items-center justify-center bg-black bg-opacity-20 rounded-lg p-4 relative min-h-[40vh] lg:min-h-0">
        {isProcessing && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
          </div>
        )}
        <canvas ref={canvasRef} className="max-w-full max-h-full object-contain" />
      </div>
      <div className="w-full lg:w-80 xl:w-96 flex-shrink-0">
        <ControlPanel 
          filters={filters}
          transforms={transforms}
          onFilterChange={updateFilter}
          onTransformChange={updateTransform}
          onReset={reset}
          onDownload={downloadImage}
        />
      </div>
    </div>
  );
};

export default Editor;
   