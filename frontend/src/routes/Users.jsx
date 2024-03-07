import { useLoaderData } from "react-router-dom";

export const loader = async () => {
  const url = "http://localhost:8000/users";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
  return { data };
};

const Users = () => {
  const { data } = useLoaderData();
  return (
    <div className="flex flex-col gap-10">
      <h1 className=" text-5xl underline">Users</h1>
      <div>
        <ul className="flex flex-col gap-3">
          {data.map((user, index) => {
            return <li key={index}>{user.email}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};
export default Users;
