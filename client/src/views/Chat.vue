<template>
	<div class="chat">
		<h2>Hello {{ user.fname }}</h2>
		<template v-if="aboutObj">
			<p>Chat subject: {{ chatName }}</p>
			<div class="message-container">
				<div
					class="chat-message flex"
					v-for="msg in aboutObj.chat_history"
					:key="msg.created_at"
					:class="{ 'user-message': msg.from === user.fname }"
				>
					<span>{{ formattedTime(msg.created_at) }}</span>
					<div class="message-user-txt grid">
						<span>{{ msg.from }}</span>
						<span>{{ msg.txt }}</span>
					</div>
				</div>
			</div>

			<form class="flex j-center a-flex-end" @submit.prevent="sendMsg">
				<input type="text" v-model="msg.txt" />
				<button>Send</button>
			</form>
		</template>
	</div>
</template>

<style lang="scss">
.chat {
	.message-container {
		max-width: 700px;
		max-height: 50vh;
		overflow-y: scroll;
		margin: 0 auto;
		border: $border1;
		padding: 10px;
		.chat-message {
			border: $border2;
			margin: 2px 0;
			&.user-message {
				background-color: $clr3;
			}
			.message-user-txt {
				flex: 1;
				margin-left: 15px;
				text-align: left;
			}
		}
	}
	form {
		margin-top: 10px;
		input {
			width: 70%;
			margin-bottom: 0;
		}
	}
}
</style>

<script>
import { socketService } from "../services/socket.service";
import { utilService } from "../services/utils.service";
import moment from "moment";
const ADD_MESSAGE_EVENT = "chat addMsg";
export default {
	name: "Chat",
	data() {
		return {
			typeId: null,
			type: null,
			aboutObj: null,
			msg: null,
		};
	},
	methods: {
		scrollToElement() {
			const el = this.$el.getElementsByClassName("message-container")[0];
			if (el) {
				el.scrollIntoView({ behavior: "smooth" });
			}
		},
		setEmptyMsg() {
			this.msg = {
				from: this.user.username,
				userId: this.user._id,
				txt: "",
				created_at: Date.now(),
				metadata: { type: this.type, _id: this.typeId },
			};
		},
		formattedTime(time) {
			// return moment(new Date(time), "YYYYMMDD").fromNow();
			return moment(new Date(time)).format("MMMM Do, h:mm:ss a");
		},
		addMsg(msg) {
			this.aboutObj.chat_history.push(msg);
		},
		initSocket() {
			socketService.setup();
			socketService.emit("chat topic", this.chatName);
			socketService.on(ADD_MESSAGE_EVENT, this.addMsg);
		},
		sendMsg() {
			socketService.emit("chat newMsg", this.msg);
			this.setEmptyMsg();
			this.scrollToElement();
		},
	},
	computed: {
		user() {
			return this.$store.getters["user/user"];
		},
		chatName() {
			return this.type + "_" + this.aboutObj.name;
		},
	},
	created() {
		var { type, typeId } = this.$route.params;
		if (!type || !typeId) {
			var [typeId, type] = utilService.historyModeFix(2);
		}
		this.type = type;
		this.typeId = typeId;
		this.$store
			.dispatch({
				type: `${this.type}/getById`,
				[`${this.type}Id`]: this.typeId,
			})
			.then((aboutObj) => {
				this.aboutObj = aboutObj;
				this.setEmptyMsg();

				//start socket
				this.initSocket();
			});
	},
	destroyed() {
		socketService.off(ADD_MESSAGE_EVENT, this.addMsg);
		socketService.terminate();
	},
};
</script>