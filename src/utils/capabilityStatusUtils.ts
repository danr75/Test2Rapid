// Utility for capability status and color mapping

// Mock: In real app, fetch from API, Context, or localStorage
export const capabilityStatusMap: Record<string, string> = {
  'Data & Tech Capable': 'on track',
  'Leadership & Strategy': 'on track',
  'Governance, Policy & Risk': 'needs attention',
  'Foundations & Ecosystem': 'excelling',
  'Workforce Enablement': 'on track',
  'AI Ethics & Responsibility': 'on track',
};

export const statusToColorClass: Record<string, string> = {
  'on track': 'bg-blue-600',
  'needs attention': 'bg-red-500', // Softer, more accessible red for backgrounds
  'excelling': 'bg-green-600',
  'default': 'bg-gray-400',
};

export function getCapabilityStatus(capability: string): string {
  return capabilityStatusMap[capability] || 'on track';
}

export function getStatusColorClass(status: string): string {
  return statusToColorClass[status.toLowerCase()] || statusToColorClass['default'];
}
