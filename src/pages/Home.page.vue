<script setup lang="ts">
import { useHead } from '@vueuse/head';
import ToolCard from '../components/ToolCard.vue';
import { useToolStore } from '@/tools/tools.store';
import { config } from '@/config';

const toolStore = useToolStore();

useHead({ title: 'Noah Tools - 开发工具箱' });
const { t } = useI18n();
</script>

<template>
  <div class="home-page">
    <div class="grid-wrapper">
      <transition name="height">
        <div v-if="toolStore.favoriteTools.length > 0">
          <n-h3>{{ $t('home.categories.favoriteTools') }}</n-h3>
          <n-grid x-gap="12" y-gap="12" cols="1 400:2 800:3 1200:4 2000:8">
            <n-gi v-for="tool in toolStore.favoriteTools" :key="tool.name">
              <ToolCard :tool="tool" />
            </n-gi>
          </n-grid>
        </div>
      </transition>

      <n-h3>{{ $t('home.categories.allTools') }}</n-h3>
      <n-grid x-gap="12" y-gap="12" cols="1 400:2 800:3 1200:4 2000:8">
        <n-gi v-for="tool in toolStore.tools" :key="tool.name">
          <transition>
            <ToolCard :tool="tool" />
          </transition>
        </n-gi>
      </n-grid>
    </div>
  </div>
</template>

<style scoped lang="less">
.home-page {
  padding-top: 50px;
}

.n-h3 {
  margin-bottom: 10px;
}

::v-deep(.n-grid) {
  margin-bottom: 30px;
}

.height-enter-active,
.height-leave-active {
  transition: all 0.5s ease-in-out;
  overflow: hidden;
  max-height: 500px;
}

.height-enter-from,
.height-leave-to {
  max-height: 42px;
  overflow: hidden;
  opacity: 0;
  margin-bottom: 0;
}
</style>
