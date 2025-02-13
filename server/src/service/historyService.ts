import {promises as fs} from 'fs';
import { v4 as uuidv4 } from 'uuid';

// TODO: Define a City class with name and id properties
class City {
  cityName: string;
  id: string;

  constructor(city: string, id:string) {
    this.cityName = city;
    this.id = id;
  }
};

// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read(): Promise<City[]> {
    try{
    const searchHistory = await fs.readFile('searchHistory.json', 'utf8');
    const cities: City[] = JSON.parse(searchHistory);
    return cities;
    } catch (error) {
      console.error('Error reading search history:', error);
      return [];
    }
  }

  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
   private async write(cities: City[]) {
      return await fs.writeFile('searchHistory.json', JSON.stringify(cities, null, '\t'));
    };
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
    async getCities() {
      return await this.read().then((cities) => {
        let parsedCities : City[];

        try {
          if (typeof cities === 'string') {
          parsedCities = [].concat(JSON.parse(cities));
        } else {
          parsedCities = cities;
        }
      } 
        catch (err) {
          parsedCities = [];
        }

        return parsedCities;
      });
    }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
    async addCity(city: string) {
      if (!city) {
        throw new Error('City cannot be blank');
      }
      const id = uuidv4();
      const newCity: City = new City(city, id);

      const cities = await this.getCities();
      
      if (cities.find(oldCity => oldCity.cityName === city )){
        throw new Error ('City already has been searched');
      }
      cities.push(newCity);
      await this.write(cities);
    }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) {
    const cities = await this.getCities();
    const updatedCities = cities.filter(city => city.id !== id);
    
    await this.write(updatedCities);
  }
}

export default new HistoryService();
