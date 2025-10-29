
import React from 'react';
import { Opportunity, OpportunityStatus, WorkStyle, ExperienceLevel, TimeFlexibility } from '../types';
import { LocationMarkerIcon, CalendarIcon, ClockIcon, StarIcon, CheckCircleIcon } from './icons';
import CheckIcon from './CheckIcon';
import { useVolunteer } from '../contexts/VolunteerContext';
import StarRating from './StarRating';
import { REVIEWS } from '../constants';
import { useNavigate } from 'react-router-dom';

interface OpportunityModalProps {
  opportunity: Opportunity;
  onClose: () => void;
}

const DetailSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="border-t pt-4 mt-4">
    <h3 className="text-base font-bold text-gray-800 mb-3">{title}</h3>
    {children}
  </div>
);

const InfoPill: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1.5 rounded-lg w-full text-center sm:w-auto sm:text-right">
        {children}
    </div>
);

const OpportunityModal: React.FC<OpportunityModalProps> = ({ opportunity, onClose }) => {
  const [isClosing, setIsClosing] = React.useState(false);
  const [actionStatus, setActionStatus] = React.useState<'idle' | 'registering' | 'cancelling' | 'success_reg' | 'success_cancel'>('idle');
  const [applicationStep, setApplicationStep] = React.useState<'details' | 'applying'>('details');
  const [applicationText, setApplicationText] = React.useState('');
  const { volunteer, registerForOpportunity, cancelRegistration } = useVolunteer();
  const navigate = useNavigate();
  
  const MAX_CHARS = 1500;
  const registration = volunteer?.registeredOpportunities.find(o => o.opportunityId === opportunity.id);
  const currentStatus = registration?.status;
  const opportunityReviews = REVIEWS.filter(r => r.opportunityId === opportunity.id);
  
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };

  const handlePrimaryAction = () => {
    if (actionStatus !== 'idle') return;
    if (!volunteer) {
        navigate('/profile');
        handleClose();
        return;
    }

    if (currentStatus === OpportunityStatus.REGISTERED) {
      setActionStatus('cancelling');
      setTimeout(() => {
        cancelRegistration(opportunity.id);
        setActionStatus('success_cancel');
        setTimeout(handleClose, 1200);
      }, 1500);
    } else if (!currentStatus || currentStatus === OpportunityStatus.CANCELLED) {
      setApplicationStep('applying');
    }
  };
  
  const handleSubmitApplication = () => {
    if (actionStatus !== 'idle' || !applicationText.trim()) return;

    setActionStatus('registering');
    setTimeout(() => {
      registerForOpportunity(opportunity, applicationText);
      setActionStatus('success_reg');
      setTimeout(handleClose, 1200);
    }, 1500);
  };

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const modalAnimation = isClosing ? 'animate-fadeOut' : 'animate-fadeIn';
  const contentAnimation = isClosing ? 'animate-scaleOut' : 'animate-scaleIn';
  
  const getButtonState = () => {
    switch (actionStatus) {
      case 'registering': return { text: 'جاري الإرسال...', disabled: true, className: 'bg-taww-secondary' };
      case 'cancelling': return { text: 'جاري الإلغاء...', disabled: true, className: 'bg-red-400' };
      case 'success_reg': return { text: 'تم التقديم بنجاح!', disabled: true, className: 'bg-green-500' };
      case 'success_cancel': return { text: 'تم الإلغاء', disabled: true, className: 'bg-green-500' };
    }
    switch (currentStatus) {
      case OpportunityStatus.COMPLETED: return { text: 'مكتملة', disabled: true, className: 'bg-green-600' };
      case OpportunityStatus.REGISTERED: return { text: 'إلغاء التسجيل', disabled: false, className: 'bg-red-500 hover:bg-red-600' };
      default: return { text: 'التقديم الآن', disabled: false, className: 'bg-taww-primary hover:bg-taww-secondary' };
    }
  };

  const buttonState = getButtonState();

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm ${modalAnimation}`}
      onClick={handleClose}
    >
      <div
        className={`bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-auto max-h-[90vh] flex flex-col overflow-hidden ${contentAnimation}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img src={opportunity.imageUrl} alt={opportunity.title} className="w-full h-48 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-4 right-4 text-white">
            <h2 className="text-2xl font-bold">{opportunity.title}</h2>
            <p className="font-medium text-gray-200">{opportunity.organization}</p>
          </div>
        </div>

        <div className="p-6 overflow-y-auto">
            {applicationStep === 'details' ? (
                <>
                    {/* Section 1: General Description */}
                    <DetailSection title="وصف عام">
                        <p className="text-sm text-gray-500 mb-2 font-semibold">نبذة عن الجهة</p>
                        <p className="text-gray-700 mb-4 leading-relaxed text-sm">{opportunity.organizationDescription}</p>
                        <p className="text-sm text-gray-500 mb-2 font-semibold">ملخص الفرصة</p>
                        <p className="text-gray-700 mb-4 leading-relaxed text-sm">{opportunity.opportunitySummary}</p>
                        <p className="text-sm text-gray-500 mb-2 font-semibold">الوصف التفصيلي</p>
                        <p className="text-gray-700 leading-relaxed text-sm">{opportunity.detailedDescription}</p>
                    </DetailSection>

                    {/* Section 2: Scope & Responsibilities */}
                    <DetailSection title="نطاق العمل والمسؤوليات">
                        <p className="text-gray-700 mb-3 text-sm"><strong className="font-semibold">دور المتطوع:</strong> {opportunity.volunteerRole}</p>
                        <p className="text-sm text-gray-500 mb-2 font-semibold">المهام المطلوبة:</p>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 mb-3">
                            {opportunity.tasks.map((task, i) => <li key={i}>{task}</li>)}
                        </ul>
                        <p className="text-sm text-gray-500 mb-2 font-semibold">المخرجات المتوقعة:</p>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                            {opportunity.expectedDeliverables.map((d, i) => <li key={i}>{d}</li>)}
                        </ul>
                    </DetailSection>

                    {/* Section 3: Skills & Requirements */}
                    <DetailSection title="المهارات والمتطلبات">
                        <p className="text-sm text-gray-500 mb-2 font-semibold">المهارات المطلوبة:</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                            {opportunity.requiredSkills.map(skill => <span key={skill} className="bg-taww-primary/10 text-taww-primary text-sm font-medium px-3 py-1 rounded-full">{skill}</span>)}
                        </div>
                        {opportunity.preferredSkills && <p className="text-sm text-gray-500 mb-2 font-semibold">المهارات المفضّلة:</p>}
                        {opportunity.preferredSkills && <div className="flex flex-wrap gap-2 mb-3">
                            {opportunity.preferredSkills.map(skill => <span key={skill} className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">{skill}</span>)}
                        </div>}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                            <InfoPill><strong>الخبرة:</strong> {opportunity.experienceLevel}</InfoPill>
                            <InfoPill><strong>اللغات:</strong> {opportunity.requiredLanguages.join(', ')}</InfoPill>
                        </div>
                    </DetailSection>

                    {/* Section 4: Time & Commitment */}
                    <DetailSection title="الوقت والالتزام">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {opportunity.startDate && <InfoPill><strong>تاريخ البدء:</strong> {opportunity.startDate}</InfoPill>}
                            {opportunity.endDate && <InfoPill><strong>تاريخ النهاية:</strong> {opportunity.endDate}</InfoPill>}
                            {opportunity.timeCommitmentPerWeek && <InfoPill><strong>ساعات أسبوعية:</strong> {opportunity.timeCommitmentPerWeek}</InfoPill>}
                            <InfoPill><strong>مرونة الوقت:</strong> {opportunity.timeFlexibility}</InfoPill>
                        </div>
                    </DetailSection>

                    {/* Section 5: Eligibility */}
                    <DetailSection title="الأهلية وشروط المشاركة">
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                            {opportunity.eligibility.minimumAge && <li>العمر الأدنى للمشاركة هو {opportunity.eligibility.minimumAge} سنة.</li>}
                            {opportunity.eligibility.interviewRequired && <li>قد تتطلب هذه الفرصة إجراء مقابلة شخصية.</li>}
                            {opportunity.eligibility.ndaRequired && <li>تتطلب هذه الفرصة توقيع اتفاقية عدم إفصاح (NDA).</li>}
                            {!opportunity.eligibility.interviewRequired && !opportunity.eligibility.ndaRequired && <li>لا توجد شروط خاصة لهذه الفرصة.</li>}
                        </ul>
                    </DetailSection>

                    {/* Section 6: Benefits */}
                    <DetailSection title="الفوائد والحوافز">
                         <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                            {opportunity.benefits.map((benefit, i) => <li key={i}>{benefit}</li>)}
                        </ul>
                    </DetailSection>

                    {/* Section 7: Social Impact */}
                    <DetailSection title="الأثر المجتمعي">
                         <p className="text-gray-700 mb-2 leading-relaxed text-sm">{opportunity.socialImpact.description}</p>
                         {opportunity.socialImpact.beneficiaries && <p className="text-sm text-gray-700"><strong className="font-semibold">المستفيدون:</strong> {opportunity.socialImpact.beneficiaries}</p>}
                    </DetailSection>
                </>
            ) : (
                <div className="animate-fadeIn">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">تقديم طلبك</h3>
                    <p className="text-gray-600 mb-4">للفرصة: <span className="font-semibold">{opportunity.title}</span></p>
                    
                    <div className="bg-gray-50 p-4 rounded-lg border">
                        <label htmlFor="applicationText" className="block text-md font-semibold text-gray-700 mb-2">
                            ما الذي يجعلك مهيئ لهذه الفرصة التطوعية الاحترافية؟
                        </label>
                        <p className="text-sm text-gray-500 mb-3">
                            اشرح كيف تتوافق مهاراتك وخبراتك مع متطلبات الفرصة. يمكنك ذكر مشاريع سابقة أو دافعك للمشاركة.
                        </p>
                        <textarea
                            id="applicationText"
                            value={applicationText}
                            onChange={(e) => setApplicationText(e.target.value)}
                            maxLength={MAX_CHARS}
                            rows={8}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-taww-primary focus:border-taww-primary transition duration-200"
                            placeholder="ابدأ الكتابة هنا..."
                            aria-describedby="char-count"
                        />
                        <p id="char-count" className="text-left text-sm text-gray-500 mt-1">
                            {applicationText.length} / {MAX_CHARS}
                        </p>
                    </div>
                </div>
            )}
        </div>
        
        <div className="mt-auto p-5 bg-gray-50 border-t flex gap-4">
            {applicationStep === 'details' ? (
                <>
                    <button onClick={handleClose} className="flex-1 bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 btn-press">
                        رجوع
                    </button>
                    <button onClick={handlePrimaryAction} disabled={buttonState.disabled} className={`flex-1 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 btn-press flex justify-center items-center ${buttonState.className}`}>
                        {actionStatus.includes('success') && <CheckIcon className="w-6 h-6 mr-2" />}
                        {buttonState.text}
                    </button>
                </>
            ) : (
                <>
                    <button onClick={() => setApplicationStep('details')} className="flex-1 bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 btn-press">
                        رجوع
                    </button>
                    <button onClick={handleSubmitApplication} disabled={!applicationText.trim() || actionStatus !== 'idle'} className={`flex-1 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 btn-press flex justify-center items-center ${actionStatus === 'registering' ? 'bg-taww-secondary' : 'bg-taww-primary hover:bg-taww-secondary'} disabled:bg-gray-400 disabled:cursor-not-allowed`}>
                         {actionStatus === 'registering' ? (
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                         ) : 'إرسال الطلب'}
                    </button>
                </>
            )}
        </div>
      </div>
    </div>
  );
};

export default OpportunityModal;