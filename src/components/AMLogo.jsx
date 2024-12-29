import { memo } from 'react';

const AMLogo = memo(function AMLogo() {
  return (
    <div className="text-center text-gray-300">
      <p className="text-xs">تم التطوير بواسطة</p>
      <div className="flex items-center justify-center gap-2 mt-1">
        <a 
          href="https://ahmed-mustafa-portfolio-delta.vercel.app/" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-white hover:text-amber-300 transition-all flex items-center gap-2"
        >
          <span>أحمد مصطفى</span>
          <div className="flex">
            <img 
              src="/AMlogo2.png" 
              width={20} 
              height={20} 
              alt="Ahmed Mustafa"
              loading="lazy"
              decoding="async"
              className="transition-transform hover:scale-110"
            />
          </div>
        </a>
      </div>
      <p className="text-[10px] mt-0.5">Front-End Developer</p>
      <div className="text-[10px] mt-1 opacity-75">
        Prayer times provided by{" "}
        <a 
          href="https://aladhan.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-amber-300 transition-all"
        >
          Aladhan API
        </a>
      </div>
    </div>
  );
});

export default AMLogo;
