import {
  useEffect
} from 'react'
import './App.css'
import { useUserStore } from '@/store/useUserStore'
import {
  useNavigate,
  useLocation
} from 'react-router-dom';
import BackToTop  from '@/components/BackToTop';

export const needsLoginPath = ['/mine', '/order', '/chat']

function App() {
  const {isLogin} = useUserStore();
  const navigate = useNavigate();
  const {pathname} = useLocation();
  
  useEffect(() => {
    if (!isLogin && needsLoginPath.includes(pathname)) {
      navigate("/login");
    }
  }, [isLogin, navigate, pathname]);
  return (
    <>
      <BackToTop/>
    </>
  )
}

export default App
