<template>

  <div>
    <thelogin />
  </div>

</template>

<script>
// @ is an alias to /src
import thelogin from '@/components/auth/TheLogin.vue'

export default {
  name: 'The-login',
  components: {
    thelogin
  }
}
</script>
