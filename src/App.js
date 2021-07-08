import './App.css';
import bootstrap from "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { FormControl, Select, MenuItem } from '@material-ui/core'
import { useState, useEffect } from 'react'
import Infobox from './Infobox';
import axios from 'axios'


function App() {

  const [countries, setcountries] = useState([])
  const [country, setcountry] = useState("Worldwide")

  useEffect(() => {

    axios.get('https://disease.sh/v3/covid-19/countries').then((res) => {
      // console.log(res.data);
    })
    const getdata = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          const countries = data.map((country) => (
            {
              name: country.country,//country name
              value: country.countryInfo.iso2//country code ind , uk , usa

            }
          ));
          setcountries(countries);
        });

    }
    getdata();
    return () => {

    }
  }, [])

  const oncountrychange = (event) => {
    const countrycode = event.target.value;
    setcountry(countrycode)
  }

  return (
    <>

      <div className=" d-flex justify-content-between align-items-center mb-3">
        <h1 className=" text-center">Covid_19 Tracker</h1>

        <FormControl className="">
          <Select variant="outlined" value={country} onChange={oncountrychange}>
            <MenuItem value="Worldwide">worldwide</MenuItem>
            {countries.map((country) =>
              <MenuItem value={country.value} key={country.key}>{country.name}</MenuItem>
            )}
          </Select>
        </FormControl>
      </div>
      <div className="app_stats">
        <Infobox />
        <Infobox />
        <Infobox />
      </div>
    </>
  );
}

export default App;
