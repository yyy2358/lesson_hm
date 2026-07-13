import React from 'react'; 
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface HeaderProps {
  title: string;
  showBackBtn?: boolean;
  onBackClick?:() => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBackBtn = false,
  onBackClick=() => window.history.back()
}) => {
  return (
    <header className="flex items-center justify-center h-16 
    px-4 border-b bg-white dark:bg-gray-950 sticky top-0
    z-40">
      <div className="absolute left-4">
      {
        showBackBtn && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onBackClick}
          >
            <ArrowLeft size={20}/>
          </Button>
        )
      }
      </div>
      <h1 className="text-lg font-semibold text-gray-900
       dark:text-gray-100 truncate max-w-[60%] text-center">
      {title}</h1>
      <div className="absolute right-4 w-10"></div>
    </header>
  )
}

export default Header