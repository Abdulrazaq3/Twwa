import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Volunteer, Opportunity, OpportunityStatus, AcademicQualification, ExperienceYears } from '../types';
import { MOCK_VOLUNTEER } from '../constants';

// Data structure for the new comprehensive signup form
export type SignupData = Pick<
  Volunteer, 
  'fullName' | 'email' | 'phone' | 'birthDate' | 'city' | 'nationalId'
> & { password?: string };


interface VolunteerContextType {
  volunteer: Volunteer | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  signup: (data: SignupData) => Promise<boolean>;
  logout: () => void;
  registerForOpportunity: (opportunity: Opportunity, applicationText: string) => void;
  cancelRegistration: (opportunityId: number) => void;
  submitReview: (opportunityId: number, rating: number, comment: string) => void;
  updateVolunteer: (updatedData: Volunteer) => void;
}

const VolunteerContext = createContext<VolunteerContextType | undefined>(undefined);

export const VolunteerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [volunteer, setVolunteer] = useState<Volunteer | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email: string, pass: string): Promise<boolean> => {
    // Simulate API call and validation
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (email.toLowerCase() === 'ahmed@taww.sa' && pass === 'password123') {
      setVolunteer(MOCK_VOLUNTEER);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const signup = async (data: SignupData): Promise<boolean> => {
    // Simulate API call for registration
    await new Promise(resolve => setTimeout(resolve, 1500));
    // For this mock, we assume any new registration is successful.
    const newVolunteer: Volunteer = {
      // Use a minimal base and fill with new data
      ...MOCK_VOLUNTEER, // Using mock as a template for non-provided fields
      id: Date.now(),
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      birthDate: data.birthDate,
      city: data.city,
      nationalId: data.nationalId,
      profilePictureUrl: `https://i.pravatar.cc/150?u=${data.email}`,
      // Reset progress for a new user
      registeredOpportunities: [],
      badges: [],
      hours: 0,
      points: 0,
      reviewedOpportunityIds: [],
      // Set some sensible defaults for a new user
      academicQualification: AcademicQualification.STUDENT,
      experienceYears: ExperienceYears.ZERO_TO_ONE,
      skills: [],
      motivation: '',
      shortBio: '',
    };
    setVolunteer(newVolunteer);
    setIsAuthenticated(true);
    return true;
  };

  const logout = () => {
    setVolunteer(null);
    setIsAuthenticated(false);
  };

  const registerForOpportunity = (opportunity: Opportunity, applicationText: string) => {
    setVolunteer(currentVolunteer => {
      if (!currentVolunteer) return currentVolunteer;

      // Check if already actively registered or completed
      const isActiveRegistration = currentVolunteer.registeredOpportunities.some(o => 
        o.opportunityId === opportunity.id &&
        (o.status === OpportunityStatus.REGISTERED || o.status === OpportunityStatus.COMPLETED)
      );

      if (isActiveRegistration) {
        return currentVolunteer;
      }
      
      const newRegistration = {
        opportunityId: opportunity.id,
        status: OpportunityStatus.REGISTERED,
        applicationText,
      };

      // Remove any previous "CANCELLED" registration for the same opportunity
      const otherRegistrations = currentVolunteer.registeredOpportunities.filter(
        o => o.opportunityId !== opportunity.id
      );

      return {
        ...currentVolunteer,
        registeredOpportunities: [...otherRegistrations, newRegistration],
        // Note: Hours and points are only awarded for 'COMPLETED' opportunities.
      };
    });
  };
  
  const cancelRegistration = (opportunityId: number) => {
    setVolunteer(currentVolunteer => {
      if (!currentVolunteer) return currentVolunteer;
      
      const updatedOpportunities = currentVolunteer.registeredOpportunities.map(regOpp => {
        if (regOpp.opportunityId === opportunityId && regOpp.status === OpportunityStatus.REGISTERED) {
          return { ...regOpp, status: OpportunityStatus.CANCELLED };
        }
        return regOpp;
      });

      return {
        ...currentVolunteer,
        registeredOpportunities: updatedOpportunities,
      };
    });
  };

  const submitReview = (opportunityId: number, rating: number, comment: string) => {
    // In a real app, this would be an API call.
    // Here, we just update the local state to reflect that the user has reviewed it.
    console.log(`Submitting review for opportunity ${opportunityId}:`, { rating, comment });
    setVolunteer(currentVolunteer => {
        if (!currentVolunteer || currentVolunteer.reviewedOpportunityIds.includes(opportunityId)) {
            return currentVolunteer;
        }
        return {
            ...currentVolunteer,
            reviewedOpportunityIds: [...currentVolunteer.reviewedOpportunityIds, opportunityId],
        };
    });
  };
  
  const updateVolunteer = (updatedData: Volunteer) => {
    setVolunteer(updatedData);
  };


  return (
    <VolunteerContext.Provider value={{ volunteer, isAuthenticated, login, logout, signup, registerForOpportunity, cancelRegistration, submitReview, updateVolunteer }}>
      {children}
    </VolunteerContext.Provider>
  );
};

export const useVolunteer = (): VolunteerContextType => {
  const context = useContext(VolunteerContext);
  if (context === undefined) {
    throw new Error('useVolunteer must be used within a VolunteerProvider');
  }
  return context;
};