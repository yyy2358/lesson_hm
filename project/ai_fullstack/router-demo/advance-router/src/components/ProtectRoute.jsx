import {
  Navigate
} from 'react-router-dom'

export default function ProtectRoute({ children }) {
  const isLoggedIn = localStorage.getItem('isLogin') === 'true';
  if (!isLoggedIn) {
    return <Navigate to="/login"/>
  }
  return (
    <>
      {children}
    </>
  )
}