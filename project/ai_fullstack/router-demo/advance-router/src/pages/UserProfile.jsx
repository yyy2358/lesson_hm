import {
  useParams
} from 'react-router-dom';

export default function UserProfile() {
  const { id } = useParams(); // 路由参数对象
  return (
    <>
      UserProfile {id}
    </>
  )
}