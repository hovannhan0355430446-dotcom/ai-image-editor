import React from 'react';
import type { FilterState, TransformState } from '../types';
import Slider from './Slider';
import IconButton from './IconButton';
// FIX: Changed icon imports to use named exports to resolve module loading errors.
import { DownloadIcon } from './icons/DownloadIcon';
import { ResetIcon } from './icons/ResetIcon';
import { RotateCwIcon } from './icons/RotateCwIcon';
import { FlipHorizontalIcon } from './icons/FlipHorizontalIcon';
import { FlipVerticalIcon } from './icons/FlipVerticalIcon';

interface ControlPanelProps {
  filters: FilterState;
  transforms: TransformState;
  onFilterChange: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onTransformChange: <K extends keyof TransformState>(key: K, value: TransformState[K] | ((prev: TransformState[K]) => TransformState[K])) => void;
  onReset: () => void;
  onDownload: (format: 'png' | 'jpeg') => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ 
  filters, 
  transforms,
  onFilterChange,
  onTransformChange,
  onReset,
  onDownload
}) => {
  
  const handleRotate = () => {
    onTransformChange('rotate', (prev: number) => (prev + 90) % 360);
  };

  const handleFlipH = () => {
    onTransformChange('flipH', (prev: boolean) => !prev);
  };

  const handleFlipV = () => {
    onTransformChange('flipV', (prev: boolean) => !prev);
  };
  
  return (
    <div className="bg-surface rounded-lg shadow-lg p-6 space-y-6 h-full flex flex-col">
      <div className="space-y-4 flex-grow overflow-y-auto pr-2 -mr-2">
        <h3 className="text-lg font-semibold text-text-primary border-b border-gray-700 pb-2">Bộ lọc</h3>
        <Slider
          label="Độ sáng"
          value={filters.brightness}
          onChange={(e) => onFilterChange('brightness', parseInt(e.target.value))}
          min={0}
          max={200}
          defaultValue={100}
        />
        <Slider
          label="Độ tương phản"
          value={filters.contrast}
          onChange={(e) => onFilterChange('contrast', parseInt(e.target.value))}
          min={0}
          max={200}
          defaultValue={100}
        />
        <Slider
          label="Thang độ xám"
          value={filters.grayscale}
          onChange={(e) => onFilterChange('grayscale', parseInt(e.target.value))}
          min={0}
          max={100}
          defaultValue={0}
        />
        <Slider
          label="Làm mờ"
          value={filters.blur}
          onChange={(e) => onFilterChange('blur', parseInt(e.target.value))}
          min={0}
          max={20}
          defaultValue={0}
        />
        
        <h3 className="text-lg font-semibold text-text-primary border-b border-gray-700 pb-2 pt-4">Biến đổi</h3>
        <div className="grid grid-cols-3 gap-2">
          <IconButton onClick={handleRotate} label="Xoay"><RotateCwIcon/></IconButton>
          <IconButton onClick={handleFlipH} label="Lật ngang" active={transforms.flipH}><FlipHorizontalIcon /></IconButton>
          <IconButton onClick={handleFlipV} label="Lật dọc" active={transforms.flipV}><FlipVerticalIcon /></IconButton>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-700 space-y-3">
        <div className="flex items-center space-x-2">
          <IconButton onClick={onReset} label="Đặt lại tất cả" className="w-full bg-gray-600 hover:bg-gray-700">
            <ResetIcon />
            <span className="ml-2">Đặt lại</span>
          </IconButton>
        </div>
        <div className="flex items-center space-x-2">
          <IconButton onClick={() => onDownload('png')} label="Tải xuống PNG" className="w-full bg-primary hover:bg-primary-hover">
            <DownloadIcon />
            <span className="ml-2">PNG</span>
          </IconButton>
          <IconButton onClick={() => onDownload('jpeg')} label="Tải xuống JPG" className="w-full bg-primary hover:bg-primary-hover">
            <DownloadIcon />
            <span className="ml-2">JPG</span>
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;