import { memo } from 'react';

const Loader = memo(function Loader() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-4">
      <div className="w-10 h-10 relative">
        <div className="moon w-full h-full">
          <div className="star"></div>
        </div>
      </div>
      <p className="text-sm text-amber-200/90">جاري التحميل...</p>
    </div>
  );
});

export default Loader;
