import { Form, redirect } from "react-router-dom";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("userEmail");
  const password = formData.get("userPassword");
  const loginData = { email, password };

  try {
    const url = `${import.meta.env.VITE_SOURCE_URL}/login`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    };
    const response = await fetch(url, options);
    const statusCode = response.status;
    const data = await response.json();

    const { access_token } = data;
    localStorage.clear();
    localStorage.setItem("access_token", access_token);
    return statusCode === 200 ? true : false;
  } catch (error) {
    console.error("ERROR", error);
    return false;
  }
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
