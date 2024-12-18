#include <iostream>
using namespace std;
typedef struct node{
    int data;
    struct node *link;
}Lnode,*linkList;
void dele(linkList L, int i) {
    linkList p = L;
    int j = 0;
    while (p->link!= NULL && j < i - 1) {
        p = p->link;
        j++;
    }
    if (p->link == NULL) {
        printf("删除位置不合理");
        return;
    }
    linkList q = p->link;
    p->link = q->link;
    free(q);
}

void dele(linkList L,int i)//L为指向线性链表第一个节点的指针，i为要删除的元素的位置
{
    linkList p,q;
    int j;
    p=L;
    j=0;
    while(p->link!=NULL&&j<i-1)
    {
        p=p->link;
        j++;
    }
    if(p->link==NULL)
    {
        printf("删除位置不合理");
        return;
    }
    q=p->link;
    p->link=q->link;
    free(q);
}
int main()
{
    linkList L;
    Lnode *p;
    int i;
    L=(linkList)malloc(sizeof(Lnode));
    L->link=NULL;
    p=L;
    for(i=0;i<10;i++)
    {
        Lnode *s;
        s=(linkList)malloc(sizeof(Lnode));
        s->data=i;
        s->link=NULL;
        p->link=s;
        p=s;
    }
    dele(L,5);
    p=L->link;
    while(p!=NULL)
    {
        cout<<p->data<<" ";
        p=p->link;
    }
    cout<<endl;
    return 0;
}
