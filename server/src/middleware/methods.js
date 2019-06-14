const  method = (req, res)=> {
    return res.status(405).send({
      status: 405,
      message: 'method not allowed'
    });
 }

 export default method;