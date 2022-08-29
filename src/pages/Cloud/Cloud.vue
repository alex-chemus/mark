<script lang="ts" setup>
import { useRouter } from 'vue-router'

const { push } = useRouter()
console.log('should push')
push({ path: '/cloud/groups' })
</script>
