import { Form, redirect } from "react-router-dom";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("userEmail");
  const password = formData.get("userPassword");
  const data = { email, password };
  const url = "http://localhost:8000/login";

  const userLogin = async (data) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, options);
    data = await response.json();

    if (response.ok) {
      window.alert(data.detail);
      return true;
    } else {
      window.alert("login failed");
      return false;
    }
  };

  const loginSuccesful = await userLogin(data);
  return loginSuccesful ? redirect("/") : redirect("/user/login");
};
const Login = () => {
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
      <button type="submit">Login</button>
    </Form>
  );
};
export default Login;
