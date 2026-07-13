import {
  useState 
} from 'react';
// import { useMineStore } from '@/store/mine'
import { useUserStore } from '@/store/useUserStore'
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import {
  Drawer,
  DrawerClose,
  DrawerHeader,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer';
import { Camera, Upload, Sparkles } from 'lucide-react'
import Loading from '@/components/Loading';

export default function Mine() {
  const {
    user,
    logout,
    aiAvatar
  } = useUserStore();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleAction = async (type: string) => {
    setOpen(false);
    if (type === 'ai') {
      setLoading(true);
      await aiAvatar();
      setLoading(false);
    }
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white p-6 pb-10 mb-4">
        <div className="flex items-center space-x-4">
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <div className="h-16 w-16 rounded-full bg-primary/10 flex 
              items-center justify-center text-primary text-xl font-bold">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                  {user?.name?.[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader className="text-left">
                  <DrawerTitle>修改头像</DrawerTitle>
                  <DrawerDescription>
                    请选择一种方式更新您的个人头像
                  </DrawerDescription>
                </DrawerHeader>
                <div className="p-4 space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start h-14 text-base"
                    onClick={() => handleAction('camera')}
                  >
                    <Camera className="mr-3 h-5 w-5 text-blue-500"/>
                    拍照
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-start h-14 text-base"
                    onClick={() => handleAction('upload')}
                  >
                    <Upload className="mr-3 h-5 w-5 text-blue-500"/>
                    从相册上传
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-start h-14 text-base
                    bg-gradient-to-r from-purple-600 to-indigo-600 border-none  
                    "
                    onClick={() => handleAction('ai')}
                  >
                    <Sparkles className="mr-3 h-5 w-5 text-yellow-300"/>
                    从相册上传
                  </Button>
                </div>
                <DrawerFooter className="pt-2">
                  <DrawerClose asChild>
                    <Button variant="ghost" className="w-full h-12">取消</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
          <div>
            <h2 className="text-xl font-bold">{user?.name}</h2>
            <p className="text-sm text-gray-500">ID: {user?.id}</p>
          </div>
        </div>
      </div>
      <div className="mt-4.space-y-4 p-4">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-center py-2 border-b last:border-b-0">
            <span>我的订单</span>
            <span className="text-gray-400 text-sm">&gt;</span>
          </div>
          <div 
            onClick={() => navigate('/git')}
            className="flex justify-between items-center py-2 border-b last:border-b-0">
            <span>AI git 工具</span>
            <span className="text-gray-400 text-sm">&gt;</span>
          </div>
          <div 
          onClick={() => navigate('/rag')}
          className="flex justify-between items-center py-2 border-b last:border-b-0">
            <span>RAG</span>
            <span className="text-gray-400 text-sm">&gt;</span>
          </div>
        </div>
        <Button
          variant="destructive"
          className="w-full mt-8 h-12 rounded-xl text-base font-semibold shadow-md 
          shadow-red-100
          "
          onClick={() => logout()}
        >退出登录</Button>
      </div>
      {loading && <Loading />}
    </div>
  )
}