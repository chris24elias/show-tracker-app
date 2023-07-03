import type { LayoutAnimationConfig } from 'react-native'
import { LayoutAnimation } from 'react-native'

// Spring
// const CustomLayoutSpring = {
//   duration: 400,
//   create: {
//     type: LayoutAnimation.Types.spring,
//     property: LayoutAnimation.Properties.scaleXY,
//     springDamping: 0.7,
//   },
//   update: {
//     type: LayoutAnimation.Types.spring,
//     springDamping: 0.7,
//   },
// };

// // Linear with easing
// const CustomLayoutLinear = {
//   duration: 200,
//   create: {
//     type: LayoutAnimation.Types.linear,
//     property: LayoutAnimation.Properties.opacity,
//   },
//   update: {
//     type: LayoutAnimation.Types.easeInEaseOut,
//   },
// };

const animationConfigs = {
  spring: {
    duration: 300,
    update: {
      type: LayoutAnimation.Types.spring,
      springDamping: 0.7
    }
  },
  linear: {
    duration: 300,
    update: {
      type: LayoutAnimation.Types.linear
    }
  },
  ease: {
    duration: 800,
    update: {
      type: LayoutAnimation.Types.easeInEaseOut
    }
  },
  keyboard: {
    duration: 10000, // Doesn't matter
    update: {
      type: LayoutAnimation.Types.keyboard
    }
  },
  scaleLinear: {
    duration: 600,
    update: {
      type: LayoutAnimation.Types.linear,
      property: LayoutAnimation.Properties.scaleXY
    }
  },
  scaleSpring: {
    duration: 600,
    update: {
      type: LayoutAnimation.Types.spring,
      property: LayoutAnimation.Properties.scaleXY,
      springDamping: 0.6
    }
  },
  fade: {
    duration: 600,
    create: {
      type: LayoutAnimation.Types.linear,
      property: LayoutAnimation.Properties.opacity
    },
    update: {
      type: LayoutAnimation.Types.linear,
      property: LayoutAnimation.Properties.opacity
    },
    delete: {
      type: LayoutAnimation.Types.linear,
      property: LayoutAnimation.Properties.opacity
    }
  },
  ease2: {
    duration: 200,
    create: {
      type: LayoutAnimation.Types.linear,
      property: LayoutAnimation.Properties.opacity
    },
    update: {
      type: LayoutAnimation.Types.easeInEaseOut,
      springDamping: 0.7
    },
    delete: {
      type: LayoutAnimation.Types.linear,
      property: LayoutAnimation.Properties.opacity
    }
  }
}

type LayoutAnimationHelper = (duration?: number) => void

interface LayoutAnimations {
  spring: LayoutAnimationHelper
  linear: LayoutAnimationHelper
  ease: LayoutAnimationHelper
  keyboard: LayoutAnimationHelper
  scaleLinear: LayoutAnimationHelper
  scaleSpring: LayoutAnimationHelper
  fade: LayoutAnimationHelper
  ease2: LayoutAnimationHelper
}

const getHelpers = (): LayoutAnimations => {
  const helpers: LayoutAnimations = {}
  Object.keys(animationConfigs).forEach((key) => {
    helpers[key] = (duration?: number) => runAnimation(animationConfigs[key], duration)
  })
  return helpers
}

const runAnimation = (config: LayoutAnimationConfig, duration: number) => {
  LayoutAnimation.configureNext({
    ...config,
    duration: duration || config.duration
  })
}

export default {
  //   spring,
  //   linear,
  ...getHelpers()
}
