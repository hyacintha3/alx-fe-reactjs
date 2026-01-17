// import WelcomeMessage from './components/WelcomeMessage';
// import Header from './components/Header';
// import MainContent from './components/MainContent';
// import Footer from './components/Footer';
// import UserProfile from './components/UserProfile';

// function App() {
//     return (
//         <div>
//              <WelcomeMessage /> 
//             <Header />
//             <MainContent />
//             <Footer />
//             <UserProfile name="Alice" age={25} bio="Loves hiking and photography" />
// <UserProfile name="Bob" age={30} bio="Enjoys cooking and gaming" />

//         </div>
//     );
// }

// export default App;

import UserProfile from './UserProfile';
import UserContext from './UserContext';

function App() {
  const userData = {
    name: "Jane Doe",
    email: "jane.doe@example.com"
  };

  return (
    <UserContext.Provider value={userData}>
      <UserProfile />
    </UserContext.Provider>
  );
}

export default App;
