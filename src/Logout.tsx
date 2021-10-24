export default function Logout() {
  window.localStorage.removeItem('jwt');
  window.localStorage.removeItem('userName');
  window.location.href = "/";
  return (
    <div className="article-preview">Loading...</div>
  );
}
