<script setup lang="ts">
import { createToken } from './token-generator.service';
import { useCopy } from '@/composable/copy';
import { useQueryParam } from '@/composable/queryParams';
import { computedRefreshable } from '@/composable/computedRefreshable';

const length = useQueryParam({ name: 'length', defaultValue: 64 });
const withUppercase = useQueryParam({ name: 'uppercase', defaultValue: true });
const withLowercase = useQueryParam({ name: 'lowercase', defaultValue: true });
const withNumbers = useQueryParam({ name: 'numbers', defaultValue: true });
const withSymbols = useQueryParam({ name: 'symbols', defaultValue: false });
const { t } = useI18n();

const [token, refreshToken] = computedRefreshable(() =>
  createToken({
    length: length.value,
    withUppercase: withUppercase.value,
    withLowercase: withLowercase.value,
    withNumbers: withNumbers.value,
    withSymbols: withSymbols.value,
  }),
);

const { copy } = useCopy({ source: token, text: t('复制到剪贴板的令牌') });
</script>

<template>
  <div>
    <c-card>
      <n-form label-placement="left" label-width="140">
        <div flex justify-center>
          <div>
            <n-form-item :label="t('大写 (ABC...)')">
              <n-switch v-model:value="withUppercase" />
            </n-form-item>

            <n-form-item :label="t('小写 (abc...)')">
              <n-switch v-model:value="withLowercase" />
            </n-form-item>
          </div>

          <div>
            <n-form-item :label="t('数字 (123...)')">
              <n-switch v-model:value="withNumbers" />
            </n-form-item>

            <n-form-item :label="t('符号 (!-;...)')">
              <n-switch v-model:value="withSymbols" />
            </n-form-item>
          </div>
        </div>
      </n-form>

      <n-form-item :label="`${t('长度')} (${length})`" label-placement="left">
        <n-slider v-model:value="length" :step="1" :min="1" :max="512" />
      </n-form-item>

      <c-input-text v-model:value="token" multiline :placeholder="t('令牌...')" readonly rows="3" autosize
        class="token-display" />

      <div mt-5 flex justify-center gap-3>
        <c-button @click="copy()">
          {{ t('复制') }}
        </c-button>
        <c-button @click="refreshToken">
          {{ t('重新生成') }}
        </c-button>
      </div>
    </c-card>
  </div>
</template>

<style scoped lang="less">
::v-deep(.token-display) {
  textarea {
    text-align: center;
  }
}
</style>
