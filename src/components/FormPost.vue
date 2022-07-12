<template>
    <div class="form">
        <h1 class="form-title" style="padding-top: 25px">Posts manager</h1>
        <label class="form-item" for="form-id">
            <p class="form-title">Id:</p>
            <input disabled v-model="post.id" class="form-input" id="form-id" type="text" />
        </label>
        <label class="form-item" for="title">
            <p class="form-title">Title:</p>
            <input v-model="post.title" class="form-input" id="title" type="text" />
        </label>
        <label class="form-item" for="body">
            <p class="form-title">Body:</p>
            <textarea v-model="post.body" class="form-input-body" id="body"></textarea>
        </label>
        <label class="form-item" for="userid">
            <p class="form-title">User:</p>
            <input v-model="post.userId" class="form-input" id="userid" type="text" />
        </label>

        <p class="warning" v-if="!inputedPost">Nhập đầy đủ thông tin</p>
        <div class="form-buttons">
            <router-link @click="clickAdd" class="form-button blue" to="/">Submit</router-link>
            <router-link class="form-button red" v-if="inputedPost" to="/">Cancel</router-link>
        </div>

    </div>
</template>

<script>
export default {
    name: "FormPost",
    data() {
        return {
            post: {
                id: '',
                title: '',
                body: '',
                userId: '',
            },
            inputedPost: true,
        }
    },
    methods: {
        clickAdd() {
            if (this.post.title && this.post.body && this.post.userId) {
                this.inputedPost = true
                this.$store.commit("ADD_POST", this.post)
                this.$store.commit("EDIT_POST", {})
                console.log(this.post);
                this.post = {
                    id: '',
                    title: '',
                    body: '',
                    userId: '',
                }
            } else {
                this.inputedPost = false
            }
        }
    },
    computed: {
        posts: {
            get() {
                return this.$store.state.posts;
            },
            set(value) {
                this.$store.commit("SET_POSTS", value);
            },
        },
        selectedPost: {
            get() {
                return this.$store.state.selectedPost;
            },
        }
    },
    watch: {
        selectedPost: {
            handler() {
                if (this.selectedPost) {
                    this.post = Object.assign({}, this.selectedPost)
                } else {
                    this.selectedPost = {}
                }
            },
            deep: true,
            immediate: true,
        }
    }
}
</script>

<style>
.form {
    margin: 30px;
    padding-left: 25%;
    background: #ccc;
    font-family: Arial, Helvetica, sans-serif;
    color: #000;
    border-radius: 12px;
}

.form-item {
    display: flex;
    justify-content: space-between;
    width: 60%;
}

.form-title {
    margin-left: 10%;
}

.form-input {
    margin-top: 8px;
    width: 70%;
    border-radius: 5px;
    outline: none;
    border: 1px solid transparent;
    font-size: 16px;
    font-family: Arial, Helvetica, sans-serif;

}

.form-input-body {
    margin-top: 8px;
    height: 200px;
    width: 70%;
    border: 1px solid transparent;
    outline: none;
    border-radius: 5px;
    font-size: 16px;
    font-family: Arial, Helvetica, sans-serif;
}

.form-buttons {
    padding: 10px;
    height: 100px;

    padding-top: 30px;
    padding-left: 30%;

}

.form-button {
    padding: 10px;
    color: #fff;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    margin-top: 10px;
    margin-right: 20px;
    text-decoration: none;
}

.blue {
    background: mediumblue;
}

.red {
    background: firebrick;
}

.form-button:hover {
    background: royalblue;
}

.warning {
    color: red;
}

textarea {
    resize: none;
}
</style>