import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express();
app.use(bodyParser.json());

interface ExerciseBody {
  target: number,
  daily_exercises: number[]
}


app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.post('/exercises', (req: Request<unknown, unknown, ExerciseBody>, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  
  if (!daily_exercises || !target) {
    res.send({
      error: "parameters missing"
    });
    return;
  }


  try {
    daily_exercises.forEach(hour => {
      if (isNaN(Number(hour)) || isNaN(Number(target))) {
        throw Error('');
      }
    });
    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(daily_exercises, target);
    
    res.send(result);
    return;
  } catch (error: unknown) {
    res.send({
      error: "malformatted parameters"
    });
    return;
  }
  
});

app.get('/bmi', (req: Request, res: Response) => {

  const { weight, height } = req.query;
  const heightNumber = Number(height);
  const weightNumber = Number(weight);
  if (isNaN(weightNumber) || isNaN(heightNumber)) {
    res.send({
      error: 'malformatted parameters'
    });
    
  } else {
    const bmi = calculateBmi(heightNumber, weightNumber);

    const result = {
      weight,
      height,
      bmi
    };

    res.send(result);
  }
  
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});