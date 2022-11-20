Array.prototype.parse2D = function() {
    const rows = []

    for (let index = 0; index < this.length; index+=16) {
        rows.push(this.slice(index, index + 16))
    }

    return rows
  }



Array.prototype.createObjectsFrom2D = function () {
    const objects = []

    this.forEach((element, y) => {
        element.forEach((item, x) => {
            if (item === 292 || item === 250) {
                objects.push( 
                    new CollisionBlock({
                        position: {
                            x: x * 64,
                            y: y * 64,
                        }
                    })
                )
            }
        })
      });
    
    return objects
}