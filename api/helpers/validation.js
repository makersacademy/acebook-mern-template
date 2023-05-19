exports.validateEmail = (email) => {
  //regex to validate email
  return String(email).toLocaleLowerCase()
  .match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{1,12})?$/)
}
exports.validatePassword = (password) => {
  return String(password)
  .match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/)
}