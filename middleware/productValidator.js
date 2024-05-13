export const productValidator = (req, res, next) => {
    const {title, description, code, price, status, stock, category, thumbnails} = req.body;
    const noExists= title=== undefined || description=== undefined || code=== undefined || price=== undefined || status=== undefined || stock=== undefined || category=== undefined;      
    if (noExists){
        res.status(404).send("Los campos minimos son: title, description, code, price, status, stock, category")
        return
    }

    let tipo = (typeof title ==="string") && (typeof description ==="string") && (typeof code ==="string") && (typeof price ==="number") && (typeof status ==="boolean") && (typeof stock ==="number") && (typeof category ==="string")

    if(thumbnails != undefined){
        if(typeof thumbnails != "object"){
            tipo = false;
        }else{
            thumbnails.forEach( (string) => {
                if(typeof string != "string"){
                    tipo=false
                }
            });
        }
    }
    if(!tipo){
        res.status(404).send("Los tipos no son correctos: title=[string], description=[string], code=[string], price=[number], status=[boolean], stock=[number], category=[string]")
        return
    }
    next();
    
}