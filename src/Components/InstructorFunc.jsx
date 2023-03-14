import React, { useEffect } from "react";

const InstructorFunc = (props) => {
  useEffect(() => {
    return () => {
      console.log("Instructor - UNMOUNTED");
    };
  }, []);

  return (
    <div className="p-1">
      Name: {props.instructor.name} <br />
      Email: {props.instructor.email} <br />
      Phone: {props.instructor.phone} <br />
      <br />
    </div>
  );
};

export default InstructorFunc;
