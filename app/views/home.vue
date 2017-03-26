<template>
  <div class="container">
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
  }
}
</script>

<style lang="css">
  .container {
    width: 100%;
    height: 100%;
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