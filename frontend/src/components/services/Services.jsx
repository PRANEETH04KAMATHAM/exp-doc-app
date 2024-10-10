import React from 'react'
import {services} from "../../assets/data/services";
import ServicesCard from '../services/ServicesCard';

const Services = () => {
  return <section>
    <div className="container">
    <div className='services-list'>
      {services.map((item, index) => (
        <ServicesCard item={item} index={index} key={index} />
      ))}
    </div>
    </div>
  </section>
}

export default Services