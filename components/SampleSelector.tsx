'use client';

import { useState, useRef, useEffect } from 'react';
import { samples, loadSample } from '@/lib/samples';

interface SampleSelectorProps {
  onSampleLoad: (json1: string, json2: string) => void;
}

export default function SampleSelector({ onSampleLoad }: SampleSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSampleSelect = async (sampleId: string) => {
    setLoading(true);
    setIsOpen(false);

    const result = await loadSample(sampleId);
    if (result) {
      onSampleLoad(result.json1, result.json2);
    } else {
      alert('Failed to load sample. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={loading}
        className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        type="button"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading...
          </>
        ) : (
          <>
            📂 Load Sample
            <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 left-0 bg-white rounded-lg shadow-xl border border-gray-200 z-50 min-w-[320px] max-w-[400px]">
          <div className="p-3 border-b border-gray-200 bg-gray-50 rounded-t-lg">
            <h3 className="font-semibold text-gray-700 text-sm">Choose a Sample</h3>
          </div>
          <div className="max-h-[400px] overflow-y-auto">
            {samples.map((sample) => (
              <button
                key={sample.id}
                onClick={() => handleSampleSelect(sample.id)}
                className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0"
                type="button"
              >
                <div className="font-medium text-gray-800 mb-1">{sample.name}</div>
                <div className="text-xs text-gray-600">{sample.description}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
