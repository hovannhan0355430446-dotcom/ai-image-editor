import React, { useCallback, useState } from 'react';
// FIX: Switched to a named import for consistency.
import { UploadIcon } from './icons/UploadIcon';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onImageUpload(event.target.files[0]);
    }
  };

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      onImageUpload(event.dataTransfer.files[0]);
    }
  }, [onImageUpload]);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  
  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  return (
    <div className="text-center w-full max-w-2xl">
      <div
        className={`relative border-2 border-dashed rounded-lg p-12 transition-colors duration-300 ${isDragging ? 'border-primary bg-secondary' : 'border-gray-600 hover:border-primary'}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onClick={() => inputRef.current?.click()}
      >
        <input
          type="file"
          ref={inputRef}
          onChange={handleFileChange}
          accept="image/png, image/jpeg, image/webp"
          className="hidden"
        />
        <div className="flex flex-col items-center justify-center space-y-4 text-text-secondary">
          <UploadIcon className="w-16 h-16 text-gray-500" />
          <p className="text-xl font-semibold">
            <span className="text-primary">Nhấn để tải lên</span> hoặc kéo và thả
          </p>
          <p>PNG, JPG, hoặc WEBP</p>
        </div>
      </div>
      <p className="mt-6 text-sm text-gray-400">Chào mừng bạn đến với Trình chỉnh sửa ảnh AI. Bắt đầu bằng cách tải lên hình ảnh của bạn.</p>
    </div>
  );
};

export default ImageUploader;