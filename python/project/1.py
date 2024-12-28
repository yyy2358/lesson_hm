from typing import List
def solution(heights: List[List[int]]) -> int:
    n = len(heights)
    m = len(heights[0])
    
    # 创建一个二维数组 dp，用于存储从左上角到达每个位置的路径所需的最低花费
    dp = [[float('inf')] * m for _ in range(n)]
    
    # 初始化左上角的花费为 0
    dp[0][0] = 0
    
    # 遍历每个位置，计算从左上角到达该位置的路径所需的最低花费
    for i in range(n):
        for j in range(m):
            # 计算从上方到达当前位置的路径所需的最低花费
            if i > 0:
                dp[i][j] = min(dp[i][j], max(abs(heights[i][j] - heights[i-1][j]), dp[i-1][j]))
            # 计算从左方到达当前位置的路径所需的最低花费
            if j > 0:
                dp[i][j] = min(dp[i][j], max(abs(heights[i][j] - heights[i][j-1]), dp[i][j-1]))
    
    # 返回从左上角到达右下角的路径所需的最低花费
    return dp[n-1][m-1]

if __name__ == '__main__':
    print(solution(heights=[[5, 1, 2], [4, 6, 2], [1, 3, 8]]) == 5)
