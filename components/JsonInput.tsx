'use client';

import { useState, ChangeEvent } from 'react';

interface JsonInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
}

export default function JsonInput({ 
  label, 
  value, 
  onChange, 
  placeholder,
  error 
}: JsonInputProps) {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(value);
      onChange(JSON.stringify(parsed, null, 2));
    } catch (err) {
      // If invalid JSON, don't format
    }
  };

  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="flex flex-col h-full">
      {label && (
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-semibold text-gray-700">{label}</label>
          <div className="flex gap-2">
            <button
              onClick={handleFormat}
              className="text-xs px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              type="button"
            >
              Format
            </button>
            <button
              onClick={handleClear}
              className="text-xs px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500 transition-colors"
              type="button"
            >
              Clear
            </button>
          </div>
        </div>
      )}
      {!label && (
        <div className="flex justify-end gap-2 mb-2">
          <button
            onClick={handleFormat}
            className="text-xs px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            type="button"
          >
            Format
          </button>
          <button
            onClick={handleClear}
            className="text-xs px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500 transition-colors"
            type="button"
          >
            Clear
          </button>
        </div>
      )}
      <textarea
        value={value}
        onChange={handleChange}
        placeholder={placeholder || 'Paste your JSON here...'}
        className={`flex-1 w-full p-4 font-mono text-sm border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
          error ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'
        }`}
        spellCheck={false}
      />
      {error && (
        <div className="mt-2 text-xs text-red-600 font-medium">{error}</div>
      )}
    </div>
  );
}
