var lengthOfLongestSubstring = function(s) {
    //双指针
    let left = 0;
    let right = 0;
    let maxLength = 0;
   //连续子串
    const windowSet = new Set();

    while(right < s.length){
        if(!windowSet.has(s[right])){//不重复 
            windowSet.add(s[right]);
            right++;
            maxLength = Math.max(maxLength,windowSet.size);
        }else{
            windowSet.delete(s[left]);
            left++;
        }
    }
    return maxLength;
}

console.log(lengthOfLongestSubstring("abcabcbb"));