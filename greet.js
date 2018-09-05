module.exports = function () {
  var greetCount = 0;
  var map = {};

  function counter() {
    return Object.keys(map).length;
  }

  function nameMap() {
    return map
  }

  function greetMe(name, checkedLanguage) {
    name = name.toLowerCase()
    if (map[name] === undefined) {
      map[name] = 0;
    }
    if (checkedLanguage === "English") {
      return "Hello " + name;
    }
    if (checkedLanguage === "Xhosa") {
      return "Molo " + name;
    }
    if (checkedLanguage === "Afrikaans") {
      return "Goeie dag " + name;
    }
  }

  function clear() {
    map = {}
  }

  return {
    greetMe,
    counter,
    nameMap,
    clear,

  }
}