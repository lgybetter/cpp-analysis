<template>
  <div class="container">
    <div class="navigator">
      <button class="menu-btn" @click="open">open</button>
      <button class="menu-btn" @click="save">save</button>
    </div>
    <div class="content">
      <div class="code-input">
        <textarea v-model="codeInput">
        </textarea>
      </div>
      <div class="code-show">
        <div v-for="(line, index) in codeShowArr">
          <p v-for="word in line" :class="word.type">
            <template v-if="word.type==='space'">
              &nbsp
            </template>
            <template v-else>
              {{word.word}}
            </template>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { analysisLine } from '../controllers/analysis'
import fileController from '../controllers/fileController'

export default {
  watch: {
    codeInput: function() {
      this.codeShowArr = []
      this.codeInput.split(/\r?\n/).forEach(line => {
        let wordArr = []
        analysisLine(line, this.annotation).forEach(word => {
          wordArr.push(word)
        })
        this.codeShowArr.push(wordArr)
      })
    }
  },
  data () {
    return {
      codeInput: '',
      codeShow: '',
      codeShowArr: [],
      annotation: false
    }
  },
  methods: {
    open() {
      fileController.openDialog().then(filePath => {
        return fileController.readPackage(filePath)
      }).then(res => {
        this.codeInput = res
      })
    },
    save() {
      fileController.openDialog().then(filePath => {
        return fileController.writePackage(filePath, this.codeShowArr)
      })
    }
  }
}
</script>

<style lang="css">
  .container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .navigator {
    display: flex;
    box-sizing: border-box;
    flex-direction: row;
    align-items: center;
    padding: 10px;
    width: 100%;
    height: 7%;
    background-color: deepskyblue;
  }
  
  .menu-btn {
    width: 40px;
    height: 22px;
    margin: 0 10px 0 10px;
    background-color: deepskyblue;
    font-size: 12px;
    text-align: center;
    color: white;
    line-height: 20px;
  }

  .content {
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
  }
  
  .content textarea {
    width: 100%;
    height: 100%;
  }
  
  .code-input {
    width: 50%;
    height: 100%;
    background-color: gray;
  }
  
  .code-show {
    width: 50%;
    height: 100%;
    padding: 20px;
    overflow: auto;
    border-left: 2px black solid;
    background-color: black;
  }

  .code-show > div > p {
    display: inline;
  }

  .keyWord {
    color: red;
  }
  .identifier {
    color:deepskyblue;
  }
  .string {
    color:lawngreen;
  }
  .char {
    color: orange;
  }
  .number {
    color:deeppink;
  }
  .specialWord {
    color: lightseagreen;
  }
  .libraryFile {
    color:cyan;
  }
  .Annotations {
    color: gray;
  }
</style>