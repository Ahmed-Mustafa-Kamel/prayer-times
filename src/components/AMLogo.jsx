import { memo } from 'react';

const AMLogo = memo(function AMLogo() {
  return (
    <div className="text-center text-gray-300">
      <h6 className="text-[8px] opacity-60">تم التطوير بواسطة</h6>
      <div className="flex items-center justify-center gap-2 mt-1">
        <a 
          href="https://ahmed-mustafa-portfolio-delta.vercel.app/" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-white hover:text-amber-300 transition-all flex items-center gap-2"
        >
          <span className='opacity-75 text-[10px]'>أحمد مصطفى</span>
          <div className="flex opacity-75">
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
      {/* <p className="text-[10px] mt-0.5">Front-End Developer</p> */}
      <div className="text-[10px] mt-1 opacity-60 ">
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
