import axios from "axios";
const url = "https://disease.sh/v3/covid-19";

export const fetchData = async (country) => {
  let changeableUrl = `${url}/all`;
  if (country) {
    changeableUrl = `${url}/countries/${country}`;
  }
  try {
    const { data } = await axios.get(changeableUrl);
    const modifiedData = {
      confirmed: data.active,
      recovered: data.recovered,
      deaths: data.deaths,
      lastUpdate: data.updated,
    };
    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/historical/all?lastdays=30`);
    const dailyData = formatDailyData(data);
    const modifiedData = dailyData.map((dailyData) => ({
      confirmed: dailyData.confirmed,
      deaths: dailyData.deaths,
      date: dailyData.reportDate,
    }));
    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCountries = async () => {
  try {
    const { data } = await axios.get(`${url}/countries`);
    return data.map((countryObj) => countryObj.country);
  } catch (error) {
    console.log(error);
  }
};

function formatDailyData(data) {
  const dailyCases = calculateDailyChanges(data.cases);
  const dailyDeaths = calculateDailyChanges(data.deaths);
  const dailyRecovered = calculateDailyChanges(data.recovered);

  // Combine into an array of daily summaries
  return Object.keys(dailyCases).map((date) => ({
    reportDate: date,
    confirmed: dailyCases[date],
    deaths: dailyDeaths[date],
    recovered: dailyRecovered[date],
  }));
}

function calculateDailyChanges(cumulativeData) {
  const dates = Object.keys(cumulativeData);
  const dailyChanges = {};

  for (let i = 1; i < dates.length; i++) {
    const currentDate = dates[i];
    const previousDate = dates[i - 1];
    dailyChanges[currentDate] =
      cumulativeData[currentDate] - cumulativeData[previousDate];
  }

  return dailyChanges;
}
