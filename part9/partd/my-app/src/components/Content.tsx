import React from "react";
import Part from "./Part"
import { CoursePart } from "../types";

const CourseItem = (props: CoursePart) => {
  return (
    <p>
        {props.name} {props.exerciseCount}
    </p>
  )
}

interface Props {
  courses: CoursePart[]
}

const Content = (props: Props) => {
  return (
    <>
      {
        props.courses.map((course, index) => {
          return (
            <Part key={index} course={course}/>
          )
        })
      }
    </>
  )
}

export default Content