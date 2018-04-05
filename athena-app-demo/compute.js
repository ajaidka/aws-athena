// var a=[{
//     "Data": [{
//         "VarCharValue": "id"
//     }, {
//         "VarCharValue": "name"
//     }]
// }, {
//     "Data": [{
//         "VarCharValue": "1"
//     }, {
//         "VarCharValue": "'Mandeep'"
//     }]
// }, {
//     "Data": [{
//         "VarCharValue": "2"
//     }, {
//         "VarCharValue": "Magandeep"
//     }]
// }, {
//     "Data": [{
//         "VarCharValue": "3"
//     }, {
//         "VarCharValue": "Aashu"
//     }]
// }]
module.exports.AWSFormatToJSON = (a)=>{
    var fields=[]
    var computedObject = {}
    var completeComputedArray=[]
    var iterator=0
    // console.log(a)
    a = a.map((data,index)=>{
        
        return data['Data'].map((d,i)=>{
            if(index==0){
                fields= fields.concat(Object.values(d))
            }
            else{
                
                computedObject = Object.assign(computedObject,{ [fields[i]]:Object.values(d)[0]}) 
                // console.log(computedObject,i,iterator)
                if(index>0 &&i==data['Data'].length-1){
                    
                    completeComputedArray.push(computedObject)
                    computedObject={}
                    
                }
                iterator = i
                return Object.values(d)
            }
            
        })
    })
    
    // console.log(completeComputedArray);
    return completeComputedArray
}
