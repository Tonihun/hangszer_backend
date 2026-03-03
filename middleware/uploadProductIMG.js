const multer = require('multer')
const fs = require('fs')
const path = require('path')

const MAX_FILE_SIZE = 1024 * 1024 * 10

//Fájl hely és fájl név megadása
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const { user_id } = req.params
        if (!user_id) {
            return cb(new Error('Hiányzik a zsűri azonosítója'), null)
        }

        const uploadDir = path.join(process.cwd(), 'uploads', String(user_id))
        console.log(`uploadDir: ${uploadDir}`);

        try {
            fs.mkdirSync(uploadDir, { recursive: true })
            cb(null, uploadDir)
        } catch (err) {
            cb(err, null)
        }
    },

    filename: (req, file, cb) => {
        const { user_id } = req.user

        if (!user_id) {
            return cb(new Error('Nincs bejelentkezve'))
        }
        const now = new Date().toISOString().split('T')[0]

        return cb(null, `${user_id}-${now}-${file.originalname}`)

    }
})


//feltöltés
const upload = multer({
    storage: storage,
    limits: { fileSize: MAX_FILE_SIZE },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpg|jpeg|png|gif|svg|webp|avif|avif|bmp|tiff|raw/
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase())
        const mimeType = fileTypes.test(file.mimetype)

        if (extName && mimeType) {
            return cb(null, true)
        } else {
            return cb(new Error('Csak képformátumon megengedtek'), null)
        }
    }
})

module.exports = { upload }