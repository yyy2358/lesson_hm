import {
  useState,
  // useEffect
} from 'react';
import {
  useUserStore
} from '@/store/useUserStore';
import {
  Button
} from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import type { Credentail } from '@/types';
import {
  useNavigate
} from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate();
  const { login } = useUserStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<Credentail>({
    name: "",
    password: ""
  })
  const handleChange  = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { id, value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]:value
    }));
  }

  const handleLogin = async (e:React.FormEvent) => {
    e.preventDefault();
    const name = formData.name.trim();
    const password = formData.password.trim();
    if (!name || !password) return ;
    setLoading(true);
    try{
      await login({name, password});
      // 登录丛history中移除
      navigate("/", { replace: true })
    } catch(err) {
      console.log(err, "登录失败")
    } finally {
      setLoading(false);
    }

  }
  return (
    <div className="min-h-screen flex flex-col items-center 
    justify-center p-6 bg-white">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">登录</h1>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            {/* 无障碍访问  for + id  for 关键字, react htmlFor */}
            <Label htmlFor="name">用户名</Label>
            <Input 
              id="name"
              placeholder='请输入用户名'
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            {/* 无障碍访问  for + id  for 关键字, react htmlFor */}
            <Label htmlFor="password">密码</Label>
            <Input 
              id="password"
              placeholder="请输入密码"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <Button>
          {loading?(<><Loader2 className="mr-2 h-4 w-4 animate-spin"/>
          登录中...
          </>)
          :('立即登录')}
          </Button>
        </form>
        <Button variant="ghost" className="w-full" 
        onClick={() => navigate("/")}>暂不登录，回首页</Button>
      </div>
    </div>
  )
}