

import React, { useState } from 'react';
import { Volunteer, ExperienceYears } from '../types';
import { XIcon } from './icons';
import { extractInfoFromCV } from '../services/geminiService';

interface EditProfileModalProps {
  volunteer: Volunteer;
  onClose: () => void;
  onSave: (updatedVolunteer: Volunteer) => void;
}

const FormSection: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div>
        <h3 className="text-base font-bold text-gray-800 mb-4 pb-2 border-b">{title}</h3>
        <div className="space-y-4">{children}</div>
    </div>
);

const FormRow: React.FC<{ label: string, htmlFor: string, children: React.ReactNode, hint?: string }> = ({ label, htmlFor, children, hint }) => (
    <div>
        <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
        </label>
        {children}
        {hint && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
    </div>
);


const EditProfileModal: React.FC<EditProfileModalProps> = ({ volunteer, onClose, onSave }) => {
  const [formData, setFormData] = useState(volunteer);
  const [isSaving, setIsSaving] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isParsingCv, setIsParsingCv] = useState(false);
  const [parsingError, setParsingError] = useState<string | null>(null);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const skillsArray = e.target.value.split(',').map(skill => skill.trim()).filter(Boolean);
    setFormData(prev => ({ ...prev, skills: skillsArray }));
  };

  const handleCvUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setIsParsingCv(true);
      setParsingError(null);

      try {
          const cvText = await file.text();
          const extractedData = await extractInfoFromCV(cvText);

          // Filter out null/empty values from the AI response before merging
          const filteredData = Object.fromEntries(
              Object.entries(extractedData).filter(([, value]) => 
                  value !== null && value !== '' && (!Array.isArray(value) || value.length > 0)
              )
          );
          
          setFormData(prev => ({ ...prev, ...filteredData }));

      } catch (err) {
          console.error("CV Parsing failed:", err);
          setParsingError("عذراً، لم نتمكن من تحليل السيرة الذاتية. يرجى التأكد من أنها ملف نصي واضح.");
      } finally {
          setIsParsingCv(false);
          e.target.value = ''; // Allow re-uploading the same file
      }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      onSave(formData);
      setIsSaving(false);
      handleClose();
    }, 1000);
  };
  
  const modalAnimation = isClosing ? 'animate-fadeOut' : 'animate-fadeIn';
  const contentAnimation = isClosing ? 'animate-scaleOut' : 'animate-scaleIn';

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm ${modalAnimation}`}
      onClick={handleClose}
    >
      <form
        onSubmit={handleSubmit}
        className={`bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-auto max-h-[90vh] flex flex-col overflow-hidden ${contentAnimation}`}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex-shrink-0 p-4 border-b flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">تعديل الملف الشخصي</h2>
            <button type="button" onClick={handleClose} className="p-2 rounded-full hover:bg-gray-200 transition-colors btn-press">
                <XIcon className="w-6 h-6 text-gray-600" />
            </button>
        </header>

        <div className="p-6 overflow-y-auto space-y-6">
            <div className="bg-taww-primary/5 p-4 rounded-lg border border-taww-primary/20 text-center">
                <h4 className="font-bold text-gray-800">هل تريد توفير الوقت؟</h4>
                <p className="text-sm text-gray-600 mt-1 mb-3">
                    اسمح للذكاء الاصطناعي بتعبئة ملفك الشخصي من سيرتك الذاتية. 
                    <br/>
                    <span className="text-xs">(نوصي باستخدام ملف نصي مثل .txt للحصول على أفضل النتائج)</span>
                </p>
                <label htmlFor="cv-upload" className={`inline-block ${isParsingCv ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                    <div className={`font-bold py-2 px-5 rounded-lg transition-all duration-300 ${isParsingCv ? 'bg-gray-400 text-white' : 'bg-taww-primary text-white hover:bg-taww-secondary btn-press'}`}>
                        ✨ تعبئة تلقائية من السيرة الذاتية
                    </div>
                </label>
                <input 
                    id="cv-upload" 
                    type="file" 
                    className="hidden" 
                    accept=".txt,.md,.text"
                    onChange={handleCvUpload}
                    disabled={isParsingCv}
                />
                {isParsingCv && <p className="text-sm text-gray-600 mt-2 animate-pulse-fast">جاري تحليل سيرتك الذاتية...</p>}
                {parsingError && <p className="text-sm text-red-600 mt-2">{parsingError}</p>}
            </div>

            <FormSection title="المعلومات الأساسية">
                <FormRow label="الاسم الكامل" htmlFor="fullName">
                    <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-taww-primary focus:border-taww-primary transition duration-200" required />
                </FormRow>
                 <FormRow label="نبذة قصيرة" htmlFor="shortBio">
                    <textarea id="shortBio" name="shortBio" value={formData.shortBio} onChange={handleChange} rows={3} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-taww-primary focus:border-taww-primary transition duration-200" />
                </FormRow>
                <FormRow label="المدينة" htmlFor="city">
                    <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-taww-primary focus:border-taww-primary transition duration-200" />
                </FormRow>
            </FormSection>

            <FormSection title="الخبرة المهنية">
                 <FormRow label="المسمى الوظيفي الحالي" htmlFor="currentJobTitle">
                    <input type="text" id="currentJobTitle" name="currentJobTitle" value={formData.currentJobTitle || ''} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-taww-primary focus:border-taww-primary transition duration-200" />
                </FormRow>
                <FormRow label="سنوات الخبرة" htmlFor="experienceYears">
                   <select id="experienceYears" name="experienceYears" value={formData.experienceYears} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-taww-primary cursor-pointer transition duration-200">
                       {Object.values(ExperienceYears).map(val => <option key={val} value={val}>{val}</option>)}
                   </select>
                </FormRow>
                <FormRow label="المهارات" htmlFor="skills" hint="افصل بين المهارات بفاصلة ( , )">
                    <textarea id="skills" name="skills" value={formData.skills.join(', ')} onChange={handleSkillsChange} rows={3} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-taww-primary focus:border-taww-primary transition duration-200" />
                </FormRow>
                <FormRow label="رابط معرض الأعمال" htmlFor="portfolioLink">
                    <input type="url" id="portfolioLink" name="portfolioLink" value={formData.portfolioLink || ''} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-taww-primary focus:border-taww-primary transition duration-200" placeholder="https://github.com/example" />
                </FormRow>
            </FormSection>
        </div>
        
        <footer className="flex-shrink-0 p-4 bg-gray-50 border-t flex gap-4">
          <button type="button" onClick={handleClose} className="flex-1 bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 btn-press">
            إلغاء
          </button>
          <button type="submit" disabled={isSaving} className="flex-1 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 btn-press flex justify-center items-center bg-taww-primary hover:bg-taww-secondary disabled:bg-gray-400">
            {isSaving ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : 'حفظ التغييرات'}
          </button>
        </footer>
      </form>
    </div>
  );
};

export default EditProfileModal;
