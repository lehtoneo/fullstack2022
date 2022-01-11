import express, { Request, Response } from 'express'
import calculateBmi from './bmiCalculator';

const app = express();



app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req: Request, res: Response) => {

  const { weight, height } = req.query
  const heightNumber = Number(height)
  const weightNumber = Number(weight)
  if (isNaN(weightNumber) || isNaN(heightNumber)) {
    res.send({
      error: 'malformatted parameters'
    })
    
  } else {
    const bmi = calculateBmi(heightNumber, weightNumber);

    const result = {
      weight,
      height,
      bmi
    }

    res.send(result)
  }
  
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});