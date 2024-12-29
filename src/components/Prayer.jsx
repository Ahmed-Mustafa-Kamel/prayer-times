import { memo } from 'react';

const Prayer = memo(function Prayer({ name, time }) {
  return (
    <div 
      id="prayer" 
      className="flex justify-between items-center px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg my-1 sm:my-2 transition-all hover:translate-x-[-4px]"
    >
      <p className="text-base sm:text-lg lg:text-xl">{name}</p>
      <p className="text-base sm:text-lg lg:text-xl font-medium">{time}</p>
    </div>
  );
}, (prevProps, nextProps) => {
  return prevProps.time === nextProps.time && prevProps.name === nextProps.name;
});

export default Prayer;
