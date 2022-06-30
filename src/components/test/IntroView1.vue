<template>
    <div id="intro">
        <div class="title">在线心理测评</div>
        <div class="main">测评一共包含10道题目，请根据实际情况选择，可能后续会有老师与你联系。我们会严格保护你的隐私。
        <div class="main">本测评大约需要20分钟左右的时间。</div>
        </div>
        <router-link to="/test">
        <a-button size="large" type="primary" style="margin: 64px 0">进入测评</a-button>
        </router-link>
    </div>
</template>

<style scoped>
#intro {
    text-align: center;
}
</style>