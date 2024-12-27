import Prayer from "./components/Prayer";
import { Cities } from "../src/assets/constants";
import { useEffect, useState } from "react";

function App() {
  const [prayerTimes, setPrayerTimes] = useState();
  // setting dates
  const [GregianDate, setGregoianDate] = useState("");
  const [HijriDate, setHijriDate] = useState("");
  // setting city
  const [city, setCity] = useState("Cairo");

  // getting todays date
  const date_today = new Date();

  useEffect(() => {
    // fetching prayer times from api
    const fetchPrayerTimes = async () => {
      try {
        const response = await fetch(
          `https://api.aladhan.com/v1/timingsByCity/${date_today}?city=Eg&country=${city}`
        );
        const prayer_data = await response.json();
        // setting Prayer times
        setPrayerTimes(prayer_data.data.timings);

        // setting gregoianDate
        setGregoianDate(prayer_data.data.date.gregorian.date);
        setHijriDate(prayer_data.data.date.hijri.date);
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
    // Add leading zero to minutes if less than 10
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${houres}:${minutes} ${perd}`;
  };

  return (
    <section className=" h-[100vh] bg-cover bg-no-repeat">
      <div className="container w-[90%] lg:w-[40%] relative top-10 justify-self-center md:justify-self-start md:top-36 md:right-60">
        {/* top section */}
        <div id="top" className="grid grid-cols-2 border-b-2 p-5">
          {/* date */}
          <div className="gap-6 space-y-2">
            <h3 className="text-2xl">التاريخ</h3>
            <div className="date space-y-2">
              <h3 className=" text-gray-200">{GregianDate} / م</h3>
              <h3 className=" text-gray-200">{HijriDate} / هـ</h3>
            </div>
          </div>

          {/* city selection */}
          <div className="city gap-6">
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
      <div className=" absolute bottom-0 right-[30%]">
        <a
          href="https://ahmed-mustafa-portfolio-delta.vercel.app/"
          target="_blank"
          className="text-xs"
        >
          {"< Ahmed Mustafa />"}
        </a>
      </div>
    </section>
  );
}

export default App;
