import React from 'react';
import {FaAddressBook,FaQrcode,FaMobileAlt,FaRegEnvelope } from "react-icons/fa";
import Header from '../components/Header';
import Tab from '../components/Tab';

import '../styles/Find.scss'

function App() {
  return (
    <div className='find_wrap'>
      <Header />

      <div className='main'>
        <ul className="find_method">
          <li><a href="#"><FaAddressBook/>Find</a></li>
          <li><a href="#"><FaQrcode/>QR Code</a></li>
          <li><a href="#"><FaMobileAlt />Shake</a></li>
          <li><a href="#"><FaRegEnvelope />Invite via SMS</a></li>
        </ul>
        <section className="recommend_section">
          <h2>Recommended Friends</h2>
          <ul>
            <li>You Have no recommended friends.</li>
          </ul>
        </section>
      </div>

      <Tab />
    </div>
  );
}

export default App;