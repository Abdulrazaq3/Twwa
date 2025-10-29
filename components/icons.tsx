import React from 'react';

// Define a base type for icon props to ensure flexibility and type safety.
// All icons will accept any standard SVG attributes.
type IconProps = React.SVGProps<SVGSVGElement>;

export const LocationMarkerIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M12 2.25c-5.132 0-9.25 4.118-9.25 9.25 0 2.91 1.343 5.542 3.46 7.281l5.03 4.192a.75.75 0 001.02 0l5.03-4.192c2.117-1.74 3.46-4.37 3.46-7.281C21.25 6.368 17.132 2.25 12 2.25zm0 10.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
  </svg>
);

export const CalendarIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18" />
  </svg>
);

export const HomeIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" />
    </svg>
);

export const SolidHomeIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0L2.47 11.47a.75.75 0 101.06 1.06l8.94-8.95z" />
    <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198a2.25 2.25 0 01-2.25 2.25H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.25a2.25 2.25 0 01-2.25-2.25v-6.198c.03-.028.061-.056.091-.086L12 5.432z" />
  </svg>
);

export const ListIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

export const SolidListIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
  </svg>
);

export const UserIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A18.75 18.75 0 0112 22.5c-2.786 0-5.433-.62-7.499-1.732z" />
  </svg>
);

export const SolidUserIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.62-7.499-1.732a.75.75 0 01-.437-.695z" clipRule="evenodd" />
  </svg>
);

export const BellIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
  </svg>
);

export const ClockIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const BriefcaseIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.075c0 1.313-.964 2.446-2.25 2.614-1.286.168-2.527-.42-3.238-1.423-.396-.54-.396-1.286 0-1.826.711-1.004 1.952-1.591 3.238-1.423 1.286.168 2.25 1.301 2.25 2.614zm-14.5-.429c.711 1.004 1.952 1.591 3.238 1.423 1.286-.168 2.25-1.301 2.25-2.614v-4.075c0-1.313-.964-2.446-2.25-2.614-1.286-.168-2.527.42-3.238 1.423-.396.54-.396-1.286 0-1.826.711-1.004 1.952-1.591 3.238-1.423 1.286.168 2.25 1.301 2.25 2.614M6.75 8.25h10.5M6.75 12h10.5m-10.5 3.75h10.5" />
  </svg>
);

export const UsersIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962c.57-1.033 1.26-2.007 2.036-2.912.777-.905 1.636-1.742 2.554-2.433.918-.691 1.883-1.28 2.872-1.748M12 12.75a3 3 0 110-6 3 3 0 010 6zm-2.28 4.907c-1.033.57-2.007 1.26-2.912 2.036-.905.777-1.742 1.636-2.433 2.554-.691.918-1.28 1.883-1.748 2.872M4.5 12a3 3 0 110-6 3 3 0 010 6z" />
  </svg>
);

export const TargetIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.75v2.25m0 12v2.25m-8.25-8.25H6m12 0h-2.25M12 12a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
  </svg>
);

// FIX: Renamed BrainIcon to SparklesIcon to resolve naming conflicts and missing export errors.
export const SparklesIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.572L16.25 21.75l-.648-1.178a3.375 3.375 0 00-2.312-2.312L12 17.25l1.178-.648a3.375 3.375 0 002.312-2.312L16.25 13.5l.648 1.178a3.375 3.375 0 002.312 2.312L20.25 18l-1.178.648a3.375 3.375 0 00-2.312 2.312z" />
  </svg>
);

export const AwardIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a9 9 0 119 0zM16.5 18.75a9 9 0 10-9 0h9z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75v-1.5m-3.375-3.375L6.75 12l1.875-1.875M12 5.25v1.5m3.375 3.375L17.25 12l-1.875 1.875M8.25 12h7.5" />
  </svg>
);

export const SearchIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

export const CheckCircleIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const StarIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
  </svg>
);

export const FilledStarIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
  </svg>
);

export const LogoutIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
  </svg>
);

export const CheckBadgeIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12c0 1.357-.6 2.573-1.549 3.397a4.49 4.49 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
  </svg>
);

export const DocumentTextIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a.375.375 0 01-.375-.375V6.75A3.75 3.75 0 009 3H5.625zM12.75 6.188c0-1.657-1.343-3-3-3H5.625a3.375 3.375 0 00-3.375 3.375v17.25c0 1.86 1.514 3.375 3.375 3.375h12.75c1.86 0 3.375-1.514 3.375-3.375V12.75c0-2.071-1.679-3.75-3.75-3.75h-1.875V6.188z" clipRule="evenodd" />
    <path d="M14.25 6.188v1.875a1.875 1.875 0 001.875 1.875h1.875a.375.375 0 01.375.375v4.875a.375.375 0 01-.375.375h-7.5a.375.375 0 01-.375-.375V6.188c0-1.096.891-1.983 1.983-1.983h2.552c1.092 0 1.983.887 1.983 1.983z" />
  </svg>
);

