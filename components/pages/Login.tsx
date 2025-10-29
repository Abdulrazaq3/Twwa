import React, { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVolunteer, SignupData } from '../../contexts/VolunteerContext';
import { EyeIcon, EyeSlashIcon, GoogleIcon, AppleIcon, CheckCircleIcon } from '../icons';

// --- Validation Functions ---
const validateFullName = (name: string) => !name.trim() ? 'الاسم الكامل مطلوب' : null;
const validateEmail = (email: string) => !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ? 'الرجاء إدخال بريد إلكتروني صحيح.' : null;
const validatePhone = (phone: string) => !/^05[0-9]{8}$/.test(phone) ? 'يجب أن يكون رقم الجوال سعودي وصحيح (مثال: 0512345678)' : null;
const validateBirthDate = (date: string) => !date ? 'تاريخ الميلاد مطلوب' : null;
const validateCity = (city: string) => !city.trim() ? 'المدينة مطلوبة' : null;
const validatePassword = (password: string) => {
    if (password.length < 8) {
        return 'كلمة المرور يجب ألا تقل عن 8 أحرف.';
    }
    if (!/^(?=.*\d)(?=.*[^\w\s])/.test(password)) {
        return 'يُفضّل أن تحتوي كلمة المرور على رقم ورمز.';
    }
    return null;
};
const validateConfirmPassword = (password: string, confirm: string) => password !== confirm ? 'تأكيد كلمة المرور لا يطابق.' : null;

const InputField: React.FC<{
    id: string;
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error: string | null;
    required?: boolean;
    placeholder?: string;
    autoComplete?: string;
    className?: string;
}> = ({ id, label, error, required, ...props }) => (
    <div className={props.className}>
        <label htmlFor={id} className="block text-sm font-medium text-white/90 mb-1">
            {label} {required && <span className="text-red-400">*</span>}
        </label>
        <input
            id={id}
            name={id}
            {...props}
            className={`w-full bg-black/20 text-white placeholder:text-white/60 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent transition ${error ? 'border-red-400/70 ring-red-400/50' : 'border-white/30 focus:ring-taww-accent/80'}`}
            aria-invalid={!!error}
            aria-describedby={`${id}-error`}
        />
        {error && <p id={`${id}-error`} className="text-red-300 text-xs mt-1.5" role="alert">{error}</p>}
    </div>
);


const LoginForm: React.FC<{
  isLoading: boolean;
  onSubmit: (email: string, pass: string) => void;
  formError: string | null;
}> = ({ isLoading, onSubmit, formError }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(email, password);
    };

    return (
        <form className="space-y-6 animate-form-in" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email-login" className="sr-only">البريد الإلكتروني</label>
                <input id="email-login" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="البريد الإلكتروني" className="w-full bg-black/20 text-white placeholder:text-white/60 px-4 py-3 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent focus:ring-taww-accent/80 transition" />
            </div>
            <div className="relative">
                <label htmlFor="password-login" className="sr-only">كلمة المرور</label>
                <input id="password-login" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="كلمة المرور" className="w-full bg-black/20 text-white placeholder:text-white/60 px-4 py-3 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent focus:ring-taww-accent/80 transition" />
                <button type="button" className="absolute inset-y-0 end-0 pe-3 flex items-center text-white/60 hover:text-white/90" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
            </div>
            <div className="flex items-center justify-between text-sm">
                <div className="flex items-center"><input id="remember-me" type="checkbox" className="h-4 w-4 text-taww-secondary bg-black/20 border-white/30 rounded focus:ring-taww-accent" /><label htmlFor="remember-me" className="ms-2 block text-white/80">تذكرني</label></div>
                <a href="#" className="font-medium text-taww-accent/80 hover:text-taww-accent">نسيت كلمة المرور؟</a>
            </div>

            <div className="bg-white/10 p-3 rounded-lg text-center text-xs text-white/80">
                <p>للتجربة السريعة:</p>
                <p>الإيميل: <strong className="select-all">ahmed@taww.sa</strong></p>
                <p>كلمة المرور: <strong className="select-all">password123</strong></p>
            </div>

            {formError && <div className="bg-red-500/30 text-white p-3 rounded-lg text-center text-sm animate-fadeIn" role="alert">{formError}</div>}
            <div>
                <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-base font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent focus:ring-taww-accent btn-grad disabled:opacity-70 disabled:cursor-not-allowed">
                    {isLoading ? 'جاري التحقق...' : 'تسجيل الدخول'}
                </button>
            </div>
        </form>
    );
};

