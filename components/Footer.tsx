
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 border-t mt-12 hidden md:block">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-right">
          <div>
            <h3 className="text-2xl font-bold text-teal-700">جمعية طوع التطوعية</h3>
            <p className="text-gray-500 mt-2">جمعية وطنية ذكية لتمكين العمل المجتمعي.</p>
          </div>
          <div className="mt-6 md:mt-0">
            <p className="text-gray-600">&copy; {new Date().getFullYear()} جمعية طوع التطوعية. جميع الحقوق محفوظة.</p>
            <p className="text-sm text-gray-500">جزء من رؤية المملكة 2030</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;