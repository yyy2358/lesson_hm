import {
  useState,
  useEffect
} from 'react'

const KeepAlive = ({
  activeId,
  children
}) => {
  const [cache, setCache] = useState({});// 缓存组件的
  // console.log(children, "---------");
  useEffect(() => {
    // activeId update 切换显示
    // children update 保存 
    if (!cache[activeId]) { // activeId key
      setCache((prev) => ({
        ...prev,
        [activeId]:children
      }))
    }
    // console.log(cache, "/////////");
  }, [activeId, children, cache])
  return (
    <>
      {
        // Object.entries 对象编程数组 
        // [key, value] 又方便使用
        Object.entries(cache).map(([id, component]) => (
          <div 
            key={id}
            style={{display: id === activeId ? 'block': 'none'}}
          >
            {component}
          </div>
        ))
      }
    </>
  )
}

export default KeepAlive