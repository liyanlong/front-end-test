/**
 * 请用js实现一个函数求解整数N、N满足 %2==1, %3==2, %5==4, %6==5, %7 ==0
 *  3 % 2 == 1
 *  5 % 3 == 2
 *  9 % 5 == 4
 *  11 % 6 == 5
 *  14 % 7 == 0
 *  基本解法
 */

 function caculateN (maxNumber = 1000) {
    let n = 0;
    const arr = [];
    while(true) {
        if (maxNumber < n) {
            break;
        }
        n++;
        if (n % 2 != 1) {
            continue;
        }
        if (n % 3 != 2) {
            continue;
        }
        if (n % 5 != 4) {
            continue;
        }
        if (n % 6 != 5) {
            continue;
        }
        if (n % 7 != 0) {
            continue;
        }
        arr.push(n);

    }
    return arr;
 }

 
 function caculateN2 (maxNumber = 1000) {
    let n = 0;
    const arr = [];
    while(true) {
        if (maxNumber < n) {
            break;
        }
        n++;
        let result = (n - 1) % 2 + (n - 2) % 3 + (n - 4) % 5 + (n - 5) % 6 + n % 7;
        if (result == 0) {
            arr.push(n);
        }
        
    }
    return arr;
 }