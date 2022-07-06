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

const Oldies = () => {
  const { user } = UserAuth();
  // const navigate = useNavigate();
  const [todo, setTodo] = React.useState("");
  const [list, setList] = React.useState([]);

  const updateTodoList = async () => {
    const temp = [];
    const q = query(
      collection(db, "todo"),
      where("uid", "==", user.uid),
      where("active", "==", false)
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

  return (
    <>
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

export default Oldies;
