//定义食物类(一般都是属性+方法)——————————————————————————————————————————————————————————————————————————————

class Food {
  
  //🔥🔥🔥定义属性，表示食物对应到 HTML 的哪个元素
  element: HTMLDivElement;

  constructor() {
    //document 有可能为空, ！感叹号表示不可能为空
    //👇获取页面中的 food 元素并赋值给 element
    this.element = document.getElementById('food')! as HTMLDivElement;
  }

  //方法(如果蛇的坐标跟食物的坐标重合了，那么就证明蛇吃到了食物)
  //先定义一个获取食物 x 轴坐标的方法
  get x():number{
    return this.element.offsetLeft;
  }

  get y():number{
    return this.element.offsetTop;
  }

  //修改食物的位置
  //left 最小为 0
  //top 最小为 0
  //right 最大为游戏区域的宽度 - 食物的宽度 = 294px
  //bottom 最大为游戏区域的高度 - 食物的高度 = 410px
  //因为蛇每次移动 10 ，所以食物至少得移动 10 ，不然蛇会吃不到它

  change():void{
    // Math.random()*294   //本来是 0～1，再 X28 就是 0～280，包含小数点，所以还要 round()
    let moveTop = Math.round(Math.random()*28)*10 //四舍五入取整,然后再乘以 10，就至少是 10 了
    let moveLeft = Math.round(Math.random()*28)*10
    this.element.style.top = moveTop + 'px'
    this.element.style.left = moveLeft + 'px'
  }
}

//测试代码
// const food = new Food()
// food.change() //每调用一次，书屋的位置都是新的
// console.log(food.x,food.y)


//暴露模块
export default Food




