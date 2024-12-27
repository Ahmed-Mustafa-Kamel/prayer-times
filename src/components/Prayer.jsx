// eslint-disable-next-line react/prop-types
export default function Prayer({ name, time }) {
  return (
    <div id="prayer" className="flex justify-between px-6 py-3 rounded-md my-4">
      <p className=" text-2xl">{`${name} :`}</p>
      <p className=" text-2xl">{time}</p>
    </div>
  );
}
