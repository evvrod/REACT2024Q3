import { useParams, useSearchParams, Outlet } from 'react-router-dom';

import styles from './HomePage.module.css';

export default function HomePage() {
  const { details } = useParams();
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const page = searchParams.get('page') || '';

  return (
    <>
      <div className={styles.searchBlock} />
      <div className={styles.wrapper}>
        <div className={styles.leftColumn}>
          Query = {query}, page = {page}
        </div>
        <div className={styles.rightColumn}>
          {details && <div>Details id= {details}</div>}
          <Outlet />
        </div>
      </div>
    </>
  );
}

// import { Component } from 'react';
// import TopSection from './components/TopSection/TopSection';
// import BottomSection from './components/BottomSection/BottomSection';
// import { Item, fetchStarWars } from './services/apiStarWarsSearch';
// import Footer from './components/Footer/Footer';
// import logo from './assets/Star_Wars_Logo.svg';

// interface State {
//   items: Item[];
//   loadingApi: boolean;
//   error: string | null;
// }

// class App extends Component<object, State> {
//   constructor(props: object) {
//     super(props);
//     this.state = {
//       items: [],
//       loadingApi: false,
//       error: null,
//     };
//   }

//   fetchItems = async (query: string) => {
//     try {
//       this.setState({ loadingApi: true, error: null });
//       const items = await fetchStarWars(query);
//       this.setState({
//         items,
//         loadingApi: false,
//       });
//     } catch (err) {
//       if (err instanceof Error) {
//         this.setState({ loadingApi: false, error: err.message });
//       }
//     }
//   };

//   handleSearch = (query: string) => {
//     this.fetchItems(query);
//   };

//   render() {
//     const { items, loadingApi, error } = this.state;

//     return (
//       <div className="wrapper">
//         <main>
//           <h1>
//             <img className="logo" src={logo} alt="Logo Star Wars" /> SEARCH
//           </h1>
//           <TopSection onSearch={this.handleSearch} />
//           <BottomSection items={items} loadingApi={loadingApi} error={error} />
//         </main>
//         <Footer />
//       </div>
//     );
//   }
// }
