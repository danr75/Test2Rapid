import React from 'react';
import { getCapabilityStatus, getStatusColorClass } from '@/utils/capabilityStatusUtils';

interface PathwayHeadingProps {
  capability: string;
  title: string;
  description: string;
}

const PathwayHeading: React.FC<PathwayHeadingProps> = ({ capability, title, description }) => {
  const status = getCapabilityStatus(capability);
  const colorClass = getStatusColorClass(status);

  return (
    <div className={`${colorClass} text-white rounded-lg p-6 mb-8 w-full`}>
      <h1 className="text-3xl font-bold mb-2 text-white">{title}</h1>
      <p className="text-white">{description}</p>
    </div>
  );
};

export default PathwayHeading;
