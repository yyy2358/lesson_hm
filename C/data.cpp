#include<iostream>
using namespace std;
typedef int ElemType; //定义ElemType为int类型
#define Maxsize 100  //定义顺序表最大长度
//宏定义的语法是使用 #define 指令，后面跟上宏的名称和宏的值，并且宏的值后面不需要加分号。
typedef struct{
    ElemType data[Maxsize]; //初始化一个data类型的数组，ElemType是数据类型
    int length;//当前顺序表的长度
}sqlist; //顺序表的类型定义

/**
 * 初始化顺序表
 * @param L 指向顺序表的引用
 */
void Initlist(sqlist &L){//这意味着在 Initlist 函数内部对 L 的任何修改都会反映到函数外部的实际参数上。
    // 遍历顺序表的每个元素
    for(int i=0;i < Maxsize;i++)
        // 将顺序表的每个元素初始化为0
        L.data[i]=0;
    // 将顺序表的长度初始化为0
    L.length = 0;
}

bool ListInsert(sqlist &L,int i,ElemType e){
    
}