// override react-native types with react-native-web types
import 'react-native'

import type { TouchEventHandler } from 'react'

declare module 'react-native' {
  interface PressableStateCallbackType {
    hovered?: boolean
    focused?: boolean
  }
  interface ViewStyle {
    transitionProperty?: string
    transitionDuration?: string
  }

  interface TextStyle {
    outlineStyle?: string
  }

  interface TextProps {
    accessibilityComponentType?: never
    accessibilityTraits?: never
    accessibilityLevel?: number
    href?: string
    hrefAttrs?: {
      rel: 'noreferrer'
      target?: '_blank'
    }
  }
  interface ViewProps {
    accessibilityRole?: string
    href?: string
    hrefAttrs?: {
      rel: 'noreferrer'
      target?: '_blank'
    }
    onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
    onMouseMove?: TouchEventHandler<Element>
    onTouchStart?: TouchEventHandler<Element>
    onTouchEnd?: TouchEventHandler<Element>
    onTouchMove?: TouchEventHandler<Element>
  }
}
