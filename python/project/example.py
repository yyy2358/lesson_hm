from typing import List

def solution(financials: List[List[int]]) -> int:
    # PLEASE DO NOT MODIFY THE FUNCTION SIGNATURE
    # write code here
    max_funds = 0
    for customer in financials:
        total_funds = sum(customer)
        if total_funds > max_funds:
            max_funds = total_funds
    return max_funds

if __name__ == '__main__':
    print(solution(financials=[[2, 4, 6], [4, 3, 2]]) == 12)
    print(solution(financials=[[3, 9], [8, 2], [5, 6]]) == 12)
    print(solution(financials=[[5, 5, 9, 3], [6, 2, 3, 1], [3, 4, 10, 2]]) == 22)
