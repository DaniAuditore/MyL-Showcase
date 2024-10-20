<template>
  <div class="avatar">
    <img :src="profileImage ? profileImage : defaultImage" alt="Avatar">
  </div>
</template>

<script>
export default {
  props: {
    profileImage: {
      type: String,
      required: false
    },
    defaultImage: {
      type: String,
      default() {
        // Default profile photo path if you do not have a custom image
        return require('@/assets/profile-icons/test_profile_photo.png');
      }
    }
  }
};
</script>

<style scoped>
.avatar img {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  border: 8px solid #A40000;
}
</style>
