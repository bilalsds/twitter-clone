<!-- components/loading.vue -->
<template>
    <div class="custom-loader">
      <p>Loading...</p>
    </div>
  </template>
  
  <style scoped>
  .custom-loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  </style>
  