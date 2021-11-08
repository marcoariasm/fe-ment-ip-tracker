import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import MapComponent from './Map';
import 'leaflet/dist/leaflet.css'

// const datos = JSON.parse(
//   '{"ip":"8.8.8.8","location":{"country":"US","region":"California","city":"Mountain View","lat":37.38605,"lng":-122.08385,"postalCode":"94035","timezone":"-07:00","geonameId":5375480},"domains":["0--9.ru","000180.top","00049ok.com","000xs.net","007515.com"],"as":{"asn":15169,"name":"Google LLC","route":"8.8.8.0/24","domain":"https://about.google/intl/en/","type":"Content"},"isp":"Google LLC"}'
// );

function App() {
  const [IPAddress, setIPAddress] = useState('');
  const [domain, setDomain] = useState('');
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState('');
  const [error, setError] = useState('');
  const [buttonDisabled, setDisabledButton] = useState(true);

  const [IP, setIP] = useState('');
  const [location, setLocation] = useState('');
  const [timezone, setTimezone] = useState('');
  const [ISP, setISP] = useState('');
  const [lat, setlat] = useState('');
  const [lng, setlng] = useState('');
  const [mapReady, setMapReady] = useState(false);

  const validateIPaddress = (ipaddress) => {
    return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
      ipaddress
    );
  };

  const validateDomain = (domain) => {
    return /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/.test(
      domain
    );
  };

  // const validateKeyword = async (keyword) => {
  //   if (validateDomain(keyword) || validateIPaddress(keyword)) {
  //     if (validateDomain(keyword)) {
  //       console.log('domain valid');
  //       setDomain(keyword);
  //       setIPAddress('');
  //       setError('');
  //     }
  //     if (validateIPaddress(keyword)) {
  //       console.log('ip valid');
  //       setIPAddress(keyword);
  //       setDomain('');
  //       setError('');
  //     }
  //   } else {
  //     setDomain('');
  //     setIPAddress('');
  //     setError('Domain or IP Address invalid, please write a valid keyword');
  //   }
  // };

  const handleInputChange = (e) => {
    const text = e.target.value;
    setKeyword(text);
  };

  const getData = async (keyword) => {
    // let resp = {};
    // debugger;
    // await validateKeyword(keyword);
    const endpoint = `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_API_KEY}`;
    if (validateDomain(keyword) || validateIPaddress(keyword)) {
      if (validateDomain(keyword)) {
        setResults(await axios.get(`${endpoint}&domain=${keyword}`));
        console.log('domain valid');
        setDomain(keyword);
        setIPAddress('');
        setError('');
      }
      if (validateIPaddress(keyword)) {
        setResults(await axios.get(`${endpoint}&ipAddress=${keyword}`));
        console.log('ip valid');
        setIPAddress(keyword);
        setDomain('');
        setError('');
      }
    } else {
      setDomain('');
      setIPAddress('');
      setError('Domain or IP Address invalid, please write a valid keyword');
    }
    // if (IPAddress !== '') {
    //   console.log(IPAddress);
    //   // resp = await axios.get(`${endpoint}&ipAddress=${IPAddress}`);
    //   setResults(await axios.get(`${endpoint}&ipAddress=${IPAddress}`));
    //   // console.log('resp', resp);
    //   console.log('results IP',results);
    // }
    // if (domain !== '') {
    //   setResults(await axios.get(`${endpoint}&domain=${domain}`));
    //   // console.log('resp', resp);
    //   console.log('results domain',results);
    // }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getData(keyword);
    console.log('submited');
  };

  useEffect(() => {
    if (error) setDisabledButton(true);
    // !!error
    else setDisabledButton(false);
  }, [error]);

  useEffect(() => {
    if (keyword !== ''){
      setDisabledButton(false);
    }
    else {
      setError('');
      setMapReady(false);
      setIP('');
      setLocation('');
      setTimezone('');
      setISP('');
      setlat('');
      setlng('');
    }
  }, [keyword]);

  useEffect(() => {
    if (results) {
      setIP(results?.data?.ip);
      setLocation(results?.data?.location.country);
      setTimezone(`UTC${results?.data?.location.timezone}`);
      setISP(results?.data?.isp);
      setlat(results?.data?.location.lat);
      setlng(results?.data?.location.lng);
      setMapReady(true);
    }
  }, [results]);

  useEffect(() => {
    if (lat) {
      setlat(lat);
      setlng(lng);
      console.log(lat);
      console.log(lng);
      console.log('map ready');
    }
  }, [mapReady]);

  return (
    <div className='main'>
      <header className='header'>
        <h1>IP Address Tracker</h1>
        <div className='search'>
          <form onSubmit={handleSubmit} name='form'>
            <input
              name='word'
              type='text'
              className='search-keyword'
              placeholder='Search for any IP address or domain'
              onChange={handleInputChange}
              // autoComplete='off'
            />
            <button
              className='search-button'
              disabled={buttonDisabled}
              type='submit'
            >
              <i className="fas fa-chevron-right"></i>
            </button>
            <br />
            <p className='search-error'>{error && `*${error}`}</p>
          </form>
        </div>
      </header>
      <div className='results'>
        <ul>
          <li>
            <p className="results-title"> IP ADDRESS</p>
            <p className="results-content">{IP && IP}</p>
            <span/>
          </li>
          <li>
            <p className="results-title">Location</p>
            <p className="results-content">{location && location}</p>
            {/* {results && results} */}
          </li>
          <li>
            <p className="results-title">Timezone</p>
            <p className="results-content">{timezone && timezone}</p>
            {/* {results && (results.country, results.region)} */}
          </li>
          <li>
            <p className="results-title">ISP</p>
            <p className="results-content">{ISP && ISP}</p>
            {/* {results && results.isp} */}
          </li>
        </ul>
      </div>
      <div id='map'>
        {mapReady && <MapComponent lat={lat} lng={lng} />}
      </div>
    </div>
  );
}

export default App;
