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
    src: '/sounds/bg-dance.mp3',
    loop: true
});
const bgUltraTrack = new Howl({
    src: '/sounds/bg-dance-fast.mp3',
    loop: true
});
const loseSfx = new Howl({
    src: '/sounds/lose-sfx.mp3'
});
const launchSfx = new Howl({
    src: '/sounds/simon2.mp3'
});
const success = new Howl({
    src: '/sounds/success.mp3'
});
const optionSfx = new Howl({
    src: '/sounds/select-option.mp3'
});
const startSfx = new Howl({
    src: '/sounds/select-start.mp3'
});




export 
    {redTone, blueTone, greenTone, yellowTone, 
    bgTrack, bgUltraTrack, loseSfx, launchSfx, 
    success, optionSfx, startSfx};