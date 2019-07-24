<template>
  <div class="test">
    <div class="test-form">
      <span class="test-url__label">URL:</span>
      <input type="text" class="test-url__input" v-model="url" />
    </div>
    <div class="test-btn" @click="clickScreen">截屏</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: ""
    };
  },
  methods: {
    clickScreen() {
      const ajaxData = {
        template: this.url,
        objectName: "testcontract/demo-01.png"
      };
      this.$axios
        .post("/api/test/screenshot", ajaxData)
        .then(res => {
          console.info(res.data);
        })
        .catch(err => {
          console.error(err);
        });
    },
  }
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.test {
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.test-btn {
  cursor: pointer;
  user-select: none;
  margin: 20px;
  width: 200px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: green;
  color: #fff;
}

.test-url__label {
  color: gray;
}

.test-url__input {
  width: 400px;
  height: 30px;
  padding-left: 5px;
  font-size: 16px;
  color: gray;
  border: none;
  outline: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
</style>

