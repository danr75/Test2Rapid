// This is a placeholder service for generating questions
/**
 * Mock AI-powered question generator service
 * This service generates multiple-choice questions based on a given topic
 */

// Define the Question interface
export interface Question {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}

// Mock questions for "How to Choose the Correct LLM"
const llmQuestions: Question[] = [
  {
    id: 'q1',
    text: 'What is the most important factor to consider when choosing an LLM for a specific task?',
    options: [
      { id: 'q1-a', text: 'The size of the model (number of parameters)', isCorrect: false },
      { id: 'q1-b', text: 'The specific capabilities and performance on relevant benchmarks', isCorrect: true },
      { id: 'q1-c', text: 'How recently it was released', isCorrect: false },
    ],
    explanation: 'While model size and recency can be factors, the specific capabilities and performance on relevant benchmarks are most critical for determining if an LLM is suitable for your particular use case.'
  },
  {
    id: 'q2',
    text: 'Which of the following is a valid consideration for computational efficiency when choosing an LLM?',
    options: [
      { id: 'q2-a', text: 'Larger models are always more efficient', isCorrect: false },
      { id: 'q2-b', text: 'Quantized models can reduce resource requirements while maintaining performance', isCorrect: true },
      { id: 'q2-c', text: 'Computational efficiency is not important when selecting an LLM', isCorrect: false },
    ],
    explanation: 'Quantization reduces the precision of the model weights, which can significantly reduce memory usage and inference time while maintaining acceptable performance for many applications.'
  },
  {
    id: 'q3',
    text: 'What is "context length" in relation to LLMs?',
    options: [
      { id: 'q3-a', text: 'The number of training examples used', isCorrect: false },
      { id: 'q3-b', text: 'The maximum number of tokens the model can process in a single prompt', isCorrect: true },
      { id: 'q3-c', text: 'The time it takes to generate a response', isCorrect: false },
    ],
    explanation: 'Context length refers to the maximum number of tokens (words or word pieces) that an LLM can process in a single prompt, which is crucial for applications requiring analysis of lengthy documents or maintaining conversation history.'
  },
  {
    id: 'q4',
    text: 'Which deployment option would be most suitable for applications with strict data privacy requirements?',
    options: [
      { id: 'q4-a', text: 'Cloud-based API services', isCorrect: false },
      { id: 'q4-b', text: 'Open-source models deployed on-premises', isCorrect: true },
      { id: 'q4-c', text: 'Hybrid cloud solutions without data controls', isCorrect: false },
    ],
    explanation: 'For strict data privacy requirements, on-premises deployment of open-source models ensures that sensitive data never leaves your infrastructure, giving you complete control over data handling.'
  },
  {
    id: 'q5',
    text: 'What is fine-tuning in the context of LLMs?',
    options: [
      { id: 'q5-a', text: 'Adjusting the hardware for optimal performance', isCorrect: false },
      { id: 'q5-b', text: 'Further training a pre-trained model on a specific dataset', isCorrect: true },
      { id: 'q5-c', text: 'Reducing the model size through compression', isCorrect: false },
    ],
    explanation: 'Fine-tuning involves additional training of a pre-trained model on a specific dataset to adapt it to particular domains, tasks, or styles, improving its performance for specific applications.'
  },
  {
    id: 'q6',
    text: 'Which factor is most important when considering the cost of using an LLM?',
    options: [
      { id: 'q6-a', text: 'Only the initial purchase price', isCorrect: false },
      { id: 'q6-b', text: 'Total cost including API calls and compute resources', isCorrect: true },
      { id: 'q6-c', text: 'The popularity of the model', isCorrect: false },
    ],
    explanation: 'The total cost of using an LLM includes not just licensing or API fees, but also compute resources, maintenance, potential fine-tuning costs, and scaling considerations as usage increases.'
  },
  {
    id: 'q7',
    text: 'What is a key consideration when evaluating an LLM for bias and fairness?',
    options: [
      { id: 'q7-a', text: 'Only the size of the training dataset matters', isCorrect: false },
      { id: 'q7-b', text: 'Testing with diverse inputs and analyzing outputs for bias', isCorrect: true },
      { id: 'q7-c', text: 'Newer models are automatically less biased', isCorrect: false },
    ],
    explanation: 'Evaluating LLMs for bias requires systematic testing with diverse inputs and careful analysis of outputs to identify patterns of unfair or prejudiced responses across different demographic groups or topics.'
  },
  {
    id: 'q8',
    text: 'Which of the following is true about specialized vs. general-purpose LLMs?',
    options: [
      { id: 'q8-a', text: 'General-purpose models always outperform specialized models', isCorrect: false },
      { id: 'q8-b', text: 'Specialized models can outperform larger general-purpose models on specific domains', isCorrect: true },
      { id: 'q8-c', text: 'There is no difference in performance between them', isCorrect: false },
    ],
    explanation: 'Specialized models trained or fine-tuned on domain-specific data often outperform larger general-purpose models on tasks within their domain of specialization, despite having fewer parameters.'
  },
  {
    id: 'q9',
    text: 'What is an important consideration when evaluating the ethical implications of an LLM?',
    options: [
      { id: 'q9-a', text: 'Ethical considerations only matter for government applications', isCorrect: false },
      { id: 'q9-b', text: 'Potential for misuse, harmful outputs, and environmental impact', isCorrect: true },
      { id: 'q9-c', text: 'Only the carbon footprint of training', isCorrect: false },
    ],
    explanation: 'Ethical evaluation of LLMs should consider multiple dimensions including potential for generating harmful content, perpetuating biases, being misused for deception, and the environmental impact of training and deployment.'
  },
  {
    id: 'q10',
    text: 'What is a key advantage of open-source LLMs compared to proprietary models?',
    options: [
      { id: 'q10-a', text: 'They are always more accurate', isCorrect: false },
      { id: 'q10-b', text: 'Transparency, customization, and independence from vendor policies', isCorrect: true },
      { id: 'q10-c', text: 'They never require powerful hardware', isCorrect: false },
    ],
    explanation: 'Open-source LLMs provide transparency into their architecture and weights, allow for customization and fine-tuning, and provide independence from vendor pricing changes or policy shifts, though they may require more technical expertise to deploy.'
  }
];

