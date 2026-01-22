<template>
  <div class="fish-body">
    <slot></slot>
  </div>
  <div class="fish-tail"></div>
  <div class="fish-fins-box">
    <div class="fish-fins fish-fins-top"></div>
    <div class="fish-fins fish-fins-bot"></div>
  </div>
</template>

<script setup>

</script>

<style scoped lang="scss">
.fish-body {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  background: orange;
  border-radius: 60% 120% 120% 60% / 90% 100% 100% 90%;
  border-radius: 50%;
  border: 2px solid #2a1f17;
  display: flex;
  align-items: center;
}

.fish-tail {
  position: absolute;
  right: -30px;
  top: 50%;
  transform: translate(-10%,-50%);
  z-index: 1;
  background: #bc9267;
  width: 50px;
  height: 70px;
  border-radius: 80% 20% 20% 80% / 50%;
  border: 3px solid #2a1f17;
  transform-origin: center left;
  animation: tailSlow 1.2s ease-in-out infinite alternate;
}

@keyframes tailSlow {
  0% {
    transform: rotateY(25deg) translate(-10%,-50%);
  }

  100% {
    transform: rotateY(-25deg) translate(-10%,-50%);
  }
}

.fish-fins-box {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.fish-fins-top {
  position: absolute;
  top: 0;
  left: 40%;
  width: 25%;
  height: 35%;
  border-radius: 100% 0 0 0;
  background: orange;
  border: 2px solid #2a1f17;
  transform: translate(-40%, -20%) skew(-10deg) rotate(-2deg);
  animation: finTop 1.2s linear infinite alternate;
}

.fish-fins-bot {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 25%;
  height: 35%;
  border-radius: 0 0 0 100%;
  background: orange;
  border: 2px solid #2a1f17;
  transform: translate(-90%, 0%) skew(10deg) rotate(-16deg);
  animation: finBot 1.2s linear infinite alternate;
}
@keyframes finTop {
  0% {
      transform: translate(-40%, -20%) skew(-10deg) rotate(-2deg);
  }

  100% {
      transform: translate(-40%, -20%) skew(-10deg) rotate(-14deg);
  }
}
@keyframes finBot {
  0% {
      transform: translate(-90%, 0%) skew(10deg) rotate(-20deg);
  }

  100% {
      transform: translate(-90%, 0%) skew(10deg) rotate(-16deg)
  }
}
</style>