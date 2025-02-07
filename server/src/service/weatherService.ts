import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object

// TODO: Define a class for the Weather object

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  // TODO: Create fetchLocationData method
  // private async fetchLocationData(query: string) {}
    //
  // TODO: Create destructureLocationData method
  // private destructureLocationData(locationData: Coordinates): Coordinates {}
    //
  // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {}
    //
  // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {}
    //
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    //return await this.fetchLocationData(this.buildGeoCodeQuery) returns string of weather data for one city lat long
    //return this.DestructureLocationData();


  }
    //
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
  async getWeatherForCity(city: string) {}
    //update the classes property of city
    // this.city = city
    //get coordinates based on the cityName
    // the method is this.fetchAndDestructureLocationData(); to get coordinates
    // await this.fetchWeatherData(pass coordinates to it)
    // return the weather
}

export default new WeatherService();
