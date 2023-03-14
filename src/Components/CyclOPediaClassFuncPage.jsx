import React, { useEffect, useRef, useState, useId } from "react";
import { getRandomUser } from "../Utility/api";
import InstructorFunc from "./InstructorFunc";

const CyclOPediaFuncPage = () => {
  const [state, setState] = useState(() => {
    return {
      instructor: undefined,
      studentList: [],
      studentCount: 0,
      hideInstructor: false,
    };
  });

  // const [totalRender, setTotalRender] = useState(0);
  const totalRender = useRef(0); // contain {current: 0}
  const prevStudentCount = useRef(0); // contain {current: 0}
  const feedbackInputRef = useRef(null);
  const id = useId();

  const [inputName, setInputName] = useState(() => {
    return "";
  });
  const [inputFeedback, setInputFeedback] = useState(() => {
    return "";
  });

  useEffect(() => {
    console.log("This will be called on EVERY Render");
    // setTotalRender((prevState) => prevState + 1);
    totalRender.current = totalRender.current + 1;
    console.log("render : " + totalRender.current);
  });

  useEffect(() => {
    console.log("This will be called on Initial/first render/mount");

    const getUser = async () => {
      const response = await getRandomUser();
      setState((prevState) => {
        return {
          ...prevState,
          instructor: {
            name:
              response.data.first_name +
              " " +
              response.data.last_name,
            email: response.data.email,
            phone: response.data.phone_number,
          },
        };
      });
    };

    if (state.hideInstructor) {
      getUser();
    }
  }, [state.hideInstructor]);

  useEffect(() => {
    const getUser = async () => {
      const response = await getRandomUser();
      setState((prevState) => {
        return {
          ...prevState,
          studentList: [
            ...prevState.studentList,
            {
              name:
                response.data.first_name +
                " " +
                response.data.last_name,
            },
          ],
        };
      });
    };
    console.log(prevStudentCount.current + " " + state.studentCount);
    if (prevStudentCount.current < state.studentCount) {
      getUser();
    } else if (prevStudentCount.current > state.studentCount) {
      prevStudentCount.current = 0;
      setState((prevState) => {
        return { ...prevState, studentList: [] };
      });
    }
  }, [state.studentCount]);

  useEffect(() => {
    prevStudentCount.current = state.studentCount;
  }, [state.studentCount]);

  useEffect(() => {
    console.log("This will be called value of hideInstuctor changes");
  }, [inputFeedback, inputName]);

  useEffect(() => {
    feedbackInputRef.current.focus();
  }, []);

  useEffect(() => {
    console.log("This will be called on Initial/first render/mount");
    return () => {
      console.log(
        "This will be called on when component eill be Unmounted"
      );
    };
  }, []);

  const handleAddStudent = () => {
    setState((prevState) => {
      return {
        ...prevState,
        studentCount: prevState.studentCount + 1,
      };
    });
  };

  const handleRemoveAllStudent = () => {
    setState((prevState) => {
      return {
        ...prevState,
        studentCount: 0,
      };
    });
  };

  const handleTopggleInstructor = () => {
    setState((prevState) => {
      return {
        ...prevState,
        hideInstructor: !prevState.hideInstructor,
      };
    });
  };

  return (
    <div>
      <div className="p-3">
        <span className="h4 text-success">Instructor</span>
        <i
          className={`bi ${
            state.hideInstructor ? "bi-toggle-off" : "bi-toggle-on"
          } btn btn-success btn-sm m-1`}
          onClick={handleTopggleInstructor}
        ></i>
        {!state.hideInstructor && state.instructor ? (
          <InstructorFunc instructor={state.instructor} />
        ) : null}
      </div>
      <div className="p-3">Total Render : {totalRender.current}</div>
      <div className="p-3">
        <span className="h4 text-successs">Feedback</span>
        <br />
        <input
          type="text"
          placeholder="Name..."
          value={inputName}
          onChange={(e) => {
            setInputName(e.target.value);
          }}
          id={`${id}-inputName`}
        ></input>{" "}
        <br />
        <label htmlFor={`${id}-inputName`}>Name Value: </label>{" "}
        {inputName}
        <br />
        <textarea
          ref={feedbackInputRef}
          placeholder="Feedback..."
          value={inputFeedback}
          onChange={(e) => {
            setInputFeedback(e.target.value);
          }}
          id={`${id}-inputFeedback`}
        ></textarea>
        <br />
        <label htmlFor={`${id}-inputFeedback`}>
          Feedback Value:{" "}
        </label>{" "}
        {inputFeedback}
      </div>
      <div className="p-3">
        <span className="h4 text-success">Students</span>
        <br />
        <div>Student Count : {state.studentCount}</div>
        <button
          className="btn btn-success btn-sm"
          onClick={handleAddStudent}
        >
          Add Student
        </button>
        &nbsp;
        <button
          className="btn btn-danger btn-sm"
          onClick={handleRemoveAllStudent}
        >
          Remove All Students
        </button>
        {state.studentList.map((student, index) => {
          return (
            <div
              className="text-white"
              key={index}
            >
              - {student.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CyclOPediaFuncPage;
