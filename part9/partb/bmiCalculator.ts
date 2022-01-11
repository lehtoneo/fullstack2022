
interface ArgumentsParsed {
  weight: number,
  height: number
}

const parseArgumentsBmi = (args: Array<string>): ArgumentsParsed => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      weight: Number(args[2]),
      height: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};


const calculateBmi = (height: number, weight: number) : string => {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters^2);
  if (bmi < 18.5) {
    return 'Underweight';
  }
  if (bmi <= 24.9) {
    return 'Normal (healthy weight)';
  }
  return 'Overweight';
};

try {
  const { height, weight } = parseArgumentsBmi(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

export default calculateBmi;
