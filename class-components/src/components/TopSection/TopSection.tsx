import { Component } from 'react';
import SearchBar from '../SearchBar/SearchBar';

import './TopSection.css';

interface PropsTopSection {
  onSearch: (query: string) => void;
}

class TopSection extends Component<PropsTopSection> {
  handleTestingError = () => {
    this.setState(() => {
      throw new Error('Testing error');
    });
  };

  render() {
    const { onSearch } = this.props;
    return (
      <div className="top-section">
        <SearchBar onSearch={onSearch} />
        <button type="button" onClick={this.handleTestingError}>
          Testing Error
        </button>
      </div>
    );
  }
}

export default TopSection;
