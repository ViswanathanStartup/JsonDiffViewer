'use client';

import { useRef } from 'react';

interface FileUploadButtonProps {
  onFileLoad: (content: string) => void;
  label: string;
  className?: string;
  disabled?: boolean;
}

export default function FileUploadButton({ onFileLoad, label, className = '', disabled = false }: FileUploadButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.name.endsWith('.json')) {
      alert('Please upload a JSON file');
      return;
    }

    try {
      const text = await file.text();
      // Validate JSON
      JSON.parse(text);
      onFileLoad(text);
    } catch (error) {
      alert('Invalid JSON file. Please check the file format.');
    }

    // Reset input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json,application/json"
        onChange={handleFileChange}
        className="hidden"
        aria-label={label}
        disabled={disabled}
      />
      <button
        onClick={handleClick}
        className={className}
        type="button"
        disabled={disabled}
      >
        {label}
      </button>
    </>
  );
}
