
import React from 'react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const FeatureCard: React.FC<{ title: string; description: string; children: React.ReactNode }> = ({ title, description, children }) => (
  <div className="bg-surface p-6 rounded-lg shadow-lg text-center transform hover:scale-110 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300">
    <div className="flex justify-center items-center mb-4 text-white w-16 h-16 mx-auto bg-gradient-to-br from-primary to-purple-600 rounded-full">
      {children}
    </div>
    <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>
    <p className="text-text-secondary text-sm">{description}</p>
  </div>
);

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="w-full max-w-5xl mx-auto text-center animate-fade-in p-4 mt-16 sm:mt-0">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 via-primary to-indigo-400 text-transparent bg-clip-text">
        Trình Chỉnh Sửa Ảnh Bằng AI
      </h1>
      <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-8">
        Chỉnh sửa ảnh của bạn một cách dễ dàng. Điều chỉnh cơ bản, kết quả mạnh mẽ. Tất cả trong trình duyệt của bạn, tức thì và miễn phí.
      </p>
      <button
        onClick={onGetStarted}
        className="px-8 py-4 bg-gradient-to-r from-primary to-purple-600 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-110 hover:brightness-110 hover:shadow-lg hover:shadow-primary/40 active:scale-100 focus:outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-50 text-lg"
      >
        Bắt đầu
      </button>

      <div className="mt-20">
        <h2 className="text-3xl font-bold text-text-primary mb-10">Tính Năng</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard title="Điều Chỉnh Chính Xác" description="Tinh chỉnh độ sáng và độ tương phản để làm nổi bật những gì tốt nhất trong ảnh của bạn.">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 16v-2m8-8h2M4 12H2m15.364 6.364l1.414 1.414M4.222 4.222l1.414 1.414m12.728 0l-1.414 1.414M5.636 18.364l-1.414 1.414M12 16a4 4 0 100-8 4 4 0 000 8z" /></svg>
          </FeatureCard>
          <FeatureCard title="Bộ Lọc Nghệ Thuật" description="Áp dụng ngay các hiệu ứng sáng tạo như Thang độ xám và Làm mờ để thay đổi tâm trạng.">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21a9 9 0 010-18 9 9 0 010 18z" /><path d="M12 21a9 9 0 000-18v18z" /></svg>
          </FeatureCard>
          <FeatureCard title="Công Cụ Thiết Yếu" description="Xoay và lật ảnh nhanh chóng để có được bố cục hoàn hảo.">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 4v5h-5M4 20v-5h5M20 20v-5h-5" /></svg>
          </FeatureCard>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;