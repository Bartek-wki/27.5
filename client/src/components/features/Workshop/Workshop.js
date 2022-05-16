import React from 'react';

const Workshop = ({ price, workshops, day }) => (
  <>
    <h2>Day {day === 1 && 'One'}{day === 2 && 'Two'}{day === 3 && 'Three'}</h2>
    <p>Price: {price}$</p>
    <p>Workshops: {workshops.join(', ')}</p>
  </>
)
 
export default Workshop