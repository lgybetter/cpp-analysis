let wordsMap = new Map()

/**
 * 关键字
 */
let keyWords = [
  'asm', 'auto',
  'bool', 'break',
  'case', 'catch', 'char', 'class', 'const', 'continue', 'cin', 'cout',
  'default', 'delete', 'do', 'double', 'define',
  'else', 'enum', 'except', 'explicit', 'extern', 'endl',
  'false', 'finally', 'float', 'for', 'friend',
  'goto',
  'if', 'inline', 'int', 'include',
  'long',
  'mutable', 'main',
  'namespace', 'new',
  'operator',
  'private', 'protectde', 'public', 'printf',
  'register', 'return',
  'short', 'signed', 'szieof', 'static', 'struct', 'string', 'switch', 'std', 'scanf',
  'template', 'this', 'throw', 'true', 'try', 'typedef', 'typename',
  'union', 'unsigned', 'using',
  'virtual', 'void',
  'while'
]

/**
 * 特殊字符
 */
let specialWords = [
  ',', ';', '(', ')', '{', '}', '#', '^', '?', ':', '.', '[', ']', '+', '-', '*', '/', '%', '=', '>', '<', '!', '~', '|', '&',
  '&&', '||', '==', '>=', '<=', '!=', '++', '--', '::', '<<', '>>', '+=', '-=', '*=', '/=', '%=', '&=', '^=', '->'
]

keyWords.forEach(word => {
  wordsMap.set(word, 'keyWord')
})

specialWords.forEach(word => {
  wordsMap.set(word, 'specialWord')
})

function judgeType(word) {
  let letterPatten = /[a-z]|[A-Z]/
  let numberPatten = /[0-9]/
  let spacePatten = /\s/
  if (letterPatten.test(word)) {
    return 'letter'
  } else if (numberPatten.test(word)) {
    return 'number'
  } else if (spacePatten.test(word)) {
    return 'space'
  }
}


//判断是否是字母与下划线
function judgeWord(word) {
  let wordPatten = /[a-z]|[A-z]|\_/
  return wordPatten.test(word)
}

//判断是否为数字
function judgeNumber(number) {
  let numberPatten = /[0-9]/
  return numberPatten.test(number)
}

//判断是否为特殊字符
function judgeSpecialWord(letter) {
  return wordsMap.get(letter) === 'specialWord' ? true : false
}

//判断是否为关键词
function judgeKeyWord(letter) {
  return wordsMap.get(letter) === 'keyWord' ? true : false
}

/**
 * 分析每行的数据
 */
exports.analysisLine = (line, annotation) => {
  let oneLine = []
  let word = ''
  let i = 0
  let includeFile = false
  while (i < line.length) {
    //注释代码的优先级最高，需要先进行判断
    if (line[i] === '/' && line[i + 1] === '*') {
      word += line[i]
      i++
      annotation = true;
    }
    if (!annotation) {
      //表示不是注释内容
      if (judgeWord(line[i])) {
        //表示是属于字母与下划线
        word += line[i]
        while (i + 1 < line.length && (judgeNumber(line[i + 1]) || judgeWord(line[i + 1]))) {
          i++
          word += line[i]
        }
        if (judgeKeyWord(word)) {
          //判断单词是否属于关键词
          oneLine.push({
            word: word,
            type: 'keyWord'
          })
        } else {
          //不为关键词, 则为标识符
          oneLine.push({
            word: word,
            type: 'identifier'
          })
        }
        //由于include是属于头文件的引入, 需要对头文件进行特殊处理
        if (word === 'include') {
          includeFile = true
        }
        word = ''
        i++
      } else if (line[i] === '"') {
        //字符串判断
        while (i + 1 < line.length && line[i + 1] !== '"') {
          word += line[i]
          i++
        }
        word += (line[i] || '' )+ (line[i + 1] || '')
        oneLine.push({
          word: word,
          type: 'string'
        })
        word = ''
        i += 2
      } else if (line[i] === '\'') {
        //字符判断
        while (i + 1 < line.length && line[i + 1] !== '\'') {
          word += line[i]
          i++
        }
        word += (line[i] || '' )+ (line[i + 1] || '')
        oneLine.push({
          word: word,
          type: 'char'
        })
        word = ''
        i += 2
      } else if (judgeNumber(line[i])) {
        //数字判断
        word += line[i]
        while (i + 1 < line.length && (judgeNumber(line[i + 1]) || line[i + 1] === '.')) {
          i++
          word += line[i]
        }
        oneLine.push({
          word: word,
          type: 'number'
        })
        word = ''
        i++
      } else if (judgeSpecialWord(line[i])) {
        //特殊字符判断
        if (line[i] === '<' && includeFile) {
          //处理头文件的引入
          oneLine.push({
            word: line[i],
            type: 'specialWord'
          })
          i++
          word += line[i]
          while (i + 1 < line.length && line[i + 1] !== '>') {
            i++
            word += line[i]
          }
          oneLine.push({
            word: word,
            type: 'libraryFile'
          })
          word = ''
          i++
        } else {
          //处理//的注释代码
          if (line[i] === '/' && line[i + 1] === '/') {
            i++
            while (i + 1 < line.length) {
              i++
              word += line[i]
            }
            oneLine.push({
              word: word,
              type: 'Annotations'
            })
            word = ''
            i += 3
          } else {
            word += line[i]
            while (i + 1 < line.length && (judgeSpecialWord(word + line[i + 1]))) {
              i++
              word += line[i]
            }
            oneLine.push({
              word: word,
              type: 'specialWord'
            })
            word = ''
            i++
          }
        }
      } else if (line[i] === ' ') {
        oneLine.push({
          word: line[i],
          type: 'space'
        })
        i++
      }
    } else {
      //表示注释内容
      while (i + 1 < line.length && (line[i + 1] !== '*' && line[i + 2] !== '/')) {
        word += line[i]
        i++
      }
      word += line[i] + (line[i + 1] || '') + (line[i + 2] || '')
      oneLine.push({
        word: word,
        type: 'Annotations'
      })
      annotation = false;
      word = ''
      i += 3
    }
  }
  return oneLine
}