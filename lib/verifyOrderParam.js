export default function verifyOrderParam(orderParam){
    // check if there's a url prop query param called order
    let orderBy = 'createdAt_DESC'; // the default
    // if not, set it to default createdAt_ASC
    // else 
    // 1. find out if the param matches the possibilities
    const orderByOptions = [ "voteCount_ASC", "voteCount_DESC", "createdAt_ASC", "createdAt_DESC" ];
    // 2. and then use it or if not, use default
    if(orderParam){
        if(orderByOptions.includes(orderParam)){
            orderBy = orderParam;
        }
    }
    return orderBy;
}