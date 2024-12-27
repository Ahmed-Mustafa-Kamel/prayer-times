export const Cities = [
  { name: "القاهرة", value: "Cairo" },
  { name: "الجيزة", value: "Giza" },
  { name: "الاسكندرية", value: "Alexandria" },
  { name: "مطروح", value: "Marsa Matruh" },
  // { name: "البحيرة", value: "Buhiera" },
  { name: "المنصورة", value: "Mansoura" },
  { name: "السويس", value: "Suez" },
  { name: "اسوان", value: "Aswan" },
  { name: "الاقصر", value: "Luxor" },
  { name: "قنا", value: "Qena" },
  { name: "الفيوم", value: "Fayoum" },
  { name: "الاسماعيليه", value: "Ismailia" },
  { name: "دمياط", value: "Damietta" },
];

export const convertToArabicNumerals = (number) => {
  const arabicNumerals = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return number
    .toString()
    .split("")
    .map((digit) => arabicNumerals[digit])
    .join("");
};
