import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [todo, settodo] = useState("");
  const [todotasks, settodotasks] = useState([]);
  const [changeid, setchangeid] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (changeid){
      const edit=todotasks.find((e)=> e.id === changeid);
      const edited=todotasks.map((e)=> e.id === edit.id?(
        (e = {id: e.id, todo})) : {id: e.id, todo: e.todo}
      );

      settodotasks(edited);
      setchangeid(0);
      settodo("");

      return;
    }

    if (todo!==''){
      settodotasks([{id:`${todo}-${Date.now()}`, todo}, ...todotasks]);
    }
  };

  const handleDelete = (id) => {
    const removetodo = todotasks.filter((e)=> e.id !== id);
    settodotasks([...removetodo]);
  };

  const handleEdit = (id) => {
    const changetodo=todotasks.filter((e)=> e.id === id);
    settodo(changetodo.todo);
    setchangeid(id);
  };

  return (
    <div className="ToDo">
      <div className="title-container">
        <h1>To Do</h1>
      </div>

      <form className="input-field" onSubmit={handleSubmit}>
        <input className="input-box" type="text" value={todo} onChange={(e)=>settodo(e.target.value)}></input>
        <button className="input-button">{changeid ? "Edit" : "Enter"}</button>
      </form>

      <ul className="list">
        {todotasks.map((e) => (
            <li>
              <span className="list-text" key={e.id}>{e.todo}</span>
              <button className="edit-button" onClick={()=>handleEdit(e.id)}>Edit</button>
              <button className="delete-button" onClick={()=>handleDelete(e.id)}>Delete</button>
            </li>
          ))}
      </ul>

    </div>
  );
};

export default App;