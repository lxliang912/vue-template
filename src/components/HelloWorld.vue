<template>
  <div>
    <svg width="200" height="200">
      <polygon :points="points"></polygon>
      <circle cx="100" cy="100" r="90"></circle>
    </svg>

    <label>Sides: {{ sides }}</label>
    <input type="range" min="3" max="500" v-model.number="sides">
    <label>Minimum Radius: {{ minRadius }}%</label>
    <input type="range" min="0" max="90" v-model.number="minRadius">
    <label>Update Interval: {{ updateInterval }} milliseconds</label>
    <input type="range" min="10" max="2000" v-model.number="updateInterval">
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    let defaultSides = 5;
    let stats = Array.apply(null, {
      length: defaultSides
    }).map(function() {
      return 100;
    });
    
    return {
      stats: stats,
      points: generatePoints(stats),
      sides: defaultSides,
      minRadius: 50,
      interval: null,
      updateInterval: 500
    };
  },
  watch: {
    sides(newSides, oldSides) {
      var sidesDifference = newSides - oldSides;
      if (sidesDifference > 0) {
        for (var i = 1; i <= sidesDifference; i++) {
          this.stats.push(this.newRandomValue());
        }
      } else {
        var absoluteSidesDifference = Math.abs(sidesDifference);
        for (var i = 1; i <= absoluteSidesDifference; i++) {
          this.stats.shift();
        }
      }
    },
    stats(newStats) {
      TweenLite.to(this.$data, this.updateInterval / 1000, {
        points: generatePoints(newStats)
      });
    },
    updateInterval() {
      this.resetInterval();
    }
  },
  mounted() {
    this.resetInterval();
  },
  methods: {
    resetInterval() {
      var vm = this;
      clearInterval(this.interval);
      this.randomizeStats();
      this.interval = setInterval(() => {
        vm.randomizeStats();
      }, this.updateInterval);
    },
    randomizeStats() {
      var vm = this;
      this.stats = this.stats.map(() => {
        return vm.newRandomValue();
      });
    },
    newRandomValue() {
      return Math.ceil(this.minRadius + Math.random() * (100 - this.minRadius));
    }
  }
};

function valueToPoint(value, index, total) {
  var x = 0;
  var y = -value * 0.9;
  var angle = Math.PI * 2 / total * index;
  var cos = Math.cos(angle);
  var sin = Math.sin(angle);
  var tx = x * cos - y * sin + 100;
  var ty = x * sin + y * cos + 100;
  return {
    x: tx,
    y: ty
  };
}

function generatePoints(stats) {
  var total = stats.length;
  return stats
    .map(function(stat, index) {
      var point = valueToPoint(stat, index, total);
      return point.x + "," + point.y;
    })
    .join(" ");
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
svg {
  display: block;
}

polygon {
  fill: #41b883;
}

circle {
  fill: transparent;
  stroke: #35495e;
}
</style>
