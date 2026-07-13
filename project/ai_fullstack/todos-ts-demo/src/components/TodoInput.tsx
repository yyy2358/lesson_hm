import * as React from 'react';

interface Props {
  onAdd: (title: string) => void;
}

const TodoInput:React.FC<Props> = ({ onAdd }) =>  {
  const [value, setValue] = React.useState<string>('');
  const handleAdd = () => {
    if (!value.trim()) return;
    onAdd(value);
    setValue('');
  }
  return (
    <div>
      <input 
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <button onClick={handleAdd}>添加</button>
    </div>
  ) 
}

export default TodoInput