import { 
  useRef,
  useEffect
} from 'react';
// load more  通用组件
interface InfiniteScrollProps {
  hasMore: boolean; // 是否所有数据都加载了 分页 
  isLoading?: boolean; // 滚动到底部加载更多 避免重复触发
  onLoadMore: () => void; // 更多加载的一个抽象  /api/posts?page=2&limit=10
  children: React.ReactNode // InfiniteScroll 通用的滚动功能，滚动的具体内容接受定制
}

 const InfiniteScroll:React.FC<InfiniteScrollProps> = ({
  hasMore,
  onLoadMore,
  isLoading = false,
  children
 }) => {
  // HTMLDivElement React 前端全局提供
  const sentinelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // dom , 组件挂在后 sentinelRef.current 
    if (!hasMore || isLoading) return  // 没有数据了， 还在加载中
    // 浏览器内部 没有性能问题
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) { //进入视窗  viewport
        onLoadMore();
      }
    }, {
      threshold: 0 // 
    });
    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }
    // 卸载（路由切换）
    // 更新时
    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current)
      }
    }
  }, [onLoadMore, hasMore, isLoading])
  // react 不建议直接访问dom， useRef
  return (
    <>
      {children}
      {/* Intersection Observer 哨兵元素 */}
      <div ref={sentinelRef} className="h-4"/>
      {
        isLoading && (
        <div className="text-center py-4 text-sm text-muted-foreground">
        加载中...
        </div>
        )
      }
    </>
  )
}
export default InfiniteScroll