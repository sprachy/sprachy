<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import _ from "lodash";

  import { getUserContext } from "./context";

  const patterns = getUserContext().app.patternsWithProgress;
</script>

<div>
  hifdsafdsa
  <!-- <main class="container">
    Sprachy is a thingy for learning German with patterns!
    <ul>
      <li class="pattern" v-for="pattern in patterns" :key="pattern.id">
        <router-link :to="`/pattern/${pattern.slug}`">
          <div class="icon" :style="{ backgroundColor: '#1ba156' }">
            <font-awesome-icon :icon="pattern.icon" />
          </div>
          <div>
            <h6 :style="{ color: '#1ba156' }">
              {{ pattern.title }}
              <template v-if="pattern.progress">
                <span v-for="i in pattern.progress.srsLevel" :key="i"
                  >⭐</span
                >
              </template>
            </h6>
            <div class="shortdesc">
              {{ pattern.shortdesc }}
            </div>
            <div class="timetolevel" v-if="pattern.progress">
              <template v-if="pattern.progress.mastered">
                Mastered!
              </template>
              <template v-else>
                Can be leveled in
                <timeago :datetime="pattern.progress.levelableAt" />
              </template>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </main> -->
</div>

<style lang="sass">
// ul
//   padding: 0

// li.pattern:not(:first-child)
//   margin-top: 1rem

// li.pattern
//   list-style-type: none

//   > a
//     display: flex
//     align-items: center
//     padding: 1rem
//     color: inherit

//   .icon
//     padding: 0.75rem
//     margin-right: 1rem

//   .icon svg
//     color: white
//     width: 32px
//     height: 32px

//   h6
//     font-size: 1.1rem
//     margin-bottom: 0.1rem

//   .shortdesc
//     margin-bottom: 0.1rem

//   .timetolevel
//     font-style: italic
//     color: #666
//     font-size: 0.9rem
</style>
