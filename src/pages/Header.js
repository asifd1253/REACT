import "../utils/styles.css";

const Header = () => {
  return (
    <div className="header">
      <div className="logo-container">
        <h2 className="logo">My App</h2>
      </div>
      <div className="search-container">
        <input type="text" placeholder="Search..." className="search-input" />
        <button className="search-btn">Search</button>
      </div>
      <div className="user-container">
        <span className="user-icon">👤</span>
      </div>
    </div>
  );
};

export default Header;
