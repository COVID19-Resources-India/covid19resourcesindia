import Cella from "cella.js"

// create an instance of Cella!
const cella = new Cella({
  encrypt: {
    secret: process.env.REACT_APP_SECRET_ENCRYPT_KEY,
  },
})

export default cella
