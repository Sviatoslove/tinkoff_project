import { NavLink } from "react-router-dom";

const UserPage = () => {
  return ( <h1>Hello user
    <NavLink to='/'>Go back</NavLink>
  </h1> );
}
 
export default UserPage;