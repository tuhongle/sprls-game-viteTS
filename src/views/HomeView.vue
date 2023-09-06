<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useGameStore } from '../stores/gameStore'
import { RouterLink } from 'vue-router';

const gameStore = useGameStore();

const { score, startGame, humanColor, houseColor, housePicked, result } = storeToRefs(gameStore);
score.value = 0;
gameStore.playAgain();
</script>

<template>
  <main>
    <div class="container-fluid h-100">
      <div class="row pt-5 h-100">
        <div class="col-12 col-lg-6 mx-auto d-flex flex-column">
          <div class="card bg-transparent border-2 border-light">
            <div class="card-body d-flex justify-content-between">
              <div class="left-card text-light">
                <p class="mb-0 fw-bold lead">ROCK</p>
                <p class="mb-0 fw-bold lead">PAPER</p>
                <p class="mb-0 fw-bold lead">SCISSORS</p>
              </div>
              <div class="right-card bg-light px-4 text-center rounded-3 d-flex flex-column justify-content-between py-2">
                <p class="mb-0 text-primary">SCORE</p>
                <p class="mb-0 fw-bolder display-5 text-muted">{{ score }}</p>
              </div>
            </div>
          </div>
          <Transition appear name="start">
            <div v-if="!startGame" class="row flex-grow-1 align-items-center">
              <div class="col">
                <div class="content mx-auto mt-5" style="width: 300px">
                  <img src="/bg-triangle.svg" alt="triangle" class="img-fluid w-100 d-block mx-auto">
                  <button class="paper btn bg-light triangle" @click="gameStore.humanPick('paper')">
                    <img src="/icon-paper.svg" alt="paper">
                  </button>
                  <button class="scissors btn bg-light triangle" @click="gameStore.humanPick('scissors')">
                    <img src="/icon-scissors.svg" alt="scissors">
                  </button>
                  <button class="rock btn bg-light triangle" @click="gameStore.humanPick('rock')">
                    <img src="/icon-rock.svg" alt="rock">
                  </button>
                </div>
              </div>
            </div>
          </Transition>
          <Transition appear name="game">
            <div v-if="startGame" class="row mt-5 align-items-center">
              <div class="col d-flex flex-column-reverse flex-md-column align-items-center">
                <p class="fs-3 text-light fw-bold mt-5 mt-md-0 mb-md-5 text-center">YOU PICKED</p>
                <button class="btn bg-light position-relative" style="width: 80%" :class="[humanColor, {'active': result === 'WIN'}]">
                  <img :src="'/icon-'+ humanColor +'.svg'" :alt="humanColor" class="w-50">
                </button>
              </div>
              <Transition appear name="result">
                <div v-if="result" class="col text-center d-none d-md-block">
                    <p class="text-info fw-bold display-4">YOU {{ result }}</p>
                    <a id="restart" type="button" class="btn btn-secondary px-5 py-2" style="color: hsl(229, 25%, 31%)" @click="gameStore.playAgain">PLAY AGAIN</a>
                </div>
              </Transition>
              <div class="col d-flex flex-column-reverse flex-md-column align-items-center">
                <p class="fs-3 text-light fw-bold mt-5 mt-md-0 mb-md-5 text-center">HOUSE PICKED</p>
                <div v-if="!housePicked" class="rounded-circle" style="width: 80%; aspect-ratio: 1 / 1; background-color: #16213d;"></div>
                <button v-else class="btn bg-light position-relative" :class="[houseColor, {'active': result === 'LOSE'}]" style="width: 80%">
                  <img :src="'/icon-'+ houseColor +'.svg'" :alt="houseColor" class="w-50">
                </button>
              </div>
            </div>
          </Transition>
          <Transition appear name="result">
            <div v-if="result" class="row mt-5 align-items-center d-block d-md-none">
              <div class="col text-center">
                <p class="text-info fw-bold display-4">YOU {{ result }}</p>
                <a type="button" class="btn btn-secondary px-5 py-2" style="color: hsl(229, 25%, 31%)" @click="gameStore.playAgain">PLAY AGAIN</a>
              </div>
            </div>
          </Transition>
          <div class="row mt-auto mb-5">
            <div class="col d-flex justify-content-between">
              <RouterLink :to="{name: 'bonus'}" type="button" class="btn btn-outline-light px-4 py-2" style="color: hsl(229, 25%, 31%)">BONUS</RouterLink>
              <a type="button" class="btn btn-outline-light px-4 py-2" style="color: hsl(229, 25%, 31%)" data-bs-toggle="modal" data-bs-target="#rulesModal">RULES</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <Teleport to="#modal">
    <!-- Modal -->
    <div class="modal fade" id="rulesModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
          <h1 class="modal-title fs-3 fw-bolder ms-3">RULES</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body text-center">
          <img src="/image-rules.svg" alt="rules" class="img-fluid w-75">
        </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.start-enter-from,
.start-leave-to {
  opacity: 0;
  transform: translateY(-200px);
}

.game-enter-from,
.game-leave-to {
  opacity: 0;
  transform: translateY(200px);
}

.result-enter-from,
.result-leave-to {
  opacity: 0;
  transform: scale(0.5);
}

.game-enter-active,
.game-leave-active,
.start-enter-active,
.start-leave-active,
.result-enter-active,
.result-leave-active {
  transition: all 0.5s linear;
}
</style>
