import { useAuth } from "../AuthContext";

const Home = () => {
  const { isAuth } = useAuth();
  return (
    <>
      <h1>Home Page</h1>
      {isAuth ? <p>Logged In</p> : <p>Not Logged In</p>}
    </>
  );
};
export default Home;
