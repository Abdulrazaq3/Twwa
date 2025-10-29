import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    UsersIcon, 
    SparklesIcon, 
    AwardIcon, 
    ShieldCheckIcon, 
    TrophyIcon,
    ArrowRightIcon,
    QuestionMarkCircleIcon,
} from '../icons';

// A. Hero Section Component
const HeroSection: React.FC = () => (
    <section className="relative text-center text-white pt-20 pb-32 md:pt-24 md:pb-40 rounded-b-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-taww-secondary to-taww-primary opacity-95"></div>
        <div className="absolute inset-0 bg-cover bg-center animate-zoomIn" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop')", opacity: 0.15 }}></div>
        <div className="container mx-auto px-6 relative z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-shadow animate-fadeInUp" style={{ animationDelay: '100ms' }}>التطوع الجامعي… سباق وطني نحو الأثر</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-shadow animate-fadeInUp" style={{ animationDelay: '300ms' }}>
                «طَوع» توحّد الجامعات السعودية في سباق سنوي ذكي، لتوثيق الساعات وتحفيز المشاركة وقياس الأثر الوطني.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp" style={{ animationDelay: '500ms' }}>
                 <Link to="/profile" className="bg-white text-taww-primary font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg inline-block btn-press">
                    ابدأ كطالب/ـة
                </Link>
                 <Link to="/profile" className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-white/10 transform hover:scale-105 transition-all duration-300 shadow-lg inline-block btn-press">
                    سجّل جامعتك
                </Link>
            </div>
        </div>
    </section>
);

// B. Stats Bar Component
const StatsBar: React.FC = () => (
    <div className="container mx-auto px-6 relative z-10 -mt-16 md:-mt-20">
        <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-4 md:p-6 grid grid-cols-3 gap-2 md:gap-6 divide-x divide-gray-200/70 text-center">
            <div className="p-2">
                <p className="text-2xl md:text-3xl font-extrabold text-gray-800">700k+</p>
                <p className="text-xs md:text-base text-gray-600 font-semibold mt-1">متطوع سنوياً بالمملكة</p>
            </div>
            <div className="p-2">
                <p className="text-2xl md:text-3xl font-extrabold text-gray-800" style={{color: '#00a86b'}}>+45%</p>
                <p className="text-xs md:text-base text-gray-600 font-semibold mt-1">هدفنا للمشاركة الجامعية</p>
            </div>
            <div className="p-2">
                 <p className="text-2xl md:text-3xl font-extrabold text-gray-800">توثيق تلقائي</p>
                 <p className="text-xs md:text-base text-gray-600 font-semibold mt-1">للساعات المعتمدة</p>
            </div>
        </div>
    </div>
);

