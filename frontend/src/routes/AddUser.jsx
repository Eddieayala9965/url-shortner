import { Form, redirect } from "react-router-dom";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("userEmail");
  const password = formData.get("userPassword");
  const data = { email, password };
  const url = "http://localhost:8000/register";

  const addUser = async (data) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, options);
    data = await response.json();
    console.log({ data });
    return { data };
  };
  const result = await addUser(data);

  console.log("Add user response:", result);

  return redirect("/users");
};
const AddUser = () => {
  return (
    <Form method="POST">
      <label>
        Username
        <input type="text" name="userEmail" />
      </label>
      <label>
        Password
        <input type="text" name="userPassword" />
      </label>
      <button type="submit">Add New User</button>
    </Form>
  );
};
export default AddUser;
