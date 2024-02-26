async function serializeMongo(obj){
    var obj1=JSON.stringify(obj);
    var obj=JSON.parse(obj1);

    return obj;
}

export const SerializeMongo=serializeMongo; 