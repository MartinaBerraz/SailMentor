// import { client } from "../../api/client";
// import bcrypt from "bcryptjs";
// import { setLoginError, setToken } from "./authSlice";

// export const loginUser = (credentials) => async (dispatch) => {
//   try {
//     const { password, ...otherFormData } = credentials;

//     // Hash the password
//     // const hashedPassword = await bcrypt.hash(password, 10); // Use an appropriate number of rounds
//     // console.log(hashedPassword);

//     // Replace the password in the formData with the hashed password
//     // const hashedCredentials = {
//     //   ...otherFormData,
//     //   password: hashedPassword,
//     // };
//     // Make an API request to log in
//     console.log(credentials);

//     const response = await client.post("login/", credentials);
//     // Extract the token from the response
//     dispatch(setToken(response.data));

//   } catch (error) {
//     dispatch(setLoginError("Login failed. Please check your credentials."));

//     // You can also log the error for debugging
//     console.error("Login error:", error);
//   }
// };
