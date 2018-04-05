/**
 * 
 * @param {*} AWSFormatObject 
 * Converts AWS format object to JSON
 */
module.exports.AWSFormatToJSON = (AWSFormatObject)=>{
    var fields=[]
    var computedObject = {}
    var completeComputedArray=[]
    var iterator=0
    AWSFormatObject = AWSFormatObject.map((data,index)=>{
        
        return data['Data'].map((d,i)=>{
            if(index==0){
                fields= fields.concat(Object.values(d))
            }
            else{
                
                computedObject = Object.assign(computedObject,{ [fields[i]]:Object.values(d)[0]}) 
                if(index>0 &&i==data['Data'].length-1){
                    
                    completeComputedArray.push(computedObject)
                    computedObject={}
                    
                }
                iterator = i
                return Object.values(d)
            }
            
        })
    })
    
    return completeComputedArray
}