import * as React from 'react';
import {
  useNavigate
} from 'react-router-dom'
import type { Post } from '@/types/index'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Eye, Heart } from "lucide-react";
import LazyLoad from 'react-lazy-load';

interface PostItemProps {
  post: Post;
}
const PostItem: React.FC<PostItemProps> = ({post}) => {
  console.log(post, '//////')
  const navigate = useNavigate();
  return (
    <div 
      className="flex border-b border-border py-4 py-2"
      // 动态路由 暴露资源 restful url 资源具有描述性 
      onClick={() => { navigate(`/post/${post.id}`)}}
    >
      <div className="flex-1 pr-4 space-y-2">
        <div className="flex items-center gap-2">
        {
          post.tags.map((tag, index) => (
            <Badge 
              key={index} 
              variant="outline"
              className="text-xs"
            >{tag}</Badge>
          ))
        }
        </div>
        {/* 列表里面行高的截取 */}
        <h2 className="text-base font-semibold leading-tight line-clamp-1">
        {post.title}
        </h2>
        <p className="text-sm text-muted-foreground line-clamp-1">
        { post.brief}
        </p>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Avatar className="w-5 h-5">
              <AvatarImage src={post.user.avatar} />
              <AvatarFallback>{post.user.avatar}</AvatarFallback>
            </Avatar>
            <span>{post.user.name}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Eye className="w-3 h-3"/>
            <span>{post.totalComments}</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="w-3 h-3"/>
            <span>{post.totalLikes}</span>
          </div>
        </div>
      </div>
      {
        post.thumbnail && (
          <div className="w-24 h-24 flex-shrink-0 relative overflow-hidden">
            <LazyLoad className="w-full h-full">
              <img 
                loading="lazy"
                src={post.thumbnail}
                className="w-full h-full object-cover"
              />
            </LazyLoad>
          </div>
        )
      }
    </div>
  )
}

export default PostItem