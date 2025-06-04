/**
 * Test topic generator service with predefined responses
 * This service provides consistent, predefined related topics based on input topics
 */

// Define a mapping of topics to their related subtopics for testing
const topicMap: Record<string, string[]> = {
  // Main topics
  'javascript': ['JavaScript Variables', 'JavaScript Functions'],
  'python': ['Python Syntax', 'Python Libraries'],
  'machine learning': ['Supervised Learning', 'Neural Networks'],
  'web development': ['Frontend Basics', 'Backend Development'],
  'data science': ['Data Visualization', 'Statistical Analysis'],
  
  // Subtopics level 1
  'javascript variables': ['Variable Scope', 'Data Types'],
  'javascript functions': ['Arrow Functions', 'Function Parameters'],
  'python syntax': ['Python Indentation', 'Python Data Structures'],
  'python libraries': ['NumPy', 'Pandas'],
  'supervised learning': ['Classification', 'Regression'],
  'neural networks': ['Deep Learning', 'Convolutional Networks'],
  'frontend basics': ['HTML', 'CSS'],
  'backend development': ['Node.js', 'Databases'],
  'data visualization': ['Charts', 'Dashboards'],
  'statistical analysis': ['Hypothesis Testing', 'Regression Analysis'],
  
  // Subtopics level 2 (a few examples)
  'variable scope': ['Global Scope', 'Block Scope'],
  'data types': ['Primitive Types', 'Reference Types'],
  'arrow functions': ['Syntax Benefits', 'Lexical This'],
  'html': ['HTML5 Features', 'Semantic HTML'],
  'css': ['CSS Flexbox', 'CSS Grid'],
  'node.js': ['Express Framework', 'NPM'],
  'databases': ['SQL', 'NoSQL'],
  
  // Default fallback topics for any unrecognized input
  'default': ['History', 'Applications']
};

const topicGenerator = {
  /**
   * Generate related topics based on a given topic
   * @param topic The main topic to generate related topics for
   * @returns An array of related topics
   */
  generateRelatedTopics: async (topic: string): Promise<string[]> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Convert to lowercase for case-insensitive matching
    const normalizedTopic = topic.toLowerCase();
    
    // Return predefined subtopics if they exist, otherwise return default topics
    return topicMap[normalizedTopic] || topicMap['default'];
  }
};

export default topicGenerator;
