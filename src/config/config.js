export default  {
    saltRounds : 10,
    jwtSecret : process.env.JWT_SECRET ,
    jwtExpiresIn : '1h'
}