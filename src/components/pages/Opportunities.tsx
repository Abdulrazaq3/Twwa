import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { OPPORTUNITIES } from '../../constants';
import { Opportunity, OpportunityCategory, WorkStyle } from '../../types';
import OpportunityCard from '../OpportunityCard';
import OpportunityModal from '../OpportunityModal';
import { SearchIcon, EmptyStateIcon, XIcon, FilterIcon } from '../icons';

type SortOption = 'default' | 'date_asc' | 'date_desc' | 'points_desc' | 'points_asc' | 'rating_desc' | 'reviews_desc';

// Filter Modal for mobile devices
const FilterModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  currentCategory: OpportunityCategory | 'all';
  onCategoryChange: (category: OpportunityCategory | 'all') => void;
  currentWorkStyle: WorkStyle | 'all';
  onWorkStyleChange: (style: WorkStyle | 'all') => void;
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
  onApply: () => void;
}> = ({ isOpen, onClose, currentCategory, onCategoryChange, currentWorkStyle, onWorkStyleChange, currentSort, onSortChange, onApply }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/40 animate-fadeIn" onClick={onClose}>
      <div
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-lg p-6 animate-slide-in-bottom"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">فرز وتصفية</h3>
          <button onClick={onClose} className="p-2 -mr-2"><XIcon className="w-6 h-6 text-gray-500" /></button>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="font-semibold mb-3">الفئة</h4>
            <div className="flex flex-wrap gap-2">
              {['all', ...Object.values(OpportunityCategory)].map(cat => (
                <button
                  key={cat}
                  onClick={() => onCategoryChange(cat as any)}
                  className={`px-4 py-2 text-sm font-semibold rounded-full btn-press transition-colors ${currentCategory === cat ? 'bg-taww-primary text-white' : 'bg-gray-100 text-gray-700'}`}
                >
                  {cat === 'all' ? 'كل الفئات' : cat}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3">نمط العمل</h4>
            <div className="flex flex-wrap gap-2">
              {['all', ...Object.values(WorkStyle)].map(style => (
                <button
                  key={style}
                  onClick={() => onWorkStyleChange(style as any)}
                  className={`px-4 py-2 text-sm font-semibold rounded-full btn-press transition-colors ${currentWorkStyle === style ? 'bg-taww-primary text-white' : 'bg-gray-100 text-gray-700'}`}
                >
                  {style === 'all' ? 'الكل' : style}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="sort-modal" className="font-semibold mb-3 block">الترتيب حسب</label>
            <select
              id="sort-modal"
              value={currentSort}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-taww-primary cursor-pointer"
            >
              <option value="default">الترتيب الافتراضي</option>
              <option value="date_desc">التاريخ: من الأحدث</option>
              <option value="date_asc">التاريخ: من الأقدم</option>
              <option value="points_desc">النقاط: من الأعلى</option>
              <option value="points_asc">النقاط: من الأدنى</option>
              <option value="rating_desc">التقييم: من الأعلى</option>
              <option value="reviews_desc">المراجعات: من الأكثر</option>
            </select>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={onApply}
            className="w-full bg-taww-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-taww-secondary transition-all duration-300 btn-press"
          >
            عرض النتائج
          </button>
        </div>
      </div>
    </div>
  );
};


const Opportunities: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<OpportunityCategory | 'all'>('all');
  const [selectedWorkStyle, setSelectedWorkStyle] = useState<WorkStyle | 'all'>('all');
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Temporary states for the modal
  const [tempCategory, setTempCategory] = useState(selectedCategory);
  const [tempWorkStyle, setTempWorkStyle] = useState(selectedWorkStyle);
  const [tempSort, setTempSort] = useState(sortOption);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const openId = params.get('open');
    if (openId) {
      const oppToOpen = OPPORTUNITIES.find(o => o.id === parseInt(openId, 10));
      if (oppToOpen) {
        setTimeout(() => {
            setSelectedOpportunity(oppToOpen);
            navigate('/opportunities', { replace: true });
        }, 150);
      }
    }
  }, [location, navigate]);

  const handleViewDetailsClick = (opportunity: Opportunity) => {
    setSelectedOpportunity(opportunity);
  };

  const handleCloseModal = () => {
    setSelectedOpportunity(null);
  };
  
  const handleApplyFilters = () => {
    setSelectedCategory(tempCategory);
    setSelectedWorkStyle(tempWorkStyle);
    setSortOption(tempSort);
    setIsFilterModalOpen(false);
  };

  const filteredAndSortedOpportunities = useMemo(() => {
    let opportunities = OPPORTUNITIES.filter(opp => {
      const matchesCategory = selectedCategory === 'all' || opp.category === selectedCategory;
      const matchesWorkStyle = selectedWorkStyle === 'all' || opp.workStyle === selectedWorkStyle;
      
      const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
      if (!lowerCaseSearchTerm) {
        return matchesCategory && matchesWorkStyle;
      }
      
      const searchableContent = [opp.title, opp.organization, opp.city, ...opp.skillTags].join(' ').toLowerCase();
      const matchesSearch = searchableContent.includes(lowerCaseSearchTerm);

      return matchesCategory && matchesWorkStyle && matchesSearch;
    });

    const sortedOpportunities = [...opportunities];
    switch (sortOption) {
      case 'date_asc':
        sortedOpportunities.sort((a, b) => a.applicationDeadline.localeCompare(b.applicationDeadline));
        break;
      case 'date_desc':
        sortedOpportunities.sort((a, b) => b.applicationDeadline.localeCompare(a.applicationDeadline));
        break;
      case 'points_asc':
        sortedOpportunities.sort((a, b) => a.points - b.points);
        break;
      case 'points_desc':
        sortedOpportunities.sort((a, b) => b.points - a.points);
        break;
      case 'rating_desc':
        sortedOpportunities.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews_desc':
        sortedOpportunities.sort((a, b) => b.reviewsCount - a.reviewsCount);
        break;
      default:
        // Featured opportunities first
        sortedOpportunities.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }
    return sortedOpportunities;
  }, [searchTerm, selectedCategory, selectedWorkStyle, sortOption]);

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
        <section className="text-center animate-fadeInUp">
          <h1 className="text-4xl font-extrabold text-taww-primary mb-2">اكتشف فرص العطاء</h1>
          <p className="text-lg text-gray-600">ابحث عن الفرصة التطوعية التي تناسب شغفك ومهاراتك.</p>
        </section>

        <section className="space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="ابحث بالاسم، الجهة، المهارة..."
              className="w-full p-4 pl-12 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-taww-primary/50 focus:border-taww-primary transition-colors duration-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <SearchIcon className="h-6 w-6 text-gray-400" />
            </div>
          </div>

          {/* Desktop Filters */}
          <div className="hidden lg:block bg-white/50 p-4 rounded-xl shadow-sm border space-y-4">
            <div className="flex items-center gap-4">
              <h4 className="font-semibold text-gray-700 whitespace-nowrap">الفئة:</h4>
              <div className="flex flex-wrap gap-2">
                {['all', ...Object.values(OpportunityCategory)].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat as any)}
                    className={`px-4 py-1.5 text-sm font-semibold rounded-full btn-press transition-colors ${selectedCategory === cat ? 'bg-taww-primary text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    {cat === 'all' ? 'كل الفئات' : cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <h4 className="font-semibold text-gray-700 whitespace-nowrap">نمط العمل:</h4>
              <div className="flex flex-wrap gap-2">
                {['all', ...Object.values(WorkStyle)].map(style => (
                  <button
                    key={style}
                    onClick={() => setSelectedWorkStyle(style as any)}
                    className={`px-4 py-1.5 text-sm font-semibold rounded-full btn-press transition-colors ${selectedWorkStyle === style ? 'bg-taww-primary text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    {style === 'all' ? 'الكل' : style}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sorting and Mobile Filter Trigger */}
          <div className="flex justify-between items-center">
             <div className="relative hidden lg:block">
               <label htmlFor="sort-desktop" className="sr-only">الترتيب حسب</label>
               <select
                id="sort-desktop"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="p-2 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-taww-primary transition-colors duration-200 cursor-pointer text-sm"
              >
                <option value="default">الترتيب: مميزة</option>
                <option value="date_desc">التاريخ: الأحدث</option>
                <option value="points_desc">النقاط: الأعلى</option>
                <option value="rating_desc">التقييم: الأعلى</option>
              </select>
             </div>
             
             <button
               onClick={() => {
                setTempCategory(selectedCategory);
                setTempWorkStyle(selectedWorkStyle);
                setTempSort(sortOption);
                setIsFilterModalOpen(true);
               }}
               className="w-full lg:hidden flex items-center justify-center gap-2 bg-white p-3 rounded-lg shadow-sm border text-gray-700 font-semibold btn-press"
             >
                <FilterIcon className="w-5 h-5" />
                <span>فرز وتصفية</span>
             </button>

             <p className="text-sm text-gray-500 font-medium">
               تم العثور على <span className="font-bold text-taww-primary">{filteredAndSortedOpportunities.length}</span> فرصة
             </p>
          </div>
        </section>
        
        <section className="transition-opacity duration-500">
          {filteredAndSortedOpportunities.length > 0 ? (
            <div 
              key={searchTerm + selectedCategory + sortOption}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {filteredAndSortedOpportunities.map((opp, index) => (
                <OpportunityCard 
                  key={opp.id} 
                  opportunity={opp}
                  onViewDetailsClick={handleViewDetailsClick}
                  className="animate-fadeInUp"
                  style={{ animationDelay: `${index * 100}ms` }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-6 border-2 border-dashed border-gray-300 rounded-xl mt-8 flex flex-col items-center justify-center animate-fadeIn">
                <EmptyStateIcon className="w-20 h-20 text-gray-400 mb-4" />
                <h3 className="text-2xl font-bold text-gray-700">لا توجد فرص تطابق بحثك</h3>
                <p className="text-gray-500 mt-2 max-w-sm">
                  جرب استخدام كلمات بحث مختلفة أو قم بتوسيع نطاق التصفية للعثور على ما تبحث عنه.
                </p>
            </div>
          )}
        </section>
      </div>

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        currentCategory={tempCategory}
        onCategoryChange={setTempCategory}
        currentWorkStyle={tempWorkStyle}
        onWorkStyleChange={setTempWorkStyle}
        currentSort={tempSort}
        onSortChange={setTempSort}
        onApply={handleApplyFilters}
      />

      {selectedOpportunity && (
        <OpportunityModal
          opportunity={selectedOpportunity}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default Opportunities;