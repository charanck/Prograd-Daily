// Is the paranthesis balanced problem

let isValid = function(s) {
    let stack = [];
    let len = s.length;
    let map = {
      '(': ')',
      '[': ']',
      '{': '}'
    };
    for (let i = 0; i < len; i++) {
      if (stack.length > 0 && map[stack[stack.length - 1]] === s[i]) {
        stack.pop();
      } else {
        stack.push(s[i]);
      }
    }
    return stack.length === 0;
};

function main(){
    let test1 =  "(())",test2="(()){{}}[}";
    console.log(`Test1 - ${isValid(test1)}`);
    console.log(`Test2 - ${isValid(test2)}`);
}

main()

