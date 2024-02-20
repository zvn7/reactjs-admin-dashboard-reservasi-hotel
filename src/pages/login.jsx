import { useRef, useState } from "react";

const LoginPage = () => {
  const formRef = useRef();
  const [errorMessage, setErrorMessage] = useState("");

  // Function to generate a random string
  const generateRandomString = (length) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData(formRef.current);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });

      // Generate a random string for the token
      const randomToken = generateRandomString(32);

      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          token: randomToken,
        }),
      });

      if (response.ok) {
        const userData = await response.json();
        sessionStorage.setItem("token", randomToken);
        sessionStorage.setItem("user", JSON.stringify(userData.data.id));

        // Check user role and redirect
        switch (userData.data.role) {
          case "manager":
            window.location.href = "/manager/dashboard";
            break;
          case "resepsionis":
            window.location.href = "/resepsionis/dashboard";
            break;
          case "room_service":
            window.location.href = "/roomservice/dashboard";
            break;
          default:
            // If there is no valid role, redirect to the login page
            setErrorMessage("Invalid role. Please log in again.");
            console.log(userData.data.role);
        }
      } else {
        if (response.status === 401) {
          setErrorMessage("Incorrect email or password. Please try again.");
        } else {
          setErrorMessage("An error occurred. Please try again later.");
        }
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div
      id="auth"
      className="d-flex align-items-center justify-content-center min-vh-100"
    >
      <div className="col-lg-5 col-12">
        <div id="auth-left">
          <h1 className="auth-title">Log in.</h1>
          <p className="auth-subtitle mb-5">
            Log in with your data that you entered during registration.
          </p>

          <form ref={formRef} onSubmit={handleLogin}>
            <div className="form-group position-relative has-icon-left mb-4">
              <input
                type="email"
                className="form-control form-control-xl"
                placeholder="Email"
                name="email"
              />
              <div className="form-control-icon">
                <i className="bi bi-envelope"></i>
              </div>
            </div>
            <div className="form-group position-relative has-icon-left mb-4">
              <input
                type="password"
                className="form-control form-control-xl"
                placeholder="Password"
                name="password"
              />
              <div className="form-control-icon">
                <i className="bi bi-shield-lock"></i>
              </div>
            </div>
            {errorMessage && (
              <p className="text-red-500 mb-5">{errorMessage}</p>
            )}
            <button
              type="submit"
              className="btn btn-primary btn-block btn-lg shadow-lg mt-5"
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
