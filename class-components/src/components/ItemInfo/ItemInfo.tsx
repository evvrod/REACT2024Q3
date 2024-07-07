import { Component } from 'react';
import { Item } from '../../services/apiStarWarsSearch';

interface PropsItem {
  item: Item;
}

class ItemInfo extends Component<PropsItem> {
  render() {
    const { item } = this.props;
    const { id, title, description } = item;

    return (
      <div key={id}>
        <h2>{title}</h2>
        <ul>
          <li>birth year : {description.birth_year}</li>
          <li>gender : {description.gender}</li>
          <li>height : {description.height}</li>
          <li>hair color : {description.hair_color}</li>
          <li>eye color : {description.eye_color}</li>
          <li>skin color : {description.skin_color}</li>
        </ul>
      </div>
    );
  }
}

export default ItemInfo;
