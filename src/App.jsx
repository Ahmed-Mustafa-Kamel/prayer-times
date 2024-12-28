import Prayer from "./components/Prayer";
import { Cities, convertToArabicNumerals } from "../src/assets/constants";
import { useEffect, useState } from "react";

function App() {
  const [prayerTimes, setPrayerTimes] = useState();
  // setting dates
  const [GregianDate, setGregoianDate] = useState("");
  const [HijriDateDay, setHijriDateDay] = useState("");
  const [HijriDateMonth, setHijriDateMonth] = useState("");
  const [HijriDateYear, setHijriDateYear] = useState("");
  // setting city
  const [city, setCity] = useState("Cairo");

  // getting todays date
  const date_today = new Date();

  useEffect(() => {
    // fetching prayer times from api
    const fetchPrayerTimes = async () => {
      try {
        const response = await fetch(
          `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Eg&date=${date_today}`
        );
        const prayer_data = await response.json();
        // setting Prayer times
        setPrayerTimes(prayer_data.data.timings);

        // setting gregoian Date and hijri Date
        setGregoianDate(prayer_data.data.date.gregorian.date);

        setHijriDateDay(prayer_data.data.date.hijri.day);
        setHijriDateMonth(prayer_data.data.date.hijri.month.ar);
        setHijriDateYear(prayer_data.data.date.hijri.year);
        console.log(prayer_data);
      } catch {
        console.log("error");
      }
    };

    fetchPrayerTimes();
  }, [city]);

  const formattingTime = (time) => {
    if (!time) {
      return "00:00";
    }
    let [houres, minutes] = time.split(":").map(Number);
    const perd = houres >= 12 ? " م" : " ص ";
    houres = houres % 12 || 12;
    // converting times number to show in arabic numbers
    const arabicHours = convertToArabicNumerals(houres);
    const arabicMinutes = convertToArabicNumerals(
      // Add leading zero to minutes if less than 10
      minutes < 10 ? `0${minutes}` : minutes
    );
    return `${arabicHours}:${arabicMinutes} ${perd}`;
  };

  return (
    <section className=" h-[100vh] bg-cover bg-no-repeat">
      <div className="container w-[90%] lg:w-[40%] relative lg:top-5 justify-self-center lg:justify-self-start top-10 lg:right-60">
        {/* top section */}
        <div id="top" className="flex justify-between border-b-2 p-2">
          {/* city selection */}
          <div className="city gap-6 flex flex-col justify-self-end">
            <h3 className="text-2xl">المدينة</h3>
            <select
              name="city"
              className="rounded-md p-4"
              onChange={(e) => {
                setCity(e.target.value);
              }}
            >
              {Cities.map((city) => (
                <option key={city.value} value={city.value}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          {/* date */}
          <div className="gap-6 space-y-2 sm:text-xs md:text-xl">
            <h3 className="text-2xl">التاريخ</h3>
            <div className="date space-y-2">
              <h3 className=" text-gray-200">{GregianDate}</h3>
              <h3 className=" text-gray-200">
                {parseInt(HijriDateDay) + 1}-{HijriDateMonth}-{HijriDateYear}هـ
              </h3>
            </div>
          </div>
        </div>
        {/* prayer times table */}
        {prayerTimes ? (
          <>
            <Prayer name="الفجر" time={formattingTime(prayerTimes.Fajr)} />
            <Prayer name="الظهر" time={formattingTime(prayerTimes.Dhuhr)} />
            <Prayer name="العصر" time={formattingTime(prayerTimes.Asr)} />
            <Prayer name="المغرب" time={formattingTime(prayerTimes.Maghrib)} />
            <Prayer name="العشاء" time={formattingTime(prayerTimes.Isha)} />
          </>
        ) : (
          <p>Loading prayer times...</p> // or an error message
        )}
      </div>
      {/* <div className=" absolute bottom-0 right-[30%]">
        <a
          href="https://ahmed-mustafa-portfolio-delta.vercel.app/"
          target="_blank"
          className="text-xs"
        >
          {"{ Ahmed Mustafa }"}
        </a>
      </div> */}
    </section>
  );
}

export default App;
