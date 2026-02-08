import React from 'react';
import { Button } from './ui/button';
import { ArrowLeft, Download, FolderOpen, ToggleRight, Upload, CheckCircle } from 'lucide-react';

interface InstallGuideProps {
  onBack: () => void;
}

export function InstallGuide({ onBack }: InstallGuideProps) {
  const handleDownload = () => {
    // Simulate download - in production, this would download extension.zip
    alert('extension.zip download started');
  };

  const openExtensionsPage = () => {
    window.open('chrome://extensions', '_blank');
  };

  return (
    <div className="min-h-screen bg-white p-4 sm:p-8">
      <div className="max-w-3xl mx-auto py-6 sm:py-12">
        <Button 
          onClick={onBack}
          variant="ghost"
          className="mb-4 sm:mb-6 text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Demo
        </Button>

        <h1 className="text-xl sm:text-2xl mb-6 sm:mb-8 text-slate-900">
          <span className="text-blue-600">#</span> Extension Installation Guide
        </h1>

        <div className="space-y-6 sm:space-y-8">
          {/* Step 1 */}
          <div className="flex gap-3 sm:gap-4">
            <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm sm:text-base">
              1
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-base sm:text-lg mb-2 text-slate-900">Download Extension</h2>
              <p className="text-slate-600 text-sm mb-4">
                Click the button below to download extension.zip
              </p>
              <Button 
                onClick={handleDownload}
                className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
              >
                <Download className="w-4 h-4 mr-2" />
                Download extension.zip
              </Button>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-3 sm:gap-4">
            <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm sm:text-base">
              2
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-base sm:text-lg mb-2 text-slate-900">Extract ZIP File</h2>
              <p className="text-slate-600 text-sm">
                Unzip the downloaded file to a folder on your computer
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-3 sm:gap-4">
            <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm sm:text-base">
              3
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-base sm:text-lg mb-2 text-slate-900">Open Chrome Extensions</h2>
              <p className="text-slate-600 text-sm mb-4">
                Open the Chrome extensions management page
              </p>
              <Button 
                onClick={openExtensionsPage}
                variant="outline"
                className="w-full sm:w-auto"
              >
                Open chrome://extensions
              </Button>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex gap-3 sm:gap-4">
            <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm sm:text-base">
              4
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-base sm:text-lg mb-2 text-slate-900">Enable Developer Mode</h2>
              <p className="text-slate-600 text-sm">
                Toggle "Developer mode" switch in the top right corner
              </p>
            </div>
          </div>

          {/* Step 5 */}
          <div className="flex gap-3 sm:gap-4">
            <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm sm:text-base">
              5
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-base sm:text-lg mb-2 text-slate-900">Load Unpacked Extension</h2>
              <p className="text-slate-600 text-sm">
                Click "Load unpacked" and select the extracted folder
              </p>
            </div>
          </div>

          {/* Step 6 */}
          <div className="flex gap-3 sm:gap-4">
            <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green-600 text-white flex items-center justify-center">
              <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-base sm:text-lg mb-2 text-slate-900">Installation Complete</h2>
              <p className="text-slate-600 text-sm">
                The extension has been added. Click the extension icon in your toolbar to get started.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
