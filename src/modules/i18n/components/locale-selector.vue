<script setup lang="ts">

const { locale } = useI18n();

const localesLong: Record<string, string> = {
  zh: '中文',
};

const localeOptions = computed(() =>
  Object.keys(localesLong).map(locale => ({
    label: localesLong[locale] ?? locale,
    value: locale,
  }))
);
</script>

<template>
  <c-select v-model:value="locale" :options="localeOptions" placeholder="Select a language" w-100px />
</template>
