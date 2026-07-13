import Header from '@/components/Header';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useRagStore } from '@/store/rag';

const RAG: React.FC = () => {
  // Fragment 组件
  const { question, setQuestion, answer, retrieve } = useRagStore();
  const ask = async () => {
    if (!question.trim()) {
      return ;
    }
    await retrieve();
  }
  return (
    <>
      <Header title="RAG" showBackBtn={true} />
      <div className="max-w-xl mx-auto mx-auto mt-10 space-y-4 p-4">
        <Textarea 
          placeholder="请输入你的问题， 例如： 什么是RAG?"
          value={question}
          onChange={e => setQuestion(e.target.value)}
        />
        <Button onClick={ask}>提问</Button>
        {
          answer && (
          <Card>
            <CardContent className="p-4 whitespace-pre-wrap">
            {answer}
            </CardContent>
          </Card>
          )
        }
      </div>
    </>
  )
}

export default RAG