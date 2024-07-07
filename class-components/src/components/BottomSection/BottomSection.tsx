import { Component } from 'react';
import ItemInfo from '../ItemInfo/ItemInfo';
import Spinner from '../Spinner/Spinner';

import { Item } from '../../services/apiStarWarsSearch';

import './BottomSection.css';

interface PropsBottomSection {
  items: Item[];
  loadingApi: boolean;
  error: string | null;
}

class BottomSection extends Component<PropsBottomSection> {
  render() {
    const { items, loadingApi, error } = this.props;
    return (
      <div className="bottom-section">
        {loadingApi && <Spinner />}
        {error && <div>{error}</div>}
        {!error && items.length === 0 && <div>No results found.</div>}
        {!error && items.map((item) => <ItemInfo key={item.id} item={item} />)}
      </div>
    );
  }
}

export default BottomSection;
