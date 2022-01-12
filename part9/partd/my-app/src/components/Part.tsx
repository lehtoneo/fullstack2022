import React from "react"
import { CourseNormalPart, CoursePart, CourseProjectPart, CourseSubmissionPart, CourseSpecialPart } from "../types"
import { assertNever } from "../utils"

interface Props {
  course: CoursePart
}


const NormalPart = ({ course }: { course: CourseNormalPart }) => {
  
  return (
    <p>
      <strong style={{ fontWeight: "bold"}}>
        {course.name} {course.exerciseCount}
      </strong>
      <br/>
      <i>
        {course.description}
      </i>
    </p>
  )
}

const SubmissionPart = ({ course }: { course: CourseSubmissionPart }) => {
  return (
    <p>
      <strong style={{ fontWeight: "bold"}}>
        {course.name} {course.exerciseCount}
      </strong>
      <br/>
      <i>
        {course.description}
      </i>
      <br/>
      submit to {course.exerciseSubmissionLink}
    </p>
  )
}

const ProjectPart = ({ course }: { course: CourseProjectPart }) => {
  return (
    <p>
      <strong style={{ fontWeight: "bold"}}>
        {course.name} {course.exerciseCount}
      </strong>
      <br/>
      project exercises {course.groupProjectCount}
    </p>
  )
}

const SpecialPart = ({ course }: { course: CourseSpecialPart }) => {
  return (
    <p>
      <strong style={{ fontWeight: "bold"}}>
        {course.name} {course.exerciseCount}
      </strong>
      <br/>
      <i>
        {course.description}
      </i>
      <br/>
      required skills: {course.requirements.map((req) => {

        return `${req},`;
      })}
    </p>
  )
}

const Part = ({ course }: Props) => {
  

  const renderPart = () => {
      switch(course.type) {
        case 'normal':
          return <NormalPart course={course}/>;
        case 'submission':
          return <SubmissionPart course={course}/>;
        case 'groupProject':
          return <ProjectPart course={course}/>;
        case 'special':
          return <SpecialPart course={course}/>;
        default:
          return assertNever(course)
      }
    
  }
  
  return (
   renderPart()
  )
}

export default Part;