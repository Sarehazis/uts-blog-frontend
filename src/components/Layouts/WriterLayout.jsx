import Navbar from "../Navbar";
import PropTypes from "prop-types";

const WriterLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="writer-dashboard">
        <h1>Admin Dashboard</h1>
        {children}
      </div>
    </div>
  );
};
WriterLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default WriterLayout;
