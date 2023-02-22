const imageUploader = require('../utils/imageUploader')

const avartarUploader = async (req, res, next) => {
    const upload = imageUploader(
        1024 * 1024 * 5,
        ['image/jpeg', 'image/png'],
        'Only .png and .jpeg format allowed!'
    )

    upload.any()(req, res, (err) => {
        if (err) {
            return res.status(400).json({
                error: {
                    message: err.message,
                },
            })
        }

        next()
    })
}

module.exports = avartarUploader
