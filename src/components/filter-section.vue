<template>
  <div class="filter-section">
    <label :for="label">{{ label }}:</label>
    <select v-if="type === 'select'" :id="label" class="styled-button" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
      <option value="">--Seleccionar--</option>
      <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
    </select>
    <input v-else :id="label" type="text" :placeholder="label" class="styled-button" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    modelValue: String,
    options: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      default: 'select',
    },
  },
};
</script>