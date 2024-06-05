const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect("mongodb+srv://jairouptc:nyxmeR-zusjoz-8zubda@cluster0.9lfyrk5.mongodb.net/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Conexión a la base de datos establecida"))
.catch(err => console.error("Error de conexión a la base de datos:", err));

app.use(express.json());

const playersRoutes = require('./routes/Lealplayers'); 
const teamsRoutes = require('./routes/teams');
app.use('/lealplayers', playersRoutes); 
app.use('/teams', teamsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor listo en el puerto ${PORT}`));
