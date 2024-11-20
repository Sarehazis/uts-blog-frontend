import PropTypes from "prop-types";

const AdminLayout = ({ children }) => {
  return (
    <div>
      <div className="reader-dashboard">
        <h1>Admin Dashboard</h1>
        {children}
      </div>
    </div>
  );
};
AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;
