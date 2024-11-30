#include <stdio.h>
#include <string.h> // 添加 string.h 头文件
struct Stu {
    char name[50];
    //C语言中的字符串是使用字符数组来表示的，而不是C++中的string类型。
    // 因此，在结构体Stu中，我们使用了char name[50];来表示姓名，而不是string name;。
    int age;
    double score;
};

int main() {
    struct Stu s3;
    //s3.name = "xyq"; 这行代码会导致编译错误，因为 s3.name 是一个字符数组，它是一个常量，不能被修改。
    // 在C语言中，字符数组的赋值操作是不允许的，你需要使用 strcpy 或 strncpy 等函数来复制字符串。
    strcpy(s3.name, "xyq");
    s3.age = 18;
    s3.score = 98;
    printf("%s, %d, %.1f\n", s3.name, s3.age, s3.score);
    return 0;
}
