export default function authHeader() {
  const auth_token = localStorage.getItem('auth-token');

  if (auth_token) {
    return { 'auth-token': auth_token, 'Content-Type': 'application/json' };
  } else {
    return {};
  }
}
