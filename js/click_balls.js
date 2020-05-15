(function(){
  console.log(1111)
  var canvas = document.createElement("canvas");
  document.body.appendChild(canvas);
  canvas.setAttribute('style','position:fixed; top:0; pointer-events:none; z-index: 10000;');
  var CANVAS_WIDTH = document.body.clientWidth
  var CANVAS_HEIGHT = document.body.clientHeight

  canvas.width = CANVAS_WIDTH
  canvas.height = CANVAS_HEIGHT

  var ctx = canvas.getContext('2d')
  var balls = [];
  var ballsRunning = null;

  document.body.onmousedown = function(e){
    var e = event || window.event;
    init(e.clientX, e.clientY)
  }
  function init(x, y) {
      var num = 8
      addBalls(x, y, num)
      if(ballsRunning){
          return ;
      }
      ballsRunning = setInterval(function(){
          updateBalls()
          if(balls <= 0){
              clearInterval(ballsRunning)
              ballsRunning = null;
          }
      }, 24)
  }
  function addBalls(x, y, num){
      // 增加小球对象，并赋予速度属性
      // 0~5
      for(var i = 0; i < num; i++) {
          var vx = Math.floor(Math.random()*6-3)
          var vy = Math.floor(Math.random()*10-7)
          balls.push(new Ball(ctx, x, y, vx, vy))
      }
      // 最多存在30颗球
      if(balls.length>30){
          balls.splice(0, 10)
      }
  }
  function updateBalls(){
      ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
      for(var i = 0; i < balls.length; i++) {
          balls[i].update()
          if(balls[i].time<=0){
              balls.splice(i, 1)
              ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
          }
      }
  }

  function Ball(ctx, x, y, vx, vy){
      this.ctx = ctx
      this.x = x
      this.y = y
      this.vx = vx
      this.vy = vy
      this.g = 0.99
      this.time = 24; //只画24帧动画
      this.colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];
  }
  Ball.prototype.draw = function(){
      this.ctx.fillStyle = this.colors[Math.floor(Math.random()*10)];
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, 3, 0, Math.PI*2);
      this.ctx.closePath();
      this.ctx.fill();
  }
  Ball.prototype.update = function(){
      // 刷新当前小球运动的位置
      this.x += this.vx;
      this.y += this.vy;
      this.vy += this.g
      this.draw()
      this.time--;
  }
})();