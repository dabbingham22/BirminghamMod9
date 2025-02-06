import {promises as fs} from 'fs';

// TODO: Define a City class with name and id properties
class City {
  city: string;
  id: string;

  constructor(city: string, id:string) {
    this.city = city;
    this.id = id;
  }
}
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
      return await fs.writeFile('db/db.json', JSON.stringify(cities, null, '\t'));
    };
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
    async getCities() {
      return await this.read().then((cities) => {
        let parsedCities : City[];

        try {
          parsedCities = [].concat(JSON.parse(cities));
        } catch (err) {
          parsedCities = [];
        }

        return parsedCities;
      });
    }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
    async addCity(city: string) {
      if (!city) {
        throw new Error('state cannot be blank');
      }
    }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
    async removeCity(id: string) {
      return await this.getCities()
      
};
}
export default new HistoryService();
