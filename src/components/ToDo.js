import React from "react";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const ToDo = ({ el, doc_id, update_todo_list }) => {
  console.log(doc_id);

  const handleDone = () => {
    const todoRef = doc(db, "todo", doc_id);
    setDoc(todoRef, { active: false }, { merge: true });
    update_todo_list();
  };

  return (
    <div className="card todo-card">
      <div className="align-middle">{el.message}</div>
      <div className="todo-actions">
        {/* if todo is active, renders done button. */}
        {el.active && (
          <button onClick={handleDone} className="btn btn-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default ToDo;
