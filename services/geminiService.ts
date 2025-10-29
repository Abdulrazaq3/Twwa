import { GoogleGenAI, Type } from "@google/genai";
import { Opportunity, Volunteer, AcademicQualification, ExperienceYears } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getRecommendations = async (userInput: string, opportunities: Opportunity[]): Promise<number[]> => {
  const simplifiedOpportunities = opportunities.map(({ id, title, opportunitySummary, category, skillTags, volunteerRole, workType, workStyle }) => ({
    id,
    title,
    summary: opportunitySummary,
    category,
    skills: skillTags,
    role: volunteerRole,
    workType,
    workStyle,
  }));

  const prompt = `
    أنت خبير في مطابقة المتطوعين مع الفرص المناسبة في جمعية "طوع" التطوعية السعودية. بناءً على وصف المستخدم التالي: "${userInput}"، أي من الفرص التالية هي الأنسب؟
    
    الفرص المتاحة:
    ${JSON.stringify(simplifiedOpportunities)}
    
    يرجى إعادة مصفوفة JSON تحتوي فقط على أرقام "id" لأفضل 3 فرص موصى بها، مرتبة من الأكثر ملاءمة إلى الأقل. لا تقم بتضمين أي نص أو شرح آخر.
    مثال على الاستجابة: [2, 5, 1]
  `;

  try {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.NUMBER,
            },
          },
        },
    });

    const responseText = response.text.trim();
    console.log("Gemini Response:", responseText);
    const recommendedIds = JSON.parse(responseText);

    if (Array.isArray(recommendedIds) && recommendedIds.every(id => typeof id === 'number')) {
      return recommendedIds;
    }
    return [];
  } catch (error) {
    console.error("Error fetching recommendations from Gemini API:", error);
    // Fallback or error handling
    return [];
  }
};

export const extractInfoFromCV = async (cvText: string): Promise<Partial<Volunteer>> => {
  const prompt = `
    أنت مساعد توظيف خبير متخصص في تحليل السير الذاتية للمتطوعين في المملكة العربية السعودية. مهمتك هي استخراج المعلومات الأساسية من نص السيرة الذاتية التالي وتنسيقها في كائن JSON. يرجى تحليل النص بدقة وتعبئة الحقول بأكبر قدر ممكن من الدقة.

    نص السيرة الذاتية:
    ---
    ${cvText}
    ---

    يرجى إرجاع كائن JSON يلتزم بالمخطط المحدد بدقة.
  `;

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      fullName: { type: Type.STRING, description: "الاسم الكامل للشخص." },
      email: { type: Type.STRING, description: "عنوان البريد الإلكتروني." },
      phone: { type: Type.STRING, description: "رقم الهاتف." },
      city: { type: Type.STRING, description: "المدينة." },
      country: { type: Type.STRING, description: "الدولة." },
      shortBio: { type: Type.STRING, description: "نبذة قصيرة أو ملخص شخصي من السيرة الذاتية." },
      academicQualification: {
        type: Type.STRING,
        description: `المؤهل العلمي. اختر القيمة الأنسب من: ${Object.values(AcademicQualification).join(', ')}`,
        enum: Object.values(AcademicQualification),
      },
      specialization: { type: Type.STRING, description: "التخصص الدراسي." },
      university: { type: Type.STRING, description: "اسم الجامعة." },
      graduationYear: { type: Type.STRING, description: "سنة التخرج." },
      currentJobTitle: { type: Type.STRING, description: "المسمى الوظيفي الحالي." },
      experienceYears: {
        type: Type.STRING,
        description: `إجمالي سنوات الخبرة. اختر القيمة الأنسب من: ${Object.values(ExperienceYears).join(', ')}`,
        enum: Object.values(ExperienceYears),
      },
      skills: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "قائمة بالمهارات التقنية والشخصية."
      },
      portfolioLink: { type: Type.STRING, description: "رابط معرض الأعمال إن وجد (مثل GitHub, Behance, etc.)." },
    },
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const responseText = response.text.trim();
    const extractedData = JSON.parse(responseText);

    if (typeof extractedData === 'object' && extractedData !== null) {
      return extractedData as Partial<Volunteer>;
    }
    return {};
  } catch (error) {
    console.error("Error extracting info from CV with Gemini API:", error);
    throw new Error("Failed to parse CV data.");
  }
};

