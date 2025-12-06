// import jwt from "jsonwebtoken"

// // admin authentication middleware
// const authAdmin = async (req, res, next) => {
//     try {
//         const { atoken } = req.headers  // ✅ Changed from 'atoken' to 'atoken'
//         if (!atoken) {
//             return res.json({ success: false, message: 'Not Authorized Login Again' })
//         }
//         const token_decode = jwt.verify(atoken, process.env.JWT_SECRET)  // ✅ Changed here too
//         if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
//             return res.json({ success: false, message: 'Not Authorized Login Again' })
//         }
//         next()
//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: error.message })
//     }
// }

// export default authAdmin;

import jwt from "jsonwebtoken"

const authAdmin = async (req, res, next) => {
    try {
        console.log('📥 Received headers:', req.headers)  // ADD THIS
        
        const { atoken } = req.headers
        
        console.log('🔑 atoken from headers:', atoken)  // ADD THIS
        
        if (!atoken) {
            return res.json({ success: false, message: 'Not Authorized Login Again' })
        }
        
        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET)
        
        console.log('✅ Token decoded:', token_decode)  // ADD THIS
        console.log('🔐 Expected:', process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD)  // ADD THIS
        
        if (token_decode.email !== process.env.ADMIN_EMAIL || token_decode.role !== 'admin') {
            return res.json({ success: false, message: 'Not Authorized Login Again' })
        }
        next()
    } catch (error) {
        console.log('❌ Auth Error:', error)
        res.json({ success: false, message: error.message })
    }
}

export default authAdmin;