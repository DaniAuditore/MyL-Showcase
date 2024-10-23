<template>
<div class="valoration">
    <h1>{{ this.valoration }}</h1>
    
    <main>
        <button @click="downVote">
            <img 
                src="../../assets/valoration-icons/dVote.png" 
                alt="dVote"
            >
        </button>
        <button @click="upVote">
            <img 
                src="../../assets/valoration-icons/uVote.png" 
                alt="uVote"
            >
        </button>
    </main>
</div>
</template>

<script>
export default {
    props: {
        valoration: {
            type: Number,
            required: true
        }
    },
    methods: {
        uptadeValoration(newValoration) {
            console.log(newValoration);
            this.$emit('update:valoration', newValoration);
        },
        upVote() {
            console.log("upVote");
            this.uptadeValoration(this.valoration + 1);
        },
        downVote() {
            console.log("downVote");
            this.uptadeValoration(this.valoration - 1);
        },
    }
}
</script>

<style scoped>
.valoration {
    width: 77px;
    height: 20px;
    left: 20px;
    bottom: 15px;
    position: absolute;
    z-index: 100;
}

h1 {
    right: 54px;
    top: -11px;
    position: absolute;

    font-size: 18px;
    font-family: var(--font-style);
    font-weight: 500;
    word-wrap: break-word;
    cursor: default;
    
    color: var(--primary-border-color);
}

main {
    width: 54px;
    height: 20px;
    left: 25px;
    top: 0px;
    position: absolute;
}

button {
    width: 27px;
    height: 20px;
    float: right;
    position: relative;

    text-align: center;

    background: none;
    border: none;
}

img {
    width: 27px;
    height: auto;
}
img:hover {
    filter: brightness(115%);
    cursor: pointer;
}
</style>
