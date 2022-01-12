import React from "react";

interface Course {
  name: string,
  exerciseCount: number
}

interface ContentProps {
  courses: Course[]
}

const CourseItem = (props: Course) => {
  return (
    <p>
        {props.name} {props.exerciseCount}
    </p>
  )
}

const Content = (props: ContentProps) => {
  return (
    <>
      {
        props.courses.map((course, index) => {
          return (
            <CourseItem 
              key={index} 
              name={course.name} 
              exerciseCount={course.exerciseCount}
            />
          )
        })
      }
    </>
  )
}

export default Content