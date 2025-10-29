

import React, { useState, useMemo } from 'react';
import { BADGES, OPPORTUNITIES, LEADERBOARD_VOLUNTEERS } from '../../constants';
import Badge from '../Badge';
import AnimatedNumber from '../AnimatedNumber';
import { useVolunteer } from '../../contexts/VolunteerContext';
import { 
    ClockIcon, StarIcon, CheckCircleIcon, LogoutIcon, BriefcaseIcon,
    FilledStarIcon, CheckBadgeIcon, DocumentTextIcon, XCircleIcon, 
    FireIcon, UserIcon, AwardIcon, LocationMarkerIcon,
    CalendarIcon, LightBulbIcon, EditIcon
} from '../icons';
import { OpportunityStatus, Opportunity, Volunteer } from '../../types';
// FIX: Changed to named import to resolve module error.
import { Login } from './Login';
import RatingModal from '../RatingModal';
// FIX: Import the StarRating component to resolve the 'Cannot find name' error.
import StarRating from '../StarRating';
import EditProfileModal from '../EditProfileModal';


const VolunteerIdCard: React.FC<{ volunteer: Volunteer, onEdit: () => void }> = ({ volunteer, onEdit }) => {
    const completedOpportunitiesCount = volunteer.registeredOpportunities.filter(
      o => o.status === OpportunityStatus.COMPLETED
    ).length;

    return (
        <div className="relative bg-white rounded-2xl shadow-lg p-6 w-full sticky top-28">
            <button
                onClick={onEdit}
                className="absolute top-4 left-4 p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 hover:text-taww-primary transition-colors btn-press"
                aria-label="تعديل الملف الشخصي"
            >
                <EditIcon className="w-5 h-5" />
            </button>
            <div className="flex flex-col items-center text-center">
                <img
                    src={volunteer.profilePictureUrl || "https://i.postimg.cc/43c48S58/swrt-ahmd.jpg"}
                    alt={volunteer.fullName}
                    className="w-32 h-32 rounded-full ring-4 ring-taww-primary/20 shadow-lg mb-4"
                />
                <h1 className="text-2xl font-bold text-gray-900">{volunteer.fullName}</h1>
                <p className="text-taww-primary font-semibold">{volunteer.currentJobTitle}</p>
                <p className="text-gray-500 mt-2 text-sm max-w-xs">{volunteer.shortBio}</p>
            </div>
            
            <div className="border-t my-6"></div>

            <div className="text-sm space-y-3">
                <div className="flex items-center text-gray-600">
                    <LocationMarkerIcon className="h-5 w-5 ml-3 text-gray-400" />
                    <span>{volunteer.city}, {volunteer.country}</span>
                </div>
                <div className="flex items-center text-gray-600">
                    <BriefcaseIcon className="h-5 w-5 ml-3 text-gray-400" />
                    <span>خبرة {volunteer.experienceYears}</span>
                </div>
                 {volunteer.portfolioLink && (
                    <div className="flex items-center text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 ml-3 text-gray-400"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg>
                        <a href={volunteer.portfolioLink} target="_blank" rel="noopener noreferrer" className="text-taww-primary hover:underline">
                            معرض الأعمال
                        </a>
                    </div>
                 )}
            </div>
            
             <div className="border-t my-6"></div>

            <h3 className="font-bold text-gray-800 mb-3">أهم المهارات</h3>
            <div className="flex flex-wrap gap-2">
                {volunteer.skills.slice(0, 5).map(skill => (
                    <span key={skill} className="bg-taww-primary/10 text-taww-primary text-xs font-semibold px-2.5 py-1 rounded-full">
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    )
}

const ProfileSection: React.FC<{title: string, children: React.ReactNode}> = ({title, children}) => (
    <div>
        <h3 className="text-lg font-bold text-taww-primary mb-4 pb-2 border-b-2 border-taww-primary/20">{title}</h3>
        <div className="space-y-4">{children}</div>
    </div>
);

const InfoRow: React.FC<{label: string, value: React.ReactNode}> = ({label, value}) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-2 text-sm">
        <dt className="font-semibold text-gray-500">{label}</dt>
        <dd className="md:col-span-2 text-gray-800">{value}</dd>
    </div>
);

const ProfileDetailsTab: React.FC<{ volunteer: Volunteer }> = ({ volunteer }) => {
    return (
        <div className="space-y-8">
             <ProfileSection title="المعلومات الشخصية">
                <InfoRow label="الاسم الكامل" value={volunteer.fullName} />
                <InfoRow label="البريد الإلكتروني" value={volunteer.email} />
                <InfoRow label="المدينة" value={`${volunteer.city}, ${volunteer.country}`} />
                <InfoRow label="تاريخ الميلاد" value={volunteer.birthDate} />
             </ProfileSection>

             <ProfileSection title="المؤهلات والخلفية الأكاديمية">
                <InfoRow label="المؤهل العلمي" value={volunteer.academicQualification} />
                <InfoRow label="التخصص" value={volunteer.specialization} />
                {volunteer.university && <InfoRow label="الجامعة" value={volunteer.university} />}
                <InfoRow label="سنة التخرج" value={volunteer.graduationYear} />
             </ProfileSection>

            <ProfileSection title="الخبرة العملية والمهنية">
                <InfoRow 
                    label="الوظيفة الحالية" 
                    value={
                        <span>
                            {volunteer.currentJobTitle || 'غير محدد'} 
                            {volunteer.currentEmployer && <span className="text-gray-500"> لدى {volunteer.currentEmployer}</span>}
                        </span>
                    } 
                />
                <InfoRow label="سنوات الخبرة" value={volunteer.experienceYears} />
                <InfoRow label="المهارات" value={
                    <div className="flex flex-wrap gap-2">
                        {volunteer.skills.map(skill => (
                            <span key={skill} className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded-md">{skill}</span>
                        ))}
                    </div>
                } />
                {volunteer.tools && volunteer.tools.length > 0 && (
                    <InfoRow label="الأدوات" value={
                        <div className="flex flex-wrap gap-2">
                            {volunteer.tools.map(tool => (
                                <span key={tool} className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded-md">{tool}</span>
                            ))}
                        </div>
                    } />
                )}
                 <InfoRow label="اللغات" value={
                    <ul className="space-y-1.5">
                        {volunteer.languages.map(lang => (
                           <li key={lang.language} className="flex items-center gap-2">
                             <span>{lang.language}</span>
                             <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full font-medium">{lang.level}</span>
                           </li>
                        ))}
                    </ul>
                } />
                {volunteer.certifications && volunteer.certifications.length > 0 && (
                    <InfoRow label="الشهادات المهنية" value={
                        <ul className="space-y-1 list-disc list-inside">
                            {volunteer.certifications.map(cert => (
                               <li key={cert}>{cert}</li>
                            ))}
                        </ul>
                    } />
                )}
                {volunteer.portfolioLink && (
                    <InfoRow label="ملف الأعمال" value={
                        <a href={volunteer.portfolioLink} target="_blank" rel="noopener noreferrer" className="text-taww-primary hover:underline flex items-center gap-1.5 break-all">
                            <span>{volunteer.portfolioLink}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 flex-shrink-0"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                        </a>
                    } />
                )}
            </ProfileSection>
        </div>
    )
}

const VolunteeringInterestsTab: React.FC<{ volunteer: Volunteer }> = ({ volunteer }) => {
    return (
        <div className="space-y-8">
             <ProfileSection title="الاهتمامات والمجالات التطوعية">
                <InfoRow label="المجالات المفضلة" value={volunteer.preferredFields.join('، ')} />
                {volunteer.interestedSectors && <InfoRow label="القطاعات المهتم بها" value={volunteer.interestedSectors.join('، ')} />}
                <InfoRow label="نمط العمل المفضل" value={volunteer.preferredWorkType} />
                <InfoRow label="المدة المناسبة" value={volunteer.commitmentDuration} />
                <InfoRow label="الساعات الأسبوعية" value={volunteer.availableHoursPerWeek} />
             </ProfileSection>

             <ProfileSection title="الجاهزية والالتزام">
                <InfoRow label="تاريخ الجاهزية" value={volunteer.availabilityDate} />
                <InfoRow label="مستوى الالتزام" value={<StarRating rating={volunteer.commitmentLevel} />} />
                <InfoRow label="الدافع للتطوع" value={<p className="italic">"{volunteer.motivation}"</p>} />
             </ProfileSection>
        </div>
    )
}

const HistoryTab: React.FC<{ volunteer: Volunteer, onRateClick: (opp: Opportunity) => void }> = ({ volunteer, onRateClick }) => {
    const userBadges = BADGES.filter(b => volunteer.badges.includes(b.id));
    const volunteerHistory = volunteer.registeredOpportunities
      .map(regOpp => {
        const opportunityDetails = OPPORTUNITIES.find(opp => opp.id === regOpp.opportunityId);
        // FIX: Renamed 'status' to 'registrationStatus' to avoid type conflict with Opportunity.status
        return opportunityDetails ? { ...opportunityDetails, registrationStatus: regOpp.status } : null;
      })
      .filter((item): item is NonNullable<typeof item> => item !== null)
      .sort((a, b) => new Date(b.startDate || 0).getTime() - new Date(a.startDate || 0).getTime());
    
    const statusInfo: { [key in OpportunityStatus]: { style: string; icon: React.ReactNode } } = {
        [OpportunityStatus.COMPLETED]: { style: 'text-green-600 bg-green-100', icon: <CheckBadgeIcon className="h-5 w-5" /> },
        [OpportunityStatus.REGISTERED]: { style: 'text-blue-600 bg-blue-100', icon: <DocumentTextIcon className="h-5 w-5" /> },
        [OpportunityStatus.CANCELLED]: { style: 'text-gray-600 bg-gray-200', icon: <XCircleIcon className="h-5 w-5" /> },
    };

    return (
        <div className="space-y-8">
            <div className="bg-white rounded-2xl">
                <h2 className="text-lg font-bold mb-4 text-taww-primary">أوسمتي</h2>
                {userBadges.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {userBadges.map(badge => <Badge key={badge.id} badge={badge} />)}
                </div>
                ) : (
                <p className="text-gray-500 text-center py-8">ليس لديك أي أوسمة بعد.</p>
                )}
            </div>

            <div className="bg-white rounded-2xl">
                <h2 className="text-lg font-bold mb-4 text-taww-primary">سجلي التطوعي</h2>
                {volunteerHistory.length > 0 ? (
                    <ul className="space-y-4">
                    {volunteerHistory.map((opp) => (
                        <li 
                        key={opp.id} 
                        className="bg-gray-50 p-4 rounded-lg flex flex-col sm:flex-row justify-between items-center gap-4 transition-all duration-200 hover:bg-gray-100 hover:shadow-sm"
                        >
                        <div className="flex-grow text-center sm:text-right">
                            <h3 className="font-semibold text-gray-800">{opp.title}</h3>
                            <p className="text-sm text-gray-500">{opp.organization} - {new Date(opp.startDate || 0).getFullYear()}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            {/* FIX: Use 'registrationStatus' property */}
                            <span className={`flex items-center gap-2 text-sm font-bold px-3 py-1 rounded-full ${statusInfo[opp.registrationStatus].style}`}>
                            {statusInfo[opp.registrationStatus].icon}
                            <span>{opp.registrationStatus}</span>
                            </span>
                            {/* FIX: Use 'registrationStatus' property */}
                            {opp.registrationStatus === OpportunityStatus.COMPLETED && !volunteer.reviewedOpportunityIds.includes(opp.id) && (
                                <button
                                    onClick={() => onRateClick(opp)}
                                    className="flex items-center gap-2 text-sm font-semibold text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full hover:bg-yellow-200 transition-colors btn-press"
                                >
                                    <FilledStarIcon className="w-4 h-4" />
                                    <span>قيّم الفرصة</span>
                                </button>
                            )}
                        </div>
                        </li>
                    ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 text-center py-8">لا يوجد أي نشاط في سجلك التطوعي بعد.</p>
                )}
            </div>
        </div>
    )
}

const LeaderboardTab: React.FC<{ currentUser: Volunteer }> = ({ currentUser }) => {
    const [sortBy, setSortBy] = useState<'points' | 'hours'>('points');

    const sortedVolunteers = useMemo(() => {
        const volunteers = [...LEADERBOARD_VOLUNTEERS];
        
        if (!volunteers.some(v => v.id === currentUser.id)) {
            // make sure we have a compatible object
            const currentUserForBoard: Volunteer = { ...LEADERBOARD_VOLUNTEERS[0], ...currentUser};
            volunteers.push(currentUserForBoard);
        }

        return volunteers.sort((a, b) => {
            if (sortBy === 'points') {
                return b.points - a.points;
            }
            return b.hours - a.hours;
        });
    }, [sortBy, currentUser]);

    const rankMedals: { [key: number]: string } = { 1: '🥇', 2: '🥈', 3: '🥉' };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
                <h2 className="text-xl font-bold text-taww-primary">لوحة الترتيب</h2>
                <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-full self-start sm:self-auto">
                    <button onClick={() => setSortBy('points')} className={`px-3 py-1 text-sm font-semibold rounded-full flex items-center gap-1 ${sortBy === 'points' ? 'bg-white text-taww-primary shadow' : 'text-gray-600'}`}>
                        <FireIcon className="w-4 h-4" /> النقاط
                    </button>
                    <button onClick={() => setSortBy('hours')} className={`px-3 py-1 text-sm font-semibold rounded-full flex items-center gap-1 ${sortBy === 'hours' ? 'bg-white text-taww-primary shadow' : 'text-gray-600'}`}>
                        <ClockIcon className="w-4 h-4" /> الساعات
                    </button>
                </div>
            </div>
            <ul className="space-y-3">
                {sortedVolunteers.map((v, index) => (
                    <li key={v.id} className={`flex items-center gap-4 p-3 rounded-lg transition-all ${v.id === currentUser.id ? 'bg-taww-primary/10 scale-[1.02] shadow-sm' : 'hover:bg-gray-50'}`}>
                        <span className="font-bold text-gray-500 text-lg w-6 text-center">{rankMedals[index + 1] || index + 1}</span>
                        <img src={v.id === currentUser.id ? (v.profilePictureUrl || `https://i.pravatar.cc/150?u=${v.id}`) : 'https://i.postimg.cc/k53xS5T0/mttwʿ.png'} alt={v.fullName} className="w-12 h-12 rounded-full ring-2 ring-white" />
                        <div className="flex-grow">
                            <p className={`font-bold ${v.id === currentUser.id ? 'text-taww-primary' : 'text-gray-800'}`}>{v.fullName}</p>
                            {v.id === currentUser.id && <p className="text-sm text-gray-500">أنت</p>}
                        </div>
                        <div className="text-right">
                            <p className="font-extrabold text-lg text-taww-secondary">{sortBy === 'points' ? v.points.toLocaleString('ar-EG') : v.hours}</p>
                            <p className="text-xs text-gray-400">{sortBy === 'points' ? 'نقطة' : 'ساعة'}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};


const Profile: React.FC = () => {
    const { volunteer, isAuthenticated, logout, submitReview, updateVolunteer } = useVolunteer();
    const [opportunityToRate, setOpportunityToRate] = useState<Opportunity | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'profile' | 'interests' | 'history' | 'leaderboard'>('profile');

    if (!isAuthenticated) return <Login />;
    if (!volunteer) return <div className="text-center p-8">...جاري تحميل بيانات الملف الشخصي</div>;

    const handleSubmitRating = (rating: number, comment: string) => {
        if (opportunityToRate) {
            submitReview(opportunityToRate.id, rating, comment);
        }
        setOpportunityToRate(null);
    };

    const handleSaveProfile = (updatedData: Volunteer) => {
        updateVolunteer(updatedData);
        setIsEditModalOpen(false);
    };

    const tabs = [
        { id: 'profile', label: 'الملف الشخصي', icon: <UserIcon className="w-5 h-5"/> },
        { id: 'interests', label: 'اهتماماتي', icon: <LightBulbIcon className="w-5 h-5"/> },
        { id: 'history', label: 'سجلي', icon: <CalendarIcon className="w-5 h-5"/> },
        { id: 'leaderboard', label: 'الترتيب', icon: <img src="https://i.postimg.cc/LXrR9r9f/leaderboard.png" alt="الترتيب" className="w-5 h-5" /> },
    ];

    return (
        <>
            <div className="container mx-auto px-4 sm:px-6 py-8 animate-fadeInUp">
                <div className="absolute top-6 left-6 z-10">
                    <button 
                        onClick={logout}
                        className="bg-red-50 text-red-600 font-semibold py-2 px-3 rounded-lg hover:bg-red-100 transition-all duration-300 btn-press flex items-center text-sm"
                        aria-label="تسجيل الخروج"
                    >
                        <LogoutIcon className="h-5 w-5 ml-2" />
                        <span>خروج</span>
                    </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <VolunteerIdCard volunteer={volunteer} onEdit={() => setIsEditModalOpen(true)} />
                    </div>
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="border-b border-gray-200">
                                <div className="overflow-x-auto">
                                    <nav className="flex -mb-px px-4 sm:px-6 space-x-4 space-x-reverse whitespace-nowrap" aria-label="Tabs">
                                        {tabs.map(tab => (
                                            <button
                                                key={tab.id}
                                                onClick={() => setActiveTab(tab.id as any)}
                                                className={`
                                                    ${activeTab === tab.id
                                                        ? 'border-taww-primary text-taww-primary'
                                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                                    }
                                                    flex items-center gap-2 whitespace-nowrap py-4 px-3 border-b-2 font-medium text-sm transition-colors
                                                `}
                                            >
                                                {tab.icon} {tab.label}
                                            </button>
                                        ))}
                                    </nav>
                                </div>
                            </div>
                            <div className="p-4 sm:p-6">
                                {activeTab === 'profile' && <ProfileDetailsTab volunteer={volunteer} />}
                                {activeTab === 'interests' && <VolunteeringInterestsTab volunteer={volunteer} />}
                                {activeTab === 'history' && <HistoryTab volunteer={volunteer} onRateClick={setOpportunityToRate} />}
                                {activeTab === 'leaderboard' && <LeaderboardTab currentUser={volunteer} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {opportunityToRate && (
                <RatingModal
                    opportunityTitle={opportunityToRate.title}
                    onClose={() => setOpportunityToRate(null)}
                    onSubmit={handleSubmitRating}
                />
            )}
            {isEditModalOpen && (
                 <EditProfileModal
                    volunteer={volunteer}
                    onClose={() => setIsEditModalOpen(false)}
                    onSave={handleSaveProfile}
                />
            )}
        </>
    );
};

export default Profile;