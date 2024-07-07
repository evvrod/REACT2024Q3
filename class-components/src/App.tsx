import { Component } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import ItemInfo from './components/ItemInfo/ItemInfo';
import Spinner from './components/Spinner/Spinner';
import { Item, fetchStarWars } from './services/apiStarWars';

import './App.css';

interface State {
  items: Item[];
  loadingApi: boolean;
  error: string | null;
}

class App extends Component<object, State> {
  constructor(props: object) {
    super(props);
    this.state = {
      items: [],
      loadingApi: false,
      error: null,
    };
  }

  fetchItems = async (query: string) => {
    try {
      this.setState({ loadingApi: true, error: null });
      const items = await fetchStarWars(query);
      this.setState({
        items,
        loadingApi: false,
      });
    } catch (err) {
      if (err instanceof Error) {
        this.setState({ loadingApi: false, error: err.message });
      }
    }
  };

  handleSearch = (query: string) => {
    this.fetchItems(query);
  };

  render() {
    const { items, loadingApi, error } = this.state;

    return (
      <div className="wrapper">
        <h1>Star Wars Search</h1>
        <div className="top-section">
          <SearchBar onSearch={this.handleSearch} />
        </div>
        <div className="bottom-section">
          {loadingApi && <Spinner />}
          {error && <div>{error}</div>}
          {!error &&
            items.map((item) => <ItemInfo key={item.id} item={item} />)}
        </div>
      </div>
    );
  }
}

export default App;
