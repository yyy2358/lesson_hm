#include <iostream>
#include <string>

using namespace std;
// 这行代码的作用是引入整个标准命名空间（std）到当前的编译单元中。
// 在C++中，标准库的所有内容都包含在std命名空间中。
// 通过使用using namespace std;，程序员可以在不指定命名空间前缀的情况下直接使用标准库中的类、对象和函数。
// 例如，如果没有这行代码，你在使用cout进行输出时，就需要写成std::cout，而有了这行代码，你就可以直接写cout。
struct Stu{
    string name;
    int age;
    double score;
}s3;

int main(){
    // Stu stu ={"xyq",18,99.9};
    // Stu stu;
    // stu.name="xyq";
    // stu.age=18;
    // stu.score=100;
    // cout<<stu.name<<","<<stu.age<<","<<stu.score;
    s3.name="xyq";
    s3.age=18;
    s3.score=999;
    cout<<s3.name<<","<<s3.age<<","<<s3.score;
    return 0;
}