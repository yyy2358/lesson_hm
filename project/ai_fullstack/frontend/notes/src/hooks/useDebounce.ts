// react 版本的防抖
import {
  useState,
  useEffect
} from 'react';

// 通用
// 泛型， 类型的传参
// keyword? 
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value); // 防抖后的值
  // api 请求 debouncedValue 负责
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    // 如果再次输入， handler timeout id 清除， 
    // 不输入， 时间到了， 定时器执行？
    // 清理函数（新旧状态的清理） 再运行新的 effect
    return () => { // 卸载时， 更新时都会触发
      clearTimeout(handler);
    }
  }, [value, delay]);
  return debouncedValue;
}