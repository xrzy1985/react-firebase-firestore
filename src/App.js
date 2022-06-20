import React, { useEffect, useState } from 'react';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from './config/firebase/firebase.config';
import serializeUser, { defaultUser } from './interfaces/user.jsx';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, 'users');

  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ age, setAge ] = useState(0);
  const [ email, setEmail ] = useState('');


  const persistUserToFirebase = async () => {
    if (firstName && lastName && age && email) {
      await addDoc(usersCollectionRef, {firstName: firstName, lastName: lastName, age: age, email: email});
    }
  }

  const updateUserInFirebase = async (user) => {
    await updateDoc(doc(db, 'users', user.id),
      { firstName: user.firstName, lastName: user.lastName, age: Number(user.age) + 1, email: user.email})
  }

  const deleteUser = async (user) => {
    await deleteDoc(doc(db, 'users', user.id));
  }

  useEffect(() => {
    const getUsersFromFirestore = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map(d => ({...d.data(), id: d.id})));
    }

    getUsersFromFirestore();
  }, []);

  return (
    
    <div className="App">
      <input type='text' placeholder="First Name" onChange={event => setFirstName(event.target.value)}></input>
      <input type='text' placeholder="Last Name" onChange={event => setLastName(event.target.value)}></input>
      <input type='number' placeholder="Age" onChange={event => setAge(event.target.value)}></input>
      <input type='email' placeholder="Email" onChange={event => setEmail(event.target.value)}></input>
      <button onClick={persistUserToFirebase}> create user </button>
      {users.map((u, i) => {
        const user = serializeUser(u.id, u.firstName, u.lastName, u.age, u.email);
        return (
          <div key={i}>
            <p>{i}: {user.firstName} {user.lastName}, {user.age}, {user.email}</p>  
            <button onClick={() => updateUserInFirebase(user)}>Update User</button>
            <button onClick={() => deleteUser(user)}>Delete User</button>
          </div>
        )
      })}
    </div>
  );
}

export default App;


