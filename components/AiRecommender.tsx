
import React, { useState } from 'react';
import { Opportunity } from '../types';
import { getRecommendations } from '../services/geminiService';
// FIX: Replaced SparklesIcon with LightBulbIcon as it was not exported from the icons file.
import { LightBulbIcon } from './icons';
import OpportunityCard from './OpportunityCard';
import OpportunityCardSkeleton from './OpportunityCardSkeleton';
import OpportunityModal from './OpportunityModal'; // Import the modal

interface AiRecommenderProps {
  opportunities: Opportunity[];
}

const AiRecommender: React.FC<AiRecommenderProps> = ({ opportunities }) => {
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<Opportunity[]>([]);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);

  const suggestions = [
    'مبادرات بيئية',
    'مساعدة كبار السن',
    'مهاراتي في التنظيم',
    'تعليم الأطفال',
  ];

  const handleSuggestionClick = (suggestion: string) => {
    setUserInput(suggestion);
  };

  const handleGetRecommendations = async () => {
    if (!userInput.trim()) {
      setError('يرجى وصف اهتماماتك أو مهاراتك.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setRecommendations([]);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const recommendedIds = await getRecommendations(userInput, opportunities);
      if(recommendedIds.length === 0) {
        setError('لم نجد فرصًا تطابق وصفك الحالي بدقة. جرب كلمات مفتاحية أخرى أو صف لنا شغفك بشكل مختلف!');
      } else {
        const recommendedOpps = opportunities.filter(opp => recommendedIds.includes(opp.id));
        setRecommendations(recommendedOpps);
      }
    } catch (err) {
      setError('حدث خطأ أثناء الحصول على التوصيات. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleViewDetailsClick = (opportunity: Opportunity) => {
    setSelectedOpportunity(opportunity);
  };
  
  const handleCloseModal = () => {
    setSelectedOpportunity(null);
  };

  return (
    <>
      <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-200">
        <div className="flex items-center mb-4">
          <LightBulbIcon className="h-6 w-6 text-taww-primary" />
          <h2 className="text-2xl font-bold text-taww-primary">توصيات ذكية لك</h2>
        </div>
        <p className="text-gray-600 mb-6">
          صف لنا اهتماماتك، مهاراتك، أو نوع التطوع الذي تبحث عنه، ودع الذكاء الاصطناعي يجد لك الفرص الأنسب.
        </p>
        <div className="space-y-4">
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="مثال: أحب العمل في الهواء الطلق والزراعة، أو لدي خبرة في تعليم الأطفال..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-taww-primary focus:border-taww-primary transition duration-200"
            rows={4}
            disabled={isLoading}
          />
          <div className="flex flex-wrap gap-2 justify-center pt-2">
              <p className="w-full text-center text-sm text-gray-500 mb-1">أو جرب أحد الاقتراحات:</p>
              {suggestions.map(suggestion => (
                  <button
                      key={suggestion}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-4 py-1.5 text-sm font-semibold rounded-full transition-colors duration-200 btn-press bg-taww-primary/10 text-taww-primary hover:bg-taww-primary/20"
                  >
                      {suggestion}
                  </button>
              ))}
          </div>
          <button
            onClick={handleGetRecommendations}
            disabled={isLoading}
            className="w-full bg-taww-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-taww-secondary transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center btn-press hover:shadow-lg hover:shadow-taww-primary/40"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                جاري البحث...
              </>
            ) : (
              'احصل على توصيات'
            )}
          </button>
        </div>

        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
        
        {isLoading && (
          <div className="mt-10">
              <h3 className="text-xl font-bold mb-4 text-center text-gray-600">نبحث لك عن أفضل الفرص...</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <OpportunityCardSkeleton />
                  <OpportunityCardSkeleton />
                  <OpportunityCardSkeleton />
              </div>
          </div>
        )}

        {recommendations.length > 0 && !isLoading && (
          <div className="mt-10">
            <h3 className="text-xl font-bold mb-4 text-center">أفضل الفرص المقترحة لك:</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((opp, index) => (
                <OpportunityCard 
                  key={opp.id} 
                  opportunity={opp} 
                  onViewDetailsClick={handleViewDetailsClick}
                  className="animate-fadeInUp"
                  style={{ animationDelay: `${index * 150}ms` }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      {selectedOpportunity && (
        <OpportunityModal
          opportunity={selectedOpportunity}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default AiRecommender;