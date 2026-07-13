import React, {
  useEffect,
  useState
} from 'react'
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import { throttle } from '@/utils';

interface BackToTopProps {
  // 滚动超过多少像素后显示按钮
  threshold?: number
}

const BackToTop: React.FC<BackToTopProps> = ({
  threshold = 400
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > threshold);
    }
    const thtottled_func = throttle(toggleVisibility, 200);
    window.addEventListener('scroll', thtottled_func);
    return () => window.removeEventListener('scroll', thtottled_func);
  }, [threshold])
  
  if (!isVisible) return null;

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={scrollTop}
      className="fixed bottom-6 right-6 rounded-full shadow-lg
       hover:shadow-xl z-50"
    >
      <ArrowUp className="h-4 w-4"/>
    </Button>
  )
}

export default BackToTop