export const XCircleIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 00-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
  </svg>
);

export const FireIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071 1.071L12 4.432a6.75 6.75 0 00-6.598 6.452c0 3.616 2.545 6.88 6.198 7.391a.75.75 0 00.728-.862A6.72 6.72 0 0112 17.25a6.72 6.72 0 014.286-6.316.75.75 0 00.584-1.043 6.75 6.75 0 00-4.85-4.85l.223-.224a.75.75 0 00-1.071-1.071l-1.224 1.224z" clipRule="evenodd" />
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.553 18.067a.75.75 0 01-.652.715 8.25 8.25 0 01-8.15-8.23.75.75 0 01.464-.707 8.243 8.243 0 0013.929 3.25.75.75 0 01.897.665 8.25 8.25 0 01-6.488 4.207z" clipRule="evenodd" />
  </svg>
);

export const LightBulbIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.311a.75.75 0 01-1.5 0c0-1.82 1.22-3.456 3-4.228m-3 4.228c1.78 0 3.22.19 4.5.541m-4.5-.541a12.053 12.053 0 01-4.5 0" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-1.82 0-3.5.7-4.72 2.05-.28.32-.53.67-.74 1.04l-1.08.62a11.1 11.1 0 00-2.12 6.13c0 3.03 1.22 5.78 3.21 7.74l1.08-.62a11.04 11.04 0 001.38-2.14 12.06 12.06 0 004.5 0 11.04 11.04 0 001.38 2.14l1.08.62c1.99-1.96 3.21-4.71 3.21-7.74a11.1 11.1 0 00-2.12-6.13l-1.08-.62a11.01 11.01 0 00-1.82-2.19C15.5 3.7 13.82 3 12 3z" />
  </svg>
);

export const EditIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
  </svg>
);

export const XIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const EmptyStateIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v.01" />
  </svg>
);

export const FilterIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.572a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
  </svg>
);

export const ArrowUpIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
  </svg>
);

export const GoogleIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 48 48" {...props}>
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C42.022,34.627,44,29.732,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
  </svg>
);

export const AppleIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <path d="M16.333 11.233c-.347-1.18-.832-2.317-1.427-3.393-.543-.98-1.18-1.92-1.93-2.733-.513-.553-1.073-1.033-1.687-1.42-.313-.193-.643-.36-1.01-.466-.287-.08-.57-.093-.843-.093-.28 0-.563.007-.84.093-.36.106-.69.273-1 .466-.61.387-1.173.867-1.687 1.42-.75.813-1.387 1.753-1.93 2.733-.593 1.076-1.08 2.213-1.427 3.393-.413 1.413-.64 2.873-.64 4.347 0 1.433.22 2.853.64 4.24.46.96.993 1.88 1.587 2.747.543.793 1.15 1.513 1.813 2.153.253.247.517.48.8.68.253.18.52.333.8.466.527.247 1.08.38 1.64.38s1.113-.133 1.64-.38c.28-.133.547-.287.8-.466.283-.2.547-.433.8-.68.663-.64 1.27-1.36 1.813-2.153.593-.867 1.127-1.787 1.587-2.747.42-1.387.64-2.807.64-4.24 0-1.474-.227-2.934-.64-4.347m-4.506-5.187c.213-.24.39-.506.513-.8.1-.253.153-.533.153-.833 0-.32-.053-.62-.16-.893-.113-.28-.273-.52-.493-.72-.213-.2-.46-.353-.746-.46-.28-.106-.58-.16-.893-.16-.307 0-.606.054-.893.16-.287.107-.533.26-.747.46-.22.2-.38.44-.493.72-.107.273-.16.573-.16.893 0 .3.053.58.153.833.127.294.3.56.514.8.48.547 1.033.82 1.653.82.627 0 1.18-.273 1.654-.82z"></path>
  </svg>
);

export const EyeIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.432 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);
  
export const EyeSlashIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>
);

export const LinkedinIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

export const RefreshCwIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.664 0l3.181-3.183m-11.664 0l3.181-3.183a8.25 8.25 0 00-11.664 0l3.181 3.183" />
  </svg>
);

