import React from 'react';
import tagsData, { TagGroup as TagGroupType } from '@/types/tags';
import Tag from './Tag';

type TagGroupProps = {
  groupId?: string; // If not provided, shows all tags
  onTagClick?: (tag: any) => void;
  className?: string;
  tagClassName?: string;
  showGroupTitles?: boolean;
};

const TagGroup: React.FC<TagGroupProps> = ({
  groupId,
  onTagClick,
  className = '',
  tagClassName = '',
  showGroupTitles = false,
}) => {
  const { tagGroups, getTagsByGroup } = tagsData;
  const groupsToRender = groupId 
    ? tagGroups.filter((group: TagGroupType) => group.id === groupId)
    : tagGroups;

  return (
    <div className={`space-y-4 ${className}`}>
      {groupsToRender.map((group) => {
        const groupTags = getTagsByGroup(group.id);
        
        if (groupTags.length === 0) return null;
        
        return (
          <div key={group.id} className="space-y-2">
            {showGroupTitles && (
              <h3 className="text-sm font-medium text-gray-500">{group.name}</h3>
            )}
            <div className="flex flex-wrap gap-2">
              {groupTags.map((tag) => (
                <Tag 
                  key={tag.id} 
                  tag={tag} 
                  onClick={onTagClick}
                  className={tagClassName}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TagGroup;
