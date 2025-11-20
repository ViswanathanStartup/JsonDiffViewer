export type DiffType = 'added' | 'removed' | 'modified' | 'unchanged';

export interface DiffResult {
  path: string;
  type: DiffType;
  oldValue?: any;
  newValue?: any;
}

function getType(value: any): string {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  return typeof value;
}

function comparePrimitives(oldVal: any, newVal: any): boolean {
  if (oldVal === newVal) return true;
  if (typeof oldVal === 'number' && typeof newVal === 'number') {
    return isNaN(oldVal) && isNaN(newVal);
  }
  return false;
}

export function deepDiff(
  obj1: any,
  obj2: any,
  path: string = ''
): DiffResult[] {
  const results: DiffResult[] = [];

  const type1 = getType(obj1);
  const type2 = getType(obj2);

  // If types are different
  if (type1 !== type2) {
    if (obj1 === undefined) {
      results.push({ path, type: 'added', newValue: obj2 });
    } else if (obj2 === undefined) {
      results.push({ path, type: 'removed', oldValue: obj1 });
    } else {
      results.push({ path, type: 'modified', oldValue: obj1, newValue: obj2 });
    }
    return results;
  }

  // Both are primitives or null
  if (type1 !== 'object' && type1 !== 'array') {
    if (!comparePrimitives(obj1, obj2)) {
      results.push({ path, type: 'modified', oldValue: obj1, newValue: obj2 });
    }
    return results;
  }

  // Both are arrays
  if (type1 === 'array') {
    const maxLength = Math.max(obj1.length, obj2.length);
    for (let i = 0; i < maxLength; i++) {
      const newPath = `${path}[${i}]`;
      if (i >= obj1.length) {
        results.push({ path: newPath, type: 'added', newValue: obj2[i] });
      } else if (i >= obj2.length) {
        results.push({ path: newPath, type: 'removed', oldValue: obj1[i] });
      } else {
        results.push(...deepDiff(obj1[i], obj2[i], newPath));
      }
    }
    return results;
  }

  // Both are objects
  const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);
  
  allKeys.forEach((key) => {
    const newPath = path ? `${path}.${key}` : key;
    const hasKey1 = obj1.hasOwnProperty(key);
    const hasKey2 = obj2.hasOwnProperty(key);

    if (!hasKey1 && hasKey2) {
      results.push({ path: newPath, type: 'added', newValue: obj2[key] });
    } else if (hasKey1 && !hasKey2) {
      results.push({ path: newPath, type: 'removed', oldValue: obj1[key] });
    } else {
      results.push(...deepDiff(obj1[key], obj2[key], newPath));
    }
  });

  return results;
}

export function formatValue(value: any): string {
  if (value === undefined) return 'undefined';
  if (value === null) return 'null';
  if (typeof value === 'string') return `"${value}"`;
  if (typeof value === 'object') return JSON.stringify(value, null, 2);
  return String(value);
}