const SignupForm: React.FC<{
  isLoading: boolean;
  onSubmit: (data: SignupData) => Promise<void>;
  formError: string | null;
}> = ({ isLoading, onSubmit, formError }) => {
    const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', birthDate: '', city: '', password: '', confirmPassword: '' });
    const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
    const [showPassword, setShowPassword] = useState(false);

    const validateForm = (field?: keyof typeof formData): boolean => {
        const newErrors: { [key: string]: string | null } = { ...errors };
        const fieldsToValidate: (keyof typeof formData)[] = field ? [field] : Object.keys(formData) as any;
        
        fieldsToValidate.forEach(key => {
            switch (key) {
                case 'fullName': newErrors.fullName = validateFullName(formData.fullName); break;
                case 'email': newErrors.email = validateEmail(formData.email); break;
                case 'phone': newErrors.phone = validatePhone(formData.phone); break;
                case 'birthDate': newErrors.birthDate = validateBirthDate(formData.birthDate); break;
                case 'city': newErrors.city = validateCity(formData.city); break;
                case 'password': newErrors.password = validatePassword(formData.password); break;
                case 'confirmPassword': newErrors.confirmPassword = validateConfirmPassword(formData.password, formData.confirmPassword); break;
            }
        });
        
        setErrors(newErrors);
        return Object.values(newErrors).every(err => err === null);
    };

    useEffect(() => {
        // Clear confirm password error if password changes
        if (formData.password) {
            const error = validateConfirmPassword(formData.password, formData.confirmPassword);
            setErrors(prev => ({...prev, confirmPassword: error}));
        }
    }, [formData.password, formData.confirmPassword]);
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Validate on change after first interaction
        if(errors[name] !== undefined) {
            validateForm(name as keyof typeof formData);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            await onSubmit(formData);
        }
    };

    return (
        <form className="space-y-4 animate-form-in" onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField id="fullName" label="الاسم الكامل" type="text" value={formData.fullName} onChange={handleChange} error={errors.fullName} required autoComplete="name" className="md:col-span-2"/>
                <InputField id="email" label="البريد الإلكتروني" type="email" value={formData.email} onChange={handleChange} error={errors.email} required autoComplete="email" />
                <InputField id="phone" label="رقم الجوال" type="tel" value={formData.phone} onChange={handleChange} error={errors.phone} required placeholder="05xxxxxxxx" autoComplete="tel" />
                <InputField id="birthDate" label="تاريخ الميلاد" type="date" value={formData.birthDate} onChange={handleChange} error={errors.birthDate} required />
                <InputField id="city" label="المدينة / الحي" type="text" value={formData.city} onChange={handleChange} error={errors.city} required autoComplete="address-level2" />
            </div>

            <div className="relative">
                <label htmlFor="password-signup" className="block text-sm font-medium text-white/90 mb-1">كلمة المرور <span className="text-red-400">*</span></label>
                <input id="password-signup" name="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleChange} required className={`w-full bg-black/20 text-white placeholder:text-white/60 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent transition ${errors.password ? 'border-red-400/70 ring-red-400/50' : 'border-white/30 focus:ring-taww-accent/80'}`} />
                 <button type="button" className="absolute inset-y-0 end-0 top-6 pe-3 flex items-center text-white/60 hover:text-white/90" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
                {errors.password && <p className="text-red-300 text-xs mt-1.5">{errors.password}</p>}
            </div>
             <div className="relative">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-white/90 mb-1">تأكيد كلمة المرور <span className="text-red-400">*</span></label>
                <input id="confirmPassword" name="confirmPassword" type={showPassword ? 'text' : 'password'} value={formData.confirmPassword} onChange={handleChange} required className={`w-full bg-black/20 text-white placeholder:text-white/60 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent transition ${errors.confirmPassword ? 'border-red-400/70 ring-red-400/50' : 'border-white/30 focus:ring-taww-accent/80'}`} />
                {errors.confirmPassword && <p className="text-red-300 text-xs mt-1.5">{errors.confirmPassword}</p>}
            </div>
            
            {formError && <div className="bg-red-500/30 text-white p-3 rounded-lg text-center text-sm animate-fadeIn" role="alert">{formError}</div>}
            
            <div>
                <button type="submit" disabled={isLoading} className="mt-4 w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-base font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent focus:ring-taww-accent btn-grad disabled:opacity-70 disabled:cursor-not-allowed">
                     {isLoading ? 'جاري الإنشاء...' : 'إنشاء حساب'}
                </button>
            </div>
        </form>
    );
};

