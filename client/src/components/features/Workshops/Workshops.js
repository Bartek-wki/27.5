import React from 'react';

import Workshop from '../Workshop/Workshop';

const Workshops = ({ concerts }) => (
  <section>
    {concerts.map(concerts => <Workshop key={concerts.id} {...concerts} />)}
  </section>
)

export default Workshops;
