import React from 'react';
import { Alert, Progress } from 'reactstrap';

import Workshops from '../Workshops/Workshops';

class Prices extends React.Component {
  componentDidMount() {
    const { loadConcerts } = this.props;
    loadConcerts();
  }
  
  render() {
    const { request, concerts } = this.props;
    if(request.pending) return <Progress animated color="primary" value={50} />; 
    else if(request.error) return <Alert color="warning">{request.error}</Alert>;
    else if(!request.success || !concerts.length) return <Alert color="info">No concerts</Alert>;
    else if(request.success) return (
      <>
        <Workshops concerts={concerts}/>
      </>
    )
  }
}

export default Prices