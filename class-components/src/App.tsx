import { Component } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import './App.css';

class App extends Component<object> {

  handleSearch = (query: string) => {
    console.log(query);
  };

  render() {
    return (
      <div className="wrapper">
        <h1>Star Wars Search</h1>
        <div className="top-section">
          <SearchBar onSearch={this.handleSearch} />
        </div>
        <div className="bottom-section" />
      </div>
    );
  }
}

export default App;
