import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'


function App() {
  const [array, setArray] = useState([])
  const [data, setData] = useState([])


  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8080/api");
    setArray(response.data.fruits)
    console.log(response.data.fruits);
  }

  useEffect(() => {
    fetchAPI();
    fetch('http://localhost:8080/especialidades')
    .then(res => res.json())
    .then(data => setData(data))
    .catch(error => console.log(error))
  }, [])

  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      {
        array.map((fruit, index) => (
          <div key={index}>
            <p>{fruit}</p> <br />
          </div>
        ))
      }
      <table>
        <thead>
        <th>cod_especialidad</th>
        <th>nombre_especialidad</th>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              <td>{d.cod_especialidad}</td>
              <td>{d.nombre_especialidad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default App
