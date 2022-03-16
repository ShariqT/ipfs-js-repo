<template>
    <div>
        <div v-show="this.status == 'Not Connected'" class="mt-3"><button class="button is-large is-fullwidth is-link" v-on:click="start()">Connect To DTwitter</button></div>

        <div v-show="this.status == 'Ready'">
            <div class="message is-info">
                <div class="message-body">
                    Your node is <strong>{{this.identity}}</strong>. This will double as your username.
                </div>
            </div>
            <div class="block">
                <tweet :nodeName="tweet.from" :tweet="tweet.data" v-for="(tweet, idx) in messageLog" v-bind:key="idx"></tweet>
            </div>
            <textarea class="textarea" placeholder="Tweet your message over decentralized networks!" v-model="messages"></textarea>
            <button class="button is-fullwidth is-success" v-on:click="sendMessage()">Send</button>
        </div>

        <modal ref="LoadingModal">
            <div class="box">
                <p>Connecting...</p>
                <progress class="progress is-large is-info" max="100">60%</progress>
            </div>
        </modal>
        
    </div>
</template>

<script>
import { startNode } from '../service/Node'
import filters from 'libp2p-websockets/src/filters'
import Websockets from 'libp2p-websockets'
import Modal from './Modal.vue'
import Tweet from './Tweet.vue'
const transportKey = Websockets.prototype[Symbol.toStringTag]

export default {
    name: 'IpfsNode',
    components: {
        'modal': Modal,
        'tweet': Tweet
    },
    data: function() {
        return {
            identity: null,
            status: 'Not Connected',
            node: null,
            readPeerStatus: '',
            subscribedHashtag: 'com.lob.www:dtwitter-poc',
            messages: '',
            messageLog: [],
            messageListener: null

        }
    },
    methods: {
        start: function(){
            const self = this
            this.$refs.LoadingModal.openModal();
            const ipfsConfig = {
                repo: 'ipfs-twitter-' + Math.random(),
                EXPERIMENTAL: {pubsub: true},
                config: {
                    Addresses: {
                        Swarm: [
                            '/dns4/pure-sierra-28952.herokuapp.com/tcp/443/wss/p2p-webrtc-star',
                        ]
                    },
                    Bootstrap: [
                        '/dns4/projects.enshapa-engineering.com/tcp/443/wss/p2p/12D3KooWCbYZPBcNLav3vu6iYr8yR3wLDr4j196seP73Xr88WKBy'
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
                self.$refs.LoadingModal.closeModal();

                
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
            let newMsg = msg.data.toString()
            console.log(newMsg)
            this.messageLog.unshift({ 'from': msg.from.toString(), 'data': newMsg })
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
