'use client';

import { useState, useCallback } from 'react';
import JsonInput from '@/components/JsonInput';
import DiffViewer from '@/components/DiffViewer';
import FileUploadButton from '@/components/FileUploadButton';
import SampleSelector from '@/components/SampleSelector';
import { deepDiff, DiffResult } from '@/lib/jsonDiff';

export default function Home() {
  const [json1, setJson1] = useState('');
  const [json2, setJson2] = useState('');
  const [error1, setError1] = useState('');
  const [error2, setError2] = useState('');
  const [diffs, setDiffs] = useState<DiffResult[]>([]);
  const [showDiff, setShowDiff] = useState(false);

  const validateAndParse = (jsonString: string): { valid: boolean; data?: any; error?: string } => {
    if (!jsonString.trim()) {
      return { valid: false, error: 'JSON cannot be empty' };
    }
    try {
      const data = JSON.parse(jsonString);
      return { valid: true, data };
    } catch (err) {
      return { valid: false, error: 'Invalid JSON format' };
    }
  };

  const handleCompare = useCallback(() => {
    setError1('');
    setError2('');
    setShowDiff(false);

    const result1 = validateAndParse(json1);
    const result2 = validateAndParse(json2);

    if (!result1.valid) {
      setError1(result1.error || 'Invalid JSON');
      return;
    }

    if (!result2.valid) {
      setError2(result2.error || 'Invalid JSON');
      return;
    }

    const differences = deepDiff(result1.data, result2.data);
    setDiffs(differences);
    setShowDiff(true);
  }, [json1, json2]);

  const handleSwap = () => {
    const temp = json1;
    setJson1(json2);
    setJson2(temp);
    setShowDiff(false);
    setError1('');
    setError2('');
  };

  const handleReset = () => {
    setJson1('');
    setJson2('');
    setError1('');
    setError2('');
    setDiffs([]);
    setShowDiff(false);
  };

  const handleSampleLoad = (json1: string, json2: string) => {
    setJson1(json1);
    setJson2(json2);
    setShowDiff(false);
    setError1('');
    setError2('');
  };

  const handleFileUpload1 = (content: string) => {
    setJson1(content);
    setError1('');
    setShowDiff(false);
  };

  const handleFileUpload2 = (content: string) => {
    setJson2(content);
    setError2('');
    setShowDiff(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            JSON Diff Viewer
          </h1>
          <p className="text-gray-600">
            Compare JSON objects and visualize differences instantly
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-6 flex-wrap">
          <button
            onClick={handleCompare}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
          >
            🔍 Compare JSONs
          </button>
          <button
            onClick={handleSwap}
            disabled={!json1.trim() || !json2.trim()}
            className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-purple-600"
          >
            ⇄ Swap
          </button>
          <SampleSelector onSampleLoad={handleSampleLoad} />
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors shadow-md hover:shadow-lg"
          >
            🔄 Reset All
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* JSON Input 1 */}
          <div className="bg-white rounded-xl shadow-lg p-6 h-[500px]">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-700">JSON Object 1</h3>
              <FileUploadButton
                onFileLoad={handleFileUpload1}
                label="📤 Upload"
                className="text-xs px-3 py-1.5 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={json1.trim().length > 0}
              />
            </div>
            <div className="h-[calc(100%-2.5rem)]">
              <JsonInput
                label=""
                value={json1}
                onChange={setJson1}
                error={error1}
                placeholder="Paste your first JSON object here or upload a file..."
              />
            </div>
          </div>

          {/* JSON Input 2 */}
          <div className="bg-white rounded-xl shadow-lg p-6 h-[500px]">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-700">JSON Object 2</h3>
              <FileUploadButton
                onFileLoad={handleFileUpload2}
                label="📤 Upload"
                className="text-xs px-3 py-1.5 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={json2.trim().length > 0}
              />
            </div>
            <div className="h-[calc(100%-2.5rem)]">
              <JsonInput
                label=""
                value={json2}
                onChange={setJson2}
                error={error2}
                placeholder="Paste your second JSON object here or upload a file..."
              />
            </div>
          </div>
        </div>

        {/* Diff Results */}
        {showDiff && (
          <div className="bg-white rounded-xl shadow-lg p-6 min-h-[300px]">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Differences
            </h2>
            <DiffViewer diffs={diffs} />
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>Built for debugging API changes • No data stored • 100% client-side</p>
          <p className="mt-2">Built by <a href="https://ainternals.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-medium">AInternals.com</a> - 2025 for the tech community</p>
        </div>
      </div>
    </main>
  );
}
