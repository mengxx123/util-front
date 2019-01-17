<template>
    <my-page title="语音转文字 - 帮助" backable>
        <ui-article>
            <h2>说明</h2>
            <p>原始 PCM 的录音参数必须符合 8k/16k 采样率、16bit 位深、单声道。</p>
            <p>支持的格式有：pcm（不压缩）、wav（不压缩，pcm 编码）、amr（压缩格式）。</p>
            <p>支持的语音时长上限为 60s。</p>
        </ui-article>
    </my-page>
</template>
