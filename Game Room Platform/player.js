class Player extends Sprite {
    constructor({
        collisionBlocks = [],
        imageSrc,
        frameRate
    }) {
        super({imageSrc, frameRate})
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
        // c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)
        this.checkForVerticalCollisions()
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
                    // coll on x axis on the left side
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