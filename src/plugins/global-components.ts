import type { App } from 'vue'
import NbButton from '@/components/generic/NbButton.vue'
import NbIcon from '@/components/generic/NbIcon.vue'
import NbTextarea from '@/components/generic/NbTextarea.vue'
import NbToolbar from '@/components/generic/NbToolbar.vue'
import NbOverlay from '@/components/generic/NbOverlay.vue'
import NbModalbox from '@/components/generic/NbModalbox.vue'

export default function regGlobalComponents(app: App): void {
  app.component('NbButton', NbButton)
  app.component('NbIcon', NbIcon)
  app.component('NbTextarea', NbTextarea)
  app.component('NbToolbar', NbToolbar)
  app.component('NbOverlay', NbOverlay)
  app.component('NbModalbox', NbModalbox)
}
