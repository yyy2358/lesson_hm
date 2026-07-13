import {
  Outlet
} from 'react-router-dom'
export default function Product() {
  return (
    <>
      <h1>产品列表</h1>
      <Outlet />
    </>
  )
}