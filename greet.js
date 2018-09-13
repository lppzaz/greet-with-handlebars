module.exports = function (pool) {
  var greetCount = 0;
  var map = {};

  async function counter() {

    const names = await pool.query('select * from users');
    return names.rowCount;

  }

  async function nameMap() {

    const names = await pool.query('select * from users');
    return names.rows;

  }

  async function greetMe(name, checkedLanguage) {
    
    name = name.toLowerCase();
    if (name !== '' && checkedLanguage){
    const foundUser = await pool.query('select * from users where name=$1', [name]);
    if (foundUser.rowCount < 1) {
      await pool.query('insert into users(name,counter) values($1, 0)', [name]);
    }
    await pool.query('UPDATE users SET counter=counter+1 WHERE name=$1', [name]);
  }

   if (name && checkedLanguage === "English") {
      return "Howdy " + name + ' <3';
    }
    if (name && checkedLanguage === "Xhosa") {
      return "Molo " + name + ' <3';
    }
    if (name && checkedLanguage === "Afrikaans") {
      return "Goeiedag " + name + ' <3';
    }
  }

  async function clear() {
    const reset = await pool.query('delete from users');
    return reset.rows;
  }

  return {
    greetMe,
    counter,
    nameMap,
    clear

  }
}