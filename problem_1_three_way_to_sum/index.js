var sum_to_n_a = function(n) {
    // your code here
    let sum = 0
    for(let index = 1; index <=n; index++){
        sum+= index
    } 
    return sum
};

var sum_to_n_b = function(n) {
    // your code here
    let index = 1;
    let sum = 0
    while(index <= n){
        sum+=index
        index++
    }
    return sum
};

var sum_to_n_c = function(n) {
    // your code here
    const u_1 = 1, u_n=n;
    return (n*(u_1+u_n))/2
};