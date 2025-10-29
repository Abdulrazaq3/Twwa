
export enum OpportunityCategory {
  TECH = 'تقنية',
  DESIGN = 'تصميم',
  FINANCE = 'مالية',
  MARKETING = 'تسويق',
  ENVIRONMENTAL = 'بيئية',
  SOCIAL = 'اجتماعية',
  HEALTH = 'صحية',
  EDUCATION = 'تعليمية',
}

export enum WorkStyle {
  ONSITE = 'حضوري',
  REMOTE = 'عن بُعد',
  HYBRID = 'هجين',
}

export enum ApplicationStatus {
  OPEN = 'مفتوحة',
  REVIEWING = 'قيد الترشيح',
  CLOSED = 'مكتملة',
}

export enum ExperienceLevel {
  BEGINNER = 'مبتدئ',
  INTERMEDIATE = 'متوسط',
  EXPERT = 'محترف',
}

export enum TimeFlexibility {
  FIXED = 'ثابت',
  FLEXIBLE = 'مرن',
  AS_AGREED = 'حسب الاتفاق',
}

export enum ImpactArea {
  YOUTH = 'تمكين الشباب',
  ENVIRONMENT = 'البيئة',
  EDUCATION = 'التعليم',
  HEALTH = 'الصحة',
  SOCIAL = 'اجتماعية',
}

// --- New Enums for Professional Profile ---
export enum Gender {
  MALE = 'ذكر',
  FEMALE = 'أنثى',
  PREFER_NOT_TO_SAY = 'أفضل عدم القول',
}

export enum AcademicQualification {
  HIGH_SCHOOL = 'ثانوية عامة',
  DIPLOMA = 'دبلوم',
  BACHELOR = 'بكالوريوس',
  MASTER = 'ماجستير',
  PHD = 'دكتوراه',
  STUDENT = 'طالب حالي',
}

export enum ExperienceYears {
  ZERO_TO_ONE = '0-1 سنة',
  ONE_TO_THREE = '1-3 سنوات',
  THREE_TO_FIVE = '3-5 سنوات',
  FIVE_TO_TEN = '5-10 سنوات',
  TEN_PLUS = '10+ سنوات',
}

export enum LanguageLevel {
  BEGINNER = 'مبتدئ (A1-A2)',
  INTERMEDIATE = 'متوسط (B1-B2)',
  ADVANCED = 'متقدم (C1-C2)',
  NATIVE = 'لغة أم',
}

export enum PreferredWorkType {
  REMOTE = 'عن بعد',
  ONSITE = 'حضوري',
  HYBRID = 'مرن (هجين)',
}

export enum CommitmentDuration {
  SHORT = 'قصيرة (أقل من شهر)',
  MEDIUM = 'متوسطة (1-3 أشهر)',
  LONG = 'طويلة (أكثر من 3 أشهر)',
}


export type Opportunity = {
  id: number;
  title: string;
  organization: string;
  
  // --- Basic Info (Card) ---
  workType: string;
  workStyle: WorkStyle;
  commitment: string; 
  applicationDeadline: string; // YYYY-MM-DD
  status: ApplicationStatus;
  city?: string;
  skillTags: string[];
  isFeatured?: boolean;

  // --- Detailed Info (Modal) ---
  organizationDescription: string;
  opportunitySummary: string;
  detailedDescription: string;
  volunteerRole: string;
  tasks: string[];
  expectedDeliverables: string[];
  requiredSkills: string[];
  preferredSkills?: string[];
  experienceLevel: ExperienceLevel;
  requiredLanguages: string[];
  startDate?: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD
  timeCommitmentPerWeek?: string;
  timeFlexibility: TimeFlexibility;
  eligibility: {
    minimumAge?: number;
    interviewRequired?: boolean;
    ndaRequired?: boolean;
  };
  benefits: string[];
  socialImpact: {
    description: string;
    beneficiaries?: string;
  };
  
  // --- Platform Info & Legacy ---
  applicantsCount?: number;
  category: OpportunityCategory;
  impactArea: ImpactArea;
  imageUrl: string;
  lat: number;
  lng: number;
  rating: number; 
  reviewsCount: number; 
  points: number;
  hours: number;
};

export interface Review {
  id: number;
  opportunityId: number;
  volunteerName: string;
  volunteerImage: string;
  rating: number;
  comment: string;
}

export interface Badge {
  id: number;
  name: string;
  icon: string;
  description:string;
}

export enum OpportunityStatus {
  COMPLETED = 'مكتملة',
  REGISTERED = 'مسجلة',
  CANCELLED = 'ملغاة',
}

export interface RegisteredOpportunity {
  opportunityId: number;
  status: OpportunityStatus;
  applicationText?: string;
}

export interface VolunteerLanguage {
  language: string;
  level: LanguageLevel;
}

export interface Volunteer {
  id: number;
  
  // 1. Basic Personal Information
  fullName: string;
  email: string;
  phone: string;
  nationalId?: string; // Added field for National ID
  city: string;
  country: string;
  birthDate: string; // YYYY-MM-DD
  gender?: Gender;
  preferredLanguage: string;
  profilePictureUrl?: string;
  shortBio: string;

  // 2. Qualifications and Academic Background
  academicQualification: AcademicQualification;
  specialization: string;
  university?: string;
  graduationYear: string;

  // 3. Work and Professional Experience
  currentJobTitle?: string;
  currentEmployer?: string;
  experienceYears: ExperienceYears;
  skills: string[];
  tools?: string[];
  languages: VolunteerLanguage[];
  certifications?: string[];
  portfolioLink?: string;
  linkedinUrl?: string;

  // 4. Volunteering Interests and Fields
  preferredFields: string[];
  interestedSectors?: ImpactArea[];
  preferredWorkType: PreferredWorkType;
  commitmentDuration: CommitmentDuration;
  availableHoursPerWeek: string;
  availability?: string;

  // 5. Readiness and Commitment
  hasVolunteeredBefore: boolean;
  previousExperience?: string;
  motivation: string;
  commitmentLevel: number; // 1-5 scale
  availabilityDate: string; // YYYY-MM-DD

  // 6. Consents and Agreements
  agreedToPolicy: boolean;
  agreedToNDA: boolean;
  agreedToShareData: boolean;
  agreedToPublishName?: boolean;

  // 7. Evaluation and Volunteering Reputation (Platform-managed)
  registeredOpportunities: RegisteredOpportunity[];
  badges: number[];
  hours: number;
  points: number;
  reviewedOpportunityIds: number[];
}