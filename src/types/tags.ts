type TagGroup = {
  id: string;
  name: string;
  color: string;
};

type Tag = {
  id: string;
  name: string;
  groupId: string;
};

const tagGroups: TagGroup[] = [
  {
    id: 'foundations',
    name: 'Foundations & Ecosystem',
    color: 'blue',
  },
  {
    id: 'leadership',
    name: 'Leadership & Strategy',
    color: 'green',
  },
  {
    id: 'governance',
    name: 'Governance, Policy & Risk',
    color: 'purple',
  },
  {
    id: 'dataTech',
    name: 'Data and Tech Capable',
    color: 'indigo',
  },
  {
    id: 'workforce',
    name: 'Workforce Enablement',
    color: 'teal',
  },
];

const tags: Tag[] = [
  // Foundations & Ecosystem
  { id: 'ai-foundations', name: 'AI Foundations', groupId: 'foundations' },
  { id: 'ai-ecosystem', name: 'AI Ecosystem Awareness', groupId: 'foundations' },
  { id: 'collaboration', name: 'Cross-functional Collaboration', groupId: 'foundations' },
  
  // Leadership & Strategy
  { id: 'ai-strategy', name: 'AI Strategy & Use Cases', groupId: 'leadership' },
  { id: 'commercial-decisions', name: 'Commercial & Investment Decisions', groupId: 'leadership' },
  { id: 'stakeholder-alignment', name: 'Communication & Stakeholder Alignment', groupId: 'leadership' },
  
  // Governance, Policy & Risk
  { id: 'legal-regulatory', name: 'Legal & Regulatory Awareness', groupId: 'governance' },
  { id: 'ai-policy', name: 'AI Policy Development', groupId: 'governance' },
  { id: 'governance-assurance', name: 'Governance & Assurance', groupId: 'governance' },
  { id: 'risk-management', name: 'AI Risk Management', groupId: 'governance' },
  { id: 'human-oversight', name: 'Human Oversight & Escalation', groupId: 'governance' },
  { id: 'ai-ethics', name: 'AI Ethics & Social Impact', groupId: 'governance' },
  { id: 'responsible-procurement', name: 'Responsible AI Procurement', groupId: 'governance' },
  
  // Data and Tech Capable
  { id: 'ai-lifecycle', name: 'AI Lifecycle Management', groupId: 'dataTech' },
  { id: 'measurement', name: 'Measurement & Impact Evaluation', groupId: 'dataTech' },
  { id: 'data-readiness', name: 'Data & Technology Readiness', groupId: 'dataTech' },
  
  // Workforce Enablement
  { id: 'change-management', name: 'Change Management & Adoption', groupId: 'workforce' },
  { id: 'workforce-planning', name: 'Workforce Planning & Skills', groupId: 'workforce' },
  { id: 'partnerships', name: 'Partnerships & Collaboration', groupId: 'workforce' },
  { id: 'best-practices', name: 'Guidelines & Best Practice', groupId: 'workforce' },
];

export const getTagById = (id: string) => tags.find(tag => tag.id === id);
export const getGroupById = (id: string) => tagGroups.find(group => group.id === id);
export const getTagsByGroup = (groupId: string) => tags.filter(tag => tag.groupId === groupId);

export type { Tag, TagGroup };

export default {
  tagGroups,
  tags,
  getTagById,
  getGroupById,
  getTagsByGroup,
};
