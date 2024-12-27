import Prayer from "./components/Prayer";
import { Cities } from "../src/assets/constants";
import { useEffect, useState } from "react";

function App() {
  const [prayerTimes, setPrayerTimes] = useState();
  // setting dates
  const [GregianDate, setGregoianDate] = useState("");
  const [HijriDate, setHijriDate] = useState("");
  // setting city
  const [city, setCity] = useState("");

  // getting todays date
  const date_today = new Date();

  useEffect(() => {
    // fetching prayer times from api
    const fetchPrayerTimes = async () => {
      try {
        const response = await fetch(
          `https://api.aladhan.com/v1/timingsByCity/${date_today}?city=Eg&country=cairo`
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
    console.log(city);

    fetchPrayerTimes();
  }, []);

  return (
    <section className=" h-[100vh] bg-cover bg-no-repeat">
      <div className="container w-[90%] lg:w-[40%] relative top-10 justify-self-center md:justify-self-start md:top-36 md:right-60">
        {/* top section */}
        <div id="top" className="grid grid-cols-2 border-b-2 p-5">
          {/* city selection */}
          <div className="city gap-6">
            <h3 className="text-2xl">المدينة</h3>
            <select
              name="city"
              className="rounded-md"
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
          <div className="gap-6 space-y-2">
            <h3 className="text-2xl">التاريخ</h3>
            <div className="date space-y-2">
              <h3 className=" text-gray-200">{GregianDate} / م</h3>
              <h3 className=" text-gray-200">{HijriDate} / هـ</h3>
            </div>
          </div>
        </div>

        {/* prayer times table */}
        {prayerTimes ? (
          <>
            <Prayer name="الفجر" time={prayerTimes.Fajr ?? "N/A"} />
            <Prayer name="الظهر" time={prayerTimes.Dhuhr ?? "N/A"} />
            <Prayer name="العصر" time={prayerTimes.Asr ?? "N/A"} />
            <Prayer name="المغرب" time={prayerTimes.Maghrib ?? "N/A"} />
            <Prayer name="العشاء" time={prayerTimes.Isha ?? "N/A"} />
          </>
        ) : (
          <p>Loading prayer times...</p> // or an error message
        )}
      </div>
    </section>
  );
}

export default App;
