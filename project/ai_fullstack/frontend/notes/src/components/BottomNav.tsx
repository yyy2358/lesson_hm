import { 
  Home, 
  User,
  ListOrdered,
  MessageCircle
} from 'lucide-react'; // 图标字体库
import {
  useNavigate,
  useLocation
} from 'react-router-dom';
import { cn } from '@/lib/utils'; // 组合类名
import { useUserStore } from '@/store/useUserStore'
import { needsLoginPath } from '@/App';

export default function BottomNav() {
  const navigate  = useNavigate();
  const { pathname } = useLocation();
  const { isLogin } = useUserStore((state) => state);
  console.log(isLogin, '?????');
  // console.log(location, '/////');
  const tabs = [
    {
      label: "首页",
      path: "/",
      icon: Home
    },
    {
      label: "订单",
      path: "/order",
      icon: ListOrdered
    },
    {
      label: "我的",
      path: "/mine",
      icon: User
    }
  ]

  const handleNav = (path: string) => {
    if (path === pathname) {
      return;
    }
    console.log(path, '???????????');
    if (needsLoginPath.includes(path) && !isLogin) {
      navigate("/login");
      return;
    }
    navigate(path);
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16
    border-t bg-background flex items-center justify-around
    z-50 safe-area-bottom">
    {
      tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = pathname === tab.path;

        return (<button 
          key={tab.path}
          onClick={() => handleNav(tab.path)}
          className="flex flex-col items-center justify-center 
          w-full h-full space-y-1"
        >
          <Icon 
            size={24} 
            className={cn("transition-colors", 
              isActive? "text-primary" 
              : "text-muted-foreground"
            )}
          />
          <span className={cn("text-xs transition-colors", 
            isActive?"text-primary font-medium": 
            "text-muted-foreground")}>
            {tab.label}
          </span>
        </button>
      )})
    }
    </div>
  )
}