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
  private cityName: string;

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
    const URL = `${this.baseURL}/geo/1.0/direct?q=${this.cityName}&limit=5&appid=${this.apiKey}&units=imperial`
    return URL;
  }
    //
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    //api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
    const URL = `${this.baseURL}/data/2.5/forcast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=imperial`
    return URL;
  }
    
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    //return await this.fetchLocationData(this.buildGeoCodeQuery) returns string of weather data for one city lat long
    //return this.DestructureLocationData();
    const URL = this.buildGeocodeQuery();
    this.fetchLocationData(URL).then((data) => this.destructureLocationData(data))

  }
    
  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}
      //this.buildWeatherQuery , this.ParseCurrentWeather , this.buildForcastArray  use these 3 in this method
  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
      //
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
    //
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    //update the classes property of city
    this.cityName = city
    //get coordinates based on the cityName
    // the method is this.fetchAndDestructureLocationData(); to get coordinates
    // await this.fetchWeatherData(pass coordinates to it)
    // return the weather
    this.fetchAndDestructureLocationData();

    await this.fetchWeatherData(Coordinates);
    
    return weather;
  }
}

export default new WeatherService();