// Topic-specific question sets
const topicQuestions: Record<string, Question[]> = {
  'how to choose the correct llm': llmQuestions,
  // Add other topics as needed
};

// Default generic questions for topics without specific questions
const defaultQuestions: Question[] = [
  {
    id: 'default-q1',
    text: 'What is a primary goal when studying this topic?',
    options: [
      { id: 'default-q1-a', text: 'Deep comprehension and application', isCorrect: true },
      { id: 'default-q1-b', text: 'Superficial memorization', isCorrect: false },
      { id: 'default-q1-c', text: 'Speed reading without retention', isCorrect: false },
    ],
    explanation: 'The primary goal of studying any topic should be to achieve deep comprehension and the ability to apply the knowledge, rather than just memorizing facts superficially.'
  },
  {
    id: 'default-q2',
    text: 'Which study habit is most effective for long-term retention of information related to this topic?',
    options: [
      { id: 'default-q2-a', text: 'Cramming the night before an exam', isCorrect: false },
      { id: 'default-q2-b', text: 'Spaced repetition and active recall', isCorrect: true },
      { id: 'default-q2-c', text: 'Reading the material only once', isCorrect: false },
    ],
    explanation: 'Consistent, spaced repetition and active recall (e.g., self-testing) are scientifically proven methods for effective long-term retention of information.'
  },
  {
    id: 'default-q3',
    text: 'How can relating new concepts in this topic to prior knowledge enhance learning?',
    options: [
      { id: 'default-q3-a', text: 'It creates confusion and slows down learning', isCorrect: false },
      { id: 'default-q3-b', text: 'It helps build a richer, more interconnected understanding', isCorrect: true },
      { id: 'default-q3-c', text: 'Prior knowledge is irrelevant to learning new things', isCorrect: false },
    ],
    explanation: 'Relating new concepts to what you already know helps build a richer, more interconnected mental model, making the new information easier to understand and remember.'
  },
  {
    id: 'default-q4',
    text: 'What is the importance of asking questions while learning about this topic?',
    options: [
      { id: 'default-q4-a', text: 'It shows a lack of understanding', isCorrect: false },
      { id: 'default-q4-b', text: 'It actively engages the mind and clarifies ambiguities', isCorrect: true },
      { id: 'default-q4-c', text: 'Questions are a distraction from focused study', isCorrect: false },
    ],
    explanation: 'Asking questions is a critical part of the learning process. It actively engages your mind, helps clarify ambiguities, and deepens your understanding of the topic.'
  },
  {
    id: 'default-q5',
    text: 'Why is teaching or explaining this topic to someone else a good learning strategy?',
    options: [
      { id: 'default-q5-a', text: 'It is a waste of time that could be spent studying alone', isCorrect: false },
      { id: 'default-q5-b', text: 'It forces you to organize your thoughts and identify gaps', isCorrect: true },
      { id: 'default-q5-c', text: 'It is too difficult and not worth the effort', isCorrect: false },
    ],
    explanation: 'The act of teaching or explaining a concept to someone else (the Feynman technique) forces you to organize your thoughts, simplify complex ideas, and identify gaps in your own understanding, thereby reinforcing your learning.'
  },
  {
    id: 'default-q6',
    text: 'What role does practical application or problem-solving play in mastering this topic?',
    options: [
      { id: 'default-q6-a', text: 'It is an unnecessary addition to theoretical study', isCorrect: false },
      { id: 'default-q6-b', text: 'It helps reinforce knowledge through hands-on experience', isCorrect: true },
      { id: 'default-q6-c', text: 'It distracts from memorizing key concepts', isCorrect: false },
    ],
    explanation: 'Practical application and problem-solving help bridge the gap between theory and real-world use, reinforcing understanding and improving retention by applying concepts in meaningful contexts.'
  },
  {
    id: 'default-q7',
    text: 'How can seeking diverse perspectives on this topic be beneficial?',
    options: [
      { id: 'default-q7-a', text: 'It leads to information overload', isCorrect: false },
      { id: 'default-q7-b', text: 'It provides a more comprehensive understanding', isCorrect: true },
      { id: 'default-q7-c', text: 'It only complicates the learning process', isCorrect: false },
    ],
    explanation: 'Seeking diverse perspectives helps develop a more comprehensive and nuanced understanding of a topic, exposing you to different interpretations, applications, and ways of thinking that you might not have considered otherwise.'
  },
  {
    id: 'default-q8',
    text: 'What is the significance of identifying the core principles or big ideas in this topic?',
    options: [
      { id: 'default-q8-a', text: 'It oversimplifies complex information', isCorrect: false },
      { id: 'default-q8-b', text: 'It provides a framework for organizing and connecting details', isCorrect: true },
      { id: 'default-q8-c', text: 'All details are equally important and should be memorized', isCorrect: false },
    ],
    explanation: 'Identifying the core principles or big ideas in a topic provides a mental framework that helps you organize, connect, and retain the more specific details and concepts.'
  },
  {
    id: 'default-q9',
    text: 'Why is it important to take breaks and allow for mental rest when studying this topic?',
    options: [
      { id: 'default-q9-a', text: 'Breaks are a sign of weakness and reduce productivity', isCorrect: false },
      { id: 'default-q9-b', text: 'Rest allows the brain to consolidate information', isCorrect: true },
      { id: 'default-q9-c', text: 'Mental rest is only needed after completing the topic', isCorrect: false },
    ],
    explanation: 'Taking regular breaks and allowing for mental rest is crucial for effective learning. It helps prevent mental fatigue, allows the brain to consolidate information (memory formation), and improves focus and productivity in the long run.'
  },
  {
    id: 'default-q10',
    text: 'How does reflecting on your learning process for this topic (metacognition) improve future learning?',
    options: [
      { id: 'default-q10-a', text: 'It is an introspective distraction from actual studying', isCorrect: false },
      { id: 'default-q10-b', text: 'It helps identify effective strategies and areas for improvement', isCorrect: true },
      { id: 'default-q10-c', text: 'Learning strategies are fixed and cannot be improved', isCorrect: false },
    ],
    explanation: 'Reflecting on your learning process (metacognition) – thinking about how you learn, what strategies work best for you, and what challenges you face – helps you identify effective techniques and areas for improvement, making your future learning more efficient and successful.'
  }
];

const questionGenerator = {
  /**
   * Generate questions based on a given topic
   * @param topic The topic to generate questions for
   * @returns An array of questions
   */
  generateQuestions: async (topic: string): Promise<Question[]> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Convert to lowercase for case-insensitive matching
    const normalizedTopic = topic.toLowerCase();
    
    // Return topic-specific questions if available, otherwise return default questions
    return topicQuestions[normalizedTopic] || defaultQuestions;
  }
};

export default questionGenerator;
