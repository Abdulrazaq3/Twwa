
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVolunteer } from '../../contexts/VolunteerContext';
import { Volunteer, AcademicQualification, LanguageLevel } from '../../types';
import { SAUDI_UNIVERSITIES, ENABLE_LINKEDIN_IMPORT } from '../../constants';
import { LinkedinIcon } from '../icons';
import { extractInfoFromLinkedIn } from '../../services/geminiService';

const InputField: React.FC<{
    id: string;
    label: string;
    type?: string;
    value: string | undefined;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    list?: string;
    autoComplete?: string;
    optional?: boolean;
    disabled?: boolean;
}> = ({ id, label, optional, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-white/90 mb-1.5">
            {label} {optional ? <span className="text-white/60">(اختياري)</span> : ''}
        </label>
        <input
            id={id}
            name={id}
            {...props}
            className="w-full bg-black/20 text-white placeholder:text-white/60 px-4 py-3 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent focus:ring-taww-accent/80 transition disabled:opacity-50"
        />
    </div>
);

const TextareaField: React.FC<{
    id: string;
    label: string;
    value: string | undefined;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    optional?: boolean;
    rows?: number;
}> = ({ id, label, optional, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-white/90 mb-1.5">
            {label} {optional ? <span className="text-white/60">(اختياري)</span> : ''}
        </label>
        <textarea
            id={id}
            name={id}
            {...props}
            className="w-full bg-black/20 text-white placeholder:text-white/60 px-4 py-3 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent focus:ring-taww-accent/80 transition"
        />
    </div>
);

const SelectField: React.FC<{
    id: string;
    label: string;
    value: string | undefined;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    children: React.ReactNode;
}> = ({ id, label, value, onChange, children }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-white/90 mb-1.5">
            {label}
        </label>
        <div className="relative">
             <select
                id={id}
                name={id}
                value={value}
                onChange={onChange}
                className="w-full bg-black/20 text-white px-4 py-3 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent focus:ring-taww-accent/80 transition appearance-none pr-10"
            >
                {children}
            </select>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-3 text-white">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
        </div>
    </div>
);


const CompleteProfile: React.FC = () => {
    const { volunteer, updateVolunteer, isAuthenticated } = useVolunteer();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<Partial<Volunteer>>({
        academicQualification: volunteer?.academicQualification || AcademicQualification.BACHELOR,
        specialization: volunteer?.specialization || '',
        university: volunteer?.university || '',
        graduationYear: volunteer?.graduationYear || '',
        linkedinUrl: volunteer?.linkedinUrl || '',
        shortBio: volunteer?.shortBio || '',
        currentJobTitle: volunteer?.currentJobTitle || '',
        currentEmployer: volunteer?.currentEmployer || '',
    });
    const [languagesInput, setLanguagesInput] = useState(volunteer?.languages?.map(l => l.language).join(', ') || '');
    const [skillsInput, setSkillsInput] = useState(volunteer?.skills?.join(', ') || '');
    const [isStudying, setIsStudying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // LinkedIn extraction state
    const [isValidLinkedInUrl, setIsValidLinkedInUrl] = useState(false);
    const [isExtracting, setIsExtracting] = useState(false);
    const [extractionError, setExtractionError] = useState<string | null>(null);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/profile'); // Redirect to login if not authenticated
        }
    }, [isAuthenticated, navigate]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleLinkedInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        const isValid = /linkedin\.com\/in\/[a-zA-Z0-9-._~:?#\[\]@!$&'()*+,;=]+/.test(value);
        setIsValidLinkedInUrl(isValid);
        if (!isValid) {
            setExtractionError(null);
        }
    };

    const handleExtract = async () => {
        if (!formData.linkedinUrl) return;
        setIsExtracting(true);
        setExtractionError(null);
        try {
            const extractedData = await extractInfoFromLinkedIn(formData.linkedinUrl);
            const update = { ...extractedData };
            
            if (update.skills) {
                setSkillsInput(update.skills.join(', '));
                delete update.skills;
            }

            setFormData(prev => ({ ...prev, ...update }));

        } catch (error) {
            setExtractionError("تعذّر استخراج بيانات LinkedIn، يُرجى التعديل يدويًا.");
        } finally {
            setIsExtracting(false);
        }
    };

    const handleSkip = () => {
        navigate('/profile');
    };

    const handleSave = () => {
        setIsLoading(true);
        const languages = languagesInput.split(',')
            .map(lang => lang.trim())
            .filter(Boolean)
            .map(lang => ({ language: lang, level: LanguageLevel.INTERMEDIATE })); 

        const skills = skillsInput.split(',')
            .map(skill => skill.trim())
            .filter(Boolean);

        const finalData = {
            ...volunteer,
            ...formData,
            graduationYear: isStudying ? 'لا زال يدرس' : formData.graduationYear,
            languages: languages.length > 0 ? languages : (volunteer?.languages || []),
            skills: skills.length > 0 ? skills : (volunteer?.skills || []),
        } as Volunteer;

        updateVolunteer(finalData);

        setTimeout(() => {
            setIsLoading(false);
            navigate('/profile');
        }, 1000);
    };
    
    return (
        <div className="auth-bg flex items-center justify-center p-4 animate-fadeIn min-h-screen">
            <div className="relative z-10 w-full max-w-lg animate-scaleIn">
                <div className="glass-card rounded-2xl p-6 sm:p-8">
                    <div className="mb-6 text-center">
                         <h2 className="text-2xl font-bold text-white">أكمل ملفك الشخصي</h2>
                         <p className="text-white/80 mt-2 text-sm">هذه الخطوة اختيارية، لكنها تساعدنا في ترشيح الفرص الأنسب لك.</p>
                    </div>

                    <div className="space-y-4">
                        <SelectField
                            id="academicQualification"
                            label="المؤهل العلمي"
                            value={formData.academicQualification}
                            onChange={handleChange}
                        >
                            {Object.values(AcademicQualification).map(qual => (
                                <option key={qual} value={qual} className="bg-gray-800 text-white">{qual}</option>
                            ))}
                        </SelectField>

                        <InputField
                            id="specialization"
                            label="التخصص"
                            value={formData.specialization}
                            onChange={handleChange}
                            placeholder="مثال: علوم الحاسب"
                        />

                        <InputField
                            id="university"
                            label="الجامعة"
                            value={formData.university}
                            onChange={handleChange}
                            placeholder="مثال: جامعة الملك سعود"
                            list="universities-list"
                        />
                        <datalist id="universities-list">
                            {SAUDI_UNIVERSITIES.map(uni => <option key={uni} value={uni} />)}
                        </datalist>

                        <div className="grid grid-cols-2 gap-4 items-end">
                            <InputField
                                id="graduationYear"
                                label="سنة التخرج"
                                type="number"
                                value={isStudying ? '' : formData.graduationYear}
                                onChange={handleChange}
                                placeholder="مثال: 2023"
                                disabled={isStudying}
                            />
                            <div className="flex items-center pb-3">
                                <input
                                    type="checkbox"
                                    id="isStudying"
                                    checked={isStudying}
                                    onChange={(e) => setIsStudying(e.target.checked)}
                                    className="h-4 w-4 text-taww-secondary bg-black/20 border-white/30 rounded focus:ring-taww-accent"
                                />
                                <label htmlFor="isStudying" className="ms-2 text-sm text-white/90">
                                    لا زلت أدرس
                                </label>
                            </div>
                        </div>
                        
                        <div className="pt-4 mt-4 border-t border-white/20 space-y-4">
                            <TextareaField
                                id="shortBio"
                                label="نبذة تعريفية"
                                value={formData.shortBio}
                                onChange={handleChange}
                                placeholder="تحدث عن نفسك بإيجاز..."
                                rows={3}
                                optional
                            />
                             <InputField
                                id="currentJobTitle"
                                label="المسمى الوظيفي"
                                value={formData.currentJobTitle}
                                onChange={handleChange}
                                placeholder="مثال: مطور واجهات أمامية"
                                optional
                            />
                             <InputField
                                id="currentEmployer"
                                label="الشركة"
                                value={formData.currentEmployer}
                                onChange={handleChange}
                                placeholder="مثال: جمعية طوع"
                                optional
                            />
                             <InputField
                                id="skills"
                                label="المهارات"
                                value={skillsInput}
                                onChange={(e) => setSkillsInput(e.target.value)}
                                placeholder="React, UI/UX, ... (افصل بفاصلة)"
                                optional
                            />
                            <InputField
                                id="languages"
                                label="اللغات"
                                value={languagesInput}
                                onChange={(e) => setLanguagesInput(e.target.value)}
                                placeholder="العربية, الإنجليزية, ... (افصل بفاصلة)"
                                optional
                            />

                            <div className="relative">
                                <label htmlFor="linkedinUrl" className="block text-sm font-medium text-white/90 mb-1.5">
                                    رابط ملفك على LinkedIn <span className="text-white/60">(اختياري)</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 end-0 pe-3 flex items-center text-white/60">
                                        <LinkedinIcon className="w-5 h-5"/>
                                    </span>
                                    <input
                                        id="linkedinUrl"
                                        name="linkedinUrl"
                                        type="url"
                                        value={formData.linkedinUrl}
                                        onChange={handleLinkedInChange}
                                        className="w-full bg-black/20 text-white placeholder:text-white/60 ps-4 pe-10 py-3 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent focus:ring-taww-accent/80 transition"
                                        placeholder="https://linkedin.com/in/..."
                                    />
                                </div>
                                {ENABLE_LINKEDIN_IMPORT && isValidLinkedInUrl && (
                                    <div className="mt-2 text-center">
                                        <button
                                            type="button"
                                            onClick={handleExtract}
                                            disabled={isExtracting}
                                            className="text-sm font-semibold text-taww-accent hover:text-white underline disabled:opacity-50 disabled:no-underline"
                                        >
                                            {isExtracting ? '✨ جاري الاستخراج...' : '✨ استخراج بياناتي تلقائيًا'}
                                        </button>
                                    </div>
                                )}
                                {extractionError && <p className="text-red-300 text-xs mt-1.5 text-center">{extractionError}</p>}
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-8 flex flex-col sm:flex-row-reverse gap-3">
                        <button onClick={handleSave} disabled={isLoading} className="w-full sm:w-auto flex-grow justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-base font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent focus:ring-taww-accent btn-grad disabled:opacity-70 disabled:cursor-not-allowed">
                            {isLoading ? 'جاري الحفظ...' : 'حفظ والمتابعة'}
                        </button>
                        <button onClick={handleSkip} disabled={isLoading} className="w-full sm:w-auto py-3 px-4 rounded-lg text-base font-bold text-white/80 hover:bg-black/20 transition">
                            تخطي الآن
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CompleteProfile;
