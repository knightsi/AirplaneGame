<template>
  <div id="game-area" class="bg-gray-900 overflow-hidden">
    <div class="score bg-gray-900 text-white">
      <span class="mx-5">Score: {{ score }}</span>
      <span>Level: {{ level }}</span>
    </div>

    <div id="player" class="w-20 h-20 bg-cover" :style="{ left: playerX + 'px', top: playerY + 'px' }"></div>
    <div v-for="(bullet, i) in bullets" :key="'bullet'+i" class="bullet w-2.5 h-2.5 bg-red-600" 
          :style="{ left: bullet.x + 'px', top: bullet.y + 'px' }">
    </div>
    <div v-for="(enemy, i) in enemies" :key="'enemy'+i" class="enemy w-12 h-12 bg-cover transform rotate-180" 
          :style="{ left: enemy.x + 'px', top: enemy.y + 'px' }">
    </div>

    <div id="over-mask" class="w-1/2 h-1/2 inset-1/4 bg-white flex flex-wrap items-center justify-center" v-if="gameover">
      <div class="text-5xl w-full bg-white text-center text-gray-900">Game Over</div> 
      <div class="over-score w-4/5 p-4 flex items-center justify-around">
        <div>Score: {{ score }}</div>
        <div>Defeat: {{ defeat }}</div>
      </div>
      <div class="reset-btn w-40 h-14 bg-white text-center cursor-pointer" @click="resetGame">Reset</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      playerX: 380,
      playerY: 450,

      bullets: [],
      enemies: [],
      gameover: false,

      scoreArr: sessionStorage.getItem('score') ? JSON.parse(sessionStorage.getItem('score')) : [],

      defeat: 0,
      score: 0,
      level: 1,

      createTimer: null,
      updateTimer: null,
      levelTimer: null
    };
  },
  mounted() {
    // 监听键盘事件
    document.addEventListener('keydown', (event) => {
      const key = event.key;
      if (key === 'ArrowLeft' && this.playerX > 0 && !this.gameover) {
        // 向左移动
        this.playerX -= 10;
      } else if (key === 'ArrowRight' && this.playerX < 770 && !this.gameover) {
        // 向右移动
        this.playerX += 10;
      } else if (key === ' ' && !this.gameover) {
        // 发射子弹
        this.shootBullet();
      }
    });

    // 定时生成敌人
    this.createTimer = setInterval(() => {
      this.createEnemy();
    }, 2000);

    // 定时更新子弹和敌人位置
    this.updateTimer = setInterval(() => {
      this.updateBullets();
      this.updateEnemies();
    }, 10);

    // 定时提升敌方难度
    this.levelTimer = setInterval(() => {
      this.level += 1;
      this.createTimer = setInterval(() => {
        this.createEnemy();
      }, 2000 - (this.level * 10));
    }, 5000);

  },
  methods: {
    shootBullet() {
      //子弹初始偏移量
      const bullet = { x: this.playerX + 22.5, y: this.playerY - 10 };
      this.bullets.push(bullet);
    },
    createEnemy() {
      const enemy = { x: Math.random() * 780, y: -30 };
      this.enemies.push(enemy);
    },
    updateBullets() {
      this.bullets = this.bullets.filter((bullet) => {
        bullet.y -= 10;
        return (bullet.y > 0);
      });
    },
    updateEnemies() {
      this.enemies = this.enemies.filter((enemy) => {
        enemy.y += 2;
        // 生成-10到10的随机数
        // if(enemy.y%100 == 0 ){
        //   enemy.x += Math.floor(Math.random() * 11) - 5;
        // }
        if (enemy.y >= 500) {
          return false;
        }
        // 检测玩家与敌人的碰撞
        if (
          this.playerX + 50 >= enemy.x &&
          this.playerX <= enemy.x + 30 &&
          this.playerY + 50 >= enemy.y &&
          this.playerY <= enemy.y + 30
        ) {
          this.gameover = true;
          var defeat = 0;
          for (let i = 0; i < this.scoreArr.length; i++) {
            if( this.score > this.scoreArr[i]) {
              defeat += 1
            }
          }
          this.defeat = defeat;
          this.scoreArr.push(this.score);

          clearInterval(this.createTimer);
          clearInterval(this.updateTimer);
          clearInterval(this.levelTimer);
          this.createTimer = this.updateTimer = this.levelTimer = null;
          
          sessionStorage.setItem('score', JSON.stringify(this.scoreArr))

          setTimeout(() => {
            location.reload(); // 重新加载页面
          }, 15000);
        }
        
        // 检测子弹与敌人的碰撞
        for (let i = 0; i < this.bullets.length; i++) {
          const bullet = this.bullets[i];
          
          if (
            bullet.x + 5 >= enemy.x &&
            bullet.x <= enemy.x + 30 &&
            bullet.y + 5 >= enemy.y &&
            bullet.y <= enemy.y + 30
          ) {
            this.bullets.splice(i, 1);
            this.score += 10;
            return false;
          }
        }
        return true;
      });
    },

    resetGame() {
      setTimeout(() => {
        location.reload(); // 重新加载页面
      }, 500);
    }
  }
};
</script>

<style lang="scss">
#game-area {
  width: 800px;
  height: 500px;
  position: relative;
  #over-mask{
    position: absolute;
    .alert-content{
      font-size: 28px;
    }
    .reset-btn{
      line-height: 33px;
      border: 1px solid blue;
      border-radius: 8px;
    }
    .over-score div{
      font-size: 18px;
    }
  }
}
#player {
  position: absolute;
  background-image: url("~@/assets/player.png");
}
.bullet {
  width: 6px;
  height: 6px;
  position: absolute;
}
.enemy {
  position: absolute;
  background-image: url("~@/assets/enemy.png");
}

.score{
  font-size: 20px;
}
</style>