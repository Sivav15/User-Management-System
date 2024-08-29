let host;

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  host = "http://localhost:4000";
} else {
  host = "http://localhost:4000";
}

// Authenticate
export const register_api = `${host}/api/auth/register`;
export const login_api = `${host}/api/auth/login`;

// user

export const viewUsers_api = `${host}/api/users`;
export const updateUser_api = `${host}/api/users`;
export const deleteUser_api = `${host}/api/users`;
