import { Howl } from 'howler';

const redTone = new Howl({
    src: '/sounds/redtone.mp3'
});
const blueTone = new Howl({
    src: '/sounds/bluetone.mp3'
});
const greenTone = new Howl({
    src: '/sounds/greentone.mp3'
});
const yellowTone = new Howl({
    src: '/sounds/yellowtone.mp3'
});
const bgTrack = new Howl({
    src: '/sounds/bg-track.mp3',
    loop: true
});
const bgUltraTrack = new Howl({
    src: '/sounds/bg-track-ultra.mp3',
    loop: true
});
const loseSfx = new Howl({
    src: '/sounds/lose-sfx.mp3'
});
const launchSfx = new Howl({
    src: '/sounds/simon2.mp3'
});

export {redTone, blueTone, greenTone, yellowTone, bgTrack, bgUltraTrack, loseSfx, launchSfx};