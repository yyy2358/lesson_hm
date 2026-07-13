import { create } from 'zustand';
import type {SlideData} from '@/components/SlideShow';
import type { Post } from '@/types';
import { fetchPosts } from '@/api/posts';

interface HomeState {
  banners: SlideData[];
  posts: Post[];
  loadMore: () => Promise<void>;
  loading: boolean;
  hasMore: boolean;
  page: number;
}
// set方法 用于修改状态
// get方法用户 获取最新的状态 zustand 提供
export const useHomeStore = create<HomeState>((set, get) => ({
  banners:[{
      id: 1,
      title: "React 生态系统",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "移动端开发最佳实践",
      image: "https://img.36krcdn.com/hsossms/20260114/v2_1ddcc36679304d3390dd9b8545eaa57f@5091053@ai_oswg1012730oswg1053oswg495_img_png~tplv-1marlgjv7f-ai-v3:600:400:600:400:q70.jpg?x-oss-process=image/format,webp",
    },
    {
      id: 3,
      title: "百度上线七猫漫剧，打的什么主意？",
      image: "https://img.36krcdn.com/hsossms/20260114/v2_8dc528b02ded4f73b29b7c1019f8963a@5091053@ai_oswg1137571oswg1053oswg495_img_png~tplv-1marlgjv7f-ai-v3:600:400:600:400:q70.jpg?x-oss-process=image/format,webp",
  }],
  page: 1, // 响应式， page++
  loading: false,
  hasMore: true,
  posts:[],
  loadMore: async () => {
    // loading 开关状态 
    if (get().loading) return; // 避免之前的loadMore还没有执行完，又触发 
    // 加载中... 更新状态时, set 只需要传我们想更新的
    set({ loading: true });
    try {
      const { items } = await fetchPosts(get().page);
      if (items.length === 0) { // 所有数据都加载完了 
        set({hasMore: false});
      } else {
        set({
          posts: [...get().posts, ...items],
          page: get().page + 1
        })
      }
    } catch(err) {
      console.error("加载失败", err);
    } finally {
      set({ loading: false });
    }
  }
}))