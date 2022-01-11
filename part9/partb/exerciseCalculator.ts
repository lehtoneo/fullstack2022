interface ExerciseResult {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}
type Rating = 1 | 2 | 3



const getRating = (average: number, target: number) : Rating => {
  const lowerBound = target*0.8
  const upperBound = target*1.2

  if (average < lowerBound) {
    return 1
  }
  if (average < upperBound) {
    return 2
  }
  return 3
}
const getRatingDescription = (rating: Rating ) : string => {
  switch(rating) {
    case 1:
      return 'you can do better';
    case 2:
      return 'ok but could be better';
    case 3:
      return 'great';
    default:
      throw new Error('');
  }
}

type InputArray = number[]

const calculateExercises = (hours: InputArray, target: number) : ExerciseResult | string => {
  const periodLength = hours.length
  let trainingDays = 0
  let sumOfHours = 0
  hours.forEach(hour => {
    sumOfHours += hour
    if (hour !== 0) {
      trainingDays += 1
    }
  })
  
  const average = periodLength !== 0 
    ? sumOfHours / periodLength
    : 0

  const rating = getRating(average, target)

  const ratingDescription = getRatingDescription(rating)
  const success = average >= target
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))