<template>
    <div>
        <div v-show="this.status == 'Not Connected'"><button v-on:click="start()">Connect To IPFS</button> <span>{{this.status}}</span></div>

        <div v-show="this.status == 'Ready'">
            <div>{{this.identity}}</div>
            <button v-on:click="showPeers()">Show Peers</button> <span>{{this.readPeerStatus}}</span>
            <div>{{messageLog}}</div>
            <textarea v-model="messages"></textarea>
            <button v-on:click="sendMessage()">Send</button>
        </div>
        
    </div>
</template>

<script>
import { startNode } from '../service/Node'
import filters from 'libp2p-websockets/src/filters'
import Websockets from 'libp2p-websockets'

const transportKey = Websockets.prototype[Symbol.toStringTag]

export default {
    name: 'IpfsNode',
    data: function() {
        return {
            identity: null,
            status: 'Not Connected',
            node: null,
            readPeerStatus: '',
            subscribedHashtag: 'com.lob.www:dtwitter-poc',
            messages: '',
            messageLog: '',
            messageListener: null,
            gunDB: null

        }
    },
    methods: {
        start: function(){
            const self = this
            const ipfsConfig = {
                repo: 'ipfs-twitter-' + Math.random(),
                EXPERIMENTAL: {pubsub: true},
                config: {
                    Addresses: {
                        Swarm: [
                            '/dns4/pure-sierra-28952.herokuapp.com/tcp/443/wss/p2p-webrtc-star'                  
                        ]
                    },
                    Bootstrap: [
                        '/dns4/149.28.87.35/tcp/443/wss/p2p/12D3KooWCbYZPBcNLav3vu6iYr8yR3wLDr4j196seP73Xr88WKBy'
                    ]
                },
                libp2p: {
                    config: {
                        transport: {
                        // This is added for local demo!
                        // In a production environment the default filter should be used
                        // where only DNS + WSS addresses will be dialed by websockets in the browser.
                        [transportKey]: {
                                filter: filters.all
                            }
                        }
                    }
                }
            }
            startNode(ipfsConfig).then(function(res){
                console.log(res)
                self.status = res.status
                self.identity = res.identity
                self.node = res.node
                self.subscribeToHashtag()
                
            })
        },
        showPeers: async function(){
            console.log('showing peers')
            try {
                let peerList = null
                this.readPeerStatus = 'Loading'
                if (this.subscribedHashtag == ''){
                    peerList = await this.node.swarm.peers()
                } else {
                    peerList = await this.node.pubsub.peers(this.subscribedHashtag)
                }
                console.log(peerList)
                this.readPeerStatus = 'Success'
            } catch(err){
                this.readPeerStatus = 'Error: ' + err.toString()
            }
        },
        subscribeToHashtag: async function(){
            console.log(this.subscribedHashtag)
            try {
                await this.node.pubsub.subscribe(this.subscribedHashtag, this.handleMessage)
            } catch(err){
                console.log(err)
                this.subscribedHashtag = 'Failed to join ' + this.subscribedHashtag
            }
        },
        handleMessage: async function(msg){
            console.log(msg)
            let newMsg = msg.data
            console.log(newMsg)
            this.messageLog = this.messageLog + newMsg
        },
        sendMessage: async function(){
            console.log('sendig...')
            try{
                await this.node.pubsub.publish(this.subscribedHashtag, this.messages)
            } catch(err){
                console.error(err)
            }
        }

    }
}
</script>
