import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, ListIcon, UserIcon, SolidHomeIcon, SolidListIcon, SolidUserIcon } from './icons';
import { NAV_LINKS } from '../constants';

const IconForPath = ({ path, className, isActive }: { path: string; className?: string; isActive: boolean }) => {
    const link = NAV_LINKS.find(l => l.path === path);
    switch (link?.icon) {
        case 'HomeIcon':
            return isActive ? <SolidHomeIcon className={className} /> : <HomeIcon className={className} />;
        case 'ListIcon':
            return isActive ? <SolidListIcon className={className} /> : <ListIcon className={className} />;
        case 'UserIcon':
            return isActive ? <SolidUserIcon className={className} /> : <UserIcon className={className} />;
        case 'LeaderboardIcon':
            return <img src="https://i.postimg.cc/LXrR9r9f/leaderboard.png" alt={link.name} className={`${className} transition-all ${!isActive ? 'grayscale opacity-70' : ''}`} />;
        default:
            return null;
    }
};

const BottomNav: React.FC = () => {
    const mainNavLinks = NAV_LINKS.filter(link => link.path !== '/ai-assistant');
    const middleIndex = Math.floor(mainNavLinks.length / 2);

    return (
        <nav className="fixed bottom-0 right-0 left-0 w-full z-50 md:hidden h-24">
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-white/90 backdrop-blur-md border-t border-gray-200 shadow-t-lg">
                <div className="flex justify-around items-center h-full">
                    {mainNavLinks.slice(0, middleIndex).map(link => (
                         <NavLink
                            key={link.path}
                            to={link.path}
                            end={link.path === '/'}
                            className="group flex flex-col items-center justify-center flex-1 pt-1 text-sm transition-all duration-300 ease-out"
                        >
                            {({ isActive }) => (
                                <>
                                    <IconForPath path={link.path} className="h-6 w-6 mb-0.5" isActive={isActive} />
                                    <span className={`font-medium ${isActive ? 'text-taww-primary' : 'text-gray-500'}`}>{link.name}</span>
                                </>
                            )}
                        </NavLink>
                    ))}

                    <div key="placeholder" className="flex-1"></div>
                    
                    {mainNavLinks.slice(middleIndex).map(link => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            end={link.path === '/'}
                             className="group flex flex-col items-center justify-center flex-1 pt-1 text-sm transition-all duration-300 ease-out"
                        >
                             {({ isActive }) => (
                                <>
                                    <IconForPath path={link.path} className="h-6 w-6 mb-0.5" isActive={isActive} />
                                    <span className={`font-medium ${isActive ? 'text-taww-primary' : 'text-gray-500'}`}>{link.name}</span>
                                </>
                            )}
                        </NavLink>
                    ))}
                </div>
            </div>

            <div className="absolute top-0 left-1/2 -translate-x-1/2">
                 <NavLink
                    to="/ai-assistant"
                    className={({ isActive }) =>
                        `h-16 w-16 flex items-center justify-center rounded-full shadow-lg transition-all duration-300 btn-press transform hover:scale-110 ${
                            isActive ? 'bg-taww-primary shadow-taww-primary/50' : 'bg-taww-secondary'
                        }`
                    }
                    aria-label="المساعد الذكي"
                >
                    <img src="https://i.postimg.cc/qqvxXyTY/lwqw-twʿ.png" alt="المساعد الذكي" className="h-10 w-10" />
                </NavLink>
            </div>
        </nav>
    );
};

export default BottomNav;