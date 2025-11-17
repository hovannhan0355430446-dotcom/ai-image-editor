import React, { useState } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import Editor from './components/Editor';
import LandingPage from './components/LandingPage';

type AppState = 'landing' | 'uploading' | 'editing';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('landing');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleGetStarted = () => {
    setAppState('uploading');
  };

  const handleImageUpload = (file: File) => {
    setImageFile(file);
    setAppState('editing');
  };

  const handleReset = () => {
    setImageFile(null);
    setAppState('uploading'); // Go back to uploader, not landing
  };

  const renderContent = () => {
    switch(appState) {
      case 'landing':
        return <LandingPage onGetStarted={handleGetStarted} />;
      case 'uploading':
        return <ImageUploader onImageUpload={handleImageUpload} />;
      case 'editing':
        if (imageFile) {
          return <Editor imageFile={imageFile} />;
        }
        // Fallback in case state is inconsistent
        setAppState('uploading');
        return null;
      default:
        return <LandingPage onGetStarted={handleGetStarted} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onReset={handleReset} showReset={appState === 'editing'} />
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 md:p-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;