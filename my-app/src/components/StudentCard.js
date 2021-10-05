import React, { useMemo, useState, useCallback, useEffect } from "react";
import "./index.css";
const StudentCard = ({ student, onTagUpdate }) => {
  const {
    id,
    company,
    email,
    firstName,
    grades,
    lastName,
    pic,
    skill,
    tags = [],
  } = student;

  //setNewStudent(student);
  // console.log(newStudent);
  const [gradesVisible, setGradesVisible] = useState(false);
  const name = useMemo(() => {
    return `${firstName} ${lastName}`;
  }, [firstName, lastName]);

  const average = useMemo(() => {
    if (grades.length === 0) {
      return null;
    }
    const total = grades.map(Number).reduce((sum, grade) => (sum += grade), 0);

    return total / grades.length;
  }, [grades]);

  const toggleGradesVisible = useCallback(() => {
    setGradesVisible((prevGradesVisible) => !prevGradesVisible);
  }, []);

  const onTagChange = useCallback(
    (event) => {
      if (event.key === "Enter" && event.target.value !== "") {
        onTagUpdate(id, event.target.value);
        event.target.value = "";
      }
    },
    [onTagUpdate, student.id]
  );

  return (
    <div className="card">
      <div className="imgContainer">
        <img src={pic} alt="student-pic" />
      </div>
      <div className="details">
        <h1>{name}</h1>
        <p>Email: {email}</p>
        <p>Company: {company}</p>
        <p>Skill: {skill}</p>
        <p>Average: {average}</p>
        <p>
          {tags.map((tag, index) => (
            <span key={`student-${student.id} --- tag-${index}`}>{tag}</span>
          ))}
        </p>
        <input placeholder="Add a tog" onKeyUp={onTagChange} />
        {gradesVisible &&
          grades.map((grade, index) => {
            return (
              <p key={`test-score-${index}`}>
                <span>Test {index + 1}:</span>
                <span>{grade}%</span>
              </p>
            );
          })}
      </div>
      <span onClick={toggleGradesVisible}> {gradesVisible ? "-" : "+"}</span>
    </div>
  );
};

export default StudentCard;
