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
      return "Howdy " + name + ' <3';
    }
    if (checkedLanguage === "Xhosa") {
      return "Molo " + name+' <3';
    }
    if (checkedLanguage === "Afrikaans") {
      return "Goeiedag " + name +' <3';
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