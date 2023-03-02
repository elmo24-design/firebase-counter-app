import { useState, useEffect } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa'
import { BiRefresh } from 'react-icons/bi'
import firebaseLogo from './images/firebase-logo.png'
import reactLogo  from './images/reactLogo.png'
import './App.css';

import { 
  onSnapshot,
  collection,
  query,
  doc,
  updateDoc
} from 'firebase/firestore'
import { db } from './firebase.config';

function App() {
  const [count, setCount] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchCounter = async() =>{
    try{
      const counterRef = collection(db, 'counter') 
  
      const q = query(counterRef)

      onSnapshot(q, (snap) => {
        const counters = []
        snap.forEach((doc) => {
            return counters.push({
              id: doc.id,
              data: doc.data()
            })
        })

        setCount(counters[0])
        setLoading(false)
      })
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    fetchCounter()
  }, [])

  const decrement  = async() => {
    const docRef = doc(db, "counter", count.id)

    await updateDoc(docRef, {
      value: count.data.value - 1
    })
  }

  const increment  = async() => {
    const docRef = doc(db, "counter", count.id)

    await updateDoc(docRef, {
      value: count.data.value + 1
    })
  }

  const reset = async() => {
    const docRef = doc(db, "counter", count.id)

    if(count.data.value !== 0){
      await updateDoc(docRef, {
        value: 0
      })
    }
  }


  return (
    <div className="App">
      <div className="container">
        <div className="orange-box">
          <h1>Counter App</h1>
        </div>

        <div className="white-box">
          <div className="dec-btn" onClick={decrement}>
            <FaMinus />
          </div>
          <div className="center">
            {
              count && !loading?
              <>
                <h1 className='number'>{count.data.value}</h1>
                <div className="reset-btn" onClick={reset}>
                  <BiRefresh />
                  Reset
                </div>
              </>
              :
              <p className='loading'>Loading...</p>
            }
           
          </div>
         
          <div className="inc-btn" onClick={increment}>
            <FaPlus />
          </div>
        </div>

        <div className="footer">
          <small>Powered by:</small>
          <div className="images">
            <img src={reactLogo} alt="react" className='reactLogo' />
            <img src={firebaseLogo} alt="react" className='firebaseLogo' />
          </div>
       
        </div>

      </div>
    </div>
  );
}

export default App;
