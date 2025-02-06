import { Router, type Request, type Response } from 'express';
const router = Router();
// import request from 'request';
// import HistoryService from '../../service/historyService.js';
// import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  // TODO: GET weather data from city name
  const cityName = req.body.cityName;
  const history = await fetch('https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}', {
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
  res.status(400).send("testing");
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (_req: Request, _res: Response) => {
  
});

export default router;
