// import jwt from 'jsonwebtoken';

// // Doctor authentication middleware
// const authDoctor = async (req, res, next) => {
//     try {
//         const { dtoken } = req.headers  // Get dtoken from headers (lowercase)

//         if (!dtoken) {
//             return res.json({ success: false, message: 'Not Authorized Login Again' })
//         }

//         const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET)
        
//         // Store doctor ID for use in routes
//         req.body.docId = token_decode.id
        
//         next()
//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: error.message })
//     }
// };

// export default authDoctor;

import jwt from 'jsonwebtoken';

const authDoctor = async (req, res, next) => {
    try {
        console.log('📥 Doctor headers:', req.headers)
        
        const authHeader = req.headers.authorization || req.headers.dtoken;
        
        if (!authHeader) {
            return res.json({ success: false, message: 'Not Authorized Login Again' })
        }
        
        const token = authHeader.startsWith('Bearer ') 
            ? authHeader.split(' ')[1] 
            : authHeader;
        
        console.log('🔑 dtoken:', token)
        
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        
        console.log('✅ Doctor token decoded:', token_decode)
        
        // ✅ IMPORTANT: Set req.user
        req.user = { id: token_decode.id }
        
        console.log('🎯 req.user set:', req.user)  // ADD THIS LINE
        
        next()
    } catch (error) {
        console.log('❌ Doctor auth error:', error)
        res.json({ success: false, message: error.message })
    }
};

export default authDoctor;