import users from "@/data/users.json";

export const SESSION_COOKIE_NAME = "portfolio_session";

export function verifyCredentials(username, password) {
  const normalizedUsername = String(username || "").trim();
  const normalizedPassword = String(password || "").trim();

  const match = users.find(
    (user) =>
      user.username.toLowerCase() === normalizedUsername.toLowerCase() &&
      user.password === normalizedPassword,
  );

  if (!match) {
    return null;
  }

  return {
    username: match.username,
    name: match.name,
    role: match.role,
  };
}

export function getUserFromSession(sessionValue) {
  const username = String(sessionValue || "").trim();

  if (!username) {
    return null;
  }

  const match = users.find((user) => user.username === username);

  if (!match) {
    return null;
  }

  return {
    username: match.username,
    name: match.name,
    role: match.role,
  };
}
