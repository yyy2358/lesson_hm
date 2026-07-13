import {
  useResolvedPath,
  useMatch,
  Link
} from 'react-router-dom';

export default function Navigation() {
  const isActive = (to) => {
    const resolvedPath = useResolvedPath(to); // to 解析为Location 对象
    console.log(resolvedPath);
    // 当前路由比对
    const match = useMatch({
      path: resolvedPath.pathname,
      end: true
    })
    // console.log(to, match, '/////')
    return match ? 'active': '';
  }
  return (
    <nav>
      <ul>
        <li>
          <Link to="/" className={isActive('/')}>Home</Link>
        </li>
        <li>
          <Link to="/about" className={isActive('/about')}>About</Link>
        </li>
        <li>
          <Link to="/products">Product</Link>
        </li>
        <li>
          <Link to="/products/new">Product New</Link>
        </li>
        <li>
          <Link to="/products/123">Product Detail</Link>
        </li>
        <li>
          <Link to="/pay">Pay</Link>
        </li>
        <li>
          <Link to="/old-path">old-path</Link>
        </li>
      </ul>
    </nav>
  )
}