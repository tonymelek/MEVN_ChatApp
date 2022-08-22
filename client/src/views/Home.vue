<template>
    <div class="d-flex flex-column align-items-center m-5">
        <router-link to="/director">
        <button class="btn btn-success w-16rem  my-5">Director</button>
        </router-link>
        <router-link to="/operator">
        <button class="btn btn-warning w-16rem">Operator</button>
        </router-link>
    </div>
</template>

<script>
    export default {
        name:"Home"
    }
</script>

<style scoped>
.w-16rem{
width: 16rem;
}
</style>