import React, { useState, useMemo, useEffect, useRef } from 'react';
import { LEADERBOARD_VOLUNTEERS, MOCK_VOLUNTEER } from '../../constants';
import { Volunteer } from '../../types';
import { RefreshCwIcon, SearchIcon, FireIcon, ClockIcon, CrownIcon } from '../icons';
import AnimatedNumber from '../AnimatedNumber';

type ActiveTab = 'volunteers' | 'universities';
type UniversityStats = { name: string; totalPoints: number; totalHours: number; count: number; };

// --- Utility Functions ---
const shuffleArray = (array: any[]) => [...array].sort(() => Math.random() - 0.5);

// --- Data Aggregation for University Leaderboard ---
const aggregateUniversityData = (volunteers: Volunteer[]): UniversityStats[] => {
    const universityMap = new Map<string, { totalPoints: number; totalHours: number; count: number; }>();
    volunteers.forEach(v => {
        if (v.university) {
            const stats = universityMap.get(v.university) || { totalPoints: 0, totalHours: 0, count: 0 };
            stats.totalPoints += v.points;
            stats.totalHours += v.hours;
            stats.count += 1;
            universityMap.set(v.university, stats);
        }
    });

    const universityData = Array.from(universityMap.entries()).map(([name, stats]) => ({ name, ...stats }));
    return universityData.sort((a, b) => b.totalPoints - a.totalPoints || b.totalHours - b.totalHours || b.count - b.count);
};

// --- Child Components ---

