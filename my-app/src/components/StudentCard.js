import React, { useMemo, useState, useCallback } from "react";
import "./index.css";
import { FaPlus, FaMinus } from "react-icons/fa";
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
        const val = event.target.value.toLowerCase();
        onTagUpdate(id, val);
        event.target.value = "";
      }
    },
    [id, onTagUpdate]
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
        <p>Average: {average}%</p>
        <p>
          <div className="toggleGradesDiv">
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

          <div className="toggleTagDiv">
            {tags.map((tag, index) => (
              <>
                <span
                  className="showTag"
                  key={`student-${student.id} --- tag-${index}`}
                >
                  {tag}
                </span>
              </>
            ))}
          </div>
        </p>
        <input
          className="addTagInput"
          placeholder="Add a tag"
          onKeyUp={onTagChange}
        />
      </div>
      <span className="toggleGradesSign" onClick={toggleGradesVisible}>
        {" "}
        {gradesVisible ? <FaMinus /> : <FaPlus />}
      </span>
    </div>
  );
};

export default StudentCard;
