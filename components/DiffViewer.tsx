'use client';

import { DiffResult, formatValue } from '@/lib/jsonDiff';

interface DiffViewerProps {
  diffs: DiffResult[];
}

export default function DiffViewer({ diffs }: DiffViewerProps) {
  if (diffs.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        <div className="text-center">
          <svg 
            className="mx-auto mb-4 w-16 h-16" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
            />
          </svg>
          <p className="text-lg">No differences found</p>
          <p className="text-sm mt-1">The JSON objects are identical</p>
        </div>
      </div>
    );
  }

  const getColorClasses = (type: string) => {
    switch (type) {
      case 'added':
        return 'bg-green-100 border-l-4 border-green-500';
      case 'removed':
        return 'bg-red-100 border-l-4 border-red-500';
      case 'modified':
        return 'bg-yellow-100 border-l-4 border-yellow-500';
      default:
        return 'bg-gray-50 border-l-4 border-gray-300';
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'added':
        return (
          <span className="text-green-600 font-bold text-lg">+</span>
        );
      case 'removed':
        return (
          <span className="text-red-600 font-bold text-lg">-</span>
        );
      case 'modified':
        return (
          <span className="text-yellow-600 font-bold text-lg">~</span>
        );
      default:
        return null;
    }
  };

  const getLabel = (type: string) => {
    switch (type) {
      case 'added':
        return 'Added';
      case 'removed':
        return 'Removed';
      case 'modified':
        return 'Modified';
      default:
        return 'Unchanged';
    }
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4">
        <div className="mb-4 flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <span className="text-green-600 font-bold">+</span>
            <span className="text-gray-600">Added</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-red-600 font-bold">-</span>
            <span className="text-gray-600">Removed</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-yellow-600 font-bold">~</span>
            <span className="text-gray-600">Modified</span>
          </div>
          <div className="ml-auto text-gray-500">
            {diffs.length} {diffs.length === 1 ? 'change' : 'changes'} detected
          </div>
        </div>

        <div className="space-y-3">
          {diffs.map((diff, index) => (
            <div
              key={index}
              className={`rounded-lg p-4 ${getColorClasses(diff.type)}`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  {getIcon(diff.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-gray-500 uppercase">
                      {getLabel(diff.type)}
                    </span>
                    <code className="text-sm font-mono text-gray-800 bg-white/50 px-2 py-1 rounded">
                      {diff.path || '(root)'}
                    </code>
                  </div>

                  {diff.type === 'removed' && (
                    <div className="mt-2">
                      <div className="text-xs text-gray-600 mb-1">Old value:</div>
                      <pre className="text-sm font-mono bg-white/70 p-3 rounded overflow-x-auto">
                        {formatValue(diff.oldValue)}
                      </pre>
                    </div>
                  )}

                  {diff.type === 'added' && (
                    <div className="mt-2">
                      <div className="text-xs text-gray-600 mb-1">New value:</div>
                      <pre className="text-sm font-mono bg-white/70 p-3 rounded overflow-x-auto">
                        {formatValue(diff.newValue)}
                      </pre>
                    </div>
                  )}

                  {diff.type === 'modified' && (
                    <div className="mt-2 space-y-2">
                      <div>
                        <div className="text-xs text-gray-600 mb-1">Old value:</div>
                        <pre className="text-sm font-mono bg-white/70 p-3 rounded overflow-x-auto">
                          {formatValue(diff.oldValue)}
                        </pre>
                      </div>
                      <div>
                        <div className="text-xs text-gray-600 mb-1">New value:</div>
                        <pre className="text-sm font-mono bg-white/70 p-3 rounded overflow-x-auto">
                          {formatValue(diff.newValue)}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
