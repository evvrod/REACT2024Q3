import { Component } from 'react';
import './Spinner.css';

class Spinner extends Component {
  render() {
    return (
      <div className="spinner-overlay">
        <div
          role="progressbar"
          aria-label="Loading"
          className="spinner-container"
        />
      </div>
    );
  }
}

export default Spinner;
