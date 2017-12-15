import { Howl } from 'howler';

const redTone = new Howl({
    src: '/sounds/red-tone.mp3'
});
const blueTone = new Howl({
    src: '/sounds/blue-tone.mp3'
});
const greenTone = new Howl({
    src: '/sounds/green-tone.mp3'
});
const yellowTone = new Howl({
    src: '/sounds/yellow-tone.mp3'
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
const victorySfx = new Howl({
    src: '/sounds/victory.mp3'
});




export 
    {redTone, blueTone, greenTone, yellowTone, 
    bgTrack, bgUltraTrack, loseSfx, launchSfx, 
    success, optionSfx, startSfx, victorySfx};