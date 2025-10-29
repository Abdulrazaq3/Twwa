import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { SendIcon, UserCircleIcon, ArrowRightIcon, SearchIcon, LightBulbIcon, QuestionMarkCircleIcon } from '../icons';
import MarkdownRenderer from '../MarkdownRenderer';
import { useNavigate } from 'react-router-dom';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const ConversationStarter: React.FC<{ onPromptClick: (prompt: string) => void }> = ({ onPromptClick }) => {
    const prompts = [
        'اقترح لي فرصة تطوع بيئية في الرياض',
        'ما هي أحدث المبادرات المضافة؟',
        'كيف أجمع النقاط والأوسمة؟',
        'أريد فرصة تطوع في مجال صحي بمدينة جدة',
    ];

    return (
        <div className="w-full max-w-lg mx-auto">
            <p className="text-center text-sm text-gray-500 mb-3">أو ابدأ باقتراح جاهز:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {prompts.map(prompt => (
                    <button
                        key={prompt}
                        onClick={() => onPromptClick(prompt)}
                        className="text-right w-full bg-white border border-gray-200 text-gray-700 p-3 rounded-lg hover:bg-gray-50 hover:border-taww-primary transition-all duration-200 text-sm font-medium btn-press"
                    >
                        {prompt}
                    </button>
                ))}
            </div>
        </div>
    );
};

const WelcomeComponent: React.FC<{ onPromptClick: (prompt: string) => void }> = ({ onPromptClick }) => {
    const capabilities = [
        { icon: <SearchIcon className="h-6 w-6"/>, text: 'البحث عن فرص تطوعية' },
        { icon: <LightBulbIcon className="h-6 w-6"/>, text: 'اقتراح مبادرات تناسبك' },
        { icon: <QuestionMarkCircleIcon className="h-6 w-6"/>, text: 'الإجابة على أسئلتك' },
    ];

    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-4 animate-fadeInUp">
            <div className="bg-white/50 p-8 rounded-2xl shadow-sm border border-gray-200/50">
                <img src="https://i.postimg.cc/qqvxXyTY/lwqw-twʿ.png" alt="المساعد الذكي" className="h-20 w-20 mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-gray-800">أهلاً بك!</h1>
                <p className="text-gray-600 mt-2">أنا مساعدك الذكي في طوع، هنا لمساعدتك.</p>

                <div className="my-6 space-y-3 text-right">
                    {capabilities.map(cap => (
                        <div key={cap.text} className="flex items-center gap-3 p-2 bg-gray-100/60 rounded-lg">
                            <span className="text-taww-primary">{cap.icon}</span>
                            <span className="text-gray-700 font-medium">{cap.text}</span>
                        </div>
                    ))}
                </div>
                <ConversationStarter onPromptClick={onPromptClick} />
            </div>
        </div>
    )
}

const TypingIndicator: React.FC = () => (
    <div className="flex items-center space-x-1.5 space-x-reverse">
        <div className="dot-bounce">
            <div className="dot-1 bg-gray-400 w-2 h-2 rounded-full"></div>
            <div className="dot-2 bg-gray-400 w-2 h-2 rounded-full"></div>
            <div className="dot-3 bg-gray-400 w-2 h-2 rounded-full"></div>
        </div>
    </div>
);


