// import { Link } from 'react-router-dom';

// function Navbar() {
//   return (
//     <nav style={{ backgroundColor: '#333', padding: '10px' }}>
//       <Link to="/" style={{ color: 'white', marginRight: '10px' }}>Home</Link>
//       <Link to="/about" style={{ color: 'white', marginRight: '10px' }}>About</Link>
//       <Link to="/services" style={{ color: 'white', marginRight: '10px' }}>Services</Link>
//       <Link to="/contact" style={{ color: 'white' }}>Contact</Link>
//     </nav>
//   );
// }

// export default Navbar;


import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "1rem", background: "#ddd" }}>
      <Link to="/" style={{ margin: "0 1rem" }}>Home</Link>
      <Link to="/about" style={{ margin: "0 1rem" }}>About</Link>
      <Link to="/services" style={{ margin: "0 1rem" }}>Services</Link>
      <Link to="/contact" style={{ margin: "0 1rem" }}>Contact</Link>
    </nav>
  );
}

export default Navbar;
