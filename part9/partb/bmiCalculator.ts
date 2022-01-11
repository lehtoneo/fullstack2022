const calculateBmi = (height: number, weight: number) : string => {
  const heightInMeters = height / 100
  const bmi = weight / (heightInMeters^2)
  if (bmi < 18.5) {
    return 'Underweight'
  }
  if (bmi <= 24.9) {
    return 'Normal (healthy weight)'
  }
  return 'Overweight'
}

console.log(calculateBmi(180, 74))
