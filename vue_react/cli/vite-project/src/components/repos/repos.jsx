import {useState} from 'react'
import './repos.css'
function Repos(){
    //vue template ?   函数式组件
    // const repos = [
    //     {
    //         id:1,
    //         name:'lesson_hm'
    //     },
    //     {
    //         id:2,
    //         name:'algo-hello'
    //     },
    //     {
    //         id:3,
    //         name:'prompt'
    //     }
    // ]//从js方面去学习
    
    //vue template?   函数式组件
    //js 区域
    // 使用一个响应式数据状态
    //返回数组，使用结构，数组的第一项是当前的状态，数组的第二项是修改状态的方法
    const [repos,setRepos] = useState([
       
    ])
    const [loading,setLoading] = useState(true)

    fetch('http://api.github.com/users/yyy2358/repos')
      .then(res => res.json())
      .then(data =>{
        setRepos(data)
        setLoading(false)
      })
    return (
        //html 区域   react发明了一种 JSx 语法   可在js中写html
        //JS
        <div className="github-repos">
            <h2>Github Repositories</h2>
            {loading && <p>loading...</p>}
        <ul>
            {//作用域的对象repos
                repos.map(repo =>( 
                 <li key={repo.id}>
                    <a href={repo.html_url}>{repo.name}</a>
                    <span>作者：{repo.owner.login}</span>
                    </li>
                ))
            }
        </ul>
        {!loading && repos.length == 0 && <p>没有repos</p>}
        </div>
    )
}

export default Repos