#include <iostream>
using namespace std;
#define Maxsize 100
typedef int ElemType;
typedef struct{
    ElemType* list;
    int length; // 增加一个length成员变量，用于记录线性表的长度
} SqList;

void insert(int A[], int &n, int i, int x){
    if(i<0||i>n)
        return;
    if(n>=Maxsize)
        return;
    for(int j=n;j>=i;j--){
        A[j+1]=A[j];
    }
    A[i]=x;
    n++;
}

int main(){
    SqList L; // 定义一个SqList类型的变量L
    L.list = new int[Maxsize]; // 为L.list分配内存
    L.length = 0; // 初始化L.length为0
    insert(L.list, L.length, 0, 10); // 在L.list的第一个位置插入元素10
    insert(L.list, L.length, 1, 20); // 在L.list的第二个位置插入元素20
    insert(L.list, L.length, 2, 30); // 在L.list的第三个位置插入元素30
    for(int i=0;i<L.length;i++){
        cout << L.list[i] << " "; // 输出L.list中的元素
    }
    cout << endl;
    delete[] L.list; // 释放L.list所占用的内存
    return 0;
}


