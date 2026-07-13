import {
  useNavigate
} from 'react-router-dom';
import {
  useEffect
} from 'react'

const NotFound = () => {
  // Link 点击跳转 
  let navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate('/')
    }, 6000)
  }, [])
  return (
    <>
      NotFound
    </>
  )
}

export default NotFound