//
export const verifyToken = (req, res, next) => {
    try {
        //
        const header = req.headers.authorization;
        //kiểm tra header có tồn tại không
        if (!header || !header.startsWith("Bearer")) {
            return res.status(401).json({ error: err.message })
        }
        //lấy chuỗi header từ phần tử thứ 2
        const token = header.split(" ")[1];
        //
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        //
        req.admin = payload;
        //  
        next();

    } catch (err) {
        res.status(401).json({ error: err.message })
    }
};

