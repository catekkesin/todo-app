import React, { useEffect } from "react";
import ToDo from "../../components/ToDo";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import {
  getDocs,
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
} from "firebase/firestore";

const Home = () => {
  const { user } = UserAuth();
  // const navigate = useNavigate();
  const [todo, setTodo] = React.useState("");
  const [list, setList] = React.useState([]);

  const updateTodoList = async () => {
    const temp = [];
    const q = query(
      collection(db, "todo"),
      where("uid", "==", user.uid),
      where("active", "==", true)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      temp.push({ doc_id: doc.id, data: doc.data() });
    });
    setList(temp);
  };

  useEffect(() => {
    updateTodoList();
  }, []);

  const handleTodo = async (e) => {
    if (todo !== "") {
      try {
        const docRef = await addDoc(collection(db, "todo"), {
          message: todo,
          created: serverTimestamp(),
          uid: user.uid,
          active: true,
        });

        setTodo("");

        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }

    updateTodoList();

    console.log(user);
  };

  return (
    <>
      <div className="card">
        <input
          onChange={(e) => {
            setTodo(e.target.value);
          }}
          type="text"
          className="form-control w-4/6 m-2"
        />
        <button onClick={handleTodo} className="btn btn-primary w-1/6 m-2 ">
          Add
        </button>
      </div>
      {list.map((el) => {
        return (
          <ToDo
            update_todo_list={updateTodoList}
            key={el.data.created}
            doc_id={el.doc_id}
            el={el.data}
          ></ToDo>
        );
      })}
    </>
  );
};

export default Home;
