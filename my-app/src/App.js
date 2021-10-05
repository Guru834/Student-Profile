import "./App.css";
import { useState, useEffect, useMemo, useCallback } from "react";
import { FetchProfiles } from "./api/FetchProfiles";
import StudentCard from "./components/StudentCard";
import "./components/index.css";
function App() {
  const [students, setStudents] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [tagSearchString, setTagSearchString] = useState("");
  useEffect(() => {
    (async function () {
      const profiles = await FetchProfiles();

      setStudents(profiles);
    })();
  }, []);

  const filteredStudents = useMemo(() => {
    if (setSearchString.length === 0 && tagSearchString.length === 0) {
      return students;
    }

    if (searchString === 0) {
      return students;
    }
    const stringToMatch = searchString.toLowerCase();
    return students.filter((student) => {
      const nameToString = student.firstName + student.lastName;
      return nameToString.toLowerCase().includes(stringToMatch);
    });
  }, [searchString, students, tagSearchString.length]);

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
