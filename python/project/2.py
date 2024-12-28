from typing import List

def solution(giftPackages: List[List[int]], eventCapacity: int) -> int:
    # PLEASE DO NOT MODIFY THE FUNCTION SIGNATURE
    # write code here
    n = len(giftPackages)
    dp = [[0] * (eventCapacity + 1) for _ in range(n + 1)]
    
    for i in range(1, n + 1):
        for j in range(1, eventCapacity + 1):
            quantity, value = giftPackages[i - 1]
            for k in range(min(j, quantity) + 1):
                dp[i][j] = max(dp[i][j], dp[i - 1][j - k] + k * value)
    
    return dp[n][eventCapacity]

if __name__ == '__main__':
    print(solution(giftPackages=[[2, 5], [1, 3], [3, 2]], eventCapacity=3) == 13)
    print(solution(giftPackages=[[3, 9], [2, 4], [4, 8]], eventCapacity=6) == 51)
    print(solution(giftPackages=[[3, 1], [2, 6], [4, 5]], eventCapacity=5) == 27)
    print(solution(giftPackages=[[1, 7], [3, 8], [2, 10]], eventCapacity=4) == 36)
