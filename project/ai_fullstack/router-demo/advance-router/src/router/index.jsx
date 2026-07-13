import {
  lazy, // 懒加载
  Suspense //  Suspense 组件，用于包裹懒加载的组件
} from 'react';
import {
  Navigate,
  Routes, // 一组路由
  Route // 单个路由
} from 'react-router-dom'
import LoadingFallback from '../components/LoadingFallback';

const Home = lazy(() => import('../pages/Home')); // 分享链接
// import About from './pages/About'
const About = lazy(() => import('../pages/About'))// 懒加载
const UserProfile = lazy(() => import('../pages/UserProfile'))
const Product = lazy(() => import('../pages/product'));
const ProductDetail = lazy(() => import('../pages/product/ProductDetail'));
const NewProduct = lazy(() => import('../pages/product/NewProduct'));
const Login = lazy(()=>import('../pages/Login'));
const ProtectRoute = lazy(()=>import('../components/ProtectRoute'));
const Pay = lazy(()=>import('../pages/Pay'));
const NotFound = lazy(()=>import('../pages/NotFound'));
const NewPath = lazy(()=>import('../pages/NewPath'));

export default function RouterConfig() {
  return (
    <Suspense fallback={<LoadingFallback/>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* 动态路由 http(s)://www.juejin.cn/user/12345?keyword=23#/about
            协议：// domain/path/:params?queryString
        */}
        <Route path="/user/:id" element={<UserProfile />} />
        <Route path="/products" element={<Product/>}>
          <Route path=":productId" element={<ProductDetail />}/>
          <Route path="new" element={<NewProduct />}/>
        </Route>
        <Route path="/login" element={<Login/>}/>
        <Route path="/old-path" element={<Navigate replace to="/new-path"/>}/>
        <Route path="/new-path" element={<NewPath />}/>
        {/* 鉴权的路由 */}
        <Route path="/pay" element={
          <ProtectRoute>
            <Pay />
          </ProtectRoute>
        }>
        </Route>
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </Suspense>
  )
}