import { ArrowsShuffle } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

export const tool = defineTool({
  name: translate('Token、随机密码生成器'),
  path: '/token-generator',
  description: translate('生成自定义长度，包含大写或小写字母、数字或符号的随机字符串。'),
  keywords: ['token', 'random', 'string', 'alphanumeric', 'symbols', 'number', 'letters', 'lowercase', 'uppercase'],
  component: () => import('./token-generator.tool.vue'),
  icon: ArrowsShuffle,
});
