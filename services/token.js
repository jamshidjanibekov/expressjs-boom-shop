import jwt from 'jsonwebtoken'

const  generateJWTToken = userId =>{
    const accessToken = jwt.sign({userId}, process.env.jWT_SECRET, {expiresIn: '30d'} )

    return accessToken
}
export {generateJWTToken}