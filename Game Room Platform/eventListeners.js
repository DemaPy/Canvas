addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'w':
            if (player.velocity.y === 0) {
                player.velocity.y = -15
            }
            break;
        case 'd':
            keys.d.pressed = true
            break;
        case 'a':
            keys.a.pressed = true
            break;
        default:
            break;
    }
})

addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break;
        case 'a':
            keys.a.pressed = false
            break;
        default:
            break;
    }
})