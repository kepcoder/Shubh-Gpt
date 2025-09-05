const{ Pinecone } = require('@pinecone-database/pinecone')
const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });


const shubhgptIndex = pc.Index('shubhgpt-index')

const saveVector = async ({vectorData, messageId, metadata})=>{
  await shubhgptIndex.upsert([{
       id:messageId,
       values:vectorData,
       metadata
  }])
}

const queryVector = async ({queryVector, limit, metadata})=>{
      
    const data = await shubhgptIndex.query({
       vector:queryVector,
       topK:limit,
       filter: metadata || undefined,
       includeMetadata:true
    })

    return data.matches
}
module.exports = {
    saveVector,
    queryVector
}