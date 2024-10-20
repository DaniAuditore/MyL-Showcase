const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../assets/profile-icons');
    fs.mkdirSync(dir, { recursive: true }); 
    cb(null, dir); 
  },
  filename: (req, file, cb) => {
    const userId = req.params.id;
    cb(null, `user-${userId}.png`); 
  }
});

const upload = multer({ storage });

app.post('/upload/:id', upload.single('profileImage'), (req, res) => {
  const filePath = `/assets/profile-icons/user-${req.params.id}.png`;
  console.log(res.file)
  res.json({ imagePath: filePath });
});

app.delete('/upload/:id', (req, res) => {
  const userId = req.params.id;
  const filePath = path.join(__dirname, `../assets/profile-icons/user-${userId}.png`);
  
  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(500).send('Error al eliminar la imagen');
    }
    res.send('Imagen eliminada correctamente');
  });
});

app.listen(4000, () => {
  console.log('Servidor iniciado en http://localhost:4000');
});
