export interface Sample {
  id: string;
  name: string;
  description: string;
  file1: string;
  file2: string;
}

export const samples: Sample[] = [
  {
    id: 'user-profile',
    name: 'User Profile Update',
    description: 'Personal info changes, nested objects, array modifications',
    file1: '/samples/user-profile-before.json',
    file2: '/samples/user-profile-after.json',
  },
  {
    id: 'config',
    name: 'Config: Development → Production',
    description: 'Environment-specific configurations and settings',
    file1: '/samples/config-development.json',
    file2: '/samples/config-production.json',
  },
  {
    id: 'api',
    name: 'API Response: v1 → v2',
    description: 'API versioning, field additions, breaking changes',
    file1: '/samples/api-response-v1.json',
    file2: '/samples/api-response-v2.json',
  },
  {
    id: 'array',
    name: 'Array Modifications',
    description: 'Array element changes, additions, and removals',
    file1: '/samples/array-simple-before.json',
    file2: '/samples/array-simple-after.json',
  },
];

export async function loadSample(sampleId: string): Promise<{ json1: string; json2: string } | null> {
  const sample = samples.find(s => s.id === sampleId);
  if (!sample) return null;

  try {
    const [response1, response2] = await Promise.all([
      fetch(sample.file1),
      fetch(sample.file2),
    ]);

    if (!response1.ok || !response2.ok) {
      throw new Error('Failed to load sample files');
    }

    const [data1, data2] = await Promise.all([
      response1.json(),
      response2.json(),
    ]);

    return {
      json1: JSON.stringify(data1, null, 2),
      json2: JSON.stringify(data2, null, 2),
    };
  } catch (error) {
    console.error('Error loading sample:', error);
    return null;
  }
}
