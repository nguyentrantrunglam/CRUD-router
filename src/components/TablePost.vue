<template>
    <div class="tablepost">
        <div class="popup">
            <h2>Are you sure want to delete ?</h2>
            <button class="button-popup blue " @click="clickConfirm">Confirm</button>
            <button class="button-popup red " @click="clickCancel">Cancel</button>
        </div>
        <nav class="nav">
            <router-link class="link" to="/post">
                Add new post
            </router-link>

        </nav>
        <div class="wrap">
            <table id="posts">
                <tr>
                    <th class="row-id">#</th>
                    <th class="row-title">Title</th>
                    <th class="row-body">Body</th>
                    <th class="row-uid">UID</th>
                    <th class="row-action">Actions</th>
                </tr>
                <tr v-for="post in posts.filter((e, index) => index >= (page - 1) * 10 && index < page * 10)"
                    v-bind:key="post.id">
                    <td class="row-id">{{ post.id }}</td>
                    <td class="row-title">{{ post.title }}</td>
                    <td class="row-body">{{ post.body }}</td>
                    <td class="row-uid">{{ post.userId }}</td>
                    <td class="row-action ">
                        <div class='action'>
                            <router-link class="link-button blue" @click="clickEdit(post)" to="/post">Edit</router-link>
                            <button class="button-form red" @click="clickDelete(post)">Delete</button>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div class="control-buttons">
            <button class="control-button" @click="prevPage">Previous</button>
            <button class="control-button" v-for="page in pageArray" @click="clickPage(page)" v-bind:key="page">{{ page
            }}</button>
            <button class="control-button" @click="nextPage">Next</button>

        </div>
    </div>
</template>

<script>


export default {
    name: "TablePost",
    data() {
        return {
            postDelete: '',
            popupDisplay: 'none',
        }
    },
    methods: {
        clickPage(page) {
            this.page = page
        },
        nextPage() {
            if (this.page < (this.posts.length / 10)) {
                this.page = this.page + 1
            } else {
                this.page = this.posts.length / 10
            }
        },
        prevPage() {
            if (this.page != 1) {
                this.page = this.page - 1
            } else {
                this.page = 1
            }
        },
        clickDelete(post) {
            this.postDelete = post.id
            this.popupDisplay = 'block'

        },
        clickEdit(post) {
            this.$store.commit("EDIT_POST", post)
        },
        clickConfirm() {

            this.popupDisplay = 'none'
            this.$store.commit("DELETE_POST", this.postDelete)
        },
        clickCancel() {
            this.postDelete = ''
            this.popupDisplay = 'none'
        }
    }
    ,
    computed: {
        posts: {
            get() {
                return this.$store.state.posts;
            },
            set(value) {
                this.$store.commit("SET_POSTS", value);
            },
        },
        page: {
            get() {
                return this.$store.state.page;
            },
            set(value) {
                this.$store.commit("SET_PAGE", value);
            },
        }
        ,
        pageArray: {
            get() {
                return this.$store.getters.pageArray;
            }

        }

    },
    watch: {

    }

}
</script>

<style scoped>
.row-id {
    width: 3%;
}

.row-title {
    width: 40%;
}

.row-body {
    width: 50%;
}

.row-uid {
    width: 3%;
}

.action {
    display: flex;

}

.tablepost {
    height: 100vh;
}

.nav {
    padding: 50px;
    height: fit-content;
}

.link {
    background: #000;
    padding: 25px !important;
    margin: 20px !important;
    text-decoration: none;
    color: white;
    background: mediumblue;
    border-radius: 12px;
}

.control-button {
    height: 24px;
    font-size: 16px;
    background: #04AA6D;
    border: 1px solid #04AA6D;
    color: white;
    border-radius: 5px;
    cursor: pointer;
}

.control-buttons {
    width: 25%;
    height: 24px;
    display: flex;
    margin: auto;
    justify-content: space-between;
}

.link-button {
    background: #000;
    padding: 8px 7px 7px 7px !important;
    margin-right: 5px;
    text-decoration: none;
    color: white;
    background: mediumblue;
    border-radius: 5px;
    font-size: 13px;
}

.wrap {
    max-height: 80%;
    overflow-y: scroll;
}

.button {
    width: 150px;
    height: 40px;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    text-decoration: none;
    background: mediumblue;
    border: none;
    border-radius: 5px;
    margin-top: 25px;
    margin-left: 25px;
    padding-top: 15px;
    padding-left: 40px;
}




#posts {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;

}

#posts td,
#posts th {
    border: 1px solid #ddd;
    padding: 8px;
}

#posts tr:nth-child(even) {
    background-color: #f2f2f2;
}

#posts tr:hover {
    background-color: #ddd;
}

#posts th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #04AA6D;
    color: white;
    position: sticky;
    top: -1px;
    z-index: 0;
}



.popup {
    position: absolute;
    height: 100vh;
    width: 100vw;
    background: rgba(255, 255, 255, 0.877);
    display: v-bind(popupDisplay);
    text-align: center;
    padding-top: 200px;
    z-index: 1;
}

.button-popup {
    height: 50px;
    width: 100px;
    border: none;
    cursor: pointer;
    margin-right: 20px;
    border-radius: 5px;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
}

.button-popup:hover {
    border: 3px solid #000;
}

.red {
    background: crimson;
    color: white;
}

.blue {
    background: mediumblue;
    color: white;
}

.button-form {
    height: 30px;
    width: 60px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 2px;
}
</style>