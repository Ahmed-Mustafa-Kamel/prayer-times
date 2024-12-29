import Prayer from "./components/Prayer";
import { Cities, convertToArabicNumerals } from "../src/assets/constants";
import { useEffect, useState, useCallback, useMemo } from "react";
import AMLogo from "./components/AMLogo";
import Loader from "./components/Loader";

function App() {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [dates, setDates] = useState({
    GregoianDate: "",
    HijriDateDay: "",
    HijriDateMonth: "",
    HijriDateYear: "",
  });
  const [city, setCity] = useState("Cairo");

  // Memoize the date to prevent unnecessary recalculations
  const date_today = useMemo(() => new Date(), []);

  // Memoize the formatting function
  const formattingTime = useCallback((time) => {
    if (!time) return "00:00";
    
    let [houres, minutes] = time.split(":").map(Number);
    const perd = houres >= 12 ? "م" : "ص ";
    houres = houres % 12 || 12;

    const arabicHours = convertToArabicNumerals(houres);
    const arabicMinutes = convertToArabicNumerals(
      minutes < 10 ? `0${minutes}` : minutes
    );

    return `${arabicHours}:${arabicMinutes} ${perd}`;
  }, []);

  useEffect(() => {
    let isSubscribed = true;

    const fetchPrayerTimes = async () => {
      try {
        // Check localStorage first
        const cachedData = localStorage.getItem(`prayerTimes_${city}_${date_today.toDateString()}`);
        
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          if (isSubscribed) {
            setPrayerTimes(parsedData.timings);
            setDates({
              GregoianDate: parsedData.date.gregorian.date,
              HijriDateDay: parsedData.date.hijri.day,
              HijriDateMonth: parsedData.date.hijri.month.ar,
              HijriDateYear: parsedData.date.hijri.year,
            });
          }
          return;
        }

        const response = await fetch(
          `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Eg&date=${date_today}`
        );
        const prayer_data = await response.json();

        if (!isSubscribed) return;

        // Cache the data with date in the key
        localStorage.setItem(
          `prayerTimes_${city}_${date_today.toDateString()}`,
          JSON.stringify(prayer_data.data)
        );

        setPrayerTimes(prayer_data.data.timings);
        setDates({
          GregoianDate: prayer_data.data.date.gregorian.date,
          HijriDateDay: prayer_data.data.date.hijri.day,
          HijriDateMonth: prayer_data.data.date.hijri.month.ar,
          HijriDateYear: prayer_data.data.date.hijri.year,
        });
      } catch (error) {
        console.error("Error fetching prayer times:", error);
      }
    };

    fetchPrayerTimes();

    // Cleanup subscription
    return () => {
      isSubscribed = false;
    };
  }, [city, date_today]);

  // Memoize the prayer times list
  const prayerTimesList = useMemo(() => {
    if (!prayerTimes) return null;
    
    return (
      <div className="prayers">
        <Prayer name="الفجر" time={formattingTime(prayerTimes.Fajr)} />
        <Prayer name="الشروق" time={formattingTime(prayerTimes.Sunrise)} />
        <Prayer name="الظهر" time={formattingTime(prayerTimes.Dhuhr)} />
        <Prayer name="العصر" time={formattingTime(prayerTimes.Asr)} />
        <Prayer name="المغرب" time={formattingTime(prayerTimes.Maghrib)} />
        <Prayer name="العشاء" time={formattingTime(prayerTimes.Isha)} />
      </div>
    );
  }, [prayerTimes, formattingTime]);

  return (
    <section className="h-screen overflow-hidden bg-cover bg-no-repeat bg-center flex flex-col items-center justify-center px-4">
      <div className="container mx-auto max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[50%] xl:max-w-[40%] backdrop-blur-md rounded-xl shadow-lg">
        {/* top section */}
        <div id="top" className="flex flex-col sm:flex-row justify-between items-center border-b-2 p-3 gap-2 sm:gap-4">
          {/* date */}
          <div className="text-center sm:text-right animate__animated animate__fadeInLeft">
            <h3 className="text-lg sm:text-xl mb-1">التاريخ</h3>
            <div className="space-y-0.5 sm:space-y-1">
              <h3 className="text-  xl text-gray-200 date-text animate__animated animate__fadeInLeft border-b">
                {dates.GregoianDate.split("-")
                  .map((num) => convertToArabicNumerals(num))
                  .join(" / ")}{" "}
                م
              </h3>
              <h3 className="text-  xl text-gray-200 date-text animate__animated animate__fadeInLeft border-b">
                {convertToArabicNumerals(dates.HijriDateDay)} / {" "}
                {dates.HijriDateMonth} / {" "}
                {convertToArabicNumerals(dates.HijriDateYear)} هـ 
              </h3> 
            </div>
          </div>

          {/* city selection */}
          <div className="city flex md:flex-col items-center sm:items-start sm:w-auto animate__animated animate__fadeInRight">
            <h3 className="text-lg sm:text-xl mb-1">المدينة</h3>
            <select
              name="city"
              className="rounded-lg p-2 w-full sm:w-auto text-sm sm:text-base"
              onChange={(e) => setCity(e.target.value)}
              value={city}
            >
              {Cities.map((city) => (
                <option key={city.value} value={city.value}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* prayer times table */}
        <div className="p-2 sm:p-3 prayers animate__animated animate__fadeInUp">
          {prayerTimesList || <Loader />}
        </div>
      </div>
      <div className="mt-2">
        <AMLogo />
      </div>
    </section>
  );
}

export default App;
