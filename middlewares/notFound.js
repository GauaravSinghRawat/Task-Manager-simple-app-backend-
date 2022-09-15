const error  = (req,res,next)=>{
    return res.status(404).json({message : "page does not found"})
}

module.exports = error