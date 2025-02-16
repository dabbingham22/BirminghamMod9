import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  name: string;
  lat: string;
  lon: string;
  country: string;
  state: string;

}
interface Forecast{ 
  date: string,
  temperature: number,
  humidity: number,
  windSpeed: number,
  description: string,
  icon: string,
}
// TODO: Define a class for the Weather object
class Weather {
  cityName: string;
  date: string;
  icon: string;
  description: string;
  temperature: number;
  humidity: number;
  windSpeed: number;

constructor( 
  cityName: string,
  date: string,
  icon: string,
  description: string,
  temperature: number,
  humidity: number,
  windSpeed: number,
){
  this.cityName = cityName;
  this.date = date;
  this.icon = icon;
  this.description = description;
  this.temperature = temperature;
  this.humidity = humidity;
  this.windSpeed = windSpeed;
}
}

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL?: string;
  private apiKey?: string;
  private cityName = '';

  constructor(){
    this.baseURL = process.env.API_BASE_URL || "";
    this.apiKey = process.env.API_KEY || "";
    this.cityName = "";
  }
  
  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
   const apiData:Coordinates[] = await  fetch(query).then((data:any)  => data.json())
    return apiData[0]

  }
    
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    const { name, lat, lon, country, state } = locationData
    const coordinates: Coordinates = {
      name, lat, lon, country, state
    }
   return coordinates
  }
    
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    //http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}
    const URL = `${this.baseURL}/geo/1.0/direct?q=${encodeURIComponent(this.cityName)}&limit=5&appid=${this.apiKey}`
    return URL;
  }
    //
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    //api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
    const URL = `${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=imperial`
    return URL;
  }
    
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(city: string) {
    //return await this.fetchLocationData(this.buildGeoCodeQuery) returns string of weather data for one city lat long
    //return this.DestructureLocationData();
    this.cityName = city;
    const URL = this.buildGeocodeQuery();
    const data = await this.fetchLocationData(URL);

    return this.destructureLocationData(data);
  }
    
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    
    try{
    const url = this.buildWeatherQuery(coordinates);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error ('Network response was not ok');
    }

    const data = await response.json();

    const currentWeather = this.parseCurrentWeather(data);
    const forecastArray = this.buildForecastArray(data.list[0],data.list);
    return [
      currentWeather,
      forecastArray
    ];
  } catch (error) {
    console.error('Error fetching weather data');
    throw error;
  }
  
  }
      //this.buildWeatherQuery , this.ParseCurrentWeather , this.buildForcastArray  use these 3 in this method
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {
    const cityName = response.city.name;
    const weatherInfo = response.list[0];

    const currentWeather = {
      date: new Date().toISOString().split('T')[0],
      city: cityName,
      temperature: weatherInfo.main.temp,
      windSpeed: weatherInfo.wind.speed,
      humidity: weatherInfo.main.humidity,
      description: weatherInfo.weather[0].description,
      icon: weatherInfo.weather[0].icon,
    };
    return currentWeather;
  }
      
  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]): Forecast[] {
  const forecastArray: Forecast[] = [currentWeather];

  // const currentForecast: Forecast = {
  //   date: new Date().toISOString().split('T')[0],
  //   temperature: currentWeather.temperature,
  //   humidity: currentWeather.humidity,
  //   windSpeed: currentWeather.windSpeed,
  //   description: currentWeather.description,
  //   icon: currentWeather.icon
  // };

  // forecastArray.push(currentForecast);

  for (let i = 1; i < weatherData.length; i+=8) {   
    const forecast = weatherData[i];
    const forecastEntry: Forecast = {
      date: forecast.dt_txt,
      temperature: forecast.main.temp,
      humidity: forecast.main.humidity,
      windSpeed: forecast.wind.speed,
      description: forecast.weather[0].description,
      icon: forecast.weather[0].icon
    };
    forecastArray.push(forecastEntry);
    }
    return forecastArray;
  }
    
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    //update the classes property of city
    this.cityName = city;
    //get coordinates based on the cityName
    const Coordinates = await this.fetchAndDestructureLocationData(city);

    if (!Coordinates) {
      throw new Error('Could not retrieve coordinates for the specified city');
    }
    // the method is this.fetchAndDestructureLocationData(); to get coordinates
    // await this.fetchWeatherData(pass coordinates to it)
    // return the weather
    const weather = await this.fetchWeatherData(Coordinates);


    return weather;
  }
}

export default new WeatherService();
