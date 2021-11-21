import "./App.css";
import { useState, useEffect, useMemo, useCallback } from "react";
import { FetchProfiles } from "./api/FetchProfiles";
import StudentCard from "./components/StudentCard";
import "./components/index.css";
function App() {
  const [students, setStudents] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [tagSearchString, setTagSearchString] = useState("");

  const filteredStudents = useMemo(() => {
    if (searchString.length === 0 && tagSearchString.length === 0) {
      return students;
    }
    const stringToMatch = searchString;
    const tagStringToMatch = tagSearchString;

    if (stringToMatch !== "") {
      return students.filter((student) => {
        const nameToString = student.firstName + student.lastName;
        return nameToString.toLowerCase().includes(stringToMatch);
      });
    }

    if (tagStringToMatch !== "") {
      return students.filter((studentTag) => {
        const tagToString = studentTag.tags;
        return tagToString.includes(tagStringToMatch);
      });
    }
  }, [searchString, students, tagSearchString]);

  const handleTagUpdate = useCallback((id, tag) => {
    setStudents((prevStudent) => {
      return prevStudent.map((student) => {
        if (student.id === id) {
          const tags = [...student.tags, tag];

          return {
            ...student,
            tags,
          };
        }

        return student;
      });
    });
  }, []);

  useEffect(() => {
    (async function () {
      const profiles = await FetchProfiles();
      setStudents(
        profiles.map((uStudent) => ({
          ...uStudent,
          tags: [],
        }))
      );
    })();
  }, []);
  return (
    <>
      <div className="mainContainer">
        <input
          className="searchInput"
          placeholder="Search by name"
          onChange={(e) => setSearchString(e.target.value)}
        />
        <input
          className="tagInput"
          placeholder="Search by tag"
          onChange={(e) => setTagSearchString(e.target.value)}
        />
        {filteredStudents.map((student) => (
          <StudentCard
            key={student.id}
            student={student}
            onTagUpdate={handleTagUpdate}
          />
        ))}
      </div>
    </>
  );
}

export default App;
