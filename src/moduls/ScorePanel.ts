//定义计分牌(属性+方法)——————————————————————————————————————————————————————————————————————————————

class ScorePanel {
  score:number = 0
  level:number = 1
  scoreEle:HTMLDivElement;
  levelEle:HTMLDivElement;
  maxLevel: number  //用来限制等级的变量
  upScore:number    //控制升级需要的分数

  constructor(maxLevel:number = 10, upScore:number = 10) { //🔥表示默认值为 10，传参就用传的，没传就用 10
    //初始化等级跟分数
    this.scoreEle = document.getElementById('score')! as HTMLDivElement //绑定为 html 元素
    this.levelEle = document.getElementById('level')! as HTMLDivElement //绑定为 html 元素
    this.maxLevel = maxLevel  //初始化后就能用这个属性了
    this.upScore = upScore
  }


  // 修改分数
  addScore():void{ //一调用这个方法，就会增加分数
    this.score++
    this.scoreEle.innerHTML = this.score + ''//'' 拼接为字符串

    //分数升 10 就 + 1 级
    // if(this.score % 10 === 0){
    if(this.score % this.upScore === 0){
      this.levelUp() //调用提升等级的函数来升级
    }
  }


  //提升等级(需要有上限,因为蛇的速度会变快)
  levelUp():void{
    if(this.level <= this.maxLevel){
      this.levelEle.innerHTML = ++this.level + ''//另一种写法，直接 ++
    }
  } 
}

//测试代码
// const scorePanel = new ScorePanel()
// scorePanel.addScore()      //加 1 分
// scorePanel.addScore()      //加 1 分
// scorePanel.addScore()      //加 1 分
// for(let i = 0 ; i < 10 ; i++){//测试加 10 分，等级提升
//   scorePanel.addScore()
// }


//暴露模块
export default ScorePanel