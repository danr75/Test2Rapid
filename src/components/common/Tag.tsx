import React from 'react';
import tagsData, { Tag as TagType } from '@/types/tags';

const { getGroupById, getTagById } = tagsData;

type TagProps = {
  tag: TagType | string; // Can be a tag object or tag ID
  onClick?: (tag: TagType) => void;
  className?: string;
  showGroupColor?: boolean;
};

type ColorKey = 'blue' | 'green' | 'purple' | 'indigo' | 'teal';

const colorMap: Record<ColorKey, string> = {
  blue: 'bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200',
  green: 'bg-green-50 text-green-700 hover:bg-green-100 border-green-200',
  purple: 'bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200',
  indigo: 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-indigo-200',
  teal: 'bg-teal-50 text-teal-700 hover:bg-teal-100 border-teal-200',
};

const Tag: React.FC<TagProps> = ({ 
  tag: tagProp, 
  onClick, 
  className = '',
  showGroupColor = true 
}) => {
  // If tag is a string, treat it as an ID and look up the tag
  const tag = typeof tagProp === 'string' ? getTagById(tagProp) : tagProp;
  const group = tag ? getGroupById(tag.groupId) : null;
  
  if (!tag) return null;

  const colorClass = group && showGroupColor ? colorMap[group.color as ColorKey] : colorMap.blue;
  const clickableClass = onClick ? 'cursor-pointer' : '';

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${colorClass} ${clickableClass} ${className}`}
      onClick={() => onClick?.(tag)}
    >
      {tag.name}
    </span>
  );
};

export default Tag;
