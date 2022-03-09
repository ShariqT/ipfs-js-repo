import IPFS from 'ipfs'

let nodeInfo = {
  identity: null,
  status: 'Connecting...',
  node: null
}

async function startNode (opts = {}) {
    try{
        const node = await IPFS.create(opts)
        nodeInfo.node = node
        const { id } = await node.id()
        nodeInfo.identity = id
        nodeInfo.status = 'Ready'
        return nodeInfo
    } catch(err){
        nodeInfo.status = 'Error connecting to IPFS ' + err.toString()
        return nodeInfo
    }
}

export { startNode }
