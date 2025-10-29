
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Opportunity, OpportunityCategory, OpportunityStatus } from '../types';
import { XIcon, LocationMarkerIcon, CalendarIcon, ClockIcon, StarIcon, ArrowUpIcon, BriefcaseIcon } from './icons';
import EventsMap from './EventsMap';
import { REVIEWS } from '../constants';
import StarRating from './StarRating';
import { useVolunteer } from '../contexts/VolunteerContext';
import { useNavigate } from 'react-router-dom';
import CheckIcon from './CheckIcon';

interface MapModalProps {
  opportunities: Opportunity[];
  onClose: () => void;
}

type ActionStatus = 'idle' | 'registering' | 'cancelling' | 'success_reg' | 'success_cancel';

const OpportunityDetailPanel: React.FC<{
    opportunity: Opportunity;
    isExpanded: boolean;
    onExpand: () => void;
    onCollapse: () => void;
}> = ({ opportunity, isExpanded, onExpand, onCollapse }) => {
    const { volunteer, registerForOpportunity, cancelRegistration } = useVolunteer();
    const navigate = useNavigate();
    const [actionStatus, setActionStatus] = useState<ActionStatus>('idle');
    const [applicationStep, setApplicationStep] = useState<'details' | 'applying'>('details');
    const [applicationText, setApplicationText] = useState('');
    const panelRef = useRef<HTMLDivElement>(null);
    
    const MAX_CHARS = 1500;
    const registration = volunteer?.registeredOpportunities.find(o => o.opportunityId === opportunity.id);
    const currentStatus = registration?.status;
    const opportunityReviews = REVIEWS.filter(r => r.opportunityId === opportunity.id);

    const handlePrimaryAction = () => {
      if (actionStatus !== 'idle') return;
  
      if (!volunteer) {
        navigate('/profile');
        return;
      }
  
      if (currentStatus === OpportunityStatus.REGISTERED) {
        setActionStatus('cancelling');
        setTimeout(() => {
          cancelRegistration(opportunity.id);
          setActionStatus('success_cancel');
        }, 1500);
      } else {
        setApplicationStep('applying');
        onExpand();
      }
    };
    
    const handleSubmitApplication = () => {
        if (actionStatus !== 'idle' || !applicationText.trim()) return;

        setActionStatus('registering');
        setTimeout(() => {
            registerForOpportunity(opportunity, applicationText);
            setActionStatus('success_reg');
        }, 1500);
    };

    useEffect(() => {
        setActionStatus('idle');
        setApplicationStep('details');
        setApplicationText('');
    }, [opportunity.id]);

    useEffect(() => {
        if (isExpanded && panelRef.current) {
            panelRef.current.scrollTop = 0;
        }
    }, [isExpanded]);

    const getButtonState = () => {
        switch (actionStatus) {
            case 'registering': return { text: 'جاري الإرسال...', disabled: true, className: 'bg-taww-secondary cursor-wait' };
            case 'cancelling': return { text: 'جاري الإلغاء...', disabled: true, className: 'bg-red-400 cursor-wait' };
            case 'success_reg': return { text: 'تم التقديم!', disabled: true, className: 'bg-green-500' };
            case 'success_cancel': return { text: 'تم الإلغاء', disabled: true, className: 'bg-green-500' };
        }
        if (currentStatus === OpportunityStatus.COMPLETED) return { text: 'مكتملة', disabled: true, className: 'bg-green-600 cursor-not-allowed' };
        if (currentStatus === OpportunityStatus.REGISTERED) return { text: 'إلغاء التسجيل', disabled: false, className: 'bg-red-500 hover:bg-red-600' };
        return { text: 'التقديم الآن', disabled: false, className: 'bg-taww-primary hover:bg-taww-secondary' };
    };

    const buttonState = getButtonState();

    return (
        <div 
          className={`absolute bottom-0 left-0 right-0 z-20 bg-white rounded-t-2xl shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.2)] transition-all duration-500 ease-in-out ${isExpanded ? 'h-[75vh] md:h-[85vh]' : 'h-auto max-h-[40vh]'}`}
        >
            <div className="relative text-center p-4 cursor-pointer" onClick={isExpanded ? onCollapse : onExpand}>
                <div className="w-10 h-1.5 bg-gray-300 rounded-full mx-auto"></div>
                {isExpanded && (
                    <button onClick={(e) => { e.stopPropagation(); onCollapse(); }} className="absolute top-2 left-2 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors" aria-label="Collapse panel">
                        <ArrowUpIcon className="w-6 h-6 text-gray-600 transform rotate-180" />
                    </button>
                )}
            </div>
            
            <div ref={panelRef} className="overflow-y-auto h-full pb-24">
                {/* Preview Content (visible when not expanded) */}
                <div className={`px-4 pb-4 ${isExpanded ? 'hidden' : 'block'}`}>
                    <h3 className="text-lg font-bold text-gray-900 truncate">{opportunity.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">{opportunity.organization}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <BriefcaseIcon className="h-4 w-4 text-gray-400" />
                        <span>{opportunity.workType} &middot; <span className="font-semibold">{opportunity.workStyle}</span></span>
                    </div>
                </div>

                {/* Expanded Content */}
                <div className={`px-4 ${isExpanded ? 'block' : 'hidden'}`}>
                    {applicationStep === 'details' ? (
                        <>
                            <img src={opportunity.imageUrl} alt={opportunity.title} className="w-full h-40 object-cover rounded-lg mb-4"/>
                            <h2 className="text-2xl font-bold text-gray-900">{opportunity.title}</h2>
                            <p className="font-semibold text-taww-primary text-md mb-3">{opportunity.organization}</p>
                            <p className="text-gray-700 mb-4 leading-relaxed text-sm">{opportunity.opportunitySummary}</p>
                            
                            <div className="space-y-2 text-gray-600 border-t pt-3 mt-4 mb-4 text-sm">
                                <div className="flex items-center"><BriefcaseIcon className="h-5 w-5 ml-2" /> <span>{opportunity.workType} &middot; {opportunity.workStyle}</span></div>
                                <div className="flex items-center"><ClockIcon className="h-5 w-5 ml-2" /> <span>{opportunity.commitment}</span></div>
                                <div className="flex items-center"><CalendarIcon className="h-5 w-5 ml-2" /> <span>آخر موعد للتقديم: {opportunity.applicationDeadline}</span></div>
                            </div>
                            
                            <div className="border-t pt-3 mt-4">
                                <h3 className="font-bold text-gray-800 mb-2 text-base">المهارات المطلوبة</h3>
                                <div className="flex flex-wrap gap-2">
                                    {opportunity.requiredSkills.map(skill => (
                                        <span key={skill} className="bg-taww-primary/10 text-taww-primary text-sm font-medium px-3 py-1 rounded-full">{skill}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="border-t pt-3 mt-4">
                                <h3 className="font-bold text-gray-800 mb-3 text-base">آراء المتطوعين ({opportunityReviews.length})</h3>
                                <div className="space-y-4 max-h-40 overflow-y-auto pr-2">
                                    {opportunityReviews.length > 0 ? (
                                        opportunityReviews.map(review => (
                                        <div key={review.id} className="flex items-start gap-3">
                                            <img src={review.volunteerImage} alt={review.volunteerName} className="w-10 h-10 rounded-full" />
                                            <div>
                                            <div className="flex items-center gap-2"><p className="font-bold text-sm">{review.volunteerName}</p><StarRating rating={review.rating} /></div>
                                            <p className="text-sm text-gray-600 mt-1">{review.comment}</p>
                                            </div>
                                        </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-500">لا توجد مراجعات لهذه الفرصة بعد. كن أول من يقيّمها!</p>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="animate-fadeIn py-4">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">
                                تقديم طلبك
                            </h3>
                            <div className="bg-gray-50 p-4 rounded-lg border">
                                <label htmlFor="applicationTextMap" className="block text-md font-semibold text-gray-700 mb-2">
                                    ما الذي يجعلك مهيئ لهذه الفرصة التطوعية الاحترافية؟
                                </label>
                                <textarea
                                    id="applicationTextMap"
                                    value={applicationText}
                                    onChange={(e) => setApplicationText(e.target.value)}
                                    maxLength={MAX_CHARS}
                                    rows={8}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-taww-primary focus:border-taww-primary transition duration-200"
                                    placeholder="ابدأ الكتابة هنا..."
                                    aria-describedby="char-count-map"
                                />
                                <p id="char-count-map" className="text-left text-sm text-gray-500 mt-1">
                                    {applicationText.length} / {MAX_CHARS}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

             <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-sm border-t">
                {applicationStep === 'details' ? (
                    <button
                        onClick={handlePrimaryAction}
                        disabled={buttonState.disabled}
                        className={`w-full text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 btn-press flex justify-center items-center ${buttonState.className}`}
                    >
                        {(actionStatus.includes('success')) && <CheckIcon className="w-6 h-6 mr-2" />}
                        {buttonState.text}
                    </button>
                ) : (
                    <div className="flex gap-4">
                        <button onClick={() => setApplicationStep('details')} className="flex-1 bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 btn-press">
                            رجوع
                        </button>
                        <button onClick={handleSubmitApplication} disabled={!applicationText.trim() || actionStatus !== 'idle'} className={`flex-1 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 btn-press flex justify-center items-center ${actionStatus === 'registering' ? 'bg-taww-secondary' : 'bg-taww-primary hover:bg-taww-secondary'} disabled:bg-gray-400 disabled:cursor-not-allowed`}>
                            {actionStatus === 'registering' ? 'جاري الإرسال...' : 'إرسال الطلب'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

const MapModal: React.FC<MapModalProps> = ({ opportunities, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<OpportunityCategory | 'all'>('all');
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [isPanelExpanded, setIsPanelExpanded] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };

  const handleMarkerClick = (opportunity: Opportunity) => {
    if (selectedOpportunity?.id === opportunity.id) {
        // If same marker is clicked, toggle the panel's expanded state
        setIsPanelExpanded(prev => !prev);
    } else {
        // If a new marker is clicked, select it and show the collapsed panel
        setSelectedOpportunity(opportunity);
        setIsPanelExpanded(false);
    }
  };

  const handleMapClick = () => {
    setSelectedOpportunity(null);
    setIsPanelExpanded(false);
  };
  
  const categories = ['all', ...Object.values(OpportunityCategory)];

  const filteredOpportunities = useMemo(() => {
    return opportunities.filter(opp => (opp.lat && opp.lng) && (selectedCategory === 'all' || opp.category === selectedCategory));
  }, [opportunities, selectedCategory]);
  
  const panelAnimation = selectedOpportunity 
    ? (isClosing ? 'animate-slide-out-bottom' : 'animate-slide-in-bottom')
    : 'animate-slide-out-bottom';

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm ${isClosing ? 'animate-fadeOut' : 'animate-modal-fade-in'}`}
      onClick={handleClose}
    >
      <div
        className={`bg-gray-100 rounded-2xl shadow-2xl w-full h-full flex flex-col overflow-hidden ${isClosing ? 'animate-scaleOut' : 'animate-modal-scale-in'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="p-4 bg-white/80 backdrop-blur-md border-b flex items-center justify-between gap-4 flex-shrink-0 z-20">
          <h2 className="text-xl font-bold text-gray-800">خريطة الفرص</h2>
          <button onClick={handleClose} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
            <XIcon className="w-6 h-6 text-gray-600" />
          </button>
        </header>

        <main className="flex-1 relative">
          <div className="absolute top-0 right-0 left-0 z-10 p-2 overflow-x-auto" ref={scrollContainerRef}>
            <div className="flex space-x-2 space-x-reverse pb-2" style={{ scrollbarWidth: 'none' }}>
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category as any)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap shadow-sm btn-press ${selectedCategory === category ? 'bg-taww-primary text-white scale-105' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                    >
                        {category === 'all' ? 'كل الفئات' : category}
                    </button>
                ))}
            </div>
          </div>
          <EventsMap 
            opportunities={filteredOpportunities}
            selectedOpportunity={selectedOpportunity}
            onMarkerClick={handleMarkerClick}
            onMapClick={handleMapClick}
          />
          {selectedOpportunity && (
            <div className={`${panelAnimation}`}>
                 <OpportunityDetailPanel
                    opportunity={selectedOpportunity}
                    isExpanded={isPanelExpanded}
                    onExpand={() => setIsPanelExpanded(true)}
                    onCollapse={() => setIsPanelExpanded(false)}
                />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default MapModal;