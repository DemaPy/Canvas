class Player extends Sprite {
    constructor({
        collisionBlocks = [],
        imageSrc,
        frameRate,
        animations,
        loop
    }) {
        super({imageSrc, frameRate, animations, loop})
        this.position = {
            x: 200,
            y: 200,
        }

        this.velocity = {
            x: 0,
            y: 0
        }

        this.sides = {
            bottom: this.position.y + this.height,
        }

        this.gravity = 1

        this.collisionBlocks = collisionBlocks

    }

    update() {
        this.position.x += this.velocity.x
        this.updateHitBox()
        this.checkForHorizontalCollisions()
        this.applyGravity() 
        this.updateHitBox()
        this.checkForVerticalCollisions()
    }

    swithSprite(name) {
        if (this.image === this.animations[name].image) return
        this.currentFrame = 0
        this.image = this.animations[name].image
        this.frameRate = this.animations[name].frameRate
        this.frameBuffer = this.animations[name].frameBuffer
        this.loop = this.animations[name].loop
        this.currentAnimation = this.animations[name]
    }

    handleInput(keys) {
        if (this.preventInput) return

        this.velocity.x = 0
        if (keys.a.pressed) {
            this.swithSprite('runLeft')
            this.velocity.x = -4
            this.lastDirection = 'left'
        } else if (keys.d.pressed) {
            this.swithSprite('runRight')
            this.velocity.x = 4
            this.lastDirection = 'right'
        } else {
            if (this.lastDirection === 'right') {
                this.swithSprite('idleRight')
            } else {
                this.swithSprite('idleLeft')
            }
        }
    }

    updateHitBox () {
        this.hitbox = {
            position: {
                x: this.position.x + 58,
                y: this.position.y + 34,
            },
            width: 50,
            height: 53,
        }
    }

    checkForVerticalCollisions() {
        for (let index = 0; index < this.collisionBlocks.length; index++) {
            const collisionBlock = this.collisionBlocks[index]

            if (
                this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width && 
                this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
                this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y &&
                this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height
                ) {
                if (this.velocity.y < 0) {
                    this.velocity.y = 0
                    const offSet = this.hitbox.position.y - this.position.y
                    this.position.y = collisionBlock.position.y + collisionBlock.height - offSet + 0.01
                    break
                }

                if (this.velocity.y > 0) {
                    this.velocity.y = 0
                    const offSet = this.hitbox.position.y - this.position.y + this.hitbox.height
                    this.position.y = collisionBlock.position.y - offSet - 0.01
                    break
                }
            }
        }
    }

    applyGravity() {
        this.velocity.y += this.gravity
        this.position.y += this.velocity.y
    }

    checkForHorizontalCollisions() {
        for (let index = 0; index < this.collisionBlocks.length; index++) {
            const collisionBlock = this.collisionBlocks[index]
    
            if (
                this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width && 
                this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
                this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y &&
                this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height
                ) {
                if (this.velocity.x < -0) {
                    const offSet = this.hitbox.position.x - this.position.x
                    this.position.x = collisionBlock.position.x + collisionBlock.width - offSet + 0.01
                    break
                }
    
                if (this.velocity.x > 0) {
                    const offSet = this.hitbox.position.x - this.position.x + this.hitbox.width
                    this.position.x = collisionBlock.position.x - offSet - 0.01
                    break
                }
            }
        }
    }



}