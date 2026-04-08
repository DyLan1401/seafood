const cloudinary = require('cloudinary').v2;

// Lấy các thông số này trên tài khoản Cloudinary của bạn
cloudinary.config({
    cloud_name: 'dvpkyxwjk',
    api_key: '322718619278787',
    api_secret: 'IkSF64enLfeXg-nwql3t2giqRCU'
});

module.exports = cloudinary;