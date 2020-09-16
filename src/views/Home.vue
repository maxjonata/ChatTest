<template>
    <div class="hello">
        <div id="chatWindow">
            <ul id="chat">
                <li id="message" v-for="message in messages" :key="message.name">
                    {{ message.name }}: {{ message.message }}
                </li>
            </ul>
            <div id="input">
                <label>Nome:</label>
                <input v-model="name" type="text" id="typing name" name="typing-name"><br>
                <label>Mensagem:</label>
                <input v-model="message" type="text" id="typed-message" name="typed-message">
                <input v-on:click="sendMessage" type="submit" id="submit" name="submit">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Home',
    props: {
        msg: String
    },

    data: function() { return{
        messages: [],
        name: '',
        message: ''
    }},

    sockets: {
        connect: function () {
            console.log('socket connected!!!!!!!');
        },
        customEmit: function (data) {
            console.log('this method was fired by the socket server. eg: io.emit("customEmit", '+ data+ ')')
            return data;
        },
        connect_error: function (err) {
            console.log("erro: " + err);
        },
        messageReceived: function (msg) {
            this.addMessage(msg);
            console.log("veio");
        }
    },

    methods: {
            addMessage: function(messager) {
                this.messages.push({ name: messager.name, message: messager.message})
                return;
            },

            sendMessage: function() {
                let message = {
                    name: this.name,
                    message: this.message
                }
                this.$socket.emit('messageSent', message)
                console.log('sent');
                this.name = this.message = "";
                return message;
            }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello, #chatWindow, #input, #chat {
    display: flex;
}

.hello, #chatWindow {
    justify-content: center;
    align-items: center;
}

.hello {
    flex: 1;
    background-color: #ededed;
    height: 100%;
}

#chatWindow {
    flex-direction: column;
    flex: 1;
    height: 80%;
}

#input {
    flex: 1;
    height: 10px
}

#chat {
    background-color: #ffffff;
    width: 60vw;
    height: 50vh;
    flex: 20;
    flex-direction: column;
    align-items: flex-start;
    overflow: auto;
    overflow-x:hidden;
    overflow-y:auto;
}

#message {
    height: 3ch;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
