let a:number = 1;
// a = "11"
let b:string = 'hello';
let c:boolean = true;
let d: null = null;
let e: undefined = undefined;
let arr:number[] = [1];
let user:[number, string] = [1, 'Tom'];
// 泛型 类型的传参 T
let arr2: Array<string> = ['a', 'b'];

//ts 借鉴java  微软 
// 枚举类型
enum Status {
  Pending, //0
  Success, // 1
  Failed, // 2
}
// 枚举类型
let s:Status = Status.Pending;
s = Status.Success;
// 类型的推导  
// ts 初学， any 救命
let aa: any = 1; // 任意类型 救命稻草 放弃类型约束
aa = "11"
aa = {}

let bb:unknown = 1; // 未知类型 更安全一些
bb = 'b'; // 使用前做类型检测
// bb.hello(); // 对象 未知类型， 可以接收任何类型， 直接调用方法不可以

let user2:{ name: string, age: number, hometown: string } = {
  name: '瞿翔',
  age: 18,
  hometown: '宜春'
}
// 接口 约定对象 哪些属性和方法
interface  User {
  name: string;
  age: number;
  readonly id: number;
  hobby?: string
}

const u:User = {
  id: 1,
  name: '徐行',
  age: 111,
  hobby: '打瓦'
}
u.name = "徐行瓦弟";
// u.id = 1111;

type ID = string | number; // 自定义类型
let num:ID = "111";

type UserType = {
  name: string
  age: number
  hobby?: string
}

const f: UserType = {
  name: '徐行',
  age: 111,
}
