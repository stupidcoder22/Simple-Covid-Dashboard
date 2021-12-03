import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './State.css';
function State() {
  const [apidata, setapidata] = useState([]);
  const [title, settitle] = useState({lh: 'darkMode', dk: 'lightMode'})
  const [flag, setflag] = useState(false)

  useEffect(async () => {
    const res = await fetch("https://data.covid19india.org/data.json");
    const actualdata = await res.json();
    setapidata(actualdata.statewise);
  }, []);

  function themechange(){
      setflag(!flag);
  }

  return (
    <div>
      <div className='uparbar'>
      <h1 className='text-center mt-3 mb-3 heading'>Prateek's Covid 19 DashBoard</h1>
      <div>
      <button onClick={themechange} className={`border border-${flag?"light":"dark"} btn btn-${flag?"light":"dark"}`}>{flag?title.dk:title.lh}</button>
      </div>
      </div>
      <div>
        <table className={`table table-bordered table-hover table-${flag?'dark':'light'}`}>
          <thead>
            <tr>
              <th scope="col">State</th>
              <th scope="col">Confirmed</th>
              <th scope="col">Recovered</th>
              <th scope="col">Deaths</th>
              <th scope="col">Active</th>
              <th scope="col">Updated</th>
            </tr>
          </thead>
          <tbody>
            {apidata.map((lord, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{lord.state}</th>
                  <td>{lord.confirmed}</td>
                  <td>{lord.recovered}</td>
                  <td>{lord.deaths}</td>
                  <td>{lord.active}</td>
                  <td>{lord.lastupdatedtime}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default State;
