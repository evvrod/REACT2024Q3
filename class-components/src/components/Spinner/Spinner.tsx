import { Component } from 'react';
import './Spinner.css';

class Spinner extends Component {
  render() {
    return (
      <div className="spinner-overlay">
        <div className="spinner-container" />
      </div>
    );
  }
}

export default Spinner;
