<template>
  <div class="home">
    <persons-table />
  </div>
</template>

<script>
import PersonsTable from '../components/PersonsTable.vue'

export default {
  name: 'Home',
  components: {
    PersonsTable
  },
}
</script>
