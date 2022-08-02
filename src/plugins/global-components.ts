import type { App } from 'vue'
import NbButton from '@/components/generic/NbButton.vue'
import NbIcon from '@/components/generic/NbIcon.vue'
import NbToolbar from '@/components/generic/NbToolbar.vue'

export default function regGlobalComponents(app: App): void {
  app.component('NbButton', NbButton)
  app.component('NbIcon', NbIcon)
  app.component('NbToolbar', NbToolbar)
}
