import { useRouter } from 'next/router';

export const useNavigation = () => {
  const router = useRouter();

  const handleSkillTrackerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (typeof window !== 'undefined') {
      const assessmentCompleted = localStorage.getItem('assessmentCompleted') === 'true';
      const selectedRole = localStorage.getItem('selectedRole');
      
      router.push(assessmentCompleted && selectedRole ? '/learning-road' : '/skill-tracker');
    }
  };

  return { handleSkillTrackerClick };
};

export default useNavigation;
