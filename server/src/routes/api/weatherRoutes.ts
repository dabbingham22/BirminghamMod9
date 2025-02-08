import { Router, type Request, type Response } from 'express';
const router = Router();
// import request from 'request';
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  // TODO: GET weather data from city name
  const cityName = req.body.cityName;
  WeatherService.getWeatherForCity(cityName).then((data) =>{
    // fire the historyservice add city method and pass the city name to it
    res.json(data) //returning weather data from the backend to the frontend
  }  )



  // different way 
  // const data = await WeatherService.getWeatherForCity(cityName);
  // res.json(data)



  const history = await fetch('https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={f12dbee1}', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

    //add fetch 
  // TODO: save city to search history
  // console.log(req, res);
  res.send("testing");
});

// TODO: GET search history
router.get('/history', async (_req: Request, res: Response) => {
  //res.status(400).send("testing");
  try {
    const savedCities = await HistoryService.getCities();
    res.json(savedCities);
  } catch (err){
    
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (_req: Request, _res: Response) => {
  
});

export default router;
