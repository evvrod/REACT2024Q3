import { Component } from 'react';
import './SearchBar.css'

interface PropsSearchBar {
  onSearch: (query: string) => void;
}

interface StateSearchBar {
  query: string;
}

class SearchBar extends Component<PropsSearchBar, StateSearchBar> {
  constructor(props: PropsSearchBar) {
    super(props);
    this.state = {
      query: '',
    };
  }

  componentDidMount() {
    const { onSearch } = this.props;
    const { query } = this.state;
    const savedQuery = localStorage.getItem('searchQuery');
    if (savedQuery) {
      this.setState({ query: savedQuery });
      onSearch(savedQuery);
    } else {
      onSearch(query);
    }
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  handleSearch = () => {
    const { query } = this.state;
    const { onSearch } = this.props;
    const trimmedQuery = query.trim();
    localStorage.setItem('searchQuery', trimmedQuery);
    onSearch(trimmedQuery);
  };

  render() {
    const { query } = this.state;

    return (
      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={this.handleInputChange}
          placeholder="Search..."
        />
        <button type="button" onClick={this.handleSearch}>
          Search
        </button>
      </div>
    );
  }
}

export default SearchBar;