export const GraduationCapIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path d="M12 14l9-5-9-5-9 5 9 5z" />
    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20M1 12v5a1 1 0 001 1h20a1 1 0 001-1v-5" />
  </svg>
);

export const SendIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
  </svg>
);

export const UserCircleIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const ArrowRightIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

export const QuestionMarkCircleIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
  </svg>
);

export const ClipboardIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-1.036 0-1.875.84-1.875 1.875v11.25c0 1.035.84 1.875 1.875 1.875h3.375m-3.375 0h7.5m-7.5 0c-1.036 0-1.875.84-1.875 1.875v3.375c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V19.5c0-1.035-.84-1.875-1.875-1.875m-9.75 0h9.75" />
  </svg>
);

export const ClipboardCheckIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const MyLocationIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.56 0-2.835.674-3.75 1.5M12 8.25c1.56 0 2.835.674 3.75 1.5M12 15.75v1.5m0-1.5c-1.56 0-2.835-.674-3.75-1.5M12 15.75c1.56 0 2.835-.674 3.75-1.5M8.25 12H6.75m1.5 0c0-1.56-.674-2.835-1.5-3.75m1.5 3.75c0 1.56-.674-2.835-1.5 3.75m10.5-3.75H17.25m-1.5 0c0-1.56.674-2.835 1.5-3.75m-1.5 3.75c0 1.56.674-2.835 1.5 3.75M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25z" />
    </svg>
);

export const CrownIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M18 9.333a3.375 3.375 0 01-3.375-3.375V3.375a.75.75 0 00-1.5 0V5.96a3.375 3.375 0 01-6.25 0V3.375a.75.75 0 00-1.5 0V6.01a3.375 3.375 0 01-3.375 3.375v2.85c1.23.413 2.56.635 4.015.635h.01c.453 0 .895-.03 1.328-.088a.75.75 0 00.322-1.382 13.91 13.91 0 010-2.732.75.75 0 00-.322-1.382c-.433-.058-.875-.088-1.328-.088h-.01c-1.455 0-2.785.223-4.015.635V16.5a.75.75 0 00.75.75h13.5a.75.75 0 00.75-.75v-4.317c-1.23-.412-2.56-.635-4.015-.635h-.01a15.47 15.47 0 00-1.328.088.75.75 0 00-.322 1.382c.007.03.015.06.022.09a13.91 13.91 0 010 2.552.75.75 0 00.322 1.382c.433.058.875.088 1.328.088h.01c1.455 0 2.785-.223 4.015-.635V9.333z" clipRule="evenodd" />
    </svg>
);

export const ShieldCheckIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M12.016 2.542a1.125 1.125 0 011.064 0 13.484 13.484 0 014.238 2.31 13.52 13.52 0 012.31 4.238 1.125 1.125 0 010 1.064 13.484 13.484 0 01-2.31 4.238 13.52 13.52 0 01-4.238 2.31 1.125 1.125 0 01-1.064 0 13.484 13.484 0 01-4.238-2.31 13.52 13.52 0 01-2.31-4.238 1.125 1.125 0 010-1.064 13.484 13.484 0 012.31-4.238 13.52 13.52 0 014.238-2.31zm3.828 6.55a.75.75 0 00-1.06-1.06l-3.25 3.25-1.5-1.5a.75.75 0 00-1.06 1.06l2 2a.75.75 0 001.06 0l3.75-3.75z" clipRule="evenodd" />
  </svg>
);

export const TrophyIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M16.5 2.25a.75.75 0 00-1.5 0v2.438l-2.23-2.23a.75.75 0 00-1.06 1.06L14.438 6H9.564L12.28 3.28a.75.75 0 00-1.06-1.06L9 4.688V2.25a.75.75 0 00-1.5 0v2.438L5.28 2.47a.75.75 0 00-1.06 1.06L6.562 6H3.75a.75.75 0 000 1.5h.588a4.504 4.504 0 004.295 4.158 5.268 5.268 0 00.163.268 6.75 6.75 0 0011.408 0 5.268 5.268 0 00.163-.268 4.504 4.504 0 004.295-4.158h.588a.75.75 0 000-1.5h-2.812l2.318-2.718a.75.75 0 00-1.06-1.06L16.5 4.688V2.25zM12 12.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" />
    <path d="M4.02 15.34a.75.75 0 011.037.635 3 3 0 005.906 0 .75.75 0 011.037-.635 4.5 4.5 0 014.004 4.293.75.75 0 01-.75.75H4.77a.75.75 0 01-.75-.75 4.5 4.5 0 014.004-4.293z" />
  </svg>
);