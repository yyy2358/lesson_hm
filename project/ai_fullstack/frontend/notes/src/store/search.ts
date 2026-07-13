import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { doSearch } from '@/api/search'

interface SearchState {
  loading: boolean;
  suggestions: []; // 建议列表
  history: string[];
  search: (keyword: string) => Promise<void>;
  addHistory: (keyword: string) => void;
  clearHistory: () => void;
}

export const useSearchStore = create<SearchState>()(
  persist(
    (set, get) => ({
      loading: false,
      suggestions: [], 
      history: [],
      search: async (keyword: string)=>{
        if (!keyword.trim()) { // keyword清空
          set({ suggestions:[]});// 清空建议列表
          return;
        }
        set({ loading: true});
        try {
          // url ASCII 码 编码
          const res = await doSearch(encodeURIComponent(keyword));
          const data: [] = res.data || [];
          // console.log(data);
          set({
            suggestions: data
          })
          get().addHistory(keyword.trim());
        } catch(err) {
          console.error('Search failed:', err);
          set({ suggestions: [] });
        } finally {
          set({ loading: false});
        }
      },
      addHistory: (keyword: string) => {
        const trimmed = keyword.trim();
        if (!trimmed) {
          return;
        }
        const { history } = get();
        const exists = history.includes(trimmed);
        let newHistory = exists?[trimmed, ...history.filter(h => h !== trimmed)]
        : [trimmed, ...history];
        newHistory = newHistory.slice(0, 10);
        set({ history: newHistory});
      },
      clearHistory: () => {
        set({ history: []});
      }
    }),
    {
      name: 'search-store',
      partialize: (state)=> ({history: state.history})
    }
  )
) 