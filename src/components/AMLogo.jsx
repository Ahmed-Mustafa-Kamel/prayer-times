export default function AMLogo() {
  return (
    <div className="text-center mt-10 text-gray-300">
      <p className="text-sm">تم التطوير بواسطة</p>
      <div className="flex items-center justify-center gap-2">
        <a 
          href="https://ahmed-mustafa-portfolio-delta.vercel.app/" 
          target="_blank" 
          className="text-base hover:text-amber-300 transition-colors flex items-center gap-2"
        >
          <span>أحمد مصطفى</span>
          <div className="flex">
            <img src="/AMlogo2.png" width={25} height={25} alt="Ahmed Mustafa" />
          </div>
        </a>
      </div>
      <p className="text-xs mt-1">Front-End Developer</p>
      <div className="text-xs mt-3 opacity-75">
        Prayer times provided by{" "}
        <a 
          href="https://aladhan.com/"
          target="_blank"
          className="hover:text-amber-300 transition-colors"
        >
          Aladhan API
        </a>
      </div>
    </div>
  );
}