const Confetti: React.FC = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
        {Array.from({ length: 50 }).map((_, i) => {
            const colors = ['#32c28d', '#00a86b', '#a8ff78', '#ffffff'];
            const style: React.CSSProperties = {
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 8 + 5}px`,
                height: `${Math.random() * 8 + 5}px`,
                backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                animation: `confetti-fall ${Math.random() * 2 + 1}s linear ${Math.random() * 1}s forwards`,
                position: 'absolute',
                opacity: 0,
            };
            return <div key={i} style={style} />;
        })}
    </div>
);

const Toast: React.FC<{ message: string }> = ({ message }) => (
    <div className="fixed top-24 right-1/2 translate-x-1/2 bg-white shadow-lg rounded-xl p-4 flex items-center gap-3 z-50 animate-fadeInUp border border-taww-primary/20">
        <span className="text-2xl">🎉</span>
        <p className="font-semibold text-gray-800">{message}</p>
    </div>
);

const PodiumCard: React.FC<{ rank: number; item: Volunteer | UniversityStats; type: 'volunteer' | 'university' }> = ({ rank, item, type }) => {
    const isVolunteer = type === 'volunteer' && 'fullName' in item;
    const isUniversity = type === 'university' && 'name' in item;
    const name = isVolunteer ? (item as Volunteer).fullName : (item as UniversityStats).name;
    const points = isVolunteer ? (item as Volunteer).points : (item as UniversityStats).totalPoints;
    const hours = isVolunteer ? (item as Volunteer).hours : (item as UniversityStats).totalHours;
    
    const volunteerImage = isVolunteer
        ? (item as Volunteer).id === MOCK_VOLUNTEER.id
            ? (item as Volunteer).profilePictureUrl
            : 'https://i.postimg.cc/k53xS5T0/mttwʿ.png'
        : undefined;

    const rankStyles = {
        1: { transform: 'translateY(-1rem) scale(1.1)', zIndex: 10 },
        2: { transform: 'translateX(-1rem) scale(0.95)' },
        3: { transform: 'translateX(1rem) scale(0.95)' }
    }[rank] || {};

    return (
        <div 
            className="leaderboard-glass-card rounded-xl p-4 text-center text-white transition-transform duration-500" 
            style={rankStyles}
        >
            <div className="text-3xl font-bold mb-2">{rank === 1 ? '🥇' : rank === 2 ? '🥈' : '🥉'}</div>
            {isVolunteer && <img src={volunteerImage} alt={name} className="w-16 h-16 rounded-full mx-auto mb-2 ring-2 ring-white/30"/>}
            <h3 className="font-bold truncate">{name}</h3>
            <div className="text-sm opacity-80 mt-2 space-y-1">
                <p>{points.toLocaleString('ar-SA')} نقطة</p>
                <p className="flex items-center justify-center gap-1"><ClockIcon className="w-4 h-4" /> {hours} ساعة</p>
            </div>
        </div>
    );
};

const SkeletonRow: React.FC<{ type: 'volunteer' | 'university' }> = ({ type }) => (
    <tr>
        <td className="px-4 py-4"><div className="skeleton-shimmer h-6 w-8 rounded-md"></div></td>
        <td className="px-4 py-4"><div className="flex items-center gap-3"><div className="skeleton-shimmer h-10 w-10 rounded-full"></div> <div className="skeleton-shimmer h-6 w-32 rounded-md"></div></div></td>
        <td className="px-4 py-4 hidden md:table-cell"><div className="skeleton-shimmer h-6 w-40 rounded-md"></div></td>
        <td className="px-4 py-4"><div className="skeleton-shimmer h-6 w-24 rounded-md"></div></td>
        <td className="px-4 py-4 hidden sm:table-cell"><div className="skeleton-shimmer h-6 w-16 rounded-md"></div></td>
        {type === 'university' && <td className="px-4 py-4 hidden md:table-cell"><div className="skeleton-shimmer h-6 w-12 rounded-md"></div></td>}
    </tr>
);

const MobileVolunteerSkeleton: React.FC = () => (
    <div className="bg-white rounded-lg shadow p-3 flex items-center gap-3">
        <div className="skeleton-shimmer h-8 w-8 rounded-md"></div>
        <div className="skeleton-shimmer h-12 w-12 rounded-full"></div>
        <div className="flex-grow space-y-2">
            <div className="skeleton-shimmer h-5 w-3/4 rounded-md"></div>
            <div className="skeleton-shimmer h-4 w-1/2 rounded-md"></div>
        </div>
        <div className="space-y-2">
             <div className="skeleton-shimmer h-5 w-12 rounded-md"></div>
             <div className="skeleton-shimmer h-4 w-10 rounded-md"></div>
        </div>
    </div>
);

const MobileUniversitySkeleton: React.FC = () => (
    <div className="bg-white rounded-lg shadow p-4 space-y-3">
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
                <div className="skeleton-shimmer h-8 w-8 rounded-md"></div>
                <div className="skeleton-shimmer h-6 w-32 rounded-md"></div>
            </div>
            <div className="skeleton-shimmer h-6 w-20 rounded-md"></div>
        </div>
        <div className="skeleton-shimmer h-2.5 w-full rounded-full"></div>
    </div>
);

const PaginationControls: React.FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const handlePrev = () => onPageChange(Math.max(1, currentPage - 1));
  const handleNext = () => onPageChange(Math.min(totalPages, currentPage + 1));

  return (
    <div className="flex justify-center items-center gap-3 mt-6">
      <button onClick={handleNext} disabled={currentPage === totalPages} className="px-4 py-2 text-sm font-semibold rounded-lg bg-white border disabled:opacity-50 disabled:cursor-not-allowed btn-press">
        التالي
      </button>
      <span className="text-sm font-medium text-gray-600">
        صفحة {currentPage} من {totalPages}
      </span>
      <button onClick={handlePrev} disabled={currentPage === 1} className="px-4 py-2 text-sm font-semibold rounded-lg bg-white border disabled:opacity-50 disabled:cursor-not-allowed btn-press">
        السابق
      </button>
    </div>
  );
};


// --- Volunteers Board Component ---
const VolunteersBoard: React.FC<{ volunteers: Volunteer[], isLoading: boolean }> = ({ volunteers, isLoading }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState<'none' | 'top10' | 'plus50'>('none');
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 10;

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, activeFilter]);

    const sortedVolunteers = useMemo(() => 
        [...volunteers].sort((a, b) => b.points - a.points || b.hours - a.hours || a.fullName.localeCompare(b.fullName)),
    [volunteers]);
    
    const filteredVolunteers = useMemo(() => {
        let list = sortedVolunteers;
        if (activeFilter === 'top10') list = list.slice(0, 10);
        if (activeFilter === 'plus50') list = list.filter(v => v.hours >= 50);

        return list.filter(v => v.fullName.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [searchTerm, sortedVolunteers, activeFilter]);
    
    const totalPages = Math.ceil(filteredVolunteers.length / ITEMS_PER_PAGE);
    const paginatedVolunteers = filteredVolunteers.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const podiumData = sortedVolunteers.slice(0, 3);
    const filterChips = [
        { id: 'none', label: 'الكل' },
        { id: 'top10', label: 'Top 10' },
        { id: 'plus50', label: '+50 ساعة' },
    ];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-3 gap-2 items-end justify-center px-1 overflow-x-hidden">
                 {podiumData[1] && <PodiumCard rank={2} item={podiumData[1]} type="volunteer" />}
                 {podiumData[0] && <PodiumCard rank={1} item={podiumData[0]} type="volunteer" />}
                 {podiumData[2] && <PodiumCard rank={3} item={podiumData[2]} type="volunteer" />}
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative w-full md:flex-grow">
                    <input type="text" placeholder="ابحث عن متطوع..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-taww-primary focus:border-taww-primary"/>
                    <SearchIcon className="absolute top-1/2 left-3 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
                <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
                   {filterChips.map(chip => (
                       <button 
                           key={chip.id}
                           onClick={() => setActiveFilter(chip.id as any)}
                           className={`px-3 py-1.5 text-sm font-semibold rounded-md transition-all duration-200 ${activeFilter === chip.id ? 'bg-white text-taww-primary shadow-sm' : 'text-gray-600 hover:bg-white/60'}`}
                        >{chip.label}</button>
                   ))}
                </div>
            </div>
            
            {/* Desktop Table */}
            <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200/50 hidden md:block">
                <table className="w-full text-sm text-right">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50/70 sticky top-0 backdrop-blur-sm z-10" style={{ borderBottom: '2px solid', borderImage: 'linear-gradient(90deg, var(--brand-3), var(--brand-1), var(--brand-2)) 1' }}>
                        <tr>
                            <th scope="col" className="px-4 py-3 text-center w-16">المركز</th>
                            <th scope="col" className="px-4 py-3">المتطوع</th>
                            <th scope="col" className="px-4 py-3">الجامعة</th>
                            <th scope="col" className="px-4 py-3">النقاط</th>
                            <th scope="col" className="px-4 py-3">الساعات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                           Array.from({length: 10}).map((_, i) => <SkeletonRow key={i} type="volunteer" />)
                        ) : paginatedVolunteers.length > 0 ? (
                           paginatedVolunteers.map((v) => {
                            const rank = sortedVolunteers.findIndex(sv => sv.id === v.id) + 1;
                            return (
                                <tr key={v.id}
                                    className="border-b bg-white hover:bg-green-50/50 transition-all duration-200 hover:shadow-inner hover:-translate-y-0.5"
                                    aria-label={`المركز ${rank}، ${v.fullName}، ${v.points} نقطة، ${v.hours} ساعة`}
                                >
                                    <td className="px-4 py-3 font-bold text-lg text-gray-800 text-center">
                                        {rank === 1 ? <CrownIcon className="w-8 h-8 mx-auto text-yellow-500 crown-glow" /> : rank === 2 ? '🥈' : rank === 3 ? '🥉' : rank}
                                    </td>
                                    <td className="px-4 py-3 font-semibold text-gray-900 flex items-center gap-3">
                                        <img src={v.id === MOCK_VOLUNTEER.id ? v.profilePictureUrl : 'https://i.postimg.cc/k53xS5T0/mttwʿ.png'} alt={v.fullName} className="w-10 h-10 rounded-full ring-2 ring-gray-100" />
                                        <span className="truncate">{v.fullName}</span>
                                    </td>
                                    <td className="px-4 py-3 truncate">{v.university || 'غير محدد'}</td>
                                    <td className="px-4 py-3 font-bold text-taww-primary flex items-center gap-1.5"><FireIcon className="w-4 h-4 text-orange-400"/> {v.points.toLocaleString('ar-SA')}</td>
                                    <td className="px-4 py-3 font-bold text-taww-secondary flex items-center gap-1.5"><ClockIcon className="w-4 h-4 text-blue-400"/> {v.hours}</td>
                                </tr>
                            );
                        })) : (
                           <tr><td colSpan={5} className="text-center py-12 text-gray-500">لا توجد بيانات تطابق بحثك.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
            
            {/* Mobile Cards */}
            <div className="space-y-3 md:hidden">
              {isLoading ? (
                  Array.from({length: 5}).map((_, i) => <MobileVolunteerSkeleton key={i} />)
              ) : paginatedVolunteers.length > 0 ? (
                  paginatedVolunteers.map((v) => {
                      const rank = sortedVolunteers.findIndex(sv => sv.id === v.id) + 1;
                      return (
                          <div key={v.id}
                               className="bg-white rounded-lg shadow p-3 flex items-center gap-3 transition-transform hover:scale-[1.02]"
                               aria-label={`المركز ${rank}، ${v.fullName}، ${v.points} نقطة، ${v.hours} ساعة`}
                          >
                              <div className="font-bold text-lg text-gray-800 text-center w-8">
                                  {rank === 1 ? <CrownIcon className="w-7 h-7 mx-auto text-yellow-500 crown-glow" /> : rank === 2 ? '🥈' : rank === 3 ? '🥉' : rank}
                              </div>
                              <img src={v.id === MOCK_VOLUNTEER.id ? v.profilePictureUrl : 'https://i.postimg.cc/k53xS5T0/mttwʿ.png'} alt={v.fullName} className="w-12 h-12 rounded-full" />
                              <div className="flex-grow truncate">
                                  <p className="font-bold text-gray-900 truncate">{v.fullName}</p>
                                  <p className="text-xs text-gray-500 truncate">{v.university || 'غير محدد'}</p>
                              </div>
                              <div className="text-left flex-shrink-0">
                                  <p className="font-bold text-taww-primary flex items-center justify-end gap-1">{v.points.toLocaleString('ar-SA')} <FireIcon className="w-4 h-4 text-orange-400"/></p>
                                  <p className="text-xs text-taww-secondary flex items-center justify-end gap-1">{v.hours} <ClockIcon className="w-3 h-3 text-blue-400"/></p>
                              </div>
                          </div>
                      );
                  })
              ) : (
                  <div className="text-center py-12 text-gray-500 bg-white rounded-lg shadow">لا توجد بيانات تطابق بحثك.</div>
              )}
            </div>

            <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
    );
};


// --- University Board Component ---
const UniversityBoard: React.FC<{ universities: UniversityStats[], isLoading: boolean }> = ({ universities, isLoading }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 10;
    const totalPages = Math.ceil(universities.length / ITEMS_PER_PAGE);
    const paginatedUniversities = universities.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
    
    const maxPoints = universities[0]?.totalPoints || 1;
    const podiumData = universities.slice(0, 3);
    
    return (
       <div className="space-y-6">
           <div className="grid grid-cols-3 gap-2 items-end justify-center px-1 overflow-x-hidden">
                 {podiumData[1] && <PodiumCard rank={2} item={podiumData[1]} type="university" />}
                 {podiumData[0] && <PodiumCard rank={1} item={podiumData[0]} type="university" />}
                 {podiumData[2] && <PodiumCard rank={3} item={podiumData[2]} type="university" />}
            </div>

            {/* Desktop Table */}
            <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200/50 hidden md:block">
                <table className="w-full text-sm text-right">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50/70 sticky top-0 backdrop-blur-sm z-10" style={{ borderBottom: '2px solid', borderImage: 'linear-gradient(90deg, var(--brand-3), var(--brand-1), var(--brand-2)) 1' }}>
                        <tr>
                            <th scope="col" className="px-4 py-3 text-center w-16">المركز</th>
                            <th scope="col" className="px-4 py-3">الجامعة</th>
                            <th scope="col" className="px-4 py-3">النسبة</th>
                            <th scope="col" className="px-4 py-3">النقاط</th>
                            <th scope="col" className="px-4 py-3">الساعات</th>
                            <th scope="col" className="px-4 py-3">المتطوعون</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            Array.from({length: 10}).map((_, i) => <SkeletonRow key={i} type="university" />)
                        ) : paginatedUniversities.length > 0 ? (
                            paginatedUniversities.map((uni, index) => {
                                const rank = universities.findIndex(u => u.name === uni.name) + 1;
                                const percentage = (uni.totalPoints / maxPoints) * 100;
                                return (
                                    <tr key={uni.name} 
                                        className="border-b bg-white hover:bg-green-50/50 transition-all duration-200 hover:shadow-inner hover:-translate-y-0.5"
                                        aria-label={`المركز ${rank}, ${uni.name}, ${uni.totalPoints} نقطة`}>
                                        <td className="px-4 py-3 font-bold text-lg text-gray-800 text-center">{rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : rank}</td>
                                        <td className="px-4 py-3 font-semibold text-gray-900 truncate">{uni.name}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <div className="w-full bg-gray-200/70 rounded-full h-2.5 relative">
                                                    <div className="bg-gradient-to-r from-taww-secondary to-taww-primary h-2.5 rounded-full" style={{ width: `${percentage}%`, borderTop: '1px solid var(--brand-3)' }}></div>
                                                </div>
                                                <span className="text-xs font-mono text-gray-600 w-10 text-left"><AnimatedNumber value={Math.round(percentage)} duration={600} />%</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 font-bold text-taww-primary">{uni.totalPoints.toLocaleString('ar-SA')}</td>
                                        <td className="px-4 py-3">{uni.totalHours.toLocaleString('ar-SA')}</td>
                                        <td className="px-4 py-3">
                                            <span className="flex items-center gap-1.5">
                                                <img src="https://i.postimg.cc/k53xS5T0/mttwʿ.png" alt="متطوع" className="w-4 h-4" />
                                                {uni.count}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr><td colSpan={6} className="text-center py-12 text-gray-500">لا توجد بيانات لعرضها.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="space-y-3 md:hidden">
              {isLoading ? (
                Array.from({length: 5}).map((_, i) => <MobileUniversitySkeleton key={i} />)
              ) : paginatedUniversities.length > 0 ? (
                paginatedUniversities.map((uni) => {
                    const rank = universities.findIndex(u => u.name === uni.name) + 1;
                    const percentage = (uni.totalPoints / maxPoints) * 100;
                    return (
                        <div key={uni.name}
                             className="bg-white rounded-lg shadow p-4 space-y-3"
                             aria-label={`المركز ${rank}, ${uni.name}, ${uni.totalPoints} نقطة`}>
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                    <div className="font-bold text-lg text-gray-800 text-center w-8">{rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : rank}</div>
                                    <h4 className="font-bold text-gray-900">{uni.name}</h4>
                                </div>
                                <div className="font-bold text-taww-primary text-lg text-left">{uni.totalPoints.toLocaleString('ar-SA')}</div>
                            </div>
                            <div className="w-full bg-gray-200/70 rounded-full h-2.5 relative">
                                <div className="bg-gradient-to-r from-taww-secondary to-taww-primary h-2.5 rounded-full" style={{ width: `${percentage}%`, borderTop: '1px solid var(--brand-3)' }}></div>
                            </div>
                             <div className="flex justify-around items-center text-xs text-gray-600 pt-1">
                                <span className="flex items-center gap-1.5"><ClockIcon className="w-3.5 h-3.5"/> {uni.totalHours.toLocaleString('ar-SA')} ساعة</span>
                                <span className="flex items-center gap-1.5"><img src="https://i.postimg.cc/k53xS5T0/mttwʿ.png" alt="متطوع" className="w-3.5 h-3.5" /> {uni.count} متطوع</span>
                                <span className="font-mono text-gray-600"><AnimatedNumber value={Math.round(percentage)} duration={600} />%</span>
                             </div>
                        </div>
                    );
                })
              ) : (
                <div className="text-center py-12 text-gray-500 bg-white rounded-lg shadow">لا توجد بيانات لعرضها.</div>
              )}
            </div>
            
            <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
       </div>
    );
};


// --- Main Leaderboard Page ---
const Leaderboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<ActiveTab>('volunteers');
    const [isLoading, setIsLoading] = useState(true);
    const [showConfetti, setShowConfetti] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
    const currentUserRef = useRef<Volunteer | null>(MOCK_VOLUNTEER);
    const previousRankRef = useRef<number | null>(null);
    
    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setVolunteers(LEADERBOARD_VOLUNTEERS);
            setIsLoading(false);
        }, 1200);
    }, []);

    const universityData = useMemo(() => aggregateUniversityData(volunteers), [volunteers]);

    const handleUpdate = () => {
        setIsLoading(true);
        
        const sortedVolunteers = [...volunteers].sort((a,b) => b.points - a.points);
        const currentUserRank = sortedVolunteers.findIndex(v => v.id === currentUserRef.current?.id) + 1;
        previousRankRef.current = currentUserRank > 0 ? currentUserRank : null;

        setTimeout(() => {
            const updatedVolunteers = shuffleArray(volunteers).map(v => {
                // Simulate points change for some volunteers
                if (Math.random() > 0.5) return { ...v, points: v.points + Math.floor(Math.random() * 50) };
                return v;
            });
            setVolunteers(updatedVolunteers);
            setIsLoading(false);

            const newSorted = [...updatedVolunteers].sort((a,b) => b.points - a.points);
            const newRank = newSorted.findIndex(v => v.id === currentUserRef.current?.id) + 1;

            if (previousRankRef.current && newRank > 0 && newRank < previousRankRef.current) {
                setToastMessage(`مبروك! تقدّمت إلى المركز #${newRank}`);
                setShowConfetti(true);
                setTimeout(() => {
                    setShowConfetti(false);
                    setToastMessage(null);
                }, 3000);
            }

        }, 1200);
    };

    return (
        <div className="relative container mx-auto px-4 sm:px-6 py-8 animate-fadeInUp">
            {showConfetti && <Confetti />}
            {toastMessage && <Toast message={toastMessage} />}

            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h1 className="text-3xl font-extrabold text-taww-primary">لوحة المراكز</h1>
                <button 
                    onClick={handleUpdate}
                    className="flex items-center gap-2 bg-white text-gray-700 font-semibold py-2 px-4 rounded-lg shadow-sm border hover:bg-gray-100 transition-colors btn-press btn-grad"
                >
                    <RefreshCwIcon className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
                    <span>تحديث البيانات</span>
                </button>
            </div>
            
            <div className="bg-white/50 p-1.5 rounded-xl shadow-sm border flex mb-6">
                <button
                    onClick={() => setActiveTab('volunteers')}
                    className={`w-1/2 py-3 rounded-lg text-base font-bold transition-all duration-300 flex items-center justify-center gap-2 ${activeTab === 'volunteers' ? 'bg-white text-taww-primary shadow' : 'text-gray-600'}`}
                >
                    <img src="https://i.postimg.cc/k53xS5T0/mttwʿ.png" alt="المتطوعين" className="w-5 h-5"/>
                    مراكز المتطوعين
                </button>
                <button
                    onClick={() => setActiveTab('universities')}
                    className={`w-1/2 py-3 rounded-lg text-base font-bold transition-all duration-300 flex items-center justify-center gap-2 ${activeTab === 'universities' ? 'bg-white text-taww-primary shadow' : 'text-gray-600'}`}
                >
                    <img src="https://i.postimg.cc/RZFMT1DN/university.png" alt="الجامعات" className="w-5 h-5" />
                    مراكز الجامعات
                </button>
            </div>
            
            <div key={activeTab} className="animate-slide-fade-in">
                {activeTab === 'volunteers' ? <VolunteersBoard volunteers={volunteers} isLoading={isLoading} /> : <UniversityBoard universities={universityData} isLoading={isLoading} />}
            </div>
        </div>
    );
};

export default Leaderboard;