const Login: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [formError, setFormError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const { login, signup } = useVolunteer();
  const navigate = useNavigate();

  const handleModeChange = (newMode: 'login' | 'signup') => {
    if (isLoading) return;
    setMode(newMode);
    setFormError(null);
    setSignupSuccess(false);
  };

  const handleLoginSubmit = async (email: string, pass: string) => {
    setIsLoading(true);
    setFormError(null);
    const success = await login(email, pass);
    if (!success) {
      setFormError('البريد الإلكتروني أو كلمة المرور غير صحيحة.');
    }
    setIsLoading(false);
  };
  
  const handleSignupSubmit = async (data: SignupData) => {
    setIsLoading(true);
    setFormError(null);
    const success = await signup(data);
    if (!success) {
      setFormError('حدث خطأ. قد يكون البريد الإلكتروني مستخدماً.');
      setIsLoading(false);
    } else {
      setSignupSuccess(true);
      setTimeout(() => {
        navigate('/complete-profile');
      }, 1500);
    }
  };

  return (
    <div className="auth-bg flex items-center justify-center p-4 animate-fadeIn min-h-screen">
      <div className="glow-blob" style={{ top: '10%', left: '10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(168,255,120,0.6) 0%, rgba(168,255,120,0) 70%)', animation: 'blob-move-1 20s ease-in-out infinite' }}></div>
      <div className="glow-blob" style={{ top: '70%', left: '60%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(50,194,141,0.5) 0%, rgba(50,194,141,0) 70%)', animation: 'blob-move-2 25s ease-in-out infinite', animationDelay: '3s' }}></div>
      <div className="glow-blob" style={{ top: '40%', left: '30%', width: '250px', height: '250px', background: 'radial-gradient(circle, rgba(0,168,107,0.55) 0%, rgba(0,168,107,0) 70%)', animation: 'blob-move-3 18s ease-in-out infinite', animationDelay: '1s' }}></div>
      <div className="glow-blob" style={{ top: '50%', left: '50%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(50,194,141,0.3) 0%, rgba(50,194,141,0) 70%)', transform: 'translate(-50%, -50%)', animation: 'blob-move-4 30s ease-in-out infinite', animationDelay: '5s' }}></div>

      <div className="relative z-10 w-full max-w-lg animate-scaleIn">
        <div className="glass-card rounded-2xl p-6 sm:p-8">
            <div className="mb-8 text-center">
                 <img src="https://i.postimg.cc/dVdY1hWH/6o3-logo.png" alt="شعار جمعية طوع التطوعية" className="w-20 h-20 mx-auto mb-2" />
                 <h2 className="text-2xl font-bold text-white">أهلاً بك في طوع</h2>
            </div>
          
            {signupSuccess ? (
                <div className="text-center text-white py-12 animate-fadeInUp">
                    <CheckCircleIcon className="w-20 h-20 mx-auto text-taww-accent mb-4" />
                    <h3 className="text-2xl font-bold">تم إنشاء حسابك بنجاح!</h3>
                    <p className="mt-2 text-white/80">جاري توجيهك الآن...</p>
                </div>
            ) : (
                <>
                    <div className="bg-black/20 p-1 rounded-lg flex mb-6">
                        <button onClick={() => handleModeChange('login')} className={`w-1/2 py-2.5 rounded-md text-sm font-bold transition-all duration-300 ${mode === 'login' ? 'tab-active-grad text-white shadow-lg' : 'text-white/70'}`}>تسجيل الدخول</button>
                        <button onClick={() => handleModeChange('signup')} className={`w-1/2 py-2.5 rounded-md text-sm font-bold transition-all duration-300 ${mode === 'signup' ? 'tab-active-grad text-white shadow-lg' : 'text-white/70'}`}>إنشاء حساب</button>
                    </div>
                    
                    <div key={mode}>
                        {mode === 'login' ? (
                            <LoginForm isLoading={isLoading} onSubmit={handleLoginSubmit} formError={formError} />
                        ) : (
                            <SignupForm isLoading={isLoading} onSubmit={handleSignupSubmit} formError={formError} />
                        )}
                    </div>

                </>
            )}
        </div>
      </div>
    </div>
  );
};

export default Login;