// A helper to map string qualifications to enum values
const mapQualificationToEnum = (qualification: string): AcademicQualification | undefined => {
    if (!qualification) return undefined;
    const q = qualification.toLowerCase();
    if (q.includes('bachelor') || q.includes('بكالوريوس')) return AcademicQualification.BACHELOR;
    if (q.includes('master') || q.includes('ماجستير')) return AcademicQualification.MASTER;
    if (q.includes('phd') || q.includes('دكتوراه')) return AcademicQualification.PHD;
    if (q.includes('diploma') || q.includes('دبلوم')) return AcademicQualification.DIPLOMA;
    if (q.includes('high school') || q.includes('ثانوية')) return AcademicQualification.HIGH_SCHOOL;
    return undefined;
}

export const extractInfoFromLinkedIn = async (url: string): Promise<Partial<Volunteer>> => {
  const prompt = `
    مهمتك **الوحيدة** هي تحليل محتوى صفحة LinkedIn العامة هذه: ${url} باستخدام بحث Google.
    **لا تخترع أي معلومات مطلقًا.** إذا لم تتمكن من العثور على معلومة معينة، اترك الحقل فارغًا ("") أو كمصفوفة فارغة ([]).

    استخرج التفاصيل التالية:
    - المسمى الوظيفي الحالي (currentJobTitle)
    - الشركة الحالية (currentEmployer)
    - نبذة قصيرة (shortBio)
    - قائمة بالمهارات (skills)
    - أحدث مؤهل علمي: الدرجة (academicQualification)، التخصص (specialization)، الجامعة (university)، وسنة التخرج (graduationYear).

    **الرد يجب أن يكون كائن JSON صالح فقط، ومغلف بـ \`\`\`json. لا تقم بتضمين أي نص أو تعليقات أو مقدمات.**
    
    مثال على التنسيق المطلوب:
    \`\`\`json
    {
      "currentJobTitle": "Frontend Developer",
      "currentEmployer": "Taww Association",
      "shortBio": "A passionate developer...",
      "skills": ["React", "TypeScript"],
      "academicQualification": "بكالوريوس",
      "specialization": "علوم الحاسب",
      "university": "جامعة شقراء",
      "graduationYear": "2023"
    }
    \`\`\`
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const responseText = response.text;
    let jsonString = '';

    // Attempt to extract JSON from a markdown code block first
    const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/);
    if (jsonMatch && jsonMatch[1]) {
        jsonString = jsonMatch[1];
    } else {
        // Fallback: If no markdown block, try to find a JSON object in the text
        const startIndex = responseText.indexOf('{');
        const endIndex = responseText.lastIndexOf('}');
        if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
            jsonString = responseText.substring(startIndex, endIndex + 1);
        }
    }
    
    if (!jsonString) {
      console.warn("Gemini response did not contain a valid JSON block.", responseText);
      throw new Error("Failed to parse LinkedIn data from Gemini response.");
    }
    
    let extractedData;
    try {
        extractedData = JSON.parse(jsonString);
    } catch(parseError) {
        console.error("Failed to parse JSON string from Gemini response:", jsonString, parseError);
        throw new Error("Failed to parse LinkedIn data from Gemini response.");
    }

    const mappedQualification = mapQualificationToEnum(extractedData.academicQualification || '');

    const finalData: Partial<Volunteer> = {
      ...extractedData,
      academicQualification: mappedQualification || undefined,
    };
    
    // remove empty fields from the final object to avoid overwriting existing data with empty strings
    Object.keys(finalData).forEach(key => {
        const k = key as keyof typeof finalData;
        const value = finalData[k];
        if (value === "" || (Array.isArray(value) && value.length === 0)) {
            delete finalData[k];
        }
    });

    return finalData;

  } catch (error) {
    console.error("Error extracting info from LinkedIn with Gemini API:", error);
    throw new Error("Failed to parse LinkedIn data.");
  }
};