const AiAssistantPage: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatSession = useRef<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [initError, setInitError] = useState<string | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const navigate = useNavigate();

    const adjustTextareaHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'; // Reset height
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };
    
    useEffect(() => {
        adjustTextareaHeight();
    }, [input]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages, isLoading]);
    
    const initializeChat = () => {
        // FIX: Use process.env.API_KEY to align with guidelines and fix TypeScript error.
        if (!process.env.API_KEY) {
            setInitError('عذراً، مفتاح API غير متوفر. لا يمكن تهيئة المساعد الذكي.');
            setMessages([]);
            return;
        }
        try {
            setInitError(null);
            // FIX: Use process.env.API_KEY to align with guidelines and fix TypeScript error.
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            chatSession.current = ai.chats.create({
                model: 'gemini-2.5-flash',
                config: {
                    systemInstruction: `Role: المساعد الذكي لجمعية "طَوع" التطوعية

Goal:
Your general goal is to be a friendly and helpful AI assistant for 'Taww Volunteering Association' (جمعية طوع التطوعية) in Saudi Arabia. Help users find volunteering opportunities, answer their questions, and encourage them. Respond in clear Arabic.

However, you have VERY SPECIFIC rules for certain questions:

---
**Rule for "Idea of Taww"**
If a user asks about the idea of the association (e.g., "ما هي فكرة جمعية طَوع؟", "ما هي فكرة طوع التطوعية؟"), respond with this EXACT text:

📘 **فكرة جمعية طَوع التطوعية**
جمعية "طَوع" التطوعية وُلدت من الإيمان بأن روح العطاء متأصلة في المجتمع السعودي، ولكن يواجه كثير من الراغبين في التطوع صعوبة في الوصول إلى الفرص المناسبة أو الجهات المحتاجة.  
استلهمت فكرتها من قوله تعالى: ﴿فَمَن تَطَوَّعَ خَيْرًا فَهُوَ خَيْرٌ لَّهُ﴾ [البقرة:184]، وتهدف إلى تحويل العمل المجتمعي من نشاط مؤقت إلى منظومة رقمية ذكية تربط المتطوعين بالجهات وتوثّق الأثر باستخدام الذكاء الاصطناعي.  
تسعى الجمعية إلى تحقيق مستهدفات **رؤية المملكة 2030** عبر رفع عدد المتطوعين وتعزيز المشاركة المجتمعية ضمن محور **مجتمع حيوي ووطن طموح**.

---
**Rule for "Taww Team"**
If a user asks about the team (e.g., "من هم فريق طَوع؟", "من أصحاب فكرة جمعية طَوع؟", "من مؤسسو طَوع؟", "مين ورا طَوع؟"), you MUST respond with the following text EXACTLY, without any changes, additions, or deletions:

أصحاب فكرة طَوع هم:

1. عبدالرزاق حسن الدوسري — طالب علوم حاسب بجامعة شقراء، وعضو مطوّر في فريق طَوع، ومهندس إنترنت الأشياء (IoT) وذكاء اصطناعي (AI). يتميّز بشغفه في تطوير حلول ذكية تربط بين البيانات والأجهزة لابتكار أنظمة أكثر كفاءة وفعالية، مع سعي مستمر للتعلّم والتطوير التقني. شارك كشريك في شركة أمد للتقنية العقارية في تنفيذ أول صفقة "ملكية مؤجرة" (Leasehold) في المملكة تماشيًا مع رؤية 2030. كما حصل على المركز الثاني في هاكاثون كواليثون 2025 بمشروع EduEye، وأتمّ برنامج Introduction to AI من KAUST Academy.

2. عثمان بن لقمان الحردلو — طالب علوم حاسب بجامعة شقراء، وعضو مطوّر أمني في فريق طَوع ومطور متكامل (Full-Stack)، مهتم بالأمن السيبراني. يجمع بين الإبداع في الحلول التقنية والاحتراف في البرمجة لبناء منتجات تجمع بين الكفاءة والأمان، بشغف بالتفاصيل التي تصنع الفرق.

3. أحمد بن خالد الرشيد — طالب علوم حاسب بجامعة شقراء، قائد فريق طَوع ومطوّر Full-Stack ومتخصص في الذكاء الاصطناعي. خريج معسكر Apple للذكاء الاصطناعي ومعسكر Samsung للابتكار في الذكاء الاصطناعي، وحاصل على منحة وشهادة برنامج القيادات العالمية من جامعة كوفنتري في بريطانيا بعد اختياره ضمن ١٦ طالبًا من أصل أكثر من ٢٠ ألف طالب بجامعة شقراء. قائد مشروع EduEye الحاصل على المركز الثاني في Qualithon 2025، وشغوف بصناعة حلول تقنية تخدم الإنسان والمجتمع.

4. محمد بن صالح الزياد — طالب علوم حاسب بجامعة شقراء ومهندس ذكاء اصطناعي في فريق طَوع، مهتم بالحوسبة الكمية وتطوير المجتمع التقني. خريج أكاديمية جامعة الملك عبدالله للعلوم والتقنية (KAUST) في الذكاء الاصطناعي، ومنح زمالة بحثية في المركز الدولي للفيزياء النظرية بإيطاليا، وحاصل على منحة برنامج القيادات العالمية من جامعة كوفنتري في بريطانيا. يمتلك خبرة تتجاوز ١٠ سنوات في تطوير البرمجيات وحاز إشادات من باحثين عالميين في الذكاء الاصطناعي والتعلّم الآلي المصغّر.

📍 المصدر: فريق طَوع.
---

**Other Rules:**
- If a general question covers both the idea and the team, provide the response for the idea first, then the response for the team.
- If asked for the source of information, reply: "المصدر: فريق طَوع."
- If asked to update information, ask the user to provide the new text.`,
                },
            });
            setMessages([]);
        } catch (error) {
            console.error("Failed to initialize Gemini Chat:", error);
            const errorMessage = 'عذراً، حدث خطأ أثناء تهيئة المساعد الذكي. يرجى المحاولة لاحقاً.';
            setInitError(errorMessage);
            setMessages([{ role: 'model', text: errorMessage }]);
        }
    };
    
    useEffect(() => {
        initializeChat();
    }, []);

    const handleSendMessage = async (messageText: string) => {
        if (!messageText.trim() || isLoading || !chatSession.current) return;
        
        const userMessage: Message = { role: 'user', text: messageText };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const stream = await chatSession.current.sendMessageStream({ message: messageText });
            
            setMessages(prev => [...prev, { role: 'model', text: '' }]);

            for await (const chunk of stream) {
                const chunkText = chunk.text;
                setMessages(prev => {
                    const newMessages = [...prev];
                    const lastMessage = newMessages[newMessages.length - 1];
                    if (lastMessage.role === 'model') {
                        lastMessage.text += chunkText;
                    }
                    return newMessages;
                });
            }
        } catch (error) {
            console.error("Error sending message to Gemini:", error);
            const errorMsg: Message = { role: 'model', text: 'عفواً، واجهتني مشكلة. هل يمكنك إعادة صياغة سؤالك؟' };
            setMessages(prev => {
              // Replace the empty model message with the error message
              const newMessages = [...prev];
              const lastMessage = newMessages[newMessages.length - 1];
              if(lastMessage.role === 'model' && lastMessage.text === '') {
                lastMessage.text = errorMsg.text;
                return newMessages;
              }
              return [...newMessages, errorMsg];
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSendMessage(input);
    };
    
    const handlePromptClick = (prompt: string) => {
        handleSendMessage(prompt);
    };
    
    return (
        <div className="h-screen w-screen flex flex-col bg-gray-50">
             <header className="flex items-center justify-between p-3 sm:p-4 border-b bg-white w-full flex-shrink-0">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:bg-gray-200 p-2 rounded-full transition-colors btn-press"
                    aria-label="العودة"
                >
                    <ArrowRightIcon className="w-5 h-5" />
                </button>
                
                <div className="flex items-center gap-3 text-taww-primary">
                    <img src="https://i.postimg.cc/qqvxXyTY/lwqw-twʿ.png" alt="شعار المساعد الذكي" className="h-8 w-8" />
                    <h1 className="text-xl font-extrabold hidden sm:block">المساعد الذكي</h1>
                </div>

                <button
                    onClick={initializeChat}
                    className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:bg-gray-200 p-2 rounded-full transition-colors btn-press"
                    aria-label="بدء محادثة جديدة"
                >
                    <img src="https://i.postimg.cc/ZYxNb0hr/repeat.png" alt="محادثة جديدة" className="w-5 h-5" />
                </button>
            </header>

            <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 p-4 overflow-y-auto space-y-6">
                    {messages.length === 0 && !isLoading && !initError && <WelcomeComponent onPromptClick={handlePromptClick} />}

                    {initError && messages.length <= 1 && (
                         <div className="flex items-start gap-3 justify-start animate-message-pop-in">
                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-taww-primary/10 flex items-center justify-center">
                                <img src="https://i.postimg.cc/qqvxXyTY/lwqw-twʿ.png" alt="AI Avatar" className="h-5 w-5" />
                            </div>
                            <div className="max-w-md lg:max-w-lg rounded-2xl px-4 py-3 text-base bg-red-100 text-red-800 rounded-bl-lg">
                                {initError}
                            </div>
                        </div>
                    )}
                    
                    {messages.map((msg, index) => (
                         <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-message-pop-in`}>
                            {msg.role === 'model' && (
                                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-taww-primary/10 flex items-center justify-center">
                                    <img src="https://i.postimg.cc/qqvxXyTY/lwqw-twʿ.png" alt="AI Avatar" className="h-5 w-5" />
                                </div>
                            )}
                            <div className={`max-w-md lg:max-w-lg rounded-2xl px-4 py-3 text-base ${
                                msg.role === 'user'
                                    ? 'bg-taww-primary text-white rounded-br-lg'
                                    : 'bg-gray-100 text-gray-800 rounded-bl-lg'
                            }`}>
                                {msg.role === 'model' && msg.text === '' && isLoading ? (
                                    <TypingIndicator />
                                ) : msg.role === 'model' ? (
                                    <MarkdownRenderer content={msg.text} />
                                ) : (
                                    <div className="whitespace-pre-wrap">{msg.text}</div>
                                )}
                            </div>
                            {msg.role === 'user' && (
                                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center">
                                    <UserCircleIcon className="w-6 h-6" />
                                </div>
                            )}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                <div className="p-4 border-t bg-white">
                    <form onSubmit={handleFormSubmit}>
                        <div className="relative">
                            <textarea
                                ref={textareaRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleFormSubmit(e);
                                    }
                                }}
                                placeholder="اسأل عن أي شيء..."
                                className="w-full pl-4 pr-14 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-taww-primary focus:border-taww-primary transition duration-200 text-base resize-none overflow-y-hidden"
                                disabled={isLoading || !!initError}
                                rows={1}
                            />
                            <button type="submit" disabled={isLoading || !input.trim() || !!initError} className="absolute right-2 top-1/2 -translate-y-1/2 bg-taww-primary text-white rounded-full h-10 w-10 flex items-center justify-center transition-colors hover:bg-taww-secondary disabled:bg-gray-300 disabled:cursor-not-allowed btn-press">
                                <SendIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AiAssistantPage;