// C. Value Proposition Card Component
const ValuePropCard: React.FC<{ icon: React.ReactNode, title: string, description: string }> = ({ icon, title, description }) => (
    <div className="group p-6 flex flex-col items-center text-center rounded-xl transition-all duration-300 hover:shadow-lg hover:bg-white hover:-translate-y-2">
        <div className="flex items-center justify-center h-20 w-20 rounded-full bg-taww-primary/10 text-taww-primary mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-taww-primary group-hover:text-white">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

// D. How It Works Step Component
const HowItWorksStep: React.FC<{ step: number, title: string, description: string }> = ({ step, title, description }) => (
    <div className="relative pl-8">
        <div className="absolute -left-1 top-0 h-full w-0.5 bg-taww-primary/20"></div>
        <div className="absolute -left-3 top-0 h-6 w-6 rounded-full bg-taww-primary text-white flex items-center justify-center font-bold">{step}</div>
        <h3 className="font-bold text-lg text-gray-800 mb-1">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);


// E. FAQ Item Component
const FAQItem: React.FC<{ question: string, children: React.ReactNode }> = ({ question, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-gray-200 py-4">
            <button
                className="w-full flex justify-between items-center text-right"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h4 className="font-semibold text-gray-800">{question}</h4>
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <svg className="w-5 h-5 text-taww-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </span>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 mt-2' : 'max-h-0'}`}
            >
                <div className="text-gray-600 pr-2 pt-2">{children}</div>
            </div>
        </div>
    );
};

// Main Home Component
const Home: React.FC = () => {
    return (
        <div className="space-y-16 md:space-y-24 pb-12">
            <HeroSection />
            <StatsBar />

            {/* Why Taww Section */}
            <section className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-taww-primary">لماذا «طَوع»؟</h2>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto" style={{color: '#00a86b'}}>
                        نحو بيئة تنافسية محفّزة تجمع الجهود الجامعية في مساحة واحدة.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <ValuePropCard
                        icon={<TrophyIcon className="h-10 w-10" />}
                        title="تنافس شفاف"
                        description="ترتيب أسبوعي وشهري وسنوي للجامعات والمتطوعين لإشعال روح المنافسة الإيجابية."
                    />
                    <ValuePropCard
                        icon={<AwardIcon className="h-10 w-10" />}
                        title="إبراز الإنجازات"
                        description="نظام شارات وجوائز وتكريم وطني سنوي للاحتفاء بالمنجزين والمتميزين."
                    />
                    <ValuePropCard
                        icon={<ShieldCheckIcon className="h-10 w-10" />}
                        title="توثيق تلقائي"
                        description="تكامل مباشر مع الجهات المعتمدة لتوثيق الساعات التطوعية بكل سهولة وموثوقية."
                    />
                    <ValuePropCard
                        icon={<SparklesIcon className="h-10 w-10" />}
                        title="ذكاء اصطناعي"
                        description="تحليل الأثر واقتراح فرص مخصصة تواءم مهاراتك وتزيد من فعالية مساهمتك."
                    />
                </div>
            </section>

            {/* How It Works Section */}
            <section className="bg-white/50">
                <div className="container mx-auto px-6 py-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-taww-primary">كيف تعمل المنصة؟</h2>
                        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                           سباق وطني منظم على 5 مراحل رئيسية، يضمن الشفافية ويحقق الأثر.
                        </p>
                    </div>
                     <div className="max-w-2xl mx-auto space-y-8">
                        <HowItWorksStep step={1} title="التحضير" description="تسجيل الجامعات وتفعيل لوحاتها الخاصة استعدادًا لبدء الموسم." />
                        <HowItWorksStep step={2} title="التشغيل" description="استقبال وتوثيق الساعات التطوعية إلكترونيًا من الجهات المعتمدة." />
                        <HowItWorksStep step={3} title="المنافسة" description="تحديث الترتيب أسبوعيًا عبر نظام نقاط متكامل يعكس حجم الأثر." />
                        <HowItWorksStep step={4} title="التحليل" description="تقارير دورية وذكاء اصطناعي لقياس الأثر وتحديد نقاط القوة." />
                        <HowItWorksStep step={5} title="التكريم" description="إغلاق الموسم في 31 ديسمبر من كل عام وتكريم أفضل 10 جامعات ومتميزين." />
                    </div>
                     <p className="text-center mt-8 text-sm text-gray-500">يمكن تبديل عرض الفترات (أسبوعي/شهري/سنوي) مباشرة من الواجهة.</p>
                </div>
            </section>
            
            {/* Leaderboard & AI Sections */}
            <section className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                 <div className="text-center lg:text-right">
                    <h2 className="text-3xl font-bold text-taww-primary mb-4">لوحة تنافس حيّة</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">
                        تعرض «لوحة المراكز» ترتيب المتطوعين بناءً على <strong style={{color: '#00a86b'}}>النقاط ثم الساعات</strong>، وترتيب الجامعات بناءً على <strong style={{color: '#00a86b'}}>إجمالي النقاط ثم الساعات ثم عدد المتطوعين</strong>.
                    </p>
                    <Link to="/leaderboard" className="inline-flex items-center gap-2 bg-taww-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-taww-secondary transition-all duration-300 btn-press hover:shadow-lg hover:shadow-taww-primary/40">
                        استكشف لوحة المراكز <ArrowRightIcon className="w-5 h-5" />
                    </Link>
                </div>
                <div className="text-center lg:text-right bg-white p-8 rounded-xl shadow-lg border">
                    <h2 className="text-3xl font-bold text-taww-primary mb-4">مدعومة بالذكاء الاصطناعي</h2>
                    <p className="text-gray-700 leading-relaxed">
                        نستخدم الذكاء الاصطناعي لتلخيص أثرك ومهاراتك، إبراز التخصصات الأعلى نمواً، واقتراح فرص تطوعية تضاعف من تأثيرك.
                    </p>
                </div>
            </section>
            
            {/* Partners, KPIs, Timeline */}
            <section className="bg-white/50">
                <div className="container mx-auto px-6 py-16 grid md:grid-cols-3 gap-12">
                    <div>
                        <h3 className="font-bold text-xl mb-3 text-taww-primary">شركاؤنا</h3>
                        <ul className="space-y-2 text-gray-700">
                           <li>- عمادات شؤون الطلاب</li>
                           <li>- وزارة الموارد البشرية والتنمية الاجتماعية</li>
                           <li>- مؤسسة الأميرة العنود الخيرية</li>
                        </ul>
                    </div>
                     <div>
                        <h3 className="font-bold text-xl mb-3 text-taww-primary">مؤشرات النجاح</h3>
                        <ul className="space-y-2 text-gray-700">
                           <li>- <strong style={{color: '#00a86b'}}>70%</strong> انتشار بين الجامعات</li>
                           <li>- <strong style={{color: '#00a86b'}}>15%</strong> نمو شهري للمتطوعين</li>
                           <li>- <strong style={{color: '#00a86b'}}>500,000+</strong> ساعة موثّقة</li>
                        </ul>
                    </div>
                     <div>
                        <h3 className="font-bold text-xl mb-3 text-taww-primary">الخطة الزمنية للموسم</h3>
                        <ul className="space-y-2 text-gray-700 text-sm">
                           <li>- <strong className="font-semibold">الأسابيع 1-2:</strong> التحضير</li>
                           <li>- <strong className="font-semibold">الأسابيع 3-4:</strong> التشغيل</li>
                           <li>- <strong className="font-semibold">الأسابيع 5-12:</strong> المنافسة</li>
                           <li>- <strong className="font-semibold">الأسابيع 13-14:</strong> التحليل</li>
                           <li>- <strong className="font-semibold">31 ديسمبر:</strong> التكريم والإغلاق</li>
                        </ul>
                    </div>
                </div>
            </section>
            
            {/* FAQ */}
            <section className="container mx-auto px-6 max-w-3xl">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-taww-primary">الأسئلة الشائعة</h2>
                </div>
                <FAQItem question="كيف يتم توثيق الساعات؟">
                    <p>يتم التوثيق تلقائياً عبر التكامل مع منصة العمل التطوعي الوطنية والجهات المعتمدة، لا حاجة لأي إدخال يدوي.</p>
                </FAQItem>
                <FAQItem question="هل المشاركة فردية أم عبر الجامعة؟">
                    <p>مشاركتك كطالب/ـة تساهم تلقائياً في رصيد جامعتك. التنافس فردي وجماعي في آن واحد.</p>
                </FAQItem>
                 <FAQItem question="كيف يُحتسب الترتيب؟">
                    <p>يُحتسب بناءً على نظام نقاط يأخذ في الاعتبار عدد الساعات، نوع الفرصة، ومستوى الأثر المجتمعي.</p>
                </FAQItem>
                 <FAQItem question="ماذا يحدث عند نهاية الموسم؟">
                    <p>في 31 ديسمبر من كل عام، يتم إغلاق الترتيب وتصفير العدادات، وتُكرم أفضل 10 جامعات ومتطوعين في حفل وطني.</p>
                </FAQItem>
                 <FAQItem question="كيف أحصل على شهادة أو شارة؟">
                    <p>تُمنح الشارات الرقمية تلقائياً عند تحقيقك لإنجازات معينة، بينما تُقدّم الشهادات من الجهات المنظمة للفرص.</p>
                </FAQItem>
            </section>

            {/* Final CTA */}
            <section className="container mx-auto px-6">
                <div className="relative text-center text-white py-16 md:py-20 rounded-2xl overflow-hidden bg-gradient-to-r from-taww-secondary to-taww-primary">
                     <div className="container mx-auto px-6 relative z-10">
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 animate-fadeInUp text-shadow" style={{animationDelay: '100ms'}}>هل أنت مستعد لتكون جزءًا من التغيير؟</h2>
                        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 animate-fadeInUp" style={{animationDelay: '300ms'}}>
                            انضم الآن وساهم في رفع اسم جامعتك في أكبر سباق تطوعي وطني.
                        </p>
                         <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp" style={{animationDelay: '500ms'}}>
                             <Link to="/profile" className="bg-white text-taww-primary font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg inline-block btn-press">
                                ابدأ الآن كطالب/ـة
                            </Link>
                             <Link to="/leaderboard" className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-white/10 transform hover:scale-105 transition-all duration-300 shadow-lg inline-block btn-press">
                                استكشف لوحة المراكز
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
