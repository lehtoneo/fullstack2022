import React from "react";

interface Props {
  count: number
}

const Total = (props: Props) => {
  return (
    <p>
      Number of exercises{" "}
      {props.count}
    </p>
  );
};

export default Total;